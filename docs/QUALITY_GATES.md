# Bootlane Quality Gates

Last updated: 2026-06-08

This document maps the checks used during development, CI, release verification, and first-publish review.

## Quick Reference

| Gate | Command | Runs in CI | Included in `verify:release` | Notes |
| --- | --- | --- | --- | --- |
| Build | `pnpm build` | Yes | Yes | TypeScript project references via `tsc -b` |
| Example report | `pnpm example:report:check` | Yes | Yes | Requires built `packages/core/dist` |
| Tests | `pnpm test` | Yes | Yes | Vitest unit, fixture, reporter, and CLI tests |
| Contributing docs | `pnpm docs:check-contributing` | Yes | Yes | Guards contributor commands and project boundaries |
| GitHub templates | `pnpm docs:check-templates` | Yes | Yes | Guards issue forms and PR checklist |
| Triage docs | `pnpm docs:check-triage` | Yes | Yes | Guards post-launch triage workflow |
| Quality gates docs | `pnpm docs:check-quality-gates` | Yes | Yes | Guards this gate map |
| CI workflow contract | `pnpm ci:workflow:check` | Yes | Yes | Guards CI triggers, permissions, matrix, setup, and command order |
| Security docs | `pnpm docs:check-security` | Yes | Yes | Guards security reporting, secret redaction, and read-only boundaries |
| Package contents docs | `pnpm docs:check-package-contents` | Yes | Yes | Guards the npm package artifact contract |
| Release evidence docs | `pnpm docs:check-release-evidence` | Yes | Yes | Guards the first-publish evidence checklist and entry format |
| Release evidence snapshot | `pnpm release:evidence:check` | Yes | Yes | Guards the generated first-publish evidence draft |
| Release gate contracts | `pnpm release:gates:check` | Yes | Yes | Guards the shared release gate contract |
| Changelog docs | `pnpm docs:check-changelog` | Yes | Yes | Guards the 0.1.0 changelog as a release asset |
| Check ID docs | `pnpm docs:check-ids` | Yes | Yes | Guards check, finding, secret pattern, and fix proposal IDs |
| Release blocker docs | `pnpm docs:check-release-blockers` | Yes | Yes | Guards release, launch, blocker, and external-state docs |
| Package metadata | `pnpm metadata:check` | Yes | Yes | Guards package manifests and required scripts |
| Release safety | `pnpm release-safety:check` | Yes | Yes | Guards against premature package URL metadata or publish automation |
| Release safety fixtures | `pnpm release-safety:fixtures` | Yes | Yes | Proves release safety catches forbidden first-publish drift |
| Release safety fixture docs | `pnpm docs:check-release-safety-fixtures` | Yes | Yes | Guards the release safety fixture matrix |
| Built CLI smoke | `pnpm smoke:bin` | Yes | Yes | Requires built CLI; verifies reports, artifacts, and read-only behavior |
| Package dry-run | `pnpm pack:dry-run` | Yes | Yes | Runs `npm pack --dry-run --json` and validates package contents |
| Packed install smoke | `pnpm smoke:packed-install` | No | No | Network/cache-sensitive pre-publish smoke |
| npm name check | `pnpm npm-names:check` | No | No | Live npm registry state; run close to publish time |

## Daily Development

Use this loop for normal implementation work:

```bash
pnpm build
pnpm test
pnpm smoke:bin
```

For report-output changes, also run:

```bash
pnpm example:report
pnpm example:report:check
```

For docs, launch, triage, or contributor changes, run the relevant doc gate:

```bash
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
pnpm docs:check-release-safety-fixtures
```

## Pull Request Gate

Before opening a PR, run:

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

Use [.github/PULL_REQUEST_TEMPLATE.md](../.github/PULL_REQUEST_TEMPLATE.md) to confirm fixture, check ID, report schema, package contents, changelog, example report, and read-only expectations. The template's Local/CI Gate section mirrors this regular PR gate, while its Release Readiness section keeps `pnpm verify:release`, `pnpm npm-names:check`, and `pnpm smoke:packed-install` visible for applicable release work. Release-readiness PRs should also follow the Maintainer Execution Path and Evidence Section Guide, fill the Evidence Record Header and Manual Decision Log, check the Evidence Staleness Rules, confirm the External State Confirmations, follow the Publish Window Checklist and Evidence Entry Format, review the Evidence Redaction Examples, use the Dry-Run Transcript Template for package dry-runs and packed install smoke, use the Post-Publish Verification Transcript after publish, complete the Release Closeout Checklist, review the Snapshot Focus Policy, Snapshot Reference Guide, and Snapshot Refresh Rules, and update the relevant tables in [Release Evidence](RELEASE_EVIDENCE.md).

## CI Gate

Repository CI runs on Node 22 and Node 24:

