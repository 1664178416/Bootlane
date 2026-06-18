import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
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
  postLaunchFeedbackClosureMatrix,
  roadmapCandidateBacklog,
  roadmapCandidateBacklogStatuses,
  roadmapCandidateReviewCadence,
  roadmapCandidateReviewChecklist,
  roadmapCandidateStatusTransitions
} from "./triage-contracts.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const triage = await read("docs/TRIAGE.md");
const roadmap = await read("docs/ROADMAP.md");
const launch = await read("docs/LAUNCH.md");
const contributing = await read("CONTRIBUTING.md");
const readme = await read("README.md");
const falsePositiveTemplate = await read(".github/ISSUE_TEMPLATE/false-positive.yml");
const missingDetectionTemplate = await read(".github/ISSUE_TEMPLATE/missing-detection.yml");
const pullRequestTemplate = await read(".github/PULL_REQUEST_TEMPLATE.md");

for (const expected of [
  "Triage Goals",
  "Labels",
  "Post-Launch Feedback Closure Matrix",
  "Roadmap Candidate Review",
  "False Positives",
  "Missing Detections",
  "Docs Confusion",
  "Feature Requests",
  "PR Triage",
  "Escalation Rules",
  "Closing Criteria"
]) {
  assertIncludes(triage, expected, `TRIAGE should include ${expected}`);
}

for (const expected of [
  "Bootlane Roadmap",
  "Roadmap Goals",
  "Candidate Statuses",
  "Candidate Backlog",
  "Review Cadence",
  "Status Transitions",
  "0.2.0 Accuracy Work Intake",
  "Intake Lanes",
  "Prioritization Rules",
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
  "Closure Criteria",
  "Backlog Maintenance Rules",
  "docs/ROADMAP.md",
  "docs/TRIAGE.md#roadmap-candidate-review",
  "not a release promise",
  "0.2.0",
  "0.3.0",
  "0.4.0",
  "default `bootlane check` path",
  "local and read-only",
  "review cycle",
  "evidence status change",
  "fixture-first accuracy work",
  "trust impact",
  "repeated supported signals",
  "fixture quality",
  "Accuracy Work Intake Closure Criteria"
]) {
  assertIncludes(roadmap, expected, `ROADMAP should include ${expected}`);
}

for (const expected of [
  "`needs-triage`",
  "`false-positive`",
  "`missing-detection`",
  "`docs`",
  "`enhancement`",
  "`needs-fixture`",
  "`needs-more-info`",
  "`good-first-issue`"
]) {
  assertIncludes(triage, expected, `TRIAGE should document label ${expected}`);
}

for (const expected of [
  "Bootlane version",
  "Exact command",
  "Finding ID",
  "Minimal reproduction",
  "Add a failing test",
  "examples/fixtures",
  "Keep the finding ID stable",
  "docs/CHECK_IDS.md",
  "docs/REPORT_SCHEMA.md",
  "docs/ROADMAP.md",
  "0.2.0 Accuracy Work Intake",
  "Accuracy lane",
  "Accuracy priority",
  "Fixture target",
  "Expected output",
  "Happy-path impact",
  "Accuracy Work Intake Closure Criteria",
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
  "minimal files",
  "expected report diff",
  "happy-path fixture protection",
  "needs-more-info",
  "examples/reports/node-missing-env.md",
  "bootlane check",
  "read-only",
  "must not execute",
  "secret check prints full secret values",
  "roadmap candidate"
]) {
  assertIncludes(triage, expected, `TRIAGE should preserve guidance: ${expected}`);
}

for (const entry of postLaunchFeedbackClosureMatrix) {
  assertIncludes(triage, entry.route, `TRIAGE should document feedback route ${entry.route}`);
  assertIncludes(triage, entry.firstAction, `TRIAGE should document first action for ${entry.route}`);
  assertIncludes(triage, entry.requiredArtifact, `TRIAGE should document required artifact for ${entry.route}`);
  assertIncludes(triage, entry.closeWhen, `TRIAGE should document close condition for ${entry.route}`);
}

for (const entry of roadmapCandidateReviewChecklist) {
  assertIncludes(triage, entry.category, `TRIAGE should document roadmap category ${entry.category}`);
  assertIncludes(roadmap, entry.category, `ROADMAP should use roadmap category ${entry.category}`);
  assertIncludes(triage, entry.reviewQuestion, `TRIAGE should document review question for ${entry.category}`);
  assertIncludes(triage, entry.requiredEvidence, `TRIAGE should document required evidence for ${entry.category}`);
  assertIncludes(triage, entry.nextAction, `TRIAGE should document next action for ${entry.category}`);
}

for (const entry of roadmapCandidateBacklogStatuses) {
  assertIncludes(roadmap, entry.status, `ROADMAP should document status ${entry.status}`);
  assertIncludes(roadmap, entry.meaning, `ROADMAP should document status meaning for ${entry.status}`);
}

const knownCategories = new Set(roadmapCandidateReviewChecklist.map((entry) => entry.category));
const knownStatuses = new Set(roadmapCandidateBacklogStatuses.map((entry) => entry.status));
const knownCandidates = new Set(roadmapCandidateBacklog.map((entry) => entry.candidate));

for (const entry of roadmapCandidateReviewCadence) {
  assertIncludes(roadmap, entry.review, `ROADMAP should document review cadence ${entry.review}`);
  assertIncludes(roadmap, entry.when, `ROADMAP should document review timing for ${entry.review}`);
  assertIncludes(roadmap, entry.requiredInput, `ROADMAP should document review input for ${entry.review}`);
  assertIncludes(roadmap, entry.decision, `ROADMAP should document review decision for ${entry.review}`);
}

for (const entry of roadmapCandidateStatusTransitions) {
  assert(knownStatuses.has(entry.from), `roadmap transition should use a known source status: ${entry.from}`);
  assert(knownStatuses.has(entry.to), `roadmap transition should use a known target status: ${entry.to}`);
  assertIncludes(roadmap, entry.from, `ROADMAP should document transition source ${entry.from}`);
  assertIncludes(roadmap, entry.to, `ROADMAP should document transition target ${entry.to}`);
  assertIncludes(roadmap, entry.condition, `ROADMAP should document transition condition ${entry.from} to ${entry.to}`);
  assertIncludes(roadmap, entry.requiredAction, `ROADMAP should document transition action ${entry.from} to ${entry.to}`);
}

for (const entry of accuracyWorkIntakeLanes) {
  assert(knownCandidates.has(entry.roadmapCandidate), `accuracy intake lane ${entry.lane} should use a known roadmap candidate`);
  assertIncludes(roadmap, entry.lane, `ROADMAP should document accuracy intake lane ${entry.lane}`);
  assertIncludes(roadmap, entry.roadmapCandidate, `ROADMAP should document roadmap candidate for ${entry.lane}`);
  assertIncludes(roadmap, entry.source, `ROADMAP should document source for ${entry.lane}`);
  assertIncludes(roadmap, entry.requiredFixture, `ROADMAP should document required fixture for ${entry.lane}`);
  assertIncludes(roadmap, entry.priorityRule, `ROADMAP should document priority rule for ${entry.lane}`);
  assertIncludes(roadmap, entry.implementationGate, `ROADMAP should document implementation gate for ${entry.lane}`);
}

for (const entry of accuracyWorkPrioritizationRules) {
  assertIncludes(roadmap, entry.priority, `ROADMAP should document accuracy priority ${entry.priority}`);
  assertIncludes(roadmap, entry.appliesTo, `ROADMAP should document applies-to for ${entry.priority}`);
  assertIncludes(roadmap, entry.requiredEvidence, `ROADMAP should document required evidence for ${entry.priority}`);
  assertIncludes(roadmap, entry.action, `ROADMAP should document action for ${entry.priority}`);
}

for (const field of accuracyFixtureIntakeFields) {
  assertIncludes(roadmap, field.field, `ROADMAP should document fixture intake field ${field.field}`);
  assertIncludes(roadmap, field.purpose, `ROADMAP should document fixture intake purpose for ${field.field}`);
  assertIncludes(roadmap, field.requiredFor, `ROADMAP should document fixture intake required-for for ${field.field}`);
  assertIncludes(falsePositiveTemplate, field.field, `false-positive issue form should collect ${field.field}`);
  assertIncludes(missingDetectionTemplate, field.field, `missing-detection issue form should collect ${field.field}`);
  assertIncludes(pullRequestTemplate, field.field, `PR template should collect ${field.field}`);
}

