# Contributing to Bootlane

Thanks for helping make repositories easier to run.

Bootlane is still pre-1.0. The most useful contributions are focused checks, small fixtures, docs, report stability improvements, and false-positive reductions.

## Development Setup

```bash
pnpm install
pnpm build
pnpm example:report:check
pnpm test
```

Run a local fixture through the built CLI:

```bash
node packages/cli/dist/index.js check examples/fixtures/node-good
node packages/cli/dist/index.js check examples/fixtures/node-missing-env --verbose --no-color
node packages/cli/dist/index.js check examples/fixtures/python-good --format json
```

## Before Opening a PR

Use the checklist in [.github/PULL_REQUEST_TEMPLATE.md](.github/PULL_REQUEST_TEMPLATE.md) when preparing the PR description.
The template's Local/CI Gate section mirrors the regular PR gate below. Its Release Readiness section separates `pnpm verify:release`, `pnpm npm-names:check`, and `pnpm smoke:packed-install` so external or publish-time checks stay visible without becoming normal CI requirements. For release-readiness PRs, follow the Maintainer Execution Path and Evidence Section Guide, fill the Evidence Record Header and Manual Decision Log, check the Evidence Staleness Rules, confirm the External State Confirmations, follow the Publish Window Checklist and Evidence Entry Format, review the Evidence Redaction Examples, use the Dry-Run Transcript Template for package dry-runs and packed install smoke, use the Post-Publish Verification Transcript after publish, complete the Release Closeout Checklist, review the Snapshot Focus Policy, Snapshot Reference Guide, and Snapshot Refresh Rules, and update the relevant tables in [Release Evidence](docs/RELEASE_EVIDENCE.md).

For normal code and docs changes, run:

```bash
pnpm build
pnpm example:report:check
pnpm test
pnpm docs:check-contributing
pnpm docs:check-templates
pnpm docs:check-triage
pnpm docs:check-quality-gates
pnpm ci:workflow:check
pnpm docs:check-security
pnpm docs:check-package-contents
pnpm docs:check-release-evidence
pnpm release:evidence:check
pnpm release:gates:check
pnpm docs:check-changelog
pnpm docs:check-ids
pnpm docs:check-release-blockers
pnpm metadata:check
pnpm release-safety:check
pnpm release-safety:fixtures
pnpm docs:check-release-safety-fixtures
pnpm smoke:bin
pnpm pack:dry-run
```

For release-readiness changes, also run:

```bash
pnpm verify:release
```

Near publish time only, maintainers also run:

```bash
pnpm npm-names:check
pnpm smoke:packed-install
```

These two checks depend on external npm registry state or local packed install behavior, so they are not part of regular CI.

## Contribution Guidelines

- Keep checks read-only. `bootlane check` must not execute project scripts or write files.
- Add or update fixtures under `examples/fixtures` for behavior changes.
- Keep finding IDs stable once documented.
- Add new finding IDs to [docs/CHECK_IDS.md](docs/CHECK_IDS.md).
- Run `pnpm docs:check-ids` after adding, removing, or renaming check, finding, secret pattern, or fix proposal IDs.
- Preserve JSON report shape unless [docs/REPORT_SCHEMA.md](docs/REPORT_SCHEMA.md) is intentionally updated.
- Regenerate the example Markdown report with `pnpm example:report` when report output intentionally changes.
- Prefer small checks with clear suggestions over broad checks with vague output.
- Prefer high-confidence findings; noisy heuristics should start as narrow fixture-backed checks.

## Adding or Changing Checks

Start with [Adding Checks](docs/ADDING_CHECKS.md).

Typical flow:

1. Choose whether the behavior applies to Node, Python, or all projects.
2. Add or update the check in `packages/core/src/checks`.
3. Reuse shared helpers from `packages/core/src/signals` when multiple checks need the same rule.
4. Add focused fixtures under `examples/fixtures`.
5. Add tests in `packages/core/test` or `packages/cli/test`.
6. Update [Check IDs](docs/CHECK_IDS.md), [Report Schema](docs/REPORT_SCHEMA.md), or feature docs when user-visible behavior changes.
7. Run the PR checks listed above.

## Docs and Launch Materials

Docs are part of the release surface.

