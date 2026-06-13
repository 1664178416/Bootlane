# Bootlane Release Evidence

Last updated: 2026-06-09

This document records the evidence maintainers should collect before the first public `0.1.0` publish. It complements [Release Notes](RELEASE.md), [Release Blockers](RELEASE_BLOCKERS.md), [Quality Gates](QUALITY_GATES.md), [Package Contents](PACKAGE_CONTENTS.md), and [Release Safety Fixtures](RELEASE_SAFETY_FIXTURES.md).

Do not use a green local gate as publish approval by itself. The final GitHub repository URL, npm account access, npm registry state, security contact, and post-publish package behavior require human or external-system confirmation.

## Maintainer Execution Path

Use this path when opening and filling the first-publish evidence record:

| Step | Action | Record |
| --- | --- | --- |
| Open release evidence issue | Open `.github/ISSUE_TEMPLATE/release-readiness.yml` in the final Bootlane repository. | Evidence location, owner, release version, and commit or tree state are known before evidence collection starts. |
| Generate evidence snapshot | Run `pnpm release:evidence` and paste `docs/RELEASE_EVIDENCE_SNAPSHOT.md` into the release issue, release PR, or GitHub release draft. | Generated release evidence snapshot is stored in the evidence location before command output is summarized. |
| Fill evidence baseline | Complete the Evidence Record Header and review the Evidence Entry Format and Evidence Redaction Examples. | Baseline fields are filled and public evidence excludes secrets, tokens, private contacts, auth headers, and full registry auth output. |
| Run local release gate | Run `pnpm verify:release` on the intended publish tree after final tracked release changes. | Local Gate Evidence includes current summaries and the gate is not stale. |
| Confirm external state | Review the External State Confirmations and resolve release blockers that normal CI cannot prove. | Repository, npm, security contact, tag target, package page, and published CLI facts are confirmed or explicitly blocked. |
| Refresh publish-window checks | Run `pnpm npm-names:check`, package-level npm publish dry-runs, and `pnpm smoke:packed-install` close to publish time. | Networked release evidence and dry-run transcript summaries are current for the final publish window. |
| Record manual decision | Review Evidence Staleness Rules and set the Manual Decision Log to `Proceed`, `Pause`, or `Blocked`. | Decision basis and blockers reflect current local, external, package, and manual evidence. |
| Publish packages | Publish `@bootlane/core` first, then `bootlane`, only after the Manual Decision Log is set to `Proceed`. | Publish Evidence captures package order, timestamps, versions, output summaries, and evidence links. |
| Verify post-publish behavior | Use the Post-Publish Verification Transcript for npm package pages, GitHub tag or release, and `npx bootlane@latest` checks. | Post-Publish Evidence confirms package pages, `latest`, help output, JSON output, and the final GitHub tag or release. |
| Close release record | Update the Manual Decision Log and evidence record after post-publish verification. | Final overall status, tag or release link, unresolved follow-ups, and any `Pause` or `Blocked` decisions are recorded. |

## Evidence Section Guide

Use this guide to decide which section to fill or review next:

| Section | Use when | Record in |
| --- | --- | --- |
| Maintainer Execution Path | Start every first-publish evidence record here. | Release readiness issue, release PR, or GitHub release draft. |
| Evidence Record Header | Before collecting command output or manual evidence. | Top of the release evidence record. |
| Status Values, Evidence Entry Format, and Evidence Redaction Examples | Before copying any command output, registry review, CI log, or manual confirmation. | Every evidence table row and copied summary. |
| Manual Decision Log | Immediately before publish and again after post-publish verification. | Decision section of the release evidence record. |
| Evidence Staleness Rules | Before setting the decision to `Proceed` or after any final release change. | Affected evidence rows plus Manual Decision Log. |
| External State Confirmations | When confirming facts normal CI cannot prove. | Repository, npm account, security, tag/release, package page, and post-publish evidence rows. |
| Local Gate Evidence | After running `pnpm verify:release` on the intended publish tree. | Local gate evidence rows. |
| Networked Release Evidence and Package Dry-Run Evidence | Inside the final publish window before the Manual Decision Log is set to `Proceed`. | Networked release and package dry-run evidence rows. |
| Publish Evidence | Only after the Manual Decision Log is set to `Proceed`. | Publish evidence rows for `@bootlane/core` and `bootlane`. |
| Post-Publish Evidence | After npm publish completes and package resolution can be observed. | Post-publish evidence rows and the final Manual Decision Log update. |
| Release Closeout Checklist | After post-publish checks are complete or a release is paused or blocked. | Final release evidence record, release issue, release PR, or GitHub release draft. |

