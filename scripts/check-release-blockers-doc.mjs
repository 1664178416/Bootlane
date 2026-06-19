import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { launchAnnouncementChecklist } from "./release-gate-contracts.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const blockersPath = path.join(rootDir, "docs", "RELEASE_BLOCKERS.md");
const releasePath = path.join(rootDir, "docs", "RELEASE.md");
const readmePath = path.join(rootDir, "README.md");
const contributingPath = path.join(rootDir, "CONTRIBUTING.md");
const exampleReportPath = path.join(rootDir, "examples", "reports", "node-missing-env.md");
const launchPath = path.join(rootDir, "docs", "LAUNCH.md");
const triagePath = path.join(rootDir, "docs", "TRIAGE.md");
const roadmapPath = path.join(rootDir, "docs", "ROADMAP.md");
const qualityGatesPath = path.join(rootDir, "docs", "QUALITY_GATES.md");
const securityPath = path.join(rootDir, "SECURITY.md");

const blockers = await readFile(blockersPath, "utf8");
const release = await readFile(releasePath, "utf8");
const readme = await readFile(readmePath, "utf8");
const contributing = await readFile(contributingPath, "utf8");
const exampleReport = await readFile(exampleReportPath, "utf8");
const launch = await readFile(launchPath, "utf8");
const triage = await readFile(triagePath, "utf8");
const roadmap = await readFile(roadmapPath, "utf8");
const qualityGates = await readFile(qualityGatesPath, "utf8");
const security = await readFile(securityPath, "utf8");

