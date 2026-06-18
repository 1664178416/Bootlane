import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contributingPath = path.join(rootDir, "CONTRIBUTING.md");
const readmePath = path.join(rootDir, "README.md");

const contributing = await readFile(contributingPath, "utf8");
const readme = await readFile(readmePath, "utf8");

assertIncludes(readme, "CONTRIBUTING.md", "README should link contributing guide");

for (const expected of [
  "pnpm build",
  "pnpm example:report:check",
  "pnpm test",
  "pnpm docs:check-contributing",
  "pnpm docs:check-templates",
  "pnpm docs:check-triage",
  "pnpm docs:check-quality-gates",
  "pnpm ci:workflow:check",
  "pnpm docs:check-security",
  "pnpm docs:check-package-contents",
  "pnpm docs:check-release-evidence",
  "pnpm release:evidence:check",
  "pnpm release:gates:check",
  "pnpm docs:check-changelog",
  "pnpm docs:check-ids",
  "pnpm docs:check-release-blockers",
  "pnpm metadata:check",
  "pnpm release-safety:check",
  "pnpm release-safety:fixtures",
  "pnpm docs:check-release-safety-fixtures",
  "pnpm smoke:bin",
  "pnpm pack:dry-run",
  "pnpm verify:release",
  "pnpm npm-names:check",
  "pnpm smoke:packed-install"
]) {
  assertIncludes(contributing, expected, `CONTRIBUTING should mention ${expected}`);
}

for (const expected of [
  "docs/ADDING_CHECKS.md",
  "docs/CHECK_IDS.md",
  "docs/REPORT_SCHEMA.md",
  "SECURITY.md",
  "docs/CONFIGURATION.md",
  "docs/FIX_PREVIEW.md",
  "docs/GITHUB_ACTIONS.md",
  "docs/PACKAGE_CONTENTS.md",
  "docs/RELEASE_EVIDENCE.md",
  "docs/RELEASE_EVIDENCE_SNAPSHOT.md",
  "docs/RELEASE_SAFETY_FIXTURES.md",
  "docs/ROADMAP.md",
  "CHANGELOG.md",
  "docs/QUALITY_GATES.md",
  "docs/LAUNCH.md",
  "docs/TRIAGE.md",
  "docs/RELEASE_BLOCKERS.md"
]) {
  assertIncludes(contributing, expected, `CONTRIBUTING should link ${expected}`);
}

assertIncludes(contributing, ".github/PULL_REQUEST_TEMPLATE.md", "CONTRIBUTING should link PR template");

for (const expected of [
  "Keep checks read-only",
  "bootlane check",
  "must not execute project scripts or write files",
  "Regenerate the example Markdown report with `pnpm example:report`",
  "pnpm release:evidence",
  "do not guess the final Bootlane repository URL",
  "Roadmap Candidate Review",
  "Roadmap",
  "review cadence",
  "status transitions",
  "0.2.0 Accuracy Work Intake",
  "Fixture Intake Fields",
  "Fixture Case Matrix",
  "Fixture Seed Backlog",
  "Seed Issue Routing Fields",
  "Seed Triage Routing",
  "Seed Batch Review Cadence",
  "Seed Evidence Comment Templates",
  "Seed Fixture Readiness Handoff",
  "Seed Verification Command Sets",
  "Seed Evidence Record Fields",
  "Seed Evidence Refresh Rules",
  "Seed Evidence Audit Checklist",
  "Seed Audit Outcome Routing",
  "Seed Audit Outcome Record Templates",
  "Seed Fixture Implementation Batch Fields",
  "Seed Fixture Implementation Batch Execution Checklist",
  "Seed Fixture Implementation Starter Batches",
  "Seed Fixture Implementation PR Queue",
  "Seed Fixture Implementation Queued PR Readiness Checklist",
  "Seed Fixture Implementation Queued PR Review Handoff",
  "Seed Fixture Implementation Queued PR Review Outcome Routing",
  "Seed Fixture Implementation Queued PR Review Outcome Record Templates",
  "Seed Fixture Implementation Queued PR Closeout Checklist",
  "Seed Fixture Implementation Queued PR Closeout Record Templates",
  "Seed Fixture Implementation Queued PR Follow-Up Queue",
  "Seed Fixture Implementation Queued PR Follow-Up Record Templates",
  "Seed Fixture Implementation Queued PR Follow-Up Review Cadence",
  "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing",
  "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates",
  "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Checklist",
  "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Routing",
  "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates",
  "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Checklist",
  "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Templates",
  "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules",
  "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence",
  "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing",
  "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates",
  "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist",
  "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing",
  "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates",
  "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist",
  "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates",
  "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules",
  "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence",
  "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing",
  "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates",
  "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist",
  "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing",
  "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates",
  "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist",
  "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates",
  "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules",
  "Accuracy Work Intake Closure Criteria",
  "pnpm release-safety:check",
  "pnpm release-safety:fixtures",
  "pnpm docs:check-release-safety-fixtures",
  "Network-dependent checks in the default `check` path"
]) {
  assertIncludes(contributing, expected, `CONTRIBUTING should preserve guidance: ${expected}`);
}

log("ok contributing doc");

function assertIncludes(value, expected, message) {
  if (!value.includes(expected)) {
    throw new Error(`${message}: expected to include ${JSON.stringify(expected)}`);
  }
}

function log(message) {
  process.stdout.write(`${message}\n`);
}
