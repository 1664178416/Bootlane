import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { releaseGateSteps } from "./release-gate-contracts.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workflow = await read(".github/workflows/ci.yml");
const rootPackage = JSON.parse(await read("package.json"));

const expectedRunCommands = ["pnpm install --frozen-lockfile", ...releaseGateSteps.map((step) => step.command)];
const actualRunCommands = [...workflow.matchAll(/^\s*run:\s*(.+)$/gm)].map((match) => match[1].trim());

for (const expected of [
  "name: CI",
  "pull_request:",
  "push:",
  "branches:",
  "- main",
  "permissions:",
  "contents: read",
  "jobs:",
  "test:",
  "name: Node ${{ matrix.node-version }}",
  "runs-on: ubuntu-latest",
  "fail-fast: false",
  "matrix:",
  "node-version:",
  "- 22",
  "- 24",
  "actions/checkout@v6",
  "pnpm/action-setup@v6",
  "actions/setup-node@v6",
  "version: 8.15.3",
  "run_install: false",
  "cache: pnpm"
]) {
  assertIncludes(workflow, expected, `CI workflow should include ${expected}`);
}

for (const forbidden of [
  "contents: write",
  "id-token: write",
  "NPM_TOKEN",
  "NODE_AUTH_TOKEN",
  "npm publish",
  "workflow_dispatch:",
  "packages: write",
  "pull-requests: write"
]) {
  assert(!workflow.includes(forbidden), `CI workflow should not include ${forbidden}`);
}

for (const forbiddenPattern of [/^\s{2}release:\s*$/m]) {
  assert(!forbiddenPattern.test(workflow), `CI workflow should not include ${forbiddenPattern}`);
}

assertEqual(
  rootPackage.packageManager,
  "pnpm@8.15.3",
  "root package manager should match CI pnpm setup version"
);

assertArrayEqual(actualRunCommands, expectedRunCommands, "CI run command order should match release gate contract");

for (const step of releaseGateSteps) {
  assertIncludes(workflow, `run: ${step.command}`, `CI workflow should run release gate ${step.id}`);
}

log(`ok CI workflow contract (${actualRunCommands.length} run commands)`);

async function read(relativePath) {
  return readFile(path.join(rootDir, relativePath), "utf8");
}

function assertArrayEqual(actual, expected, message) {
  assertEqual(actual.length, expected.length, `${message} length`);
  for (const [index, expectedValue] of expected.entries()) {
    assertEqual(actual[index], expectedValue, `${message} at index ${index}`);
  }
}

function assertIncludes(value, expected, message) {
  if (!value.includes(expected)) {
    throw new Error(`${message}: expected to include ${JSON.stringify(expected)}`);
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function log(message) {
  process.stdout.write(`${message}\n`);
}
