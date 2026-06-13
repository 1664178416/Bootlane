import { cp, mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cliPackagePath = path.join(rootDir, "packages", "cli", "package.json");
const cliPackage = JSON.parse(await readFile(cliPackagePath, "utf8"));
const binPath = cliPackage.bin?.bootlane;

if (!binPath) {
  throw new Error("packages/cli/package.json is missing bin.bootlane");
}

const resolvedBinPath = path.join(rootDir, "packages", "cli", binPath);

const versionOutput = run(["--version"]);
assertIncludes(versionOutput, cliPackage.version, "version output should include the CLI package version");
log(`ok version ${versionOutput.trim()}`);

const rootHelp = run(["--help"]);
assertIncludes(rootHelp, "Usage: bootlane", "root help should include usage");
assertIncludes(rootHelp, "Check whether a repository is ready to run.", "root help should include description");

const checkHelp = run(["check", "--help"]);
assertIncludes(checkHelp, "Usage: bootlane check", "check help should include usage");
assertIncludes(checkHelp, "--format <format>", "check help should include format option");
assertIncludes(checkHelp, "--print-config", "check help should include print-config option");
log("ok help output");

const invalidFormat = run(
  ["check", path.join(rootDir, "examples", "fixtures", "node-good"), "--format", "xml"],
  { expectedStatus: 2, stream: "stderr" }
);
assertIncludes(invalidFormat, 'Unsupported format "xml"', "invalid format should explain supported formats");

const invalidSeverity = run(
  ["check", path.join(rootDir, "examples", "fixtures", "node-good"), "--ci", "--fail-on", "fatal"],
  { expectedStatus: 2, stream: "stderr" }
);
assertIncludes(invalidSeverity, 'Unsupported severity "fatal"', "invalid severity should explain supported severities");

const invalidConfig = run(
  [
    "check",
    path.join(rootDir, "examples", "fixtures", "node-good"),
    "--config",
    path.join(rootDir, "examples", "fixtures", "node-good", "missing.bootlane.config.json")
  ],
  { expectedStatus: 2, stream: "stderr" }
);
assertIncludes(invalidConfig, "Could not read Bootlane config", "invalid config should explain config read failure");

const invalidTarget = run(
  ["check", path.join(rootDir, "examples", "fixtures", "missing-target"), "--format", "json"],
  { expectedStatus: 2, stream: "stderr" }
);
assertIncludes(invalidTarget, "Target path does not exist", "invalid target should explain missing path");

const invalidOutput = run(
  [
    "check",
    path.join(rootDir, "examples", "fixtures", "node-good"),
    "--format",
    "markdown",
    "--output",
    path.join(rootDir, "examples", "fixtures", "node-good", "missing-output-dir", "bootlane-report.md")
  ],
  { expectedStatus: 2, stream: "stderr" }
);
assertIncludes(invalidOutput, "Could not write Bootlane report", "invalid output should explain write failure");
log("ok invalid CLI usage, config, target, and output exit code");

const nodeGoodReport = parseJsonOutput(
  run(["check", path.join(rootDir, "examples", "fixtures", "node-good"), "--format", "json"]),
  "node-good JSON report"
);
assertGoodReport(nodeGoodReport, "node", "node-good");
log("ok node-good JSON report");

const defaultCommandReport = parseJsonOutput(
  run([path.join(rootDir, "examples", "fixtures", "node-good"), "--format", "json"]),
  "default check JSON report"
);
assertGoodReport(defaultCommandReport, "node", "node-good");
log("ok default check command");

const pythonGoodReport = parseJsonOutput(
  run(["check", path.join(rootDir, "examples", "fixtures", "python-good"), "--format", "json"]),
  "python-good JSON report"
);
assertGoodReport(pythonGoodReport, "python", "python-good");
log("ok python-good JSON report");

const markdownOutput = run(["check", path.join(rootDir, "examples", "fixtures", "node-missing-env"), "--format", "markdown"]);
assertIncludes(markdownOutput, "## Fix Previews", "markdown output should include fix preview summaries");
assertIncludes(markdownOutput, "`fix.env-example.create`", "markdown output should include the env fix proposal ID");
assertIncludes(markdownOutput, "Action: `create_file` `.env.example`", "markdown output should include the env fix action");
assertExcludes(markdownOutput, "DATABASE_URL=\nVITE_API_URL=", "markdown output should not embed full fix content");
log("ok markdown fix preview summary");

const outputSmokeDir = await mkdtemp(path.join(tmpdir(), "bootlane-smoke-"));
try {
  const outputReportPath = path.join(outputSmokeDir, "bootlane-report.md");
  const ciOutput = run(
    [
      "check",
      path.join(rootDir, "examples", "fixtures", "node-missing-env"),
      "--format",
      "markdown",
      "--output",
      outputReportPath,
      "--ci",
      "--fail-on",
      "critical"
    ],
    { expectedStatus: 1 }
  );
  assertEqual(ciOutput, "", "--output CI smoke should not print the report to stdout");

  const savedOutput = await readFile(outputReportPath, "utf8");
  assertIncludes(savedOutput, "# Bootlane Report", "--output CI smoke should write a Markdown report");
  assertIncludes(savedOutput, "## Fix Previews", "--output CI smoke should preserve fix preview summaries");
  log("ok output artifact on CI failure path");
} finally {
  await rm(outputSmokeDir, { recursive: true, force: true });
}

const readonlySmokeDir = await mkdtemp(path.join(tmpdir(), "bootlane-readonly-"));
try {
  const sourceFixturePath = path.join(rootDir, "examples", "fixtures", "node-missing-env");
  const targetFixturePath = path.join(readonlySmokeDir, "node-missing-env");
  await cp(sourceFixturePath, targetFixturePath, { recursive: true });

  const before = await snapshotDirectory(targetFixturePath);
  run(["check", targetFixturePath, "--verbose", "--no-color"]);
  const after = await snapshotDirectory(targetFixturePath);
  assertEqual(after, before, "bootlane check should not mutate analyzed project files");
  log("ok read-only check smoke");
} finally {
  await rm(readonlySmokeDir, { recursive: true, force: true });
}

function run(args, options = {}) {
  const expectedStatus = options.expectedStatus ?? 0;
  const stream = options.stream ?? "stdout";
  const result = spawnSync(process.execPath, [resolvedBinPath, ...args], {
    cwd: rootDir,
    encoding: "utf8"
  });

  if (result.status !== expectedStatus) {
    if (result.stdout) {
      process.stderr.write(result.stdout);
    }
    if (result.stderr) {
      process.stderr.write(result.stderr);
    }
    if (result.error) {
      process.stderr.write(`${result.error.message}\n`);
    }
    throw new Error(`bootlane bin smoke failed: ${args.join(" ")} (expected ${expectedStatus}, got ${result.status})`);
  }

  return stream === "stderr" ? result.stderr : result.stdout;
}

function log(message) {
  process.stdout.write(`${message}\n`);
}

function parseJsonOutput(output, label) {
  try {
    return JSON.parse(output);
  } catch (error) {
    throw new Error(`${label} should be valid JSON: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function assertGoodReport(report, expectedType, fixtureName) {
  assertEqual(report.schemaVersion, "1", `${fixtureName} should use report schema version 1`);
  assertEqual(report.project.type, expectedType, `${fixtureName} should be detected as ${expectedType}`);
  assertEqual(report.score.value, 100, `${fixtureName} should have a perfect score`);
  assertArrayLength(report.findings, 0, `${fixtureName} should not report findings`);
  assertArrayLength(report.fixProposals, 0, `${fixtureName} should not report fix proposals`);
}

function assertIncludes(value, expected, message) {
  if (!value.includes(expected)) {
    throw new Error(`${message}: expected to include ${JSON.stringify(expected)}`);
  }
}

function assertExcludes(value, unexpected, message) {
  if (value.includes(unexpected)) {
    throw new Error(`${message}: expected to exclude ${JSON.stringify(unexpected)}`);
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

function assertArrayLength(value, expectedLength, message) {
  if (!Array.isArray(value) || value.length !== expectedLength) {
    throw new Error(`${message}: expected array length ${expectedLength}, got ${JSON.stringify(value)}`);
  }
}

async function snapshotDirectory(directoryPath) {
  const entries = await listFiles(directoryPath);
  const snapshot = [];

  for (const filePath of entries) {
    const relativePath = path.relative(directoryPath, filePath).replaceAll(path.sep, "/");
    const content = await readFile(filePath, "utf8");
    snapshot.push([relativePath, content]);
  }

  return JSON.stringify(snapshot);
}

async function listFiles(directoryPath) {
  const entries = await readdir(directoryPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directoryPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(entryPath)));
    } else if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files.sort();
}
