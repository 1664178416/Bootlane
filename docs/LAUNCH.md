# Bootlane Launch Checklist

Last updated: 2026-06-10

This checklist covers the first public launch after the release blockers in [Release Blockers](RELEASE_BLOCKERS.md) are resolved and the publish runbook in [Release Notes](RELEASE.md) has passed.

## Launch Goal

Make Bootlane easy to understand, try, and trust:

> From clone to run.

Primary message:

> Bootlane checks whether a repo is ready to run by inspecting setup docs, dependencies, env vars, tests, secrets, and CI readiness.

Positioning guardrails:

- Say "setup readiness" rather than "security scanner" or "build system".
- Say "read-only checks" and "dry-run fix previews" clearly.
- Mention Node and conservative Python support for `0.1.0`.
- Avoid promising AI repair, dashboards, package vulnerability scanning, or automatic file writes.

## Launch Assets

Review these before posting:

- Root `README.md` for quick start, current status, usage, config, fix previews, and docs links.
- `examples/reports/node-missing-env.md` as the example Markdown report.
- `docs/GITHUB_ACTIONS.md` for downstream CI usage.
- `packages/cli/README.md` for the npm `bootlane` package page.
- `packages/core/README.md` for the npm `@bootlane/core` package page.
- `SECURITY.md` for private reporting and secret redaction policy.
- `CHANGELOG.md` for the `0.1.0` release notes.
- `docs/RELEASE.md` for the final publish and post-publish checks.

## Pre-Launch Checks

Run:

```bash
pnpm verify:release
pnpm npm-names:check
pnpm smoke:packed-install
```

Confirm manually:

- `git remote -v` points to the final Bootlane repository.
- `repository`, `homepage`, and `bugs` package manifest fields point to the final Bootlane repository.
- The `v0.1.0` tag and GitHub release target are correct.
- npm package pages render the package READMEs as expected.
- `npx bootlane@latest --version` works after publish.
- `npx bootlane@latest check --help` works after publish.
- `npx bootlane@latest check --format json` works in a small repository after publish.

## Announcement Readiness Gate

