import { readFile } from "node:fs/promises";
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
  publishWindowChecklist
} from "./release-gate-contracts.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const evidence = await read("docs/RELEASE_EVIDENCE.md");
const snapshot = await read("docs/RELEASE_EVIDENCE_SNAPSHOT.md");
const readme = await read("README.md");
const contributing = await read("CONTRIBUTING.md");
const release = await read("docs/RELEASE.md");
const blockers = await read("docs/RELEASE_BLOCKERS.md");
const qualityGates = await read("docs/QUALITY_GATES.md");
const techStack = await read("docs/TECH_STACK.md");
const githubActions = await read("docs/GITHUB_ACTIONS.md");
const workflow = await read(".github/workflows/ci.yml");
const verifyRelease = await read("scripts/verify-release.mjs");
const gateContracts = await read("scripts/release-gate-contracts.mjs");
const metadataCheck = await read("scripts/check-package-metadata.mjs");

for (const expected of [
  "Bootlane Release Evidence",
  "Status Values",
  "Evidence Entry Format",
  "Evidence Redaction Examples",
  "Dry-Run Transcript Template",
  "Post-Publish Verification Transcript",
  "Maintainer Execution Path",
  "Evidence Section Guide",
  "Evidence Record Header",
  "Manual Decision Log",
  "Evidence Staleness Rules",
  "Publish Window Checklist",
  "External State Confirmations",
  "Snapshot Focus Policy",
  "Snapshot Reference Guide",
  "Snapshot Refresh Rules",
  "Repository Evidence",
  "Local Gate Evidence",
  "Networked Release Evidence",
  "Package Dry-Run Evidence",
  "npm Account Evidence",
  "Security and Content Evidence",
  "Publish Evidence",
  "Post-Publish Evidence",
  "Release Closeout Checklist",
  "Evidence Storage",
  "Generated Snapshot Draft",
  "RELEASE_EVIDENCE_SNAPSHOT.md",
  "scripts/release-gate-contracts.mjs",
  "pnpm release:evidence",
  "pnpm release:evidence:check",
  "Do not use a green local gate as publish approval by itself",
  "Do not publish if it points to another project",
  "Do not guess it from the current working tree",
  "Keep secrets, tokens, private contact addresses, and full registry auth output out of public comments"
]) {
  assertIncludes(evidence, expected, `RELEASE_EVIDENCE should include ${expected}`);
}

for (const entry of evidenceStatusValues) {
  assertIncludes(evidence, `\`${entry.value}\``, `RELEASE_EVIDENCE should define status ${entry.value}`);
  assertIncludes(evidence, entry.meaning, `RELEASE_EVIDENCE should define status meaning for ${entry.value}`);
}

for (const entry of evidenceEntryFields) {
  assertIncludes(evidence, entry.field, `RELEASE_EVIDENCE should define evidence field ${entry.field}`);
  assertIncludes(evidence, entry.rule, `RELEASE_EVIDENCE should define rule for ${entry.field}`);
}

for (const entry of evidenceRedactionExamples) {
  assertIncludes(evidence, entry.area, `RELEASE_EVIDENCE should document redaction area ${entry.area}`);
  assertIncludes(evidence, entry.safeRecord, `RELEASE_EVIDENCE should document safe record for ${entry.area}`);
  assertIncludes(evidence, entry.doNotPaste, `RELEASE_EVIDENCE should document redaction boundary for ${entry.area}`);
  assertIncludes(evidence, entry.handling, `RELEASE_EVIDENCE should document handling for ${entry.area}`);
}

for (const entry of dryRunTranscriptFields) {
  assertIncludes(evidence, entry.field, `RELEASE_EVIDENCE should document dry-run transcript field ${entry.field}`);
  assertIncludes(evidence, entry.appliesTo, `RELEASE_EVIDENCE should document applies-to scope for ${entry.field}`);
  assertIncludes(evidence, entry.record, `RELEASE_EVIDENCE should document record rule for ${entry.field}`);
}

for (const entry of postPublishVerificationFields) {
  assertIncludes(evidence, entry.field, `RELEASE_EVIDENCE should document post-publish field ${entry.field}`);
  assertIncludes(evidence, entry.appliesTo, `RELEASE_EVIDENCE should document post-publish applies-to scope for ${entry.field}`);
  assertIncludes(evidence, entry.record, `RELEASE_EVIDENCE should document post-publish record rule for ${entry.field}`);
}

