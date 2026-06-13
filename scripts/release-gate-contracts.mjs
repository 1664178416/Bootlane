export const releaseGateSteps = [
  {
    id: "build",
    label: "Build",
    command: "pnpm build",
    sourceScript: "build",
    qualityStage: "Build.",
    run: { kind: "localBin", name: "tsc", args: ["-b"] }
  },
  {
    id: "example-report",
    label: "Example report",
    command: "pnpm example:report:check",
    sourceScript: "example:report:check",
    qualityStage: "Example report validation.",
    run: { kind: "nodeScript", name: "generate-example-report.mjs", args: ["--check"] }
  },
  {
    id: "test",
    label: "Test",
    command: "pnpm test",
    sourceScript: "test",
    qualityStage: "Tests.",
    run: { kind: "localBin", name: "vitest", args: ["run"] }
  },
  {
    id: "contributing-docs",
    label: "Check contributing docs",
    command: "pnpm docs:check-contributing",
    sourceScript: "docs:check-contributing",
    qualityStage: "Contributing docs validation.",
    run: { kind: "nodeScript", name: "check-contributing-doc.mjs" }
  },
  {
    id: "github-templates",
    label: "Check GitHub templates",
    command: "pnpm docs:check-templates",
    sourceScript: "docs:check-templates",
    qualityStage: "GitHub templates validation.",
    run: { kind: "nodeScript", name: "check-github-templates.mjs" }
  },
  {
    id: "triage-docs",
    label: "Check triage docs",
    command: "pnpm docs:check-triage",
    sourceScript: "docs:check-triage",
    qualityStage: "Triage docs validation.",
    run: { kind: "nodeScript", name: "check-triage-doc.mjs" }
  },
  {
    id: "quality-gates-docs",
    label: "Check quality gates docs",
    command: "pnpm docs:check-quality-gates",
    sourceScript: "docs:check-quality-gates",
    qualityStage: "Quality gates docs validation.",
    run: { kind: "nodeScript", name: "check-quality-gates-doc.mjs" }
  },
  {
    id: "ci-workflow-contract",
    label: "Check CI workflow contract",
    command: "pnpm ci:workflow:check",
    sourceScript: "ci:workflow:check",
    qualityStage: "CI workflow contract validation.",
    run: { kind: "nodeScript", name: "check-ci-workflow-contract.mjs" }
  },
  {
    id: "security-docs",
    label: "Check security docs",
    command: "pnpm docs:check-security",
    sourceScript: "docs:check-security",
    qualityStage: "Security docs validation.",
    run: { kind: "nodeScript", name: "check-security-doc.mjs" }
  },
  {
    id: "package-contents-docs",
    label: "Check package contents docs",
    command: "pnpm docs:check-package-contents",
    sourceScript: "docs:check-package-contents",
    qualityStage: "Package contents docs validation.",
    run: { kind: "nodeScript", name: "check-package-contents-doc.mjs" }
  },
  {
    id: "release-evidence-docs",
    label: "Check release evidence docs",
    command: "pnpm docs:check-release-evidence",
    sourceScript: "docs:check-release-evidence",
    qualityStage: "Release evidence docs validation.",
    run: { kind: "nodeScript", name: "check-release-evidence-doc.mjs" }
  },
  {
    id: "release-evidence-snapshot",
    label: "Release evidence snapshot",
    command: "pnpm release:evidence:check",
    sourceScript: "release:evidence:check",
    qualityStage: "Release evidence snapshot validation.",
    run: { kind: "nodeScript", name: "generate-release-evidence-snapshot.mjs", args: ["--check"] }
  },
  {
    id: "release-gate-contracts",
    label: "Release gate contracts",
    command: "pnpm release:gates:check",
    sourceScript: "release:gates:check",
    qualityStage: "Release gate contract validation.",
    run: { kind: "nodeScript", name: "check-release-gate-contracts.mjs" }
  },
  {
    id: "changelog-docs",
    label: "Check changelog docs",
    command: "pnpm docs:check-changelog",
    sourceScript: "docs:check-changelog",
    qualityStage: "Changelog docs validation.",
    run: { kind: "nodeScript", name: "check-changelog-doc.mjs" }
  },
  {
    id: "id-docs",
    label: "Check ID docs",
    command: "pnpm docs:check-ids",
    sourceScript: "docs:check-ids",
    qualityStage: "Check ID docs validation.",
    run: { kind: "nodeScript", name: "check-id-catalog.mjs" }
  },
  {
    id: "release-blocker-docs",
    label: "Check release blockers docs",
    command: "pnpm docs:check-release-blockers",
    sourceScript: "docs:check-release-blockers",
    qualityStage: "Release blocker docs validation.",
    run: { kind: "nodeScript", name: "check-release-blockers-doc.mjs" }
  },
  {
    id: "package-metadata",
    label: "Package metadata",
    command: "pnpm metadata:check",
    sourceScript: "metadata:check",
    qualityStage: "Package metadata validation.",
    run: { kind: "nodeScript", name: "check-package-metadata.mjs" }
  },
  {
    id: "release-safety",
    label: "Release safety",
    command: "pnpm release-safety:check",
    sourceScript: "release-safety:check",
    qualityStage: "Release safety validation.",
    run: { kind: "nodeScript", name: "check-release-safety.mjs" }
  },
  {
    id: "release-safety-fixtures",
    label: "Release safety fixtures",
    command: "pnpm release-safety:fixtures",
    sourceScript: "release-safety:fixtures",
    qualityStage: "Release safety fixture validation.",
    run: { kind: "nodeScript", name: "check-release-safety-fixtures.mjs" }
  },
  {
    id: "release-safety-fixtures-docs",
    label: "Check release safety fixture docs",
    command: "pnpm docs:check-release-safety-fixtures",
    sourceScript: "docs:check-release-safety-fixtures",
    qualityStage: "Release safety fixture docs validation.",
    run: { kind: "nodeScript", name: "check-release-safety-fixtures-doc.mjs" }
  },
  {
    id: "built-cli-smoke",
    label: "Built CLI smoke",
    command: "pnpm smoke:bin",
    sourceScript: "smoke:bin",
    qualityStage: "Built CLI smoke.",
    run: { kind: "nodeScript", name: "smoke-bin.mjs" }
  },
  {
    id: "package-dry-run",
    label: "Package dry-run",
    command: "pnpm pack:dry-run",
    sourceScript: "pack:dry-run",
    qualityStage: "Package dry-run validation.",
    run: { kind: "nodeScript", name: "pack-dry-run.mjs" }
  }
];