## Status Values

Use these values when completing the evidence checklist:

- `Pending`: not checked yet.
- `Confirmed`: checked and acceptable for publish.
- `Blocked`: checked and not acceptable for publish.
- `Not applicable`: intentionally skipped with a reason.

## Evidence Entry Format

Use the same field format in release issues, release PRs, GitHub release drafts, and copied evidence tables:

| Field | Rule |
| --- | --- |
| Status | Use one of the documented status values exactly. |
| Date/operator | Record an ISO 8601 date or timestamp plus the maintainer name or handle. |
| Output summary | Summarize the command, result, relevant version/counts, and any follow-up without copying secrets, tokens, private contact details, `.npmrc`, auth headers, or full registry auth output. |
| Required record | Record the exact external fact, manual review result, or decision needed for publish. |
| Evidence link | Link the release issue, release PR, GitHub release draft, CI run, npm page, or say `Not applicable - <reason>`. |

## Evidence Redaction Examples

Use these examples before copying command output or manual review notes into public release evidence:

| Area | Safe to record | Do not paste | Handling |
| --- | --- | --- | --- |
| npm account or auth checks | `npm whoami` succeeded for the intended maintainer account; publish access confirmed privately. | Full `npm token list`, `.npmrc`, `NODE_AUTH_TOKEN`, `NPM_TOKEN`, or registry auth header output. | Record the result and evidence location, then keep auth details in the private maintainer channel. |
| npm registry and package-name checks | `pnpm npm-names:check` reported `bootlane` and `@bootlane/core` available on 2026-06-09. | Session cookies, bearer tokens, npm profile email addresses, or full authenticated registry responses. | Paste only the availability summary, timestamp, and command used. |
| CI or local command logs | `pnpm verify:release` passed with 22 gates; tests: 9 files, 77 tests. | Unfiltered CI logs that include environment dumps, token masks, private paths, or full registry auth output. | Link the CI run or release PR and summarize the relevant pass/fail lines. |
| Security contact review | Private security reporting channel confirmed and documented in `SECURITY.md`. | Private email addresses, inbox routing details, or vulnerability report contents before disclosure is approved. | Record that the channel exists and where maintainers can verify it privately. |
| Secret or scanner findings | Secret redaction checks passed; reports show redacted previews only. | Full `.env` files, private keys, API keys, access tokens, or unredacted scanner output. | Use redacted previews and rotate any real secret that was exposed during evidence collection. |

## Evidence Record Header

Fill this once in the release issue, release PR, or GitHub release draft before publishing:

| Field | Value |
| --- | --- |
| Release version | `0.1.0` |
| Evidence location | Pending - release issue, release PR, or GitHub release draft URL. |
| Evidence owner | Pending - maintainer responsible for updating this record. |
| Evidence date range | Pending - first command timestamp through post-publish verification timestamp. |
| Commit or tree state | Pending - commit SHA, tag candidate, or explicit working tree note. |
| Overall status | Pending |

## Manual Decision Log

Complete this immediately before publishing and update it after post-publish verification. A green local gate is not enough to set the decision to `Proceed`.

| Field | Guidance |
| --- | --- |
| Decision | Record `Proceed`, `Pause`, or `Blocked`. |
| Decision owner | Name the maintainer accountable for the final release decision. |
| Decision timestamp | Record the ISO 8601 date or timestamp when the decision was made. |
| Evidence baseline | Link the filled release issue, release PR, or GitHub release draft and mention the commit or tree state reviewed. |
| Decision basis | Summarize the evidence that supports proceeding or pausing without copying secrets or full logs. |
| Open blockers | List unresolved blockers or write `None` only when every required manual and external check is confirmed. |
| Next action | Record the immediate next action: publish, pause and gather evidence, fix blockers, or re-run stale checks. |