for (const entry of releaseCloseoutChecklist) {
  assertIncludes(evidence, entry.item, `RELEASE_EVIDENCE should document release closeout item ${entry.item}`);
  assertIncludes(evidence, entry.requiredEvidence, `RELEASE_EVIDENCE should document closeout evidence for ${entry.item}`);
  assertIncludes(evidence, entry.closeoutAction, `RELEASE_EVIDENCE should document closeout action for ${entry.item}`);
}

for (const entry of releaseEvidenceMaintainerPath) {
  assertIncludes(evidence, entry.step, `RELEASE_EVIDENCE should document maintainer path step ${entry.step}`);
  assertIncludes(evidence, entry.action, `RELEASE_EVIDENCE should document maintainer path action for ${entry.step}`);
  assertIncludes(evidence, entry.record, `RELEASE_EVIDENCE should document maintainer path record for ${entry.step}`);
}

for (const entry of releaseEvidenceSectionGuide) {
  assertIncludes(evidence, entry.section, `RELEASE_EVIDENCE should document section guide entry ${entry.section}`);
  assertIncludes(evidence, entry.useWhen, `RELEASE_EVIDENCE should document section guide use case for ${entry.section}`);
  assertIncludes(evidence, entry.recordIn, `RELEASE_EVIDENCE should document section guide record target for ${entry.section}`);
}

for (const entry of releaseEvidenceSnapshotFocus) {
  assertIncludes(evidence, entry.principle, `RELEASE_EVIDENCE should document snapshot focus principle ${entry.principle}`);
  assertIncludes(evidence, entry.guidance, `RELEASE_EVIDENCE should document snapshot focus guidance for ${entry.principle}`);
}

for (const entry of releaseEvidenceSnapshotReferences) {
  assertIncludes(evidence, entry.section, `RELEASE_EVIDENCE should document snapshot reference section ${entry.section}`);
  assertIncludes(evidence, entry.use, `RELEASE_EVIDENCE should document snapshot reference use for ${entry.section}`);
  assertIncludes(evidence, entry.source, `RELEASE_EVIDENCE should document snapshot reference source for ${entry.section}`);
}

for (const entry of releaseEvidenceSnapshotRefreshRules) {
  assertIncludes(evidence, entry.trigger, `RELEASE_EVIDENCE should document snapshot refresh trigger ${entry.trigger}`);
  assertIncludes(evidence, entry.action, `RELEASE_EVIDENCE should document snapshot refresh action for ${entry.trigger}`);
  assertIncludes(
    evidence,
    entry.requiredEvidence,
    `RELEASE_EVIDENCE should document snapshot refresh evidence for ${entry.trigger}`
  );
}

for (const entry of manualDecisionLogFields) {
  assertIncludes(evidence, entry.field, `RELEASE_EVIDENCE should document manual decision field ${entry.field}`);
  assertIncludes(evidence, entry.guidance, `RELEASE_EVIDENCE should document manual decision guidance for ${entry.field}`);
}

for (const entry of manualDecisionChecklist) {
  assertIncludes(evidence, entry.item, `RELEASE_EVIDENCE should document manual decision item ${entry.item}`);
  assertIncludes(evidence, entry.requiredEvidence, `RELEASE_EVIDENCE should document required evidence for ${entry.item}`);
}

for (const entry of evidenceStalenessRules) {
  assertIncludes(evidence, entry.evidence, `RELEASE_EVIDENCE should document staleness evidence ${entry.evidence}`);
  assertIncludes(evidence, entry.staleWhen, `RELEASE_EVIDENCE should document stale condition for ${entry.evidence}`);
  assertIncludes(evidence, entry.rerun, `RELEASE_EVIDENCE should document rerun rule for ${entry.evidence}`);
}

for (const entry of publishWindowChecklist) {
  assertIncludes(evidence, entry.phase, `RELEASE_EVIDENCE should document publish window phase ${entry.phase}`);
  assertIncludes(evidence, entry.action, `RELEASE_EVIDENCE should document publish window action for ${entry.phase}`);
  assertIncludes(
    evidence,
    entry.requiredEvidence,
    `RELEASE_EVIDENCE should document publish window evidence for ${entry.phase}`
  );
}

for (const entry of externalStateConfirmations) {
  assertIncludes(evidence, entry.fact, `RELEASE_EVIDENCE should document external state fact ${entry.fact}`);
  assertIncludes(evidence, entry.confirmBy, `RELEASE_EVIDENCE should document external state confirmation for ${entry.fact}`);
  assertIncludes(
    evidence,
    entry.requiredEvidence,
    `RELEASE_EVIDENCE should document external state required evidence for ${entry.fact}`
  );
  assertIncludes(evidence, entry.blocksPublishIf, `RELEASE_EVIDENCE should document external state blocker for ${entry.fact}`);
}

