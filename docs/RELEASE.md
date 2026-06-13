# Bootlane Release Notes

Last updated: 2026-06-08

This document tracks the practical release checklist for the first npm/GitHub release.

## Current Version

`0.1.0` is the first planned public MVP release.

## Pre-Release Checklist

- Review [Release Blockers](RELEASE_BLOCKERS.md) and resolve every blocking item before publishing.
- Confirm final GitHub repository URL and add `repository`, `homepage`, and `bugs` fields to package manifests.
- Run `git remote -v` and stop if the current remote does not point to the final Bootlane repository.
- Confirm `SECURITY.md` contains the final private security reporting channel before broad announcement.
- Run `pnpm npm-names:check` with network access to confirm `bootlane` and `@bootlane/core` are still unpublished on npmjs.org.
- Run `pnpm install --frozen-lockfile`.
- Run `pnpm build`.
- Run `pnpm example:report:check`.
- Run `pnpm test`.
- Run `pnpm docs:check-contributing`.
- Run `pnpm docs:check-templates`.
- Run `pnpm docs:check-triage`.
- Run `pnpm docs:check-quality-gates`.
- Run `pnpm ci:workflow:check`.
- Run `pnpm docs:check-security`.
- Run `pnpm docs:check-package-contents`.
- Run `pnpm docs:check-release-evidence`.
- Run `pnpm release:evidence:check`.
- Run `pnpm release:gates:check`.
- Run `pnpm docs:check-changelog`.
- Run `pnpm metadata:check` to validate deterministic package manifest contracts. Final `repository`, `homepage`, and `bugs` URLs still require manual confirmation.
- Run `pnpm release-safety:check` to confirm package URL metadata and publish automation have not been added prematurely.
- Run `pnpm release-safety:fixtures` to confirm release safety catches package URL metadata, publish workflows, write permissions, npm token references, and provenance drift.
- Run `pnpm docs:check-release-safety-fixtures` to confirm [Release Safety Fixtures](RELEASE_SAFETY_FIXTURES.md) matches the fixture case matrix.
- Run `pnpm smoke:bin` to validate the built CLI version, healthy JSON fixture reports, Markdown fix preview summaries, read-only checks, and saved report artifacts on CI failure paths. Successful smoke runs print compact status lines.
- Run `pnpm pack:dry-run` to validate npm package dry-runs and required package contents.
- Run `pnpm smoke:packed-install` to validate local tarball install behavior before publishing.
- Run `pnpm verify:release` for a one-command local release gate that runs build, example report validation, tests, docs validation, metadata checks, built CLI smoke, and package dry-run validation.
- Run `node packages/cli/dist/index.js check examples/fixtures/node-missing-env --format markdown`.
- Review `CHANGELOG.md`.
- Review JSON report schema compatibility in `docs/REPORT_SCHEMA.md`.
- Confirm `bootlane check` remains read-only.

## Local Verification