Use this checklist before setting the decision:

| Item | Required evidence |
| --- | --- |
| Final repository identity | Final Bootlane repository URL, `git remote -v`, package URL metadata, and `v0.1.0` tag target are confirmed. |
| npm identity and access | `bootlane` and `@bootlane/core` name availability, npm account access, scoped package access, and publish order are confirmed. |
| Security contact readiness | The private security reporting channel is confirmed and `SECURITY.md` no longer contains placeholder release instructions. |
| Package artifact readiness | `pnpm pack:dry-run`, npm publish dry-runs, tarball residue checks, and package contents review are recorded. |
| Packed install readiness | `pnpm smoke:packed-install` evidence confirms local tarballs install and the installed `bootlane` binary works. |
| Package page readiness | npm package pages render `packages/core/README.md` and `packages/cli/README.md` correctly after publish. |
| Post-publish readiness | `npx bootlane@latest --version`, `check --help`, and `check --format json` verification steps are planned and later recorded. |

## Evidence Staleness Rules

Use these rules before setting the Manual Decision Log to `Proceed`. If evidence is stale, re-run or re-review it and update the affected evidence tables.

| Evidence | Stale when | Re-run or re-review |
| --- | --- | --- |
| Local release gate | Any tracked release file, package manifest, lockfile, generated artifact, or workflow changes after the gate ran. | Run `pnpm verify:release` again and update the Manual Decision Log before publishing. |
| npm package name availability | The check was not run in the final publish window or npm registry state may have changed. | Run `pnpm npm-names:check` close to publish time and again after any delay or failed publish attempt. |
| Package dry-runs | Package manifests, README files, package contents docs, build outputs, version, dependencies, or package contracts change. | Run `pnpm pack:dry-run` and package-level `npm publish --dry-run --access public` after the final build. |
| Packed install smoke | Local tarballs, package versions, dependencies, build outputs, or install behavior may have changed. | Run `pnpm smoke:packed-install` after final dry-runs and close to publish time. |
| Security contact readiness | `SECURITY.md`, maintainer contact ownership, or private reporting configuration changes. | Reconfirm the private security reporting channel before broad announcement. |
| Manual decision log | Any required manual or external evidence changes after the decision was recorded. | Update the Manual Decision Log and reset the decision to `Pause` or `Blocked` until the changed evidence is reconfirmed. |
| npm package page review | The package has not been published yet, the npm page has not rendered the current version, or package README content changes. | Review npm package pages after publish and after any package README or metadata correction. |
| Post-publish npx checks | `latest` does not yet point at `0.1.0`, a republish/fix occurs, or npm package resolution changes. | Run `npx bootlane@latest --version`, `npx bootlane@latest check --help`, and `npx bootlane@latest check --format json` after publish. |

## Publish Window Checklist

Use this checklist inside the final publish window. Do not publish packages until the Manual Decision Log is set to `Proceed` and stale evidence has been re-run or re-reviewed.

| Phase | Action | Required evidence |
| --- | --- | --- |
| Open evidence record | Run `pnpm release:evidence`, copy the snapshot into the release issue, release PR, or GitHub release draft, and fill the Evidence Record Header. | Evidence location, owner, date range, and commit or tree state are recorded before release checks begin. |
| Confirm external identity | Resolve release blockers, final repository URL, npm account access, package URL metadata timing, and security contact readiness. | Repository Evidence, npm Account Evidence, Security and Content Evidence, and Release Blockers rows are `Confirmed` or explicitly `Blocked`. |
| Run local release gate | Run `pnpm verify:release` on the intended publish tree after final tracked release changes. | Local Gate Evidence rows are updated with current command summaries and are not stale. |
| Refresh publish-window checks | Run `pnpm npm-names:check`, package-level npm publish dry-runs, and `pnpm smoke:packed-install` close to publish time. | Networked Release Evidence and Package Dry-Run Evidence include current command summaries, tarball residue status, and evidence links. |
| Record final decision | Review the Evidence Staleness Rules and set the Manual Decision Log to `Proceed`, `Pause`, or `Blocked`. | Decision basis and blockers reflect all current local, external, and manual evidence. |
| Publish packages | Publish `@bootlane/core` first, then `bootlane`, using `npm publish --access public` only after `Proceed` is recorded. | Publish Evidence captures timestamps, versions, output summaries, evidence links, and package publish order. |
| Verify published package | Review npm package pages and run post-publish `npx bootlane@latest` checks. | Post-Publish Evidence confirms `latest` resolves to `0.1.0`, help renders, JSON check works, and package pages show expected README content. |
| Close release record | Update the Manual Decision Log after post-publish verification and link the GitHub tag or release. | Evidence record has final overall status, tag or release link, and follow-up notes for any delayed items. |