const knownAccuracyLanes = new Set(accuracyWorkIntakeLanes.map((entry) => entry.lane));
const knownAccuracyFixtureCases = new Set(accuracyFixtureCaseMatrix.map((entry) => entry.caseType));
const knownAccuracyPriorities = new Set(accuracyWorkPrioritizationRules.map((entry) => entry.priority));

for (const entry of accuracyFixtureCaseMatrix) {
  assert(knownAccuracyLanes.has(entry.lane), `accuracy fixture case ${entry.caseType} should use a known lane`);
  assertIncludes(roadmap, entry.lane, `ROADMAP should document fixture case lane ${entry.lane}`);
  assertIncludes(roadmap, entry.caseType, `ROADMAP should document fixture case type ${entry.caseType}`);
  assertIncludes(roadmap, entry.minimalFiles, `ROADMAP should document minimal files for ${entry.caseType}`);
  assertIncludes(roadmap, entry.expectedReportDiff, `ROADMAP should document expected report diff for ${entry.caseType}`);
  assertIncludes(roadmap, entry.protectsHappyPath, `ROADMAP should document happy-path protection for ${entry.caseType}`);
  assertIncludes(roadmap, entry.readyWhen, `ROADMAP should document readiness condition for ${entry.caseType}`);
}

for (const entry of accuracyFixtureSeedBacklog) {
  assert(knownAccuracyLanes.has(entry.lane), `accuracy fixture seed ${entry.seed} should use a known lane`);
  assert(
    knownAccuracyFixtureCases.has(entry.matrixCase),
    `accuracy fixture seed ${entry.seed} should use a known matrix case`
  );
  assert(knownAccuracyPriorities.has(entry.priority), `accuracy fixture seed ${entry.seed} should use a known priority`);
  assertIncludes(roadmap, entry.seed, `ROADMAP should document fixture seed ${entry.seed}`);
  assertIncludes(roadmap, entry.lane, `ROADMAP should document seed lane ${entry.seed}`);
  assertIncludes(roadmap, entry.matrixCase, `ROADMAP should document seed matrix case ${entry.seed}`);
  assertIncludes(roadmap, entry.priority, `ROADMAP should document seed priority ${entry.seed}`);
  assertIncludes(roadmap, entry.targetArtifact, `ROADMAP should document seed target artifact ${entry.seed}`);
  assertIncludes(roadmap, entry.trigger, `ROADMAP should document seed trigger ${entry.seed}`);
  assertIncludes(roadmap, entry.expectedFirstTest, `ROADMAP should document seed expected first test ${entry.seed}`);
  assertIncludes(roadmap, entry.happyPathGuard, `ROADMAP should document seed happy-path guard ${entry.seed}`);
  assertIncludes(roadmap, entry.nextAction, `ROADMAP should document seed next action ${entry.seed}`);
}

for (const field of accuracySeedIssueRoutingFields) {
  assertIncludes(roadmap, field.field, `ROADMAP should document seed routing field ${field.field}`);
  assertIncludes(roadmap, field.purpose, `ROADMAP should document seed routing purpose for ${field.field}`);
  assertIncludes(roadmap, field.requiredFor, `ROADMAP should document seed routing required-for for ${field.field}`);
  assertIncludes(falsePositiveTemplate, field.field, `false-positive issue form should collect ${field.field}`);
  assertIncludes(missingDetectionTemplate, field.field, `missing-detection issue form should collect ${field.field}`);
}

assertIncludes(falsePositiveTemplate, "New seed needed", "false-positive issue form should include new seed fallback");
assertIncludes(missingDetectionTemplate, "New seed needed", "missing-detection issue form should include new seed fallback");

for (const entry of accuracySeedTriageRouting) {
  assert(knownStatuses.has(entry.roadmapStatus), `seed triage routing should use a known status: ${entry.condition}`);
  assertIncludes(roadmap, entry.condition, `ROADMAP should document seed triage condition ${entry.condition}`);
  assertIncludes(roadmap, entry.appliesWhen, `ROADMAP should document seed triage applies-when ${entry.condition}`);
  assertIncludes(roadmap, entry.labels, `ROADMAP should document seed triage labels ${entry.condition}`);
  assertIncludes(roadmap, entry.roadmapStatus, `ROADMAP should document seed triage roadmap status ${entry.condition}`);
  assertIncludes(roadmap, entry.maintainerAction, `ROADMAP should document seed triage action ${entry.condition}`);
}

for (const entry of accuracySeedBatchReviewCadence) {
  assertIncludes(roadmap, entry.review, `ROADMAP should document seed batch review ${entry.review}`);
  assertIncludes(roadmap, entry.when, `ROADMAP should document seed batch review timing ${entry.review}`);
  assertIncludes(roadmap, entry.requiredInput, `ROADMAP should document seed batch review input ${entry.review}`);
  assertIncludes(roadmap, entry.decision, `ROADMAP should document seed batch review decision ${entry.review}`);
  assertIncludes(roadmap, entry.record, `ROADMAP should document seed batch review record ${entry.review}`);
}

for (const entry of accuracySeedEvidenceCommentTemplates) {
  assertIncludes(roadmap, entry.template, `ROADMAP should document seed evidence comment template ${entry.template}`);
  assertIncludes(roadmap, entry.useWhen, `ROADMAP should document template use case ${entry.template}`);
  assertIncludes(roadmap, entry.requiredInputs, `ROADMAP should document template inputs ${entry.template}`);
  assertIncludes(roadmap, entry.commentBody, `ROADMAP should document template body ${entry.template}`);
  assertIncludes(roadmap, entry.followUp, `ROADMAP should document template follow-up ${entry.template}`);
}

for (const entry of accuracySeedFixtureReadinessHandoff) {
  assertIncludes(roadmap, entry.handoff, `ROADMAP should document seed fixture handoff ${entry.handoff}`);
  assertIncludes(roadmap, entry.useWhen, `ROADMAP should document seed fixture handoff use case ${entry.handoff}`);
  assertIncludes(roadmap, entry.requiredInputs, `ROADMAP should document seed fixture handoff inputs ${entry.handoff}`);
  assertIncludes(roadmap, entry.readySignal, `ROADMAP should document seed fixture handoff ready signal ${entry.handoff}`);
  assertIncludes(
    roadmap,
    entry.implementationBoundary,
    `ROADMAP should document seed fixture handoff implementation boundary ${entry.handoff}`
  );
  assertIncludes(roadmap, entry.record, `ROADMAP should document seed fixture handoff record ${entry.handoff}`);
}

for (const entry of accuracySeedVerificationCommandSets) {
  assertIncludes(roadmap, entry.set, `ROADMAP should document seed verification command set ${entry.set}`);
  assertIncludes(roadmap, entry.useWhen, `ROADMAP should document seed verification use case ${entry.set}`);
  assertIncludes(roadmap, entry.commands, `ROADMAP should document seed verification commands ${entry.set}`);
  assertIncludes(roadmap, entry.requiredRecord, `ROADMAP should document seed verification required record ${entry.set}`);
  assertIncludes(roadmap, entry.escalation, `ROADMAP should document seed verification escalation ${entry.set}`);
}

for (const field of accuracySeedEvidenceRecordFields) {
  assertIncludes(roadmap, field.field, `ROADMAP should document seed evidence record field ${field.field}`);
  assertIncludes(roadmap, field.purpose, `ROADMAP should document seed evidence record purpose ${field.field}`);
  assertIncludes(roadmap, field.requiredFor, `ROADMAP should document seed evidence record required-for ${field.field}`);
  assertIncludes(
    roadmap,
    field.completionSignal,
    `ROADMAP should document seed evidence record completion signal ${field.field}`
  );
}

for (const rule of accuracySeedEvidenceRefreshRules) {
  assertIncludes(roadmap, rule.trigger, `ROADMAP should document seed evidence refresh trigger ${rule.trigger}`);
  assertIncludes(roadmap, rule.refreshWhen, `ROADMAP should document seed evidence refresh condition ${rule.trigger}`);
  assertIncludes(roadmap, rule.updateRecord, `ROADMAP should document seed evidence refresh record update ${rule.trigger}`);
  assertIncludes(roadmap, rule.rerun, `ROADMAP should document seed evidence refresh rerun ${rule.trigger}`);
  assertIncludes(roadmap, rule.preventDrift, `ROADMAP should document seed evidence refresh drift prevention ${rule.trigger}`);
}