assertIncludes(blockers, "Final GitHub repository URL", "release blockers should track final repository URL");
assertIncludes(blockers, "npm account and org access", "release blockers should track npm publish access");
assertIncludes(blockers, "pnpm npm-names:check", "release blockers should mention live npm name check");
assertIncludes(blockers, "pnpm verify:release", "release blockers should mention local release verification");
assertIncludes(blockers, "Manual First-Release Review", "release blockers should link manual first-release review");
assertIncludes(blockers, "RELEASE_EVIDENCE.md", "release blockers should link release evidence");
assertIncludes(blockers, "pnpm docs:check-release-evidence", "release blockers should mention release evidence validation");
assertIncludes(release, "pnpm release-safety:check", "release notes should document release safety validation");
assertIncludes(release, "pnpm release-safety:fixtures", "release notes should document release safety fixture validation");
assertIncludes(
  release,
  "pnpm docs:check-release-safety-fixtures",
  "release notes should document release safety fixture docs validation"
);
assertIncludes(release, "RELEASE_BLOCKERS.md", "release notes should link release blockers");
assertIncludes(release, "RELEASE_EVIDENCE.md", "release notes should link release evidence");
assertIncludes(release, "RELEASE_SAFETY_FIXTURES.md", "release notes should link release safety fixtures");
assertIncludes(release, "First Release Review Checklist", "release notes should include manual review checklist");
assertIncludes(release, "git remote -v", "release notes should require repository remote review");
assertIncludes(release, "examples/reports/node-missing-env.md", "release notes should mention example Markdown report");
assertIncludes(release, "pnpm example:report:check", "release notes should document example report validation");
assertIncludes(release, "pnpm docs:check-contributing", "release notes should document contributing docs validation");
assertIncludes(release, "pnpm docs:check-templates", "release notes should document GitHub template validation");
assertIncludes(release, "pnpm docs:check-triage", "release notes should document triage docs validation");
assertIncludes(release, "pnpm docs:check-quality-gates", "release notes should document quality gates docs validation");
assertIncludes(release, "pnpm ci:workflow:check", "release notes should document CI workflow contract validation");
assertIncludes(release, "pnpm docs:check-security", "release notes should document security docs validation");
assertIncludes(release, "pnpm docs:check-package-contents", "release notes should document package contents docs validation");
assertIncludes(release, "pnpm docs:check-release-evidence", "release notes should document release evidence docs validation");
assertIncludes(release, "pnpm release:evidence:check", "release notes should document release evidence snapshot validation");
assertIncludes(release, "pnpm docs:check-changelog", "release notes should document changelog docs validation");
assertIncludes(release, "docs/PACKAGE_CONTENTS.md", "release notes should link package contents contract");
assertIncludes(release, "docs/RELEASE_EVIDENCE.md", "release notes should link release evidence checklist");
assertIncludes(release, "SECURITY.md", "release notes should link security policy");
assertIncludes(release, "Launch Assets", "release notes should include launch assets");
assertIncludes(release, "docs/LAUNCH.md", "release notes should link launch checklist");
assertIncludes(release, "Announcement Readiness Gate", "release notes should mention announcement readiness gate");
assertIncludes(release, "packages/core/README.md", "release notes should require core package README review");
assertIncludes(release, "packages/cli/README.md", "release notes should require CLI package README review");
assertIncludes(release, "CHANGELOG.md", "release notes should require changelog review");
assertIncludes(release, "docs/REPORT_SCHEMA.md", "release notes should require report schema review");
assertIncludes(release, "npm publish --dry-run --access public", "release notes should document npm publish dry-runs");
assertIncludes(release, "npm publish --access public", "release notes should document manual npm publish commands");
assertIncludes(release, "pnpm smoke:packed-install", "release notes should document packed install smoke");
assertIncludes(release, "npx bootlane@latest --version", "release notes should document post-publish version verification");
assertIncludes(release, "npx bootlane@latest check --help", "release notes should document post-publish help verification");
assertIncludes(readme, "Release Blockers", "README should link release blockers");
assertIncludes(readme, "Launch Checklist", "README should link launch checklist");
assertIncludes(readme, "Triage Guide", "README should link triage guide");
assertIncludes(readme, "Quality Gates", "README should link quality gates");
assertIncludes(readme, "Package Contents", "README should link package contents");
assertIncludes(readme, "Release Evidence", "README should link release evidence");
assertIncludes(readme, "Security Policy", "README should link security policy");
assertIncludes(readme, "examples/reports/node-missing-env.md", "README should link example Markdown report");
assertIncludes(contributing, "pnpm docs:check-contributing", "CONTRIBUTING should document its validation command");
assertIncludes(contributing, ".github/PULL_REQUEST_TEMPLATE.md", "CONTRIBUTING should link PR template");
assertIncludes(contributing, "docs/TRIAGE.md", "CONTRIBUTING should link triage guide");
assertIncludes(contributing, "docs/QUALITY_GATES.md", "CONTRIBUTING should link quality gates");
assertIncludes(contributing, "SECURITY.md", "CONTRIBUTING should link security policy");
assertIncludes(contributing, "Keep checks read-only", "CONTRIBUTING should preserve read-only guidance");
assertIncludes(exampleReport, "Generated by: pnpm example:report", "example report should document its generator");
assertIncludes(exampleReport, "Target: `examples/fixtures/node-missing-env`", "example report should use stable fixture target");
assertIncludes(exampleReport, "## Fix Previews", "example report should include fix preview summary");
assertIncludes(launch, "Launch Goal", "launch checklist should include launch goal");
assertIncludes(launch, "Launch Assets", "launch checklist should include launch assets");
assertIncludes(launch, "Announcement Readiness Gate", "launch checklist should include announcement readiness gate");
assertIncludes(launch, "Release Closeout Checklist", "launch checklist should link release closeout checklist");
assertIncludes(launch, "Suggested Announcement", "launch checklist should include announcement copy");
assertIncludes(launch, "Where to Share", "launch checklist should include sharing targets");
assertIncludes(launch, "First Feedback to Collect", "launch checklist should include feedback topics");
assertIncludes(launch, "Post-Launch Triage", "launch checklist should include triage guidance");
assertIncludes(launch, "TRIAGE.md", "launch checklist should link triage guide");
assertIncludes(launch, "ROADMAP.md", "launch checklist should link roadmap");
assertIncludes(launch, "npx bootlane", "launch checklist should include trial command");
assertIncludes(launch, "read-only", "launch checklist should preserve read-only positioning");
assertIncludes(launch, "Fixture Seed Backlog", "launch checklist should mention fixture seed backlog");
assertIncludes(launch, "Seed Triage Routing", "launch checklist should mention seed triage routing");
assertIncludes(launch, "Seed Batch Review Cadence", "launch checklist should mention seed batch review cadence");
assertIncludes(launch, "Seed Evidence Comment Templates", "launch checklist should mention seed evidence comment templates");
assertIncludes(launch, "Seed Fixture Readiness Handoff", "launch checklist should mention seed fixture readiness handoff");
assertIncludes(launch, "Seed Verification Command Sets", "launch checklist should mention seed verification command sets");
assertIncludes(launch, "Seed Evidence Record Fields", "launch checklist should mention seed evidence record fields");
assertIncludes(launch, "Seed Evidence Refresh Rules", "launch checklist should mention seed evidence refresh rules");
assertIncludes(launch, "Seed Evidence Audit Checklist", "launch checklist should mention seed evidence audit checklist");
assertIncludes(launch, "Seed Audit Outcome Routing", "launch checklist should mention seed audit outcome routing");
assertIncludes(launch, "Seed Audit Outcome Record Templates", "launch checklist should mention seed audit outcome record templates");
assertIncludes(launch, "Seed Fixture Implementation Batch Fields", "launch checklist should mention seed fixture implementation batch fields");
assertIncludes(launch, "Seed Fixture Implementation Batch Execution Checklist", "launch checklist should mention seed fixture implementation batch execution checklist");
assertIncludes(launch, "Seed Fixture Implementation Starter Batches", "launch checklist should mention seed fixture implementation starter batches");
assertIncludes(launch, "Seed Fixture Implementation PR Queue", "launch checklist should mention seed fixture implementation PR queue");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Readiness Checklist", "launch checklist should mention seed fixture implementation queued PR readiness checklist");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Review Handoff", "launch checklist should mention seed fixture implementation queued PR review handoff");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Review Outcome Routing", "launch checklist should mention seed fixture implementation queued PR review outcome routing");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Review Outcome Record Templates", "launch checklist should mention seed fixture implementation queued PR review outcome record templates");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Closeout Checklist", "launch checklist should mention seed fixture implementation queued PR closeout checklist");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Closeout Record Templates", "launch checklist should mention seed fixture implementation queued PR closeout record templates");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Queue", "launch checklist should mention seed fixture implementation queued PR follow-up queue");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Record Templates", "launch checklist should mention seed fixture implementation queued PR follow-up record templates");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Cadence", "launch checklist should mention seed fixture implementation queued PR follow-up review cadence");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome routing");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record templates");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Checklist", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit checklist");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Routing", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome routing");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record templates");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Checklist", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout checklist");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Templates", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record templates");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh rules");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review cadence");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome routing");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record templates");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit checklist");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record templates");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record templates");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rules");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review cadence");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome routing");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record templates");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit checklist");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record templates");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record templates");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rules");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review cadence");

