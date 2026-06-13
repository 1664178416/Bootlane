import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registry = "https://registry.npmjs.org";
const packagePaths = [
  path.join(rootDir, "packages", "core", "package.json"),
  path.join(rootDir, "packages", "cli", "package.json")
];

for (const packagePath of packagePaths) {
  const packageJson = JSON.parse(await readFile(packagePath, "utf8"));
  const result = npmView(packageJson.name);

  if (result.status === 0) {
    const version = parseVersion(result.stdout);
    throw new Error(`${packageJson.name} is already published on npm${version ? ` at version ${version}` : ""}`);
  }

  const output = `${result.stdout}\n${result.stderr}`;
  if (output.includes("E404") || output.includes("Not Found")) {
    log(`ok ${packageJson.name} is not published on npmjs.org`);
    continue;
  }

  writeCommandOutput(result);
  throw new Error(`${packageJson.name} availability check failed; retry with network access to ${registry}`);
}

function npmView(packageName) {
  const args = ["view", packageName, "version", "--json", "--registry", registry];

  return process.platform === "win32"
    ? spawnSync(["npm", ...args].join(" "), {
        cwd: rootDir,
        encoding: "utf8",
        shell: true
      })
    : spawnSync("npm", args, {
        cwd: rootDir,
        encoding: "utf8"
      });
}

function parseVersion(output) {
  try {
    const value = JSON.parse(output);
    return typeof value === "string" ? value : undefined;
  } catch {
    return output.trim() || undefined;
  }
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

function log(message) {
  process.stdout.write(`${message}\n`);
}