- Update README or package READMEs when command behavior changes.
- Update [Configuration](docs/CONFIGURATION.md) when config behavior changes.
- Update [Fix Preview](docs/FIX_PREVIEW.md) when proposal behavior changes.
- Update [GitHub Actions](docs/GITHUB_ACTIONS.md) when CI detection or workflow previews change.
- Update [Package Contents](docs/PACKAGE_CONTENTS.md) when package manifests, packed files, or package README contracts change.
- Update [Release Evidence](docs/RELEASE_EVIDENCE.md) when first-publish evidence, dry-run, or post-publish verification requirements change.
- Regenerate [Release Evidence Snapshot](docs/RELEASE_EVIDENCE_SNAPSHOT.md) with `pnpm release:evidence` when release evidence commands, package metadata, gate structure, or Snapshot Refresh Rules change, and keep its Snapshot Focus Policy and Snapshot Reference Guide compact.
- Update [CHANGELOG.md](CHANGELOG.md) when user-facing behavior, release gates, package artifacts, or public launch materials change.
- Update [Launch Checklist](docs/LAUNCH.md) only for launch messaging, announcement readiness, sharing, or feedback-process changes.
- Use [Triage Guide](docs/TRIAGE.md), its Post-Launch Feedback Closure Matrix, its Roadmap Candidate Review, and [Roadmap](docs/ROADMAP.md) review cadence, status transitions, 0.2.0 Accuracy Work Intake, Fixture Intake Fields, Fixture Case Matrix, Fixture Seed Backlog, Seed Issue Routing Fields, Seed Triage Routing, Seed Batch Review Cadence, Seed Evidence Comment Templates, Seed Fixture Readiness Handoff, Seed Verification Command Sets, Seed Evidence Record Fields, Seed Evidence Refresh Rules, Seed Evidence Audit Checklist, Seed Audit Outcome Routing, Seed Audit Outcome Record Templates, Seed Fixture Implementation Batch Fields, Seed Fixture Implementation Batch Execution Checklist, Seed Fixture Implementation Starter Batches, Seed Fixture Implementation PR Queue, Seed Fixture Implementation Queued PR Readiness Checklist, Seed Fixture Implementation Queued PR Review Handoff, Seed Fixture Implementation Queued PR Review Outcome Routing, Seed Fixture Implementation Queued PR Review Outcome Record Templates, Seed Fixture Implementation Queued PR Closeout Checklist, Seed Fixture Implementation Queued PR Closeout Record Templates, Seed Fixture Implementation Queued PR Follow-Up Queue, Seed Fixture Implementation Queued PR Follow-Up Record Templates, Seed Fixture Implementation Queued PR Follow-Up Review Cadence, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Checklist, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Routing, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Checklist, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Templates, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist, and Accuracy Work Intake Closure Criteria when turning issues into fixtures, docs fixes, release evidence updates, launch follow-ups, or roadmap candidates.
- Keep [Release Blockers](docs/RELEASE_BLOCKERS.md) honest about external state; do not guess the final Bootlane repository URL.
- Run `pnpm release-safety:check` after changing package manifests, GitHub Actions workflows, or release automation notes.
- Run `pnpm release-safety:fixtures` after changing release-safety rules or first-publish automation boundaries.
- Update [Release Safety Fixtures](docs/RELEASE_SAFETY_FIXTURES.md) and run `pnpm docs:check-release-safety-fixtures` when fixture case coverage changes.

## Project Boundaries

Bootlane currently focuses on local, deterministic readiness checks. Avoid adding:

- Cloud accounts or dashboards.
- Network-dependent checks in the default `check` path.
- LLM-dependent checks.
- Automatic file writes during `check`.
- Arbitrary install, build, or test command execution inside target repositories.

Those may become optional integrations later, but they should not enter the core MVP path.

## Useful Docs

- [Architecture](docs/ARCHITECTURE.md)
- [Adding Checks](docs/ADDING_CHECKS.md)
- [Check IDs](docs/CHECK_IDS.md)
- [Configuration](docs/CONFIGURATION.md)
- [Fix Preview](docs/FIX_PREVIEW.md)
- [Report Schema](docs/REPORT_SCHEMA.md)
- [Security Policy](SECURITY.md)
- [Quality Gates](docs/QUALITY_GATES.md)
- [Package Contents](docs/PACKAGE_CONTENTS.md)
- [Release Evidence](docs/RELEASE_EVIDENCE.md)
- [Release Evidence Snapshot](docs/RELEASE_EVIDENCE_SNAPSHOT.md)
- [Release Safety Fixtures](docs/RELEASE_SAFETY_FIXTURES.md)
- [Roadmap](docs/ROADMAP.md)
- [Changelog](CHANGELOG.md)
- [Release Notes](docs/RELEASE.md)
- [Launch Checklist](docs/LAUNCH.md)
- [Triage Guide](docs/TRIAGE.md)
- [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md)
- [Release Readiness Issue Form](.github/ISSUE_TEMPLATE/release-readiness.yml)
