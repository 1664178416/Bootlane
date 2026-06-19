# Bootlane Triage Guide

Last updated: 2026-06-10

This guide explains how maintainers should turn post-launch feedback into fixtures, check changes, docs fixes, or roadmap items.

Use it with:

- [Launch Checklist](LAUNCH.md)
- [Adding Checks](ADDING_CHECKS.md)
- [Check IDs](CHECK_IDS.md)
- [Report Schema](REPORT_SCHEMA.md)
- [Roadmap](ROADMAP.md)
- [Contributing Guide](../CONTRIBUTING.md)

Root-relative references used in issue and PR comments:

- `docs/CHECK_IDS.md`
- `docs/REPORT_SCHEMA.md`
- `docs/ROADMAP.md`
- `docs/TRIAGE.md`

## Triage Goals

- Reduce false positives quickly.
- Preserve the read-only `bootlane check` contract.
- `bootlane check` must not execute project scripts or write files while reproducing or fixing triage issues.
- Turn confirmed behavior into small fixtures.
- Keep finding IDs and JSON report shape stable.
- Separate immediate bug fixes from roadmap ideas.

## Labels

Use these labels consistently:

| Label | Meaning |
| --- | --- |
| `needs-triage` | New issue that has not been classified |
| `false-positive` | Bootlane reported a finding it should not report |
| `missing-detection` | Bootlane missed a setup signal it should detect |
| `docs` | Documentation is confusing, stale, or missing |
| `enhancement` | New capability or broader product idea |
| `needs-fixture` | The issue needs a minimal fixture before implementation |
| `needs-more-info` | Maintainers cannot reproduce from the current report |
| `good-first-issue` | Small, well-scoped change with a clear fixture |