export const localEvidenceCommands = [
  { command: "pnpm install --frozen-lockfile", source: "release prerequisite" },
  ...releaseGateSteps.map((step) => ({
    command: step.command,
    sourceScript: step.sourceScript
  })),
  { command: "pnpm verify:release", sourceScript: "verify:release" }
];

export const releaseReadinessCommands = [
  "pnpm verify:release",
  "pnpm npm-names:check",
  "pnpm smoke:packed-install"
];

export const releaseEvidenceMaintainerPath = [
  {
    step: "Open release evidence issue",
    action: "Open `.github/ISSUE_TEMPLATE/release-readiness.yml` in the final Bootlane repository.",
    record: "Evidence location, owner, release version, and commit or tree state are known before evidence collection starts."
  },
  {
    step: "Generate evidence snapshot",
    action: "Run `pnpm release:evidence` and paste `docs/RELEASE_EVIDENCE_SNAPSHOT.md` into the release issue, release PR, or GitHub release draft.",
    record: "Generated release evidence snapshot is stored in the evidence location before command output is summarized."
  },
  {
    step: "Fill evidence baseline",
    action: "Complete the Evidence Record Header and review the Evidence Entry Format and Evidence Redaction Examples.",
    record: "Baseline fields are filled and public evidence excludes secrets, tokens, private contacts, auth headers, and full registry auth output."
  },
  {
    step: "Run local release gate",
    action: "Run `pnpm verify:release` on the intended publish tree after final tracked release changes.",
    record: "Local Gate Evidence includes current summaries and the gate is not stale."
  },
  {
    step: "Confirm external state",
    action: "Review the External State Confirmations and resolve release blockers that normal CI cannot prove.",
    record: "Repository, npm, security contact, tag target, package page, and published CLI facts are confirmed or explicitly blocked."
  },
  {
    step: "Refresh publish-window checks",
    action: "Run `pnpm npm-names:check`, package-level npm publish dry-runs, and `pnpm smoke:packed-install` close to publish time.",
    record: "Networked release evidence and dry-run transcript summaries are current for the final publish window."
  },
  {
    step: "Record manual decision",
    action: "Review Evidence Staleness Rules and set the Manual Decision Log to `Proceed`, `Pause`, or `Blocked`.",
    record: "Decision basis and blockers reflect current local, external, package, and manual evidence."
  },
  {
    step: "Publish packages",
    action: "Publish `@bootlane/core` first, then `bootlane`, only after the Manual Decision Log is set to `Proceed`.",
    record: "Publish Evidence captures package order, timestamps, versions, output summaries, and evidence links."
  },
  {
    step: "Verify post-publish behavior",
    action: "Use the Post-Publish Verification Transcript for npm package pages, GitHub tag or release, and `npx bootlane@latest` checks.",
    record: "Post-Publish Evidence confirms package pages, `latest`, help output, JSON output, and the final GitHub tag or release."
  },
  {
    step: "Close release record",
    action: "Update the Manual Decision Log and evidence record after post-publish verification.",
    record: "Final overall status, tag or release link, unresolved follow-ups, and any `Pause` or `Blocked` decisions are recorded."
  }
];