## External State Confirmations

These facts cannot be proven by normal CI. Confirm them in the release issue, release PR, or GitHub release draft before setting the Manual Decision Log to `Proceed`.

| External fact | Confirm by | Required evidence | Blocks publish if |
| --- | --- | --- | --- |
| Final Bootlane repository URL | Review the final GitHub repository URL and run `git remote -v` from the publish working tree. | Evidence records the final repository URL, matching remotes, and the repository that will receive `v0.1.0`. | The URL is unknown, points to another project, or has not been approved by maintainers. |
| Package URL metadata timing | Review root, `packages/core`, and `packages/cli` manifests after the final repository URL is known. | `repository`, `homepage`, and `bugs` are absent before confirmation or point to the confirmed Bootlane repository after confirmation. | Package URL metadata is missing after approval, still points to a placeholder, or points to another project. |
| npm package name availability | Run `pnpm npm-names:check` close to publish time and after any delay or failed publish attempt. | `bootlane` and `@bootlane/core` registry status, command timestamp, operator, and evidence link are recorded. | Either package name is already taken or registry state cannot be confirmed in the final publish window. |
| npm account and scoped access | Confirm privately that the publishing account can publish `bootlane` and public packages under `@bootlane`. | Evidence records the maintainer/account confirmation summary without tokens, `.npmrc`, auth headers, or full auth output. | The account cannot publish either package or scoped package access is unconfirmed. |
| Security contact readiness | Review `SECURITY.md` and the private maintainer reporting channel before broad announcement. | Evidence records that the private reporting channel exists and where maintainers can verify details privately. | `SECURITY.md` still contains placeholder reporting instructions or the private channel is unconfirmed. |
| Release tag and GitHub release target | Confirm `v0.1.0` will be created in the final Bootlane repository and link the tag or release after publish. | Evidence records the intended tag target before publish and the final GitHub tag or release link after publish. | The final repository is unknown or the tag/release would be created in the wrong repository. |
| npm package page rendering | Review npm package pages after publish for `@bootlane/core` and `bootlane`. | Evidence records that npm renders the expected package README content for both packages. | Pages are unavailable, render the wrong README, or display misleading package metadata. |
| Published CLI resolution | Run `npx bootlane@latest --version`, `npx bootlane@latest check --help`, and `npx bootlane@latest check --format json` after publish. | Evidence records that `latest` resolves to `0.1.0`, help output renders, and a JSON check works in a small repo. | `latest` does not resolve to `0.1.0`, the CLI cannot start, or basic published-package checks fail. |

## Snapshot Focus Policy

Use this policy when regenerating or pasting [Release Evidence Snapshot](RELEASE_EVIDENCE_SNAPSHOT.md). The snapshot is a compact fillable evidence draft, while this document remains the complete reference checklist.

| Principle | Guidance |
| --- | --- |
| Keep copy-paste evidence drafts | Include the fields maintainers should fill directly in a release issue, release PR, or GitHub release draft. |
| Link long reference guidance | Link to `docs/RELEASE_EVIDENCE.md` for full maintainer path, section guide, staleness, publish-window, external-state, formatting, redaction, dry-run, and post-publish guidance instead of duplicating every matrix. |
| Stay deterministic and read-only | Do not run local gates, networked checks, npm dry-runs, publish commands, or post-publish `npx` checks while generating the snapshot. |
| Keep snapshot compact | Keep `docs/RELEASE_EVIDENCE_SNAPSHOT.md` under 180 lines so it remains practical to paste into a release issue. |

## Snapshot Reference Guide

