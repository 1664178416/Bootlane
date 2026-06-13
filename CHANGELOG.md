# Changelog

All notable changes to Bootlane will be documented in this file.

This project follows a lightweight pre-1.0 changelog format until the first public release.

## 0.1.0 - Unreleased

### Added

- Node.js repository detection with readiness checks for setup docs, dependency metadata, runtime versions, env examples, tests, secrets, and GitHub Actions.
- Python repository detection with read-only setup checks for runtime metadata, dependency files, README install/test guidance, env examples, tests, and GitHub Actions.
- Package-manager-aware diagnostics for npm, pnpm, Yarn, Bun, pip, uv, Poetry, and Pipenv projects.
- Terminal, JSON, and Markdown reports, including compact `--summary`, diagnostic `--verbose`, and `--output` report artifact support.
- `bootlane.config.json` support for ignore patterns, CI failure thresholds, disabled checks, and severity overrides.
- Dry-run fix proposals for `.env.example`, README setup sections, and deterministic GitHub Actions workflow previews.
- Verbose terminal fix preview content with a 40-line cap, plus compact Markdown fix preview summaries for issues and PR comments.
- CI-ready behavior with `--ci`, `--fail-on`, saved report artifacts before CI exit, and downstream GitHub Actions documentation.
- Release-readiness scripts for built CLI smoke checks and npm package dry-run validation with package content assertions.
- Package contents contract, fillable first-publish release evidence tables, generated release evidence snapshot, changelog validation, and release safety guard for the manual first-release path.
- Shared release evidence entry format for status values, date/operator, output summaries, required records, and evidence links.
- Release evidence redaction examples for npm auth, registry checks, CI logs, security contact review, and scanner findings.
- Release evidence dry-run transcript template for package dry-runs, tarball residue checks, packed install smoke, and publish order records.
- Release evidence manual decision log for final proceed, pause, or blocked publish decisions.
- Release evidence staleness rules for local gates, npm availability, package dry-runs, packed install smoke, security contact readiness, manual decisions, package page review, and post-publish checks.
- Release publish-window checklist for opening evidence records, confirming external identity, refreshing final checks, recording decisions, publishing packages, and post-publish verification.
- Release readiness issue form for collecting first-publish evidence records without copying secrets or treating green local gates as publish approval.
- Release external state confirmations for final repository identity, package URL metadata, npm registry and account access, security contact readiness, package pages, and published CLI checks.
- Release post-publish verification transcript for `npx` checks, npm package page reviews, and GitHub tag or release confirmation.
- Release evidence maintainer execution path that connects the issue form, generated snapshot, local gate, external confirmations, publish decision, package publish, and post-publish verification.
- Release evidence section guide that tells maintainers which evidence section to use, when to use it, and where to record the result.
- Release evidence snapshot focus policy and reference guide that keep generated drafts compact while linking long release guidance.
- Release evidence snapshot refresh rules that tell maintainers when regenerated evidence drafts are required after release-surface changes.
- Release closeout checklist for final status, published package confirmation, tag or release links, unresolved follow-ups, and announcement readiness.
- Launch announcement readiness gate that connects release closeout evidence to public sharing, package pages, published CLI checks, announcement copy, and feedback intake.
- Post-launch feedback closure matrix that routes launch feedback to fixture-backed fixes, docs updates, roadmap candidates, release evidence updates, or launch follow-ups.
- Roadmap candidate review checklist for classifying feature requests by deterministic checks, integrations, ecosystem expansion, write-capable flows, or out-of-scope ideas before planning.
- Roadmap candidate backlog for tracking parked ideas by target, evidence status, review trigger, and next action without making release promises.
- Roadmap review cadence and status transitions for promoting, parking, deferring, or closing candidates based on evidence and product boundaries.
- 0.2.0 accuracy work intake for prioritizing false-positive reduction, missing-detection coverage, env precision, package-manager command recognition, and report clarity work before implementation.
- Fixture intake fields in false-positive, missing-detection, and PR templates for accuracy lane, priority, fixture target, expected output, and happy-path impact.
- Fixture case matrix for mapping accuracy lanes to minimal files, expected report diffs, and happy-path fixture protection before implementation.
- Fixture seed backlog for first-batch 0.2.0 accuracy candidates, including triggers, expected first tests, happy-path guards, and next actions.
- Seed issue routing fields in false-positive and missing-detection forms for fixture seed and seed-fit rationale.
- Seed triage routing for first-batch accuracy labels, roadmap status, and maintainer next actions.
- Seed batch review cadence for consolidating repeated seed-routed reports, missing evidence, new seed candidates, and 0.2.0 milestone readiness.
- Seed evidence comment templates for requesting missing evidence, confirming canonical fixture targets, consolidating duplicate seed reports, recording new seed decisions, and recording 0.2.0 milestone readiness.
- Seed fixture readiness handoff for moving seed-routed reports into fixture-first PRs only after owner, target artifact, expected first test, happy-path guard, verification commands, and implementation boundary are recorded.
- Seed verification command sets for seed-routed docs-only triage, fixture-ready implementation, duplicate consolidation, new seed acceptance, and milestone batch decisions.
- Seed evidence record fields for recording seed decision location, canonical links, route summary, fixture readiness, verification evidence, owner, and follow-up.
- Seed evidence refresh rules for updating stale seed records when route, fixture target, verification scope, canonical issue, milestone, or owner changes.
- Seed evidence audit checklist for reviewing record location, route/status sync, fixture readiness, verification scope, duplicates, and ownership before closure, promotion, handoff, or implementation.
- Seed audit outcome routing for sending passed or failed seed audits to fixture implementation, more evidence, duplicate consolidation, roadmap parking, out-of-scope closure, or milestone batch decisions.
- Seed audit outcome record templates for documenting required inputs, record body, and follow-up after each selected audit outcome.
- Seed fixture implementation batch fields for scoping selected and deferred seeds, fixture targets, expected first failures, happy-path guards, schema/check ID impact, verification plans, and stop conditions before implementation starts.
- Seed fixture implementation batch execution checklist for locking scope, writing the first failing fixture, keeping implementation minimal, running guards, updating public report surfaces, and matching verification before review.
- Seed fixture implementation starter batches for choosing the first fixture-first 0.2.0 accuracy implementation PRs from audited seed-routed work.
- Seed fixture implementation PR queue for ordering the first fixture-first accuracy PRs and recording audited skip, split, or reorder decisions.
- Seed fixture implementation queued PR readiness checklist for blocking queued PRs until evidence, guard coverage, and public-surface certainty are reviewable.
- Seed fixture implementation queued PR review handoff for giving reviewers required inputs, review focus, merge evidence, and fallback paths before queued accuracy PR review.
- Seed fixture implementation queued PR review outcome routing for recording approval, requested changes, readiness return, split/defer, and public-surface refresh decisions after queued accuracy PR review.
- Seed fixture implementation queued PR review outcome record templates for documenting required inputs, record body, and follow-up after each queued accuracy PR review outcome.
- Seed fixture implementation queued PR closeout checklist for recording final verification, public-surface sync, follow-up ownership, and read-only evidence before queued accuracy PR merge or closure.
- Seed fixture implementation queued PR closeout record templates for documenting final evidence, verification, public-surface sync, ownership, and read-only boundary decisions after queued accuracy PR closeout.
- Seed fixture implementation queued PR follow-up queue for routing deferred scope, readiness refreshes, public-surface work, split PRs, and read-only escalations after queued accuracy PR closeout.
- Seed fixture implementation queued PR follow-up record templates for documenting required inputs, record body, next action, and verification context after queued PR follow-up routing.
- Seed fixture implementation queued PR follow-up review cadence for refreshing, escalating, deferring, or closing stale queued PR follow-ups before work continues.
- Seed fixture implementation queued PR follow-up review outcome routing for recording refresh, resume-review, release-blocking escalation, defer/park, and close/supersede decisions after follow-up review.
- Seed fixture implementation queued PR follow-up review outcome record templates for documenting required inputs, record body, and next action after each follow-up review outcome.
- Seed fixture implementation queued PR follow-up review outcome record audit checklist for reviewing template match, required inputs, traceable body, owned next action, and default-path boundary after each outcome record.
- Seed fixture implementation queued PR follow-up review outcome record audit outcome routing for sending passed audits, record refreshes, blocker escalations, parked follow-ups, and blocked close/resume requests to one visible route.
- Seed fixture implementation queued PR follow-up review outcome record audit outcome record templates for documenting required inputs, record body, and follow-up after each audit outcome.
- Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout checklist for checking record completion, allowed continuation, enforceable blocks, parked ownership, and default-path verification before audit outcome work continues.
- Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record templates for documenting required inputs, record body, and follow-up after each closeout decision.
- Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh rules for refreshing stale closeout source evidence, routes, owners, blockers, parked status, and default-path verification.
- Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review cadence for reviewing refreshed closeout records before continuation, closure, resume, parking, blocking, or escalation.
- Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome routing for routing refreshed closeout reviews to accepted, refresh-again, blocked, parked, or closed outcomes.
- Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record templates for documenting accepted, refresh-again, blocked, parked, and closed refreshed closeout outcomes.
- Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit checklist for checking template match, input completeness, traceability, ownership, and default-path boundary before refreshed closeout outcomes support closure or continuation.
- Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing for routing passed refreshed outcome audits, record refreshes, blocker escalations, parked closeouts, and blocked close/continuation requests.
- Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record templates for documenting passed refreshed audit, record refresh, blocker escalation, parked closeout, and blocked close/continuation outcomes.
- Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist for checking refreshed audit outcome record completion, allowed closeout or continuation, enforceable blockers, parked ownership, and default-path verification before closure or continuation.
- Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record templates for documenting required inputs, record body, and follow-up after each refreshed audit outcome closeout decision.
- Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rules for refreshing stale refreshed audit outcome source evidence, allowed closeout routes, owners, blockers, parked status, and default-path verification.
- Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review cadence for reviewing refreshed audit outcome closeout record refreshes before closure, continuation, review resume, parking, blocking, supersede, or escalation.
- Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome routing for routing refreshed audit outcome closeout refresh reviews to accepted, refresh-again, blocked, parked, or closed outcomes.
- Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record templates for documenting required inputs, record body, and follow-up after each refreshed audit outcome closeout refresh review outcome.
- Seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit checklist for checking template match, input completeness, traceability, ownership, and default-path boundary before refreshed audit outcome closeout refresh review outcomes support closure or continuation.
- Accuracy work intake closure criteria for fixture-backed fixes, missing fixture evidence, roadmap parking, out-of-scope closure, and PR review readiness.
- Shared release gate contract and self-check for `verify:release`, release evidence snapshots, quality gate docs, and PR template validation.
- CI workflow contract validation for triggers, read-only permissions, Node matrix, setup, and release gate command order.
- Release safety fixture checks for forbidden package URL metadata, publish workflow triggers, write permissions, npm tokens, and provenance settings.
- Release safety fixture matrix documentation in `docs/RELEASE_SAFETY_FIXTURES.md`, guarded by `pnpm docs:check-release-safety-fixtures`.
- PR template gate parity that separates local/CI checks from release-readiness and external publish-time checks.
- CLI exit code classification for invalid usage, config, target path, and output path errors while preserving CI threshold and unexpected runtime exit codes.
- Built CLI smoke coverage for help output, `check --help`, and default command behavior.
- Secret redaction regression coverage across scanner hits, JSON reports, Markdown reports, and terminal output.
- Contributor documentation, architecture notes, check ID catalog validation, report schema docs, and fixture-based test coverage.

### Notes

- JSON report schema is versioned as `1`.
- `bootlane check` does not execute project scripts or mutate target repositories.
- Bootlane is not a vulnerability scanner and does not replace dedicated security tools.
- Fix proposals remain dry-run metadata; future write behavior should require an explicit fix command or write flag.
- Node GitHub Actions workflow previews require deterministic package-manager, test script, and Node version metadata.
- Python GitHub Actions workflow previews require deterministic install/test commands and use `3.x` only when Python version metadata is absent.