export const releaseEvidenceSectionGuide = [
  {
    section: "Maintainer Execution Path",
    useWhen: "Start every first-publish evidence record here.",
    recordIn: "Release readiness issue, release PR, or GitHub release draft."
  },
  {
    section: "Evidence Record Header",
    useWhen: "Before collecting command output or manual evidence.",
    recordIn: "Top of the release evidence record."
  },
  {
    section: "Status Values, Evidence Entry Format, and Evidence Redaction Examples",
    useWhen: "Before copying any command output, registry review, CI log, or manual confirmation.",
    recordIn: "Every evidence table row and copied summary."
  },
  {
    section: "Manual Decision Log",
    useWhen: "Immediately before publish and again after post-publish verification.",
    recordIn: "Decision section of the release evidence record."
  },
  {
    section: "Evidence Staleness Rules",
    useWhen: "Before setting the decision to `Proceed` or after any final release change.",
    recordIn: "Affected evidence rows plus Manual Decision Log."
  },
  {
    section: "External State Confirmations",
    useWhen: "When confirming facts normal CI cannot prove.",
    recordIn: "Repository, npm account, security, tag/release, package page, and post-publish evidence rows."
  },
  {
    section: "Local Gate Evidence",
    useWhen: "After running `pnpm verify:release` on the intended publish tree.",
    recordIn: "Local gate evidence rows."
  },
  {
    section: "Networked Release Evidence and Package Dry-Run Evidence",
    useWhen: "Inside the final publish window before the Manual Decision Log is set to `Proceed`.",
    recordIn: "Networked release and package dry-run evidence rows."
  },
  {
    section: "Publish Evidence",
    useWhen: "Only after the Manual Decision Log is set to `Proceed`.",
    recordIn: "Publish evidence rows for `@bootlane/core` and `bootlane`."
  },
  {
    section: "Post-Publish Evidence",
    useWhen: "After npm publish completes and package resolution can be observed.",
    recordIn: "Post-publish evidence rows and the final Manual Decision Log update."
  },
  {
    section: "Release Closeout Checklist",
    useWhen: "After post-publish checks are complete or a release is paused or blocked.",
    recordIn: "Final release evidence record, release issue, release PR, or GitHub release draft."
  }
];

export const releaseEvidenceSnapshotFocus = [
  {
    principle: "Keep copy-paste evidence drafts",
    guidance:
      "Include the fields maintainers should fill directly in a release issue, release PR, or GitHub release draft."
  },
  {
    principle: "Link long reference guidance",
    guidance:
      "Link to `docs/RELEASE_EVIDENCE.md` for full maintainer path, section guide, staleness, publish-window, external-state, formatting, redaction, dry-run, and post-publish guidance instead of duplicating every matrix."
  },
  {
    principle: "Stay deterministic and read-only",
    guidance:
      "Do not run local gates, networked checks, npm dry-runs, publish commands, or post-publish `npx` checks while generating the snapshot."
  },
  {
    principle: "Keep snapshot compact",
    guidance: "Keep `docs/RELEASE_EVIDENCE_SNAPSHOT.md` under 180 lines so it remains practical to paste into a release issue."
  }
];

export const releaseEvidenceSnapshotReferences = [
  {
    section: "Maintainer Execution Path",
    use: "Follow the ordered first-publish flow before collecting evidence.",
    source: "RELEASE_EVIDENCE.md#maintainer-execution-path"
  },
  {
    section: "Evidence Section Guide",
    use: "Choose which evidence section to use next.",
    source: "RELEASE_EVIDENCE.md#evidence-section-guide"
  },
  {
    section: "Status Values, Evidence Entry Format, and Evidence Redaction Examples",
    use: "Format every copied evidence row safely.",
    source: "RELEASE_EVIDENCE.md#status-values"
  },
  {
    section: "Evidence Staleness Rules",
    use: "Re-run or re-review stale evidence before setting `Proceed`.",
    source: "RELEASE_EVIDENCE.md#evidence-staleness-rules"
  },
  {
    section: "Publish Window Checklist",
    use: "Sequence the final publish window.",
    source: "RELEASE_EVIDENCE.md#publish-window-checklist"
  },
  {
    section: "External State Confirmations",
    use: "Confirm facts that normal CI cannot prove.",
    source: "RELEASE_EVIDENCE.md#external-state-confirmations"
  },
  {
    section: "Dry-Run Transcript Template",
    use: "Summarize package dry-runs and packed install smoke.",
    source: "RELEASE_EVIDENCE.md#dry-run-transcript-template"
  },
  {
    section: "Post-Publish Verification Transcript",
    use: "Summarize published CLI, npm page, and GitHub tag or release checks.",
    source: "RELEASE_EVIDENCE.md#post-publish-verification-transcript"
  },
  {
    section: "Release Closeout Checklist",
    use: "Close the evidence record with final status, links, and follow-ups.",
    source: "RELEASE_EVIDENCE.md#release-closeout-checklist"
  }
];