For first-batch 0.2.0 accuracy reports, use [Seed Triage Routing](ROADMAP.md#seed-triage-routing) after the issue records Fixture seed and Seed fit or new seed rationale. That table maps seed evidence to `needs-fixture`, `good-first-issue`, `needs-more-info`, roadmap status, and the maintainer next action.
When multiple seed-routed reports arrive together, use [Seed Batch Review Cadence](ROADMAP.md#seed-batch-review-cadence) before selecting implementation batches, merging duplicates, adding a new seed, or moving reports back to evidence collection.
Use [Seed Evidence Comment Templates](ROADMAP.md#seed-evidence-comment-templates) when asking for missing seed evidence, confirming canonical fixture targets, consolidating duplicates, recording new seed decisions, or recording 0.2.0 milestone readiness decisions.
Use [Seed Fixture Readiness Handoff](ROADMAP.md#seed-fixture-readiness-handoff) before opening fixture-first implementation PRs from seed-routed reports.
Use [Seed Verification Command Sets](ROADMAP.md#seed-verification-command-sets) to record the focused docs-only, fixture-ready implementation, duplicate consolidation, new seed, or milestone batch verification commands.
Use [Seed Evidence Record Fields](ROADMAP.md#seed-evidence-record-fields) so seed decisions have a single record location, route summary, fixture readiness summary, verification evidence, owner, and follow-up.
Use [Seed Evidence Refresh Rules](ROADMAP.md#seed-evidence-refresh-rules) whenever seed route, fixture target, verification scope, canonical issue, milestone, or owner changes after a record exists.
Use [Seed Evidence Audit Checklist](ROADMAP.md#seed-evidence-audit-checklist) before closing, parking, promoting, handing off, or implementing seed-routed work.
Use [Seed Audit Outcome Routing](ROADMAP.md#seed-audit-outcome-routing) after the audit passes or fails so the next state is fixture implementation, more evidence, duplicate consolidation, roadmap parking, out-of-scope closure, or milestone batch selection.
Use [Seed Audit Outcome Record Templates](ROADMAP.md#seed-audit-outcome-record-templates) after outcome routing so the issue comment, PR section, milestone note, or roadmap note records required inputs, body, and follow-up.
Use [Seed Fixture Implementation Batch Fields](ROADMAP.md#seed-fixture-implementation-batch-fields) before seed-routed work enters a fixture-first implementation batch or PR.
Use [Seed Fixture Implementation Batch Execution Checklist](ROADMAP.md#seed-fixture-implementation-batch-execution-checklist) once batch fields are filled so the first fixture fails before code changes and verification matches final scope.
Use [Seed Fixture Implementation Starter Batches](ROADMAP.md#seed-fixture-implementation-starter-batches) when selecting the first fixture-first implementation PRs, or explain why a smaller or different audited batch is required.
Use [Seed Fixture Implementation PR Queue](ROADMAP.md#seed-fixture-implementation-pr-queue) for first implementation PR order, unless the issue or milestone record explains why a PR is skipped, split, or reordered.
Use [Seed Fixture Implementation Queued PR Readiness Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-readiness-checklist) before opening a queued fixture-first PR.
Use [Seed Fixture Implementation Queued PR Review Handoff](ROADMAP.md#seed-fixture-implementation-queued-pr-review-handoff) before requesting review for a queued fixture-first PR.
Use [Seed Fixture Implementation Queued PR Review Outcome Routing](ROADMAP.md#seed-fixture-implementation-queued-pr-review-outcome-routing) after queued PR review so approval, requested changes, readiness return, split/defer, or public-surface refresh is recorded.
Use [Seed Fixture Implementation Queued PR Review Outcome Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-review-outcome-record-templates) after outcome routing so the PR section, issue note, or milestone note records required inputs, body, and follow-up.
Use [Seed Fixture Implementation Queued PR Closeout Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-closeout-checklist) before merge, closure, split, defer, or readiness return for queued fixture-first PRs.
Use [Seed Fixture Implementation Queued PR Closeout Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-closeout-record-templates) after closeout so PR closeout notes, issue links, and milestone follow-ups record closeout evidence consistently.
Use [Seed Fixture Implementation Queued PR Follow-Up Queue](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-queue) after closeout creates deferred scope, readiness refresh, public-surface, split PR, or read-only escalation follow-up work.
Use [Seed Fixture Implementation Queued PR Follow-Up Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-record-templates) after follow-up routing so PR notes, issue comments, milestone notes, and roadmap updates record required inputs, body, next action, and verification context consistently.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Cadence](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-cadence) after follow-up records exist so stale follow-ups are reviewed, refreshed, escalated, deferred, or closed before work continues.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-routing) after follow-up review so refresh, resume-review, release-blocking escalation, defer/park, or close/supersede decisions leave one route.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-templates) after follow-up review outcome routing so refresh, resume-review, release-blocking escalation, defer/park, or close/supersede records include required inputs, body, and next action.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-checklist) after outcome records exist so template match, required inputs, traceable body, owned next action, and default-path boundary are reviewed before work resumes, blocks, parks, or closes.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Routing](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-routing) after audit checklist review so passed audits, record refreshes, blocker escalations, parked follow-ups, and blocked close/resume decisions leave one visible route.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-templates) after audit outcome routing so each audit result records required inputs, body, and follow-up before work continues.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-checklist) after audit outcome records exist so continuation, parked state, escalation, close/resume blocks, and default-path verification are checked before work continues.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-templates) after closeout so completion, continuation, block, parked state, and default-path verification records keep required inputs, body, and follow-up consistent.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-rules) whenever closeout source evidence, route, owner, blocker, parked status, or default-path verification changes after the closeout record was written.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-cadence) after refresh rules apply so refreshed closeout records are reviewed before continuation, closure, resume, parking, blocking, or escalation.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-routing) after refresh review so refreshed closeouts land in one accepted, refresh-again, blocked, parked, or closed route.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-templates) after refresh review outcome routing so accepted, refresh-again, blocked, parked, and closed outcomes record required inputs, body, and follow-up.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-checklist) after refresh review outcome records exist so template match, input completeness, traceability, ownership, and default-path boundary are checked before continuation or closure.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-routing) after refreshed closeout outcome record audit so passed audits, refreshed records, blocker escalations, parked closeouts, and blocked close/continuation requests leave one route.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-templates) after refreshed closeout outcome record audit outcome routing so passed, refresh, blocker, parked, and blocked close/continuation records include required inputs, body, and follow-up.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-checklist) after refreshed audit outcome records exist so completion, allowed closeout or continuation, enforceable blockers, owned parked state, and default-path verification are checked before closure or continuation proceeds.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-templates) after closeout so completion, allowed closeout or continuation, blocker escalation, parked state, and default-path verification records keep required inputs, body, and follow-up consistent.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-rules) whenever refreshed audit outcome closeout source evidence, allowed route, owner, blocker, parked status, or default-path verification changes after the closeout record was written.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-cadence) after refreshed audit outcome closeout refresh rules apply so stale refreshed closeout records are reviewed before closure, continuation, review resume, parking, blocking, supersede, or escalation.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-routing) after refreshed audit outcome closeout refresh review cadence so accepted, refresh-again, blocked, parked, closed, or superseded refreshed audit outcome closeout refreshes land in one route.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-templates) after refreshed audit outcome closeout refresh review outcome routing so accepted, refresh-again, blocked, parked, and closed outcomes record required inputs, body, and follow-up.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-checklist) after refreshed audit outcome closeout refresh review outcome records exist so template match, input completeness, traceability, ownership, and default-path boundary are checked before continuation or closure.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-routing) after refreshed audit outcome closeout refresh review outcome record audit so accepted audits, refreshed records, blocker escalations, parked or deferred outcomes, and closed or superseded refreshed audit outcome closeout refresh review outcomes leave one route.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-templates) after audit outcome routing so accepted, refresh-needed, blocked, parked or deferred, and closed or superseded audit outcomes record required inputs, body, and follow-up.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-checklist) after audit outcome records exist so completion, closure or continuation route, blocker/deferral/closure state, ownership, stop conditions, and default-path evidence are checked before closure or continuation.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-templates) after closeout so completion, closure or continuation, blocker/deferral/closure state, ownership, stop condition, and default-path evidence decisions record required inputs, body, and follow-up.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-rules) before stale audit outcome closeout source evidence, closure or continuation route, blocker or deferral evidence, owner, stop condition, or default-path verification supports closure or continuation.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-cadence) after audit outcome closeout refresh rules apply so refreshed records are reviewed before closure, continuation, review resume, parking, deferral, supersede, or escalation.

## Post-Launch Feedback Closure Matrix

Use this matrix after the first launch to route feedback into a fixture-backed fix, docs update, roadmap candidate, release evidence update, or launch follow-up.

| Route | First action | Required artifact | Close when |
| --- | --- | --- | --- |
| False positive | Reproduce the exact finding with `bootlane check --verbose --no-color` and confirm the finding ID. | A minimal fixture or focused unit test that fails before the fix and passes after the fix. | The fixture-backed fix merges, or the report behavior is documented as intentional with the issue linked. |
| Missing detection | Identify the missed Node, Python, package-manager, env, runtime, test, or CI signal. | A minimal fixture that contains the missed signal plus a failing test for the expected detection. | The missed signal is detected without regressing existing happy-path fixtures. |
| Docs confusion | Identify the smallest stale, missing, or confusing page or section. | A docs change, example, or README/package README update linked from the issue. | The docs answer the reported confusion and the relevant docs check passes. |
| Feature request | Classify the request as a small deterministic check, future write flow, integration, ecosystem expansion, or out-of-scope idea. | A fixture-backed implementation plan for small checks, or a documented roadmap candidate for broader work. | The request is implemented with fixtures, moved to a roadmap candidate, or closed as out of scope with rationale. |
| Release or launch blocker | Check whether the report affects package identity, published CLI startup, secret redaction, read-only behavior, or public launch trust. | A release blocker entry, release evidence update, or launch follow-up with an owner and next action. | The blocker is resolved, downgraded with evidence, or tracked as a post-launch follow-up before broad sharing continues. |

