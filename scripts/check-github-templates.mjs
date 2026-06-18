import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { releaseGateSteps, releaseReadinessCommands } from "./release-gate-contracts.mjs";
import {
  accuracyFixtureCaseMatrix,
  accuracyFixtureSeedBacklog,
  accuracyFixtureIntakeFields,
  accuracySeedIssueRoutingFields,
  accuracySeedTriageRouting,
  accuracySeedBatchReviewCadence,
  accuracySeedEvidenceCommentTemplates,
  accuracySeedFixtureReadinessHandoff,
  accuracySeedVerificationCommandSets,
  accuracySeedEvidenceRecordFields,
  accuracySeedEvidenceRefreshRules,
  accuracySeedEvidenceAuditChecklist,
  accuracySeedAuditOutcomeRouting,
  accuracySeedAuditOutcomeRecordTemplates,
  accuracySeedFixtureImplementationBatchFields,
  accuracySeedFixtureImplementationBatchExecutionChecklist,
  accuracySeedFixtureImplementationStarterBatches,
  accuracySeedFixtureImplementationPrQueue,
  accuracySeedFixtureImplementationQueuedPrReadinessChecklist,
  accuracySeedFixtureImplementationQueuedPrReviewHandoff,
  accuracySeedFixtureImplementationQueuedPrReviewOutcomeRouting,
  accuracySeedFixtureImplementationQueuedPrReviewOutcomeRecordTemplates,
  accuracySeedFixtureImplementationQueuedPrCloseoutChecklist,
  accuracySeedFixtureImplementationQueuedPrCloseoutRecordTemplates,
  accuracySeedFixtureImplementationQueuedPrFollowUpQueue,
  accuracySeedFixtureImplementationQueuedPrFollowUpRecordTemplates,
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewCadence,
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRouting,
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordTemplates,
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditChecklist,
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRouting,
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordTemplates,
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutChecklist,
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates,
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules,
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewCadence,
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRouting,
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordTemplates,
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditChecklist,
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRouting,
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordTemplates,
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutChecklist,
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates,
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules,
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewCadence,
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRouting,
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordTemplates,
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditChecklist,
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRouting,
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordTemplates,
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutChecklist,
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates,
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules,
  accuracyIntakeClosureCriteria,
  accuracyWorkIntakeLanes,
  accuracyWorkPrioritizationRules,
  roadmapCandidateReviewChecklist
} from "./triage-contracts.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const files = {
  falsePositive: await read(".github/ISSUE_TEMPLATE/false-positive.yml"),
  missingDetection: await read(".github/ISSUE_TEMPLATE/missing-detection.yml"),
  docsConfusion: await read(".github/ISSUE_TEMPLATE/docs-confusion.yml"),
  featureRequest: await read(".github/ISSUE_TEMPLATE/feature-request.yml"),
  releaseReadiness: await read(".github/ISSUE_TEMPLATE/release-readiness.yml"),
  config: await read(".github/ISSUE_TEMPLATE/config.yml"),
  pullRequest: await read(".github/PULL_REQUEST_TEMPLATE.md"),
  contributing: await read("CONTRIBUTING.md"),
  release: await read("docs/RELEASE.md"),
  releaseEvidence: await read("docs/RELEASE_EVIDENCE.md"),
  qualityGates: await read("docs/QUALITY_GATES.md"),
  launch: await read("docs/LAUNCH.md"),
  triage: await read("docs/TRIAGE.md"),
  roadmap: await read("docs/ROADMAP.md")
};

assertIncludes(files.config, "blank_issues_enabled: false", "issue template config should disable blank issues");
assertIncludes(files.config, "docs/LAUNCH.md", "issue template config should link launch checklist");

for (const [name, content] of [
  ["false positive", files.falsePositive],
  ["missing detection", files.missingDetection]
]) {
  assertIncludes(content, "Bootlane version", `${name} form should ask for Bootlane version`);
  assertIncludes(content, "Command", `${name} form should ask for command`);
  assertIncludes(content, "needs-triage", `${name} form should apply triage label`);
  assertIncludes(content, "redacted secrets", `${name} form should ask users to redact secrets`);
}

assertIncludes(files.falsePositive, "Why this is a false positive", "false positive form should ask why output is wrong");
assertIncludes(files.falsePositive, "Finding or report snippet", "false positive form should ask for report snippet");
assertIncludes(files.missingDetection, "Missed signal", "missing detection form should ask for missed signal");
assertIncludes(files.missingDetection, "examples/fixtures", "missing detection form should encourage fixtures");

for (const [name, content] of [
  ["false positive", files.falsePositive],
  ["missing detection", files.missingDetection]
]) {
  assertIncludes(content, "docs/ROADMAP.md", `${name} form should point to accuracy work intake`);
  for (const field of accuracyFixtureIntakeFields) {
    assertIncludes(content, field.field, `${name} form should collect ${field.field}`);
  }
  for (const field of accuracySeedIssueRoutingFields) {
    assertIncludes(content, field.field, `${name} form should collect ${field.field}`);
  }
  assertIncludes(content, "New seed needed", `${name} form should include new seed fallback`);
}

for (const lane of accuracyWorkIntakeLanes) {
  if (lane.lane === "False-positive reduction") {
    assertIncludes(files.falsePositive, lane.lane, `false positive form should include lane ${lane.lane}`);
  }
  if (lane.lane === "Missing-detection coverage") {
    assertIncludes(files.missingDetection, lane.lane, `missing detection form should include lane ${lane.lane}`);
  }
  if (["Env var precision", "Package-manager command recognition", "Report clarity and scoring adjustment"].includes(lane.lane)) {
    assertIncludes(files.falsePositive, lane.lane, `false positive form should include shared accuracy lane ${lane.lane}`);
    assertIncludes(files.missingDetection, lane.lane, `missing detection form should include shared accuracy lane ${lane.lane}`);
  }
}

for (const rule of accuracyWorkPrioritizationRules) {
  if (rule.priority === "P0 trust regression") {
    assertIncludes(files.falsePositive, rule.priority, `false positive form should include priority ${rule.priority}`);
  }
  if (rule.priority === "P1 repeated supported miss") {
    assertIncludes(files.missingDetection, rule.priority, `missing detection form should include priority ${rule.priority}`);
  }
  if (["P2 precision polish", "P3 speculative expansion"].includes(rule.priority)) {
    assertIncludes(files.falsePositive, rule.priority, `false positive form should include shared priority ${rule.priority}`);
    assertIncludes(files.missingDetection, rule.priority, `missing detection form should include shared priority ${rule.priority}`);
  }
}

for (const seed of accuracyFixtureSeedBacklog) {
  if (seed.seed === "Happy-path false-positive guard") {
    assertIncludes(files.falsePositive, seed.seed, `false positive form should include seed ${seed.seed}`);
  }
  if (seed.seed === "Supported signal miss guard") {
    assertIncludes(files.missingDetection, seed.seed, `missing detection form should include seed ${seed.seed}`);
  }
  if (
    [
      "Env placeholder precision guard",
      "Package-manager command variant guard",
      "Report wording and score clarity guard"
    ].includes(seed.seed)
  ) {
    assertIncludes(files.falsePositive, seed.seed, `false positive form should include shared seed ${seed.seed}`);
    assertIncludes(files.missingDetection, seed.seed, `missing detection form should include shared seed ${seed.seed}`);
  }
}

assertIncludes(files.docsConfusion, "Page or section", "docs form should ask for page or section");
assertIncludes(files.docsConfusion, "Suggested improvement", "docs form should ask for suggested improvement");
assertIncludes(files.docsConfusion, "Contributor docs", "docs form should include contributor docs area");

assertIncludes(files.featureRequest, "clone-to-run", "feature form should frame the product problem");
assertIncludes(files.featureRequest, "bootlane check", "feature form should preserve check constraints");
assertIncludes(files.featureRequest, "read-only", "feature form should preserve read-only constraint");
assertIncludes(files.featureRequest, "arbitrary project scripts", "feature form should preserve script execution constraint");
assertIncludes(files.featureRequest, "Roadmap category", "feature form should collect roadmap review category");
assertIncludes(files.featureRequest, "Roadmap evidence", "feature form should collect roadmap evidence");
assertIncludes(files.featureRequest, "docs/TRIAGE.md", "feature form should point to triage roadmap review");

for (const entry of roadmapCandidateReviewChecklist) {
  assertIncludes(files.featureRequest, entry.category, `feature form should include roadmap category ${entry.category}`);
}

for (const expected of [
  "Release readiness evidence",
  "0.1.0 evidence",
  "release-readiness",
  "Maintainer Execution Path",
  "Evidence Section Guide",
  "Snapshot Refresh Rules",
  "Release Closeout Checklist",
  "pnpm release:evidence",
  "docs/RELEASE_EVIDENCE_SNAPSHOT.md",
  "docs/RELEASE_EVIDENCE.md",
  "Evidence Record Header",
  "Evidence Entry Format",
  "Evidence Redaction Examples",
  "Evidence Staleness Rules",
  "External State Confirmations",
  "Publish Window Checklist",
  "Dry-Run Transcript Template",
  "Manual Decision Log",
  "pnpm verify:release",
  "pnpm npm-names:check",
  "npm publish --dry-run --access public",
  "pnpm smoke:packed-install",
  "npm publish automation",
  "npm tokens",
  "write permissions",
  "provenance settings",
  "npm publish",
  "npx bootlane@latest --version",
  "npx bootlane@latest check --help",
  "npx bootlane@latest check --format json",
  "Post-Publish Verification Transcript",
  "Release closeout",
  "Public announcement readiness",
  "A green local gate is not publish approval",
  "secrets, tokens, private contact addresses",
  "regenerated the snapshot after any package metadata, release gate, workflow, or evidence-contract change"
]) {
  assertIncludes(files.releaseReadiness, expected, `release readiness issue form should include ${expected}`);
}