for (const entry of accuracySeedEvidenceAuditChecklist) {
  assertIncludes(roadmap, entry.item, `ROADMAP should document seed evidence audit item ${entry.item}`);
  assertIncludes(roadmap, entry.reviewQuestion, `ROADMAP should document seed evidence audit question ${entry.item}`);
  assertIncludes(roadmap, entry.requiredEvidence, `ROADMAP should document seed evidence audit evidence ${entry.item}`);
  assertIncludes(roadmap, entry.passWhen, `ROADMAP should document seed evidence audit pass condition ${entry.item}`);
  assertIncludes(roadmap, entry.ifMissing, `ROADMAP should document seed evidence audit missing action ${entry.item}`);
}

for (const entry of accuracySeedAuditOutcomeRouting) {
  assertIncludes(roadmap, entry.outcome, `ROADMAP should document seed audit outcome ${entry.outcome}`);
  assertIncludes(roadmap, entry.appliesWhen, `ROADMAP should document seed audit outcome applies-when ${entry.outcome}`);
  assertIncludes(roadmap, entry.requiredEvidence, `ROADMAP should document seed audit outcome evidence ${entry.outcome}`);
  assertIncludes(roadmap, entry.routeTo, `ROADMAP should document seed audit outcome route ${entry.outcome}`);
  assertIncludes(roadmap, entry.maintainerAction, `ROADMAP should document seed audit outcome action ${entry.outcome}`);
  assertIncludes(roadmap, entry.record, `ROADMAP should document seed audit outcome record ${entry.outcome}`);
}

const knownSeedAuditOutcomes = new Set(accuracySeedAuditOutcomeRouting.map((entry) => entry.outcome));

for (const entry of accuracySeedAuditOutcomeRecordTemplates) {
  assert(
    knownSeedAuditOutcomes.has(entry.outcome),
    `seed audit outcome record template ${entry.template} should use a known outcome`
  );
  assertIncludes(roadmap, entry.template, `ROADMAP should document seed audit outcome record template ${entry.template}`);
  assertIncludes(roadmap, entry.outcome, `ROADMAP should document seed audit outcome record outcome ${entry.template}`);
  assertIncludes(roadmap, entry.useWhen, `ROADMAP should document seed audit outcome record use case ${entry.template}`);
  assertIncludes(roadmap, entry.requiredInputs, `ROADMAP should document seed audit outcome record inputs ${entry.template}`);
  assertIncludes(roadmap, entry.recordBody, `ROADMAP should document seed audit outcome record body ${entry.template}`);
  assertIncludes(roadmap, entry.followUp, `ROADMAP should document seed audit outcome record follow-up ${entry.template}`);
}

for (const field of accuracySeedFixtureImplementationBatchFields) {
  assertIncludes(roadmap, field.field, `ROADMAP should document seed fixture implementation batch field ${field.field}`);
  assertIncludes(
    roadmap,
    field.purpose,
    `ROADMAP should document seed fixture implementation batch field purpose ${field.field}`
  );
  assertIncludes(
    roadmap,
    field.requiredFor,
    `ROADMAP should document seed fixture implementation batch field required-for ${field.field}`
  );
  assertIncludes(
    roadmap,
    field.completionSignal,
    `ROADMAP should document seed fixture implementation batch field completion signal ${field.field}`
  );
}

for (const entry of accuracySeedFixtureImplementationBatchExecutionChecklist) {
  assertIncludes(roadmap, entry.step, `ROADMAP should document seed fixture implementation batch execution step ${entry.step}`);
  assertIncludes(
    roadmap,
    entry.useWhen,
    `ROADMAP should document seed fixture implementation batch execution use case ${entry.step}`
  );
  assertIncludes(
    roadmap,
    entry.requiredInput,
    `ROADMAP should document seed fixture implementation batch execution input ${entry.step}`
  );
  assertIncludes(
    roadmap,
    entry.passWhen,
    `ROADMAP should document seed fixture implementation batch execution pass condition ${entry.step}`
  );
  assertIncludes(
    roadmap,
    entry.stopIf,
    `ROADMAP should document seed fixture implementation batch execution stop condition ${entry.step}`
  );
  assertIncludes(
    roadmap,
    entry.record,
    `ROADMAP should document seed fixture implementation batch execution record ${entry.step}`
  );
}

for (const entry of accuracySeedFixtureImplementationStarterBatches) {
  assertIncludes(roadmap, entry.batch, `ROADMAP should document seed fixture implementation starter batch ${entry.batch}`);
  for (const seed of entry.selectedSeeds.split(", ")) {
    assert(
      accuracyFixtureSeedBacklog.some((candidate) => candidate.seed === seed),
      `starter batch ${entry.batch} should use known fixture seed ${seed}`
    );
  }
  assertIncludes(roadmap, entry.selectedSeeds, `ROADMAP should document starter batch selected seeds ${entry.batch}`);
  assertIncludes(roadmap, entry.deferUntil, `ROADMAP should document starter batch defer-until ${entry.batch}`);
  assertIncludes(roadmap, entry.firstFixtureTarget, `ROADMAP should document starter batch first fixture target ${entry.batch}`);
  assertIncludes(roadmap, entry.firstFailure, `ROADMAP should document starter batch first failure ${entry.batch}`);
  assertIncludes(roadmap, entry.happyPathGuard, `ROADMAP should document starter batch happy-path guard ${entry.batch}`);
  assertIncludes(roadmap, entry.verification, `ROADMAP should document starter batch verification ${entry.batch}`);
  assertIncludes(roadmap, entry.stopCondition, `ROADMAP should document starter batch stop condition ${entry.batch}`);
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
  assertIncludes(roadmap, entry.order, `ROADMAP should document PR queue order ${entry.order}`);
  assertIncludes(roadmap, entry.starterBatch, `ROADMAP should document PR queue starter batch ${entry.order}`);
  assertIncludes(roadmap, entry.focus, `ROADMAP should document PR queue focus ${entry.order}`);
  assertIncludes(roadmap, entry.dependsOn, `ROADMAP should document PR queue dependency ${entry.order}`);
  assertIncludes(roadmap, entry.readyWhen, `ROADMAP should document PR queue ready condition ${entry.order}`);
  assertIncludes(roadmap, entry.verification, `ROADMAP should document PR queue verification ${entry.order}`);
  assertIncludes(roadmap, entry.mergeGate, `ROADMAP should document PR queue merge gate ${entry.order}`);
  assertIncludes(roadmap, entry.stopIf, `ROADMAP should document PR queue stop condition ${entry.order}`);
}

const knownPrQueueOrders = new Set(accuracySeedFixtureImplementationPrQueue.map((entry) => entry.order));

for (const entry of accuracySeedFixtureImplementationQueuedPrReadinessChecklist) {
  assert(
    knownPrQueueOrders.has(entry.queueOrder),
    `queued PR readiness check ${entry.readinessCheck} should use known PR queue order ${entry.queueOrder}`
  );
  assertIncludes(roadmap, entry.queueOrder, `ROADMAP should document queued PR readiness queue order ${entry.readinessCheck}`);
  assertIncludes(roadmap, entry.readinessCheck, `ROADMAP should document queued PR readiness check ${entry.readinessCheck}`);
  assertIncludes(roadmap, entry.requiredEvidence, `ROADMAP should document queued PR readiness evidence ${entry.readinessCheck}`);
  assertIncludes(roadmap, entry.readyWhen, `ROADMAP should document queued PR readiness ready condition ${entry.readinessCheck}`);
  assertIncludes(roadmap, entry.blockedWhen, `ROADMAP should document queued PR readiness blocked condition ${entry.readinessCheck}`);
  assertIncludes(roadmap, entry.record, `ROADMAP should document queued PR readiness record ${entry.readinessCheck}`);
}

