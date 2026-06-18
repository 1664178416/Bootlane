import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  contentReviewArtifacts,
  dryRunTranscriptFields,
  evidenceEntryFields,
  evidenceRedactionExamples,
  evidenceStalenessRules,
  evidenceStatusValues,
  externalStateConfirmations,
  externalReleaseChecks,
  launchAnnouncementChecklist,
  localEvidenceCommands,
  manualDecisionChecklist,
  manualDecisionLogFields,
  postPublishVerificationFields,
  releaseCloseoutChecklist,
  releaseEvidenceMaintainerPath,
  releaseEvidenceSnapshotFocus,
  releaseEvidenceSnapshotReferences,
  releaseEvidenceSnapshotRefreshRules,
  releaseEvidenceSectionGuide,
  publishWindowChecklist,
  qualityGateCommands,
  releaseGateSteps,
  releaseReadinessCommands
} from "./release-gate-contracts.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const rootPackage = JSON.parse(await read("package.json"));
const workflow = await read(".github/workflows/ci.yml");
const verifyRelease = await read("scripts/verify-release.mjs");
const snapshotGenerator = await read("scripts/generate-release-evidence-snapshot.mjs");
const qualityGateCheck = await read("scripts/check-quality-gates-doc.mjs");
const templateCheck = await read("scripts/check-github-templates.mjs");
const triageCheck = await read("scripts/check-triage-doc.mjs");
const releaseEvidenceCheck = await read("scripts/check-release-evidence-doc.mjs");
const releaseBlockersCheck = await read("scripts/check-release-blockers-doc.mjs");
const metadataCheck = await read("scripts/check-package-metadata.mjs");

assertUnique(releaseGateSteps.map((step) => step.id), "release gate IDs");
assertUnique(releaseGateSteps.map((step) => step.command), "release gate commands");
assertUnique(releaseGateSteps.map((step) => step.label), "release gate labels");
assertUnique(releaseGateSteps.map((step) => step.qualityStage), "release gate quality stages");
assertUnique(evidenceStatusValues.map((entry) => entry.value), "evidence status values");
assertUnique(evidenceEntryFields.map((entry) => entry.field), "evidence entry fields");
assertUnique(evidenceRedactionExamples.map((entry) => entry.area), "evidence redaction example areas");
assertUnique(dryRunTranscriptFields.map((entry) => entry.field), "dry-run transcript fields");
assertUnique(postPublishVerificationFields.map((entry) => entry.field), "post-publish verification fields");
assertUnique(releaseCloseoutChecklist.map((entry) => entry.item), "release closeout checklist items");
assertUnique(releaseEvidenceMaintainerPath.map((entry) => entry.step), "release evidence maintainer path steps");
assertUnique(releaseEvidenceSectionGuide.map((entry) => entry.section), "release evidence section guide entries");
assertUnique(releaseEvidenceSnapshotFocus.map((entry) => entry.principle), "release evidence snapshot focus principles");
assertUnique(releaseEvidenceSnapshotReferences.map((entry) => entry.section), "release evidence snapshot reference sections");
assertUnique(releaseEvidenceSnapshotReferences.map((entry) => entry.source), "release evidence snapshot reference sources");
assertUnique(releaseEvidenceSnapshotRefreshRules.map((entry) => entry.trigger), "release evidence snapshot refresh triggers");
assertUnique(manualDecisionLogFields.map((entry) => entry.field), "manual decision log fields");
assertUnique(manualDecisionChecklist.map((entry) => entry.item), "manual decision checklist items");
assertUnique(evidenceStalenessRules.map((entry) => entry.evidence), "evidence staleness rules");
assertUnique(publishWindowChecklist.map((entry) => entry.phase), "publish window checklist phases");
assertUnique(externalStateConfirmations.map((entry) => entry.fact), "external state confirmations");
assertUnique(launchAnnouncementChecklist.map((entry) => entry.item), "launch announcement checklist items");