for (const expected of [
  "## Summary",
  "## Change Type",
  "## Verification",
  "### Local/CI Gate",
  "### Release Readiness",
  "## Fixtures and Contracts",
  "## Notes for Reviewers"
]) {
  assertIncludes(files.pullRequest, expected, `PR template should include section ${expected}`);
}

for (const expected of releaseGateSteps.map((step) => step.command)) {
  assertIncludes(files.pullRequest, expected, `PR template should include local gate ${expected}`);
}

for (const expected of [
  ...releaseReadinessCommands,
  "docs/RELEASE_EVIDENCE.md",
  "final Bootlane repository URL",
  "repository`, `homepage`, or `bugs`",
  "npm publish automation",
  "write permissions",
  "provenance settings"
]) {
  assertIncludes(files.pullRequest, expected, `PR template should include release readiness item ${expected}`);
}

for (const expected of [
  "docs/CHECK_IDS.md",
  "docs/REPORT_SCHEMA.md",
  "docs/PACKAGE_CONTENTS.md",
  "docs/RELEASE_SAFETY_FIXTURES.md",
  "docs/RELEASE_EVIDENCE_SNAPSHOT.md",
  "pnpm release:evidence",
  "CHANGELOG.md",
  "pnpm example:report",
  "bootlane check",
  "read-only",
  "does not execute project scripts"
]) {
  assertIncludes(files.pullRequest, expected, `PR template should include contract ${expected}`);
}

for (const field of accuracyFixtureIntakeFields) {
  assertIncludes(files.pullRequest, field.field, `PR template should include accuracy fixture intake field ${field.field}`);
}