for (const entry of accuracySeedFixtureImplementationQueuedPrReviewHandoff) {
  assert(
    knownPrQueueOrders.has(entry.queueOrder),
    `queued PR review handoff ${entry.handoff} should use known PR queue order ${entry.queueOrder}`
  );
  assertIncludes(roadmap, entry.handoff, `ROADMAP should document queued PR review handoff ${entry.handoff}`);
  assertIncludes(roadmap, entry.queueOrder, `ROADMAP should document queued PR review handoff queue order ${entry.handoff}`);
  assertIncludes(roadmap, entry.useWhen, `ROADMAP should document queued PR review handoff use case ${entry.handoff}`);
  assertIncludes(roadmap, entry.requiredInputs, `ROADMAP should document queued PR review handoff inputs ${entry.handoff}`);
  assertIncludes(roadmap, entry.reviewFocus, `ROADMAP should document queued PR review handoff focus ${entry.handoff}`);
  assertIncludes(roadmap, entry.mergeEvidence, `ROADMAP should document queued PR review handoff merge evidence ${entry.handoff}`);
  assertIncludes(roadmap, entry.fallback, `ROADMAP should document queued PR review handoff fallback ${entry.handoff}`);
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
  assertIncludes(roadmap, entry.outcome, `ROADMAP should document queued PR review outcome ${entry.outcome}`);
  assertIncludes(roadmap, entry.handoffScope, `ROADMAP should document queued PR review outcome handoff scope ${entry.outcome}`);
  assertIncludes(roadmap, entry.appliesWhen, `ROADMAP should document queued PR review outcome applies-when ${entry.outcome}`);
  assertIncludes(roadmap, entry.requiredEvidence, `ROADMAP should document queued PR review outcome evidence ${entry.outcome}`);
  assertIncludes(roadmap, entry.routeTo, `ROADMAP should document queued PR review outcome route ${entry.outcome}`);
  assertIncludes(roadmap, entry.maintainerAction, `ROADMAP should document queued PR review outcome action ${entry.outcome}`);
  assertIncludes(roadmap, entry.record, `ROADMAP should document queued PR review outcome record ${entry.outcome}`);
}

const knownQueuedPrReviewOutcomes = new Set(
  accuracySeedFixtureImplementationQueuedPrReviewOutcomeRouting.map((entry) => entry.outcome)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrReviewOutcomeRecordTemplates) {
  assert(
    knownQueuedPrReviewOutcomes.has(entry.outcome),
    `queued PR review outcome record template ${entry.template} should use known outcome ${entry.outcome}`
  );
  assertIncludes(roadmap, entry.template, `ROADMAP should document queued PR review outcome record template ${entry.template}`);
  assertIncludes(roadmap, entry.outcome, `ROADMAP should document queued PR review outcome record outcome ${entry.template}`);
  assertIncludes(roadmap, entry.useWhen, `ROADMAP should document queued PR review outcome record use case ${entry.template}`);
  assertIncludes(roadmap, entry.requiredInputs, `ROADMAP should document queued PR review outcome record inputs ${entry.template}`);
  assertIncludes(roadmap, entry.recordBody, `ROADMAP should document queued PR review outcome record body ${entry.template}`);
  assertIncludes(roadmap, entry.followUp, `ROADMAP should document queued PR review outcome record follow-up ${entry.template}`);
}

for (const entry of accuracySeedFixtureImplementationQueuedPrCloseoutChecklist) {
  assertIncludes(roadmap, entry.item, `ROADMAP should document queued PR closeout item ${entry.item}`);
  assertIncludes(roadmap, entry.appliesWhen, `ROADMAP should document queued PR closeout applies-when ${entry.item}`);
  assertIncludes(roadmap, entry.requiredEvidence, `ROADMAP should document queued PR closeout evidence ${entry.item}`);
  assertIncludes(roadmap, entry.passWhen, `ROADMAP should document queued PR closeout pass condition ${entry.item}`);
  assertIncludes(roadmap, entry.ifMissing, `ROADMAP should document queued PR closeout missing action ${entry.item}`);
  assertIncludes(roadmap, entry.record, `ROADMAP should document queued PR closeout record ${entry.item}`);
}

const knownQueuedPrCloseoutItems = new Set(
  accuracySeedFixtureImplementationQueuedPrCloseoutChecklist.map((entry) => entry.item)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrCloseoutRecordTemplates) {
  assert(
    knownQueuedPrCloseoutItems.has(entry.item),
    `queued PR closeout record template ${entry.template} should use known closeout item ${entry.item}`
  );
  assertIncludes(roadmap, entry.template, `ROADMAP should document queued PR closeout record template ${entry.template}`);
  assertIncludes(roadmap, entry.item, `ROADMAP should document queued PR closeout record item ${entry.template}`);
  assertIncludes(roadmap, entry.useWhen, `ROADMAP should document queued PR closeout record use case ${entry.template}`);
  assertIncludes(roadmap, entry.requiredInputs, `ROADMAP should document queued PR closeout record inputs ${entry.template}`);
  assertIncludes(roadmap, entry.recordBody, `ROADMAP should document queued PR closeout record body ${entry.template}`);
  assertIncludes(roadmap, entry.followUp, `ROADMAP should document queued PR closeout record follow-up ${entry.template}`);
}

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpQueue) {
  assert(
    knownQueuedPrCloseoutItems.has(entry.sourceCloseoutItem),
    `queued PR follow-up ${entry.followUp} should use known closeout item ${entry.sourceCloseoutItem}`
  );
  assertIncludes(roadmap, entry.followUp, `ROADMAP should document queued PR follow-up ${entry.followUp}`);
  assertIncludes(roadmap, entry.sourceCloseoutItem, `ROADMAP should document queued PR follow-up source item ${entry.followUp}`);
  assertIncludes(roadmap, entry.useWhen, `ROADMAP should document queued PR follow-up use case ${entry.followUp}`);
  assertIncludes(roadmap, entry.requiredInputs, `ROADMAP should document queued PR follow-up inputs ${entry.followUp}`);
  assertIncludes(roadmap, entry.routeTo, `ROADMAP should document queued PR follow-up route ${entry.followUp}`);
  assertIncludes(roadmap, entry.ownerAction, `ROADMAP should document queued PR follow-up owner action ${entry.followUp}`);
  assertIncludes(roadmap, entry.verification, `ROADMAP should document queued PR follow-up verification ${entry.followUp}`);
  assertIncludes(roadmap, entry.stopIf, `ROADMAP should document queued PR follow-up stop condition ${entry.followUp}`);
}

const knownQueuedPrFollowUps = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpQueue.map((entry) => entry.followUp)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpRecordTemplates) {
  assert(
    knownQueuedPrFollowUps.has(entry.followUp),
    `queued PR follow-up record template ${entry.template} should use known follow-up ${entry.followUp}`
  );
  assertIncludes(roadmap, entry.template, `ROADMAP should document queued PR follow-up record template ${entry.template}`);
  assertIncludes(roadmap, entry.followUp, `ROADMAP should document queued PR follow-up record route ${entry.template}`);
  assertIncludes(roadmap, entry.useWhen, `ROADMAP should document queued PR follow-up record use case ${entry.template}`);
  assertIncludes(roadmap, entry.requiredInputs, `ROADMAP should document queued PR follow-up record inputs ${entry.template}`);
  assertIncludes(roadmap, entry.recordBody, `ROADMAP should document queued PR follow-up record body ${entry.template}`);
  assertIncludes(roadmap, entry.nextAction, `ROADMAP should document queued PR follow-up record next action ${entry.template}`);
}

