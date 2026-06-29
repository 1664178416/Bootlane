import { stat, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  analyzeProject,
  loadConfigFile,
  mergeConfig,
  renderJsonReport,
  renderMarkdownReport,
  resolveConfig,
  type BootlaneConfig,
  type BootlaneReport,
  type Severity
} from "@bootlane/core";
import { Command } from "commander";
import { successfulExit, usageError } from "./errors.js";
import { renderTerminalReport } from "./terminal.js";

export const cliVersion = "0.1.0";

export type CheckFormat = "terminal" | "json" | "markdown";

export type CheckCommandOptions = {
  format?: CheckFormat;
  output?: string;
  ci?: boolean;
  failOn?: Severity;
  config?: string;
  printConfig?: boolean;
  summary?: boolean;
  verbose?: boolean;
  noColor?: boolean;
};

export type ProgramIO = {
  stdout: Pick<NodeJS.WriteStream, "write" | "isTTY">;
  stderr: Pick<NodeJS.WriteStream, "write" | "isTTY">;
  cwd: () => string;
  exit: (code: number) => never;
};

export function createProgram(io: ProgramIO = defaultIO()): Command {
  const program = new Command();

  program
    .name("bootlane")
    .description("Check whether a repository is ready to run.")
    .version(cliVersion)
    .configureOutput({
      writeOut: (value) => {
        io.stdout.write(value);
      },
      writeErr: (value) => {
        io.stderr.write(value);
      }
    })
    .exitOverride((error) => {
      if (error.exitCode === 0) {
        throw successfulExit({ reported: true });
      }

      throw usageError(error.message, { reported: true });
    })
    .showHelpAfterError();

  program
    .command("check", { isDefault: true })
    .description("Check whether a repository is ready to run.")
    .argument("[path]", "repository path", ".")
    .option("--format <format>", "output format: terminal, json, markdown", "terminal")
    .option("--output <file>", "write report to a file")
    .option("--ci", "enable CI mode and fail when findings cross the threshold")
    .option("--fail-on <severity>", "CI failure threshold: critical, warning, info")
    .option("--config <file>", "load a specific Bootlane config file")
    .option("--print-config", "print the merged Bootlane config and exit")
    .option("--summary", "print compact terminal output")
    .option("--verbose", "print extra terminal diagnostics")
    .option("--no-color", "disable terminal color")
    .action(async (targetPath: string, options: CheckCommandOptions) => {
      await runCheckCommand(targetPath, options, io);
    });

  return program;
}

export async function runCheckCommand(targetPath: string, options: CheckCommandOptions, io: ProgramIO): Promise<void> {
  const format = parseFormat(options.format ?? "terminal");
  if (options.summary && options.verbose) {
    throw usageError("Use either --summary or --verbose, not both.");
  }

  const resolvedTargetPath = path.resolve(io.cwd(), targetPath);
  await assertValidTargetPath(resolvedTargetPath);
  const { mergedConfig, resolvedConfig } = await loadMergedConfig(resolvedTargetPath, options, io);

  if (options.printConfig) {
    io.stdout.write(`${JSON.stringify(resolvedConfig, null, 2)}\n`);
    return;
  }

  const report = await analyzeProject({
    targetPath: resolvedTargetPath,
    toolVersion: cliVersion,
    config: mergedConfig
  });

  const rendered = renderReport(report, format, {
    color: options.noColor === true ? false : !options.ci,
    terminalMode: resolveTerminalMode(options)
  });

  if (options.output) {
    await writeOutputFile(path.resolve(io.cwd(), options.output), rendered);
  } else {
    io.stdout.write(rendered);
  }

  if (options.ci && shouldFail(report, resolvedConfig.failOn)) {
    io.exit(1);
  }
}

async function writeOutputFile(resolvedOutputPath: string, rendered: string): Promise<void> {
  try {
    await writeFile(resolvedOutputPath, rendered, "utf8");
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw usageError(`Could not write Bootlane report to ${resolvedOutputPath}: ${reason}`);
  }
}

async function assertValidTargetPath(resolvedTargetPath: string): Promise<void> {
  let result;
  try {
    result = await stat(resolvedTargetPath);
  } catch {
    throw usageError(`Target path does not exist: ${resolvedTargetPath}`);
  }

  if (!result.isDirectory()) {
    throw usageError(`Target path must be a directory: ${resolvedTargetPath}`);
  }
}

export async function loadMergedConfig(
  resolvedTargetPath: string,
  options: Pick<CheckCommandOptions, "config" | "failOn">,
  io: ProgramIO
): Promise<{ mergedConfig: Partial<BootlaneConfig>; resolvedConfig: BootlaneConfig }> {
  const loadedConfig = await loadConfigForCli(
    resolvedTargetPath,
    options.config ? path.resolve(io.cwd(), options.config) : undefined
  );
  const cliConfig: Partial<BootlaneConfig> = {};

  if (options.failOn) {
    cliConfig.failOn = parseSeverity(options.failOn);
  }

  const mergedConfig = mergeConfig(loadedConfig.config, cliConfig);
  return {
    mergedConfig,
    resolvedConfig: resolveConfig(mergedConfig)
  };
}

async function loadConfigForCli(resolvedTargetPath: string, explicitConfigPath?: string) {
  try {
    return await loadConfigFile(resolvedTargetPath, explicitConfigPath);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.startsWith("Could not read Bootlane config") || message.startsWith("Invalid Bootlane config")) {
      throw usageError(message);
    }

    throw error;
  }
}

export function renderReport(
  report: BootlaneReport,
  format: CheckFormat,
  options: { color: boolean; terminalMode?: "normal" | "summary" | "verbose" }
): string {
  switch (format) {
    case "terminal":
      return renderTerminalReport(report, { color: options.color, mode: options.terminalMode });
    case "json":
      return renderJsonReport(report);
    case "markdown":
      return renderMarkdownReport(report);
  }
}

function resolveTerminalMode(options: Pick<CheckCommandOptions, "summary" | "verbose">): "normal" | "summary" | "verbose" {
  if (options.summary) {
    return "summary";
  }

  if (options.verbose) {
    return "verbose";
  }

  return "normal";
}

export function shouldFail(report: BootlaneReport, threshold: Severity): boolean {
  return report.findings.some((finding) => !finding.passed && severityRank(finding.severity) <= severityRank(threshold));
}

function parseFormat(value: string): CheckFormat {
  const normalized = value.trim().toLowerCase();
  if (normalized === "terminal" || normalized === "json" || normalized === "markdown") {
    return normalized;
  }

  throw usageError(`Unsupported format "${value}". Use terminal, json, or markdown.`);
}

function parseSeverity(value: string): Severity {
  const normalized = value.trim().toLowerCase();
  if (normalized === "critical" || normalized === "warning" || normalized === "info") {
    return normalized;
  }

  throw usageError(`Unsupported severity "${value}". Use critical, warning, or info.`);
}

function severityRank(severity: Severity): number {
  switch (severity) {
    case "critical":
      return 0;
    case "warning":
      return 1;
    case "info":
      return 2;
  }
}

function defaultIO(): ProgramIO {
  return {
    stdout: process.stdout,
    stderr: process.stderr,
    cwd: process.cwd,
    exit: process.exit as (code: number) => never
  };
}