Use these links for full guidance instead of copying every reference matrix into the release issue, release PR, or GitHub release draft.

| Section | Use | Source |
| --- | --- | --- |
| Maintainer Execution Path | Follow the ordered first-publish flow before collecting evidence. | [RELEASE_EVIDENCE.md#maintainer-execution-path](RELEASE_EVIDENCE.md#maintainer-execution-path) |
| Evidence Section Guide | Choose which evidence section to use next. | [RELEASE_EVIDENCE.md#evidence-section-guide](RELEASE_EVIDENCE.md#evidence-section-guide) |
| Status Values, Evidence Entry Format, and Evidence Redaction Examples | Format every copied evidence row safely. | [RELEASE_EVIDENCE.md#status-values](RELEASE_EVIDENCE.md#status-values) |
| Evidence Staleness Rules | Re-run or re-review stale evidence before setting `Proceed`. | [RELEASE_EVIDENCE.md#evidence-staleness-rules](RELEASE_EVIDENCE.md#evidence-staleness-rules) |
| Publish Window Checklist | Sequence the final publish window. | [RELEASE_EVIDENCE.md#publish-window-checklist](RELEASE_EVIDENCE.md#publish-window-checklist) |
| External State Confirmations | Confirm facts that normal CI cannot prove. | [RELEASE_EVIDENCE.md#external-state-confirmations](RELEASE_EVIDENCE.md#external-state-confirmations) |
| Dry-Run Transcript Template | Summarize package dry-runs and packed install smoke. | [RELEASE_EVIDENCE.md#dry-run-transcript-template](RELEASE_EVIDENCE.md#dry-run-transcript-template) |
| Post-Publish Verification Transcript | Summarize published CLI, npm page, and GitHub tag or release checks. | [RELEASE_EVIDENCE.md#post-publish-verification-transcript](RELEASE_EVIDENCE.md#post-publish-verification-transcript) |
| Release Closeout Checklist | Close the evidence record with final status, links, and follow-ups. | [RELEASE_EVIDENCE.md#release-closeout-checklist](RELEASE_EVIDENCE.md#release-closeout-checklist) |

## Snapshot Refresh Rules

Use these rules before pasting or reusing [Release Evidence Snapshot](RELEASE_EVIDENCE_SNAPSHOT.md). If any trigger applies, refresh the snapshot and update the release issue, release PR, or GitHub release draft before summarizing command output.

| Trigger | Maintainer action | Required evidence |
| --- | --- | --- |
| Package metadata changes | Run `pnpm release:evidence` after changing package manifests, package manager metadata, versions, private flags, publish config, exports, or CLI bin entries. | Package Metadata Snapshot rows match the intended publish tree. |
| Release gate contract changes | Run `pnpm release:evidence` after changing `scripts/release-gate-contracts.mjs`, package scripts used by release gates, CI gate order, or verification command lists. | Local Gate Evidence Draft rows match the current `pnpm verify:release` contract. |
| Release evidence contract changes | Run `pnpm docs:check-release-evidence` and `pnpm release:evidence:check` after changing snapshot focus, reference, refresh, decision, external, or content review contracts. | Release evidence docs and the generated snapshot are synchronized before evidence is pasted. |
| Final publish tree selected | Run `pnpm release:evidence` on the intended publish tree before opening or updating the release readiness issue. | Evidence Record Header captures the commit or tree state that generated the pasted snapshot. |
| Snapshot copied before final checks | Re-run `pnpm release:evidence` and update the pasted snapshot after any tracked release file, manifest, lockfile, workflow, or docs gate change. | Pasted snapshot and committed snapshot both describe the current tree. |

## Generated Snapshot Draft

Use [Release Evidence Snapshot](RELEASE_EVIDENCE_SNAPSHOT.md) as a copy-paste starting point for a release issue, release PR, or GitHub release draft. The [release readiness issue form](../.github/ISSUE_TEMPLATE/release-readiness.yml) includes a Generated release evidence snapshot field for this draft.

```bash
pnpm release:evidence
pnpm release:evidence:check
```

The snapshot is generated from package manifests and the current gate list. It does not execute local gates, networked checks, npm publish dry-runs, publish commands, or post-publish `npx` checks. Paste actual output summaries only after running the commands yourself.
The local gate order and snapshot command lists come from `scripts/release-gate-contracts.mjs`.

## Repository Evidence

| Evidence | Status | Date/operator | Required record | Evidence link |
| --- | --- | --- | --- | --- |
| Final GitHub repository URL | Pending | Pending | Record the final Bootlane repository URL. Do not guess it from the current working tree. | Pending |
| Git remote | Pending | Pending | Run `git remote -v` and confirm it points to the final Bootlane repository. Do not publish if it points to another project. | Pending |
| Package URL metadata | Pending | Pending | Confirm `repository`, `homepage`, and `bugs` fields are added only after the final Bootlane repository URL is confirmed. | Pending |
| Release tag target | Pending | Pending | Confirm `v0.1.0` will be created in the final Bootlane repository. | Pending |

## Local Gate Evidence

Record the date, operator, command output summary, and relevant commit or tree state for each command.

| Command | Status | Date/operator | Output summary | Evidence link |
| --- | --- | --- | --- | --- |
| `pnpm install --frozen-lockfile` | Pending | Pending | Pending | Pending |
| `pnpm build` | Pending | Pending | Pending | Pending |
| `pnpm example:report:check` | Pending | Pending | Pending | Pending |
| `pnpm test` | Pending | Pending | Pending | Pending |
| `pnpm docs:check-contributing` | Pending | Pending | Pending | Pending |
| `pnpm docs:check-templates` | Pending | Pending | Pending | Pending |
| `pnpm docs:check-triage` | Pending | Pending | Pending | Pending |
| `pnpm docs:check-quality-gates` | Pending | Pending | Pending | Pending |
| `pnpm ci:workflow:check` | Pending | Pending | Pending | Pending |
| `pnpm docs:check-security` | Pending | Pending | Pending | Pending |
| `pnpm docs:check-package-contents` | Pending | Pending | Pending | Pending |
| `pnpm docs:check-release-evidence` | Pending | Pending | Pending | Pending |
| `pnpm release:evidence:check` | Pending | Pending | Pending | Pending |
| `pnpm release:gates:check` | Pending | Pending | Pending | Pending |
| `pnpm docs:check-changelog` | Pending | Pending | Pending | Pending |
| `pnpm docs:check-ids` | Pending | Pending | Pending | Pending |
| `pnpm docs:check-release-blockers` | Pending | Pending | Pending | Pending |
| `pnpm metadata:check` | Pending | Pending | Pending | Pending |
| `pnpm release-safety:check` | Pending | Pending | Pending | Pending |
| `pnpm release-safety:fixtures` | Pending | Pending | Pending | Pending |
| `pnpm docs:check-release-safety-fixtures` | Pending | Pending | Pending | Pending |
| `pnpm smoke:bin` | Pending | Pending | Pending | Pending |
| `pnpm pack:dry-run` | Pending | Pending | Pending | Pending |
| `pnpm verify:release` | Pending | Pending | Pending | Pending |

## Networked Release Evidence

These checks depend on external state and should run close to publish time:

| Check | Status | Date/operator | Required record | Evidence link |
| --- | --- | --- | --- | --- |
| `pnpm npm-names:check` | Pending | Pending | Confirm `bootlane` and `@bootlane/core` are still available or otherwise acceptable to publish. | Pending |
| `pnpm smoke:packed-install` | Pending | Pending | Confirm local tarballs install in a temporary package and the installed `bootlane` binary works. | Pending |

Record the command output summary and timestamp. If npm registry state changes between the check and publish, re-run the check.

## Package Dry-Run Evidence

Run `pnpm pack:dry-run`, `pnpm smoke:packed-install`, and npm publish dry-runs from each package directory. Record concise transcript summaries instead of full package listings or auth output.

```bash
pnpm pack:dry-run
pnpm smoke:packed-install

cd packages/core
npm publish --dry-run --access public

cd ../cli
npm publish --dry-run --access public
```

### Dry-Run Transcript Template

Use this template for `pnpm pack:dry-run`, package-level `npm publish --dry-run --access public`, and `pnpm smoke:packed-install` evidence:

| Field | Applies to | Record |
| --- | --- | --- |
| Command | All dry-run and packed install records | Record the exact command and package directory when the command must run from `packages/core` or `packages/cli`. |
| Package or check | `pnpm pack:dry-run`, npm publish dry-runs, and `pnpm smoke:packed-install` | Name `@bootlane/core`, `bootlane`, package contents review, tarball residue check, or packed install smoke. |
| Version | Package dry-runs and packed install smoke | Record the package or CLI version observed; for the first release this should be `0.1.0`. |
| File count and package size | `pnpm pack:dry-run` and npm publish dry-runs | Record the summarized file count and package size from the dry-run output, not the full tarball listing. |
| Required artifacts | Package dry-runs and package contents review | Confirm README, LICENSE, package manifest, runtime JS, declaration files, and expected package README content are present. |
| Tarball residue | Package dry-runs and packed install smoke | Confirm no `.tgz` artifacts remain in `packages/core` or `packages/cli` after the check. |
| Packed install target | `pnpm smoke:packed-install` | Record that local tarballs were installed into a temporary package and the installed `bootlane` binary was used. |
| Installed CLI result | `pnpm smoke:packed-install` | Summarize the installed CLI version, help output, and one fixture or temporary repo check. |
| Publish order | npm publish dry-runs and publish evidence | Confirm `@bootlane/core` is validated and published before `bootlane`. |
| Evidence link | All dry-run and packed install records | Link the release issue, release PR, CI run, or release draft entry that stores the summarized evidence. |

| Package or check | Command | Status | Output summary | Evidence link |
| --- | --- | --- | --- | --- |
| `@bootlane/core` dry-run | `npm publish --dry-run --access public` from `packages/core` | Pending | Pending | Pending |
| `bootlane` dry-run | `npm publish --dry-run --access public` from `packages/cli` | Pending | Pending | Pending |
| Package contents review | Compare dry-runs with [Package Contents](PACKAGE_CONTENTS.md). | Pending | Pending | Pending |
| Tarball residue check | Confirm no `.tgz` artifacts remain in `packages/core` or `packages/cli`. | Pending | Pending | Pending |

## npm Account Evidence

| Evidence | Status | Date/operator | Required record | Evidence link |
| --- | --- | --- | --- | --- |
| `bootlane` publish access | Pending | Pending | Confirm the npm account can publish the unscoped `bootlane` package. | Pending |
| `@bootlane/core` publish access | Pending | Pending | Confirm the npm account can publish public packages under `@bootlane`. | Pending |
| Publish order | Pending | Pending | Confirm `@bootlane/core` will be published before `bootlane`. | Pending |

## Security and Content Evidence

Record review notes for each artifact:

| Artifact | Status | Date/operator | Required review | Evidence link |
| --- | --- | --- | --- | --- |
| `SECURITY.md` | Pending | Pending | Final private security reporting channel. | Pending |
| `README.md` | Pending | Pending | Current release-candidate status, usage examples, config, fix previews, and release links. | Pending |
| `packages/core/README.md` | Pending | Pending | Programmatic usage, check coverage, and read-only contract. | Pending |
| `packages/cli/README.md` | Pending | Pending | Standalone npm package page for quick start, output formats, CI usage, configuration, fix previews, and read-only behavior. | Pending |
| `CHANGELOG.md` | Pending | Pending | Accurate `0.1.0 - Unreleased` user-facing release notes. | Pending |
| `docs/REPORT_SCHEMA.md` | Pending | Pending | JSON report schema version `1` compatibility notes. | Pending |
| `examples/reports/node-missing-env.md` | Pending | Pending | Committed example Markdown report matches the current renderer. | Pending |
| `docs/LAUNCH.md` | Pending | Pending | Launch messaging, sharing checklist, and feedback triage. | Pending |
| `docs/RELEASE_SAFETY_FIXTURES.md` | Pending | Pending | Release safety fixture matrix matches first-publish drift guard coverage. | Pending |

Confirm Bootlane is still positioned as a read-only readiness checker and not as a vulnerability scanner.

## Publish Evidence

Record the exact publish commands and output summaries:

```bash
cd packages/core
npm publish --access public

cd ../cli
npm publish --access public
```

| Package | Command | Status | Output summary | Evidence link |
| --- | --- | --- | --- | --- |
| `@bootlane/core` | `npm publish --access public` from `packages/core` | Pending | Pending | Pending |
| `bootlane` | `npm publish --access public` from `packages/cli` | Pending | Pending | Pending |

Do not publish `bootlane` before `@bootlane/core`.

## Post-Publish Evidence

### Post-Publish Verification Transcript

Use this template after package publish for `npx bootlane@latest` checks, npm package page reviews, and GitHub tag or release confirmation.

| Field | Applies to | Record |
| --- | --- | --- |
| Verification item | All post-publish records | Name the exact check or review target: published CLI version, help output, JSON check, npm package page, or GitHub tag/release. |
| Command or URL | Post-publish `npx` checks, npm package pages, and GitHub tag/release review | Record the exact `npx bootlane@latest` command or the npm/GitHub URL reviewed. |
| Observed version or target | Published CLI checks, package pages, and GitHub tag/release review | Record `0.1.0`, the `latest` dist-tag target, package page version, or `v0.1.0` tag target observed. |
| Expected result | All post-publish records | Confirm the expected outcome: version prints `0.1.0`, help renders, JSON check returns schema version `1`, package pages show expected README content, or the tag/release points to the final repository. |
| Output summary | All post-publish records | Summarize the result without copying noisy logs, private paths, tokens, npm auth output, or unredacted temporary repository details. |
| Date/operator | All post-publish records | Record the ISO 8601 date or timestamp plus the maintainer name or handle. |
| Evidence link | All post-publish records | Link the release issue, release PR, GitHub release draft, npm package page, CI run, or final GitHub release. |
| Follow-up if not confirmed | Blocked or stale post-publish records | Record the remediation owner and set the Manual Decision Log or follow-up status to `Pause` or `Blocked` until the check is reconfirmed. |

After publishing, record:

| Check | Status | Date/operator | Required record | Evidence link |
| --- | --- | --- | --- | --- |
| `npx bootlane@latest --version` | Pending | Pending | Confirm the published CLI version resolves and prints `0.1.0`. | Pending |
| `npx bootlane@latest check --help` | Pending | Pending | Confirm the published help output renders. | Pending |
| `npx bootlane@latest check --format json` | Pending | Pending | Run in a small fixture or temporary repository and record a summary. | Pending |
| npm package pages | Pending | Pending | Confirm npm renders `packages/core/README.md` and `packages/cli/README.md` correctly. | Pending |
| GitHub release and tag | Pending | Pending | Confirm the GitHub release and `v0.1.0` tag exist in the final Bootlane repository. | Pending |

## Release Closeout Checklist

Use this checklist after post-publish verification, or when a release is paused or blocked before publish. Do not announce broadly until the closeout status matches the evidence record.

| Item | Required evidence | Closeout action |
| --- | --- | --- |
| Final release status | Overall status is `Confirmed`, `Pause`, or `Blocked` and matches the final Manual Decision Log. | Update the Evidence Record Header and Manual Decision Log after post-publish checks or a blocked release decision. |
| Published package confirmation | `@bootlane/core` and `bootlane` publish evidence, npm package pages, and `latest` package resolution are confirmed or explicitly blocked. | Link publish evidence and post-publish package page checks for both packages. |
| GitHub tag or release link | `v0.1.0` tag or GitHub release link points to the final Bootlane repository, or the missing link is recorded as blocked. | Add the tag or release URL to the release evidence record. |
| Unresolved follow-ups | Every unresolved blocker, delayed verification, content correction, or post-publish issue has an owner and next action. | Record follow-ups in the release issue, release PR, GitHub release draft, or a linked follow-up issue. |
| Public announcement readiness | Launch assets, changelog, security reporting status, package pages, post-publish CLI checks, and the Announcement Readiness Gate are confirmed before broad announcement. | Set announcement status to `Ready`, `Pause`, or `Blocked` and record the reason. |

## Evidence Storage

For the first release, start from the [release readiness issue form](../.github/ISSUE_TEMPLATE/release-readiness.yml) and store evidence in the release issue, release PR, or GitHub release draft for the final Bootlane repository. Keep secrets, tokens, private contact addresses, and full registry auth output out of public comments.
