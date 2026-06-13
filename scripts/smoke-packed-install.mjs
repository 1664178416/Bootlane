import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const smokeDir = await mkdtemp(path.join(tmpdir(), "bootlane-packed-install-"));

try {
  const coreTarball = packPackage(path.join(rootDir, "packages", "core"), "@bootlane/core", smokeDir);
  const cliTarball = packPackage(path.join(rootDir, "packages", "cli"), "bootlane", smokeDir);
  await writeFile(
    path.join(smokeDir, "package.json"),
    `${JSON.stringify({ private: true, type: "module" }, null, 2)}\n`,
    "utf8"
  );

  await writeFile(path.join(smokeDir, ".npmrc"), "audit=false\nfund=false\n", "utf8");
  await run(
    process.platform === "win32" ? "npm install --package-lock=false --ignore-scripts" : "npm",
    process.platform === "win32" ? [coreTarball, cliTarball] : ["install", "--package-lock=false", "--ignore-scripts", coreTarball, cliTarball],
    {
      cwd: smokeDir
    }
  );

  const installedBin = path.join(
    smokeDir,
    "node_modules",
    ".bin",
    process.platform === "win32" ? "bootlane.cmd" : "bootlane"
  );
  const versionOutput = run(installedBin, ["--version"], { cwd: smokeDir }).stdout.trim();
  assertEqual(versionOutput, "0.1.0", "installed bootlane version");

  const reportOutput = run(
    installedBin,
    ["check", path.join(rootDir, "examples", "fixtures", "node-good"), "--format", "json"],
    { cwd: smokeDir }
  ).stdout;
  const report = JSON.parse(reportOutput);
  assertEqual(report.schemaVersion, "1", "installed bootlane report schema version");
  assertEqual(report.project.type, "node", "installed bootlane should analyze node-good as node");
  assertEqual(report.score.value, 100, "installed bootlane should report node-good as healthy");
  assertArrayLength(report.findings, 0, "installed bootlane node-good findings");

  log(`ok packed install smoke (${smokeDir})`);
} finally {
  await rm(smokeDir, { recursive: true, force: true });
}

function packPackage(packageDir, packageName, destinationDir) {
  const result = run(
    process.platform === "win32" ? "npm pack --json --pack-destination" : "npm",
    process.platform === "win32" ? [destinationDir] : ["pack", "--json", "--pack-destination", destinationDir],
    { cwd: packageDir }
  );
  const packResult = parseSinglePackResult(result.stdout, packageName);
  return path.join(destinationDir, packResult.filename);
}

function parseSinglePackResult(output, packageName) {
  const value = JSON.parse(output);
  if (!Array.isArray(value) || value.length !== 1 || typeof value[0] !== "object" || value[0] === null) {
    throw new Error(`${packageName} npm pack output should contain one result`);
  }
  return value[0];
}

function run(command, args, options) {
  const result =
    process.platform === "win32"
      ? spawnSync([command, ...args.map(quote)].join(" "), {
          cwd: options.cwd,
          encoding: "utf8",
          shell: true
        })
      : spawnSync(command, args, {
          cwd: options.cwd,
          encoding: "utf8"
        });

  if (result.status !== 0) {
    writeCommandOutput(result);
    throw new Error(`${[command, ...args].join(" ")} failed with exit code ${result.status}`);
  }

  return {
    stdout: result.stdout,
    stderr: result.stderr
  };
}

function writeCommandOutput(result) {
  if (result.stdout) {
    process.stderr.write(result.stdout);
  }
  if (result.stderr) {
    process.stderr.write(result.stderr);
  }
  if (result.error) {
    process.stderr.write(`${result.error.message}\n`);
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

function quote(value) {
  return `"${String(value).replaceAll('"', '\\"')}"`;
}

function log(message) {
  process.stdout.write(`${message}\n`);
}
