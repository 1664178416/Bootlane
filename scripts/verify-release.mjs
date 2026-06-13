import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { releaseGateSteps } from "./release-gate-contracts.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const steps = releaseGateSteps.map((step) => [step.label, commandFor(step.run), argsFor(step.run)]);

for (const [label, command, args] of steps) {
  log(`start ${label}`);
  run(command, args);
  log(`ok ${label}`);
}

log("ok release verification");

function run(command, args) {
  const result =
    process.platform === "win32"
      ? spawnSync([quote(command), ...args.map(quote)].join(" "), {
          cwd: rootDir,
          encoding: "utf8",
          shell: true,
          stdio: "inherit"
        })
      : spawnSync(command, args, {
          cwd: rootDir,
          encoding: "utf8",
          stdio: "inherit"
        });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(`${[command, ...args].join(" ")} failed with exit code ${result.status}`);
  }
}

function localBin(name) {
  return path.join(rootDir, "node_modules", ".bin", process.platform === "win32" ? `${name}.cmd` : name);
}

function script(name) {
  return path.join(rootDir, "scripts", name);
}

function commandFor(runSpec) {
  if (runSpec.kind === "localBin") {
    return localBin(runSpec.name);
  }
  if (runSpec.kind === "nodeScript") {
    return process.execPath;
  }
  throw new Error(`Unsupported release gate run kind: ${runSpec.kind}`);
}

function argsFor(runSpec) {
  if (runSpec.kind === "localBin") {
    return runSpec.args ?? [];
  }
  if (runSpec.kind === "nodeScript") {
    return [script(runSpec.name), ...(runSpec.args ?? [])];
  }
  throw new Error(`Unsupported release gate run kind: ${runSpec.kind}`);
}

function quote(value) {
  return `"${String(value).replaceAll('"', '\\"')}"`;
}

function log(message) {
  process.stdout.write(`${message}\n`);
}