assertIncludes(files.pullRequest, "0.2.0 Accuracy Work Intake", "PR template should mention accuracy work intake");
assertIncludes(files.pullRequest, "Fixture Case Matrix", "PR template should mention accuracy fixture case matrix");
assertIncludes(files.pullRequest, "minimal files", "PR template should mention minimal files for accuracy fixture cases");
assertIncludes(files.pullRequest, "expected report diff", "PR template should mention expected report diff for accuracy fixture cases");
assertIncludes(
  files.pullRequest,
  "happy-path fixture protection",
  "PR template should mention happy-path fixture protection for accuracy fixture cases"
);
assertIncludes(files.pullRequest, "Fixture Seed Backlog", "PR template should mention accuracy fixture seed backlog");
assertIncludes(files.pullRequest, "expected first test", "PR template should mention expected first test for seed backlog");
assertIncludes(files.pullRequest, "happy-path guard", "PR template should mention happy-path guard for seed backlog");
assertIncludes(files.pullRequest, "new seed is needed", "PR template should mention new seed fallback for seed backlog");
assertIncludes(files.pullRequest, "Seed Evidence Comment Templates", "PR template should mention seed evidence comment templates");
assertIncludes(files.pullRequest, "canonical fixture target", "PR template should mention canonical fixture target comments");
assertIncludes(files.pullRequest, "Seed Fixture Readiness Handoff", "PR template should mention seed fixture readiness handoff");
assertIncludes(files.pullRequest, "implementation boundary", "PR template should mention seed fixture implementation boundary");
assertIncludes(files.pullRequest, "Seed Verification Command Sets", "PR template should mention seed verification command sets");
assertIncludes(files.pullRequest, "escalation condition", "PR template should mention seed verification escalation condition");
assertIncludes(files.pullRequest, "Seed Evidence Record Fields", "PR template should mention seed evidence record fields");
assertIncludes(files.pullRequest, "record location", "PR template should mention seed evidence record location");
assertIncludes(files.pullRequest, "Seed Evidence Refresh Rules", "PR template should mention seed evidence refresh rules");
assertIncludes(files.pullRequest, "verification scope", "PR template should mention seed evidence refresh verification scope");
assertIncludes(files.pullRequest, "Seed Evidence Audit Checklist", "PR template should mention seed evidence audit checklist");
assertIncludes(files.pullRequest, "review request", "PR template should mention seed evidence audit before review request");
assertIncludes(files.pullRequest, "Seed Audit Outcome Routing", "PR template should mention seed audit outcome routing");
assertIncludes(files.pullRequest, "milestone selection", "PR template should mention seed audit outcome before milestone selection");
assertIncludes(files.pullRequest, "Seed Audit Outcome Record Templates", "PR template should mention seed audit outcome record templates");
assertIncludes(files.pullRequest, "record body", "PR template should mention seed audit outcome record body");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Batch Fields", "PR template should mention seed fixture implementation batch fields");
assertIncludes(files.pullRequest, "example output changes", "PR template should mention seed fixture implementation batch example output boundary");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Batch Execution Checklist", "PR template should mention seed fixture implementation batch execution checklist");
assertIncludes(files.pullRequest, "first failing fixture", "PR template should mention first failing fixture execution step");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Starter Batches", "PR template should mention seed fixture implementation starter batches");
assertIncludes(files.pullRequest, "smaller or different audited batch", "PR template should mention starter batch alternative rationale");
assertIncludes(files.pullRequest, "Seed Fixture Implementation PR Queue", "PR template should mention seed fixture implementation PR queue");
assertIncludes(files.pullRequest, "skip, split, or reorder rationale", "PR template should mention PR queue skip split reorder rationale");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Readiness Checklist", "PR template should mention seed fixture implementation queued PR readiness checklist");
assertIncludes(files.pullRequest, "before implementation started", "PR template should mention queued PR readiness before implementation starts");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Review Handoff", "PR template should mention seed fixture implementation queued PR review handoff");
assertIncludes(files.pullRequest, "review focus", "PR template should mention queued PR review focus");
assertIncludes(files.pullRequest, "merge evidence", "PR template should mention queued PR merge evidence");
assertIncludes(files.pullRequest, "fallback", "PR template should mention queued PR review fallback");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Review Outcome Routing", "PR template should mention seed fixture implementation queued PR review outcome routing");
assertIncludes(files.pullRequest, "readiness return", "PR template should mention queued PR readiness return outcome");
assertIncludes(files.pullRequest, "split/defer", "PR template should mention queued PR split defer outcome");
assertIncludes(files.pullRequest, "public-surface refresh", "PR template should mention queued PR public-surface refresh outcome");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Review Outcome Record Templates", "PR template should mention seed fixture implementation queued PR review outcome record templates");
assertIncludes(files.pullRequest, "required inputs", "PR template should mention queued PR review outcome record required inputs");
assertIncludes(files.pullRequest, "record body", "PR template should mention queued PR review outcome record body");
assertIncludes(files.pullRequest, "follow-up", "PR template should mention queued PR review outcome record follow-up");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Closeout Checklist", "PR template should mention seed fixture implementation queued PR closeout checklist");
assertIncludes(files.pullRequest, "final verification", "PR template should mention queued PR closeout final verification");
assertIncludes(files.pullRequest, "public-surface", "PR template should mention queued PR closeout public surface");
assertIncludes(files.pullRequest, "read-only evidence", "PR template should mention queued PR closeout read-only evidence");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Closeout Record Templates", "PR template should mention seed fixture implementation queued PR closeout record templates");
assertIncludes(files.pullRequest, "final evidence", "PR template should mention queued PR closeout final evidence");
assertIncludes(files.pullRequest, "ownership", "PR template should mention queued PR closeout ownership");
assertIncludes(files.pullRequest, "read-only boundary", "PR template should mention queued PR closeout read-only boundary");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Queue", "PR template should mention seed fixture implementation queued PR follow-up queue");
assertIncludes(files.pullRequest, "owner, route, verification path, and stop condition", "PR template should mention queued PR follow-up owner route verification and stop condition");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Record Templates", "PR template should mention seed fixture implementation queued PR follow-up record templates");
assertIncludes(files.pullRequest, "required inputs, record body, next action, and verification context", "PR template should mention queued PR follow-up record template fields");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Review Cadence", "PR template should mention seed fixture implementation queued PR follow-up review cadence");
assertIncludes(files.pullRequest, "reviewed, refreshed, escalated, deferred, or closed", "PR template should mention queued PR follow-up review cadence outcomes");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing", "PR template should mention seed fixture implementation queued PR follow-up review outcome routing");
assertIncludes(files.pullRequest, "refreshing evidence, resuming review, escalating blockers, deferring/parking, or closing a follow-up", "PR template should mention queued PR follow-up review outcome routes");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates", "PR template should mention seed fixture implementation queued PR follow-up review outcome record templates");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Checklist", "PR template should mention seed fixture implementation queued PR follow-up review outcome record audit checklist");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Routing", "PR template should mention seed fixture implementation queued PR follow-up review outcome record audit outcome routing");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates", "PR template should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record templates");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Checklist", "PR template should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout checklist");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Templates", "PR template should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record templates");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules", "PR template should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh rules");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence", "PR template should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review cadence");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing", "PR template should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome routing");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates", "PR template should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record templates");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist", "PR template should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit checklist");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing", "PR template should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates", "PR template should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record templates");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist", "PR template should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates", "PR template should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record templates");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules", "PR template should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rules");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence", "PR template should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review cadence");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing", "PR template should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome routing");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates", "PR template should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record templates");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist", "PR template should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit checklist");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing", "PR template should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates", "PR template should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record templates");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist", "PR template should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates", "PR template should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record templates");
assertIncludes(files.pullRequest, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules", "PR template should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rules");
assertIncludes(files.pullRequest, "required inputs, record body, and next action", "PR template should mention queued PR follow-up review outcome record fields");
assertIncludes(files.pullRequest, "required inputs, record body, and follow-up", "PR template should mention queued PR follow-up review outcome record audit outcome record closeout record fields");
assertIncludes(files.pullRequest, "stale closeout source evidence, route, owner, blocker, parked status, or default-path verification", "PR template should mention queued PR follow-up review outcome record audit outcome record closeout record refresh fields");
assertIncludes(files.pullRequest, "refreshed closeout records were reviewed, routed, and recorded", "PR template should mention queued PR follow-up review outcome record audit outcome record closeout record refresh review evidence");
assertIncludes(files.pullRequest, "accepted, refreshed again, blocked, parked, closed, or superseded", "PR template should mention queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome routes");
assertIncludes(files.pullRequest, "refresh review outcome required inputs, record body, and follow-up", "PR template should mention queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record template fields");
assertIncludes(files.pullRequest, "stale refreshed audit outcome source evidence, allowed route, owner, blocker, parked status, or default-path verification", "PR template should mention queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh fields");
assertIncludes(files.pullRequest, "refreshed audit outcome closeout records were reviewed, routed, and recorded", "PR template should mention queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review cadence evidence");
assertIncludes(files.pullRequest, "template match, complete inputs, traceable body, explicit owner and follow-up, and default-path boundary evidence", "PR template should mention refreshed audit outcome closeout refresh review outcome record audit checklist evidence");
assertIncludes(files.pullRequest, "Accuracy Work Intake Closure Criteria", "PR template should mention accuracy closure criteria");
assertIncludes(files.pullRequest, "fixture evidence", "PR template should mention fixture evidence for accuracy closure");
assertIncludes(files.pullRequest, "schema/check ID impact", "PR template should mention schema/check ID impact for accuracy closure");
assertIncludes(files.pullRequest, "happy-path impact", "PR template should mention happy-path impact for accuracy closure");

assertIncludes(files.contributing, "PULL_REQUEST_TEMPLATE.md", "CONTRIBUTING should mention PR template");
assertIncludes(files.contributing, "release-readiness.yml", "CONTRIBUTING should mention release readiness issue form");
assertIncludes(files.contributing, "Local/CI Gate", "CONTRIBUTING should describe PR local gate parity");
assertIncludes(files.contributing, "Release Readiness", "CONTRIBUTING should describe PR release readiness section");
assertIncludes(files.release, "release-readiness.yml", "Release notes should mention release readiness issue form");
assertIncludes(files.releaseEvidence, "release-readiness.yml", "Release evidence should mention release readiness issue form");
assertIncludes(files.releaseEvidence, "Generated release evidence snapshot", "Release evidence should align with release readiness issue form");
assertIncludes(files.qualityGates, "Local/CI Gate", "QUALITY_GATES should describe PR template local gate parity");
assertIncludes(files.qualityGates, "Release Readiness", "QUALITY_GATES should describe PR template release readiness section");
assertIncludes(files.qualityGates, "release-readiness.yml", "QUALITY_GATES should mention release readiness issue form");
assertIncludes(files.launch, "False positives", "launch checklist should mention false-positive feedback");
assertIncludes(files.launch, "Missing package-manager", "launch checklist should mention missing detection feedback");
assertIncludes(files.launch, "TRIAGE.md", "launch checklist should link triage guide");
assertIncludes(files.launch, "Post-Launch Feedback Closure Matrix", "launch checklist should mention feedback closure matrix");
assertIncludes(files.launch, "Roadmap Candidate Review", "launch checklist should mention roadmap candidate review");
assertIncludes(files.launch, "ROADMAP.md", "launch checklist should link roadmap");
assertIncludes(files.launch, "Fixture Seed Backlog", "launch checklist should mention fixture seed backlog");
assertIncludes(files.launch, "Seed Triage Routing", "launch checklist should mention seed triage routing");
assertIncludes(files.launch, "Seed Batch Review Cadence", "launch checklist should mention seed batch review cadence");
assertIncludes(files.launch, "Seed Evidence Comment Templates", "launch checklist should mention seed evidence comment templates");
assertIncludes(files.launch, "Seed Fixture Readiness Handoff", "launch checklist should mention seed fixture readiness handoff");
assertIncludes(files.launch, "Seed Verification Command Sets", "launch checklist should mention seed verification command sets");
assertIncludes(files.launch, "Seed Evidence Record Fields", "launch checklist should mention seed evidence record fields");
assertIncludes(files.launch, "Seed Evidence Refresh Rules", "launch checklist should mention seed evidence refresh rules");
assertIncludes(files.launch, "Seed Evidence Audit Checklist", "launch checklist should mention seed evidence audit checklist");
assertIncludes(files.launch, "Seed Audit Outcome Routing", "launch checklist should mention seed audit outcome routing");
assertIncludes(files.launch, "Seed Audit Outcome Record Templates", "launch checklist should mention seed audit outcome record templates");
assertIncludes(files.launch, "Seed Fixture Implementation Batch Fields", "launch checklist should mention seed fixture implementation batch fields");
assertIncludes(files.launch, "Seed Fixture Implementation Batch Execution Checklist", "launch checklist should mention seed fixture implementation batch execution checklist");
assertIncludes(files.launch, "Seed Fixture Implementation Starter Batches", "launch checklist should mention seed fixture implementation starter batches");
assertIncludes(files.launch, "Seed Fixture Implementation PR Queue", "launch checklist should mention seed fixture implementation PR queue");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Readiness Checklist", "launch checklist should mention seed fixture implementation queued PR readiness checklist");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Review Handoff", "launch checklist should mention seed fixture implementation queued PR review handoff");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Review Outcome Routing", "launch checklist should mention seed fixture implementation queued PR review outcome routing");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Review Outcome Record Templates", "launch checklist should mention seed fixture implementation queued PR review outcome record templates");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Closeout Checklist", "launch checklist should mention seed fixture implementation queued PR closeout checklist");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Closeout Record Templates", "launch checklist should mention seed fixture implementation queued PR closeout record templates");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Queue", "launch checklist should mention seed fixture implementation queued PR follow-up queue");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Record Templates", "launch checklist should mention seed fixture implementation queued PR follow-up record templates");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Review Cadence", "launch checklist should mention seed fixture implementation queued PR follow-up review cadence");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome routing");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record templates");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Checklist", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit checklist");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Routing", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome routing");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record templates");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Checklist", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout checklist");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Templates", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record templates");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh rules");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review cadence");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome routing");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record templates");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit checklist");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record templates");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record templates");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rules");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review cadence");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome routing");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record templates");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit checklist");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record templates");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record templates");
assertIncludes(files.launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules", "launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rules");
assertIncludes(files.triage, "false-positive", "triage guide should mention false-positive label");
assertIncludes(files.triage, "missing-detection", "triage guide should mention missing-detection label");
assertIncludes(files.triage, "Seed Triage Routing", "triage guide should mention seed triage routing");
assertIncludes(files.triage, "Seed Batch Review Cadence", "triage guide should mention seed batch review cadence");
assertIncludes(files.triage, "Seed Evidence Comment Templates", "triage guide should mention seed evidence comment templates");
assertIncludes(files.triage, "Seed Fixture Readiness Handoff", "triage guide should mention seed fixture readiness handoff");
assertIncludes(files.triage, "Seed Verification Command Sets", "triage guide should mention seed verification command sets");
assertIncludes(files.triage, "Seed Evidence Record Fields", "triage guide should mention seed evidence record fields");
assertIncludes(files.triage, "Seed Evidence Refresh Rules", "triage guide should mention seed evidence refresh rules");
assertIncludes(files.triage, "Seed Evidence Audit Checklist", "triage guide should mention seed evidence audit checklist");
assertIncludes(files.triage, "Seed Audit Outcome Routing", "triage guide should mention seed audit outcome routing");
assertIncludes(files.triage, "Seed Audit Outcome Record Templates", "triage guide should mention seed audit outcome record templates");
assertIncludes(files.triage, "Seed Fixture Implementation Batch Fields", "triage guide should mention seed fixture implementation batch fields");
assertIncludes(files.triage, "Seed Fixture Implementation Batch Execution Checklist", "triage guide should mention seed fixture implementation batch execution checklist");
assertIncludes(files.triage, "Seed Fixture Implementation Starter Batches", "triage guide should mention seed fixture implementation starter batches");
assertIncludes(files.triage, "Seed Fixture Implementation PR Queue", "triage guide should mention seed fixture implementation PR queue");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Readiness Checklist", "triage guide should mention seed fixture implementation queued PR readiness checklist");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Review Handoff", "triage guide should mention seed fixture implementation queued PR review handoff");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Review Outcome Routing", "triage guide should mention seed fixture implementation queued PR review outcome routing");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Review Outcome Record Templates", "triage guide should mention seed fixture implementation queued PR review outcome record templates");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Closeout Checklist", "triage guide should mention seed fixture implementation queued PR closeout checklist");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Closeout Record Templates", "triage guide should mention seed fixture implementation queued PR closeout record templates");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Queue", "triage guide should mention seed fixture implementation queued PR follow-up queue");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Record Templates", "triage guide should mention seed fixture implementation queued PR follow-up record templates");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Review Cadence", "triage guide should mention seed fixture implementation queued PR follow-up review cadence");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing", "triage guide should mention seed fixture implementation queued PR follow-up review outcome routing");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates", "triage guide should mention seed fixture implementation queued PR follow-up review outcome record templates");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Checklist", "triage guide should mention seed fixture implementation queued PR follow-up review outcome record audit checklist");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Routing", "triage guide should mention seed fixture implementation queued PR follow-up review outcome record audit outcome routing");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates", "triage guide should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record templates");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Checklist", "triage guide should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout checklist");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Templates", "triage guide should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record templates");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules", "triage guide should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh rules");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence", "triage guide should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review cadence");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing", "triage guide should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome routing");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates", "triage guide should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record templates");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist", "triage guide should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit checklist");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing", "triage guide should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates", "triage guide should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record templates");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist", "triage guide should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates", "triage guide should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record templates");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules", "triage guide should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rules");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence", "triage guide should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review cadence");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing", "triage guide should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome routing");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates", "triage guide should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record templates");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist", "triage guide should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit checklist");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing", "triage guide should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates", "triage guide should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record templates");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist", "triage guide should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates", "triage guide should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record templates");
assertIncludes(files.triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules", "triage guide should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rules");
assertIncludes(files.triage, "Post-Launch Feedback Closure Matrix", "triage guide should mention feedback closure matrix");
assertIncludes(files.triage, "Roadmap Candidate Review", "triage guide should mention roadmap candidate review");
assertIncludes(files.triage, "ROADMAP.md", "triage guide should link roadmap");
assertIncludes(files.roadmap, "Candidate Backlog", "roadmap should document candidate backlog");
assertIncludes(files.roadmap, "Review Cadence", "roadmap should document review cadence");
assertIncludes(files.roadmap, "Status Transitions", "roadmap should document status transitions");
assertIncludes(files.roadmap, "0.2.0 Accuracy Work Intake", "roadmap should document accuracy work intake");
assertIncludes(files.roadmap, "Fixture Intake Fields", "roadmap should document fixture intake fields");
assertIncludes(files.roadmap, "Fixture Case Matrix", "roadmap should document fixture case matrix");
assertIncludes(files.roadmap, "Fixture Seed Backlog", "roadmap should document fixture seed backlog");
assertIncludes(files.roadmap, "Seed Issue Routing Fields", "roadmap should document seed issue routing fields");
assertIncludes(files.roadmap, "Seed Triage Routing", "roadmap should document seed triage routing");
assertIncludes(files.roadmap, "Seed Batch Review Cadence", "roadmap should document seed batch review cadence");
assertIncludes(files.roadmap, "Seed Evidence Comment Templates", "roadmap should document seed evidence comment templates");
assertIncludes(files.roadmap, "Seed Fixture Readiness Handoff", "roadmap should document seed fixture readiness handoff");
assertIncludes(files.roadmap, "Seed Verification Command Sets", "roadmap should document seed verification command sets");
assertIncludes(files.roadmap, "Seed Evidence Record Fields", "roadmap should document seed evidence record fields");
assertIncludes(files.roadmap, "Seed Evidence Refresh Rules", "roadmap should document seed evidence refresh rules");
assertIncludes(files.roadmap, "Seed Evidence Audit Checklist", "roadmap should document seed evidence audit checklist");
assertIncludes(files.roadmap, "Seed Audit Outcome Routing", "roadmap should document seed audit outcome routing");
assertIncludes(files.roadmap, "Seed Audit Outcome Record Templates", "roadmap should document seed audit outcome record templates");
assertIncludes(files.roadmap, "Seed Fixture Implementation Batch Fields", "roadmap should document seed fixture implementation batch fields");
assertIncludes(files.roadmap, "Seed Fixture Implementation Batch Execution Checklist", "roadmap should document seed fixture implementation batch execution checklist");
assertIncludes(files.roadmap, "Seed Fixture Implementation Starter Batches", "roadmap should document seed fixture implementation starter batches");
assertIncludes(files.roadmap, "Seed Fixture Implementation PR Queue", "roadmap should document seed fixture implementation PR queue");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Readiness Checklist", "roadmap should document seed fixture implementation queued PR readiness checklist");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Review Handoff", "roadmap should document seed fixture implementation queued PR review handoff");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Review Outcome Routing", "roadmap should document seed fixture implementation queued PR review outcome routing");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Review Outcome Record Templates", "roadmap should document seed fixture implementation queued PR review outcome record templates");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Closeout Checklist", "roadmap should document seed fixture implementation queued PR closeout checklist");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Closeout Record Templates", "roadmap should document seed fixture implementation queued PR closeout record templates");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Queue", "roadmap should document seed fixture implementation queued PR follow-up queue");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Record Templates", "roadmap should document seed fixture implementation queued PR follow-up record templates");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Cadence", "roadmap should document seed fixture implementation queued PR follow-up review cadence");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing", "roadmap should document seed fixture implementation queued PR follow-up review outcome routing");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates", "roadmap should document seed fixture implementation queued PR follow-up review outcome record templates");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Checklist", "roadmap should document seed fixture implementation queued PR follow-up review outcome record audit checklist");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Routing", "roadmap should document seed fixture implementation queued PR follow-up review outcome record audit outcome routing");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates", "roadmap should document seed fixture implementation queued PR follow-up review outcome record audit outcome record templates");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Checklist", "roadmap should document seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout checklist");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Templates", "roadmap should document seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record templates");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules", "roadmap should document seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh rules");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence", "roadmap should document seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review cadence");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing", "roadmap should document seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome routing");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates", "roadmap should document seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record templates");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist", "roadmap should document seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit checklist");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing", "roadmap should document seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates", "roadmap should document seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record templates");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist", "roadmap should document seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates", "roadmap should document seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record templates");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules", "roadmap should document seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rules");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence", "roadmap should document seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review cadence");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing", "roadmap should document seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome routing");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates", "roadmap should document seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record templates");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist", "roadmap should document seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit checklist");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing", "roadmap should document seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates", "roadmap should document seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record templates");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist", "roadmap should document seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates", "roadmap should document seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record templates");
assertIncludes(files.roadmap, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules", "roadmap should document seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rules");
assertIncludes(files.roadmap, "Closure Criteria", "roadmap should document accuracy closure criteria");
assertIncludes(files.roadmap, "False-positive reduction", "roadmap should document false-positive accuracy intake");
assertIncludes(files.roadmap, "Missing-detection coverage", "roadmap should document missing-detection accuracy intake");
assertIncludes(files.roadmap, "not a release promise", "roadmap should clarify candidates are not release promises");


for (const entry of accuracyIntakeClosureCriteria) {
  assertIncludes(files.roadmap, entry.outcome, `roadmap should document accuracy closure outcome ${entry.outcome}`);
}

for (const entry of accuracyFixtureCaseMatrix) {
  assertIncludes(files.roadmap, entry.lane, `roadmap should document accuracy fixture lane ${entry.lane}`);
  assertIncludes(files.roadmap, entry.caseType, `roadmap should document accuracy fixture case ${entry.caseType}`);
}

for (const entry of accuracyFixtureSeedBacklog) {
  assertIncludes(files.roadmap, entry.seed, `roadmap should document accuracy fixture seed ${entry.seed}`);
  assertIncludes(files.roadmap, entry.matrixCase, `roadmap should document matrix case for seed ${entry.seed}`);
}

for (const field of accuracySeedIssueRoutingFields) {
  assertIncludes(files.roadmap, field.field, `roadmap should document seed routing field ${field.field}`);
}

for (const entry of accuracySeedTriageRouting) {
  assertIncludes(files.roadmap, entry.condition, `roadmap should document seed triage condition ${entry.condition}`);
}

for (const entry of accuracySeedBatchReviewCadence) {
  assertIncludes(files.roadmap, entry.review, `roadmap should document seed batch review ${entry.review}`);
}

for (const entry of accuracySeedEvidenceCommentTemplates) {
  assertIncludes(files.roadmap, entry.template, `roadmap should document seed evidence comment template ${entry.template}`);
  assertIncludes(files.roadmap, entry.useWhen, `roadmap should document template use case ${entry.template}`);
  assertIncludes(files.roadmap, entry.requiredInputs, `roadmap should document template inputs ${entry.template}`);
  assertIncludes(files.roadmap, entry.commentBody, `roadmap should document template body ${entry.template}`);
  assertIncludes(files.roadmap, entry.followUp, `roadmap should document template follow-up ${entry.template}`);
}

for (const entry of accuracySeedFixtureReadinessHandoff) {
  assertIncludes(files.roadmap, entry.handoff, `roadmap should document seed fixture handoff ${entry.handoff}`);
  assertIncludes(files.roadmap, entry.useWhen, `roadmap should document seed fixture handoff use case ${entry.handoff}`);
  assertIncludes(files.roadmap, entry.requiredInputs, `roadmap should document seed fixture handoff inputs ${entry.handoff}`);
  assertIncludes(files.roadmap, entry.readySignal, `roadmap should document seed fixture handoff ready signal ${entry.handoff}`);
  assertIncludes(
    files.roadmap,
    entry.implementationBoundary,
    `roadmap should document seed fixture handoff implementation boundary ${entry.handoff}`
  );
  assertIncludes(files.roadmap, entry.record, `roadmap should document seed fixture handoff record ${entry.handoff}`);
}

for (const entry of accuracySeedVerificationCommandSets) {
  assertIncludes(files.roadmap, entry.set, `roadmap should document seed verification command set ${entry.set}`);
  assertIncludes(files.roadmap, entry.useWhen, `roadmap should document seed verification use case ${entry.set}`);
  assertIncludes(files.roadmap, entry.commands, `roadmap should document seed verification commands ${entry.set}`);
  assertIncludes(files.roadmap, entry.requiredRecord, `roadmap should document seed verification required record ${entry.set}`);
  assertIncludes(files.roadmap, entry.escalation, `roadmap should document seed verification escalation ${entry.set}`);
}

for (const field of accuracySeedEvidenceRecordFields) {
  assertIncludes(files.roadmap, field.field, `roadmap should document seed evidence record field ${field.field}`);
  assertIncludes(files.roadmap, field.purpose, `roadmap should document seed evidence record purpose ${field.field}`);
  assertIncludes(files.roadmap, field.requiredFor, `roadmap should document seed evidence record required-for ${field.field}`);
  assertIncludes(
    files.roadmap,
    field.completionSignal,
    `roadmap should document seed evidence record completion signal ${field.field}`
  );
}

for (const rule of accuracySeedEvidenceRefreshRules) {
  assertIncludes(files.roadmap, rule.trigger, `roadmap should document seed evidence refresh trigger ${rule.trigger}`);
  assertIncludes(files.roadmap, rule.refreshWhen, `roadmap should document seed evidence refresh condition ${rule.trigger}`);
  assertIncludes(files.roadmap, rule.updateRecord, `roadmap should document seed evidence refresh record update ${rule.trigger}`);
  assertIncludes(files.roadmap, rule.rerun, `roadmap should document seed evidence refresh rerun ${rule.trigger}`);
  assertIncludes(files.roadmap, rule.preventDrift, `roadmap should document seed evidence refresh drift prevention ${rule.trigger}`);
}

for (const entry of accuracySeedEvidenceAuditChecklist) {
  assertIncludes(files.roadmap, entry.item, `roadmap should document seed evidence audit item ${entry.item}`);
  assertIncludes(files.roadmap, entry.reviewQuestion, `roadmap should document seed evidence audit question ${entry.item}`);
  assertIncludes(files.roadmap, entry.requiredEvidence, `roadmap should document seed evidence audit evidence ${entry.item}`);
  assertIncludes(files.roadmap, entry.passWhen, `roadmap should document seed evidence audit pass condition ${entry.item}`);
  assertIncludes(files.roadmap, entry.ifMissing, `roadmap should document seed evidence audit missing action ${entry.item}`);
}

for (const entry of accuracySeedAuditOutcomeRouting) {
  assertIncludes(files.roadmap, entry.outcome, `roadmap should document seed audit outcome ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.appliesWhen, `roadmap should document seed audit outcome applies-when ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.requiredEvidence, `roadmap should document seed audit outcome evidence ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.routeTo, `roadmap should document seed audit outcome route ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.maintainerAction, `roadmap should document seed audit outcome action ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.record, `roadmap should document seed audit outcome record ${entry.outcome}`);
}

const knownSeedAuditOutcomes = new Set(accuracySeedAuditOutcomeRouting.map((entry) => entry.outcome));

for (const entry of accuracySeedAuditOutcomeRecordTemplates) {
  assert(
    knownSeedAuditOutcomes.has(entry.outcome),
    `seed audit outcome record template ${entry.template} should use a known outcome`
  );
  assertIncludes(files.roadmap, entry.template, `roadmap should document seed audit outcome record template ${entry.template}`);
  assertIncludes(files.roadmap, entry.outcome, `roadmap should document seed audit outcome record outcome ${entry.template}`);
  assertIncludes(files.roadmap, entry.useWhen, `roadmap should document seed audit outcome record use case ${entry.template}`);
  assertIncludes(files.roadmap, entry.requiredInputs, `roadmap should document seed audit outcome record inputs ${entry.template}`);
  assertIncludes(files.roadmap, entry.recordBody, `roadmap should document seed audit outcome record body ${entry.template}`);
  assertIncludes(files.roadmap, entry.followUp, `roadmap should document seed audit outcome record follow-up ${entry.template}`);
}

for (const field of accuracySeedFixtureImplementationBatchFields) {
  assertIncludes(files.roadmap, field.field, `roadmap should document seed fixture implementation batch field ${field.field}`);
  assertIncludes(
    files.roadmap,
    field.purpose,
    `roadmap should document seed fixture implementation batch field purpose ${field.field}`
  );
  assertIncludes(
    files.roadmap,
    field.requiredFor,
    `roadmap should document seed fixture implementation batch field required-for ${field.field}`
  );
  assertIncludes(
    files.roadmap,
    field.completionSignal,
    `roadmap should document seed fixture implementation batch field completion signal ${field.field}`
  );
}

for (const entry of accuracySeedFixtureImplementationBatchExecutionChecklist) {
  assertIncludes(files.roadmap, entry.step, `roadmap should document seed fixture implementation batch execution step ${entry.step}`);
  assertIncludes(
    files.roadmap,
    entry.useWhen,
    `roadmap should document seed fixture implementation batch execution use case ${entry.step}`
  );
  assertIncludes(
    files.roadmap,
    entry.requiredInput,
    `roadmap should document seed fixture implementation batch execution input ${entry.step}`
  );
  assertIncludes(
    files.roadmap,
    entry.passWhen,
    `roadmap should document seed fixture implementation batch execution pass condition ${entry.step}`
  );
  assertIncludes(
    files.roadmap,
    entry.stopIf,
    `roadmap should document seed fixture implementation batch execution stop condition ${entry.step}`
  );
  assertIncludes(
    files.roadmap,
    entry.record,
    `roadmap should document seed fixture implementation batch execution record ${entry.step}`
  );
}

for (const entry of accuracySeedFixtureImplementationStarterBatches) {
  assertIncludes(files.roadmap, entry.batch, `roadmap should document seed fixture implementation starter batch ${entry.batch}`);
  for (const seed of entry.selectedSeeds.split(", ")) {
    assert(
      accuracyFixtureSeedBacklog.some((candidate) => candidate.seed === seed),
      `starter batch ${entry.batch} should use known fixture seed ${seed}`
    );
  }
  assertIncludes(files.roadmap, entry.selectedSeeds, `roadmap should document starter batch selected seeds ${entry.batch}`);
  assertIncludes(files.roadmap, entry.deferUntil, `roadmap should document starter batch defer-until ${entry.batch}`);
  assertIncludes(files.roadmap, entry.firstFixtureTarget, `roadmap should document starter batch first fixture target ${entry.batch}`);
  assertIncludes(files.roadmap, entry.firstFailure, `roadmap should document starter batch first failure ${entry.batch}`);
  assertIncludes(files.roadmap, entry.happyPathGuard, `roadmap should document starter batch happy-path guard ${entry.batch}`);
  assertIncludes(files.roadmap, entry.verification, `roadmap should document starter batch verification ${entry.batch}`);
  assertIncludes(files.roadmap, entry.stopCondition, `roadmap should document starter batch stop condition ${entry.batch}`);
}

const knownStarterBatches = new Set(accuracySeedFixtureImplementationStarterBatches.map((entry) => entry.batch));
const prQueueOrders = new Set();

for (const entry of accuracySeedFixtureImplementationPrQueue) {
  assert(!prQueueOrders.has(entry.order), `PR queue order should be unique: ${entry.order}`);
  prQueueOrders.add(entry.order);
  assert(
    knownStarterBatches.has(entry.starterBatch),
    `PR queue ${entry.order} should use known starter batch ${entry.starterBatch}`
  );
  assertIncludes(files.roadmap, entry.order, `roadmap should document PR queue order ${entry.order}`);
  assertIncludes(files.roadmap, entry.starterBatch, `roadmap should document PR queue starter batch ${entry.order}`);
  assertIncludes(files.roadmap, entry.focus, `roadmap should document PR queue focus ${entry.order}`);
  assertIncludes(files.roadmap, entry.dependsOn, `roadmap should document PR queue dependency ${entry.order}`);
  assertIncludes(files.roadmap, entry.readyWhen, `roadmap should document PR queue ready condition ${entry.order}`);
  assertIncludes(files.roadmap, entry.verification, `roadmap should document PR queue verification ${entry.order}`);
  assertIncludes(files.roadmap, entry.mergeGate, `roadmap should document PR queue merge gate ${entry.order}`);
  assertIncludes(files.roadmap, entry.stopIf, `roadmap should document PR queue stop condition ${entry.order}`);
}

const knownPrQueueOrders = new Set(accuracySeedFixtureImplementationPrQueue.map((entry) => entry.order));

for (const entry of accuracySeedFixtureImplementationQueuedPrReadinessChecklist) {
  assert(
    knownPrQueueOrders.has(entry.queueOrder),
    `queued PR readiness check ${entry.readinessCheck} should use known PR queue order ${entry.queueOrder}`
  );
  assertIncludes(files.roadmap, entry.queueOrder, `roadmap should document queued PR readiness queue order ${entry.readinessCheck}`);
  assertIncludes(files.roadmap, entry.readinessCheck, `roadmap should document queued PR readiness check ${entry.readinessCheck}`);
  assertIncludes(files.roadmap, entry.requiredEvidence, `roadmap should document queued PR readiness evidence ${entry.readinessCheck}`);
  assertIncludes(files.roadmap, entry.readyWhen, `roadmap should document queued PR readiness ready condition ${entry.readinessCheck}`);
  assertIncludes(files.roadmap, entry.blockedWhen, `roadmap should document queued PR readiness blocked condition ${entry.readinessCheck}`);
  assertIncludes(files.roadmap, entry.record, `roadmap should document queued PR readiness record ${entry.readinessCheck}`);
}

for (const entry of accuracySeedFixtureImplementationQueuedPrReviewHandoff) {
  assert(
    knownPrQueueOrders.has(entry.queueOrder),
    `queued PR review handoff ${entry.handoff} should use known PR queue order ${entry.queueOrder}`
  );
  assertIncludes(files.roadmap, entry.handoff, `roadmap should document queued PR review handoff ${entry.handoff}`);
  assertIncludes(files.roadmap, entry.queueOrder, `roadmap should document queued PR review handoff queue order ${entry.handoff}`);
  assertIncludes(files.roadmap, entry.useWhen, `roadmap should document queued PR review handoff use case ${entry.handoff}`);
  assertIncludes(files.roadmap, entry.requiredInputs, `roadmap should document queued PR review handoff inputs ${entry.handoff}`);
  assertIncludes(files.roadmap, entry.reviewFocus, `roadmap should document queued PR review handoff focus ${entry.handoff}`);
  assertIncludes(files.roadmap, entry.mergeEvidence, `roadmap should document queued PR review handoff merge evidence ${entry.handoff}`);
  assertIncludes(files.roadmap, entry.fallback, `roadmap should document queued PR review handoff fallback ${entry.handoff}`);
}

const knownQueuedPrReviewHandoffs = new Set(
  accuracySeedFixtureImplementationQueuedPrReviewHandoff.map((entry) => entry.handoff)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrReviewOutcomeRouting) {
  for (const handoff of entry.handoffScope.split(", ")) {
    assert(
      knownQueuedPrReviewHandoffs.has(handoff),
      `queued PR review outcome ${entry.outcome} should use known review handoff ${handoff}`
    );
  }
  assertIncludes(files.roadmap, entry.outcome, `roadmap should document queued PR review outcome ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.handoffScope, `roadmap should document queued PR review outcome handoff scope ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.appliesWhen, `roadmap should document queued PR review outcome applies-when ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.requiredEvidence, `roadmap should document queued PR review outcome evidence ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.routeTo, `roadmap should document queued PR review outcome route ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.maintainerAction, `roadmap should document queued PR review outcome action ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.record, `roadmap should document queued PR review outcome record ${entry.outcome}`);
}

const knownQueuedPrReviewOutcomes = new Set(
  accuracySeedFixtureImplementationQueuedPrReviewOutcomeRouting.map((entry) => entry.outcome)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrReviewOutcomeRecordTemplates) {
  assert(
    knownQueuedPrReviewOutcomes.has(entry.outcome),
    `queued PR review outcome record template ${entry.template} should use known outcome ${entry.outcome}`
  );
  assertIncludes(files.roadmap, entry.template, `roadmap should document queued PR review outcome record template ${entry.template}`);
  assertIncludes(files.roadmap, entry.outcome, `roadmap should document queued PR review outcome record outcome ${entry.template}`);
  assertIncludes(files.roadmap, entry.useWhen, `roadmap should document queued PR review outcome record use case ${entry.template}`);
  assertIncludes(files.roadmap, entry.requiredInputs, `roadmap should document queued PR review outcome record inputs ${entry.template}`);
  assertIncludes(files.roadmap, entry.recordBody, `roadmap should document queued PR review outcome record body ${entry.template}`);
  assertIncludes(files.roadmap, entry.followUp, `roadmap should document queued PR review outcome record follow-up ${entry.template}`);
}

for (const entry of accuracySeedFixtureImplementationQueuedPrCloseoutChecklist) {
  assertIncludes(files.roadmap, entry.item, `roadmap should document queued PR closeout item ${entry.item}`);
  assertIncludes(files.roadmap, entry.appliesWhen, `roadmap should document queued PR closeout applies-when ${entry.item}`);
  assertIncludes(files.roadmap, entry.requiredEvidence, `roadmap should document queued PR closeout evidence ${entry.item}`);
  assertIncludes(files.roadmap, entry.passWhen, `roadmap should document queued PR closeout pass condition ${entry.item}`);
  assertIncludes(files.roadmap, entry.ifMissing, `roadmap should document queued PR closeout missing action ${entry.item}`);
  assertIncludes(files.roadmap, entry.record, `roadmap should document queued PR closeout record ${entry.item}`);
}

const knownQueuedPrCloseoutItems = new Set(
  accuracySeedFixtureImplementationQueuedPrCloseoutChecklist.map((entry) => entry.item)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrCloseoutRecordTemplates) {
  assert(
    knownQueuedPrCloseoutItems.has(entry.item),
    `queued PR closeout record template ${entry.template} should use known closeout item ${entry.item}`
  );
  assertIncludes(files.roadmap, entry.template, `roadmap should document queued PR closeout record template ${entry.template}`);
  assertIncludes(files.roadmap, entry.item, `roadmap should document queued PR closeout record item ${entry.template}`);
  assertIncludes(files.roadmap, entry.useWhen, `roadmap should document queued PR closeout record use case ${entry.template}`);
  assertIncludes(files.roadmap, entry.requiredInputs, `roadmap should document queued PR closeout record inputs ${entry.template}`);
  assertIncludes(files.roadmap, entry.recordBody, `roadmap should document queued PR closeout record body ${entry.template}`);
  assertIncludes(files.roadmap, entry.followUp, `roadmap should document queued PR closeout record follow-up ${entry.template}`);
}
for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpQueue) {
  assert(
    knownQueuedPrCloseoutItems.has(entry.sourceCloseoutItem),
    `queued PR follow-up ${entry.followUp} should use known closeout item ${entry.sourceCloseoutItem}`
  );
  assertIncludes(files.roadmap, entry.followUp, `roadmap should document queued PR follow-up ${entry.followUp}`);
  assertIncludes(files.roadmap, entry.sourceCloseoutItem, `roadmap should document queued PR follow-up source item ${entry.followUp}`);
  assertIncludes(files.roadmap, entry.useWhen, `roadmap should document queued PR follow-up use case ${entry.followUp}`);
  assertIncludes(files.roadmap, entry.requiredInputs, `roadmap should document queued PR follow-up inputs ${entry.followUp}`);
  assertIncludes(files.roadmap, entry.routeTo, `roadmap should document queued PR follow-up route ${entry.followUp}`);
  assertIncludes(files.roadmap, entry.ownerAction, `roadmap should document queued PR follow-up owner action ${entry.followUp}`);
  assertIncludes(files.roadmap, entry.verification, `roadmap should document queued PR follow-up verification ${entry.followUp}`);
  assertIncludes(files.roadmap, entry.stopIf, `roadmap should document queued PR follow-up stop condition ${entry.followUp}`);
}

const knownQueuedPrFollowUps = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpQueue.map((entry) => entry.followUp)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpRecordTemplates) {
  assert(
    knownQueuedPrFollowUps.has(entry.followUp),
    `queued PR follow-up record template ${entry.template} should use known follow-up ${entry.followUp}`
  );
  assertIncludes(files.roadmap, entry.template, `roadmap should document queued PR follow-up record template ${entry.template}`);
  assertIncludes(files.roadmap, entry.followUp, `roadmap should document queued PR follow-up record route ${entry.template}`);
  assertIncludes(files.roadmap, entry.useWhen, `roadmap should document queued PR follow-up record use case ${entry.template}`);
  assertIncludes(files.roadmap, entry.requiredInputs, `roadmap should document queued PR follow-up record inputs ${entry.template}`);
  assertIncludes(files.roadmap, entry.recordBody, `roadmap should document queued PR follow-up record body ${entry.template}`);
  assertIncludes(files.roadmap, entry.nextAction, `roadmap should document queued PR follow-up record next action ${entry.template}`);
}

const knownQueuedPrFollowUpRecordTemplates = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpRecordTemplates.map((entry) => entry.template)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewCadence) {
  assert(
    knownQueuedPrFollowUpRecordTemplates.has(entry.recordTemplate),
    `queued PR follow-up review cadence ${entry.review} should use known record template ${entry.recordTemplate}`
  );
  assertIncludes(files.roadmap, entry.review, `roadmap should document queued PR follow-up review ${entry.review}`);
  assertIncludes(files.roadmap, entry.recordTemplate, `roadmap should document queued PR follow-up review record template ${entry.review}`);
  assertIncludes(files.roadmap, entry.cadence, `roadmap should document queued PR follow-up review cadence ${entry.review}`);
  assertIncludes(files.roadmap, entry.requiredInputs, `roadmap should document queued PR follow-up review inputs ${entry.review}`);
  assertIncludes(files.roadmap, entry.staleWhen, `roadmap should document queued PR follow-up review stale condition ${entry.review}`);
  assertIncludes(files.roadmap, entry.routeTo, `roadmap should document queued PR follow-up review route ${entry.review}`);
  assertIncludes(files.roadmap, entry.maintainerAction, `roadmap should document queued PR follow-up review action ${entry.review}`);
  assertIncludes(files.roadmap, entry.record, `roadmap should document queued PR follow-up review record ${entry.review}`);
}

const knownQueuedPrFollowUpReviews = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewCadence.map((entry) => entry.review)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRouting) {
  for (const review of entry.reviewScope.split(", ")) {
    assert(
      knownQueuedPrFollowUpReviews.has(review),
      `queued PR follow-up review outcome ${entry.outcome} should use known review ${review}`
    );
  }
  assertIncludes(files.roadmap, entry.outcome, `roadmap should document queued PR follow-up review outcome ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.reviewScope, `roadmap should document queued PR follow-up review outcome scope ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.appliesWhen, `roadmap should document queued PR follow-up review outcome applies-when ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.requiredEvidence, `roadmap should document queued PR follow-up review outcome evidence ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.routeTo, `roadmap should document queued PR follow-up review outcome route ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.maintainerAction, `roadmap should document queued PR follow-up review outcome action ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.record, `roadmap should document queued PR follow-up review outcome record ${entry.outcome}`);
}

const knownQueuedPrFollowUpReviewOutcomes = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRouting.map((entry) => entry.outcome)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordTemplates) {
  assert(
    knownQueuedPrFollowUpReviewOutcomes.has(entry.outcome),
    `queued PR follow-up review outcome record template ${entry.template} should use known outcome ${entry.outcome}`
  );
  assertIncludes(files.roadmap, entry.template, `roadmap should document queued PR follow-up review outcome record template ${entry.template}`);
  assertIncludes(files.roadmap, entry.outcome, `roadmap should document queued PR follow-up review outcome record outcome ${entry.template}`);
  assertIncludes(files.roadmap, entry.useWhen, `roadmap should document queued PR follow-up review outcome record use case ${entry.template}`);
  assertIncludes(files.roadmap, entry.requiredInputs, `roadmap should document queued PR follow-up review outcome record inputs ${entry.template}`);
  assertIncludes(files.roadmap, entry.recordBody, `roadmap should document queued PR follow-up review outcome record body ${entry.template}`);
  assertIncludes(files.roadmap, entry.nextAction, `roadmap should document queued PR follow-up review outcome record next action ${entry.template}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordTemplates = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordTemplates.map((entry) => entry.template)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditChecklist) {
  for (const template of entry.templateScope.split(", ")) {
    assert(
      knownQueuedPrFollowUpReviewOutcomeRecordTemplates.has(template),
      `queued PR follow-up review outcome record audit ${entry.item} should use known template ${template}`
    );
  }
  assertIncludes(files.roadmap, entry.item, `roadmap should document queued PR follow-up review outcome record audit item ${entry.item}`);
  assertIncludes(files.roadmap, entry.templateScope, `roadmap should document queued PR follow-up review outcome record audit scope ${entry.item}`);
  assertIncludes(files.roadmap, entry.reviewQuestion, `roadmap should document queued PR follow-up review outcome record audit question ${entry.item}`);
  assertIncludes(files.roadmap, entry.requiredEvidence, `roadmap should document queued PR follow-up review outcome record audit evidence ${entry.item}`);
  assertIncludes(files.roadmap, entry.passWhen, `roadmap should document queued PR follow-up review outcome record audit pass condition ${entry.item}`);
  assertIncludes(files.roadmap, entry.ifMissing, `roadmap should document queued PR follow-up review outcome record audit missing action ${entry.item}`);
  assertIncludes(files.roadmap, entry.record, `roadmap should document queued PR follow-up review outcome record audit record ${entry.item}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditItems = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditChecklist.map((entry) => entry.item)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRouting) {
  for (const item of entry.auditScope.split(", ")) {
    assert(
      knownQueuedPrFollowUpReviewOutcomeRecordAuditItems.has(item),
      `queued PR follow-up review outcome record audit outcome ${entry.outcome} should use known audit item ${item}`
    );
  }
  assertIncludes(files.roadmap, entry.outcome, `roadmap should document queued PR follow-up review outcome record audit outcome ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.auditScope, `roadmap should document queued PR follow-up review outcome record audit outcome scope ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.appliesWhen, `roadmap should document queued PR follow-up review outcome record audit outcome applies-when ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.requiredEvidence, `roadmap should document queued PR follow-up review outcome record audit outcome evidence ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.routeTo, `roadmap should document queued PR follow-up review outcome record audit outcome route ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.maintainerAction, `roadmap should document queued PR follow-up review outcome record audit outcome action ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.record, `roadmap should document queued PR follow-up review outcome record audit outcome record ${entry.outcome}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomes = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRouting.map((entry) => entry.outcome)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordTemplates) {
  assert(
    knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomes.has(entry.outcome),
    `queued PR follow-up review outcome record audit outcome record template ${entry.template} should use known audit outcome ${entry.outcome}`
  );
  assertIncludes(files.roadmap, entry.template, `roadmap should document queued PR follow-up review outcome record audit outcome record template ${entry.template}`);
  assertIncludes(files.roadmap, entry.outcome, `roadmap should document queued PR follow-up review outcome record audit outcome record outcome ${entry.template}`);
  assertIncludes(files.roadmap, entry.useWhen, `roadmap should document queued PR follow-up review outcome record audit outcome record use case ${entry.template}`);
  assertIncludes(files.roadmap, entry.requiredInputs, `roadmap should document queued PR follow-up review outcome record audit outcome record inputs ${entry.template}`);
  assertIncludes(files.roadmap, entry.recordBody, `roadmap should document queued PR follow-up review outcome record audit outcome record body ${entry.template}`);
  assertIncludes(files.roadmap, entry.followUp, `roadmap should document queued PR follow-up review outcome record audit outcome record follow-up ${entry.template}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordTemplates = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordTemplates.map((entry) => entry.template)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutChecklist) {
  for (const template of entry.templateScope.split(", ")) {
    assert(
      knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordTemplates.has(template),
      `queued PR follow-up review outcome record audit outcome record closeout ${entry.item} should use known template ${template}`
    );
  }
  assertIncludes(files.roadmap, entry.item, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout item ${entry.item}`);
  assertIncludes(files.roadmap, entry.templateScope, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout template scope ${entry.item}`);
  assertIncludes(files.roadmap, entry.appliesWhen, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout applies-when ${entry.item}`);
  assertIncludes(files.roadmap, entry.requiredEvidence, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout evidence ${entry.item}`);
  assertIncludes(files.roadmap, entry.passWhen, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout pass condition ${entry.item}`);
  assertIncludes(files.roadmap, entry.ifMissing, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout missing action ${entry.item}`);
  assertIncludes(files.roadmap, entry.record, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record ${entry.item}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutItems = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutChecklist.map((entry) => entry.item)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates) {
  assert(
    knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutItems.has(entry.item),
    `queued PR follow-up review outcome record audit outcome record closeout record template ${entry.template} should use known closeout item ${entry.item}`
  );
  assertIncludes(files.roadmap, entry.template, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record template ${entry.template}`);
  assertIncludes(files.roadmap, entry.item, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record item ${entry.template}`);
  assertIncludes(files.roadmap, entry.useWhen, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record use case ${entry.template}`);
  assertIncludes(files.roadmap, entry.requiredInputs, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record inputs ${entry.template}`);
  assertIncludes(files.roadmap, entry.recordBody, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record body ${entry.template}`);
  assertIncludes(files.roadmap, entry.followUp, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record follow-up ${entry.template}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates.map((entry) => entry.template)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules) {
  assert(
    knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates.has(entry.recordTemplate),
    `queued PR follow-up review outcome record audit outcome record closeout record refresh rule ${entry.trigger} should use known closeout record template ${entry.recordTemplate}`
  );
  assertIncludes(files.roadmap, entry.trigger, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh trigger ${entry.trigger}`);
  assertIncludes(files.roadmap, entry.recordTemplate, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh template ${entry.trigger}`);
  assertIncludes(files.roadmap, entry.refreshWhen, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh condition ${entry.trigger}`);
  assertIncludes(files.roadmap, entry.updateRecord, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh update ${entry.trigger}`);
  assertIncludes(files.roadmap, entry.rerun, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh rerun ${entry.trigger}`);
  assertIncludes(files.roadmap, entry.blockWhenStale, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh stale block ${entry.trigger}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules.map((entry) => entry.trigger)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewCadence) {
  assert(
    knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules.has(entry.refreshRule),
    `queued PR follow-up review outcome record audit outcome record closeout record refresh review cadence ${entry.review} should use known refresh rule ${entry.refreshRule}`
  );
  assertIncludes(files.roadmap, entry.review, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review ${entry.review}`);
  assertIncludes(files.roadmap, entry.refreshRule, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review rule ${entry.review}`);
  assertIncludes(files.roadmap, entry.cadence, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review cadence ${entry.review}`);
  assertIncludes(files.roadmap, entry.requiredInputs, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review inputs ${entry.review}`);
  assertIncludes(files.roadmap, entry.staleWhen, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review stale condition ${entry.review}`);
  assertIncludes(files.roadmap, entry.routeTo, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review route ${entry.review}`);
  assertIncludes(files.roadmap, entry.maintainerAction, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review action ${entry.review}`);
  assertIncludes(files.roadmap, entry.record, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review record ${entry.review}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewNames = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewCadence.map((entry) => entry.review)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRouting) {
  for (const review of entry.reviewScope.split(", ")) {
    assert(
      knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewNames.has(review),
      `queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome ${entry.outcome} should use known refresh review ${review}`
    );
  }
  assertIncludes(files.roadmap, entry.outcome, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.reviewScope, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome scope ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.appliesWhen, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome applies-when ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.requiredEvidence, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome evidence ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.routeTo, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome route ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.maintainerAction, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome action ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.record, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record ${entry.outcome}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomes = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRouting.map((entry) => entry.outcome)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordTemplates) {
  assert(
    knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomes.has(entry.outcome),
    `queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record template ${entry.template} should use known outcome ${entry.outcome}`
  );
  assertIncludes(files.roadmap, entry.template, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record template ${entry.template}`);
  assertIncludes(files.roadmap, entry.outcome, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record outcome ${entry.template}`);
  assertIncludes(files.roadmap, entry.useWhen, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record use case ${entry.template}`);
  assertIncludes(files.roadmap, entry.requiredInputs, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record inputs ${entry.template}`);
  assertIncludes(files.roadmap, entry.recordBody, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record body ${entry.template}`);
  assertIncludes(files.roadmap, entry.followUp, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record follow-up ${entry.template}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordTemplates = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordTemplates.map((entry) => entry.template)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditChecklist) {
  for (const template of entry.templateScope.split(", ")) {
    assert(
      knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordTemplates.has(template),
      `queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit checklist ${entry.item} should use known refreshed closeout outcome record template ${template}`
    );
  }
  assertIncludes(files.roadmap, entry.item, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit item ${entry.item}`);
  assertIncludes(files.roadmap, entry.templateScope, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit scope ${entry.item}`);
  assertIncludes(files.roadmap, entry.reviewQuestion, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit question ${entry.item}`);
  assertIncludes(files.roadmap, entry.requiredEvidence, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit evidence ${entry.item}`);
  assertIncludes(files.roadmap, entry.passWhen, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit pass condition ${entry.item}`);
  assertIncludes(files.roadmap, entry.ifMissing, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit missing action ${entry.item}`);
  assertIncludes(files.roadmap, entry.record, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit record ${entry.item}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditChecklistItems = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditChecklist.map((entry) => entry.item)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRouting) {
  for (const item of entry.auditScope.split(", ")) {
    assert(
      knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditChecklistItems.has(item),
      `queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome route ${entry.outcome} should use known audit checklist item ${item}`
    );
  }
  assertIncludes(files.roadmap, entry.outcome, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.auditScope, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome scope ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.appliesWhen, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome applies-when ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.requiredEvidence, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome evidence ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.routeTo, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome route ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.maintainerAction, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome action ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.record, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record ${entry.outcome}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomes = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRouting.map((entry) => entry.outcome)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordTemplates) {
  assert(
    knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomes.has(entry.outcome),
    `queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record template ${entry.template} should use known outcome ${entry.outcome}`
  );
  assertIncludes(files.roadmap, entry.template, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record template ${entry.template}`);
  assertIncludes(files.roadmap, entry.outcome, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record outcome ${entry.template}`);
  assertIncludes(files.roadmap, entry.useWhen, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record use case ${entry.template}`);
  assertIncludes(files.roadmap, entry.requiredInputs, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record inputs ${entry.template}`);
  assertIncludes(files.roadmap, entry.recordBody, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record body ${entry.template}`);
  assertIncludes(files.roadmap, entry.followUp, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record follow-up ${entry.template}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordTemplates = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordTemplates.map((entry) => entry.template)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutChecklist) {
  for (const template of entry.templateScope.split(", ")) {
    assert(
      knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordTemplates.has(template),
      `queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist ${entry.item} should use known refreshed audit outcome record template ${template}`
    );
  }
  assertIncludes(files.roadmap, entry.item, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout item ${entry.item}`);
  assertIncludes(files.roadmap, entry.templateScope, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout scope ${entry.item}`);
  assertIncludes(files.roadmap, entry.appliesWhen, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout applies-when ${entry.item}`);
  assertIncludes(files.roadmap, entry.requiredEvidence, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout evidence ${entry.item}`);
  assertIncludes(files.roadmap, entry.passWhen, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout pass condition ${entry.item}`);
  assertIncludes(files.roadmap, entry.ifMissing, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout missing action ${entry.item}`);
  assertIncludes(files.roadmap, entry.record, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record ${entry.item}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutItems = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutChecklist.map((entry) => entry.item)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates) {
  assert(
    knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutItems.has(entry.item),
    `queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record template ${entry.template} should use known closeout item ${entry.item}`
  );
  assertIncludes(files.roadmap, entry.template, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record template ${entry.template}`);
  assertIncludes(files.roadmap, entry.item, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record item ${entry.template}`);
  assertIncludes(files.roadmap, entry.useWhen, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record use case ${entry.template}`);
  assertIncludes(files.roadmap, entry.requiredInputs, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record inputs ${entry.template}`);
  assertIncludes(files.roadmap, entry.recordBody, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record body ${entry.template}`);
  assertIncludes(files.roadmap, entry.followUp, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record follow-up ${entry.template}`);
}
const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates.map((entry) => entry.template)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules) {
  assert(
    knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates.has(entry.recordTemplate),
    `queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rule ${entry.trigger} should use known refreshed audit outcome closeout record template ${entry.recordTemplate}`
  );
  assertIncludes(files.roadmap, entry.trigger, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh trigger ${entry.trigger}`);
  assertIncludes(files.roadmap, entry.recordTemplate, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh template ${entry.trigger}`);
  assertIncludes(files.roadmap, entry.refreshWhen, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh condition ${entry.trigger}`);
  assertIncludes(files.roadmap, entry.updateRecord, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh update ${entry.trigger}`);
  assertIncludes(files.roadmap, entry.rerun, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rerun ${entry.trigger}`);
  assertIncludes(files.roadmap, entry.blockWhenStale, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh stale block ${entry.trigger}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules.map((entry) => entry.trigger)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewCadence) {
  assert(
    knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules.has(entry.refreshRule),
    `queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review cadence ${entry.review} should use known refresh rule ${entry.refreshRule}`
  );
  assertIncludes(files.roadmap, entry.review, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review ${entry.review}`);
  assertIncludes(files.roadmap, entry.refreshRule, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review rule ${entry.review}`);
  assertIncludes(files.roadmap, entry.cadence, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review cadence ${entry.review}`);
  assertIncludes(files.roadmap, entry.requiredInputs, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review inputs ${entry.review}`);
  assertIncludes(files.roadmap, entry.staleWhen, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review stale condition ${entry.review}`);
  assertIncludes(files.roadmap, entry.routeTo, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review route ${entry.review}`);
  assertIncludes(files.roadmap, entry.maintainerAction, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review action ${entry.review}`);
  assertIncludes(files.roadmap, entry.record, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review record ${entry.review}`);
}



const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewNames = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewCadence.map((entry) => entry.review)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRouting) {
  for (const review of entry.reviewScope.split(", ")) {
    assert(
      knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewNames.has(review),
      `queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome ${entry.outcome} should use known refresh review ${review}`
    );
  }
  assertIncludes(files.roadmap, entry.outcome, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.reviewScope, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome scope ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.appliesWhen, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome applies-when ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.requiredEvidence, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome evidence ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.routeTo, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome route ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.maintainerAction, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome action ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.record, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record ${entry.outcome}`);
}


const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomes = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRouting.map((entry) => entry.outcome)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordTemplates) {
  assert(
    knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomes.has(entry.outcome),
    `queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record template ${entry.template} should use known outcome ${entry.outcome}`
  );
  assertIncludes(files.roadmap, entry.template, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record template ${entry.template}`);
  assertIncludes(files.roadmap, entry.outcome, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record outcome ${entry.template}`);
  assertIncludes(files.roadmap, entry.useWhen, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record use case ${entry.template}`);
  assertIncludes(files.roadmap, entry.requiredInputs, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record inputs ${entry.template}`);
  assertIncludes(files.roadmap, entry.recordBody, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record body ${entry.template}`);
  assertIncludes(files.roadmap, entry.followUp, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record follow-up ${entry.template}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordTemplates = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordTemplates.map((entry) => entry.template)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditChecklist) {
  for (const template of entry.templateScope.split(", ")) {
    assert(
      knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordTemplates.has(template),
      `queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit checklist ${entry.item} should use known refreshed audit outcome closeout refresh review outcome record template ${template}`
    );
  }
  assertIncludes(files.roadmap, entry.item, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit item ${entry.item}`);
  assertIncludes(files.roadmap, entry.templateScope, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit scope ${entry.item}`);
  assertIncludes(files.roadmap, entry.reviewQuestion, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit question ${entry.item}`);
  assertIncludes(files.roadmap, entry.requiredEvidence, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit evidence ${entry.item}`);
  assertIncludes(files.roadmap, entry.passWhen, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit pass condition ${entry.item}`);
  assertIncludes(files.roadmap, entry.ifMissing, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit missing action ${entry.item}`);
  assertIncludes(files.roadmap, entry.record, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit record ${entry.item}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditItems = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditChecklist.map((entry) => entry.item)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRouting) {
  for (const item of entry.reviewScope.split(", ")) {
    assert(
      knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditItems.has(item),
      `queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing ${entry.outcome} should use known audit checklist item ${item}`
    );
  }
  assertIncludes(files.roadmap, entry.outcome, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.reviewScope, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome scope ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.appliesWhen, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome applies-when ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.requiredEvidence, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome evidence ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.routeTo, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome route ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.maintainerAction, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome action ${entry.outcome}`);
  assertIncludes(files.roadmap, entry.record, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record ${entry.outcome}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomes = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRouting.map((entry) => entry.outcome)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordTemplates) {
  assert(
    knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomes.has(entry.outcome),
    `queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record template ${entry.template} should use known audit outcome ${entry.outcome}`
  );
  assertIncludes(files.roadmap, entry.template, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record template ${entry.template}`);
  assertIncludes(files.roadmap, entry.outcome, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record outcome ${entry.template}`);
  assertIncludes(files.roadmap, entry.useWhen, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record use case ${entry.template}`);
  assertIncludes(files.roadmap, entry.requiredInputs, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record inputs ${entry.template}`);
  assertIncludes(files.roadmap, entry.recordBody, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record body ${entry.template}`);
  assertIncludes(files.roadmap, entry.followUp, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record follow-up ${entry.template}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordTemplates = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordTemplates.map((entry) => entry.template)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutChecklist) {
  for (const template of entry.templateScope.split(", ")) {
    assert(
      knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordTemplates.has(template),
      `queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist ${entry.item} should use known audit outcome record template ${template}`
    );
  }
  assertIncludes(files.roadmap, entry.item, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout item ${entry.item}`);
  assertIncludes(files.roadmap, entry.templateScope, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout scope ${entry.item}`);
  assertIncludes(files.roadmap, entry.appliesWhen, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout applies-when ${entry.item}`);
  assertIncludes(files.roadmap, entry.requiredEvidence, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout evidence ${entry.item}`);
  assertIncludes(files.roadmap, entry.passWhen, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout pass condition ${entry.item}`);
  assertIncludes(files.roadmap, entry.ifMissing, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout missing action ${entry.item}`);
  assertIncludes(files.roadmap, entry.record, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record ${entry.item}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutItems = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutChecklist.map((entry) => entry.item)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates) {
  assert(
    knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutItems.has(entry.item),
    `queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record template ${entry.template} should use known closeout item ${entry.item}`
  );
  assertIncludes(files.roadmap, entry.template, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record template ${entry.template}`);
  assertIncludes(files.roadmap, entry.item, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record item ${entry.template}`);
  assertIncludes(files.roadmap, entry.useWhen, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record use case ${entry.template}`);
  assertIncludes(files.roadmap, entry.requiredInputs, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record inputs ${entry.template}`);
  assertIncludes(files.roadmap, entry.recordBody, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record body ${entry.template}`);
  assertIncludes(files.roadmap, entry.followUp, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record follow-up ${entry.template}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates.map((entry) => entry.template)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules) {
  assert(
    knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates.has(entry.recordTemplate),
    `queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rule ${entry.trigger} should use known closeout record template ${entry.recordTemplate}`
  );
  assertIncludes(files.roadmap, entry.trigger, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh trigger ${entry.trigger}`);
  assertIncludes(files.roadmap, entry.recordTemplate, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh template ${entry.trigger}`);
  assertIncludes(files.roadmap, entry.refreshWhen, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh condition ${entry.trigger}`);
  assertIncludes(files.roadmap, entry.updateRecord, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh update ${entry.trigger}`);
  assertIncludes(files.roadmap, entry.rerun, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rerun ${entry.trigger}`);
  assertIncludes(files.roadmap, entry.blockWhenStale, `roadmap should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh stale block ${entry.trigger}`);
}

log("ok github templates");

async function read(relativePath) {
  return readFile(path.join(rootDir, relativePath), "utf8");
}

function assertIncludes(value, expected, message) {
  if (!value.includes(expected)) {
    throw new Error(`${message}: expected to include ${JSON.stringify(expected)}`);
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
