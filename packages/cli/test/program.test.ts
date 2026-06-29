import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { getExitCode } from "../src/errors.js";
import { createProgram, runCheckCommand, shouldFail, type ProgramIO } from "../src/program.js";
import { analyzeProject } from "../../core/src/index.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const fixtureRoot = path.join(repoRoot, "examples", "fixtures");

describe("CLI program", () => {
  it("writes terminal output for a fixture", async () => {
    const writes: string[] = [];
    const io = createTestIO(writes);

    await runCheckCommand(path.join(fixtureRoot, "node-missing-env"), { format: "terminal", noColor: true }, io);

    expect(writes.join("")).toContain("Bootlane Report");
    expect(writes.join("")).toContain(".env.example is missing");
  });

  it("runs the default check command", async () => {
    const writes: string[] = [];
    const io = createTestIO(writes);
    const program = createProgram(io);

    await program.parseAsync([path.join(fixtureRoot, "node-good"), "--format", "json"], { from: "user" });

    const report = JSON.parse(writes.join("")) as {
      project: { type: string };
      score: { value: number };
    };

    expect(report.project.type).toBe("node");
    expect(report.score.value).toBe(100);
  });

  it("prints root and check help through injected IO", async () => {
    const rootWrites: string[] = [];
    const rootProgram = createProgram(createTestIO(rootWrites));

    await expectSuccessfulExit(rootProgram.parseAsync(["--help"], { from: "user" }));
    expect(rootWrites.join("")).toContain("Usage: bootlane");
    expect(rootWrites.join("")).toContain("Check whether a repository is ready to run.");

    const checkWrites: string[] = [];
    const checkProgram = createProgram(createTestIO(checkWrites));

    await expectSuccessfulExit(checkProgram.parseAsync(["check", "--help"], { from: "user" }));
    expect(checkWrites.join("")).toContain("Usage: bootlane check");
    expect(checkWrites.join("")).toContain("--format <format>");
    expect(checkWrites.join("")).toContain("--print-config");
  });

  it("decides CI failure from severity threshold", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "node-missing-env"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    expect(shouldFail(report, "critical")).toBe(true);
    expect(shouldFail(report, "info")).toBe(true);
  });

  it("honors --fail-on thresholds in CI mode", async () => {
    const noExitWrites: string[] = [];

    await runCheckCommand(
      path.join(fixtureRoot, "node-warning-only"),
      { format: "json", ci: true, failOn: "critical" },
      createTestIO(noExitWrites)
    );

    expect(JSON.parse(noExitWrites.join("")).findings.map((finding: { id: string }) => finding.id)).toContain(
      "runtime.node-version.missing"
    );

    const exitWrites: string[] = [];
    await expect(
      runCheckCommand(
        path.join(fixtureRoot, "node-warning-only"),
        { format: "json", ci: true, failOn: "warning" },
        createTestIO(exitWrites)
      )
    ).rejects.toThrow("exit 1");
  });

  it("normalizes format and fail-on option values", async () => {
    const writes: string[] = [];

    await expect(
      runCheckCommand(
        path.join(fixtureRoot, "node-warning-only"),
        { format: " JSON " as never, ci: true, failOn: " WARNING " as never },
        createTestIO(writes)
      )
    ).rejects.toThrow("exit 1");

    const report = JSON.parse(writes.join("")) as {
      findings: Array<{ id: string }>;
    };

    expect(report.findings.map((finding) => finding.id)).toContain("runtime.node-version.missing");
  });

  it("loads bootlane.config.json for CLI runs", async () => {
    const writes: string[] = [];
    const io = createTestIO(writes);

    await expect(
      runCheckCommand(path.join(fixtureRoot, "node-configured"), { format: "json", ci: true }, io)
    ).rejects.toThrow("exit 1");

    const report = JSON.parse(writes.join("")) as {
      findings: Array<{ id: string; severity: string }>;
    };

    expect(report.findings).toContainEqual(
      expect.objectContaining({
        id: "runtime.node-version.missing",
        severity: "critical"
      })
    );
    expect(report.findings.map((finding) => finding.id)).not.toContain("ci.github-actions.missing");
  });

  it("prints merged config without running analysis", async () => {
    const writes: string[] = [];
    const io = createTestIO(writes);

    await runCheckCommand(
      path.join(fixtureRoot, "node-ignore-config"),
      { printConfig: true, failOn: "warning" },
      io
    );

    const config = JSON.parse(writes.join("")) as {
      ignore: string[];
      failOn: string;
      checks: Record<string, string>;
    };

    expect(config.failOn).toBe("warning");
    expect(config.ignore).toEqual(expect.arrayContaining(["**/node_modules/**", "generated/**"]));
    expect(config.checks["ci.github-actions.missing"]).toBe("off");
  });

  it("rejects conflicting terminal output modes", async () => {
    const writes: string[] = [];
    const io = createTestIO(writes);

    await expectUsageError(
      runCheckCommand(path.join(fixtureRoot, "node-good"), { summary: true, verbose: true }, io),
      "Use either --summary or --verbose, not both."
    );
  });

  it("classifies invalid CLI input as exit code 2", async () => {
    await expectUsageError(
      runCheckCommand(path.join(fixtureRoot, "node-good"), { format: "xml" as never }, createTestIO([])),
      'Unsupported format "xml". Use terminal, json, or markdown.'
    );

    await expectUsageError(
      runCheckCommand(path.join(fixtureRoot, "node-good"), { failOn: "fatal" as never }, createTestIO([])),
      'Unsupported severity "fatal". Use critical, warning, or info.'
    );
  });

  it("classifies invalid config as exit code 2", async () => {
    const tempRoot = path.join(repoRoot, ".cache");
    await mkdir(tempRoot, { recursive: true });
    const tempDir = await mkdtemp(path.join(tempRoot, "cli-config-"));
    const invalidConfigPath = path.join(tempDir, "bootlane.config.json");
    const missingConfigPath = path.join(tempDir, "missing.config.json");

    try {
      await writeFile(invalidConfigPath, "{\"failOn\":\"fatal\"}\n", "utf8");

      await expectUsageError(
        runCheckCommand(path.join(fixtureRoot, "node-good"), { config: invalidConfigPath }, createTestIO([])),
        "Invalid Bootlane config"
      );

      await expectUsageError(
        runCheckCommand(path.join(fixtureRoot, "node-good"), { config: missingConfigPath }, createTestIO([])),
        "Could not read Bootlane config"
      );
    } finally {
      await rm(tempDir, { recursive: true, force: true });
    }
  });

  it("classifies invalid target paths as exit code 2", async () => {
    const tempRoot = path.join(repoRoot, ".cache");
    await mkdir(tempRoot, { recursive: true });
    const tempDir = await mkdtemp(path.join(tempRoot, "cli-target-"));
    const filePath = path.join(tempDir, "not-a-directory.txt");

    try {
      await writeFile(filePath, "not a directory\n", "utf8");

      await expectUsageError(
        runCheckCommand(path.join(tempDir, "missing-repo"), { format: "json" }, createTestIO([])),
        "Target path does not exist"
      );

      await expectUsageError(runCheckCommand(filePath, { format: "json" }, createTestIO([])), "Target path must be a directory");
    } finally {
      await rm(tempDir, { recursive: true, force: true });
    }
  });

  it("classifies commander parse errors as exit code 2", async () => {
    const writes: string[] = [];
    const io = createTestIO(writes);
    const program = createProgram(io);

    await expectUsageError(
      program.parseAsync(["check", "--unknown"], { from: "user" }),
      "unknown option '--unknown'"
    );

    expect(writes.join("")).toContain("error: unknown option '--unknown'");
  });

  it("writes --output reports before applying CI exit behavior", async () => {
    const writes: string[] = [];
    const tempRoot = path.join(repoRoot, ".cache");
    await mkdir(tempRoot, { recursive: true });
    const tempDir = await mkdtemp(path.join(tempRoot, "cli-output-"));
    const outputPath = path.join(tempDir, "bootlane-report.md");

    try {
      await expect(
        runCheckCommand(
          path.join(fixtureRoot, "node-missing-env"),
          { format: "markdown", output: outputPath, ci: true, failOn: "critical" },
          createTestIO(writes)
        )
      ).rejects.toThrow("exit 1");

      expect(writes.join("")).toBe("");

      const output = await readFile(outputPath, "utf8");
      expect(output).toContain("# Bootlane Report");
      expect(output).toContain("## Fix Previews");
      expect(output).toContain("`fix.env-example.create`");
    } finally {
      await rm(tempDir, { recursive: true, force: true });
    }
  });

  it("classifies invalid output paths as exit code 2", async () => {
    const tempRoot = path.join(repoRoot, ".cache");
    await mkdir(tempRoot, { recursive: true });
    const tempDir = await mkdtemp(path.join(tempRoot, "cli-output-invalid-"));

    try {
      await expectUsageError(
        runCheckCommand(
          path.join(fixtureRoot, "node-good"),
          { format: "markdown", output: path.join(tempDir, "missing", "bootlane-report.md") },
          createTestIO([])
        ),
        "Could not write Bootlane report"
      );

      await expectUsageError(
        runCheckCommand(path.join(fixtureRoot, "node-good"), { format: "markdown", output: tempDir }, createTestIO([])),
        "Could not write Bootlane report"
      );
    } finally {
      await rm(tempDir, { recursive: true, force: true });
    }
  });
});

async function expectUsageError(promise: Promise<unknown>, message: string): Promise<void> {
  await promise.then(
    () => {
      throw new Error("Expected command to fail");
    },
    (error: unknown) => {
      expect(error).toBeInstanceOf(Error);
      expect(error instanceof Error ? error.message : String(error)).toContain(message);
      expect(getExitCode(error)).toBe(2);
    }
  );
}

async function expectSuccessfulExit(promise: Promise<unknown>): Promise<void> {
  await promise.then(
    () => {
      throw new Error("Expected command to exit");
    },
    (error: unknown) => {
      expect(getExitCode(error)).toBe(0);
    }
  );
}

function createTestIO(writes: string[]): ProgramIO {
  return {
    stdout: {
      isTTY: false,
      write(value: string | Uint8Array): boolean {
        writes.push(String(value));
        return true;
      }
    },
    stderr: {
      isTTY: false,
      write(value: string | Uint8Array): boolean {
        writes.push(String(value));
        return true;
      }
    },
    cwd: () => repoRoot,
    exit(code: number): never {
      throw new Error(`exit ${code}`);
    }
  };
}