const knownQueuedPrFollowUpRecordTemplates = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpRecordTemplates.map((entry) => entry.template)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewCadence) {
  assert(
    knownQueuedPrFollowUpRecordTemplates.has(entry.recordTemplate),
    `queued PR follow-up review cadence ${entry.review} should use known record template ${entry.recordTemplate}`
  );
  assertIncludes(roadmap, entry.review, `ROADMAP should document queued PR follow-up review ${entry.review}`);
  assertIncludes(roadmap, entry.recordTemplate, `ROADMAP should document queued PR follow-up review record template ${entry.review}`);
  assertIncludes(roadmap, entry.cadence, `ROADMAP should document queued PR follow-up review cadence ${entry.review}`);
  assertIncludes(roadmap, entry.requiredInputs, `ROADMAP should document queued PR follow-up review inputs ${entry.review}`);
  assertIncludes(roadmap, entry.staleWhen, `ROADMAP should document queued PR follow-up review stale condition ${entry.review}`);
  assertIncludes(roadmap, entry.routeTo, `ROADMAP should document queued PR follow-up review route ${entry.review}`);
  assertIncludes(roadmap, entry.maintainerAction, `ROADMAP should document queued PR follow-up review action ${entry.review}`);
  assertIncludes(roadmap, entry.record, `ROADMAP should document queued PR follow-up review record ${entry.review}`);
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
  assertIncludes(roadmap, entry.outcome, `ROADMAP should document queued PR follow-up review outcome ${entry.outcome}`);
  assertIncludes(roadmap, entry.reviewScope, `ROADMAP should document queued PR follow-up review outcome scope ${entry.outcome}`);
  assertIncludes(roadmap, entry.appliesWhen, `ROADMAP should document queued PR follow-up review outcome applies-when ${entry.outcome}`);
  assertIncludes(roadmap, entry.requiredEvidence, `ROADMAP should document queued PR follow-up review outcome evidence ${entry.outcome}`);
  assertIncludes(roadmap, entry.routeTo, `ROADMAP should document queued PR follow-up review outcome route ${entry.outcome}`);
  assertIncludes(roadmap, entry.maintainerAction, `ROADMAP should document queued PR follow-up review outcome action ${entry.outcome}`);
  assertIncludes(roadmap, entry.record, `ROADMAP should document queued PR follow-up review outcome record ${entry.outcome}`);
}