export const releaseEvidenceSnapshotRefreshRules = [
  {
    trigger: "Package metadata changes",
    action:
      "Run `pnpm release:evidence` after changing package manifests, package manager metadata, versions, private flags, publish config, exports, or CLI bin entries.",
    requiredEvidence: "Package Metadata Snapshot rows match the intended publish tree."
  },
  {
    trigger: "Release gate contract changes",
    action:
      "Run `pnpm release:evidence` after changing `scripts/release-gate-contracts.mjs`, package scripts used by release gates, CI gate order, or verification command lists.",
    requiredEvidence: "Local Gate Evidence Draft rows match the current `pnpm verify:release` contract."
  },
  {
    trigger: "Release evidence contract changes",
    action:
      "Run `pnpm docs:check-release-evidence` and `pnpm release:evidence:check` after changing snapshot focus, reference, refresh, decision, external, or content review contracts.",
    requiredEvidence: "Release evidence docs and the generated snapshot are synchronized before evidence is pasted."
  },
  {
    trigger: "Final publish tree selected",
    action: "Run `pnpm release:evidence` on the intended publish tree before opening or updating the release readiness issue.",
    requiredEvidence: "Evidence Record Header captures the commit or tree state that generated the pasted snapshot."
  },
  {
    trigger: "Snapshot copied before final checks",
    action:
      "Re-run `pnpm release:evidence` and update the pasted snapshot after any tracked release file, manifest, lockfile, workflow, or docs gate change.",
    requiredEvidence: "Pasted snapshot and committed snapshot both describe the current tree."
  }
];

export const evidenceStatusValues = [
  {
    value: "Pending",
    meaning: "not checked yet."
  },
  {
    value: "Confirmed",
    meaning: "checked and acceptable for publish."
  },
  {
    value: "Blocked",
    meaning: "checked and not acceptable for publish."
  },
  {
    value: "Not applicable",
    meaning: "intentionally skipped with a reason."
  }
];

export const evidenceEntryFields = [
  {
    field: "Status",
    rule: "Use one of the documented status values exactly."
  },
  {
    field: "Date/operator",
    rule: "Record an ISO 8601 date or timestamp plus the maintainer name or handle."
  },
  {
    field: "Output summary",
    rule:
      "Summarize the command, result, relevant version/counts, and any follow-up without copying secrets, tokens, private contact details, `.npmrc`, auth headers, or full registry auth output."
  },
  {
    field: "Required record",
    rule: "Record the exact external fact, manual review result, or decision needed for publish."
  },
  {
    field: "Evidence link",
    rule: "Link the release issue, release PR, GitHub release draft, CI run, npm page, or say `Not applicable - <reason>`."
  }
];

export const evidenceRedactionExamples = [
  {
    area: "npm account or auth checks",
    safeRecord: "`npm whoami` succeeded for the intended maintainer account; publish access confirmed privately.",
    doNotPaste: "Full `npm token list`, `.npmrc`, `NODE_AUTH_TOKEN`, `NPM_TOKEN`, or registry auth header output.",
    handling: "Record the result and evidence location, then keep auth details in the private maintainer channel."
  },
  {
    area: "npm registry and package-name checks",
    safeRecord: "`pnpm npm-names:check` reported `bootlane` and `@bootlane/core` available on 2026-06-09.",
    doNotPaste: "Session cookies, bearer tokens, npm profile email addresses, or full authenticated registry responses.",
    handling: "Paste only the availability summary, timestamp, and command used."
  },
  {
    area: "CI or local command logs",
    safeRecord: "`pnpm verify:release` passed with 22 gates; tests: 9 files, 77 tests.",
    doNotPaste: "Unfiltered CI logs that include environment dumps, token masks, private paths, or full registry auth output.",
    handling: "Link the CI run or release PR and summarize the relevant pass/fail lines."
  },
  {
    area: "Security contact review",
    safeRecord: "Private security reporting channel confirmed and documented in `SECURITY.md`.",
    doNotPaste: "Private email addresses, inbox routing details, or vulnerability report contents before disclosure is approved.",
    handling: "Record that the channel exists and where maintainers can verify it privately."
  },
  {
    area: "Secret or scanner findings",
    safeRecord: "Secret redaction checks passed; reports show redacted previews only.",
    doNotPaste: "Full `.env` files, private keys, API keys, access tokens, or unredacted scanner output.",
    handling: "Use redacted previews and rotate any real secret that was exposed during evidence collection."
  }
];

