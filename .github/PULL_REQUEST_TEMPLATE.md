## Summary

- 

## Change Type

- [ ] Check behavior
- [ ] CLI behavior
- [ ] Report output or schema
- [ ] Docs
- [ ] Release or launch workflow
- [ ] Refactor or maintenance

## Verification

### Local/CI Gate

- [ ] `pnpm build`
- [ ] `pnpm example:report:check`
- [ ] `pnpm test`
- [ ] `pnpm docs:check-contributing`
- [ ] `pnpm docs:check-templates`
- [ ] `pnpm docs:check-triage`
- [ ] `pnpm docs:check-quality-gates`
- [ ] `pnpm ci:workflow:check`
- [ ] `pnpm docs:check-security`
- [ ] `pnpm docs:check-package-contents`
- [ ] `pnpm docs:check-release-evidence`
- [ ] `pnpm release:evidence:check`
- [ ] `pnpm release:gates:check`
- [ ] `pnpm docs:check-changelog`
- [ ] `pnpm docs:check-ids`
- [ ] `pnpm docs:check-release-blockers`
- [ ] `pnpm metadata:check`
- [ ] `pnpm release-safety:check`
- [ ] `pnpm release-safety:fixtures`
- [ ] `pnpm docs:check-release-safety-fixtures`
- [ ] `pnpm smoke:bin`
- [ ] `pnpm pack:dry-run`

### Release Readiness

- [ ] `pnpm verify:release` for release-readiness changes.
- [ ] `pnpm npm-names:check` near publish time only.
- [ ] `pnpm smoke:packed-install` before publishing or when packed install behavior changes.
- [ ] I recorded or updated release evidence in `docs/RELEASE_EVIDENCE.md` when this PR affects first-publish readiness.
- [ ] I did not add `repository`, `homepage`, or `bugs` package metadata before the final Bootlane repository URL is confirmed.
- [ ] I did not add npm publish automation, npm tokens, write permissions, or provenance settings before release automation is intentionally designed.

## Fixtures and Contracts

