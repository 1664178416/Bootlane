# Bootlane Release Blockers

Last updated: 2026-06-08

These items require human or external-system confirmation before the first public release.

## Blocking Items

| Item | Status | Required Before Publish |
| --- | --- | --- |
| Final GitHub repository URL | Blocked on repo decision | Add `repository`, `homepage`, and `bugs` fields to root, `@bootlane/core`, and `bootlane` package manifests after the real Bootlane repository URL is confirmed. |
| npm account and org access | Blocked on account confirmation | Confirm the publishing account can publish `bootlane` and public scoped packages under `@bootlane`. |
| npm package name availability | Must re-check at publish time | Run `pnpm npm-names:check` close to publishing. The latest verified result on 2026-06-08 was that `bootlane` and `@bootlane/core` were not published on npmjs.org. |
| Release tag and GitHub release target | Blocked on repository decision | Create the final `v0.1.0` tag and GitHub release in the actual Bootlane repository. |

## Verified Local Gates

Run:

```bash
pnpm verify:release
```

This covers build, example report validation, tests, package contents docs, check ID docs, deterministic package metadata, built CLI smoke, and package dry-run content validation.

Run separately near publish time:

```bash
pnpm npm-names:check
```

This check depends on live npm registry state and is intentionally not part of regular CI.

## Manual First-Release Review

Before publishing, complete the first-release review checklist in [Release Notes](RELEASE.md#first-release-review-checklist) and record evidence in [Release Evidence](RELEASE_EVIDENCE.md). Use the External State Confirmations there to separate facts that normal CI cannot prove. Use [Release Evidence Snapshot](RELEASE_EVIDENCE_SNAPSHOT.md) as the generated evidence draft and run `pnpm release:evidence:check` before publishing.

The checklist covers repository identity, npm identity, user-facing content, package artifacts, and post-publish verification. `pnpm docs:check-release-evidence` guards the evidence checklist shape, but maintainers must still confirm external state that cannot be proven by local scripts.