```bash
pnpm install --frozen-lockfile
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

CI intentionally does not run:

- `pnpm npm-names:check`, because package-name availability is live npm registry state.
- `pnpm smoke:packed-install`, because packed install behavior can depend on npm cache or registry access.
- Manual repository identity checks, because the final Bootlane repository URL is external state.

Do not use a green local gate as publish approval; manual and external release evidence is still required.

## Release Gate

`pnpm verify:release` is the one-command local release gate.
Its executable stage order is defined in `scripts/release-gate-contracts.mjs`, which also feeds the release evidence snapshot generator and PR template validation.
The generated release evidence snapshot follows the Snapshot Focus Policy, Snapshot Reference Guide, and Snapshot Refresh Rules so the draft stays compact, current, and linked to the full release guidance in [Release Evidence](RELEASE_EVIDENCE.md).

It runs these stages in order:

1. Build.
2. Example report validation.
3. Tests.
4. Contributing docs validation.
5. GitHub templates validation.
6. Triage docs validation.
7. Quality gates docs validation.
8. CI workflow contract validation.
9. Security docs validation.
10. Package contents docs validation.
11. Release evidence docs validation.
12. Release evidence snapshot validation.
13. Release gate contract validation.
14. Changelog docs validation.
15. Check ID docs validation.
16. Release blocker docs validation.
17. Package metadata validation.
18. Release safety validation.
19. Release safety fixture validation.
20. Release safety fixture docs validation.
21. Built CLI smoke.
22. Package dry-run validation.

Run:

```bash
pnpm verify:release
```

Keep focused scripts available for debugging; the one-command gate is for final confidence, not for hiding useful smaller checks.

## Networked Release Checks

Run close to publish time:

```bash
pnpm npm-names:check
```

This queries the official npm registry and fails if `bootlane` or `@bootlane/core` is already published.

Run before publishing local tarballs:

```bash
pnpm smoke:packed-install
```

This packs local tarballs into a temporary directory, installs them into a temporary package, and runs the installed `bootlane` binary.

## Manual Release Checks

Local scripts cannot prove external release identity. Before publishing, manually confirm:

- `git remote -v` points to the final Bootlane repository.
- `repository`, `homepage`, and `bugs` package manifest fields point to the final Bootlane repository.
- npm account access can publish `bootlane` and public `@bootlane/core`.
- `SECURITY.md` contains the final private security reporting channel before broad announcement.
- The release tag target is `v0.1.0` in the final Bootlane repository.
- `docs/RELEASE_EVIDENCE.md` has been filled with the release issue, release PR, or release draft evidence location.
- npm package pages render `packages/cli/README.md` and `packages/core/README.md` correctly.
- `npx bootlane@latest --version` works after publish.
- `npx bootlane@latest check --help` works after publish.
- `npx bootlane@latest check --format json` works in a small repository after publish.

See [Release Notes](RELEASE.md) and [Release Blockers](RELEASE_BLOCKERS.md) for the full first-release checklist.

Manual repository identity checks stay outside CI. `pnpm release-safety:check` only prevents premature package URL metadata and publish automation while the final Bootlane repository URL is still unresolved.

## Gate Ownership

| Area | Owner document |
| --- | --- |
| Check ID stability | [Check IDs](CHECK_IDS.md) |
| JSON report shape | [Report Schema](REPORT_SCHEMA.md) |
| Contributor commands | [Contributing Guide](../CONTRIBUTING.md) |
| Security reporting | [Security Policy](../SECURITY.md) |
| npm package contents | [Package Contents](PACKAGE_CONTENTS.md) |
| Changelog release asset | [Changelog](../CHANGELOG.md) |
| Issue and PR templates | [.github templates](../.github/ISSUE_TEMPLATE), including [release-readiness.yml](../.github/ISSUE_TEMPLATE/release-readiness.yml) |
| CI workflow contract | [CI Workflow](../.github/workflows/ci.yml) |
| Triage workflow | [Triage Guide](TRIAGE.md) |
| Roadmap candidate backlog | [Roadmap](ROADMAP.md) |
| Release blockers | [Release Blockers](RELEASE_BLOCKERS.md) |
| First-release evidence | [Release Evidence](RELEASE_EVIDENCE.md) |
| First-release evidence snapshot | [Release Evidence Snapshot](RELEASE_EVIDENCE_SNAPSHOT.md) |
| Release safety fixture matrix | [Release Safety Fixtures](RELEASE_SAFETY_FIXTURES.md) |
| Release gate contract | [Release Gate Contracts](../scripts/release-gate-contracts.mjs) |
| Launch assets | [Launch Checklist](LAUNCH.md) |

## Read-Only Contract

Every gate protects the same product boundary:

`bootlane check` must not mutate analyzed repositories, install dependencies, execute project scripts, upload repository contents, or require cloud services.

`pnpm smoke:bin` includes a built CLI read-only smoke test. Future write-capable behavior should use explicit commands or flags, diff previews, and separate test coverage.

Core and CLI tests also cover secret redaction across JSON, Markdown, and terminal output. Focused scanner tests cover GitHub token, AWS access key ID, OpenAI API key, and private key block previews.