const knownQueuedPrFollowUpReviewOutcomes = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRouting.map((entry) => entry.outcome)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordTemplates) {
  assert(
    knownQueuedPrFollowUpReviewOutcomes.has(entry.outcome),
    `queued PR follow-up review outcome record template ${entry.template} should use known outcome ${entry.outcome}`
  );
  assertIncludes(roadmap, entry.template, `ROADMAP should document queued PR follow-up review outcome record template ${entry.template}`);
  assertIncludes(roadmap, entry.outcome, `ROADMAP should document queued PR follow-up review outcome record outcome ${entry.template}`);
  assertIncludes(roadmap, entry.useWhen, `ROADMAP should document queued PR follow-up review outcome record use case ${entry.template}`);
  assertIncludes(roadmap, entry.requiredInputs, `ROADMAP should document queued PR follow-up review outcome record inputs ${entry.template}`);
  assertIncludes(roadmap, entry.recordBody, `ROADMAP should document queued PR follow-up review outcome record body ${entry.template}`);
  assertIncludes(roadmap, entry.nextAction, `ROADMAP should document queued PR follow-up review outcome record next action ${entry.template}`);
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
  assertIncludes(roadmap, entry.item, `ROADMAP should document queued PR follow-up review outcome record audit item ${entry.item}`);
  assertIncludes(roadmap, entry.templateScope, `ROADMAP should document queued PR follow-up review outcome record audit scope ${entry.item}`);
  assertIncludes(roadmap, entry.reviewQuestion, `ROADMAP should document queued PR follow-up review outcome record audit question ${entry.item}`);
  assertIncludes(roadmap, entry.requiredEvidence, `ROADMAP should document queued PR follow-up review outcome record audit evidence ${entry.item}`);
  assertIncludes(roadmap, entry.passWhen, `ROADMAP should document queued PR follow-up review outcome record audit pass condition ${entry.item}`);
  assertIncludes(roadmap, entry.ifMissing, `ROADMAP should document queued PR follow-up review outcome record audit missing action ${entry.item}`);
  assertIncludes(roadmap, entry.record, `ROADMAP should document queued PR follow-up review outcome record audit record ${entry.item}`);
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
  assertIncludes(roadmap, entry.outcome, `ROADMAP should document queued PR follow-up review outcome record audit outcome ${entry.outcome}`);
  assertIncludes(roadmap, entry.auditScope, `ROADMAP should document queued PR follow-up review outcome record audit outcome scope ${entry.outcome}`);
  assertIncludes(roadmap, entry.appliesWhen, `ROADMAP should document queued PR follow-up review outcome record audit outcome applies-when ${entry.outcome}`);
  assertIncludes(roadmap, entry.requiredEvidence, `ROADMAP should document queued PR follow-up review outcome record audit outcome evidence ${entry.outcome}`);
  assertIncludes(roadmap, entry.routeTo, `ROADMAP should document queued PR follow-up review outcome record audit outcome route ${entry.outcome}`);
  assertIncludes(roadmap, entry.maintainerAction, `ROADMAP should document queued PR follow-up review outcome record audit outcome action ${entry.outcome}`);
  assertIncludes(roadmap, entry.record, `ROADMAP should document queued PR follow-up review outcome record audit outcome record ${entry.outcome}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomes = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRouting.map((entry) => entry.outcome)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordTemplates) {
  assert(
    knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomes.has(entry.outcome),
    `queued PR follow-up review outcome record audit outcome record template ${entry.template} should use known audit outcome ${entry.outcome}`
  );
  assertIncludes(roadmap, entry.template, `ROADMAP should document queued PR follow-up review outcome record audit outcome record template ${entry.template}`);
  assertIncludes(roadmap, entry.outcome, `ROADMAP should document queued PR follow-up review outcome record audit outcome record outcome ${entry.template}`);
  assertIncludes(roadmap, entry.useWhen, `ROADMAP should document queued PR follow-up review outcome record audit outcome record use case ${entry.template}`);
  assertIncludes(roadmap, entry.requiredInputs, `ROADMAP should document queued PR follow-up review outcome record audit outcome record inputs ${entry.template}`);
  assertIncludes(roadmap, entry.recordBody, `ROADMAP should document queued PR follow-up review outcome record audit outcome record body ${entry.template}`);
  assertIncludes(roadmap, entry.followUp, `ROADMAP should document queued PR follow-up review outcome record audit outcome record follow-up ${entry.template}`);
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
  assertIncludes(roadmap, entry.item, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout item ${entry.item}`);
  assertIncludes(roadmap, entry.templateScope, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout template scope ${entry.item}`);
  assertIncludes(roadmap, entry.appliesWhen, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout applies-when ${entry.item}`);
  assertIncludes(roadmap, entry.requiredEvidence, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout evidence ${entry.item}`);
  assertIncludes(roadmap, entry.passWhen, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout pass condition ${entry.item}`);
  assertIncludes(roadmap, entry.ifMissing, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout missing action ${entry.item}`);
  assertIncludes(roadmap, entry.record, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record ${entry.item}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutItems = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutChecklist.map((entry) => entry.item)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates) {
  assert(
    knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutItems.has(entry.item),
    `queued PR follow-up review outcome record audit outcome record closeout record template ${entry.template} should use known closeout item ${entry.item}`
  );
  assertIncludes(roadmap, entry.template, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record template ${entry.template}`);
  assertIncludes(roadmap, entry.item, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record item ${entry.template}`);
  assertIncludes(roadmap, entry.useWhen, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record use case ${entry.template}`);
  assertIncludes(roadmap, entry.requiredInputs, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record inputs ${entry.template}`);
  assertIncludes(roadmap, entry.recordBody, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record body ${entry.template}`);
  assertIncludes(roadmap, entry.followUp, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record follow-up ${entry.template}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates.map((entry) => entry.template)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules) {
  assert(
    knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates.has(entry.recordTemplate),
    `queued PR follow-up review outcome record audit outcome record closeout record refresh rule ${entry.trigger} should use known closeout record template ${entry.recordTemplate}`
  );
  assertIncludes(roadmap, entry.trigger, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh trigger ${entry.trigger}`);
  assertIncludes(roadmap, entry.recordTemplate, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh template ${entry.trigger}`);
  assertIncludes(roadmap, entry.refreshWhen, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh condition ${entry.trigger}`);
  assertIncludes(roadmap, entry.updateRecord, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh update ${entry.trigger}`);
  assertIncludes(roadmap, entry.rerun, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh rerun ${entry.trigger}`);
  assertIncludes(roadmap, entry.blockWhenStale, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh stale block ${entry.trigger}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules.map((entry) => entry.trigger)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewCadence) {
  assert(
    knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules.has(entry.refreshRule),
    `queued PR follow-up review outcome record audit outcome record closeout record refresh review cadence ${entry.review} should use known refresh rule ${entry.refreshRule}`
  );
  assertIncludes(roadmap, entry.review, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review ${entry.review}`);
  assertIncludes(roadmap, entry.refreshRule, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review rule ${entry.review}`);
  assertIncludes(roadmap, entry.cadence, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review cadence ${entry.review}`);
  assertIncludes(roadmap, entry.requiredInputs, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review inputs ${entry.review}`);
  assertIncludes(roadmap, entry.staleWhen, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review stale condition ${entry.review}`);
  assertIncludes(roadmap, entry.routeTo, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review route ${entry.review}`);
  assertIncludes(roadmap, entry.maintainerAction, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review action ${entry.review}`);
  assertIncludes(roadmap, entry.record, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review record ${entry.review}`);
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
  assertIncludes(roadmap, entry.outcome, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome ${entry.outcome}`);
  assertIncludes(roadmap, entry.reviewScope, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome scope ${entry.outcome}`);
  assertIncludes(roadmap, entry.appliesWhen, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome applies-when ${entry.outcome}`);
  assertIncludes(roadmap, entry.requiredEvidence, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome evidence ${entry.outcome}`);
  assertIncludes(roadmap, entry.routeTo, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome route ${entry.outcome}`);
  assertIncludes(roadmap, entry.maintainerAction, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome action ${entry.outcome}`);
  assertIncludes(roadmap, entry.record, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record ${entry.outcome}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomes = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRouting.map((entry) => entry.outcome)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordTemplates) {
  assert(
    knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomes.has(entry.outcome),
    `queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record template ${entry.template} should use known outcome ${entry.outcome}`
  );
  assertIncludes(roadmap, entry.template, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record template ${entry.template}`);
  assertIncludes(roadmap, entry.outcome, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record outcome ${entry.template}`);
  assertIncludes(roadmap, entry.useWhen, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record use case ${entry.template}`);
  assertIncludes(roadmap, entry.requiredInputs, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record inputs ${entry.template}`);
  assertIncludes(roadmap, entry.recordBody, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record body ${entry.template}`);
  assertIncludes(roadmap, entry.followUp, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record follow-up ${entry.template}`);
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
  assertIncludes(roadmap, entry.item, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit item ${entry.item}`);
  assertIncludes(roadmap, entry.templateScope, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit scope ${entry.item}`);
  assertIncludes(roadmap, entry.reviewQuestion, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit question ${entry.item}`);
  assertIncludes(roadmap, entry.requiredEvidence, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit evidence ${entry.item}`);
  assertIncludes(roadmap, entry.passWhen, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit pass condition ${entry.item}`);
  assertIncludes(roadmap, entry.ifMissing, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit missing action ${entry.item}`);
  assertIncludes(roadmap, entry.record, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit record ${entry.item}`);
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
  assertIncludes(roadmap, entry.outcome, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome ${entry.outcome}`);
  assertIncludes(roadmap, entry.auditScope, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome scope ${entry.outcome}`);
  assertIncludes(roadmap, entry.appliesWhen, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome applies-when ${entry.outcome}`);
  assertIncludes(roadmap, entry.requiredEvidence, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome evidence ${entry.outcome}`);
  assertIncludes(roadmap, entry.routeTo, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome route ${entry.outcome}`);
  assertIncludes(roadmap, entry.maintainerAction, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome action ${entry.outcome}`);
  assertIncludes(roadmap, entry.record, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record ${entry.outcome}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomes = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRouting.map((entry) => entry.outcome)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordTemplates) {
  assert(
    knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomes.has(entry.outcome),
    `queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record template ${entry.template} should use known outcome ${entry.outcome}`
  );
  assertIncludes(roadmap, entry.template, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record template ${entry.template}`);
  assertIncludes(roadmap, entry.outcome, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record outcome ${entry.template}`);
  assertIncludes(roadmap, entry.useWhen, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record use case ${entry.template}`);
  assertIncludes(roadmap, entry.requiredInputs, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record inputs ${entry.template}`);
  assertIncludes(roadmap, entry.recordBody, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record body ${entry.template}`);
  assertIncludes(roadmap, entry.followUp, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record follow-up ${entry.template}`);
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
  assertIncludes(roadmap, entry.item, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout item ${entry.item}`);
  assertIncludes(roadmap, entry.templateScope, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout scope ${entry.item}`);
  assertIncludes(roadmap, entry.appliesWhen, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout applies-when ${entry.item}`);
  assertIncludes(roadmap, entry.requiredEvidence, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout evidence ${entry.item}`);
  assertIncludes(roadmap, entry.passWhen, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout pass condition ${entry.item}`);
  assertIncludes(roadmap, entry.ifMissing, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout missing action ${entry.item}`);
  assertIncludes(roadmap, entry.record, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record ${entry.item}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutItems = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutChecklist.map((entry) => entry.item)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates) {
  assert(
    knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutItems.has(entry.item),
    `queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record template ${entry.template} should use known closeout item ${entry.item}`
  );
  assertIncludes(roadmap, entry.template, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record template ${entry.template}`);
  assertIncludes(roadmap, entry.item, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record item ${entry.template}`);
  assertIncludes(roadmap, entry.useWhen, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record use case ${entry.template}`);
  assertIncludes(roadmap, entry.requiredInputs, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record inputs ${entry.template}`);
  assertIncludes(roadmap, entry.recordBody, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record body ${entry.template}`);
  assertIncludes(roadmap, entry.followUp, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record follow-up ${entry.template}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates.map((entry) => entry.template)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules) {
  assert(
    knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates.has(entry.recordTemplate),
    `queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rule ${entry.trigger} should use known refreshed audit outcome closeout record template ${entry.recordTemplate}`
  );
  assertIncludes(roadmap, entry.trigger, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh trigger ${entry.trigger}`);
  assertIncludes(roadmap, entry.recordTemplate, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh template ${entry.trigger}`);
  assertIncludes(roadmap, entry.refreshWhen, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh condition ${entry.trigger}`);
  assertIncludes(roadmap, entry.updateRecord, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh update ${entry.trigger}`);
  assertIncludes(roadmap, entry.rerun, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rerun ${entry.trigger}`);
  assertIncludes(roadmap, entry.blockWhenStale, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh stale block ${entry.trigger}`);
}

assertIncludes(pullRequestTemplate, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist", "PR template should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist");
assertIncludes(pullRequestTemplate, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates", "PR template should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record templates");
const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules.map((entry) => entry.trigger)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewCadence) {
  assert(
    knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules.has(entry.refreshRule),
    `queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review cadence ${entry.review} should use known refresh rule ${entry.refreshRule}`
  );
  assertIncludes(roadmap, entry.review, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review ${entry.review}`);
  assertIncludes(roadmap, entry.refreshRule, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review rule ${entry.review}`);
  assertIncludes(roadmap, entry.cadence, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review cadence ${entry.review}`);
  assertIncludes(roadmap, entry.requiredInputs, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review inputs ${entry.review}`);
  assertIncludes(roadmap, entry.staleWhen, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review stale condition ${entry.review}`);
  assertIncludes(roadmap, entry.routeTo, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review route ${entry.review}`);
  assertIncludes(roadmap, entry.maintainerAction, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review action ${entry.review}`);
  assertIncludes(roadmap, entry.record, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review record ${entry.review}`);
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
  assertIncludes(roadmap, entry.outcome, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome ${entry.outcome}`);
  assertIncludes(roadmap, entry.reviewScope, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome scope ${entry.outcome}`);
  assertIncludes(roadmap, entry.appliesWhen, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome applies-when ${entry.outcome}`);
  assertIncludes(roadmap, entry.requiredEvidence, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome evidence ${entry.outcome}`);
  assertIncludes(roadmap, entry.routeTo, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome route ${entry.outcome}`);
  assertIncludes(roadmap, entry.maintainerAction, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome action ${entry.outcome}`);
  assertIncludes(roadmap, entry.record, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record ${entry.outcome}`);
}


const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomes = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRouting.map((entry) => entry.outcome)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordTemplates) {
  assert(
    knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomes.has(entry.outcome),
    `queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record template ${entry.template} should use known outcome ${entry.outcome}`
  );
  assertIncludes(roadmap, entry.template, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record template ${entry.template}`);
  assertIncludes(roadmap, entry.outcome, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record outcome ${entry.template}`);
  assertIncludes(roadmap, entry.useWhen, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record use case ${entry.template}`);
  assertIncludes(roadmap, entry.requiredInputs, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record inputs ${entry.template}`);
  assertIncludes(roadmap, entry.recordBody, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record body ${entry.template}`);
  assertIncludes(roadmap, entry.followUp, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record follow-up ${entry.template}`);
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
  assertIncludes(roadmap, entry.item, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit item ${entry.item}`);
  assertIncludes(roadmap, entry.templateScope, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit scope ${entry.item}`);
  assertIncludes(roadmap, entry.reviewQuestion, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit question ${entry.item}`);
  assertIncludes(roadmap, entry.requiredEvidence, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit evidence ${entry.item}`);
  assertIncludes(roadmap, entry.passWhen, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit pass condition ${entry.item}`);
  assertIncludes(roadmap, entry.ifMissing, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit missing action ${entry.item}`);
  assertIncludes(roadmap, entry.record, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit record ${entry.item}`);
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
  assertIncludes(roadmap, entry.outcome, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome ${entry.outcome}`);
  assertIncludes(roadmap, entry.reviewScope, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome scope ${entry.outcome}`);
  assertIncludes(roadmap, entry.appliesWhen, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome applies-when ${entry.outcome}`);
  assertIncludes(roadmap, entry.requiredEvidence, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome evidence ${entry.outcome}`);
  assertIncludes(roadmap, entry.routeTo, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome route ${entry.outcome}`);
  assertIncludes(roadmap, entry.maintainerAction, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome action ${entry.outcome}`);
  assertIncludes(roadmap, entry.record, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record ${entry.outcome}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomes = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRouting.map((entry) => entry.outcome)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordTemplates) {
  assert(
    knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomes.has(entry.outcome),
    `queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record template ${entry.template} should use known audit outcome ${entry.outcome}`
  );
  assertIncludes(roadmap, entry.template, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record template ${entry.template}`);
  assertIncludes(roadmap, entry.outcome, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record outcome ${entry.template}`);
  assertIncludes(roadmap, entry.useWhen, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record use case ${entry.template}`);
  assertIncludes(roadmap, entry.requiredInputs, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record inputs ${entry.template}`);
  assertIncludes(roadmap, entry.recordBody, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record body ${entry.template}`);
  assertIncludes(roadmap, entry.followUp, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record follow-up ${entry.template}`);
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
  assertIncludes(roadmap, entry.item, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout item ${entry.item}`);
  assertIncludes(roadmap, entry.templateScope, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout scope ${entry.item}`);
  assertIncludes(roadmap, entry.appliesWhen, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout applies-when ${entry.item}`);
  assertIncludes(roadmap, entry.requiredEvidence, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout evidence ${entry.item}`);
  assertIncludes(roadmap, entry.passWhen, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout pass condition ${entry.item}`);
  assertIncludes(roadmap, entry.ifMissing, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout missing action ${entry.item}`);
  assertIncludes(roadmap, entry.record, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record ${entry.item}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutItems = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutChecklist.map((entry) => entry.item)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates) {
  assert(
    knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutItems.has(entry.item),
    `queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record template ${entry.template} should use known closeout item ${entry.item}`
  );
  assertIncludes(roadmap, entry.template, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record template ${entry.template}`);
  assertIncludes(roadmap, entry.item, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record item ${entry.template}`);
  assertIncludes(roadmap, entry.useWhen, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record use case ${entry.template}`);
  assertIncludes(roadmap, entry.requiredInputs, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record inputs ${entry.template}`);
  assertIncludes(roadmap, entry.recordBody, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record body ${entry.template}`);
  assertIncludes(roadmap, entry.followUp, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record follow-up ${entry.template}`);
}

const knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates = new Set(
  accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates.map((entry) => entry.template)
);

for (const entry of accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules) {
  assert(
    knownQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates.has(entry.recordTemplate),
    `queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rule ${entry.trigger} should use known closeout record template ${entry.recordTemplate}`
  );
  assertIncludes(roadmap, entry.trigger, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh trigger ${entry.trigger}`);
  assertIncludes(roadmap, entry.recordTemplate, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh template ${entry.trigger}`);
  assertIncludes(roadmap, entry.refreshWhen, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh condition ${entry.trigger}`);
  assertIncludes(roadmap, entry.updateRecord, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh update ${entry.trigger}`);
  assertIncludes(roadmap, entry.rerun, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rerun ${entry.trigger}`);
  assertIncludes(roadmap, entry.blockWhenStale, `ROADMAP should document queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh stale block ${entry.trigger}`);
}

assertIncludes(pullRequestTemplate, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules", "PR template should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rules");
assertIncludes(pullRequestTemplate, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence", "PR template should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review cadence");
assertIncludes(pullRequestTemplate, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing", "PR template should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome routing");
assertIncludes(pullRequestTemplate, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates", "PR template should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record templates");
assertIncludes(pullRequestTemplate, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist", "PR template should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit checklist");
assertIncludes(pullRequestTemplate, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing", "PR template should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing");
assertIncludes(pullRequestTemplate, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates", "PR template should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record templates");
assertIncludes(pullRequestTemplate, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist", "PR template should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist");
assertIncludes(pullRequestTemplate, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates", "PR template should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record templates");
assertIncludes(pullRequestTemplate, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules", "PR template should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rules");

for (const expected of [
  "Fixture Case Matrix",
  "Fixture Seed Backlog",
  "minimal files",
  "expected report diff",
  "happy-path fixture protection",
  "expected first test",
  "happy-path guard",
  "new seed is needed"
]) {
  assertIncludes(triage, expected, `TRIAGE should include fixture case matrix guidance ${expected}`);
  assertIncludes(pullRequestTemplate, expected, `PR template should include fixture case matrix guidance ${expected}`);
}

assertIncludes(triage, "Seed Triage Routing", "TRIAGE should include seed triage routing guidance");
assertIncludes(triage, "Seed Batch Review Cadence", "TRIAGE should include seed batch review cadence guidance");
assertIncludes(triage, "Seed Evidence Comment Templates", "TRIAGE should include seed evidence comment template guidance");
assertIncludes(triage, "Seed Fixture Readiness Handoff", "TRIAGE should include seed fixture handoff guidance");
assertIncludes(triage, "Seed Verification Command Sets", "TRIAGE should include seed verification command set guidance");
assertIncludes(triage, "Seed Evidence Record Fields", "TRIAGE should include seed evidence record field guidance");
assertIncludes(triage, "Seed Evidence Refresh Rules", "TRIAGE should include seed evidence refresh rule guidance");
assertIncludes(triage, "Seed Evidence Audit Checklist", "TRIAGE should include seed evidence audit checklist guidance");
assertIncludes(triage, "Seed Audit Outcome Routing", "TRIAGE should include seed audit outcome routing guidance");
assertIncludes(triage, "Seed Audit Outcome Record Templates", "TRIAGE should include seed audit outcome record template guidance");
assertIncludes(triage, "Seed Fixture Implementation Batch Fields", "TRIAGE should include seed fixture implementation batch field guidance");
assertIncludes(triage, "Seed Fixture Implementation Batch Execution Checklist", "TRIAGE should include seed fixture implementation batch execution checklist guidance");
assertIncludes(triage, "Seed Fixture Implementation Starter Batches", "TRIAGE should include seed fixture implementation starter batch guidance");
assertIncludes(triage, "Seed Fixture Implementation PR Queue", "TRIAGE should include seed fixture implementation PR queue guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Readiness Checklist", "TRIAGE should include seed fixture implementation queued PR readiness checklist guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Review Handoff", "TRIAGE should include seed fixture implementation queued PR review handoff guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Review Outcome Routing", "TRIAGE should include seed fixture implementation queued PR review outcome routing guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Review Outcome Record Templates", "TRIAGE should include seed fixture implementation queued PR review outcome record template guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Closeout Checklist", "TRIAGE should include seed fixture implementation queued PR closeout checklist guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Closeout Record Templates", "TRIAGE should include seed fixture implementation queued PR closeout record template guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Queue", "TRIAGE should include seed fixture implementation queued PR follow-up queue guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Record Templates", "TRIAGE should include seed fixture implementation queued PR follow-up record template guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Review Cadence", "TRIAGE should include seed fixture implementation queued PR follow-up review cadence guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing", "TRIAGE should include seed fixture implementation queued PR follow-up review outcome routing guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates", "TRIAGE should include seed fixture implementation queued PR follow-up review outcome record template guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Checklist", "TRIAGE should include seed fixture implementation queued PR follow-up review outcome record audit checklist guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Routing", "TRIAGE should include seed fixture implementation queued PR follow-up review outcome record audit outcome routing guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates", "TRIAGE should include seed fixture implementation queued PR follow-up review outcome record audit outcome record template guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Checklist", "TRIAGE should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout checklist guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Templates", "TRIAGE should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record template guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules", "TRIAGE should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh rule guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence", "TRIAGE should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review cadence guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing", "TRIAGE should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome routing guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates", "TRIAGE should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record template guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist", "TRIAGE should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit checklist guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing", "TRIAGE should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates", "TRIAGE should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record template guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist", "TRIAGE should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates", "TRIAGE should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record template guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules", "TRIAGE should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rule guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence", "TRIAGE should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review cadence guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing", "TRIAGE should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome routing guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates", "TRIAGE should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record template guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist", "TRIAGE should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit checklist guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing", "TRIAGE should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates", "TRIAGE should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record template guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist", "TRIAGE should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates", "TRIAGE should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record template guidance");
assertIncludes(triage, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules", "TRIAGE should include seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rule guidance");

for (const expected of ["Fixture seed", "Seed fit or new seed rationale"]) {
  assertIncludes(triage, expected, `TRIAGE should include seed issue routing guidance ${expected}`);
}

assertIncludes(launch, "Fixture Seed Backlog", "Launch checklist should mention fixture seed backlog");
assertIncludes(launch, "Seed Triage Routing", "Launch checklist should mention seed triage routing");
assertIncludes(launch, "Seed Batch Review Cadence", "Launch checklist should mention seed batch review cadence");
assertIncludes(launch, "Seed Evidence Comment Templates", "Launch checklist should mention seed evidence comment templates");
assertIncludes(launch, "Seed Fixture Readiness Handoff", "Launch checklist should mention seed fixture handoff");
assertIncludes(launch, "Seed Verification Command Sets", "Launch checklist should mention seed verification command sets");
assertIncludes(launch, "Seed Evidence Record Fields", "Launch checklist should mention seed evidence record fields");
assertIncludes(launch, "Seed Evidence Refresh Rules", "Launch checklist should mention seed evidence refresh rules");
assertIncludes(launch, "Seed Evidence Audit Checklist", "Launch checklist should mention seed evidence audit checklist");
assertIncludes(launch, "Seed Audit Outcome Routing", "Launch checklist should mention seed audit outcome routing");
assertIncludes(launch, "Seed Audit Outcome Record Templates", "Launch checklist should mention seed audit outcome record templates");
assertIncludes(launch, "Seed Fixture Implementation Batch Fields", "Launch checklist should mention seed fixture implementation batch fields");
assertIncludes(launch, "Seed Fixture Implementation Batch Execution Checklist", "Launch checklist should mention seed fixture implementation batch execution checklist");
assertIncludes(launch, "Seed Fixture Implementation Starter Batches", "Launch checklist should mention seed fixture implementation starter batches");
assertIncludes(launch, "Seed Fixture Implementation PR Queue", "Launch checklist should mention seed fixture implementation PR queue");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Readiness Checklist", "Launch checklist should mention seed fixture implementation queued PR readiness checklist");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Review Handoff", "Launch checklist should mention seed fixture implementation queued PR review handoff");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Review Outcome Routing", "Launch checklist should mention seed fixture implementation queued PR review outcome routing");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Review Outcome Record Templates", "Launch checklist should mention seed fixture implementation queued PR review outcome record templates");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Closeout Checklist", "Launch checklist should mention seed fixture implementation queued PR closeout checklist");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Closeout Record Templates", "Launch checklist should mention seed fixture implementation queued PR closeout record templates");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Queue", "Launch checklist should mention seed fixture implementation queued PR follow-up queue");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Record Templates", "Launch checklist should mention seed fixture implementation queued PR follow-up record templates");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Cadence", "Launch checklist should mention seed fixture implementation queued PR follow-up review cadence");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing", "Launch checklist should mention seed fixture implementation queued PR follow-up review outcome routing");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates", "Launch checklist should mention seed fixture implementation queued PR follow-up review outcome record templates");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Checklist", "Launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit checklist");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Routing", "Launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome routing");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates", "Launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record templates");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Checklist", "Launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout checklist");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Templates", "Launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record templates");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules", "Launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh rules");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence", "Launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review cadence");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing", "Launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome routing");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates", "Launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record templates");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist", "Launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit checklist");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing", "Launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates", "Launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record templates");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist", "Launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates", "Launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record templates");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules", "Launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rules");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence", "Launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review cadence");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing", "Launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome routing");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates", "Launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record templates");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist", "Launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit checklist");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing", "Launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates", "Launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record templates");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist", "Launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates", "Launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record templates");
assertIncludes(launch, "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules", "Launch checklist should mention seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rules");