assert(releaseGateSteps.length >= 18, "release gate contract should cover the full local release gate");
assertEqual(localEvidenceCommands.at(0)?.command, "pnpm install --frozen-lockfile", "local evidence should start with install");
assertEqual(localEvidenceCommands.at(-1)?.command, "pnpm verify:release", "local evidence should end with verify release");

for (const step of releaseGateSteps) {
  assert(/^[-a-z0-9]+$/.test(step.id), `release gate ${step.id} should use a stable kebab-case ID`);
  assert(step.label.length > 0, `release gate ${step.id} should have a label`);
  assert(step.command === `pnpm ${step.sourceScript}`, `${step.id} command should match its package script`);
  assert(rootPackage.scripts?.[step.sourceScript], `${step.id} source script should exist in package.json`);
  assert(step.qualityStage.endsWith("."), `${step.id} quality stage should end with a period`);
  await assertRunSpec(step);
}

for (const command of releaseReadinessCommands) {
  assert(qualityGateCommands.includes(command), `quality gate commands should include release readiness command ${command}`);
}

for (const entry of localEvidenceCommands) {
  if (entry.sourceScript) {
    assert(rootPackage.scripts?.[entry.sourceScript], `local evidence source script should exist: ${entry.sourceScript}`);
  }
}

for (const entry of externalReleaseChecks) {
  assert(entry.command.length > 0, "external release check command should not be empty");
  assert(entry.record.length > 0, `external release check ${entry.command} should have a required record`);
}

for (const entry of contentReviewArtifacts) {
  await access(path.join(rootDir, entry.artifact));
  assert(entry.review.length > 0, `${entry.artifact} should have a required review note`);
}

for (const entry of evidenceStatusValues) {
  assert(entry.value.length > 0, "evidence status values should not be empty");
  assert(entry.meaning.length > 0, `evidence status ${entry.value} should have a meaning`);
}

for (const entry of evidenceEntryFields) {
  assert(entry.field.length > 0, "evidence entry fields should not be empty");
  assert(entry.rule.length > 0, `evidence entry field ${entry.field} should have a rule`);
}

for (const entry of evidenceRedactionExamples) {
  assert(entry.area.length > 0, "evidence redaction example areas should not be empty");
  assert(entry.safeRecord.length > 0, `evidence redaction example ${entry.area} should have a safe record`);
  assert(entry.doNotPaste.length > 0, `evidence redaction example ${entry.area} should have a do-not-paste record`);
  assert(entry.handling.length > 0, `evidence redaction example ${entry.area} should have handling guidance`);
}

for (const entry of dryRunTranscriptFields) {
  assert(entry.field.length > 0, "dry-run transcript fields should not be empty");
  assert(entry.appliesTo.length > 0, `dry-run transcript field ${entry.field} should have applies-to guidance`);
  assert(entry.record.length > 0, `dry-run transcript field ${entry.field} should have record guidance`);
}

for (const entry of postPublishVerificationFields) {
  assert(entry.field.length > 0, "post-publish verification fields should not be empty");
  assert(entry.appliesTo.length > 0, `post-publish verification field ${entry.field} should have applies-to guidance`);
  assert(entry.record.length > 0, `post-publish verification field ${entry.field} should have record guidance`);
}

for (const entry of releaseCloseoutChecklist) {
  assert(entry.item.length > 0, "release closeout checklist items should not be empty");
  assert(entry.requiredEvidence.length > 0, `release closeout checklist ${entry.item} should have required evidence`);
  assert(entry.closeoutAction.length > 0, `release closeout checklist ${entry.item} should have closeout action`);
}

for (const entry of releaseEvidenceMaintainerPath) {
  assert(entry.step.length > 0, "release evidence maintainer path step should not be empty");
  assert(entry.action.length > 0, `release evidence maintainer path ${entry.step} should have an action`);
  assert(entry.record.length > 0, `release evidence maintainer path ${entry.step} should have record guidance`);
}