export const dryRunTranscriptFields = [
  {
    field: "Command",
    appliesTo: "All dry-run and packed install records",
    record: "Record the exact command and package directory when the command must run from `packages/core` or `packages/cli`."
  },
  {
    field: "Package or check",
    appliesTo: "`pnpm pack:dry-run`, npm publish dry-runs, and `pnpm smoke:packed-install`",
    record: "Name `@bootlane/core`, `bootlane`, package contents review, tarball residue check, or packed install smoke."
  },
  {
    field: "Version",
    appliesTo: "Package dry-runs and packed install smoke",
    record: "Record the package or CLI version observed; for the first release this should be `0.1.0`."
  },
  {
    field: "File count and package size",
    appliesTo: "`pnpm pack:dry-run` and npm publish dry-runs",
    record: "Record the summarized file count and package size from the dry-run output, not the full tarball listing."
  },
  {
    field: "Required artifacts",
    appliesTo: "Package dry-runs and package contents review",
    record: "Confirm README, LICENSE, package manifest, runtime JS, declaration files, and expected package README content are present."
  },
  {
    field: "Tarball residue",
    appliesTo: "Package dry-runs and packed install smoke",
    record: "Confirm no `.tgz` artifacts remain in `packages/core` or `packages/cli` after the check."
  },
  {
    field: "Packed install target",
    appliesTo: "`pnpm smoke:packed-install`",
    record: "Record that local tarballs were installed into a temporary package and the installed `bootlane` binary was used."
  },
  {
    field: "Installed CLI result",
    appliesTo: "`pnpm smoke:packed-install`",
    record: "Summarize the installed CLI version, help output, and one fixture or temporary repo check."
  },
  {
    field: "Publish order",
    appliesTo: "npm publish dry-runs and publish evidence",
    record: "Confirm `@bootlane/core` is validated and published before `bootlane`."
  },
  {
    field: "Evidence link",
    appliesTo: "All dry-run and packed install records",
    record: "Link the release issue, release PR, CI run, or release draft entry that stores the summarized evidence."
  }
];

export const postPublishVerificationFields = [
  {
    field: "Verification item",
    appliesTo: "All post-publish records",
    record: "Name the exact check or review target: published CLI version, help output, JSON check, npm package page, or GitHub tag/release."
  },
  {
    field: "Command or URL",
    appliesTo: "Post-publish `npx` checks, npm package pages, and GitHub tag/release review",
    record: "Record the exact `npx bootlane@latest` command or the npm/GitHub URL reviewed."
  },
  {
    field: "Observed version or target",
    appliesTo: "Published CLI checks, package pages, and GitHub tag/release review",
    record: "Record `0.1.0`, the `latest` dist-tag target, package page version, or `v0.1.0` tag target observed."
  },
  {
    field: "Expected result",
    appliesTo: "All post-publish records",
    record: "Confirm the expected outcome: version prints `0.1.0`, help renders, JSON check returns schema version `1`, package pages show expected README content, or the tag/release points to the final repository."
  },
  {
    field: "Output summary",
    appliesTo: "All post-publish records",
    record: "Summarize the result without copying noisy logs, private paths, tokens, npm auth output, or unredacted temporary repository details."
  },
  {
    field: "Date/operator",
    appliesTo: "All post-publish records",
    record: "Record the ISO 8601 date or timestamp plus the maintainer name or handle."
  },
  {
    field: "Evidence link",
    appliesTo: "All post-publish records",
    record: "Link the release issue, release PR, GitHub release draft, npm package page, CI run, or final GitHub release."
  },
  {
    field: "Follow-up if not confirmed",
    appliesTo: "Blocked or stale post-publish records",
    record: "Record the remediation owner and set the Manual Decision Log or follow-up status to `Pause` or `Blocked` until the check is reconfirmed."
  }
];