for (const expected of [
  "Release version",
  "Evidence location",
  "Evidence owner",
  "Evidence date range",
  "Commit or tree state",
  "Overall status",
  "Decision owner",
  "Decision timestamp",
  "Evidence baseline",
  "Decision basis",
  "Open blockers",
  "Next action",
  "Evidence Staleness Rules",
  "Date/operator",
  "Output summary",
  "Evidence link",
  "Tarball residue check",
  "Package contents review",
  "Dry-Run Transcript Template",
  "Post-Publish Verification Transcript",
  "npm package pages",
  "GitHub release and tag"
]) {
  assertIncludes(evidence, expected, `RELEASE_EVIDENCE should include fillable evidence field ${expected}`);
}

for (const expected of [
  "git remote -v",
  "repository`, `homepage`, and `bugs`",
  "v0.1.0",
  ...localEvidenceCommands.map((entry) => entry.command),
  ...externalReleaseChecks.map((entry) => entry.command)
]) {
  assertIncludes(evidence, expected, `RELEASE_EVIDENCE should document ${expected}`);
}

for (const expected of [
  "SECURITY.md",
  "README.md",
  ...contentReviewArtifacts.map((entry) => entry.artifact),
  "PACKAGE_CONTENTS.md",
  "RELEASE_BLOCKERS.md",
  "QUALITY_GATES.md",
  "RELEASE_EVIDENCE_SNAPSHOT.md"
]) {
  assertIncludes(evidence, expected, `RELEASE_EVIDENCE should link or mention ${expected}`);
}

for (const expected of [
  "Generated by: pnpm release:evidence",
  "Source checklist: docs/RELEASE_EVIDENCE.md",
  "does not execute release commands",
  "scripts/release-gate-contracts.mjs",
  "Bootlane 0.1.0 Release Evidence Snapshot",
  "Snapshot Focus Policy",
  "Snapshot Reference Guide",
  "Snapshot Refresh Rules",
  "Evidence Record Header Draft",
  "Manual Decision Log",
  "Package Metadata Snapshot",
  "Local Gate Evidence Draft",
  "External and Manual Evidence Draft",
  "Content Review Draft",
  "Release Closeout Draft",
  ...localEvidenceCommands.map((entry) => entry.command),
  ...externalReleaseChecks.map((entry) => entry.command),
  ...contentReviewArtifacts.map((entry) => entry.artifact),
  "@bootlane/core",
  "bootlane",
  "Keep secrets, tokens, private contact addresses, and full registry auth output out of copied evidence"
]) {
  assertIncludes(snapshot, expected, `RELEASE_EVIDENCE_SNAPSHOT should include ${expected}`);
}

for (const entry of releaseEvidenceSnapshotFocus) {
  assertIncludes(snapshot, entry.principle, `RELEASE_EVIDENCE_SNAPSHOT should document snapshot focus principle ${entry.principle}`);
  assertIncludes(snapshot, entry.guidance, `RELEASE_EVIDENCE_SNAPSHOT should document snapshot focus guidance for ${entry.principle}`);
}

for (const entry of releaseEvidenceSnapshotReferences) {
  assertIncludes(snapshot, entry.section, `RELEASE_EVIDENCE_SNAPSHOT should document snapshot reference section ${entry.section}`);
  assertIncludes(snapshot, entry.use, `RELEASE_EVIDENCE_SNAPSHOT should document snapshot reference use for ${entry.section}`);
  assertIncludes(snapshot, entry.source, `RELEASE_EVIDENCE_SNAPSHOT should document snapshot reference source for ${entry.section}`);
}

for (const entry of releaseEvidenceSnapshotRefreshRules) {
  assertIncludes(snapshot, entry.trigger, `RELEASE_EVIDENCE_SNAPSHOT should document snapshot refresh trigger ${entry.trigger}`);
  assertIncludes(snapshot, entry.action, `RELEASE_EVIDENCE_SNAPSHOT should document snapshot refresh action for ${entry.trigger}`);
  assertIncludes(
    snapshot,
    entry.requiredEvidence,
    `RELEASE_EVIDENCE_SNAPSHOT should document snapshot refresh evidence for ${entry.trigger}`
  );
}

for (const entry of manualDecisionLogFields) {
  assertIncludes(snapshot, entry.field, `RELEASE_EVIDENCE_SNAPSHOT should document manual decision field ${entry.field}`);
  assertIncludes(snapshot, entry.guidance, `RELEASE_EVIDENCE_SNAPSHOT should document manual decision guidance for ${entry.field}`);
}