for (const entry of releaseEvidenceSectionGuide) {
  assert(entry.section.length > 0, "release evidence section guide section should not be empty");
  assert(entry.useWhen.length > 0, `release evidence section guide ${entry.section} should have use guidance`);
  assert(entry.recordIn.length > 0, `release evidence section guide ${entry.section} should have record guidance`);
}

for (const entry of releaseEvidenceSnapshotFocus) {
  assert(entry.principle.length > 0, "release evidence snapshot focus principle should not be empty");
  assert(entry.guidance.length > 0, `release evidence snapshot focus ${entry.principle} should have guidance`);
}

for (const entry of releaseEvidenceSnapshotReferences) {
  assert(entry.section.length > 0, "release evidence snapshot reference section should not be empty");
  assert(entry.use.length > 0, `release evidence snapshot reference ${entry.section} should have use guidance`);
  assert(entry.source.length > 0, `release evidence snapshot reference ${entry.section} should have source`);
}

for (const entry of releaseEvidenceSnapshotRefreshRules) {
  assert(entry.trigger.length > 0, "release evidence snapshot refresh trigger should not be empty");
  assert(entry.action.length > 0, `release evidence snapshot refresh ${entry.trigger} should have action`);
  assert(entry.requiredEvidence.length > 0, `release evidence snapshot refresh ${entry.trigger} should have required evidence`);
}

for (const entry of manualDecisionLogFields) {
  assert(entry.field.length > 0, "manual decision log fields should not be empty");
  assert(entry.guidance.length > 0, `manual decision log field ${entry.field} should have guidance`);
}

for (const entry of manualDecisionChecklist) {
  assert(entry.item.length > 0, "manual decision checklist items should not be empty");
  assert(entry.requiredEvidence.length > 0, `manual decision checklist item ${entry.item} should have required evidence`);
}

for (const entry of evidenceStalenessRules) {
  assert(entry.evidence.length > 0, "evidence staleness rule evidence should not be empty");
  assert(entry.staleWhen.length > 0, `evidence staleness rule ${entry.evidence} should have stale-when guidance`);
  assert(entry.rerun.length > 0, `evidence staleness rule ${entry.evidence} should have rerun guidance`);
}

for (const entry of publishWindowChecklist) {
  assert(entry.phase.length > 0, "publish window checklist phase should not be empty");
  assert(entry.action.length > 0, `publish window checklist ${entry.phase} should have an action`);
  assert(entry.requiredEvidence.length > 0, `publish window checklist ${entry.phase} should have required evidence`);
}

for (const entry of externalStateConfirmations) {
  assert(entry.fact.length > 0, "external state confirmation fact should not be empty");
  assert(entry.confirmBy.length > 0, `external state confirmation ${entry.fact} should have confirmation guidance`);
  assert(entry.requiredEvidence.length > 0, `external state confirmation ${entry.fact} should have required evidence`);
  assert(entry.blocksPublishIf.length > 0, `external state confirmation ${entry.fact} should have blocker guidance`);
}

for (const entry of launchAnnouncementChecklist) {
  assert(entry.item.length > 0, "launch announcement checklist items should not be empty");
  assert(
    entry.requiredBeforeAnnouncement.length > 0,
    `launch announcement checklist ${entry.item} should have announcement readiness guidance`
  );
  assert(entry.record.length > 0, `launch announcement checklist ${entry.item} should have record guidance`);
}

for (const command of releaseGateSteps.map((step) => step.command)) {
  assertIncludes(workflow, `run: ${command}`, `CI workflow should run ${command}`);
}

for (const expected of [
  "release-gate-contracts.mjs",
  "releaseGateSteps",
  "commandFor(step.run)",
  "argsFor(step.run)"
]) {
  assertIncludes(verifyRelease, expected, `verify-release should use release gate contract: ${expected}`);
}