- [ ] I added or updated fixtures for behavior changes.
- [ ] For accuracy work, I recorded the Accuracy lane, Accuracy priority, Fixture target, Expected output, and Happy-path impact from the 0.2.0 Accuracy Work Intake.
- [ ] For accuracy work, I matched the PR to the Fixture Case Matrix and documented minimal files, expected report diff, and happy-path fixture protection.
- [ ] For first-batch 0.2.0 accuracy work, I named the Fixture Seed Backlog seed and recorded trigger, expected first test, happy-path guard, and next action, or explained why a new seed is needed.
- [ ] For seed-routed accuracy work, I used the Seed Evidence Comment Templates when the PR depends on missing evidence, a canonical fixture target, duplicate consolidation, a new seed decision, or a 0.2.0 milestone readiness decision.
- [ ] For seed-routed accuracy work, I confirmed the Seed Fixture Readiness Handoff records the owner, target artifact, expected first test, happy-path guard, verification commands, and implementation boundary before detector, reporter, or scoring changes start.
- [ ] For seed-routed accuracy work, I chose the matching Seed Verification Command Sets entry and recorded the commands, required record, and escalation condition.
- [ ] For seed-routed accuracy work, I filled the Seed Evidence Record Fields: record location, canonical links, seed route summary, fixture readiness summary, verification evidence summary, and next owner and follow-up.
- [ ] For seed-routed accuracy work, I applied the Seed Evidence Refresh Rules if route, target artifact, verification scope, canonical issue, milestone, or owner changed after the first evidence record.
- [ ] For seed-routed accuracy work, I passed the Seed Evidence Audit Checklist before closure, promotion, handoff, implementation, or review request.
- [ ] For seed-routed accuracy work, I recorded the Seed Audit Outcome Routing outcome before closure, promotion, handoff, implementation, milestone selection, or review request.
- [ ] For seed-routed accuracy work, I used the matching Seed Audit Outcome Record Templates entry so required inputs, record body, and follow-up are recorded before review.
- [ ] For seed-routed accuracy work, I filled the Seed Fixture Implementation Batch Fields before fixture, detector, reporter, scoring, schema, or example output changes started.
- [ ] For seed-routed accuracy work, I followed the Seed Fixture Implementation Batch Execution Checklist from locked scope through first failing fixture, minimal implementation, happy-path guards, public report surface updates, and matching verification.
- [ ] For seed-routed accuracy work, I chose a Seed Fixture Implementation Starter Batches entry or documented why a smaller or different audited batch is required.
- [ ] For seed-routed accuracy work, I named the Seed Fixture Implementation PR Queue order or documented the audited skip, split, or reorder rationale.
- [ ] For seed-routed accuracy work, I passed the matching Seed Fixture Implementation Queued PR Readiness Checklist entries before implementation started.
- [ ] For seed-routed accuracy work, I used the matching Seed Fixture Implementation Queued PR Review Handoff before requesting review and recorded required inputs, review focus, merge evidence, and fallback.
- [ ] For seed-routed accuracy work, I recorded the matching Seed Fixture Implementation Queued PR Review Outcome Routing outcome before merge, revision, readiness return, split/defer, or public-surface refresh.
- [ ] For seed-routed accuracy work, I used the matching Seed Fixture Implementation Queued PR Review Outcome Record Templates entry so required inputs, record body, and follow-up are recorded before merge or closure.
- [ ] For seed-routed accuracy work, I passed the Seed Fixture Implementation Queued PR Closeout Checklist before merge, closure, split, defer, or readiness return and recorded final verification, public-surface, follow-up, and read-only evidence.
- [ ] For seed-routed accuracy work, I used the matching Seed Fixture Implementation Queued PR Closeout Record Templates entry so final evidence, verification, public-surface sync, ownership, and read-only boundary decisions are recorded.
- [ ] For seed-routed accuracy work, I routed closeout-created follow-ups through the Seed Fixture Implementation Queued PR Follow-Up Queue so deferred scope, readiness refresh, public-surface work, split PRs, or read-only escalations have an owner, route, verification path, and stop condition.
- [ ] For seed-routed accuracy work, I used the matching Seed Fixture Implementation Queued PR Follow-Up Record Templates entry so required inputs, record body, next action, and verification context are recorded before work continues.
- [ ] For seed-routed accuracy work, I applied the matching Seed Fixture Implementation Queued PR Follow-Up Review Cadence entry so stale follow-ups are reviewed, refreshed, escalated, deferred, or closed before planning or implementation continues.
- [ ] For seed-routed accuracy work, I recorded the matching Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing outcome before refreshing evidence, resuming review, escalating blockers, deferring/parking, or closing a follow-up.
- [ ] For seed-routed accuracy work, I used the matching Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates entry so required inputs, record body, and next action are recorded before work resumes, blocks, parks, or closes.
- [ ] For seed-routed accuracy work, I passed the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Checklist before work resumed, blocked, parked, or closed.
- [ ] For seed-routed accuracy work, I recorded the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Routing result so passed audits, record refreshes, blocker escalations, parked follow-ups, and blocked close/resume decisions have one route.
- [ ] For seed-routed accuracy work, I used the matching Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates entry so audit outcome required inputs, record body, and follow-up are explicit before work continues.
- [ ] For seed-routed accuracy work, I passed the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Checklist before continuing, pausing, escalating, parking, closing, or resuming audit outcome work.
- [ ] For seed-routed accuracy work, I used the matching Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Templates entry so closeout required inputs, record body, and follow-up are explicit.
- [ ] For seed-routed accuracy work, I applied Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules before stale closeout source evidence, route, owner, blocker, parked status, or default-path verification supported closure or continuation.
- [ ] For seed-routed accuracy work, I used Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence so refreshed closeout records were reviewed, routed, and recorded before closure or continuation.
- [ ] For seed-routed accuracy work, I recorded the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing outcome before refreshed closeouts were accepted, refreshed again, blocked, parked, closed, or superseded.
- [ ] For seed-routed accuracy work, I used the matching Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates entry so refresh review outcome required inputs, record body, and follow-up are explicit.
- [ ] For seed-routed accuracy work, I passed the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist before refreshed closeout outcomes supported continuation, closure, resume, parking, blocking, or escalation.
- [ ] For seed-routed accuracy work, I recorded the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing outcome so passed refreshed outcome audits, record refreshes, blocker escalations, parked closeouts, and blocked close/continuation requests have one route.
- [ ] For seed-routed accuracy work, I used the matching Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates entry so refreshed audit outcome required inputs, record body, and follow-up are explicit before closure or continuation.
- [ ] For seed-routed accuracy work, I passed the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist so refreshed audit outcome records are complete, allowed closeout or continuation is explicit, blocker escalation is enforceable, parked state is owned, and default-path verification is recorded before closure or continuation.
- [ ] For seed-routed accuracy work, I used the matching Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates entry so refreshed audit outcome closeout required inputs, record body, and follow-up are explicit before closure or continuation.
- [ ] For seed-routed accuracy work, I applied Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules before stale refreshed audit outcome source evidence, allowed route, owner, blocker, parked status, or default-path verification supported closure or continuation.
- [ ] For seed-routed accuracy work, I used Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence so refreshed audit outcome closeout records were reviewed, routed, and recorded before closure or continuation.
- [ ] For seed-routed accuracy work, I recorded the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing outcome before accepted, refresh-again, blocked, parked, closed, or superseded refreshed audit outcome closeout refreshes supported closure or continuation.
- [ ] For seed-routed accuracy work, I used the matching Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates entry so refreshed audit outcome closeout refresh required inputs, record body, and follow-up are explicit before closure or continuation.
- [ ] For seed-routed accuracy work, I passed the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist so refreshed audit outcome closeout refresh review outcome records have template match, complete inputs, traceable body, explicit owner and follow-up, and default-path boundary evidence.
- [ ] For seed-routed accuracy work, I recorded the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing outcome before accepted audits, refreshed records, blocker escalations, parked or deferred outcomes, or closed or superseded refreshed audit outcome closeout refresh review outcomes proceeded.
- [ ] For seed-routed accuracy work, I used the matching Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates entry so refreshed audit outcome closeout refresh review outcome audit outcomes have required inputs, record body, and follow-up.
- [ ] For seed-routed accuracy work, I passed the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist so audit outcome records have complete fields, explicit closure or continuation state, enforceable blocker/deferral/closure status, owned follow-up, stop conditions, and default-path evidence.
- [ ] For seed-routed accuracy work, I used the matching Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates entry so audit outcome closeout decisions have required inputs, record body, and follow-up.
- [ ] For seed-routed accuracy work, I applied Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules before stale audit outcome closeout source evidence, closure or continuation route, blocker or deferral evidence, owner, stop condition, or default-path verification supported closure or continuation.
- [ ] For seed-routed accuracy work, I used Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence so refreshed audit outcome closeout records were reviewed before closure, continuation, review resume, parking, deferral, supersede, or escalation.
- [ ] For seed-routed accuracy work, I recorded the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing outcome before refreshed audit outcome closeout records were accepted, refreshed again, blocked or deferred, parked, closed, or superseded.
- [ ] For accuracy work, I checked the Accuracy Work Intake Closure Criteria before review and made fixture evidence, schema/check ID impact, and happy-path impact explicit.
- [ ] I updated `docs/CHECK_IDS.md` for any check, finding, secret pattern, or fix proposal ID changes.
- [ ] I updated `docs/REPORT_SCHEMA.md` for report shape changes.
- [ ] I updated `docs/PACKAGE_CONTENTS.md` for package manifest, README, or packed-file contract changes.
- [ ] I updated `docs/RELEASE_SAFETY_FIXTURES.md` for release-safety fixture case changes.
- [ ] I regenerated `docs/RELEASE_EVIDENCE_SNAPSHOT.md` with `pnpm release:evidence` if release evidence commands, package metadata, gate structure, snapshot focus policy, snapshot refresh rules, or release closeout checklist changed.
- [ ] I updated `CHANGELOG.md` for user-facing behavior, release gate, package artifact, or public launch material changes.
- [ ] I regenerated `examples/reports/node-missing-env.md` with `pnpm example:report` if Markdown report output changed.
- [ ] `bootlane check` remains read-only and does not execute project scripts.

## Notes for Reviewers

- 
