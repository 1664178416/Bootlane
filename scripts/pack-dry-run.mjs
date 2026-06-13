import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { packageContracts } from "./package-contracts.mjs";

for (const packageContract of packageContracts) {
  const readme = await readFile(path.join(packageContract.dir, "README.md"), "utf8");
  for (const expectedContent of packageContract.requiredReadmeContent) {
    assert(readme.includes(expectedContent), `${packageContract.name} README should include ${expectedContent}`);
  }

  const result =
    process.platform === "win32"
      ? spawnSync("npm pack --dry-run --json", {
          cwd: packageContract.dir,
          encoding: "utf8",
          shell: true
        })
      : spawnSync("npm", ["pack", "--dry-run", "--json"], {
          cwd: packageContract.dir,
          encoding: "utf8"
        });

  if (result.error) {
    process.stderr.write(`${result.error.message}\n`);
  }
  if (result.status !== 0) {
    writeCommandOutput(result);
    throw new Error(`npm pack --dry-run failed in ${packageContract.dir}`);
  }

  const packResult = parsePackResult(result.stdout, packageContract.name);
  assertEqual(packResult.name, packageContract.name, `${packageContract.name} pack name`);
  assertEqual(packResult.version, "0.1.0", `${packageContract.name} pack version`);

  const packedFiles = new Set(packResult.files.map((file) => file.path));
  for (const file of packageContract.requiredFiles) {
    assert(packedFiles.has(file), `${packageContract.name} package should include ${file}`);
  }

  log(
    `ok ${packageContract.name} pack dry-run (${packResult.entryCount} files, ${formatBytes(packResult.size)} package)`
  );
}

function parsePackResult(output, packageName) {
  try {
    const value = JSON.parse(output);
    if (!Array.isArray(value) || value.length !== 1 || typeof value[0] !== "object" || value[0] === null) {
      throw new Error("expected one JSON pack result");
    }
    return value[0];
  } catch (error) {
    process.stderr.write(output);
    throw new Error(
      `${packageName} npm pack --dry-run --json output should be parseable: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

function writeCommandOutput(result) {
  if (result.stdout) {
    process.stderr.write(result.stdout);
  }
  if (result.stderr) {
    process.stderr.write(result.stderr);
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

function formatBytes(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "unknown size";
  }

  if (value < 1024) {
    return `${value} B`;
  }

  return `${(value / 1024).toFixed(1)} kB`;
}

function log(message) {
  process.stdout.write(`${message}\n`);
}