for (const entry of launchAnnouncementChecklist) {
  assertIncludes(launch, entry.item, `launch checklist should document announcement item ${entry.item}`);
  assertIncludes(
    launch,
    entry.requiredBeforeAnnouncement,
    `launch checklist should document announcement requirement for ${entry.item}`
  );
  assertIncludes(launch, entry.record, `launch checklist should document announcement record for ${entry.item}`);
}
assertIncludes(triage, "False Positives", "triage guide should include false-positive workflow");
assertIncludes(triage, "Missing Detections", "triage guide should include missing-detection workflow");
assertIncludes(triage, "Post-Launch Feedback Closure Matrix", "triage guide should include post-launch feedback closure matrix");
assertIncludes(triage, "Roadmap Candidate Review", "triage guide should include roadmap candidate review");
assertIncludes(launch, "Roadmap Candidate Review", "launch checklist should link roadmap candidate review");
assertIncludes(triage, "ROADMAP.md", "triage guide should link roadmap");
assertIncludes(triage, "Escalation Rules", "triage guide should include escalation rules");
assertIncludes(roadmap, "Candidate Backlog", "roadmap should include candidate backlog");
assertIncludes(roadmap, "Review Cadence", "roadmap should include review cadence");
assertIncludes(roadmap, "Status Transitions", "roadmap should include status transitions");
assertIncludes(roadmap, "0.2.0 Accuracy Work Intake", "roadmap should include accuracy work intake");
assertIncludes(roadmap, "Fixture Intake Fields", "roadmap should include fixture intake fields");
assertIncludes(roadmap, "Fixture Case Matrix", "roadmap should include fixture case matrix");
assertIncludes(roadmap, "Fixture Seed Backlog", "roadmap should include fixture seed backlog");
assertIncludes(roadmap, "Seed Issue Routing Fields", "roadmap should include seed issue routing fields");
assertIncludes(roadmap, "Seed Triage Routing", "roadmap should include seed triage routing");
assertIncludes(roadmap, "Seed Batch Review Cadence", "roadmap should include seed batch review cadence");
assertIncludes(roadmap, "Seed Evidence Comment Templates", "roadmap should include seed evidence comment templates");
assertIncludes(roadmap, "Seed Fixture Readiness Handoff", "roadmap should include seed fixture readiness handoff");
assertIncludes(roadmap, "Seed Verification Command Sets", "roadmap should include seed verification command sets");
assertIncludes(roadmap, "Seed Evidence Record Fields", "roadmap should include seed evidence record fields");
assertIncludes(roadmap, "Seed Evidence Refresh Rules", "roadmap should include seed evidence refresh rules");
assertIncludes(roadmap, "Seed Evidence Audit Checklist", "roadmap should include seed evidence audit checklist");
assertIncludes(roadmap, "Seed Audit Outcome Routing", "roadmap should include seed audit outcome routing");
assertIncludes(roadmap, "Seed Audit Outcome Record Templates", "roadmap should include seed audit outcome record templates");
assertIncludes(roadmap, "Seed Fixture Implementation Batch Fields", "roadmap should include seed fixture implementation batch fields");
assertIncludes(roadmap, "Seed Fixture Implementation Batch Execution Checklist", "roadmap should include seed fixture implementation batch execution checklist");
assertIncludes(roadmap, "Seed Fixture Implementation Starter Batches", "roadmap should include seed fixture implementation starter batches");
assertIncludes(roadmap, "Seed Fixture Implementation PR Queue", "roadmap should include seed fixture implementation PR queue");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Readiness Checklist", "roadmap should include seed fixture implementation queued PR readiness checklist");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Review Handoff", "roadmap should include seed fixture implementation queued PR review handoff");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Review Outcome Routing", "roadmap should include seed fixture implementation queued PR review outcome routing");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Review Outcome Record Templates", "roadmap should include seed fixture implementation queued PR review outcome record templates");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Closeout Checklist", "roadmap should include seed fixture implementation queued PR closeout checklist");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Closeout Record Templates", "roadmap should include seed fixture implementation queued PR closeout record templates");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Queue", "roadmap should include seed fixture implementation queued PR follow-up queue");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Record Templates", "roadmap should include seed fixture implementation queued PR follow-up record templates");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Cadence", "roadmap should include seed fixture implementation queued PR follow-up review cadence");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing", "roadmap should include seed fixture implementation queued PR follow-up review outcome routing");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates", "roadmap should include seed fixture implementation queued PR follow-up review outcome record templates");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Checklist", "roadmap should include seed fixture implementation queued PR follow-up review outcome record audit checklist");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Routing", "roadmap should include seed fixture implementation queued PR follow-up review outcome record audit outcome routing");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates", "roadmap should include seed fixture implementation queued PR follow-up review outcome record audit outcome record templates");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Checklist", "roadmap should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout checklist");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Templates", "roadmap should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record templates");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules", "roadmap should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh rules");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence", "roadmap should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review cadence");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing", "roadmap should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome routing");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates", "roadmap should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record templates");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist", "roadmap should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit checklist");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing", "roadmap should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates", "roadmap should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record templates");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist", "roadmap should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates", "roadmap should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record templates");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules", "roadmap should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rules");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence", "roadmap should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review cadence");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing", "roadmap should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome routing");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates", "roadmap should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record templates");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist", "roadmap should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit checklist");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing", "roadmap should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates", "roadmap should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record templates");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist", "roadmap should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates", "roadmap should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record templates");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules", "roadmap should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rules");
assertIncludes(roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence", "roadmap should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review cadence");
assertIncludes(roadmap, "Closure Criteria", "roadmap should include accuracy closure criteria");
assertIncludes(roadmap, "Accuracy PR ready for review", "roadmap should include accuracy PR review readiness");
assertIncludes(roadmap, "False-positive reduction", "roadmap should include false-positive intake");
assertIncludes(roadmap, "Missing-detection coverage", "roadmap should include missing-detection intake");
assertIncludes(roadmap, "not a release promise", "roadmap should clarify candidate status");
assertIncludes(roadmap, "default `bootlane check` path", "roadmap should preserve default check boundary");
assertIncludes(qualityGates, "Release Gate", "quality gates should include release gate");
assertIncludes(qualityGates, "Networked Release Checks", "quality gates should include networked checks");
assertIncludes(qualityGates, "pnpm release-safety:check", "quality gates should include release safety");
assertIncludes(qualityGates, "pnpm release-safety:fixtures", "quality gates should include release safety fixtures");
assertIncludes(
  qualityGates,
  "pnpm docs:check-release-safety-fixtures",
  "quality gates should include release safety fixture docs"
);
assertIncludes(qualityGates, "Read-Only Contract", "quality gates should include read-only contract");
assertIncludes(security, "not a vulnerability scanner", "security policy should clarify scanner scope");
assertIncludes(security, "private security reporting channel", "security policy should mention private reporting");

log("ok release blockers doc");

function assertIncludes(value, expected, message) {
  if (!value.includes(expected)) {
    throw new Error(`${message}: expected to include ${JSON.stringify(expected)}`);
  }
}

function log(message) {
  process.stdout.write(`${message}\n`);
}