## Roadmap Candidate Review

Use this review when a feature request is too broad to implement immediately or needs more product evidence before it becomes a fixture-backed change.

| Category | Review question | Required evidence | Next action |
| --- | --- | --- | --- |
| Small deterministic check | Can the request be proven with a minimal fixture and a stable finding or report change? | Minimal fixture, expected finding or report change, and false-positive risk note. | Move toward implementation only after the fixture or focused test exists. |
| Integration or output workflow | Does the request improve GitHub, CI, Markdown, JSON, or package-manager workflows without changing the default local check path? | Workflow example, target output shape, and confirmation that default `bootlane check` stays local and read-only. | Keep as a roadmap candidate until the integration boundary and release-safety impact are documented. |
| New ecosystem expansion | Is there enough repeated evidence to support a new ecosystem without diluting Node and Python quality? | At least two representative repositories or fixtures, ecosystem metadata signals, and expected install/test command recognition. | Park until current Node and Python regressions are stable and fixture coverage is available. |
| Write-capable flow | Would the request require `bootlane check` to write files, execute project scripts, or modify user repositories? | Explicit write boundary, dry-run preview behavior, rollback or review safeguards, and command shape proposal. | Defer from the default check path and design an explicit opt-in fix command before implementation. |
| Out of scope | Does the request depend on cloud accounts, telemetry, LLMs, vulnerability scanning, or network-only behavior? | Rationale that links the request to Bootlane's local-first setup-readiness scope. | Close with rationale or redirect to a future optional integration discussion. |

Record roadmap candidates in [Roadmap](ROADMAP.md) with the category, evidence status, target, required evidence, review trigger, and next action. Do not treat a roadmap candidate as approval to expand the default `bootlane check` path.

## False Positives

