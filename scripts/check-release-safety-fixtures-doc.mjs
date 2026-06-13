import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { releaseGateSteps } from "./release-gate-contracts.mjs";
import { releaseSafetyFixtureCases, releaseSafetyFixtureCleanCase } from "./check-release-safety-fixtures.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const doc = await read("docs/RELEASE_SAFETY_FIXTURES.md");
const readme = await read("README.md");
const contributing = await read("CONTRIBUTING.md");
const release = await read("docs/RELEASE.md");
const qualityGates = await read("docs/QUALITY_GATES.md");
const techStack = await read("docs/TECH_STACK.md");
const githubActions = await read("docs/GITHUB_ACTIONS.md");
const changelog = await read("CHANGELOG.md");
const rootPackage = JSON.parse(await read("package.json"));

await access(path.join(rootDir, "scripts", "check-release-safety-fixtures.mjs"));

assertEqual(
  rootPackage.scripts?.["docs:check-release-safety-fixtures"],
  "node scripts/check-release-safety-fixtures-doc.mjs",
  "root package should expose release safety fixtures doc check"
);

assert(
  releaseGateSteps.some((step) => step.command === "pnpm docs:check-release-safety-fixtures"),
  "release gate contract should include release safety fixtures docs"
);

for (const expected of [
  "Bootlane Release Safety Fixtures",
  "Clean Fixture",
  "Negative Fixture Matrix",
  "Coverage Boundaries",
  "scripts/check-release-safety-fixtures.mjs",
  "scripts/check-release-safety.mjs",
  "pnpm release-safety:fixtures",
  "pnpm docs:check-release-safety-fixtures",
  "Final Bootlane repository URL",
  "manual first release",
  "not a vulnerability scanner",
  releaseSafetyFixtureCleanCase.name,
  releaseSafetyFixtureCleanCase.covers,
  releaseSafetyFixtureCleanCase.expected
]) {
  assertIncludes(doc, expected, `RELEASE_SAFETY_FIXTURES should include ${expected}`);
}

for (const testCase of releaseSafetyFixtureCases) {
  assertIncludes(doc, testCase.name, `RELEASE_SAFETY_FIXTURES should document fixture ${testCase.name}`);
  assertIncludes(doc, testCase.covers, `RELEASE_SAFETY_FIXTURES should document coverage for ${testCase.name}`);
  assertIncludes(doc, testCase.expected, `RELEASE_SAFETY_FIXTURES should document expected failure for ${testCase.name}`);
}

for (const [name, content] of [
  ["README", readme],
  ["Contributing guide", contributing],
  ["Release notes", release],
  ["Quality gates", qualityGates],
  ["Tech stack", techStack],
  ["GitHub Actions docs", githubActions],
  ["Changelog", changelog]
]) {
  assertIncludes(content, "RELEASE_SAFETY_FIXTURES.md", `${name} should link release safety fixtures`);
  assertIncludes(
    content,
    "pnpm docs:check-release-safety-fixtures",
    `${name} should document release safety fixtures docs validation`
  );
}

log(`ok release safety fixtures doc (${releaseSafetyFixtureCases.length} negative cases)`);

async function read(relativePath) {
  return readFile(path.join(rootDir, relativePath), "utf8");
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