export const releaseCloseoutChecklist = [
  {
    item: "Final release status",
    requiredEvidence: "Overall status is `Confirmed`, `Pause`, or `Blocked` and matches the final Manual Decision Log.",
    closeoutAction: "Update the Evidence Record Header and Manual Decision Log after post-publish checks or a blocked release decision."
  },
  {
    item: "Published package confirmation",
    requiredEvidence:
      "`@bootlane/core` and `bootlane` publish evidence, npm package pages, and `latest` package resolution are confirmed or explicitly blocked.",
    closeoutAction: "Link publish evidence and post-publish package page checks for both packages."
  },
  {
    item: "GitHub tag or release link",
    requiredEvidence: "`v0.1.0` tag or GitHub release link points to the final Bootlane repository, or the missing link is recorded as blocked.",
    closeoutAction: "Add the tag or release URL to the release evidence record."
  },
  {
    item: "Unresolved follow-ups",
    requiredEvidence: "Every unresolved blocker, delayed verification, content correction, or post-publish issue has an owner and next action.",
    closeoutAction: "Record follow-ups in the release issue, release PR, GitHub release draft, or a linked follow-up issue."
  },
  {
    item: "Public announcement readiness",
    requiredEvidence:
      "Launch assets, changelog, security reporting status, package pages, post-publish CLI checks, and the Announcement Readiness Gate are confirmed before broad announcement.",
    closeoutAction: "Set announcement status to `Ready`, `Pause`, or `Blocked` and record the reason."
  }
];

export const launchAnnouncementChecklist = [
  {
    item: "Release closeout complete",
    requiredBeforeAnnouncement:
      "Release Closeout Checklist is complete, final status is recorded, and no unresolved blocker is hidden from the launch record.",
    record: "Link the release readiness issue, release PR, or GitHub release draft closeout section."
  },
  {
    item: "Published install path verified",
    requiredBeforeAnnouncement:
      "`npx bootlane@latest --version`, `npx bootlane@latest check --help`, and one JSON check work after npm `latest` resolves to `0.1.0`.",
    record: "Record the post-publish command summaries and evidence links."
  },
  {
    item: "Package and release pages ready",
    requiredBeforeAnnouncement:
      "npm package pages render the expected package README content and the `v0.1.0` GitHub tag or release points to the final repository.",
    record: "Link package pages and the GitHub tag or release."
  },
  {
    item: "Public message reviewed",
    requiredBeforeAnnouncement:
      "Suggested announcement copy preserves read-only positioning, setup-readiness framing, supported ecosystems, and current limitations.",
    record: "Record the reviewed announcement copy or launch draft location."
  },
  {
    item: "Feedback intake ready",
    requiredBeforeAnnouncement:
      "Issue forms, triage guide, launch feedback topics, and maintainer ownership are ready before broad sharing.",
    record: "Link the launch checklist, triage guide, and feedback owner."
  }
];

export const manualDecisionLogFields = [
  {
    field: "Decision",
    guidance: "Record `Proceed`, `Pause`, or `Blocked`."
  },
  {
    field: "Decision owner",
    guidance: "Name the maintainer accountable for the final release decision."
  },
  {
    field: "Decision timestamp",
    guidance: "Record the ISO 8601 date or timestamp when the decision was made."
  },
  {
    field: "Evidence baseline",
    guidance: "Link the filled release issue, release PR, or GitHub release draft and mention the commit or tree state reviewed."
  },
  {
    field: "Decision basis",
    guidance: "Summarize the evidence that supports proceeding or pausing without copying secrets or full logs."
  },
  {
    field: "Open blockers",
    guidance: "List unresolved blockers or write `None` only when every required manual and external check is confirmed."
  },
  {
    field: "Next action",
    guidance: "Record the immediate next action: publish, pause and gather evidence, fix blockers, or re-run stale checks."
  }
];

export const manualDecisionChecklist = [
  {
    item: "Final repository identity",
    requiredEvidence: "Final Bootlane repository URL, `git remote -v`, package URL metadata, and `v0.1.0` tag target are confirmed."
  },
  {
    item: "npm identity and access",
    requiredEvidence: "`bootlane` and `@bootlane/core` name availability, npm account access, scoped package access, and publish order are confirmed."
  },
  {
    item: "Security contact readiness",
    requiredEvidence: "The private security reporting channel is confirmed and `SECURITY.md` no longer contains placeholder release instructions."
  },
  {
    item: "Package artifact readiness",
    requiredEvidence: "`pnpm pack:dry-run`, npm publish dry-runs, tarball residue checks, and package contents review are recorded."
  },
  {
    item: "Packed install readiness",
    requiredEvidence: "`pnpm smoke:packed-install` evidence confirms local tarballs install and the installed `bootlane` binary works."
  },
  {
    item: "Package page readiness",
    requiredEvidence: "npm package pages render `packages/core/README.md` and `packages/cli/README.md` correctly after publish."
  },
  {
    item: "Post-publish readiness",
    requiredEvidence: "`npx bootlane@latest --version`, `check --help`, and `check --format json` verification steps are planned and later recorded."
  }
];