Use this gate after completing the [Release Closeout Checklist](RELEASE_EVIDENCE.md#release-closeout-checklist) and before broad public sharing.

| Item | Required before announcement | Record |
| --- | --- | --- |
| Release closeout complete | Release Closeout Checklist is complete, final status is recorded, and no unresolved blocker is hidden from the launch record. | Link the release readiness issue, release PR, or GitHub release draft closeout section. |
| Published install path verified | `npx bootlane@latest --version`, `npx bootlane@latest check --help`, and one JSON check work after npm `latest` resolves to `0.1.0`. | Record the post-publish command summaries and evidence links. |
| Package and release pages ready | npm package pages render the expected package README content and the `v0.1.0` GitHub tag or release points to the final repository. | Link package pages and the GitHub tag or release. |
| Public message reviewed | Suggested announcement copy preserves read-only positioning, setup-readiness framing, supported ecosystems, and current limitations. | Record the reviewed announcement copy or launch draft location. |
| Feedback intake ready | Issue forms, triage guide, launch feedback topics, and maintainer ownership are ready before broad sharing. | Link the launch checklist, triage guide, and feedback owner. |

## Suggested Announcement

Short:

```text
Bootlane 0.1.0 is out: a read-only CLI that checks whether a repo is ready to run after clone.

It looks at setup docs, dependency metadata, env vars, tests, secrets, and GitHub Actions, then outputs terminal, Markdown, or JSON reports.

npx bootlane
```

Long:

```text
Bootlane is a small open-source CLI for answering: can this repository go from clone to first run?

The 0.1.0 release checks Node projects and includes conservative Python setup-readiness checks. It looks for setup docs, package-manager metadata, runtime version hints, env var examples, tests, high-signal secret mistakes, and GitHub Actions coverage.

It is local-first and read-only by default. Reports can be shown in the terminal, saved as Markdown for issues/PRs, or emitted as JSON for automation. When Bootlane can infer safe next steps, it includes dry-run fix previews rather than writing files.

Try it:

npx bootlane
```

## Where to Share

Prioritize places where the "clone to run" pain is obvious:

- GitHub repository README, topics, and release page.
- V2EX and Juejin.
- Reddit communities for open source, JavaScript, Python, and developer tools.
- Hacker News if the README and example report are polished.
- Student developer, bootcamp, and teaching assistant communities.
- Open-source maintainer communities that discuss onboarding and contributor experience.

## First Feedback to Collect

Ask users to choose the matching GitHub issue form: false positive, missing detection, docs confusion, or feature request.

Track feedback around:

- False positives in README, env var, CI, and secret checks.
- Missing package-manager or framework detection.
- Confusing finding messages or suggestions.
- Whether the health score feels helpful or distracting.
- Whether Markdown reports are useful in issues and pull requests.
- Whether users expect `bootlane fix` and what safeguards they expect.
- Repositories where Bootlane reports `unknown` but should detect Node or Python.

## Post-Launch Triage

Use [Triage Guide](TRIAGE.md) for the detailed maintainer workflow.
Use the [Post-Launch Feedback Closure Matrix](TRIAGE.md#post-launch-feedback-closure-matrix) to decide whether each report needs a fixture-backed fix, docs update, roadmap candidate, release evidence update, or launch follow-up.
Use the [Roadmap Candidate Review](TRIAGE.md#roadmap-candidate-review) before parking broad feature requests or ecosystem ideas.
Use [Roadmap](ROADMAP.md) to track candidate target, evidence status, review trigger, review cadence, status transitions, and next action after a request is parked.
Use the [0.2.0 Accuracy Work Intake](ROADMAP.md#020-accuracy-work-intake) before turning post-launch false positives, missing detections, env precision reports, package-manager command recognition issues, or report clarity issues into implementation work.
Use the [Fixture Seed Backlog](ROADMAP.md#fixture-seed-backlog) to batch first 0.2.0 accuracy candidates into known fixture starting points before opening implementation PRs.
Use [Seed Triage Routing](ROADMAP.md#seed-triage-routing) before assigning first-batch accuracy labels, roadmap status, or maintainer next action.
Use [Seed Batch Review Cadence](ROADMAP.md#seed-batch-review-cadence) when several seed-routed reports arrive together or point to the same expected first test.
Use [Seed Evidence Comment Templates](ROADMAP.md#seed-evidence-comment-templates) when maintainers need consistent comments for missing seed evidence, canonical fixture targets, duplicate consolidation, new seed decisions, or 0.2.0 milestone readiness decisions.
Use [Seed Fixture Readiness Handoff](ROADMAP.md#seed-fixture-readiness-handoff) before opening fixture-first PRs from seed-routed reports, so owner, target artifact, expected first test, happy-path guard, verification commands, and implementation boundary are recorded.
Use [Seed Verification Command Sets](ROADMAP.md#seed-verification-command-sets) when recording seed-routed comments, handoffs, PRs, or milestone decisions, so docs-only triage, fixture-ready implementation, duplicate consolidation, new seed, and milestone batch work use the right verification scope.
Use [Seed Evidence Record Fields](ROADMAP.md#seed-evidence-record-fields) so seed-routed launch feedback keeps one record location, canonical links, route summary, fixture readiness summary, verification evidence, owner, and follow-up.
Use [Seed Evidence Refresh Rules](ROADMAP.md#seed-evidence-refresh-rules) when seed route, fixture target, verification scope, canonical issue, milestone, or owner changes after the original record.
Use [Seed Evidence Audit Checklist](ROADMAP.md#seed-evidence-audit-checklist) before closing, parking, promoting, handing off, or implementing seed-routed launch feedback.
Use [Seed Audit Outcome Routing](ROADMAP.md#seed-audit-outcome-routing) after the audit so passed or failed seed-routed launch feedback lands in fixture implementation, more evidence, duplicate consolidation, roadmap parking, out-of-scope closure, or milestone batch selection.
Use [Seed Audit Outcome Record Templates](ROADMAP.md#seed-audit-outcome-record-templates) so each selected audit outcome leaves required inputs, record body, and follow-up in the issue comment, PR section, milestone note, or roadmap note.
Use [Seed Fixture Implementation Batch Fields](ROADMAP.md#seed-fixture-implementation-batch-fields) before turning audited seed-routed launch feedback into a fixture-first implementation batch or PR.
Use [Seed Fixture Implementation Batch Execution Checklist](ROADMAP.md#seed-fixture-implementation-batch-execution-checklist) when audited seed-routed launch feedback enters implementation, so scope locks before code, the first fixture fails first, guards run, and verification matches final scope.
Use [Seed Fixture Implementation Starter Batches](ROADMAP.md#seed-fixture-implementation-starter-batches) to pick the first fixture-first implementation PRs from audited seed-routed launch feedback, or record why a smaller audited batch is safer.
Use [Seed Fixture Implementation PR Queue](ROADMAP.md#seed-fixture-implementation-pr-queue) to order the first fixture-first PRs from audited seed-routed launch feedback, or record why a PR is skipped, split, or reordered.
Use [Seed Fixture Implementation Queued PR Readiness Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-readiness-checklist) before opening queued fixture-first PRs, so missing evidence, guard gaps, and public-surface uncertainty block implementation early.
Use [Seed Fixture Implementation Queued PR Review Handoff](ROADMAP.md#seed-fixture-implementation-queued-pr-review-handoff) before requesting review for queued fixture-first PRs, so reviewers see required inputs, review focus, merge evidence, and fallback conditions.
Use [Seed Fixture Implementation Queued PR Review Outcome Routing](ROADMAP.md#seed-fixture-implementation-queued-pr-review-outcome-routing) after queued PR review, so approval, requested changes, readiness return, split/defer, and public-surface refresh decisions are recorded before merge or closure.
Use [Seed Fixture Implementation Queued PR Review Outcome Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-review-outcome-record-templates) after queued PR review outcome routing, so review comments, PR sections, issue notes, or milestone notes record required inputs, body, and follow-up.
Use [Seed Fixture Implementation Queued PR Closeout Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-closeout-checklist) before merge, closure, split, defer, or readiness return so queued fixture-first PRs leave final verification, public-surface, follow-up, and read-only evidence.
Use [Seed Fixture Implementation Queued PR Closeout Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-closeout-record-templates) after closeout so PR notes, issue links, and milestone follow-ups record final evidence, verification, public-surface sync, ownership, and read-only boundary decisions consistently.
Use [Seed Fixture Implementation Queued PR Follow-Up Queue](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-queue) after closeout creates deferred scope, readiness refresh, public-surface, split PR, or read-only escalation follow-ups so each has an owner, route, verification path, and stop condition.
Use [Seed Fixture Implementation Queued PR Follow-Up Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-record-templates) after follow-up routing so PR notes, issue comments, milestone notes, and roadmap updates record required inputs, body, next action, and verification context consistently.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Cadence](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-cadence) after follow-up records exist so stale follow-ups are reviewed, refreshed, escalated, deferred, or closed before launch follow-up work continues.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-routing) after follow-up review so refresh, resume-review, release-blocking escalation, defer/park, or close/supersede decisions leave one route.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-templates) after follow-up review outcome routing so refresh, resume-review, release-blocking escalation, defer/park, or close/supersede launch follow-ups record required inputs, body, and next action.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-checklist) after follow-up review outcome records exist so launch follow-up records pass template match, input completeness, traceability, ownership, and default-path boundary review.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Routing](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-routing) after audit review so launch follow-up audits route passed records, refreshes, blocker escalations, parked follow-ups, and blocked close/resume decisions consistently.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-templates) after audit outcome routing so launch follow-up audit outcomes record required inputs, body, and follow-up before work continues.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-checklist) after audit outcome records exist so launch follow-up continuation, pause, escalation, parking, close/resume, and default-path verification are checked.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-templates) after closeout so launch follow-up closeout records capture required inputs, body, and follow-up.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-rules) whenever launch follow-up closeout source evidence, route, owner, blocker, parked status, or default-path verification changes after the closeout record was written.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-cadence) after refresh rules apply so launch follow-up refreshed closeout records are reviewed, routed, and recorded before continuation or closure.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-routing) after refresh review so launch follow-up refreshed closeouts land in one accepted, refresh-again, blocked, parked, or closed route.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-templates) after refresh review outcome routing so launch follow-up accepted, refresh-again, blocked, parked, and closed outcomes record required inputs, body, and follow-up.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-checklist) after refresh review outcome records exist so launch follow-up refreshed closeout outcomes pass template match, input completeness, traceability, ownership, and default-path boundary review.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-routing) after refreshed closeout outcome record audit so launch follow-up audits route passed records, refreshes, blocker escalations, parked closeouts, and blocked close/continuation requests consistently.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-templates) after audit outcome routing so launch follow-up refreshed audit outcomes record required inputs, body, and follow-up before continuation or closure.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-checklist) after refreshed audit outcome records exist so launch follow-up closeout or continuation checks record completion, allowed route, enforceable blockers, parked ownership, and default-path verification.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-templates) after closeout so launch follow-up refreshed audit outcome closeout decisions capture required inputs, body, and follow-up before continuation or closure.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-rules) whenever launch follow-up refreshed audit outcome closeout source evidence, allowed route, owner, blocker, parked status, or default-path verification changes after the closeout record was written.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-cadence) after launch follow-up refreshed audit outcome closeout refresh rules apply so refreshed closeout records are reviewed, routed, and recorded before continuation or closure.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-routing) after launch follow-up refreshed audit outcome closeout refresh review cadence so accepted, refresh-again, blocked, parked, closed, or superseded refreshed closeouts leave one route before continuation or closure.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-templates) after launch follow-up refreshed audit outcome closeout refresh review outcome routing so accepted, refresh-again, blocked, parked, and closed outcomes capture required inputs, body, and follow-up before continuation or closure.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-checklist) after launch follow-up refreshed audit outcome closeout refresh review outcome records exist so template match, input completeness, traceability, ownership, and default-path boundary are checked before continuation or closure.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-routing) after launch follow-up refreshed audit outcome closeout refresh review outcome record audits so accepted audits, refreshed records, blocker escalations, parked or deferred outcomes, and closed or superseded refreshed audit outcome closeout refresh review outcomes route consistently.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-templates) after audit outcome routing so launch follow-up accepted, refresh-needed, blocked, parked or deferred, and closed or superseded audit outcomes capture required inputs, body, and follow-up before continuation or closure.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-checklist) after launch follow-up audit outcome records exist so completion, closure or continuation state, blocker/deferral/closure enforcement, ownership, stop conditions, and default-path evidence are checked before continuation or closure.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-templates) after launch follow-up audit outcome closeout so completion, closure or continuation, blocker/deferral/closure state, ownership, stop conditions, and default-path evidence capture required inputs, body, and follow-up before continuation or closure.
Use [Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules](ROADMAP.md#seed-fixture-implementation-queued-pr-follow-up-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-review-outcome-record-audit-outcome-record-closeout-record-refresh-rules) whenever launch follow-up audit outcome closeout source evidence, closure or continuation route, blocker or deferral evidence, owner, stop condition, or default-path verification changes after the closeout record was written.

For the first batch of issues:

- Label false positives separately from missing checks.
- Prefer fixtures for every confirmed false positive.
- Keep `bootlane check` read-only while triaging.
- Do not add new ecosystem support until Node/Python regressions are understood.
- Avoid changing check IDs unless the JSON schema contract is intentionally versioned.

## Follow-Up Candidates

Likely next iterations after launch:

- Expand fixture coverage from real public repositories.
- Improve env var scanning precision.
- Add clearer docs for interpreting scores and confidence levels.
- Add a GitHub Action wrapper only if plain `npx bootlane@latest` is not enough.
- Design a safe write flow around existing dry-run fix proposals.