See [Quality Gates](QUALITY_GATES.md) for the full gate map.

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
pnpm metadata:check
pnpm release-safety:check
pnpm release-safety:fixtures
pnpm docs:check-release-safety-fixtures
pnpm docs:check-release-blockers
pnpm smoke:bin
pnpm pack:dry-run
pnpm smoke:packed-install
pnpm verify:release
```

## Networked Release Checks

```bash
pnpm npm-names:check
```

This command queries the official npm registry and should be run close to publish time. It is not part of the normal CI workflow because package-name availability is external state.

## First Release Review Checklist

Use this checklist immediately before the first public publish. It is intentionally manual because the final repository URL, npm account access, and release target are external state.

Record evidence in [Release Evidence](RELEASE_EVIDENCE.md) as each external or manual item is confirmed. Follow the Maintainer Execution Path and Evidence Section Guide, then start from the [release readiness issue form](../.github/ISSUE_TEMPLATE/release-readiness.yml) when opening the first-publish evidence issue. Fill the Evidence Record Header first, complete the Manual Decision Log when deciding whether to proceed, check the Evidence Staleness Rules, confirm the External State Confirmations, follow the Evidence Entry Format, review the Evidence Redaction Examples, use the Dry-Run Transcript Template for package dry-runs and packed install smoke, use the Post-Publish Verification Transcript after publish, complete the Release Closeout Checklist, then update each applicable Release Readiness table with status, date/operator, output summary, and evidence links. Use [Release Evidence Snapshot](RELEASE_EVIDENCE_SNAPSHOT.md) as the generated starting point, and review the Snapshot Focus Policy, Snapshot Reference Guide, and Snapshot Refresh Rules so the pasted draft stays compact, current, and linked to longer guidance.
Do not use a green local gate as publish approval; the first publish still requires the external evidence below.

### Repository Identity

- Run `git remote -v` and confirm it points to the final Bootlane repository.
- If the remote points to another project, stop and do not publish from that working tree.
- Add `repository`, `homepage`, and `bugs` fields to the root, `packages/core/package.json`, and `packages/cli/package.json` only after the real Bootlane repository URL is confirmed.
- Confirm the release tag will be created as `v0.1.0` in the final Bootlane repository.

### npm Identity

- Confirm the npm account can publish the unscoped `bootlane` package.
- Confirm the npm account can publish public scoped packages under `@bootlane`.
- Run `pnpm npm-names:check` close to publish time.
- Confirm both package manifests still use version `0.1.0`.

### User-Facing Content

- Review `README.md` for the current release-candidate status, usage examples, config, fix previews, and release links.
- Review `packages/core/README.md` for programmatic usage, check coverage, and the read-only contract.
- Review `packages/cli/README.md` as the standalone npm package page for quick start, output formats, CI usage, configuration, fix previews, and read-only behavior.
- Review `CHANGELOG.md` and keep `0.1.0 - Unreleased` accurate until the release is cut.
- Run `pnpm docs:check-changelog`.
- Review `SECURITY.md` and replace the placeholder reporting channel after the final repository and maintainer contact are confirmed.
- Review `docs/REPORT_SCHEMA.md` for schema version `1` compatibility notes.
- Review `examples/reports/node-missing-env.md` as the committed example Markdown report.
- Regenerate the committed example Markdown report when report output intentionally changes:

```bash
pnpm example:report
```

- Run `pnpm example:report:check` before publishing.

### Package Artifacts

- Review `docs/PACKAGE_CONTENTS.md`.
- Run `pnpm docs:check-package-contents`.
- Run `pnpm docs:check-release-evidence`.
- Run `pnpm release:evidence:check`.
- Run `pnpm release:gates:check`.
- Review `docs/RELEASE_SAFETY_FIXTURES.md`.
- Run `pnpm docs:check-release-safety-fixtures`.
- Run `pnpm verify:release`.
- Run `pnpm pack:dry-run` and confirm both packages include the expected README, LICENSE, package manifest, runtime JS, and declaration files.
- Run npm publish dry-runs from `packages/core` and `packages/cli`.
- Run `pnpm smoke:packed-install` after local tarballs are packed.
- Confirm no `.tgz` artifacts are left in `packages/core` or `packages/cli`.

### Publish Confirmation

- Publish `@bootlane/core` first.
- Publish `bootlane` second.
- Verify `npx bootlane@latest --version`.
- Verify `npx bootlane@latest check --help`.
- Verify `npx bootlane@latest check --format json` in a small fixture or temporary repo.

## Publish Plan

The first publish should be manual until release automation is intentionally designed.
Use the Maintainer Execution Path, Publish Window Checklist, External State Confirmations, and Release Closeout Checklist in [Release Evidence](RELEASE_EVIDENCE.md) to keep the final evidence record, stale-evidence review, manual decision, package publish order, post-publish checks, final status, and follow-ups together. Do not publish packages until the Manual Decision Log is set to `Proceed`.

### Pre-Publish

1. Resolve every item in [Release Blockers](RELEASE_BLOCKERS.md).
2. Open the [release readiness issue form](../.github/ISSUE_TEMPLATE/release-readiness.yml), run `pnpm release:evidence`, review the Snapshot Refresh Rules, then record the evidence location in [Release Evidence](RELEASE_EVIDENCE.md).
3. Run the local release gate:

```bash
pnpm verify:release
```

4. Re-check live npm package-name availability:

```bash
pnpm npm-names:check
```

5. Run npm publish dry-runs from each package directory:

```bash
cd packages/core
npm publish --dry-run --access public

cd ../cli
npm publish --dry-run --access public
```

6. Run the packed install smoke:

```bash
pnpm smoke:packed-install
```

### Publish

Publish the core package before the CLI package because `bootlane` depends on `@bootlane/core`.

```bash
cd packages/core
npm publish --access public

cd ../cli
npm publish --access public
```

### Post-Publish

1. Create the `v0.1.0` tag and GitHub release in the final Bootlane repository.
2. Use the Post-Publish Verification Transcript in [Release Evidence](RELEASE_EVIDENCE.md) for package pages, GitHub tag/release, and `npx bootlane@latest` checks.
3. Verify `npx bootlane@latest --version`.
4. Verify `npx bootlane@latest check --help`.
5. Complete the Release Closeout Checklist and the Announcement Readiness Gate in [Launch Checklist](LAUNCH.md#announcement-readiness-gate) before broad announcement.
6. Share README examples and fixture report output.

## Release Positioning

Title:

> Bootlane 0.1.0: From clone to run

Short description:

> Bootlane checks whether a repo is ready to run by inspecting setup docs, dependencies, env vars, tests, secrets, and CI readiness.

## Launch Assets

- `docs/LAUNCH.md` for launch messaging, sharing checklist, and feedback triage.
- `docs/TRIAGE.md` for post-launch issue and PR triage.
- `SECURITY.md` for private reporting, secret redaction, and read-only security boundaries.
- Root README quick start and current status.
- `examples/reports/node-missing-env.md` as the example Markdown report.
- Downstream GitHub Actions example in `docs/GITHUB_ACTIONS.md`.
- `packages/cli/README.md` for the npm CLI package page.
- `packages/core/README.md` for the npm core package page.
- `docs/PACKAGE_CONTENTS.md` for the npm package artifact contract.
- `docs/RELEASE_EVIDENCE.md` for the first-publish evidence checklist.
- `docs/RELEASE_EVIDENCE_SNAPSHOT.md` for the generated first-publish evidence draft.
- `docs/RELEASE_SAFETY_FIXTURES.md` for the release safety fixture matrix.
- `CHANGELOG.md` 0.1.0 notes.