export const evidenceStalenessRules = [
  {
    evidence: "Local release gate",
    staleWhen: "Any tracked release file, package manifest, lockfile, generated artifact, or workflow changes after the gate ran.",
    rerun: "Run `pnpm verify:release` again and update the Manual Decision Log before publishing."
  },
  {
    evidence: "npm package name availability",
    staleWhen: "The check was not run in the final publish window or npm registry state may have changed.",
    rerun: "Run `pnpm npm-names:check` close to publish time and again after any delay or failed publish attempt."
  },
  {
    evidence: "Package dry-runs",
    staleWhen: "Package manifests, README files, package contents docs, build outputs, version, dependencies, or package contracts change.",
    rerun: "Run `pnpm pack:dry-run` and package-level `npm publish --dry-run --access public` after the final build."
  },
  {
    evidence: "Packed install smoke",
    staleWhen: "Local tarballs, package versions, dependencies, build outputs, or install behavior may have changed.",
    rerun: "Run `pnpm smoke:packed-install` after final dry-runs and close to publish time."
  },
  {
    evidence: "Security contact readiness",
    staleWhen: "`SECURITY.md`, maintainer contact ownership, or private reporting configuration changes.",
    rerun: "Reconfirm the private security reporting channel before broad announcement."
  },
  {
    evidence: "Manual decision log",
    staleWhen: "Any required manual or external evidence changes after the decision was recorded.",
    rerun: "Update the Manual Decision Log and reset the decision to `Pause` or `Blocked` until the changed evidence is reconfirmed."
  },
  {
    evidence: "npm package page review",
    staleWhen: "The package has not been published yet, the npm page has not rendered the current version, or package README content changes.",
    rerun: "Review npm package pages after publish and after any package README or metadata correction."
  },
  {
    evidence: "Post-publish npx checks",
    staleWhen: "`latest` does not yet point at `0.1.0`, a republish/fix occurs, or npm package resolution changes.",
    rerun: "Run `npx bootlane@latest --version`, `npx bootlane@latest check --help`, and `npx bootlane@latest check --format json` after publish."
  }
];

export const publishWindowChecklist = [
  {
    phase: "Open evidence record",
    action: "Run `pnpm release:evidence`, copy the snapshot into the release issue, release PR, or GitHub release draft, and fill the Evidence Record Header.",
    requiredEvidence: "Evidence location, owner, date range, and commit or tree state are recorded before release checks begin."
  },
  {
    phase: "Confirm external identity",
    action: "Resolve release blockers, final repository URL, npm account access, package URL metadata timing, and security contact readiness.",
    requiredEvidence:
      "Repository Evidence, npm Account Evidence, Security and Content Evidence, and Release Blockers rows are `Confirmed` or explicitly `Blocked`."
  },
  {
    phase: "Run local release gate",
    action: "Run `pnpm verify:release` on the intended publish tree after final tracked release changes.",
    requiredEvidence: "Local Gate Evidence rows are updated with current command summaries and are not stale."
  },
  {
    phase: "Refresh publish-window checks",
    action: "Run `pnpm npm-names:check`, package-level npm publish dry-runs, and `pnpm smoke:packed-install` close to publish time.",
    requiredEvidence:
      "Networked Release Evidence and Package Dry-Run Evidence include current command summaries, tarball residue status, and evidence links."
  },
  {
    phase: "Record final decision",
    action: "Review the Evidence Staleness Rules and set the Manual Decision Log to `Proceed`, `Pause`, or `Blocked`.",
    requiredEvidence: "Decision basis and blockers reflect all current local, external, and manual evidence."
  },
  {
    phase: "Publish packages",
    action: "Publish `@bootlane/core` first, then `bootlane`, using `npm publish --access public` only after `Proceed` is recorded.",
    requiredEvidence: "Publish Evidence captures timestamps, versions, output summaries, evidence links, and package publish order."
  },
  {
    phase: "Verify published package",
    action: "Review npm package pages and run post-publish `npx bootlane@latest` checks.",
    requiredEvidence:
      "Post-Publish Evidence confirms `latest` resolves to `0.1.0`, help renders, JSON check works, and package pages show expected README content."
  },
  {
    phase: "Close release record",
    action: "Update the Manual Decision Log after post-publish verification and link the GitHub tag or release.",
    requiredEvidence: "Evidence record has final overall status, tag or release link, and follow-up notes for any delayed items."
  }
];

