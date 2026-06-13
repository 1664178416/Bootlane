import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { qualityGateCommands, releaseGateSteps } from "./release-gate-contracts.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const quality = await read("docs/QUALITY_GATES.md");
const readme = await read("README.md");
const release = await read("docs/RELEASE.md");
const techStack = await read("docs/TECH_STACK.md");
const githubActions = await read("docs/GITHUB_ACTIONS.md");
const contributing = await read("CONTRIBUTING.md");

for (const expected of [
  "Quick Reference",
  "Daily Development",
  "Pull Request Gate",
  "CI Gate",
  "Release Gate",
  "Networked Release Checks",
  "Manual Release Checks",
  "Gate Ownership",
  "Read-Only Contract"
]) {
  assertIncludes(quality, expected, `QUALITY_GATES should include ${expected}`);
}

for (const expected of qualityGateCommands) {
  assertIncludes(quality, expected, `QUALITY_GATES should document ${expected}`);
}

for (const expected of releaseGateSteps.map((step) => step.qualityStage)) {
  assertIncludes(quality, expected, `QUALITY_GATES should document verify stage ${expected}`);
}

for (const expected of [
  "Node 22 and Node 24",
  "npm registry state",
  "git remote -v",
  "repository`, `homepage`, and `bugs`",
  "PACKAGE_CONTENTS.md",
  "RELEASE_EVIDENCE.md",
  "RELEASE_EVIDENCE_SNAPSHOT.md",
  "RELEASE_SAFETY_FIXTURES.md",
  "ROADMAP.md",
  "scripts/release-gate-contracts.mjs",
  "CHANGELOG.md",
  "Do not use a green local gate as publish approval",
  "Manual repository identity checks",
  "private security reporting channel",
  "secret redaction across JSON, Markdown, and terminal output",
  "Focused scanner tests cover GitHub token, AWS access key ID, OpenAI API key, and private key block previews",
  "npx bootlane@latest --version",
  "npx bootlane@latest check --help",
  "must not mutate analyzed repositories",
  "must not mutate analyzed repositories, install dependencies, execute project scripts"
]) {
  assertIncludes(quality, expected, `QUALITY_GATES should preserve boundary ${expected}`);
}

for (const [name, content] of [
  ["README", readme],
  ["Release notes", release],
  ["Tech stack", techStack],
  ["GitHub Actions docs", githubActions],
  ["Contributing guide", contributing]
]) {
  assertIncludes(content, "QUALITY_GATES.md", `${name} should link quality gates`);
}

log("ok quality gates doc");

async function read(relativePath) {
  return readFile(path.join(rootDir, relativePath), "utf8");
}

function assertIncludes(value, expected, message) {
  if (!value.includes(expected)) {
    throw new Error(`${message}: expected to include ${JSON.stringify(expected)}`);
  }
}

function log(message) {
  process.stdout.write(`${message}\n`);
}