for (const entry of manualDecisionChecklist) {
  assertIncludes(snapshot, entry.item, `RELEASE_EVIDENCE_SNAPSHOT should document manual decision item ${entry.item}`);
  assertIncludes(snapshot, entry.requiredEvidence, `RELEASE_EVIDENCE_SNAPSHOT should document required evidence for ${entry.item}`);
}

for (const entry of releaseCloseoutChecklist) {
  assertIncludes(snapshot, entry.item, `RELEASE_EVIDENCE_SNAPSHOT should document release closeout item ${entry.item}`);
  assertIncludes(snapshot, entry.requiredEvidence, `RELEASE_EVIDENCE_SNAPSHOT should document closeout evidence for ${entry.item}`);
  assertIncludes(snapshot, entry.closeoutAction, `RELEASE_EVIDENCE_SNAPSHOT should document closeout action for ${entry.item}`);
}

const snapshotLineCount = snapshot.split(/\r?\n/).length;
assert(snapshotLineCount < 180, `RELEASE_EVIDENCE_SNAPSHOT should stay under 180 lines, got ${snapshotLineCount}`);

for (const [name, content] of [
  ["README", readme],
  ["Contributing guide", contributing],
  ["Release notes", release],
  ["Release blockers", blockers],
  ["Quality gates", qualityGates],
  ["Tech stack", techStack],
  ["GitHub Actions docs", githubActions]
]) {
  assertIncludes(content, "RELEASE_EVIDENCE.md", `${name} should link release evidence`);
  assertIncludes(content, "pnpm docs:check-release-evidence", `${name} should document release evidence validation`);
  assertIncludes(content, "RELEASE_EVIDENCE_SNAPSHOT.md", `${name} should link release evidence snapshot`);
  assertIncludes(content, "pnpm release:evidence:check", `${name} should document release evidence snapshot validation`);
}

for (const [name, content] of [
  ["Release notes", release],
  ["Quality gates", qualityGates],
  ["Contributing guide", contributing]
]) {
  assertIncludes(content, "Evidence Record Header", `${name} should mention release evidence record header`);
  assertIncludes(content, "Maintainer Execution Path", `${name} should mention release evidence maintainer execution path`);
  assertIncludes(content, "Evidence Section Guide", `${name} should mention release evidence section guide`);
  assertIncludes(content, "Manual Decision Log", `${name} should mention release manual decision log`);
  assertIncludes(content, "Evidence Staleness Rules", `${name} should mention release evidence staleness rules`);
  assertIncludes(content, "Publish Window Checklist", `${name} should mention release publish window checklist`);
  assertIncludes(content, "External State Confirmations", `${name} should mention release external state confirmations`);
  assertIncludes(content, "Evidence Entry Format", `${name} should mention release evidence entry format`);
  assertIncludes(content, "Evidence Redaction Examples", `${name} should mention release evidence redaction examples`);
  assertIncludes(content, "Dry-Run Transcript Template", `${name} should mention release dry-run transcript template`);
  assertIncludes(content, "Post-Publish Verification Transcript", `${name} should mention release post-publish transcript template`);
  assertIncludes(content, "Release Closeout Checklist", `${name} should mention release closeout checklist`);
  assertIncludes(content, "Snapshot Focus Policy", `${name} should mention release snapshot focus policy`);
  assertIncludes(content, "Snapshot Reference Guide", `${name} should mention release snapshot reference guide`);
  assertIncludes(content, "Snapshot Refresh Rules", `${name} should mention release snapshot refresh rules`);
  assertIncludes(content, "Release Readiness", `${name} should mention release readiness evidence flow`);
}

assertIncludes(workflow, "pnpm docs:check-release-evidence", "CI should run release evidence docs validation");
assertIncludes(workflow, "pnpm release:evidence:check", "CI should run release evidence snapshot validation");
assertIncludes(verifyRelease, "release-gate-contracts.mjs", "verify release should use release gate contract");
assertIncludes(gateContracts, "check-release-evidence-doc.mjs", "release gate contract should run release evidence docs validation");
assertIncludes(gateContracts, "generate-release-evidence-snapshot.mjs", "release gate contract should run release evidence snapshot validation");
assertIncludes(metadataCheck, "docs:check-release-evidence", "metadata check should guard release evidence docs script");
assertIncludes(metadataCheck, "release:evidence:check", "metadata check should guard release evidence snapshot script");
assertIncludes(metadataCheck, "docs:check-changelog", "metadata check should guard changelog docs script");

log("ok release evidence doc");

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