export const externalStateConfirmations = [
  {
    fact: "Final Bootlane repository URL",
    confirmBy: "Review the final GitHub repository URL and run `git remote -v` from the publish working tree.",
    requiredEvidence:
      "Evidence records the final repository URL, matching remotes, and the repository that will receive `v0.1.0`.",
    blocksPublishIf: "The URL is unknown, points to another project, or has not been approved by maintainers."
  },
  {
    fact: "Package URL metadata timing",
    confirmBy: "Review root, `packages/core`, and `packages/cli` manifests after the final repository URL is known.",
    requiredEvidence: "`repository`, `homepage`, and `bugs` are absent before confirmation or point to the confirmed Bootlane repository after confirmation.",
    blocksPublishIf: "Package URL metadata is missing after approval, still points to a placeholder, or points to another project."
  },
  {
    fact: "npm package name availability",
    confirmBy: "Run `pnpm npm-names:check` close to publish time and after any delay or failed publish attempt.",
    requiredEvidence: "`bootlane` and `@bootlane/core` registry status, command timestamp, operator, and evidence link are recorded.",
    blocksPublishIf: "Either package name is already taken or registry state cannot be confirmed in the final publish window."
  },
  {
    fact: "npm account and scoped access",
    confirmBy: "Confirm privately that the publishing account can publish `bootlane` and public packages under `@bootlane`.",
    requiredEvidence: "Evidence records the maintainer/account confirmation summary without tokens, `.npmrc`, auth headers, or full auth output.",
    blocksPublishIf: "The account cannot publish either package or scoped package access is unconfirmed."
  },
  {
    fact: "Security contact readiness",
    confirmBy: "Review `SECURITY.md` and the private maintainer reporting channel before broad announcement.",
    requiredEvidence: "Evidence records that the private reporting channel exists and where maintainers can verify details privately.",
    blocksPublishIf: "`SECURITY.md` still contains placeholder reporting instructions or the private channel is unconfirmed."
  },
  {
    fact: "Release tag and GitHub release target",
    confirmBy: "Confirm `v0.1.0` will be created in the final Bootlane repository and link the tag or release after publish.",
    requiredEvidence: "Evidence records the intended tag target before publish and the final GitHub tag or release link after publish.",
    blocksPublishIf: "The final repository is unknown or the tag/release would be created in the wrong repository."
  },
  {
    fact: "npm package page rendering",
    confirmBy: "Review npm package pages after publish for `@bootlane/core` and `bootlane`.",
    requiredEvidence: "Evidence records that npm renders the expected package README content for both packages.",
    blocksPublishIf: "Pages are unavailable, render the wrong README, or display misleading package metadata."
  },
  {
    fact: "Published CLI resolution",
    confirmBy: "Run `npx bootlane@latest --version`, `npx bootlane@latest check --help`, and `npx bootlane@latest check --format json` after publish.",
    requiredEvidence: "Evidence records that `latest` resolves to `0.1.0`, help output renders, and a JSON check works in a small repo.",
    blocksPublishIf: "`latest` does not resolve to `0.1.0`, the CLI cannot start, or basic published-package checks fail."
  }
];

export const externalReleaseChecks = [
  {
    command: "pnpm npm-names:check",
    record: "networked npm registry state; run close to publish time"
  },
  {
    command: "pnpm smoke:packed-install",
    record: "environment-sensitive packed install smoke before publishing"
  },
  {
    command: "npm publish --dry-run --access public",
    record: "manual package dry-run from packages/core and packages/cli"
  },
  {
    command: "npm publish --access public",
    record: "manual publish command after external evidence is confirmed"
  },
  {
    command: "npx bootlane@latest --version",
    record: "post-publish package resolution check"
  },
  {
    command: "npx bootlane@latest check --help",
    record: "post-publish help check"
  },
  {
    command: "npx bootlane@latest check --format json",
    record: "post-publish fixture or temporary repo check"
  }
];

export const contentReviewArtifacts = [
  {
    artifact: "SECURITY.md",
    review: "Final private security reporting channel."
  },
  {
    artifact: "README.md",
    review: "Current release-candidate status, usage examples, config, fix previews, and release links."
  },
  {
    artifact: "packages/core/README.md",
    review: "Programmatic usage, check coverage, and read-only contract."
  },
  {
    artifact: "packages/cli/README.md",
    review:
      "Standalone npm package page for quick start, output formats, CI usage, configuration, fix previews, and read-only behavior."
  },
  {
    artifact: "CHANGELOG.md",
    review: "Accurate `0.1.0 - Unreleased` user-facing release notes."
  },
  {
    artifact: "docs/REPORT_SCHEMA.md",
    review: "JSON report schema version `1` compatibility notes."
  },
  {
    artifact: "examples/reports/node-missing-env.md",
    review: "Committed example Markdown report matches the current renderer."
  },
  {
    artifact: "docs/LAUNCH.md",
    review: "Launch messaging, sharing checklist, and feedback triage."
  },
  {
    artifact: "docs/RELEASE_SAFETY_FIXTURES.md",
    review: "Release safety fixture matrix matches first-publish drift guard coverage."
  }
];

export const qualityGateCommands = [
  ...releaseGateSteps.map((step) => step.command),
  "pnpm verify:release",
  ...releaseReadinessCommands.filter((command) => command !== "pnpm verify:release")
];