Use the false-positive issue form.
For 0.2.0 accuracy work, the form collects Accuracy lane, Accuracy priority, Fixture target, Expected output, and Happy-path impact.
For first-batch 0.2.0 accuracy work, the form also collects the Seed Issue Routing Fields: Fixture seed and Seed fit or new seed rationale.
Map the report to the [Fixture Case Matrix](ROADMAP.md#fixture-case-matrix) before changing detector, reporter, or scoring code.
Use the [Fixture Seed Backlog](ROADMAP.md#fixture-seed-backlog) when the report fits a first-batch 0.2.0 accuracy seed.
Use the [Seed Fixture Readiness Handoff](ROADMAP.md#seed-fixture-readiness-handoff) before moving from triage comments to a fixture-first PR.

Required evidence:

- Bootlane version.
- Exact command.
- Finding ID and report snippet.
- Minimal reproduction or public repo link.
- Explanation of why the finding is wrong.

Triage flow:

1. Confirm the finding ID and category.
2. Reproduce with `bootlane check --verbose --no-color`.
3. Create or shrink a fixture under `examples/fixtures`.
4. Add a failing test that proves the false positive.
5. Use [0.2.0 Accuracy Work Intake](ROADMAP.md#020-accuracy-work-intake) when the fix should be planned as post-launch accuracy work.
6. Match the fix to a Fixture Case Matrix row with minimal files, expected report diff, and happy-path fixture protection.
7. Confirm the issue records Fixture seed and Seed fit or new seed rationale for first-batch work.
8. Use [Seed Triage Routing](ROADMAP.md#seed-triage-routing) before assigning `needs-fixture`, `good-first-issue`, `needs-more-info`, roadmap status, or implementation next action.
9. Tighten the detector, scanner, or check.
10. Keep the finding ID stable unless the existing ID is fundamentally wrong.
11. Run `pnpm build`, `pnpm test`, `pnpm docs:check-ids`, and `pnpm smoke:bin`.

Prefer narrow fixes over broad suppressions. If the report is noisy but technically correct, improve the message, severity, confidence, or docs before disabling the check.

## Missing Detections

Use the missing-detection issue form.
For 0.2.0 accuracy work, the form collects Accuracy lane, Accuracy priority, Fixture target, Expected output, and Happy-path impact.
For first-batch 0.2.0 accuracy work, the form also collects the Seed Issue Routing Fields: Fixture seed and Seed fit or new seed rationale.
Map the report to the [Fixture Case Matrix](ROADMAP.md#fixture-case-matrix) before changing detector, reporter, or scoring code.
Use the [Fixture Seed Backlog](ROADMAP.md#fixture-seed-backlog) when the report fits a first-batch 0.2.0 accuracy seed.
Use the [Seed Fixture Readiness Handoff](ROADMAP.md#seed-fixture-readiness-handoff) before moving from triage comments to a fixture-first PR.

Required evidence:

- Bootlane version.
- Exact command.
- Current output or JSON/Markdown snippet.
- Files that contain the missed signal.
- Expected project type, package manager, test command, env var, runtime version, or CI signal.

Triage flow:

1. Decide whether the signal belongs in Node, Python, or cross-project logic.
2. Add a minimal fixture that contains only the needed metadata.
3. Add a failing test for the missed signal.
4. Prefer shared helpers in `packages/core/src/signals` when more than one check needs the rule.
5. Update docs when behavior becomes user-visible.
6. Use [0.2.0 Accuracy Work Intake](ROADMAP.md#020-accuracy-work-intake) before scheduling repeated supported misses for 0.2.0.
7. Match the fix to a Fixture Case Matrix row with minimal files, expected report diff, and happy-path fixture protection.
8. Confirm the issue records Fixture seed and Seed fit or new seed rationale for first-batch work.
9. Use [Seed Triage Routing](ROADMAP.md#seed-triage-routing) before assigning `needs-fixture`, `good-first-issue`, `needs-more-info`, roadmap status, or implementation next action.
10. Add or update check IDs only when a new finding is introduced.

Do not add a new ecosystem from a single missing-detection issue unless the current Node/Python behavior remains stable.

## Docs Confusion

Use the docs-confusion issue form.

Triage flow:

1. Identify whether the confusion is about CLI usage, configuration, fix previews, GitHub Actions, Python support, contributing, release, or launch.
2. Update the smallest relevant doc.
3. Add examples when the confusion is command-related.
4. Update README or package READMEs when npm users would otherwise miss the answer.
5. Run docs checks and `pnpm example:report:check` if report examples changed.

When docs describe external state, such as the final repository URL or npm account access, keep blockers explicit instead of guessing.

## Feature Requests

Use the feature-request issue form.

Triage flow:

1. Check whether the proposal fits Bootlane's local-first setup-readiness scope.
2. Confirm it can keep `bootlane check` read-only.
3. Confirm it does not require network access, accounts, telemetry, LLMs, or arbitrary project script execution in the default path.
4. If small and deterministic, ask for or create a fixture and move it toward implementation.
5. If broad or uncertain, run the Roadmap Candidate Review and document it in [Roadmap](ROADMAP.md) as a roadmap candidate instead of implementing immediately.
6. If the request is accuracy polish for 0.2.0, classify it through [0.2.0 Accuracy Work Intake](ROADMAP.md#020-accuracy-work-intake) before implementation.

Good early feature requests:

- More package-manager command recognition.
- More precise env var scanning.
- Clearer report explanations.
- Additional deterministic Node/Python setup signals.

Defer:

- Automatic file writes.
- Cloud dashboards.
- AI repair flows.
- New ecosystems that would dilute Node/Python quality.

## PR Triage

Use [.github/PULL_REQUEST_TEMPLATE.md](../.github/PULL_REQUEST_TEMPLATE.md).
For accuracy PRs, record the Accuracy lane, Accuracy priority, Fixture target, Expected output, and Happy-path impact from [0.2.0 Accuracy Work Intake](ROADMAP.md#020-accuracy-work-intake).
For accuracy PRs, match the implementation to the [Fixture Case Matrix](ROADMAP.md#fixture-case-matrix) and record minimal files, expected report diff, and happy-path fixture protection.
For first-batch 0.2.0 accuracy PRs, name the [Fixture Seed Backlog](ROADMAP.md#fixture-seed-backlog) seed or explain why the work needs a new seed.
For seed-routed accuracy PRs, confirm the [Seed Fixture Readiness Handoff](ROADMAP.md#seed-fixture-readiness-handoff) records the owner, target artifact, expected first test, happy-path guard, and verification commands before detector, reporter, or scoring changes start.
For seed-routed accuracy PRs, choose the matching [Seed Verification Command Sets](ROADMAP.md#seed-verification-command-sets) entry and record the commands, required record, and escalation condition.
For seed-routed accuracy PRs, fill the [Seed Evidence Record Fields](ROADMAP.md#seed-evidence-record-fields) so reviewers can find the record location, canonical links, seed route summary, fixture readiness summary, verification evidence, owner, and follow-up.
For seed-routed accuracy PRs, apply [Seed Evidence Refresh Rules](ROADMAP.md#seed-evidence-refresh-rules) if route, target artifact, verification scope, canonical issue, milestone, or owner changed after the first record.
For seed-routed accuracy PRs, pass the [Seed Evidence Audit Checklist](ROADMAP.md#seed-evidence-audit-checklist) before requesting review.
For seed-routed accuracy PRs, record the [Seed Audit Outcome Routing](ROADMAP.md#seed-audit-outcome-routing) outcome before requesting review, changing implementation ownership, or reshaping milestone scope.
For seed-routed accuracy PRs, use the matching [Seed Audit Outcome Record Templates](ROADMAP.md#seed-audit-outcome-record-templates) entry so the selected outcome records required inputs, record body, and follow-up before review.
For seed-routed accuracy PRs, fill [Seed Fixture Implementation Batch Fields](ROADMAP.md#seed-fixture-implementation-batch-fields) before fixture, detector, reporter, scoring, schema, or example output changes start.
For seed-routed accuracy PRs, follow [Seed Fixture Implementation Batch Execution Checklist](ROADMAP.md#seed-fixture-implementation-batch-execution-checklist) from locked scope through first failing fixture, smallest implementation change, happy-path guards, public report surface updates, and final verification.
For seed-routed accuracy PRs, choose a [Seed Fixture Implementation Starter Batches](ROADMAP.md#seed-fixture-implementation-starter-batches) batch or document why the PR intentionally uses a smaller or different audited batch.
For seed-routed accuracy PRs, name the [Seed Fixture Implementation PR Queue](ROADMAP.md#seed-fixture-implementation-pr-queue) order or document the audited skip, split, or reorder rationale.
For seed-routed accuracy PRs, pass the matching [Seed Fixture Implementation Queued PR Readiness Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-readiness-checklist) entries before opening implementation work.
For seed-routed accuracy PRs, use the matching [Seed Fixture Implementation Queued PR Review Handoff](ROADMAP.md#seed-fixture-implementation-queued-pr-review-handoff) before requesting review so required inputs, review focus, merge evidence, and fallback are explicit.
For seed-routed accuracy PRs, record the matching [Seed Fixture Implementation Queued PR Review Outcome Routing](ROADMAP.md#seed-fixture-implementation-queued-pr-review-outcome-routing) outcome before merging, requesting another revision, returning to readiness, splitting scope, or refreshing public surfaces.
For seed-routed accuracy PRs, use the matching [Seed Fixture Implementation Queued PR Review Outcome Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-review-outcome-record-templates) entry so review outcome required inputs, record body, and follow-up are explicit before merge or closure.
For seed-routed accuracy PRs, pass the [Seed Fixture Implementation Queued PR Closeout Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-closeout-checklist) before merge, closure, split, defer, or readiness return so final verification, public surfaces, follow-ups, and read-only evidence are recorded.
For seed-routed accuracy PRs, use the matching [Seed Fixture Implementation Queued PR Closeout Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-closeout-record-templates) entry so closeout evidence, verification, public-surface sync, ownership, and read-only boundary decisions are recorded consistently.
For seed-routed accuracy PRs, route closeout-created follow-ups through the matching [Seed Fixture Implementation Queued PR Follow-Up Queue](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-queue) entry so owner action, verification, and stop conditions are explicit before planning or implementation resumes after readiness.
For seed-routed accuracy PRs, use the matching [Seed Fixture Implementation Queued PR Follow-Up Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-record-templates) entry so follow-up required inputs, record body, next action, and verification context are explicit before work continues.
For seed-routed accuracy PRs, apply the matching [Seed Fixture Implementation Queued PR Follow-Up Review Cadence](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-cadence) entry before stale follow-ups change owner, resume review, split scope, touch public surfaces, or resolve read-only escalations.
For seed-routed accuracy PRs, record the matching [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-routing) outcome before refreshing evidence, resuming review, escalating blockers, deferring/parking, or closing a follow-up.
For seed-routed accuracy PRs, use the matching [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-templates) entry so follow-up review outcome required inputs, record body, and next action are explicit before work resumes, blocks, parks, or closes.
For seed-routed accuracy PRs, pass the [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-checklist) before follow-up work resumes, blocks, parks, or closes so template match, required inputs, traceability, ownership, and default-path boundary are explicit.
For seed-routed accuracy PRs, record the matching [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Routing](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-routing) result before allowing passed audits, record refreshes, blocker escalations, parked follow-ups, or close/resume decisions to proceed.
For seed-routed accuracy PRs, use the matching [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-templates) entry so audit outcome required inputs, record body, and follow-up are explicit before work continues.
For seed-routed accuracy PRs, pass the [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-checklist) before continuing, pausing, escalating, parking, closing, or resuming audit outcome work.
For seed-routed accuracy PRs, use the matching [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-templates) entry so closeout required inputs, record body, and follow-up are explicit.
For seed-routed accuracy PRs, apply [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-rules) before using a closeout record whose source evidence, route, owner, blocker, parked status, or default-path verification changed.
For seed-routed accuracy PRs, use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-cadence) before refreshed closeout records support continuation, closure, resume, parking, blocking, or escalation.
For seed-routed accuracy PRs, record the matching [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-routing) outcome before refreshed closeouts are accepted, refreshed again, blocked, parked, closed, or superseded.
For seed-routed accuracy PRs, use the matching [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-templates) entry so refresh review outcome required inputs, record body, and follow-up are explicit.
For seed-routed accuracy PRs, pass the [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-checklist) before refreshed closeout outcome records support continuation, closure, resume, parking, blocking, or escalation.
For seed-routed accuracy PRs, record the matching [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-routing) outcome before passed refreshed outcome audits, record refreshes, blocker escalations, parked closeouts, or blocked close/continuation requests proceed.
For seed-routed accuracy PRs, use the matching [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-templates) entry so refreshed audit outcome required inputs, record body, and follow-up are explicit before closure or continuation.
For seed-routed accuracy PRs, pass the [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-checklist) before refreshed audit outcome records support closeout, continuation, closure, resume, parking, blocking, or escalation.
For seed-routed accuracy PRs, use the matching [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-templates) entry so refreshed audit outcome closeout required inputs, record body, and follow-up are explicit before closure or continuation.
For seed-routed accuracy PRs, apply [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-rules) before stale refreshed audit outcome closeout source evidence, allowed route, owner, blocker, parked status, or default-path verification supports closure or continuation.
For seed-routed accuracy PRs, use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-cadence) after applying refresh rules so refreshed audit outcome closeout records are reviewed, routed, and recorded before closure or continuation.
For seed-routed accuracy PRs, record the matching [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-routing) outcome before refreshed audit outcome closeout refreshes are accepted, refreshed again, blocked, parked, closed, or superseded.
For seed-routed accuracy PRs, use the matching [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-templates) entry so refreshed audit outcome closeout refresh required inputs, record body, and follow-up are explicit before closure or continuation.
For seed-routed accuracy PRs, pass the [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-checklist) before refreshed audit outcome closeout refresh review outcome records support continuation, closure, resume, parking, blocking, supersede, or escalation.
For seed-routed accuracy PRs, record the matching [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-routing) outcome before accepted audits, refreshed records, blocker escalations, parked or deferred outcomes, or closed or superseded refreshed audit outcome closeout refresh review outcomes proceed.
For seed-routed accuracy PRs, use the matching [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-templates) entry so accepted audits, refreshed records, blocker escalations, parked or deferred outcomes, and closed or superseded refreshed audit outcome closeout refresh review outcomes have required inputs, record body, and follow-up before closure or continuation.
For seed-routed accuracy PRs, pass the [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-checklist) before audit outcome records support closure, continuation, review resume, parking, deferral, blocking, supersede, or escalation.
For seed-routed accuracy PRs, use the matching [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-templates) entry so audit outcome closeout required inputs, record body, and follow-up are explicit before closure or continuation.
For seed-routed accuracy PRs, apply [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-rules) before stale audit outcome closeout source evidence, closure or continuation route, blocker or deferral evidence, owner, stop condition, or default-path verification supports closure or continuation.
For seed-routed accuracy PRs, use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-cadence) after applying refresh rules so refreshed audit outcome closeout records are reviewed and recorded before closure, continuation, review resume, parking, deferral, supersede, or escalation.
Use the [Accuracy Work Intake Closure Criteria](ROADMAP.md#closure-criteria) before review starts if the PR fixes a false positive, missing detection, env precision issue, package-manager command recognition issue, or report clarity issue.

Before review, confirm:

- The PR describes the user-visible behavior.
- Fixtures were added or updated for behavior changes.
- Check IDs were documented in [Check IDs](CHECK_IDS.md).
- Report shape changes update [Report Schema](REPORT_SCHEMA.md).
- `examples/reports/node-missing-env.md` was regenerated when Markdown output changed.
- `bootlane check` remains read-only.

For risky changes, ask for:

- A fixture that fails before the change.
- A JSON or Markdown report example.
- A short note about false-positive risk.
- A confirmation that existing Node and Python happy-path fixtures still pass.

## Escalation Rules

Escalate an issue to release-blocking only when:

- Published packages would point to the wrong repository.
- `bootlane check` mutates user files.
- JSON schema changes without a documented versioning decision.
- A high-confidence security/secret check prints full secret values.
- The CLI cannot run through `npx bootlane@latest` after publish.

Otherwise, keep issues in normal triage and prioritize by user impact and fixture quality.

## Closing Criteria

Use [Accuracy Work Intake Closure Criteria](ROADMAP.md#closure-criteria) for false-positive, missing-detection, and 0.2.0 accuracy PR outcomes.
Use the [Fixture Case Matrix](ROADMAP.md#fixture-case-matrix) to confirm the issue or PR names minimal files, expected report diff, and happy-path fixture protection before closing accuracy work as fixture-backed.
Use the [Fixture Seed Backlog](ROADMAP.md#fixture-seed-backlog) to confirm first-batch accuracy work names a seed, trigger, expected first test, happy-path guard, and next action.
Use [Seed Triage Routing](ROADMAP.md#seed-triage-routing) to confirm labels, roadmap status, and maintainer next action match the available seed evidence.
Use [Seed Batch Review Cadence](ROADMAP.md#seed-batch-review-cadence) when closing, consolidating, or promoting multiple seed-routed reports together.
Use [Seed Evidence Comment Templates](ROADMAP.md#seed-evidence-comment-templates) so missing-evidence requests, canonical fixture target confirmations, duplicate seed consolidation notes, new seed candidate decisions, and 0.2.0 seed milestone readiness decisions leave consistent issue comments.
Use [Seed Fixture Readiness Handoff](ROADMAP.md#seed-fixture-readiness-handoff) to confirm owner, target artifact, expected first test, happy-path guard, verification commands, and implementation boundary before fixture work starts.
Use [Seed Verification Command Sets](ROADMAP.md#seed-verification-command-sets) to confirm the recorded verification commands match the seed route before closing or promoting seed-routed work.
Use [Seed Evidence Record Fields](ROADMAP.md#seed-evidence-record-fields) before closing, parking, promoting, or handing off seed-routed work so the decision remains auditable.
Use [Seed Evidence Refresh Rules](ROADMAP.md#seed-evidence-refresh-rules) before closing, parking, promoting, or handing off seed-routed work if any seed evidence changed after the record was written.
Use [Seed Evidence Audit Checklist](ROADMAP.md#seed-evidence-audit-checklist) before changing labels, roadmap status, milestone scope, or implementation ownership.
Use [Seed Audit Outcome Routing](ROADMAP.md#seed-audit-outcome-routing) after the audit to choose fixture implementation, missing-evidence follow-up, duplicate consolidation, roadmap parking, out-of-scope closure, or milestone batch readiness.
Use [Seed Audit Outcome Record Templates](ROADMAP.md#seed-audit-outcome-record-templates) to record the selected outcome before closing, promoting, handing off, implementing, selecting a milestone batch, or requesting review.
Use [Seed Fixture Implementation Batch Fields](ROADMAP.md#seed-fixture-implementation-batch-fields) before closing implementation-ready seed work as reviewable.
Use [Seed Fixture Implementation Batch Execution Checklist](ROADMAP.md#seed-fixture-implementation-batch-execution-checklist) to confirm implementation-ready seed work locked scope, wrote the first failing fixture, kept changes minimal, ran guards, updated public surfaces only when needed, and matched verification scope.
Use [Seed Fixture Implementation Starter Batches](ROADMAP.md#seed-fixture-implementation-starter-batches) to confirm first implementation PRs picked a known starter batch or recorded a smaller audited batch rationale.
Use [Seed Fixture Implementation PR Queue](ROADMAP.md#seed-fixture-implementation-pr-queue) to confirm first implementation PRs followed queue order or recorded an audited skip, split, or reorder rationale.
Use [Seed Fixture Implementation Queued PR Readiness Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-readiness-checklist) to confirm queued PRs had enough evidence, guard coverage, and public-surface certainty before implementation started.
Use [Seed Fixture Implementation Queued PR Review Handoff](ROADMAP.md#seed-fixture-implementation-queued-pr-review-handoff) to confirm queued PRs give reviewers the required inputs, review focus, merge evidence, and fallback before review starts.
Use [Seed Fixture Implementation Queued PR Review Outcome Routing](ROADMAP.md#seed-fixture-implementation-queued-pr-review-outcome-routing) to confirm queued PR review decisions route to merge, in-scope changes, readiness refresh, split/defer, or public-surface refresh before closure.
Use [Seed Fixture Implementation Queued PR Review Outcome Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-review-outcome-record-templates) to confirm queued PR review decisions have required inputs, record body, and follow-up before closure.
Use [Seed Fixture Implementation Queued PR Closeout Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-closeout-checklist) to confirm queued PR closeout records final verification, public-surface sync, split/defer or readiness owner, and read-only boundary evidence.
Use [Seed Fixture Implementation Queued PR Closeout Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-closeout-record-templates) to confirm closeout evidence, final verification, public-surface sync, owner follow-up, and read-only boundary records exist before closure.
Use [Seed Fixture Implementation Queued PR Follow-Up Queue](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-queue) to confirm closeout-created follow-ups route deferred scope, readiness refreshes, public-surface work, split PRs, or read-only escalations to one owner and verification path.
Use [Seed Fixture Implementation Queued PR Follow-Up Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-record-templates) to confirm routed follow-ups leave required inputs, record body, next action, and verification context before closure.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Cadence](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-cadence) to confirm stale follow-ups were reviewed, refreshed, escalated, deferred, or closed before closure.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-routing) to confirm follow-up review decisions route to refresh, resume-review, release-blocking escalation, defer/park, or close/supersede before closure.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-templates) to confirm follow-up review decisions have required inputs, record body, and next action before closure.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-checklist) to confirm follow-up review outcome records pass template match, input completeness, traceability, ownership, and default-path boundary before closure.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Routing](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-routing) to confirm audit results route to pass, record refresh, blocker escalation, parked follow-up, or blocked close/resume before closure.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-templates) to confirm each audit outcome has required inputs, record body, and follow-up before closure.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-checklist) to confirm audit outcome records are complete, owned, bounded, and verified before closure.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-templates) to confirm closeout decisions have required inputs, record body, and follow-up before closure.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-rules) to confirm stale closeout records were refreshed before closure, resume, parking, blocking, or escalation proceeds.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-cadence) to confirm refreshed closeout records were reviewed, routed, and recorded before closure, resume, parking, blocking, or escalation proceeds.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-routing) to confirm refreshed closeout review results route to accepted, refresh-again, blocked, parked, or closed before closure proceeds.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-templates) to confirm refresh review outcomes have required inputs, record body, and follow-up before closure proceeds.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-checklist) to confirm refreshed closeout outcome records pass template match, input completeness, traceability, ownership, and default-path boundary before closure proceeds.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-routing) to confirm refreshed closeout outcome record audits route to pass, record refresh, blocker escalation, parked closeout, or blocked close/continuation before closure proceeds.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-templates) to confirm each refreshed audit outcome has required inputs, record body, and follow-up before closure proceeds.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-checklist) to confirm refreshed audit outcome closeout refresh review outcome records pass template match, input completeness, traceability, ownership, and default-path boundary before closure proceeds.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-routing) to confirm refreshed audit outcome closeout refresh review outcome record audits route to accept, refresh, blocker escalation, park/defer, or close/supersede before closure proceeds.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-templates) to confirm every routed audit outcome has required inputs, record body, and follow-up before closure proceeds.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-checklist) to confirm audit outcome records have complete fields, explicit closure or continuation state, enforceable blockers or deferrals, owned follow-up, stop conditions, and current default-path evidence.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-templates) to confirm closeout decisions leave required inputs, record body, follow-up, owner, and boundary evidence before closure proceeds.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-rules) to confirm stale audit outcome closeout records are refreshed before closure, continuation, review resume, parking, deferral, supersede, or escalation proceeds.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-cadence) to confirm refreshed audit outcome closeout records are reviewed and recorded before closure, continuation, review resume, parking, deferral, supersede, or escalation proceeds.

Close an issue only after one of these is true:

- A fixture-backed fix merged.
- The accuracy issue has Accuracy lane, Accuracy priority, Fixture target, Expected output, and Happy-path impact recorded, and the fixture-backed fix or review outcome is linked.
- Accuracy fixture-backed work records the Fixture Case Matrix row, minimal files, expected report diff, and happy-path fixture protection.
- First-batch accuracy work records Fixture seed, Seed fit or new seed rationale, and the Fixture Seed Backlog seed or explains why a new seed is needed.
- First-batch accuracy labels, roadmap status, and next action match Seed Triage Routing.
- Multiple seed-routed reports record the Seed Batch Review Cadence review, grouped issue links, decision, and record location.
- Seed-routed maintainer comments use Seed Evidence Comment Templates for missing evidence, canonical fixture targets, duplicates, new seed decisions, or milestone readiness.
- Seed-routed fixture implementation records the Seed Fixture Readiness Handoff, owner, target artifact, expected first test, happy-path guard, verification commands, and implementation boundary.
- Seed-routed comments, handoffs, PRs, and milestone decisions record the matching Seed Verification Command Sets entry, required record, and escalation condition.
- Seed-routed work records the Seed Evidence Record Fields: record location, canonical links, seed route summary, fixture readiness summary, verification evidence summary, and next owner and follow-up.
- Seed-routed work refreshes stale evidence with Seed Evidence Refresh Rules before closure, promotion, handoff, or implementation.
- Seed-routed work passes the Seed Evidence Audit Checklist before closure, promotion, handoff, or implementation.
- Seed-routed work records a Seed Audit Outcome Routing outcome before closure, promotion, handoff, implementation, milestone selection, or review request.
- Seed-routed work uses a Seed Audit Outcome Record Templates entry so the selected outcome has required inputs, record body, and follow-up recorded.
- Seed-routed implementation batches record Seed Fixture Implementation Batch Fields before fixture, detector, reporter, scoring, schema, or example output changes start.
- Seed-routed implementation batches follow Seed Fixture Implementation Batch Execution Checklist before review or closure.
- Seed-routed first implementation PRs choose a Seed Fixture Implementation Starter Batches entry or record why a smaller or different audited batch is required.
- Seed-routed first implementation PRs name a Seed Fixture Implementation PR Queue order or record why the queue was skipped, split, or reordered.
- Seed-routed queued PRs pass Seed Fixture Implementation Queued PR Readiness Checklist before implementation starts.
- Seed-routed queued PRs use Seed Fixture Implementation Queued PR Review Handoff before review, with required inputs, review focus, merge evidence, and fallback recorded.
- Seed-routed queued PR review records a Seed Fixture Implementation Queued PR Review Outcome Routing outcome before merge, revision, readiness return, split/defer, or public-surface refresh.
- Seed-routed queued PR review uses a Seed Fixture Implementation Queued PR Review Outcome Record Templates entry so required inputs, record body, and follow-up are recorded before merge or closure.
- Seed-routed queued PR closeout passes Seed Fixture Implementation Queued PR Closeout Checklist before merge, closure, split, defer, or readiness return.
- Seed-routed queued PR closeout uses a Seed Fixture Implementation Queued PR Closeout Record Templates entry so final evidence, verification, public-surface sync, ownership, and read-only boundary decisions are recorded.
- Seed-routed queued PR follow-up uses a Seed Fixture Implementation Queued PR Follow-Up Queue entry so deferred scope, readiness refresh, public-surface work, split PRs, or read-only escalations have an owner, route, verification path, and stop condition.
- Seed-routed queued PR follow-up uses a Seed Fixture Implementation Queued PR Follow-Up Record Templates entry so required inputs, record body, next action, and verification context are recorded before work continues.
- Seed-routed queued PR follow-up review uses a Seed Fixture Implementation Queued PR Follow-Up Review Cadence entry so stale follow-ups are refreshed, escalated, deferred, or closed before planning or implementation continues.
- Seed-routed queued PR follow-up review records a Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing outcome before refreshing evidence, resuming review, escalating blockers, deferring/parking, or closing a follow-up.
- Seed-routed queued PR follow-up review outcomes use a Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates entry so required inputs, record body, and next action are recorded before work resumes, blocks, parks, or closes.
- Seed-routed queued PR follow-up review outcome records pass Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Checklist before work resumes, blocks, parks, or closes.
- Seed-routed queued PR follow-up review outcome record audits use Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Routing before passed audits, record refreshes, blocker escalations, parked follow-ups, or close/resume decisions proceed.
- Seed-routed queued PR follow-up review outcome record audit outcomes use Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates so required inputs, record body, and follow-up are recorded before work continues.
- Seed-routed queued PR follow-up review outcome record audit outcome records pass Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Checklist before work continues, pauses, escalates, parks, closes, or resumes.
- Seed-routed queued PR follow-up review outcome record audit outcome record closeouts use Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Templates so closeout required inputs, record body, and follow-up are recorded.
- Seed-routed queued PR follow-up review outcome record audit outcome record closeout records use Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules before stale source evidence, route, owner, blocker, parked status, or default-path verification can support closure or continuation.
- Seed-routed queued PR follow-up review outcome record audit outcome record closeout record refreshes use Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence so refreshed closeout records are reviewed, routed, and recorded before closure or continuation.
- Seed-routed queued PR follow-up review outcome record audit outcome record closeout record refresh reviews record a Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing outcome before refreshed closeouts are accepted, refreshed again, blocked, parked, closed, or superseded.
- Seed-routed queued PR follow-up review outcome record audit outcome record closeout record refresh review outcomes use Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates so required inputs, record body, and follow-up are recorded before closure or continuation.
- Seed-routed queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome records pass Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist before refreshed closeouts support closure or continuation.
- Seed-routed queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audits use Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing before passed audits, refreshed records, blocker escalations, parked closeouts, or blocked close/continuation requests proceed.
- Seed-routed queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcomes use Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates so required inputs, record body, and follow-up are recorded before closure or continuation.
- Seed-routed queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome records pass Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist so refreshed audit outcome records are complete, owned, bounded, enforceable, and verified before closure or continuation.
- Seed-routed queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeouts use Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates so closeout required inputs, record body, and follow-up are recorded before closure or continuation.
- Seed-routed queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout records follow Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules before stale refreshed source evidence, allowed route, owner, blocker, parked status, or default-path verification supports closure or continuation.
- Seed-routed queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refreshes use Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence so stale refreshed audit outcome closeout records are reviewed before closure or continuation.
- Seed-routed queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh reviews record a Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing outcome before accepted, refresh-again, blocked, parked, closed, or superseded refreshed audit outcome closeout refreshes support closure or continuation.
- Seed-routed queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcomes use Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates so required inputs, record body, and follow-up are recorded before closure or continuation.
- Seed-routed queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome records pass Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist before refreshed audit outcome closeout refreshes support closure or continuation.
- Seed-routed queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audits use Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing before accepted audits, refreshed records, blocker escalations, parked or deferred outcomes, or closed or superseded refreshed audit outcome closeout refresh review outcomes proceed.
- Seed-routed queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcomes use Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates so required inputs, record body, and follow-up are recorded before closure or continuation.
- Seed-routed queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome records pass Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist so completion, closure or continuation state, blocker or deferral enforcement, ownership, stop conditions, and default-path evidence are checked before closure or continuation.
- Seed-routed queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeouts use Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates so closeout decisions leave required inputs, record body, and follow-up before closure or continuation.
- Seed-routed queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout records follow Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules before stale source evidence, closure or continuation route, blocker or deferral evidence, owner, stop condition, or default-path verification supports closure or continuation.
- Seed-routed queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refreshes use Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence so refreshed audit outcome closeout records are reviewed before closure, continuation, review resume, parking, deferral, supersede, or escalation.
- The issue is missing fixture evidence, has a maintainer comment naming the missing intake fields, and is marked `needs-more-info` after follow-up.
- The docs were updated and linked.
- The report behavior is intentional and explained.
- The feature or accuracy-adjacent request was moved to a documented roadmap candidate with evidence status and review trigger.
- The request was closed out of scope with local-first setup-readiness rationale.
- The issue lacks reproduction details after follow-up and is marked `needs-more-info`.

Every fixed false positive or missing detection should leave behind a fixture or focused unit test. A fix without a fixture is usually only half a fix.