for (const expected of [
  "release-gate-contracts.mjs",
  "localEvidenceCommands",
  "externalReleaseChecks",
  "contentReviewArtifacts",
  "releaseCloseoutChecklist",
  "manualDecisionLogFields",
  "manualDecisionChecklist",
  "releaseEvidenceSnapshotFocus",
  "releaseEvidenceSnapshotReferences",
  "releaseEvidenceSnapshotRefreshRules"
]) {
  assertIncludes(snapshotGenerator, expected, `release evidence snapshot generator should use contract: ${expected}`);
}

for (const [name, content, expectedImports, contractFile = "release-gate-contracts.mjs"] of [
  ["quality gates docs check", qualityGateCheck, ["qualityGateCommands", "releaseGateSteps"]],
  ["GitHub templates check", templateCheck, ["releaseGateSteps", "releaseReadinessCommands"]],
  [
    "GitHub templates triage contract",
    templateCheck,
    [
      "roadmapCandidateReviewChecklist",
      "accuracyFixtureCaseMatrix",
      "accuracyFixtureSeedBacklog",
      "accuracyFixtureIntakeFields",
      "accuracySeedIssueRoutingFields",
      "accuracySeedTriageRouting",
      "accuracySeedBatchReviewCadence",
      "accuracySeedEvidenceCommentTemplates",
      "accuracySeedFixtureReadinessHandoff",
      "accuracySeedVerificationCommandSets",
      "accuracySeedEvidenceRecordFields",
      "accuracySeedEvidenceRefreshRules",
      "accuracySeedEvidenceAuditChecklist",
      "accuracySeedAuditOutcomeRouting",
      "accuracySeedAuditOutcomeRecordTemplates",
      "accuracySeedFixtureImplementationBatchFields",
      "accuracySeedFixtureImplementationBatchExecutionChecklist",
      "accuracySeedFixtureImplementationStarterBatches",
      "accuracySeedFixtureImplementationPrQueue",
      "accuracySeedFixtureImplementationQueuedPrReadinessChecklist",
      "accuracySeedFixtureImplementationQueuedPrReviewHandoff",
      "accuracySeedFixtureImplementationQueuedPrReviewOutcomeRouting",
      "accuracySeedFixtureImplementationQueuedPrReviewOutcomeRecordTemplates",
      "accuracySeedFixtureImplementationQueuedPrCloseoutChecklist",
      "accuracySeedFixtureImplementationQueuedPrCloseoutRecordTemplates",
      "accuracySeedFixtureImplementationQueuedPrFollowUpQueue",
      "accuracySeedFixtureImplementationQueuedPrFollowUpRecordTemplates",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewCadence",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRouting",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordTemplates",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditChecklist",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRouting",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordTemplates",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutChecklist",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewCadence",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRouting",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordTemplates",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditChecklist",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRouting",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordTemplates",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutChecklist",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewCadence",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRouting",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordTemplates",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditChecklist",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRouting",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordTemplates",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutChecklist",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules",
      "accuracyWorkIntakeLanes",
      "accuracyWorkPrioritizationRules",
      "accuracyIntakeClosureCriteria"
    ],
    "triage-contracts.mjs"
  ],
  [
    "triage docs check",
    triageCheck,
    [
      "postLaunchFeedbackClosureMatrix",
      "roadmapCandidateReviewChecklist",
      "roadmapCandidateBacklogStatuses",
      "roadmapCandidateBacklog",
      "roadmapCandidateReviewCadence",
      "roadmapCandidateStatusTransitions",
      "accuracyWorkIntakeLanes",
      "accuracyWorkPrioritizationRules",
      "accuracyFixtureIntakeFields",
      "accuracyFixtureCaseMatrix",
      "accuracyFixtureSeedBacklog",
      "accuracySeedIssueRoutingFields",
      "accuracySeedTriageRouting",
      "accuracySeedBatchReviewCadence",
      "accuracySeedEvidenceCommentTemplates",
      "accuracySeedFixtureReadinessHandoff",
      "accuracySeedVerificationCommandSets",
      "accuracySeedEvidenceRecordFields",
      "accuracySeedEvidenceRefreshRules",
      "accuracySeedEvidenceAuditChecklist",
      "accuracySeedAuditOutcomeRouting",
      "accuracySeedAuditOutcomeRecordTemplates",
      "accuracySeedFixtureImplementationBatchFields",
      "accuracySeedFixtureImplementationBatchExecutionChecklist",
      "accuracySeedFixtureImplementationStarterBatches",
      "accuracySeedFixtureImplementationPrQueue",
      "accuracySeedFixtureImplementationQueuedPrReadinessChecklist",
      "accuracySeedFixtureImplementationQueuedPrReviewHandoff",
      "accuracySeedFixtureImplementationQueuedPrReviewOutcomeRouting",
      "accuracySeedFixtureImplementationQueuedPrReviewOutcomeRecordTemplates",
      "accuracySeedFixtureImplementationQueuedPrCloseoutChecklist",
      "accuracySeedFixtureImplementationQueuedPrCloseoutRecordTemplates",
      "accuracySeedFixtureImplementationQueuedPrFollowUpQueue",
      "accuracySeedFixtureImplementationQueuedPrFollowUpRecordTemplates",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewCadence",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRouting",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordTemplates",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditChecklist",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRouting",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordTemplates",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutChecklist",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewCadence",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRouting",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordTemplates",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditChecklist",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRouting",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordTemplates",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutChecklist",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewCadence",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRouting",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordTemplates",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditChecklist",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRouting",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordTemplates",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutChecklist",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates",
      "accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules",
      "accuracyIntakeClosureCriteria"
    ],
    "triage-contracts.mjs"
  ],
  [
    "release evidence docs check",
    releaseEvidenceCheck,
    [
      "localEvidenceCommands",
      "externalReleaseChecks",
      "contentReviewArtifacts",
      "evidenceStatusValues",
      "evidenceEntryFields",
      "evidenceRedactionExamples",
      "dryRunTranscriptFields",
      "postPublishVerificationFields",
      "releaseCloseoutChecklist",
      "releaseEvidenceMaintainerPath",
      "releaseEvidenceSectionGuide",
      "releaseEvidenceSnapshotFocus",
      "releaseEvidenceSnapshotReferences",
      "releaseEvidenceSnapshotRefreshRules",
      "manualDecisionLogFields",
      "manualDecisionChecklist",
      "evidenceStalenessRules",
      "publishWindowChecklist",
      "externalStateConfirmations"
    ]
  ],
  ["release blockers docs check", releaseBlockersCheck, ["launchAnnouncementChecklist"]]
]) {
  assertIncludes(content, contractFile, `${name} should import ${contractFile}`);
  for (const expectedImport of expectedImports) {
    assertIncludes(content, expectedImport, `${name} should use ${expectedImport}`);
  }
}

assertIncludes(metadataCheck, "release:gates:check", "metadata check should guard release gate contract script");

log(`ok release gate contracts (${releaseGateSteps.length} gates)`);

async function assertRunSpec(step) {
  const run = step.run;

  if (run.kind === "nodeScript") {
    assert(run.name.endsWith(".mjs"), `${step.id} node script should use an .mjs file`);
    await access(path.join(rootDir, "scripts", run.name));
    return;
  }

  if (run.kind === "localBin") {
    assert(["tsc", "vitest"].includes(run.name), `${step.id} should use an expected local binary`);
    assert(Array.isArray(run.args), `${step.id} local binary run spec should include args`);
    return;
  }

  throw new Error(`Unsupported run kind for ${step.id}: ${run.kind}`);
}

async function read(relativePath) {
  return readFile(path.join(rootDir, relativePath), "utf8");
}

function assertUnique(values, label) {
  const seen = new Set();
  for (const value of values) {
    assert(!seen.has(value), `${label} should not contain duplicate ${value}`);
    seen.add(value);
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
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