for (const entry of accuracyIntakeClosureCriteria) {
  assertIncludes(roadmap, entry.outcome, `ROADMAP should document accuracy closure outcome ${entry.outcome}`);
  assertIncludes(roadmap, entry.appliesTo, `ROADMAP should document closure applies-to for ${entry.outcome}`);
  assertIncludes(roadmap, entry.requiredEvidence, `ROADMAP should document closure evidence for ${entry.outcome}`);
  assertIncludes(roadmap, entry.closeWhen, `ROADMAP should document closure condition for ${entry.outcome}`);
}

for (const expected of [
  "Accuracy Work Intake Closure Criteria",
  "fixture evidence",
  "schema/check ID impact",
  "happy-path impact"
]) {
  assertIncludes(pullRequestTemplate, expected, `PR template should include accuracy closure review item ${expected}`);
}

for (const entry of roadmapCandidateBacklog) {
  assert(knownCategories.has(entry.category), `roadmap candidate ${entry.candidate} should use a known review category`);
  assert(knownStatuses.has(entry.evidenceStatus), `roadmap candidate ${entry.candidate} should use a known evidence status`);
  assertIncludes(roadmap, entry.candidate, `ROADMAP should document candidate ${entry.candidate}`);
  assertIncludes(roadmap, entry.category, `ROADMAP should document category for ${entry.candidate}`);
  assertIncludes(roadmap, entry.target, `ROADMAP should document target for ${entry.candidate}`);
  assertIncludes(roadmap, entry.evidenceStatus, `ROADMAP should document evidence status for ${entry.candidate}`);
  assertIncludes(roadmap, entry.requiredEvidence, `ROADMAP should document required evidence for ${entry.candidate}`);
  assertIncludes(roadmap, entry.reviewTrigger, `ROADMAP should document review trigger for ${entry.candidate}`);
  assertIncludes(roadmap, entry.nextAction, `ROADMAP should document next action for ${entry.candidate}`);
}

assertIncludes(launch, "Triage Guide", "Launch checklist should link triage guide");
assertIncludes(launch, "Post-Launch Feedback Closure Matrix", "Launch checklist should mention feedback closure matrix");
assertIncludes(launch, "Roadmap Candidate Review", "Launch checklist should mention roadmap candidate review");
assertIncludes(launch, "Roadmap", "Launch checklist should mention roadmap");
assertIncludes(contributing, "docs/TRIAGE.md", "CONTRIBUTING should link triage guide");
assertIncludes(contributing, "docs/ROADMAP.md", "CONTRIBUTING should link roadmap");
assertIncludes(contributing, "docs/QUALITY_GATES.md", "CONTRIBUTING should link quality gates");
assertIncludes(readme, "docs/TRIAGE.md", "README should link triage guide");
assertIncludes(readme, "docs/ROADMAP.md", "README should link roadmap");
assertIncludes(readme, "docs/QUALITY_GATES.md", "README should link quality gates");

log("ok triage doc");

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
