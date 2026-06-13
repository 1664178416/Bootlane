# Bootlane Release Safety Fixtures

Last updated: 2026-06-09

This document describes the fixture matrix behind `pnpm release-safety:fixtures`.
The matrix proves that `scripts/check-release-safety.mjs` catches forbidden first-publish drift while Bootlane is still preparing a manual first release.

The guard exists because the Final Bootlane repository URL, npm publish access, provenance expectations, and release automation permissions are external release facts. Until those are confirmed, package URL metadata and publish automation must not appear in package manifests or CI workflows.

## Commands

```bash
pnpm release-safety:fixtures
pnpm docs:check-release-safety-fixtures
```

`pnpm release-safety:fixtures` builds temporary repositories in the OS temp directory, runs the release safety guard, and deletes the temporary files after each case.
`pnpm docs:check-release-safety-fixtures` keeps this document synchronized with `scripts/check-release-safety-fixtures.mjs`.

## Clean Fixture

| Fixture | Covers | Expected result |
| --- | --- | --- |
| clean release safety fixture | baseline package manifests, read-only CI permissions, and first-publish guardrail docs | passes release safety without forbidden first-publish drift |

The clean fixture uses minimal root, core, and CLI package manifests without `repository`, `homepage`, or `bugs` metadata. Its workflow keeps `contents: read` and avoids release events, manual dispatch, npm publish commands, npm tokens, write permissions, and provenance settings.

## Negative Fixture Matrix

| Fixture | Covers | Expected failure |
| --- | --- | --- |
| root repository metadata | root package `repository` metadata | root package should not define repository |
| core homepage metadata | @bootlane/core `homepage` metadata | @bootlane/core should not define homepage |
| cli bugs metadata | bootlane CLI `bugs` metadata | bootlane should not define bugs |
| release workflow trigger | GitHub Actions `release` trigger | should not define a release event yet |
| manual workflow dispatch | GitHub Actions `workflow_dispatch` trigger | should not define manual dispatch yet |
| npm publish command | `npm publish` workflow automation | should not run npm publish yet |
| npm provenance flag | `--provenance` workflow settings | should not configure npm provenance yet |
| id-token write permission | GitHub Actions `id-token: write` permission | should not request id-token write before publish automation exists |
| contents write permission | GitHub Actions `contents: write` permission | should not request contents write before release automation exists |
| npm token reference | npm publish token references | should not reference npm publish tokens |

Each negative fixture mutates one release-sensitive surface and expects `scripts/check-release-safety.mjs` to fail with the matching error substring.

## Coverage Boundaries

This matrix only proves the first-publish guardrails that are intentionally deterministic:

- Package manifests must not include `repository`, `homepage`, or `bugs` before the final repository URL is confirmed.
- GitHub Actions must not include release triggers, manual dispatch, npm publish commands, npm token references, write permissions, or provenance settings before release automation is intentionally designed.
- Release documentation must keep the final repository URL, manual publish, publish order, and green-local-gate warnings visible.

The matrix does not prove npm account access, live package-name availability, npm package page rendering, post-publish `npx` behavior, or private security contact readiness. Those remain manual or external checks in [Release Evidence](RELEASE_EVIDENCE.md).

Bootlane is not a vulnerability scanner. These fixtures only protect the release process from accidental first-publish drift.
