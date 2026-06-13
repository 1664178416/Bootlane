import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const changelog = await read("CHANGELOG.md");
const rootPackage = JSON.parse(await read("package.json"));
const workflow = await read(".github/workflows/ci.yml");
const verifyRelease = await read("scripts/verify-release.mjs");
const gateContracts = await read("scripts/release-gate-contracts.mjs");
const metadataCheck = await read("scripts/check-package-metadata.mjs");
const readme = await read("README.md");
const contributing = await read("CONTRIBUTING.md");
const release = await read("docs/RELEASE.md");
const releaseEvidence = await read("docs/RELEASE_EVIDENCE.md");
const qualityGates = await read("docs/QUALITY_GATES.md");
const techStack = await read("docs/TECH_STACK.md");
const githubActions = await read("docs/GITHUB_ACTIONS.md");

for (const expected of [
  "# Changelog",
  "## 0.1.0 - Unreleased",
  "### Added",
  "### Notes",
  "Node.js repository detection",
  "Python repository detection",
  "Package-manager-aware diagnostics",
  "Terminal, JSON, and Markdown reports",
  "`--summary`",
  "`--verbose`",
  "`--output`",
  "`bootlane.config.json`",
  "Dry-run fix proposals",
  "`--ci`",
  "`--fail-on`",
  "saved report artifacts before CI exit",
  "built CLI smoke",
  "npm package dry-run",
  "package content assertions",
  "Package contents contract",
  "first-publish release evidence",
  "release evidence snapshot",
  "Release evidence redaction examples",
  "Release evidence dry-run transcript template",
  "Release evidence manual decision log",
  "Release evidence staleness rules",
  "Release publish-window checklist",
  "Release readiness issue form",
  "Release external state confirmations",
  "Release post-publish verification transcript",
  "Release evidence maintainer execution path",
  "Release evidence section guide",
  "Release evidence snapshot focus policy",
  "Release evidence snapshot refresh rules",
  "Release closeout checklist",
  "Launch announcement readiness gate",
  "Post-launch feedback closure matrix",
  "Roadmap candidate review checklist",
  "Roadmap candidate backlog",
  "Roadmap review cadence and status transitions",
  "0.2.0 accuracy work intake",
  "Fixture intake fields",
  "Fixture case matrix",
  "Fixture seed backlog",
  "Seed issue routing fields",
  "Seed triage routing",
  "Seed batch review cadence",
  "Seed evidence comment templates",
  "Seed fixture readiness handoff",
  "Seed verification command sets",
  "Seed evidence record fields",
  "Seed evidence refresh rules",
  "Seed evidence audit checklist",
  "Seed audit outcome routing",
  "Seed audit outcome record templates",
  "Seed fixture implementation batch fields",
  "Seed fixture implementation batch execution checklist",
  "Seed fixture implementation starter batches",
  "Seed fixture implementation PR queue",
  "Seed fixture implementation queued PR readiness checklist",
  "Seed fixture implementation queued PR review handoff",
  "Seed fixture implementation queued PR review outcome routing",
  "Seed fixture implementation queued PR review outcome record templates",
  "Seed fixture implementation queued PR closeout checklist",
  "Seed fixture implementation queued PR closeout record templates",
  "Seed fixture implementation queued PR follow-up queue",
  "Seed fixture implementation queued PR follow-up record templates",
  "Seed fixture implementation queued PR follow-up review cadence",
  "Seed fixture implementation queued PR follow-up review outcome routing",
  "Seed fixture implementation queued PR follow-up review outcome record templates",
  "Seed fixture implementation queued PR follow-up review outcome record audit checklist",
  "Seed fixture implementation queued PR follow-up review outcome record audit outcome routing",
  "Seed fixture implementation queued PR follow-up review outcome record audit outcome record templates",
  "Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout checklist",
  "Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record templates",
  "Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh rules",
  "Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review cadence",
  "Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome routing",
  "Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record templates",
  "Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit checklist",
  "Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing",
  "Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record templates",
  "Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist",
  "Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record templates",
  "Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rules",
  "Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review cadence",
  "Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome routing",
  "Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record templates",
  "Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit checklist",
  "Accuracy work intake closure criteria",
  "Shared release gate contract",
  "CI workflow contract",
  "release safety guard",
  "Release safety fixture matrix",
  "docs/RELEASE_SAFETY_FIXTURES.md",
  "pnpm docs:check-release-safety-fixtures",
  "CLI exit code classification",
  "invalid usage, config, target path, and output path",
  "help output, `check --help`, and default command",
  "Secret redaction",
  "JSON report schema is versioned as `1`",
  "`bootlane check` does not execute project scripts or mutate target repositories",
  "not a vulnerability scanner"
]) {
  assertIncludes(changelog, expected, `CHANGELOG should include ${expected}`);
}

assertEqual(
  rootPackage.scripts?.["docs:check-changelog"],
  "node scripts/check-changelog-doc.mjs",
  "root package should expose changelog docs check"
);

for (const [name, content] of [
  ["CI workflow", workflow],
  ["README", readme],
  ["Contributing guide", contributing],
  ["Release notes", release],
  ["Release evidence", releaseEvidence],
  ["Quality gates", qualityGates],
  ["Tech stack", techStack],
  ["GitHub Actions docs", githubActions]
]) {
  assertIncludes(content, "pnpm docs:check-changelog", `${name} should document changelog validation`);
}

assertIncludes(readme, "docs/ROADMAP.md", "README should link roadmap");
assertIncludes(techStack, "ROADMAP.md", "Tech stack should link roadmap");

for (const [name, content] of [
  ["README", readme],
  ["Contributing guide", contributing],
  ["Release notes", release],
  ["Release evidence", releaseEvidence]
]) {
  assertIncludes(content, "CHANGELOG.md", `${name} should link or mention the changelog`);
}

assertIncludes(verifyRelease, "release-gate-contracts.mjs", "verify release should use the release gate contract");
assertIncludes(gateContracts, "check-changelog-doc.mjs", "release gate contract should run changelog docs validation");
assertIncludes(metadataCheck, "docs:check-changelog", "metadata check should guard changelog docs script");
assertIncludes(workflow, "Validate changelog docs", "CI should name changelog docs validation");
assertIncludes(qualityGates, "Changelog docs validation.", "quality gates should list changelog verify stage");
assertIncludes(qualityGates, "Release safety fixture docs validation.", "quality gates should list release safety fixture docs stage");

log("ok changelog doc");

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

function log(message) {
  process.stdout.write(`${message}\n`);
}
