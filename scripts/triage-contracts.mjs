export const postLaunchFeedbackClosureMatrix = [
  {
    route: "False positive",
    firstAction: "Reproduce the exact finding with `bootlane check --verbose --no-color` and confirm the finding ID.",
    requiredArtifact: "A minimal fixture or focused unit test that fails before the fix and passes after the fix.",
    closeWhen: "The fixture-backed fix merges, or the report behavior is documented as intentional with the issue linked."
  },
  {
    route: "Missing detection",
    firstAction: "Identify the missed Node, Python, package-manager, env, runtime, test, or CI signal.",
    requiredArtifact: "A minimal fixture that contains the missed signal plus a failing test for the expected detection.",
    closeWhen: "The missed signal is detected without regressing existing happy-path fixtures."
  },
  {
    route: "Docs confusion",
    firstAction: "Identify the smallest stale, missing, or confusing page or section.",
    requiredArtifact: "A docs change, example, or README/package README update linked from the issue.",
    closeWhen: "The docs answer the reported confusion and the relevant docs check passes."
  },
  {
    route: "Feature request",
    firstAction: "Classify the request as a small deterministic check, future write flow, integration, ecosystem expansion, or out-of-scope idea.",
    requiredArtifact: "A fixture-backed implementation plan for small checks, or a documented roadmap candidate for broader work.",
    closeWhen: "The request is implemented with fixtures, moved to a roadmap candidate, or closed as out of scope with rationale."
  },
  {
    route: "Release or launch blocker",
    firstAction: "Check whether the report affects package identity, published CLI startup, secret redaction, read-only behavior, or public launch trust.",
    requiredArtifact: "A release blocker entry, release evidence update, or launch follow-up with an owner and next action.",
    closeWhen: "The blocker is resolved, downgraded with evidence, or tracked as a post-launch follow-up before broad sharing continues."
  }
];

export const roadmapCandidateReviewChecklist = [
  {
    category: "Small deterministic check",
    reviewQuestion: "Can the request be proven with a minimal fixture and a stable finding or report change?",
    requiredEvidence: "Minimal fixture, expected finding or report change, and false-positive risk note.",
    nextAction: "Move toward implementation only after the fixture or focused test exists."
  },
  {
    category: "Integration or output workflow",
    reviewQuestion:
      "Does the request improve GitHub, CI, Markdown, JSON, or package-manager workflows without changing the default local check path?",
    requiredEvidence:
      "Workflow example, target output shape, and confirmation that default `bootlane check` stays local and read-only.",
    nextAction: "Keep as a roadmap candidate until the integration boundary and release-safety impact are documented."
  },
  {
    category: "New ecosystem expansion",
    reviewQuestion: "Is there enough repeated evidence to support a new ecosystem without diluting Node and Python quality?",
    requiredEvidence:
      "At least two representative repositories or fixtures, ecosystem metadata signals, and expected install/test command recognition.",
    nextAction: "Park until current Node and Python regressions are stable and fixture coverage is available."
  },
  {
    category: "Write-capable flow",
    reviewQuestion: "Would the request require `bootlane check` to write files, execute project scripts, or modify user repositories?",
    requiredEvidence: "Explicit write boundary, dry-run preview behavior, rollback or review safeguards, and command shape proposal.",
    nextAction: "Defer from the default check path and design an explicit opt-in fix command before implementation."
  },
  {
    category: "Out of scope",
    reviewQuestion: "Does the request depend on cloud accounts, telemetry, LLMs, vulnerability scanning, or network-only behavior?",
    requiredEvidence: "Rationale that links the request to Bootlane's local-first setup-readiness scope.",
    nextAction: "Close with rationale or redirect to a future optional integration discussion."
  }
];

export const roadmapCandidateBacklogStatuses = [
  {
    status: "Collecting evidence",
    meaning: "The idea is plausible, but maintainers still need reports, fixtures, or workflow examples before planning work."
  },
  {
    status: "Ready for fixture",
    meaning: "The idea is small enough to become a failing fixture or focused test before implementation."
  },
  {
    status: "Parked",
    meaning: "The idea may fit later, but current release quality or evidence is not strong enough to prioritize it."
  },
  {
    status: "Deferred",
    meaning: "The idea needs a larger design boundary and should not enter the current milestone."
  },
  {
    status: "Closed out of scope",
    meaning: "The idea does not fit Bootlane's local-first setup-readiness scope in the default product path."
  }
];

export const roadmapCandidateBacklog = [
  {
    candidate: "Real-world accuracy fixture expansion",
    category: "Small deterministic check",
    target: "0.2.0",
    evidenceStatus: "Collecting evidence",
    requiredEvidence:
      "Representative public repositories or minimized fixtures that reproduce false positives or missing detections.",
    reviewTrigger: "The first post-launch feedback batch contains repeated Node or Python setup-readiness misses.",
    nextAction: "Collect fixture candidates before changing detectors, scanners, or scoring."
  },
  {
    candidate: "Env var scanning precision pass",
    category: "Small deterministic check",
    target: "0.2.0",
    evidenceStatus: "Ready for fixture",
    requiredEvidence:
      "False-positive or missed-detection examples for supported env access patterns, comments, strings, and placeholder values.",
    reviewTrigger: "Two or more reports mention env example noise, missed env vars, or confusing env guidance.",
    nextAction: "Add focused fixtures before changing scanning heuristics."
  },
  {
    candidate: "GitHub integration improvements",
    category: "Integration or output workflow",
    target: "0.3.0",
    evidenceStatus: "Parked",
    requiredEvidence:
      "Examples where plain `npx bootlane@latest` workflow usage is not enough, plus desired annotations, comments, or artifact behavior.",
    reviewTrigger: "Users repeatedly ask for PR annotations, comments, caching, or a maintained workflow wrapper.",
    nextAction: "Design the integration boundary without changing default local `bootlane check` behavior."
  },
  {
    candidate: "Safe write-capable fix command",
    category: "Write-capable flow",
    target: "0.4.0",
    evidenceStatus: "Deferred",
    requiredEvidence:
      "Explicit command shape, dry-run diff preview, user confirmation or write flag, and rollback or review safeguards.",
    reviewTrigger: "Dry-run fix previews are stable and users explicitly request opt-in writes.",
    nextAction: "Design `bootlane fix` or an equivalent opt-in path outside `bootlane check`."
  },
  {
    candidate: "New ecosystem support beyond Node and Python",
    category: "New ecosystem expansion",
    target: "Future",
    evidenceStatus: "Parked",
    requiredEvidence:
      "At least two representative repositories or fixtures, stable metadata signals, and install/test command recognition for one ecosystem.",
    reviewTrigger: "Repeated requests cluster around one ecosystem and Node/Python quality remains stable.",
    nextAction: "Do not implement until fixture coverage and scope boundaries are available."
  },
  {
    candidate: "Cloud dashboard or telemetry",
    category: "Out of scope",
    target: "Not planned",
    evidenceStatus: "Closed out of scope",
    requiredEvidence: "Rationale for keeping Bootlane local-first and telemetry-free in the default product.",
    reviewTrigger: "Only revisit if a separate optional product direction is intentionally scoped.",
    nextAction: "Close default-path requests with local-first rationale."
  }
];

export const accuracyWorkIntakeLanes = [
  {
    lane: "False-positive reduction",
    roadmapCandidate: "Real-world accuracy fixture expansion",
    source: "Confirmed reports where Bootlane reports a finding that should not appear for the project shape.",
    requiredFixture: "A minimal fixture or focused unit test that reproduces the noisy finding before the fix.",
    priorityRule: "Prioritize high-confidence checks, common setup patterns, and reports that would make users distrust the first run.",
    implementationGate: "Enter implementation only after the expected absence, severity change, confidence change, or message change is documented."
  },
  {
    lane: "Missing-detection coverage",
    roadmapCandidate: "Real-world accuracy fixture expansion",
    source: "Reports where Bootlane misses a Node, Python, package-manager, env, runtime, test, README, or CI signal.",
    requiredFixture: "A minimal fixture containing the missed signal plus a failing expectation for the intended finding or report field.",
    priorityRule: "Prioritize repeated project shapes, supported Node/Python metadata, and misses that affect run readiness more than score cosmetics.",
    implementationGate: "Enter implementation only after the signal source, expected check ID or report field, and existing happy-path impact are known."
  },
  {
    lane: "Env var precision",
    roadmapCandidate: "Env var scanning precision pass",
    source: "Reports about env var false positives, missed env access, placeholder handling, comments, strings, or confusing env guidance.",
    requiredFixture: "Focused env fixtures that cover source access, comments, string examples, placeholders, and .env.example expectations.",
    priorityRule: "Prioritize cases that affect supported access patterns before adding new syntax or broader scanning rules.",
    implementationGate: "Enter implementation only after redaction behavior, expected env names, and non-source ignore behavior are covered."
  },
  {
    lane: "Package-manager command recognition",
    roadmapCandidate: "Real-world accuracy fixture expansion",
    source: "Reports where README or CI command recognition misses npm, pnpm, Yarn, Bun, pip, uv, Poetry, or Pipenv setup patterns.",
    requiredFixture: "A minimal README or workflow fixture with the command form plus expected install, run, or test signal behavior.",
    priorityRule: "Prioritize package managers already supported in 0.1.0 and command forms repeated across more than one report.",
    implementationGate: "Enter implementation only after README and CI behavior can share or intentionally separate the command recognition rule."
  },
  {
    lane: "Report clarity and scoring adjustment",
    roadmapCandidate: "Real-world accuracy fixture expansion",
    source: "Reports where the detection is technically correct but severity, confidence, score impact, or wording misleads users.",
    requiredFixture: "A snapshot or focused reporter/scoring test that shows the confusing output before the change.",
    priorityRule: "Prioritize wording and severity fixes over detector rewrites when the underlying detection is correct.",
    implementationGate: "Enter implementation only after JSON schema stability, check ID stability, and Markdown example impact are reviewed."
  }
];

export const accuracyWorkPrioritizationRules = [
  {
    priority: "P0 trust regression",
    appliesTo: "False positives that make a supported project look unsafe, broken, or impossible to run when the evidence says otherwise.",
    requiredEvidence: "Reproduction command, finding ID, minimal fixture, expected output, and why the current result damages first-run trust.",
    action: "Fix before adding broader detection or new roadmap work."
  },
  {
    priority: "P1 repeated supported miss",
    appliesTo: "Missing detections repeated across supported Node or Python project shapes.",
    requiredEvidence: "Two related reports or one representative public repo plus a minimized fixture and expected signal behavior.",
    action: "Schedule for 0.2.0 once existing happy-path fixtures remain stable."
  },
  {
    priority: "P2 precision polish",
    appliesTo: "Env, README, CI, package-manager, scoring, or wording issues that are correctable with focused fixtures.",
    requiredEvidence: "Focused fixture or snapshot plus expected severity, confidence, score, or message change.",
    action: "Batch with nearby accuracy work to avoid churn across check IDs and report examples."
  },
  {
    priority: "P3 speculative expansion",
    appliesTo: "Requests for new syntax, ecosystem expansion, integrations, or broad heuristics without repeated evidence.",
    requiredEvidence: "Roadmap candidate category, review trigger, and reason the work is not yet fixture-ready.",
    action: "Keep in the Roadmap backlog instead of entering implementation."
  }
];

export const accuracyFixtureIntakeFields = [
  {
    field: "Accuracy lane",
    purpose: "Map the report to a 0.2.0 Accuracy Work Intake lane before implementation planning.",
    requiredFor: "false-positive, missing-detection, and accuracy PRs"
  },
  {
    field: "Accuracy priority",
    purpose: "Capture P0, P1, P2, or P3 priority based on trust impact, supported-signal repetition, and fixture quality.",
    requiredFor: "false-positive, missing-detection, and accuracy PRs"
  },
  {
    field: "Fixture target",
    purpose: "Name the expected `examples/fixtures` directory, focused unit test, or snapshot that should fail before the fix.",
    requiredFor: "false-positive, missing-detection, and accuracy PRs"
  },
  {
    field: "Expected output",
    purpose: "Describe the finding absence, new finding, report field, severity, confidence, score, or message expected after the fix.",
    requiredFor: "false-positive, missing-detection, and accuracy PRs"
  },
  {
    field: "Happy-path impact",
    purpose: "Explain which existing Node or Python happy-path fixtures should remain stable after the change.",
    requiredFor: "false-positive, missing-detection, and accuracy PRs"
  }
];

export const accuracyFixtureCaseMatrix = [
  {
    lane: "False-positive reduction",
    caseType: "Noisy finding suppression fixture",
    minimalFiles: "Smallest project fixture or focused unit test that triggers the noisy finding ID without unrelated setup gaps.",
    expectedReportDiff:
      "The finding is absent, or its severity, confidence, score impact, or message changes exactly as recorded in Expected output.",
    protectsHappyPath:
      "`examples/fixtures/node-good` and `examples/fixtures/python-good` still pass with unchanged finding counts unless the PR documents an intentional report-only diff.",
    readyWhen: "The fixture fails before the fix, passes after the fix, and the happy-path fixture results are recorded."
  },
  {
    lane: "Missing-detection coverage",
    caseType: "Missed supported signal fixture",
    minimalFiles:
      "Smallest fixture containing the missed Node, Python, package-manager, env, runtime, test, README, or CI signal.",
    expectedReportDiff:
      "A new finding, check ID, report field, or command signal appears with the documented severity, confidence, and score impact.",
    protectsHappyPath:
      "`examples/fixtures/node-good` and `examples/fixtures/python-good` stay false-positive-free for the touched detector or shared signal helper.",
    readyWhen: "The expected report diff is asserted in a focused test and no supported happy-path fixture gains a new finding."
  },
  {
    lane: "Env var precision",
    caseType: "Env access and ignore fixture",
    minimalFiles:
      "Focused source, comment, string-example, and `.env.example` files that isolate the reported env access or placeholder behavior.",
    expectedReportDiff: "Env names are detected, ignored, or redacted exactly as expected without exposing full secret values.",
    protectsHappyPath: "Node and Python happy-path fixtures keep their env example status and secret redaction behavior stable.",
    readyWhen:
      "Source access, non-source ignores, placeholder handling, and redaction behavior are covered by fixtures or snapshots."
  },
  {
    lane: "Package-manager command recognition",
    caseType: "README or workflow command fixture",
    minimalFiles:
      "Minimal README or GitHub Actions workflow plus package metadata needed to identify the package manager and command role.",
    expectedReportDiff:
      "Install, run, or test command recognition changes only for the documented package manager and command form.",
    protectsHappyPath:
      "`examples/fixtures/node-good`, `examples/fixtures/python-good`, and related README/CI command fixtures keep existing command recognition results.",
    readyWhen:
      "README and CI behavior either share the rule or the PR documents why the command should stay surface-specific."
  },
  {
    lane: "Report clarity and scoring adjustment",
    caseType: "Reporter, snapshot, or scoring fixture",
    minimalFiles:
      "Focused reporter, Markdown, JSON, terminal, or scoring test that captures the confusing severity, confidence, score, or wording.",
    expectedReportDiff:
      "Only the documented message, severity, confidence, score, or presentation field changes without JSON schema drift.",
    protectsHappyPath: "Existing Node and Python happy-path report snapshots keep stable check IDs and report shape.",
    readyWhen: "Schema version impact, check ID stability, and regenerated Markdown examples are reviewed before merge."
  }
];

export const accuracyFixtureSeedBacklog = [
  {
    seed: "Happy-path false-positive guard",
    lane: "False-positive reduction",
    matrixCase: "Noisy finding suppression fixture",
    priority: "P0 trust regression",
    targetArtifact:
      "`examples/fixtures/node-good`, `examples/fixtures/python-good`, or a minimized sibling fixture that reproduces the noisy finding.",
    trigger:
      "A supported Node or Python project gets a finding that would make a clean first run look unsafe, broken, or impossible.",
    expectedFirstTest:
      "The noisy finding is absent or downgraded exactly as recorded while unrelated setup findings stay unchanged.",
    happyPathGuard: "`examples/fixtures/node-good` and `examples/fixtures/python-good` keep unchanged finding counts.",
    nextAction: "Create the failing fixture or focused unit test before changing detector thresholds."
  },
  {
    seed: "Supported signal miss guard",
    lane: "Missing-detection coverage",
    matrixCase: "Missed supported signal fixture",
    priority: "P1 repeated supported miss",
    targetArtifact:
      "`examples/fixtures/node-ci-missing-*`, `examples/fixtures/python-ci-missing-*`, or a minimized fixture for the missed supported signal.",
    trigger: "Two reports or one representative public repo show Bootlane missing a supported setup-readiness signal.",
    expectedFirstTest:
      "The expected finding, check ID, report field, or command signal appears with documented severity and confidence.",
    happyPathGuard:
      "`examples/fixtures/node-good` and `examples/fixtures/python-good` stay false-positive-free for the touched signal helper.",
    nextAction: "Add a focused failing test for the missed signal before expanding heuristics."
  },
  {
    seed: "Env placeholder precision guard",
    lane: "Env var precision",
    matrixCase: "Env access and ignore fixture",
    priority: "P2 precision polish",
    targetArtifact:
      "`examples/fixtures/node-env-comments`, `examples/fixtures/python-env-comments`, or a minimized env fixture for the reported placeholder behavior.",
    trigger: "Reports mention comments, string examples, placeholder `.env.example` values, or redaction confusion.",
    expectedFirstTest: "Detected env names, ignored non-source names, and redacted previews match Expected output.",
    happyPathGuard:
      "`examples/fixtures/node-missing-env`, `examples/fixtures/node-env-fallbacks`, `examples/fixtures/python-env-fallbacks`, and secret redaction tests keep expected behavior.",
    nextAction: "Add source, non-source, placeholder, and redaction assertions before changing env scanning rules."
  },
  {
    seed: "Package-manager command variant guard",
    lane: "Package-manager command recognition",
    matrixCase: "README or workflow command fixture",
    priority: "P2 precision polish",
    targetArtifact:
      "`examples/fixtures/node-pnpm-run-commands`, `examples/fixtures/node-npm-ci`, Python command fixtures, or a minimized README/workflow fixture.",
    trigger: "Repeated reports show a supported npm, pnpm, Yarn, Bun, pip, uv, Poetry, or Pipenv command form is missed.",
    expectedFirstTest: "Install, run, or test recognition changes only for the documented command form and surface.",
    happyPathGuard:
      "`examples/fixtures/node-good`, `examples/fixtures/python-good`, and existing README/CI command fixtures keep command recognition results.",
    nextAction: "Start in shared command helper tests before broadening README or CI heuristics."
  },
  {
    seed: "Report wording and score clarity guard",
    lane: "Report clarity and scoring adjustment",
    matrixCase: "Reporter, snapshot, or scoring fixture",
    priority: "P2 precision polish",
    targetArtifact:
      "`packages/core/test/reporters.test.ts`, `packages/core/test/scoring.test.ts`, or `examples/reports/node-missing-env.md` when Markdown output changes.",
    trigger: "Users report a technically correct finding whose severity, confidence, score impact, or wording implies the wrong action.",
    expectedFirstTest:
      "Only documented wording, severity, confidence, score, or presentation fields change; JSON schema version stays stable.",
    happyPathGuard: "Existing JSON, Markdown, terminal, and happy-path report snapshots keep stable check IDs and report shape.",
    nextAction: "Prefer reporter or scoring snapshot changes before detector rewrites when detection is correct."
  }
];

export const accuracySeedIssueRoutingFields = [
  {
    field: "Fixture seed",
    purpose: "Map first-batch 0.2.0 accuracy reports to the closest Fixture Seed Backlog seed or mark that a new seed is needed.",
    requiredFor: "false-positive and missing-detection reports"
  },
  {
    field: "Seed fit or new seed rationale",
    purpose: "Explain the matching trigger, expected first test, happy-path guard, or why the report needs a new seed.",
    requiredFor: "false-positive and missing-detection reports"
  }
];

export const accuracySeedTriageRouting = [
  {
    condition: "Known seed with enough reproduction detail",
    appliesWhen:
      "Fixture seed, Seed fit or new seed rationale, Fixture target, Expected output, and Happy-path impact are specific enough to write a failing fixture or focused test.",
    labels: "`needs-fixture`, plus `false-positive` or `missing-detection` from the issue form.",
    roadmapStatus: "Ready for fixture",
    maintainerAction: "Assign or invite implementation only after the expected first test and happy-path guard are explicit."
  },
  {
    condition: "Known seed with small isolated first test",
    appliesWhen:
      "The seed maps to one minimal fixture or focused unit test, the expected report diff is clear, and the touched code path is localized.",
    labels: "`good-first-issue`, `needs-fixture`, plus `false-positive` or `missing-detection` from the issue form.",
    roadmapStatus: "Ready for fixture",
    maintainerAction: "Offer as a first contribution only after naming the target artifact and verification command."
  },
  {
    condition: "Known seed but missing evidence",
    appliesWhen:
      "The seed is plausible, but reproduction details, expected output, fixture target, or happy-path impact are missing or too broad.",
    labels: "`needs-more-info`, plus `false-positive` or `missing-detection` from the issue form.",
    roadmapStatus: "Collecting evidence",
    maintainerAction: "Ask for the missing Seed Issue Routing Fields or minimal file list before implementation starts."
  },
  {
    condition: "New seed needed but accuracy-scoped",
    appliesWhen:
      "The report fits 0.2.0 accuracy work but does not match an existing Fixture Seed Backlog seed.",
    labels: "`needs-triage`, `needs-fixture`, plus `false-positive` or `missing-detection` from the issue form.",
    roadmapStatus: "Collecting evidence",
    maintainerAction: "Review whether to add a new seed, merge it into an existing seed, or keep collecting reports."
  },
  {
    condition: "Seed request is broad or outside current scope",
    appliesWhen:
      "The report depends on new ecosystems, integrations, write-capable behavior, network-only checks, telemetry, LLMs, or vulnerability scanning.",
    labels: "`enhancement` or `needs-more-info`; remove first-batch accuracy labels if the request leaves 0.2.0 accuracy scope.",
    roadmapStatus: "Parked",
    maintainerAction: "Run Roadmap Candidate Review and avoid implementation until the product boundary is explicit."
  }
];

export const accuracySeedBatchReviewCadence = [
  {
    review: "First accuracy feedback batch review",
    when: "After the first group of seed-routed false-positive or missing-detection reports arrives.",
    requiredInput: "Issues grouped by Fixture seed, Accuracy lane, Accuracy priority, and Seed Triage Routing outcome.",
    decision: "Promote repeated well-evidenced seeds to `Ready for fixture`, keep weak singletons in `Collecting evidence`, or ask for missing seed evidence.",
    record: "Update the issue comment or roadmap note with grouped issue links, chosen seed, roadmap status, and next fixture target."
  },
  {
    review: "Repeated seed consolidation review",
    when: "When two or more reports map to the same Fixture Seed Backlog seed or the same expected first test.",
    requiredInput: "Linked reports, shared expected first test, target artifact candidates, false-positive risk, and happy-path guard.",
    decision: "Merge duplicates, pick one representative fixture, and keep extra reports as evidence instead of opening parallel implementations.",
    record: "Record the canonical issue, duplicate links, selected target artifact, and verification commands before implementation starts."
  },
  {
    review: "Missing seed evidence review",
    when: "When seed-routed reports stay in `needs-more-info` or `Collecting evidence` after a follow-up window.",
    requiredInput: "Missing Seed Issue Routing Fields, maintainer follow-up comment, reporter response state, and current reproduction quality.",
    decision: "Keep collecting evidence, narrow the requested fixture, move to roadmap backlog, or close as not reproducible.",
    record: "Leave a closing or follow-up comment that names the missing field, next evidence request, or closure rationale."
  },
  {
    review: "New seed candidate review",
    when: "When reports select New seed needed or do not fit any existing Fixture Seed Backlog seed.",
    requiredInput: "Accuracy lane, priority, proposed seed trigger, expected first test, happy-path guard, and product-boundary check.",
    decision: "Add a new seed only if it is fixture-sized, in 0.2.0 accuracy scope, and not better merged into an existing seed.",
    record: "Update the Fixture Seed Backlog or document why the report remains `Collecting evidence`, `Parked`, or out of scope."
  },
  {
    review: "0.2.0 seed milestone readiness review",
    when: "Before opening or reshaping a 0.2.0 accuracy milestone from seed-routed reports.",
    requiredInput: "Ready-for-fixture seeds, owners, fixture targets, expected report diffs, happy-path guards, and release-candidate risk.",
    decision: "Select a small fixture-first batch and defer broad, risky, or weakly evidenced seeds until after stable fixes land.",
    record: "Record selected seeds, deferred seeds, rationale, and the verification command set expected for the milestone."
  }
];

export const accuracySeedEvidenceCommentTemplates = [
  {
    template: "Missing seed evidence request",
    useWhen:
      "A seed-routed report is plausible but lacks Fixture target, Expected output, Happy-path impact, or reproduction detail.",
    requiredInputs: "Issue link, Fixture seed, missing fields, narrow file list request, and follow-up window.",
    commentBody:
      "Thanks for the report. This looks like [Fixture seed], but we need [missing fields] before it can move from `Collecting evidence` to `Ready for fixture`. Please add the smallest file list or fixture target, expected output, and happy-path impact.",
    followUp: "Keep `needs-more-info` until the missing evidence arrives, then rerun Seed Triage Routing."
  },
  {
    template: "Canonical fixture target confirmation",
    useWhen:
      "A known seed has enough evidence and maintainers need to confirm the representative fixture or focused test before implementation.",
    requiredInputs:
      "Canonical issue, Fixture seed, target artifact, expected first test, expected report diff, and happy-path guard.",
    commentBody:
      "This report is routed to [Fixture seed]. We will use [target artifact] as the canonical fixture target and expect [expected first test]. Happy-path guard: [guard].",
    followUp:
      "Add `needs-fixture` or `good-first-issue` only after the target artifact and verification command are named."
  },
  {
    template: "Duplicate seed consolidation note",
    useWhen: "Two or more reports map to the same Fixture Seed Backlog seed or expected first test.",
    requiredInputs:
      "Canonical issue, duplicate issue links, selected target artifact, shared expected output, and verification commands.",
    commentBody:
      "These reports share [Fixture seed] and [expected first test]. We will keep [canonical issue] as the implementation issue, link the duplicates as evidence, and use [target artifact] for the first fixture.",
    followUp:
      "Close or mark duplicates only after the canonical issue records duplicate links and the selected fixture target."
  },
  {
    template: "New seed candidate decision",
    useWhen: "A report selects New seed needed or does not fit the current Fixture Seed Backlog.",
    requiredInputs:
      "Accuracy lane, priority, proposed seed trigger, expected first test, happy-path guard, and product-boundary check.",
    commentBody:
      "Seed decision: [add new seed, merge into existing seed, or keep collecting]. Rationale: [why]. Proposed trigger: [trigger]. Expected first test: [test]. Happy-path guard: [guard].",
    followUp:
      "Update Fixture Seed Backlog when accepted, or leave the issue in `Collecting evidence`, `Parked`, or out of scope with rationale."
  },
  {
    template: "0.2.0 seed milestone readiness decision",
    useWhen: "Maintainers select or defer seed-routed reports for a 0.2.0 accuracy milestone.",
    requiredInputs:
      "Selected seeds, deferred seeds, owners, fixture targets, expected report diffs, happy-path guards, and release-candidate risk.",
    commentBody:
      "0.2.0 seed batch decision: selected [seeds] for fixture-first work and deferred [seeds] because [rationale]. Required verification: [commands].",
    followUp: "Open or update the milestone only after selected seeds have owners, target artifacts, and verification commands."
  }
];

export const accuracySeedFixtureReadinessHandoff = [
  {
    handoff: "Known seed fixture-ready handoff",
    useWhen: "A known seed has enough evidence, a canonical fixture target, and a clear expected first test.",
    requiredInputs:
      "Canonical issue, Fixture seed, Accuracy lane, Accuracy priority, Fixture target, Expected output, Happy-path impact, and expected first test.",
    readySignal:
      "The target artifact is narrow enough for one failing fixture or focused test before detector, reporter, or scoring changes start.",
    implementationBoundary:
      "Open implementation only for the named fixture target and expected report diff; keep unrelated detector expansion out of the first PR.",
    record: "Record the owner, fixture target, expected report diff, happy-path guard, and verification commands in the issue or PR."
  },
  {
    handoff: "Consolidated duplicate seed handoff",
    useWhen: "Seed Batch Review Cadence selects one canonical issue from duplicate reports or shared expected first tests.",
    requiredInputs:
      "Canonical issue, duplicate issue links, shared Fixture seed, selected target artifact, shared expected output, and verification commands.",
    readySignal: "One representative fixture can cover the duplicate reports while extra reports remain linked as evidence.",
    implementationBoundary:
      "Do not open parallel implementation PRs for duplicate seed reports until the canonical fixture result is known.",
    record:
      "Record duplicate links, selected fixture target, why it represents the batch, and where extra evidence will be revisited."
  },
  {
    handoff: "New seed accepted handoff",
    useWhen: "A New seed needed report is accepted as fixture-sized 0.2.0 accuracy work.",
    requiredInputs:
      "Accuracy lane, priority, proposed seed trigger, matrix case, expected first test, happy-path guard, and product-boundary check.",
    readySignal: "The accepted seed maps to a known accuracy lane, Fixture Case Matrix row, priority rule, and target artifact.",
    implementationBoundary:
      "Update the Fixture Seed Backlog or leave a tracked roadmap note before opening detector, reporter, or scoring changes.",
    record:
      "Record whether the seed was added, merged into an existing seed, or kept as a one-off fixture candidate with rationale."
  },
  {
    handoff: "Milestone seed batch handoff",
    useWhen: "Maintainers select seed-routed reports for a 0.2.0 accuracy milestone or implementation batch.",
    requiredInputs:
      "Selected seeds, deferred seeds, owners, fixture targets, expected report diffs, happy-path guards, and release-candidate risk.",
    readySignal: "Every selected seed has an owner, one target artifact, one expected first test, and verification commands.",
    implementationBoundary:
      "Keep the milestone batch small and fixture-first; defer broad, risky, or weakly evidenced seeds until stable fixes land.",
    record: "Record selected and deferred seeds, owners, rationale, target artifacts, and verification command set."
  },
  {
    handoff: "Not-ready seed evidence handoff",
    useWhen: "A seed-routed report remains too broad, missing evidence, or outside the current 0.2.0 accuracy boundary.",
    requiredInputs: "Missing fields, current labels, roadmap status, maintainer comment link, and follow-up window.",
    readySignal: "The report is explicitly not ready for fixture implementation and stays in `Collecting evidence`, `Parked`, or out of scope.",
    implementationBoundary:
      "Do not start detector, reporter, scoring, or fixture implementation until Seed Triage Routing produces a fixture-ready outcome.",
    record: "Record the missing evidence, current status, next evidence request, or closure rationale."
  }
];

export const accuracySeedVerificationCommandSets = [
  {
    set: "Seed triage docs-only verification",
    useWhen: "The change only updates seed routing, comments, handoff records, or roadmap planning without implementation code.",
    commands:
      "`pnpm docs:check-triage`, `pnpm docs:check-templates`, `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, `pnpm docs:check-contributing`, and `pnpm release:gates:check`.",
    requiredRecord: "Record the changed seed contract section, affected docs, and focused docs checks that passed.",
    escalation:
      "Run `pnpm verify:release` before merging any release-surface or PR-template change, or when multiple seed contract sections changed together."
  },
  {
    set: "Fixture-ready implementation verification",
    useWhen: "A known seed or accepted new seed enters a fixture-first implementation PR.",
    commands:
      "`pnpm build`, `pnpm test`, `pnpm docs:check-triage`, `pnpm docs:check-templates`, `pnpm docs:check-ids`, and `pnpm smoke:bin`.",
    requiredRecord:
      "Record the failing fixture or focused test, expected report diff, happy-path guard output, and check ID or schema impact.",
    escalation:
      "Run `pnpm example:report:check` and `pnpm verify:release` when Markdown/JSON output, scoring, package behavior, or release docs change."
  },
  {
    set: "Duplicate seed consolidation verification",
    useWhen: "A canonical fixture is selected from duplicate seed-routed reports.",
    commands: "`pnpm test`, `pnpm docs:check-triage`, and `pnpm docs:check-templates`.",
    requiredRecord:
      "Record canonical issue, duplicate links, selected target artifact, shared expected first test, and why extra reports stay evidence-only.",
    escalation:
      "Run the fixture-ready implementation verification set when the consolidation PR also adds or changes fixtures or code."
  },
  {
    set: "New seed accepted verification",
    useWhen: "A New seed needed report becomes a new Fixture Seed Backlog entry or tracked one-off fixture candidate.",
    commands:
      "`pnpm docs:check-triage`, `pnpm docs:check-templates`, `pnpm docs:check-changelog`, `pnpm docs:check-contributing`, and `pnpm release:gates:check`.",
    requiredRecord:
      "Record accuracy lane, Fixture Case Matrix row, priority rule, target artifact, expected first test, happy-path guard, and product-boundary rationale.",
    escalation: "Run `pnpm verify:release` when the seed backlog, PR template, issue forms, or release-surface docs change."
  },
  {
    set: "Milestone seed batch verification",
    useWhen: "Maintainers select or defer seed-routed reports for a 0.2.0 accuracy milestone or implementation batch.",
    commands:
      "`pnpm docs:check-triage`, `pnpm docs:check-templates`, `pnpm docs:check-release-blockers`, and `pnpm release:gates:check`.",
    requiredRecord:
      "Record selected seeds, deferred seeds, owners, fixture targets, happy-path guards, release-candidate risk, and planned verification command set.",
    escalation:
      "Run `pnpm verify:release` before reshaping a milestone that also changes release evidence, launch docs, PR template, package behavior, or report examples."
  }
];

export const accuracySeedEvidenceRecordFields = [
  {
    field: "Seed evidence record location",
    purpose: "Point to the issue comment, PR section, milestone note, or roadmap note that owns the seed evidence record.",
    requiredFor: "seed-routed comments, handoffs, PRs, and milestone decisions",
    completionSignal: "A reviewer can find the current seed decision without reading scattered comments."
  },
  {
    field: "Canonical issue or report links",
    purpose: "Name the canonical issue plus duplicate, related, or reporter-provided evidence links used for the decision.",
    requiredFor: "duplicate consolidation, known seed handoff, and milestone seed batch decisions",
    completionSignal: "The record explains which report drives implementation and which reports remain supporting evidence."
  },
  {
    field: "Seed route summary",
    purpose: "Summarize Fixture seed, Accuracy lane, Accuracy priority, Seed Triage Routing outcome, and roadmap status.",
    requiredFor: "all first-batch 0.2.0 seed-routed accuracy work",
    completionSignal: "The record can be checked against Fixture Seed Backlog, Seed Triage Routing, and Candidate Statuses."
  },
  {
    field: "Fixture readiness summary",
    purpose: "Record target artifact, expected first test, expected report diff, happy-path guard, and implementation boundary.",
    requiredFor: "fixture-ready handoffs and seed-routed implementation PRs",
    completionSignal: "The first fixture or focused test can be written without broad detector, reporter, or scoring exploration."
  },
  {
    field: "Verification evidence summary",
    purpose: "Record the matching Seed Verification Command Sets entry, commands run, pass/fail result, and escalation decision.",
    requiredFor: "seed-routed comments, handoffs, PRs, and milestone decisions",
    completionSignal: "The record shows why focused checks were enough or why `pnpm verify:release` was run."
  },
  {
    field: "Next owner and follow-up",
    purpose: "Name the owner, next action, follow-up window, and closure or revisit condition.",
    requiredFor: "ready, collecting-evidence, parked, duplicate, and milestone seed outcomes",
    completionSignal: "The seed has a clear next step and cannot silently drift after triage."
  }
];

export const accuracySeedEvidenceRefreshRules = [
  {
    trigger: "Seed route changed",
    refreshWhen:
      "Fixture seed, Accuracy lane, Accuracy priority, Seed Triage Routing outcome, or roadmap status changes after the original record.",
    updateRecord: "Update Seed route summary, verification evidence summary, and next owner and follow-up.",
    rerun: "Run `pnpm docs:check-triage` and the matching Seed Verification Command Sets entry.",
    preventDrift: "Do not leave comments, PR templates, or roadmap notes pointing to the previous seed route."
  },
  {
    trigger: "Fixture target changed",
    refreshWhen:
      "Target artifact, expected first test, expected report diff, happy-path guard, or implementation boundary changes.",
    updateRecord: "Update Fixture readiness summary, canonical issue or report links, and verification evidence summary.",
    rerun: "Run the fixture-ready implementation verification set when fixtures or code changed; otherwise run docs-only verification.",
    preventDrift: "Do not start or review implementation against an obsolete target artifact or happy-path guard."
  },
  {
    trigger: "Verification scope changed",
    refreshWhen:
      "The selected Seed Verification Command Sets entry, command result, required record, or escalation condition changes.",
    updateRecord: "Update Verification evidence summary and Seed evidence record location.",
    rerun: "Run the newly selected command set and `pnpm verify:release` when escalation requires it.",
    preventDrift: "Do not reuse a previous green check to support a different command set or broader implementation scope."
  },
  {
    trigger: "Duplicate or canonical issue changed",
    refreshWhen: "A duplicate is reopened, a new related report arrives, or maintainers change the canonical issue.",
    updateRecord: "Update Canonical issue or report links, Seed route summary, and next owner and follow-up.",
    rerun: "Run duplicate seed consolidation verification and update Seed Batch Review Cadence records.",
    preventDrift: "Do not close or implement from a stale canonical issue after the duplicate set changes."
  },
  {
    trigger: "Milestone or owner changed",
    refreshWhen: "Selected seeds, deferred seeds, owner, follow-up window, milestone scope, or release-candidate risk changes.",
    updateRecord: "Update Next owner and follow-up, Verification evidence summary, and Seed evidence record location.",
    rerun: "Run milestone seed batch verification and escalate to `pnpm verify:release` if release-surface docs changed.",
    preventDrift: "Do not leave milestone notes with stale owners, deferred seeds, or verification expectations."
  }
];

export const accuracySeedEvidenceAuditChecklist = [
  {
    item: "Record location is current",
    reviewQuestion: "Can a reviewer find the active seed evidence record without reading scattered comments?",
    requiredEvidence: "Seed evidence record location plus the latest issue comment, PR section, milestone note, or roadmap note.",
    passWhen: "The record location points to the latest seed route, refresh state, verification evidence, owner, and follow-up.",
    ifMissing: "Apply Seed Evidence Record Fields and Seed Evidence Refresh Rules before closing, promoting, or handing off the seed."
  },
  {
    item: "Route and status are synchronized",
    reviewQuestion: "Do Fixture seed, Accuracy lane, Accuracy priority, Seed Triage Routing outcome, and roadmap status agree?",
    requiredEvidence: "Seed route summary, Fixture Seed Backlog entry, Seed Triage Routing row, and Candidate Statuses value.",
    passWhen: "The seed route points to one current status and no stale route remains in comments, PR text, or roadmap notes.",
    ifMissing: "Refresh the seed route record and rerun the matching Seed Verification Command Sets entry."
  },
  {
    item: "Fixture readiness is reviewable",
    reviewQuestion: "Can the first fixture or focused test be written from the recorded target and expected output?",
    requiredEvidence: "Fixture readiness summary, target artifact, expected first test, expected report diff, and happy-path guard.",
    passWhen: "Implementation can start with one target artifact and a bounded report diff without broad detector exploration.",
    ifMissing: "Keep the issue in `Collecting evidence` or `needs-more-info` until Seed Fixture Readiness Handoff is complete."
  },
  {
    item: "Verification evidence matches scope",
    reviewQuestion: "Do recorded commands match the current seed route, implementation boundary, and escalation condition?",
    requiredEvidence: "Seed Verification Command Sets entry, command results, pass/fail state, and escalation decision.",
    passWhen: "Focused checks or `pnpm verify:release` match the latest route, target, and release-surface impact.",
    ifMissing: "Rerun the correct command set before review, closure, promotion, or milestone update."
  },
  {
    item: "Duplicates and owners are settled",
    reviewQuestion: "Are canonical issue links, duplicate links, owner, follow-up window, and next action explicit?",
    requiredEvidence: "Canonical issue or report links plus Next owner and follow-up.",
    passWhen: "There is one canonical issue or record, duplicate evidence is linked, and the next owner or closure path is clear.",
    ifMissing: "Run duplicate seed consolidation or milestone seed batch verification before changing labels or closing reports."
  }
];

export const accuracySeedAuditOutcomeRouting = [
  {
    outcome: "Fixture implementation ready",
    appliesWhen:
      "Seed Evidence Audit Checklist passes and Seed Fixture Readiness Handoff names one owner, target artifact, expected first test, happy-path guard, and verification command set.",
    requiredEvidence:
      "Current seed evidence record, passing audit checklist, Fixture Case Matrix row, expected report diff, and matching Seed Verification Command Sets entry.",
    routeTo:
      "`Ready for fixture`, `needs-fixture`, or a fixture-first implementation PR without changing detector, reporter, or scoring code first.",
    maintainerAction:
      "Open or approve the fixture-first PR path, keep the batch small, and require the first failing fixture or focused test before implementation.",
    record:
      "Record the ready outcome, owner, target artifact, expected first test, happy-path guard, selected command set, and review request condition."
  },
  {
    outcome: "Needs more seed evidence",
    appliesWhen:
      "One or more audit items fail because reproduction, fixture target, expected output, happy-path impact, canonical links, owner, or verification evidence is missing.",
    requiredEvidence:
      "Failed audit item, missing Seed Evidence Record Fields, missing Fixture Intake Fields, and the narrow evidence request.",
    routeTo:
      "`Collecting evidence` with `needs-more-info` or `needs-fixture` labels, depending on whether the missing piece is reporter evidence or a maintainer-owned fixture target.",
    maintainerAction:
      "Leave a Seed Evidence Comment Templates missing-evidence comment, name the narrow missing fields, and set a follow-up window before closure.",
    record: "Record failed audit items, missing fields, requested evidence, current labels, owner, and follow-up or close-after date."
  },
  {
    outcome: "Duplicate consolidated evidence-only",
    appliesWhen: "Audit finds related reports share the same fixture target, expected first test, or canonical issue.",
    requiredEvidence:
      "Canonical issue or report links, duplicate links, shared expected first test, selected target artifact, and duplicate consolidation verification.",
    routeTo: "One canonical issue or evidence record, with duplicates linked as evidence-only support and no extra implementation batch.",
    maintainerAction:
      "Keep the canonical issue open for implementation or evidence collection, close duplicates only with links, and avoid duplicate fixture work.",
    record: "Record canonical issue, duplicate links, selected target artifact, shared expected first test, and duplicate closure rationale."
  },
  {
    outcome: "Parked roadmap evidence",
    appliesWhen:
      "Audit passes the product boundary but the work is too broad, weakly evidenced, risky for 0.2.0, or not fixture-sized yet.",
    requiredEvidence: "Roadmap candidate category, evidence status, review trigger, deferral rationale, and next review window.",
    routeTo: "`Collecting evidence`, `Parked`, or `Deferred` in the Roadmap Candidate Backlog.",
    maintainerAction:
      "Update the roadmap candidate or milestone note, explain why implementation is not starting, and wait for stronger fixture evidence.",
    record: "Record roadmap status, review trigger, current evidence, deferral rationale, owner, and revisit condition."
  },
  {
    outcome: "Closed out of scope",
    appliesWhen:
      "Audit shows the request depends on cloud accounts, telemetry, LLMs, vulnerability scanning, network-only behavior, or default-path writes.",
    requiredEvidence: "Local-first setup-readiness rationale, product-boundary note, and any optional future discussion link.",
    routeTo: "`Closed out of scope` with local-first setup-readiness rationale.",
    maintainerAction:
      "Close the issue without fixture or detector work and make clear that default `bootlane check` stays local, read-only, and deterministic.",
    record: "Record the out-of-scope reason, boundary cited, closure link, and whether any optional future discussion remains open."
  },
  {
    outcome: "Milestone batch ready or deferred",
    appliesWhen: "Audit is used during a 0.2.0 milestone or batch review with selected and deferred seed-routed reports.",
    requiredEvidence:
      "Seed Batch Review Cadence record, selected seeds, deferred seeds, owners, target artifacts, release-candidate risk, and verification command set.",
    routeTo:
      "A small selected milestone batch, a deferred seed list, or a follow-up evidence batch without changing the default `bootlane check` path.",
    maintainerAction:
      "Record selected and deferred seeds, keep broad work out of the batch, and rerun milestone seed batch verification before reshaping scope.",
    record: "Record selected seeds, deferred seeds, owners, target artifacts, risk notes, command set, and next milestone decision date."
  }
];

export const accuracySeedAuditOutcomeRecordTemplates = [
  {
    template: "Fixture implementation ready record",
    outcome: "Fixture implementation ready",
    useWhen: "The audit passes and the next state is a fixture-first implementation PR or `Ready for fixture` issue.",
    requiredInputs:
      "Seed evidence record location, owner, target artifact, expected first test, expected report diff, happy-path guard, selected Seed Verification Command Sets entry, and review request condition.",
    recordBody:
      "Record ready outcome, fixture target, first failing test, expected report diff, happy-path guard, command set, implementation boundary, and reviewer handoff.",
    followUp: "Open or update the implementation PR only after the failing fixture or focused test is named."
  },
  {
    template: "Needs more seed evidence record",
    outcome: "Needs more seed evidence",
    useWhen: "The audit fails because required reproduction, fixture target, expected output, owner, canonical links, or verification evidence is missing.",
    requiredInputs:
      "Failed audit items, missing Seed Evidence Record Fields, missing Fixture Intake Fields, current labels, requested evidence, owner, and follow-up window.",
    recordBody:
      "Record failed audit items, missing fields, exact evidence request, current route, owner, follow-up window, and close-after condition.",
    followUp: "Leave the matching Seed Evidence Comment Templates missing-evidence comment and do not start implementation."
  },
  {
    template: "Duplicate consolidated evidence-only record",
    outcome: "Duplicate consolidated evidence-only",
    useWhen: "The audit finds related reports share one canonical issue, fixture target, or expected first test.",
    requiredInputs:
      "Canonical issue or report links, duplicate links, selected target artifact, shared expected first test, duplicate consolidation verification, and closure rationale.",
    recordBody:
      "Record canonical issue, duplicate evidence links, selected fixture target, shared expected first test, verification result, and why extra reports stay evidence-only.",
    followUp: "Close duplicates only with links to the canonical record and avoid opening duplicate fixture work."
  },
  {
    template: "Parked roadmap evidence record",
    outcome: "Parked roadmap evidence",
    useWhen: "The audit passes the product boundary but the work is too broad, weakly evidenced, risky, or not fixture-sized for 0.2.0.",
    requiredInputs:
      "Roadmap candidate category, evidence status, review trigger, current evidence, deferral rationale, owner, and revisit condition.",
    recordBody:
      "Record roadmap status, evidence summary, why implementation is not starting, owner, next review window, and evidence needed to revisit.",
    followUp: "Update the roadmap candidate or milestone note and keep detector, reporter, scoring, or fixture implementation closed."
  },
  {
    template: "Closed out of scope record",
    outcome: "Closed out of scope",
    useWhen: "The audit confirms the request does not fit the local-first setup-readiness default path.",
    requiredInputs:
      "Out-of-scope reason, product boundary cited, local-first setup-readiness rationale, closure link, and optional future discussion link.",
    recordBody:
      "Record the boundary, why no fixture-backed action remains, why default `bootlane check` stays local and read-only, and whether any optional future discussion exists.",
    followUp: "Close without fixture, detector, scanner, reporter, scoring, network, or write-path implementation."
  },
  {
    template: "Milestone batch ready or deferred record",
    outcome: "Milestone batch ready or deferred",
    useWhen: "The audit supports a 0.2.0 milestone selection, deferral, or batch reshaping decision.",
    requiredInputs:
      "Seed Batch Review Cadence record, selected seeds, deferred seeds, owners, target artifacts, release-candidate risk, selected command set, and next milestone decision date.",
    recordBody:
      "Record selected seeds, deferred seeds, owners, target artifacts, risk notes, verification command set, batch boundary, and next decision date.",
    followUp: "Run milestone seed batch verification before reshaping scope and keep broad work out of the selected batch."
  }
];

export const accuracySeedFixtureImplementationBatchFields = [
  {
    field: "Batch scope",
    purpose: "Name the small 0.2.0 fixture-first batch and explain why the selected seed work belongs together.",
    requiredFor: "milestone notes and fixture-first implementation PRs",
    completionSignal: "A reviewer can tell which seed-routed reports are intentionally in scope and which nearby reports are not."
  },
  {
    field: "Selected and deferred seeds",
    purpose: "List selected seeds, deferred seeds, canonical issue links, and duplicate evidence-only links before implementation starts.",
    requiredFor: "milestone seed batch decisions and PRs that implement more than one seed-routed report",
    completionSignal: "The batch has one canonical work list and no duplicate or parked report can silently enter implementation."
  },
  {
    field: "Fixture implementation target",
    purpose: "Name the exact fixture directory, focused unit test, reporter snapshot, or Markdown/JSON example that will fail first.",
    requiredFor: "every fixture-first implementation PR",
    completionSignal: "Implementation can start by writing one failing fixture or focused test before detector, reporter, or scoring changes."
  },
  {
    field: "Expected first failure",
    purpose: "Describe the first failing assertion, finding absence or presence, severity, confidence, score, message, or report field.",
    requiredFor: "every selected seed and accepted new seed in an implementation batch",
    completionSignal: "Reviewers can compare the pre-fix failure with the expected post-fix report diff without broad exploration."
  },
  {
    field: "Happy-path guard set",
    purpose: "Name the Node and Python happy-path fixtures, related README/CI command fixtures, or reporter snapshots that must remain stable.",
    requiredFor: "false-positive, missing-detection, env precision, command recognition, and report clarity batches",
    completionSignal: "The batch records which existing behavior must not gain new findings, schema drift, or output churn."
  },
  {
    field: "Schema and check ID impact",
    purpose: "State whether JSON schema, check IDs, severity, confidence, score, Markdown examples, or report wording changes are expected.",
    requiredFor: "fixture-first PRs that touch reporting, scoring, check IDs, or public examples",
    completionSignal: "The PR either declares no schema/check ID impact or names the docs and examples that must be updated."
  },
  {
    field: "Verification plan",
    purpose: "Select the Seed Verification Command Sets entry plus any escalation to example report, smoke, docs, or full release verification.",
    requiredFor: "every fixture-first implementation batch and milestone batch reshaping decision",
    completionSignal: "The recorded commands match the implementation scope and explain when `pnpm verify:release` is required."
  },
  {
    field: "Batch stop condition",
    purpose: "Define when the batch must stop, split, or return to evidence collection because scope, risk, or fixture behavior changed.",
    requiredFor: "multi-seed batches, risky report changes, and milestone selections",
    completionSignal: "Maintainers can stop before broad detector, reporter, scoring, network, or write-path changes leak into the batch."
  }
];

export const accuracySeedFixtureImplementationBatchExecutionChecklist = [
  {
    step: "Lock batch scope before code",
    useWhen: "A seed-routed outcome is ready to enter a fixture-first implementation batch or PR.",
    requiredInput: "Batch scope, selected and deferred seeds, canonical issue links, owner, and batch stop condition.",
    passWhen: "The PR or milestone note names what is in scope, what is deferred, and why the batch is small enough to review.",
    stopIf: "New reports, duplicate links, or broad detector ideas change the batch boundary before the first fixture is written.",
    record: "Record the locked scope, selected seeds, deferred seeds, owner, and stop or split condition."
  },
  {
    step: "Write the first failing fixture",
    useWhen: "The batch has a fixture implementation target and expected first failure.",
    requiredInput: "Fixture implementation target, expected first failure, expected report diff, and happy-path guard set.",
    passWhen: "A focused fixture, unit test, snapshot, or report example fails for the expected reason before implementation code changes.",
    stopIf: "The failure cannot be reproduced, fails for an unrelated reason, or requires broad scanner exploration to explain.",
    record: "Record fixture path or test name, failing assertion, expected report diff, and unrelated failures if any."
  },
  {
    step: "Apply the smallest implementation change",
    useWhen: "The first failing fixture proves the intended behavior and happy-path guard set is known.",
    requiredInput: "Failing fixture output, implementation boundary, schema and check ID impact, and batch stop condition.",
    passWhen: "The selected fixture passes with the smallest detector, reporter, scoring, or fixture-support change that matches the recorded scope.",
    stopIf: "The fix requires new ecosystem support, network checks, write-path behavior, broad scoring changes, or unrelated report churn.",
    record: "Record touched implementation area, why the change is minimal, and any schema/check ID or report wording impact."
  },
  {
    step: "Run happy-path guards",
    useWhen: "The selected fixture passes after implementation changes.",
    requiredInput: "Happy-path guard set, expected unchanged findings, and verification plan.",
    passWhen: "Named happy-path fixtures, command fixtures, or report snapshots remain stable or intentional diffs are documented.",
    stopIf: "A supported happy-path fixture gains new findings, schema drift, output churn, or unexplained score changes.",
    record: "Record guard commands, stable outputs, intentional diffs, and any follow-up fixture needed."
  },
  {
    step: "Update public report surfaces",
    useWhen: "Schema and check ID impact or report wording impact is not explicitly `none`.",
    requiredInput: "Schema and check ID impact, Markdown/JSON example impact, docs targets, and verification plan escalation.",
    passWhen: "Check ID docs, report schema docs, Markdown examples, changelog notes, or snapshots match the intentional report change.",
    stopIf: "Report shape changes without a versioning decision, check ID drift is undocumented, or examples no longer match generated output.",
    record: "Record updated docs or examples, schema/check ID decision, generated report command, and remaining public-surface risk."
  },
  {
    step: "Close with matching verification",
    useWhen: "The selected fixture and guards pass and public report surfaces are updated or confirmed unchanged.",
    requiredInput: "Verification plan, command results, escalation decision, batch stop condition, and Seed Verification Command Sets entry.",
    passWhen: "Focused checks or `pnpm verify:release` match the final scope and the PR records fixture evidence, schema/check ID impact, and happy-path impact.",
    stopIf: "Commands do not match the final scope, escalation was skipped after public-surface changes, or the batch expanded beyond its locked scope.",
    record: "Record commands run, pass/fail result, escalation rationale, scope changes, and final review readiness."
  }
];

export const accuracySeedFixtureImplementationStarterBatches = [
  {
    batch: "Happy-path trust guard starter",
    selectedSeeds: "Happy-path false-positive guard",
    deferUntil: "Defer unrelated false-positive reports unless they reproduce the same finding ID or happy-path fixture drift.",
    firstFixtureTarget:
      "`examples/fixtures/node-good`, `examples/fixtures/python-good`, or a minimized sibling fixture that reproduces the noisy finding.",
    firstFailure:
      "The noisy finding appears before the fix or the expected severity, confidence, score, or message differs from the recorded output.",
    happyPathGuard: "`examples/fixtures/node-good` and `examples/fixtures/python-good` keep unchanged finding counts.",
    verification: "Fixture-ready implementation verification plus `pnpm verify:release` if report examples or release-surface docs change.",
    stopCondition: "Stop or split if the fix requires broad detector threshold changes or affects unrelated happy-path findings."
  },
  {
    batch: "Supported signal miss starter",
    selectedSeeds: "Supported signal miss guard",
    deferUntil: "Defer weak or one-off misses until two reports or one representative public repo identify the same supported signal.",
    firstFixtureTarget:
      "`examples/fixtures/node-ci-missing-*`, `examples/fixtures/python-ci-missing-*`, or a minimized fixture for the missed supported signal.",
    firstFailure: "The expected finding, check ID, report field, or command signal is absent before the fix.",
    happyPathGuard:
      "`examples/fixtures/node-good` and `examples/fixtures/python-good` stay false-positive-free for the touched signal helper.",
    verification: "Fixture-ready implementation verification and happy-path guard commands for the touched signal helper.",
    stopCondition: "Stop or split if the miss requires a new ecosystem, network-only signal, or project script execution."
  },
  {
    batch: "Env placeholder precision starter",
    selectedSeeds: "Env placeholder precision guard",
    deferUntil: "Defer new env syntax requests until source, non-source, placeholder, and redaction evidence are all explicit.",
    firstFixtureTarget:
      "`examples/fixtures/node-env-comments`, `examples/fixtures/python-env-comments`, or a minimized env fixture for the reported placeholder behavior.",
    firstFailure: "Detected env names, ignored non-source names, placeholder handling, or redacted previews differ from Expected output.",
    happyPathGuard:
      "`examples/fixtures/node-missing-env`, `examples/fixtures/node-env-fallbacks`, `examples/fixtures/python-env-fallbacks`, and secret redaction tests keep expected behavior.",
    verification: "Fixture-ready implementation verification plus secret redaction and Markdown/JSON report checks if output changes.",
    stopCondition: "Stop or split if the change risks printing secret values, scanning generated files broadly, or adding speculative syntax support."
  },
  {
    batch: "Package-manager command variant starter",
    selectedSeeds: "Package-manager command variant guard",
    deferUntil: "Defer unsupported package-manager or ecosystem requests until repeated evidence shows a supported command form is missed.",
    firstFixtureTarget:
      "`examples/fixtures/node-pnpm-run-commands`, `examples/fixtures/node-npm-ci`, Python command fixtures, or a minimized README/workflow fixture.",
    firstFailure: "Install, run, or test command recognition is missing or changes for the wrong surface before the fix.",
    happyPathGuard:
      "`examples/fixtures/node-good`, `examples/fixtures/python-good`, and existing README/CI command fixtures keep command recognition results.",
    verification: "Fixture-ready implementation verification plus command helper tests for the touched README or CI surface.",
    stopCondition: "Stop or split if README and CI behavior diverge unexpectedly or the fix broadens command parsing beyond supported managers."
  },
  {
    batch: "Report wording and score clarity starter",
    selectedSeeds: "Report wording and score clarity guard",
    deferUntil: "Defer detector changes when the underlying detection is correct and the user confusion is severity, confidence, score, or wording.",
    firstFixtureTarget:
      "`packages/core/test/reporters.test.ts`, `packages/core/test/scoring.test.ts`, or `examples/reports/node-missing-env.md` when Markdown output changes.",
    firstFailure: "The confusing wording, severity, confidence, score, or presentation field appears before the fix while schema version stays stable.",
    happyPathGuard: "Existing JSON, Markdown, terminal, and happy-path report snapshots keep stable check IDs and report shape.",
    verification: "Fixture-ready implementation verification plus `pnpm example:report:check` when Markdown output changes.",
    stopCondition: "Stop or split if the change requires JSON schema versioning, check ID churn, or detector rewrites instead of report clarity work."
  }
];

export const accuracySeedFixtureImplementationPrQueue = [
  {
    order: "PR-1",
    starterBatch: "Happy-path trust guard starter",
    focus: "Protect first-run trust by proving supported happy-path fixtures do not gain noisy findings.",
    dependsOn: "Seed Fixture Implementation Starter Batches entry is selected and Batch scope excludes unrelated false-positive reports.",
    readyWhen: "A single noisy finding ID or report diff is reproducible before the fix and happy-path guard counts are recorded.",
    verification:
      "Run fixture-ready implementation verification and `pnpm verify:release` if report examples, scoring, or release-surface docs change.",
    mergeGate: "Merge only when the first failing fixture passes and Node/Python happy-path finding counts remain stable or intentional diffs are recorded.",
    stopIf: "Stop if the change requires broad detector thresholds, unrelated finding suppression, or new report schema behavior."
  },
  {
    order: "PR-2",
    starterBatch: "Supported signal miss starter",
    focus: "Add one missed supported Node or Python setup-readiness signal without expanding ecosystem scope.",
    dependsOn: "PR-1 is merged or explicitly not affected, and the missed signal has repeated evidence or one representative public repo.",
    readyWhen: "The expected finding, check ID, report field, or command signal is absent in a focused fixture before the fix.",
    verification: "Run fixture-ready implementation verification plus happy-path guard commands for the touched signal helper.",
    mergeGate: "Merge only when the missed signal appears as documented and supported happy-path fixtures stay false-positive-free.",
    stopIf: "Stop if the fix depends on network-only signals, project script execution, or unsupported ecosystem metadata."
  },
  {
    order: "PR-3",
    starterBatch: "Env placeholder precision starter",
    focus: "Tighten env placeholder, non-source, and redaction behavior without exposing secret values.",
    dependsOn: "Secret redaction expectations are explicit and source/non-source env evidence is fixture-sized.",
    readyWhen: "A focused env fixture shows detected names, ignored examples, placeholder handling, or redacted previews differ from Expected output.",
    verification: "Run fixture-ready implementation verification plus secret redaction and Markdown/JSON report checks if output changes.",
    mergeGate: "Merge only when env detection or ignore behavior matches the fixture and no output prints full secret values.",
    stopIf: "Stop if the change scans generated files broadly, introduces speculative syntax support, or weakens redaction."
  },
  {
    order: "PR-4",
    starterBatch: "Package-manager command variant starter",
    focus: "Recognize one supported package-manager command variant in README or CI without broad parsing changes.",
    dependsOn: "A supported npm, pnpm, Yarn, Bun, pip, uv, Poetry, or Pipenv command form has repeated evidence.",
    readyWhen: "A README or workflow fixture misses install, run, or test command recognition before the fix.",
    verification: "Run fixture-ready implementation verification plus command helper tests for the touched README or CI surface.",
    mergeGate: "Merge only when the documented command form is recognized and existing README/CI command fixtures stay stable.",
    stopIf: "Stop if README and CI behavior diverge unexpectedly or parsing broadens beyond supported package managers."
  },
  {
    order: "PR-5",
    starterBatch: "Report wording and score clarity starter",
    focus: "Clarify severity, confidence, score, or wording when detection is correct but the report misleads users.",
    dependsOn: "The finding behavior is intentionally unchanged or the detector change was handled in an earlier PR.",
    readyWhen: "A reporter, scoring, terminal, JSON, or Markdown fixture captures the confusing output before the fix.",
    verification: "Run fixture-ready implementation verification plus `pnpm example:report:check` when Markdown output changes.",
    mergeGate: "Merge only when check IDs and schema version remain stable or documented, and regenerated examples match intentional output.",
    stopIf: "Stop if the clarity fix requires detector rewrites, JSON schema versioning, or undocumented check ID churn."
  }
];

export const accuracySeedFixtureImplementationQueuedPrReadinessChecklist = [
  {
    queueOrder: "PR-1",
    readinessCheck: "Happy-path noisy finding is reproducible",
    requiredEvidence: "One finding ID or report diff reproduced against a supported happy-path or minimized sibling fixture.",
    readyWhen: "The pre-fix output shows the noisy finding or documented severity, confidence, score, or message mismatch.",
    blockedWhen: "The finding cannot be reproduced or only appears with unrelated setup gaps.",
    record: "Record reproduction command, finding ID or report diff, fixture target, and unrelated findings that stay out of scope."
  },
  {
    queueOrder: "PR-1",
    readinessCheck: "Happy-path guard counts are baselined",
    requiredEvidence: "Node and Python happy-path fixture outputs or focused snapshots before implementation.",
    readyWhen: "Baseline finding counts and expected unchanged behavior are recorded before detector or reporter changes.",
    blockedWhen: "Happy-path fixture state is already drifting or expected unchanged behavior is not documented.",
    record: "Record guard commands, baseline counts, expected unchanged outputs, and `pnpm verify:release` escalation trigger."
  },
  {
    queueOrder: "PR-2",
    readinessCheck: "Supported missed signal is evidenced",
    requiredEvidence: "Two related reports or one representative public repo plus a minimized fixture candidate for the same supported signal.",
    readyWhen: "The missed Node or Python setup-readiness signal is local, deterministic, and inside current product scope.",
    blockedWhen: "The signal depends on network state, project script execution, unsupported ecosystem metadata, or weak one-off evidence.",
    record: "Record signal source, expected check ID or report field, fixture target, and why ecosystem scope stays unchanged."
  },
  {
    queueOrder: "PR-2",
    readinessCheck: "Touched signal helper guard is known",
    requiredEvidence: "Named happy-path fixtures or helper tests that should remain false-positive-free after the missed signal fix.",
    readyWhen: "The helper or detector boundary and stable guard outputs are known before implementation starts.",
    blockedWhen: "The fix path is unclear or would mix multiple detectors, helpers, or unrelated signal types in one PR.",
    record: "Record helper boundary, guard fixtures, expected unchanged outputs, and split condition for unrelated signals."
  },
  {
    queueOrder: "PR-3",
    readinessCheck: "Env evidence covers source and non-source behavior",
    requiredEvidence: "Source access, comments, string examples, placeholders, `.env.example`, and ignored non-source examples as applicable.",
    readyWhen: "The expected detected, ignored, placeholder, and redacted outputs are explicit before scanner changes.",
    blockedWhen: "The report requests broad env syntax support or lacks redaction expectations.",
    record: "Record env names, source/non-source files, placeholder expectations, redaction expectations, and fixture target."
  },
  {
    queueOrder: "PR-3",
    readinessCheck: "Secret redaction risk is bounded",
    requiredEvidence: "Secret redaction tests or report examples showing no full secret values should print after the change.",
    readyWhen: "Redaction expectations are explicit for terminal, JSON, Markdown, or scanner output touched by the PR.",
    blockedWhen: "The change could expose full secret values or requires scanning broad generated paths.",
    record: "Record redaction guard tests, report surfaces touched, and stop condition for unsafe output."
  },
  {
    queueOrder: "PR-4",
    readinessCheck: "Supported command variant is repeated",
    requiredEvidence: "Repeated evidence for one npm, pnpm, Yarn, Bun, pip, uv, Poetry, or Pipenv command form in README or CI.",
    readyWhen: "The command role, package manager, surface, and expected install/run/test recognition are explicit.",
    blockedWhen: "The command form is unsupported, ecosystem-specific beyond current scope, or ambiguous across README and CI.",
    record: "Record command form, surface, package manager, expected role, fixture target, and unsupported variants deferred."
  },
  {
    queueOrder: "PR-4",
    readinessCheck: "Command helper guard is scoped",
    requiredEvidence: "Existing README/CI command fixtures or helper tests expected to stay stable after the variant change.",
    readyWhen: "The PR can update one command helper or surface without broad parsing changes.",
    blockedWhen: "README and CI behavior diverge unexpectedly or the parser change would affect unrelated managers.",
    record: "Record helper boundary, stable command fixtures, expected unchanged recognition, and split condition."
  },
  {
    queueOrder: "PR-5",
    readinessCheck: "Report clarity issue is not a detector miss",
    requiredEvidence: "A reporter, scoring, terminal, JSON, or Markdown fixture showing correct detection but misleading output.",
    readyWhen: "The expected wording, severity, confidence, score, or presentation change is explicit and schema impact is known.",
    blockedWhen: "The issue actually requires detector behavior changes, JSON schema versioning, or check ID churn.",
    record: "Record report surface, current confusing output, expected output, schema/check ID impact, and detector-change deferral."
  },
  {
    queueOrder: "PR-5",
    readinessCheck: "Public report examples are identified",
    requiredEvidence: "Markdown example, report schema doc, check ID doc, or snapshot surfaces touched by wording or scoring changes.",
    readyWhen: "The PR knows whether `pnpm example:report:check`, docs updates, or snapshot updates are required.",
    blockedWhen: "Public report surfaces are affected but regeneration or schema/check ID docs are not planned.",
    record: "Record docs/examples to update, generation command, schema/check ID decision, and verification escalation."
  }
];

export const accuracySeedFixtureImplementationQueuedPrReviewHandoff = [
  {
    handoff: "Happy-path trust review handoff",
    queueOrder: "PR-1",
    useWhen: "Use after PR-1 queued readiness passes and before requesting review for the happy-path trust guard starter.",
    requiredInputs:
      "Queued readiness records, reproduction command, failing fixture or focused test, Node/Python happy-path baseline counts, and implementation diff summary.",
    reviewFocus:
      "Confirm the noisy finding is removed or downgraded only for the recorded target while unrelated happy-path findings stay unchanged.",
    mergeEvidence:
      "First failing fixture passes, happy-path finding counts match the baseline or intentional diffs are recorded, and verification results are linked.",
    fallback:
      "Return to readiness or split the PR if the fix suppresses unrelated findings, changes broad detector thresholds, or introduces report schema drift."
  },
  {
    handoff: "Supported signal miss review handoff",
    queueOrder: "PR-2",
    useWhen: "Use after PR-2 queued readiness passes and before requesting review for the supported signal miss starter.",
    requiredInputs:
      "Queued readiness records, missed signal evidence, fixture target, expected check ID or report field, helper boundary, and happy-path guard outputs.",
    reviewFocus:
      "Confirm one supported local signal is added without network-only checks, project script execution, unsupported ecosystem metadata, or helper spillover.",
    mergeEvidence:
      "Focused fixture fails before and passes after, expected signal appears with documented severity/confidence, and touched helper guards remain false-positive-free.",
    fallback:
      "Return to evidence collection or split if multiple signal types, ecosystem expansion, or unclear helper boundaries are required."
  },
  {
    handoff: "Env precision review handoff",
    queueOrder: "PR-3",
    useWhen: "Use after PR-3 queued readiness passes and before requesting review for the env placeholder precision starter.",
    requiredInputs:
      "Queued readiness records, source/non-source env examples, redaction expectations, fixture target, report surfaces touched, and secret redaction guard results.",
    reviewFocus:
      "Confirm env detection/ignore behavior changes only for recorded source and placeholder cases and no output prints full secret values.",
    mergeEvidence:
      "Env fixture passes, non-source ignores and placeholder handling match expected output, and redaction guards pass across touched terminal/JSON/Markdown surfaces.",
    fallback:
      "Block merge and return to readiness if full secret values could print, generated paths broaden scanning, or unsupported env syntax slips in."
  },
  {
    handoff: "Command variant review handoff",
    queueOrder: "PR-4",
    useWhen: "Use after PR-4 queued readiness passes and before requesting review for the package-manager command variant starter.",
    requiredInputs:
      "Queued readiness records, repeated command evidence, package manager, command role, README or CI surface, helper boundary, and stable command fixture outputs.",
    reviewFocus:
      "Confirm one supported command variant is recognized on the intended surface without broad parser changes or unrelated package-manager behavior changes.",
    mergeEvidence:
      "README/workflow fixture passes, documented install/run/test role is recognized, and existing command helper fixtures remain stable.",
    fallback:
      "Split or defer if README/CI behavior diverges, command role is ambiguous, or unsupported manager variants enter scope."
  },
  {
    handoff: "Report clarity review handoff",
    queueOrder: "PR-5",
    useWhen: "Use after PR-5 queued readiness passes and before requesting review for the report wording and score clarity starter.",
    requiredInputs:
      "Queued readiness records, current confusing report output, expected wording/severity/confidence/score, schema/check ID decision, and docs/examples to update.",
    reviewFocus:
      "Confirm the change is report clarity or scoring only unless an earlier PR already handled detector behavior.",
    mergeEvidence:
      "Reporter/scoring/snapshot fixture passes, check IDs and schema version are stable or documented, and public examples/docs are regenerated when touched.",
    fallback:
      "Return to detector queue or block merge if the fix needs detector rewrites, JSON schema versioning, or undocumented check ID churn."
  }
];

export const accuracySeedFixtureImplementationQueuedPrReviewOutcomeRouting = [
  {
    outcome: "Approved for fixture merge",
    handoffScope:
      "Happy-path trust review handoff, Supported signal miss review handoff, Env precision review handoff, Command variant review handoff, Report clarity review handoff",
    appliesWhen:
      "Reviewer confirms the matching handoff focus, merge evidence, fixture-first implementation boundary, and fallback checks all pass.",
    requiredEvidence:
      "Review approval, matching handoff, passing fixture and guard commands, read-only behavior confirmation, and public surface updates when touched.",
    routeTo: "Merge path for the queued PR without widening detector, reporter, scoring, schema, or example scope.",
    maintainerAction:
      "Merge only after final focused verification, or `pnpm verify:release` when report examples, scoring, schema docs, release-surface docs, or package surfaces changed.",
    record:
      "Record approval, handoff used, final verification commands, fixture and guard results, intentional report diffs, and merge link."
  },
  {
    outcome: "Changes requested within queued scope",
    handoffScope:
      "Happy-path trust review handoff, Supported signal miss review handoff, Env precision review handoff, Command variant review handoff, Report clarity review handoff",
    appliesWhen:
      "Reviewer finds issues that can be fixed inside the recorded queue order, handoff focus, fixture target, and public-surface boundary.",
    requiredEvidence:
      "Review comment, affected fixture or focused test, unchanged handoff scope, expected update, and verification commands to rerun.",
    routeTo: "Current queued PR revision without opening new detector, scanner, reporter, scoring, schema, or example-output scope.",
    maintainerAction:
      "Keep the PR open, update only the requested in-scope fixture or implementation detail, rerun focused verification, and refresh the handoff record.",
    record: "Record requested changes, in-scope rationale, files or fixtures touched, rerun commands, and updated review status."
  },
  {
    outcome: "Return to readiness",
    handoffScope:
      "Happy-path trust review handoff, Supported signal miss review handoff, Env precision review handoff, Command variant review handoff, Report clarity review handoff",
    appliesWhen:
      "Review shows required inputs are missing, reproduction is uncertain, guard baselines are stale, or schema/check ID/public-surface decisions are not recorded.",
    requiredEvidence:
      "Missing readiness item, stale handoff field, failed guard output, unclear expected output, or missing public-surface decision.",
    routeTo:
      "Seed Fixture Implementation Queued PR Readiness Checklist or Seed Fixture Implementation Queued PR Review Handoff refresh before more implementation.",
    maintainerAction:
      "Pause review, request or collect the missing evidence, update the readiness and handoff records, and do not merge until the route is reviewable again.",
    record: "Record missing inputs, owner, requested evidence, refresh commands, follow-up window, and whether implementation is paused."
  },
  {
    outcome: "Split or defer expanded scope",
    handoffScope:
      "Happy-path trust review handoff, Supported signal miss review handoff, Env precision review handoff, Command variant review handoff, Report clarity review handoff",
    appliesWhen:
      "Review finds multiple signal types, unsupported ecosystem work, broad parser/scanner/detector changes, JSON schema versioning, or check ID churn beyond the queued PR.",
    requiredEvidence:
      "Expanded-scope finding, affected queue order, retained in-scope change, deferred change, split rationale, and roadmap or follow-up target.",
    routeTo: "A smaller current PR, a follow-up queued PR, a new seed or starter batch decision, or a roadmap candidate update.",
    maintainerAction:
      "Keep the current PR minimal or close and reopen it with narrower scope, record skip/split/reorder rationale, and avoid merging broad speculative changes.",
    record:
      "Record retained scope, deferred scope, affected handoff, new owner or queue decision, labels or roadmap status, and verification needed after the split."
  },
  {
    outcome: "Public surface refresh required",
    handoffScope:
      "Happy-path trust review handoff, Supported signal miss review handoff, Env precision review handoff, Command variant review handoff, Report clarity review handoff",
    appliesWhen:
      "Review confirms the queued PR affects Markdown, JSON, terminal output, report examples, check ID docs, report schema docs, package README text, or changelog notes.",
    requiredEvidence:
      "Touched public surfaces, generated example or snapshot diff, schema/check ID decision, docs updates, and matching verification command output.",
    routeTo:
      "Same PR only when the public surface update matches the queued handoff; otherwise a split docs/examples follow-up before merge.",
    maintainerAction:
      "Update the public surface, run the matching docs/example checks, escalate to `pnpm verify:release` when release-surface docs or examples changed, and refresh review evidence.",
    record: "Record updated docs/examples, generation command, schema/check ID decision, output diff, verification result, and reviewer re-check."
  }
];

export const accuracySeedFixtureImplementationQueuedPrReviewOutcomeRecordTemplates = [
  {
    template: "Queued PR approved merge record",
    outcome: "Approved for fixture merge",
    useWhen: "Review outcome routing approves the queued PR for fixture merge.",
    requiredInputs:
      "Review approval, handoff used, final verification commands, fixture and guard results, read-only confirmation, intentional report diffs, and merge link or planned merge target.",
    recordBody:
      "Record approved outcome, queue order, handoff used, fixture target, guard results, public-surface updates, final verification commands, and merge link.",
    followUp:
      "Merge only after final focused verification or `pnpm verify:release` when release-surface docs, examples, scoring, schema docs, or package surfaces changed."
  },
  {
    template: "Queued PR scoped changes record",
    outcome: "Changes requested within queued scope",
    useWhen: "Review outcome routing requests changes that remain inside the queued PR scope.",
    requiredInputs:
      "Review comment, in-scope rationale, affected fixture or focused test, requested update, unchanged handoff scope, and rerun command list.",
    recordBody:
      "Record requested change, why it stays inside the queue order and handoff focus, files or fixtures touched, expected update, rerun commands, and review status.",
    followUp: "Update only the requested in-scope fixture or implementation detail, rerun focused verification, and refresh the handoff before re-review."
  },
  {
    template: "Queued PR readiness return record",
    outcome: "Return to readiness",
    useWhen: "Review outcome routing sends the queued PR back because evidence, guard baselines, expected output, or public-surface decisions are missing or stale.",
    requiredInputs:
      "Missing readiness item, stale handoff field, failed guard output, unclear expected output, owner, requested evidence, refresh commands, and follow-up window.",
    recordBody:
      "Record readiness return outcome, missing inputs, owner, paused implementation status, evidence request, refresh command set, and follow-up window.",
    followUp:
      "Pause review and do not merge until Seed Fixture Implementation Queued PR Readiness Checklist and Review Handoff are refreshed."
  },
  {
    template: "Queued PR split or defer record",
    outcome: "Split or defer expanded scope",
    useWhen: "Review outcome routing finds expanded scope that should not merge in the current queued PR.",
    requiredInputs:
      "Expanded-scope finding, retained in-scope change, deferred change, affected queue order, affected handoff, split rationale, owner, and follow-up target.",
    recordBody:
      "Record retained scope, deferred scope, split or defer rationale, new owner or queue decision, labels or roadmap status, and verification needed after the split.",
    followUp:
      "Keep the current PR minimal or reopen it with narrower scope, then route deferred work through a follow-up queued PR, new seed decision, starter batch decision, or roadmap update."
  },
  {
    template: "Queued PR public surface refresh record",
    outcome: "Public surface refresh required",
    useWhen: "Review outcome routing requires docs, examples, schema/check ID notes, package README text, changelog notes, or report output refresh before merge.",
    requiredInputs:
      "Touched public surfaces, generated example or snapshot diff, schema/check ID decision, docs updates, verification command output, and reviewer re-check owner.",
    recordBody:
      "Record public surfaces updated, generation command, schema/check ID decision, output diff, verification result, reviewer re-check, and whether `pnpm verify:release` is required.",
    followUp:
      "Update the public surface in the same PR only when it matches the queued handoff; otherwise split docs or examples into a follow-up before merge."
  }
];

export const accuracySeedFixtureImplementationQueuedPrCloseoutChecklist = [
  {
    item: "Review outcome record is complete",
    appliesWhen: "Any queued fixture-first PR has a review outcome before merge, revision, readiness return, split/defer, or public-surface refresh.",
    requiredEvidence:
      "Matching Seed Fixture Implementation Queued PR Review Outcome Record Templates entry, required inputs, record body, follow-up, owner, and PR or issue link.",
    passWhen:
      "The selected record template is filled and points to the current review outcome, queue order, handoff, owner, and follow-up state.",
    ifMissing:
      "Do not merge or close; fill the matching review outcome record template and rerun the relevant focused checks.",
    record: "Record template used, outcome, owner, PR or issue link, follow-up state, and verification command references."
  },
  {
    item: "Final verification matches outcome",
    appliesWhen: "A queued PR is approved, revised, split, returned to readiness, or updated for public surfaces after review.",
    requiredEvidence:
      "Focused fixture or guard command output, docs/example command output when touched, and `pnpm verify:release` result when release-surface docs, examples, scoring, schema docs, or package surfaces changed.",
    passWhen:
      "Verification commands match the recorded review outcome and no broader detector, scanner, reporter, scoring, schema, or example scope is unverified.",
    ifMissing: "Pause merge or closure until the exact command set is run and recorded against the outcome.",
    record: "Record command set, pass/fail state, output summary, escalation decision, and any intentional report or docs diff."
  },
  {
    item: "Public surfaces and release notes are synchronized",
    appliesWhen:
      "The queued PR touches terminal, JSON, Markdown, report examples, check ID docs, report schema docs, package README text, changelog notes, or release-surface docs.",
    requiredEvidence:
      "Updated public files, generated example or snapshot diff, schema/check ID decision, changelog or package README note when relevant, and matching docs/example checks.",
    passWhen:
      "Every public surface touched by the PR is updated, generated outputs are refreshed, and docs checks cover the changed surface.",
    ifMissing:
      "Keep the PR open or split a docs/examples follow-up before merge; do not close with stale public output.",
    record: "Record public surfaces touched, files updated, generation command, docs check results, and reviewer re-check."
  },
  {
    item: "Split, defer, or readiness return has an owner",
    appliesWhen: "Review outcome routing returns work to readiness, requests a split, defers expanded scope, or opens a follow-up queued PR.",
    requiredEvidence:
      "Retained scope, deferred scope, readiness evidence request, owner, labels or roadmap status, follow-up target, and next review or close-after date.",
    passWhen: "The current PR can close or continue with one owner and every deferred or readiness item has a visible follow-up path.",
    ifMissing: "Do not close the PR or issue; assign an owner, update labels or roadmap status, and record the next action.",
    record: "Record owner, retained scope, deferred scope, follow-up link, labels/status, and next review date."
  },
  {
    item: "Read-only implementation boundary is preserved",
    appliesWhen: "Any queued fixture-first PR reaches merge, revision, split/defer, readiness return, or closeout after review.",
    requiredEvidence:
      "Read-only check smoke or focused evidence that `bootlane check` still does not execute project scripts, write target files, require network access, or broaden default-path behavior.",
    passWhen:
      "The closeout evidence confirms default `bootlane check` remains local, read-only, deterministic, and fixture-first for the queued scope.",
    ifMissing: "Escalate to release-blocking review before merge or closure and rerun the read-only check smoke.",
    record: "Record read-only evidence, command output summary, default-path boundary decision, and escalation status."
  }
];

export const accuracySeedFixtureImplementationQueuedPrCloseoutRecordTemplates = [
  {
    template: "Queued PR closeout evidence record",
    item: "Review outcome record is complete",
    useWhen: "The closeout checklist confirms the selected review outcome record is complete before merge, closure, split, defer, or readiness return.",
    requiredInputs:
      "Record template used, outcome, queue order, handoff, owner, PR or issue link, follow-up state, and verification command references.",
    recordBody:
      "Record closeout evidence, selected review outcome record template, current owner, PR or issue link, follow-up status, verification references, and final closeout decision.",
    followUp:
      "Continue to final verification only after the current review outcome record is filled and linked from the PR or issue."
  },
  {
    template: "Queued PR final verification record",
    item: "Final verification matches outcome",
    useWhen: "The closeout checklist verifies the final command set after approval, revision, split, readiness return, or public-surface update.",
    requiredInputs:
      "Command set, pass/fail state, output summary, escalation decision, `pnpm verify:release` result when required, and intentional report or docs diffs.",
    recordBody:
      "Record final verification commands, output summary, pass/fail state, escalation decision, release verification result if required, and remaining risk if any.",
    followUp: "Do not merge or close until failed or missing commands are rerun and the review outcome record is refreshed."
  },
  {
    template: "Queued PR public surface closeout record",
    item: "Public surfaces and release notes are synchronized",
    useWhen: "The closeout checklist verifies public output, docs, examples, schema/check ID notes, package README text, changelog notes, or release-surface docs.",
    requiredInputs:
      "Public surfaces touched, files updated, generation command, docs/example check results, schema/check ID decision, changelog or package README note, and reviewer re-check.",
    recordBody:
      "Record each public surface, generated diff or snapshot, docs/example command output, schema/check ID decision, changelog or package README status, and reviewer re-check result.",
    followUp:
      "Split or keep the PR open if any public surface is stale, regenerated output is missing, or docs checks do not cover the changed surface."
  },
  {
    template: "Queued PR follow-up owner record",
    item: "Split, defer, or readiness return has an owner",
    useWhen: "The closeout checklist verifies ownership for split, defer, readiness return, or follow-up queued PR work.",
    requiredInputs:
      "Owner, retained scope, deferred scope, readiness evidence request, labels or roadmap status, follow-up link, and next review date.",
    recordBody:
      "Record owner, retained scope, deferred or readiness scope, follow-up target, labels or roadmap status, next review date, and close-after condition if applicable.",
    followUp: "Do not close the current PR or issue until each deferred, split, or readiness item has one owner and visible next action."
  },
  {
    template: "Queued PR read-only closeout record",
    item: "Read-only implementation boundary is preserved",
    useWhen: "The closeout checklist verifies that queued PR closeout preserved the default local, read-only, deterministic `bootlane check` path.",
    requiredInputs:
      "Read-only evidence, command output summary, no project script execution evidence, no target-file writes evidence, default-path boundary decision, and escalation status.",
    recordBody:
      "Record read-only command evidence, no project script execution evidence, no target-file write evidence, network/default-path boundary decision, and any release-blocking escalation state.",
    followUp: "Escalate before merge or closure if read-only evidence is missing, fails, or shows default-path behavior broadened."
  }
];

export const accuracySeedFixtureImplementationQueuedPrFollowUpQueue = [
  {
    followUp: "Deferred scope follow-up",
    sourceCloseoutItem: "Split, defer, or readiness return has an owner",
    useWhen:
      "Closeout defers expanded detector, scanner, reporter, scoring, schema, or example-output scope out of the current queued PR.",
    requiredInputs:
      "Deferred scope, retained scope, source PR or issue link, owner, labels or roadmap status, follow-up target, next review date, and stop condition.",
    routeTo:
      "A new seed evidence record, starter batch decision, follow-up queued PR, or roadmap candidate update before any implementation resumes.",
    ownerAction:
      "Create or update the follow-up record, link it from the current PR closeout, and keep the deferred work out of the merged or closed PR.",
    verification:
      "Rerun the focused docs or fixture command for the retained PR only; require fresh queued PR readiness before implementing the deferred scope.",
    stopIf:
      "No owner, follow-up link, or stop condition exists, or the deferred work would broaden the default read-only `bootlane check` path."
  },
  {
    followUp: "Readiness refresh follow-up",
    sourceCloseoutItem: "Split, defer, or readiness return has an owner",
    useWhen:
      "Closeout returns a queued PR to readiness because reproduction, guard baselines, expected output, schema/check ID decisions, or public-surface evidence is missing or stale.",
    requiredInputs:
      "Missing readiness item, stale handoff field, requested evidence, owner, refresh command set, paused implementation status, and follow-up window.",
    routeTo:
      "Seed Fixture Implementation Queued PR Readiness Checklist and Seed Fixture Implementation Queued PR Review Handoff refresh before review resumes.",
    ownerAction:
      "Assign one owner to collect the missing evidence, refresh the readiness and handoff records, and link the refreshed record from the PR or issue.",
    verification:
      "Run the selected Seed Verification Command Sets entry again and record whether the queued PR can return to review.",
    stopIf:
      "The missing evidence cannot be reproduced, guard baselines are still stale, or implementation continues before readiness is refreshed."
  },
  {
    followUp: "Public surface follow-up",
    sourceCloseoutItem: "Public surfaces and release notes are synchronized",
    useWhen:
      "Closeout finds stale terminal, JSON, Markdown, report example, check ID, report schema, package README, changelog, or release-surface output.",
    requiredInputs:
      "Touched public surface, stale file or generated diff, schema/check ID decision, owner, docs/example command, and reviewer re-check target.",
    routeTo:
      "Same PR only when the update matches the queued handoff; otherwise a docs/examples follow-up PR before merge or closure.",
    ownerAction:
      "Refresh the public surface, link generated diffs or docs changes, and request reviewer re-check on the changed output only.",
    verification:
      "Run matching docs/example checks and escalate to `pnpm verify:release` when release-surface docs, examples, package surfaces, scoring, or schema docs changed.",
    stopIf:
      "Schema/check ID decisions, generated output, changelog or package README notes, or docs checks are missing."
  },
  {
    followUp: "Split queued PR follow-up",
    sourceCloseoutItem: "Split, defer, or readiness return has an owner",
    useWhen:
      "Closeout splits the current queued PR because retained fixture work can proceed but another supported signal, report surface, or queue item needs separate review.",
    requiredInputs:
      "Retained scope, split scope, source queue order, new queue order or skip/split/reorder rationale, owner, follow-up PR or issue link, and verification plan.",
    routeTo:
      "A smaller queued PR that names the existing queue order or documents the audited skip, split, or reorder rationale.",
    ownerAction:
      "Open or update the split PR or issue, refresh the matching readiness and review handoff, and keep cross-PR dependencies explicit.",
    verification:
      "Run focused verification for the retained PR and require the split PR to pass queued readiness before implementation continues there.",
    stopIf:
      "The split PR mixes unrelated queue items, lacks a refreshed handoff, or depends on unverified broad detector, scanner, reporter, scoring, or schema changes."
  },
  {
    followUp: "Read-only escalation follow-up",
    sourceCloseoutItem: "Read-only implementation boundary is preserved",
    useWhen:
      "Closeout cannot prove that default `bootlane check` remains local, deterministic, read-only, network-free, and free of project script execution.",
    requiredInputs:
      "Read-only evidence gap, command output summary, suspected default-path behavior change, owner, escalation status, and release-blocking review link.",
    routeTo:
      "Release-blocking review, readiness refresh, or a scoped fix before merge, closure, or follow-up implementation continues.",
    ownerAction:
      "Pause merge or closure, collect read-only smoke evidence, document whether target files, network access, or project scripts were touched, and resolve escalation.",
    verification:
      "Run read-only check smoke and `pnpm verify:release` if default-path behavior, package surfaces, report examples, or release-surface docs changed.",
    stopIf:
      "Read-only evidence is missing or failing, or default `bootlane check` would execute scripts, write target files, require network access, or broaden scanner behavior."
  }
];

export const accuracySeedFixtureImplementationQueuedPrFollowUpRecordTemplates = [
  {
    template: "Deferred scope follow-up record",
    followUp: "Deferred scope follow-up",
    useWhen:
      "Follow-up queue routes deferred detector, scanner, reporter, scoring, schema, or example-output scope out of the current queued PR.",
    requiredInputs:
      "Deferred scope, retained scope, source PR or issue link, owner, labels or roadmap status, follow-up target, next review date, stop condition, and retained PR verification result.",
    recordBody:
      "Record deferred scope, retained scope, why it stays out of the current PR, owner, follow-up target, labels or roadmap status, verification result, and stop condition.",
    nextAction:
      "Update the seed evidence record, starter batch decision, follow-up queued PR, or roadmap candidate before deferred work resumes."
  },
  {
    template: "Readiness refresh follow-up record",
    followUp: "Readiness refresh follow-up",
    useWhen:
      "Follow-up queue returns a queued PR to readiness because reproduction, guard baselines, expected output, schema/check ID decisions, or public-surface evidence is missing or stale.",
    requiredInputs:
      "Missing readiness item, stale handoff field, requested evidence, owner, refresh command set, paused implementation status, follow-up window, and return-to-review condition.",
    recordBody:
      "Record the missing or stale readiness evidence, owner, paused implementation state, refresh command set, follow-up window, and criteria for returning to review.",
    nextAction:
      "Refresh Seed Fixture Implementation Queued PR Readiness Checklist and Review Handoff before review or implementation resumes."
  },
  {
    template: "Public surface follow-up record",
    followUp: "Public surface follow-up",
    useWhen:
      "Follow-up queue finds stale terminal, JSON, Markdown, report example, check ID, report schema, package README, changelog, or release-surface output.",
    requiredInputs:
      "Touched public surface, stale file or generated diff, schema/check ID decision, owner, docs/example command, reviewer re-check target, and release verification escalation decision.",
    recordBody:
      "Record each stale public surface, refreshed file or generated diff, schema/check ID decision, docs/example command result, reviewer re-check target, and release verification decision.",
    nextAction:
      "Refresh the same PR only when it matches the queued handoff; otherwise open or update a docs/examples follow-up before merge or closure."
  },
  {
    template: "Split queued PR follow-up record",
    followUp: "Split queued PR follow-up",
    useWhen:
      "Follow-up queue splits the current queued PR because retained fixture work can proceed but another supported signal, report surface, or queue item needs separate review.",
    requiredInputs:
      "Retained scope, split scope, source queue order, new queue order or skip/split/reorder rationale, owner, follow-up PR or issue link, cross-PR dependency, and verification plan.",
    recordBody:
      "Record retained scope, split scope, source and new queue order, split rationale, owner, follow-up link, cross-PR dependency, and verification plan for both PRs.",
    nextAction:
      "Open or update the split PR or issue and refresh its readiness checklist and review handoff before implementation continues there."
  },
  {
    template: "Read-only escalation follow-up record",
    followUp: "Read-only escalation follow-up",
    useWhen:
      "Follow-up queue cannot prove that default `bootlane check` remains local, deterministic, read-only, network-free, and free of project script execution.",
    requiredInputs:
      "Read-only evidence gap, command output summary, suspected default-path behavior change, owner, escalation status, release-blocking review link, and resolution condition.",
    recordBody:
      "Record the read-only evidence gap, smoke command output, suspected target-file write, network, project-script, or scanner-boundary change, owner, escalation status, and resolution condition.",
    nextAction:
      "Pause merge or closure until read-only smoke evidence and required release verification prove the default path stayed bounded."
  }
];

export const accuracySeedFixtureImplementationQueuedPrFollowUpReviewCadence = [
  {
    review: "Deferred scope follow-up review",
    recordTemplate: "Deferred scope follow-up record",
    cadence:
      "Review at the next seed batch review and again before any follow-up queued PR, starter batch decision, or roadmap candidate status change.",
    requiredInputs:
      "Deferred scope follow-up record, retained PR verification result, owner, follow-up target, labels or roadmap status, stop condition, and next review date.",
    staleWhen:
      "Next review date passes, owner changes, source PR closes without a follow-up link, retained or deferred scope changes, or verification evidence no longer matches the current queued PR record.",
    routeTo:
      "Refresh the follow-up record, keep the scope deferred, open a narrowed queued PR, update the roadmap candidate, or close the follow-up as obsolete or out of scope.",
    maintainerAction:
      "Compare retained and deferred scope, refresh evidence links, update owner and status, and keep deferred detector, scanner, reporter, scoring, schema, or example-output work out of the current PR.",
    record:
      "Record review date, owner, decision, refreshed evidence, route, next review date, and close, defer, or escalation condition."
  },
  {
    review: "Readiness refresh follow-up review",
    recordTemplate: "Readiness refresh follow-up record",
    cadence:
      "Review at the recorded follow-up window and before the queued PR returns to review, changes owner, or resumes implementation after readiness refresh.",
    requiredInputs:
      "Readiness refresh follow-up record, missing readiness item, requested evidence, refresh command results, owner, paused implementation status, and return-to-review condition.",
    staleWhen:
      "Follow-up window passes without the requested evidence, guard baselines or expected output change again, owner is missing, or implementation continues before readiness and handoff records are refreshed.",
    routeTo:
      "Refresh Seed Fixture Implementation Queued PR Readiness Checklist and Review Handoff, keep the PR paused, request narrower evidence, or close after missing evidence remains unresolved.",
    maintainerAction:
      "Re-run the selected verification command set, update readiness and handoff records, confirm paused implementation status, and decide whether review can resume.",
    record:
      "Record review date, missing or refreshed evidence, command output summary, owner, return-to-review decision, next follow-up window, and closure condition."
  },
  {
    review: "Public surface follow-up review",
    recordTemplate: "Public surface follow-up record",
    cadence:
      "Review before merge, before release-surface docs or examples are regenerated, and whenever schema/check ID, package README, changelog, or report output decisions change.",
    requiredInputs:
      "Public surface follow-up record, touched public surface, generated diff or stale file, schema/check ID decision, docs/example command output, owner, and reviewer re-check target.",
    staleWhen:
      "Generated output is missing, schema/check ID decisions change, docs/example checks are not rerun after edits, reviewer re-check is absent, or release verification escalation is undecided.",
    routeTo:
      "Refresh the same PR when it matches the queued handoff, open a docs/examples follow-up PR, block merge, or escalate to `pnpm verify:release` before closure.",
    maintainerAction:
      "Refresh only the affected public surfaces, link generated diffs, rerun matching checks, record reviewer re-check, and decide whether release verification is required.",
    record:
      "Record review date, files or outputs refreshed, schema/check ID decision, docs/example checks, reviewer re-check result, release verification decision, and next action."
  },
  {
    review: "Split queued PR follow-up review",
    recordTemplate: "Split queued PR follow-up record",
    cadence:
      "Review when opening the split PR, before closing the source PR, and before any queue skip, split, reorder, or cross-PR dependency changes.",
    requiredInputs:
      "Split queued PR follow-up record, retained scope, split scope, source and new queue order, split rationale, owner, follow-up PR or issue link, cross-PR dependency, and verification plan.",
    staleWhen:
      "Split PR or issue link is missing, queue order or split rationale changes, cross-PR dependency is unclear, readiness is not refreshed, or focused verification no longer covers retained and split scope.",
    routeTo:
      "Refresh the split PR readiness and review handoff, keep only retained scope in the source PR, defer the split scope, update queue rationale, or close the split as superseded.",
    maintainerAction:
      "Verify retained and split scope separately, update cross-PR links, refresh readiness for the split PR, and keep unrelated queue items out of both PRs.",
    record:
      "Record review date, source and split links, queue decision, dependency status, verification plan, owner, next review date, and close or defer condition."
  },
  {
    review: "Read-only escalation follow-up review",
    recordTemplate: "Read-only escalation follow-up record",
    cadence:
      "Review immediately before merge or closure and at every release-blocking review until default-path read-only evidence is refreshed or the escalation is resolved.",
    requiredInputs:
      "Read-only escalation follow-up record, read-only evidence gap, smoke command output, suspected default-path behavior change, owner, escalation status, release-blocking review link, and resolution condition.",
    staleWhen:
      "Read-only smoke evidence is missing or failing, default-path behavior changes again, package surfaces or release-surface docs changed without `pnpm verify:release`, or escalation status lacks an owner.",
    routeTo:
      "Keep merge or closure paused, run read-only smoke, run `pnpm verify:release` when required, open a scoped fix, refresh readiness, or close the escalation only after evidence proves the default path stayed bounded.",
    maintainerAction:
      "Collect read-only evidence, document no project script execution, no target-file writes, no network requirement, and no scanner boundary broadening, then resolve or keep the escalation blocking.",
    record:
      "Record review date, smoke evidence, release verification result if required, default-path boundary decision, owner, escalation status, resolution condition, and next review date."
  }
];

export const accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRouting = [
  {
    outcome: "Refresh follow-up evidence",
    reviewScope:
      "Deferred scope follow-up review, Readiness refresh follow-up review, Public surface follow-up review, Split queued PR follow-up review, Read-only escalation follow-up review",
    appliesWhen:
      "Review finds the follow-up is still valid but owner, evidence links, command results, public-surface diff, readiness handoff, or next review date is stale or incomplete.",
    requiredEvidence:
      "Current follow-up review cadence entry, stale field, owner, refreshed evidence request, command set to rerun, and next review date.",
    routeTo:
      "Refresh the matching Seed Fixture Implementation Queued PR Follow-Up Record Templates entry before review, merge, closure, or implementation continues.",
    maintainerAction:
      "Update only the stale follow-up evidence, rerun the focused verification that matches the route, and keep implementation paused when readiness or read-only evidence is stale.",
    record:
      "Record stale fields, refreshed evidence, owner, rerun commands, updated next review date, and whether work remains paused."
  },
  {
    outcome: "Resume queued PR review",
    reviewScope:
      "Readiness refresh follow-up review, Public surface follow-up review, Split queued PR follow-up review",
    appliesWhen:
      "Review confirms missing readiness evidence, stale public surface output, or split PR readiness has been refreshed and the queued PR can return to review without broadening scope.",
    requiredEvidence:
      "Passing refreshed readiness or public-surface record, updated review handoff, focused verification result, owner, and unchanged queue boundary.",
    routeTo:
      "The existing queued PR review handoff, review outcome routing, or split queued PR review path with refreshed evidence linked.",
    maintainerAction:
      "Resume review only for the refreshed scope, link the refreshed follow-up record, and keep deferred or unrelated scope outside the PR.",
    record:
      "Record resume decision, refreshed evidence links, verification result, handoff or review route, owner, and scope boundary."
  },
  {
    outcome: "Escalate release-blocking follow-up",
    reviewScope:
      "Public surface follow-up review, Read-only escalation follow-up review",
    appliesWhen:
      "Review finds missing or failing read-only smoke, unresolved release-surface output, schema/check ID uncertainty, package surface drift, or default-path behavior risk before merge or closure.",
    requiredEvidence:
      "Failing or missing read-only evidence, affected public or release surface, release verification requirement, owner, escalation status, and release-blocking review link.",
    routeTo:
      "Release-blocking review, paused merge or closure, read-only smoke refresh, `pnpm verify:release`, or a scoped fix before the queued PR can proceed.",
    maintainerAction:
      "Block merge or closure, collect required smoke and release verification evidence, document the default-path boundary, and resolve or keep the escalation open.",
    record:
      "Record escalation reason, affected surface, command output, release verification decision, owner, blocker link, and resolution condition."
  },
  {
    outcome: "Defer or park follow-up",
    reviewScope:
      "Deferred scope follow-up review, Split queued PR follow-up review",
    appliesWhen:
      "Review confirms the follow-up is still plausible but not fixture-sized, lacks timely evidence, needs a later starter batch, or should stay out of the current queue.",
    requiredEvidence:
      "Deferred or split scope, current evidence quality, owner, roadmap or seed batch target, deferral rationale, next review window, and stop condition.",
    routeTo:
      "Deferred seed list, parked roadmap candidate, later starter batch decision, or closed current PR with a visible follow-up link.",
    maintainerAction:
      "Update labels or roadmap status, keep the current PR minimal, assign an owner or revisit date, and avoid starting implementation for parked work.",
    record:
      "Record deferral or parking rationale, owner, target list or roadmap candidate, next review date, retained scope, and stop condition."
  },
  {
    outcome: "Close superseded follow-up",
    reviewScope:
      "Deferred scope follow-up review, Readiness refresh follow-up review, Public surface follow-up review, Split queued PR follow-up review, Read-only escalation follow-up review",
    appliesWhen:
      "Review confirms the follow-up was resolved elsewhere, became obsolete, lacks reproduction after the follow-up window, or is out of scope for the default local read-only path.",
    requiredEvidence:
      "Superseding PR or issue link, resolved evidence or missing-evidence history, owner, closure rationale, read-only boundary decision when relevant, and remaining follow-up check.",
    routeTo:
      "Closed follow-up record, linked superseding PR or issue, roadmap closure, or out-of-scope issue closure without starting new implementation.",
    maintainerAction:
      "Close only after linking the superseding or closure evidence, confirming no ownerless follow-up remains, and recording why no queued PR action continues.",
    record:
      "Record closure reason, superseding link, final evidence, owner, read-only boundary if relevant, remaining risk, and whether any future review remains."
  }
];
export const accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordTemplates = [
  {
    template: "Refresh follow-up evidence record",
    outcome: "Refresh follow-up evidence",
    useWhen:
      "Follow-up review outcome routing decides that stale owner, evidence, command output, public-surface diff, readiness handoff, or next review date needs a focused refresh before work continues.",
    requiredInputs:
      "Outcome route, stale fields, current follow-up record, refreshed evidence request, owner, rerun command set, updated next review date, and paused-or-resumed work state.",
    recordBody:
      "Record the stale fields, refreshed evidence links, command output summary, owner, next review date, and whether the queued PR, merge, closure, or implementation remains paused.",
    nextAction:
      "Update the matching follow-up record template entry and rerun only the focused verification required by the refreshed route before review resumes."
  },
  {
    template: "Resume queued PR review record",
    outcome: "Resume queued PR review",
    useWhen:
      "Follow-up review outcome routing confirms readiness, public-surface, or split PR evidence has been refreshed and the queued PR can return to review without broadening scope.",
    requiredInputs:
      "Outcome route, refreshed readiness or public-surface record, updated review handoff, focused verification result, owner, queue boundary, and deferred-scope note.",
    recordBody:
      "Record the resume decision, refreshed evidence links, verification result, handoff or review route, owner, unchanged scope boundary, and any deferred work that remains outside the PR.",
    nextAction:
      "Resume queued PR review only for the refreshed scope and keep unrelated detector, scanner, reporter, scoring, schema, or example-output work in its follow-up route."
  },
  {
    template: "Release-blocking follow-up escalation record",
    outcome: "Escalate release-blocking follow-up",
    useWhen:
      "Follow-up review outcome routing finds missing read-only smoke, unresolved release-surface output, schema/check ID uncertainty, package surface drift, or default-path behavior risk.",
    requiredInputs:
      "Outcome route, escalation reason, affected public or release surface, read-only smoke result or gap, release verification decision, owner, blocker link, and resolution condition.",
    recordBody:
      "Record the release-blocking reason, affected surface, command output or missing evidence, release verification requirement, owner, blocker link, default-path boundary decision, and resolution condition.",
    nextAction:
      "Keep merge or closure paused until read-only smoke and any required `pnpm verify:release` evidence prove the default path stayed bounded."
  },
  {
    template: "Defer or park follow-up record",
    outcome: "Defer or park follow-up",
    useWhen:
      "Follow-up review outcome routing confirms the follow-up is plausible but not fixture-sized, lacks timely evidence, needs a later starter batch, or should stay out of the current queue.",
    requiredInputs:
      "Outcome route, deferred or split scope, current evidence quality, owner, roadmap or seed batch target, deferral rationale, next review window, retained scope, and stop condition.",
    recordBody:
      "Record the deferral or parking rationale, retained and deferred scope, owner, target list or roadmap candidate, next review date, current evidence quality, and stop condition.",
    nextAction:
      "Update labels, roadmap status, or later starter batch notes while keeping the current PR minimal and avoiding implementation for parked work."
  },
  {
    template: "Close superseded follow-up record",
    outcome: "Close superseded follow-up",
    useWhen:
      "Follow-up review outcome routing confirms the follow-up was resolved elsewhere, became obsolete, lacks reproduction after the follow-up window, or is outside the default read-only path.",
    requiredInputs:
      "Outcome route, superseding PR or issue link, resolved evidence or missing-evidence history, owner, closure rationale, read-only boundary decision when relevant, and remaining follow-up check.",
    recordBody:
      "Record the closure reason, superseding link, final evidence, owner, read-only boundary if relevant, remaining risk, and whether any future review remains.",
    nextAction:
      "Close the follow-up only after linking superseding or closure evidence and confirming no ownerless queued PR action remains."
  }
];

export const accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditChecklist = [
  {
    item: "Outcome/template match audit",
    templateScope:
      "Refresh follow-up evidence record, Resume queued PR review record, Release-blocking follow-up escalation record, Defer or park follow-up record, Close superseded follow-up record",
    reviewQuestion:
      "Does the selected record template match the follow-up review outcome route and the current follow-up state?",
    requiredEvidence:
      "Selected outcome route, selected record template, current follow-up review entry, source follow-up record, owner, and current queued PR or issue link.",
    passWhen:
      "The template outcome matches the routed outcome and the record does not mix refresh, resume-review, release-blocking escalation, defer/park, or close/supersede states.",
    ifMissing:
      "Return to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing before work resumes, blocks, parks, or closes.",
    record:
      "Record template name, routed outcome, source follow-up link, owner, and confirmation that no other outcome state is mixed into the record."
  },
  {
    item: "Required-input completeness audit",
    templateScope:
      "Refresh follow-up evidence record, Resume queued PR review record, Release-blocking follow-up escalation record, Defer or park follow-up record, Close superseded follow-up record",
    reviewQuestion:
      "Are all required inputs from the selected outcome record template present and current?",
    requiredEvidence:
      "Required inputs from the selected template, evidence links, command output summaries, owner, next review or resolution date, scope boundary, and paused/resumed state.",
    passWhen:
      "Every required input is present, current, and specific enough for a reviewer to reproduce why the follow-up is refreshed, resumed, escalated, deferred, parked, or closed.",
    ifMissing:
      "Refresh the outcome record and keep the queued PR, merge, closure, or implementation paused until missing inputs are filled.",
    record:
      "Record completed inputs, missing-input check result, refresh command set if any, owner, paused/resumed state, and next review or resolution date."
  },
  {
    item: "Record-body traceability audit",
    templateScope:
      "Refresh follow-up evidence record, Resume queued PR review record, Release-blocking follow-up escalation record, Defer or park follow-up record, Close superseded follow-up record",
    reviewQuestion:
      "Can a reviewer trace the record body from outcome decision to evidence, verification, scope boundary, and next action without guessing?",
    requiredEvidence:
      "Record body, evidence links, rerun command output, refreshed handoff or public-surface link, blocker or superseding link when relevant, and retained or deferred scope note.",
    passWhen:
      "The record body links the decision to evidence and verification, names the current scope boundary, and explains the next action without relying on private context.",
    ifMissing:
      "Update the record body before closure, review resume, release-blocking escalation resolution, or roadmap/status change continues.",
    record:
      "Record traceability result, evidence links checked, command outputs checked, scope boundary, reviewer note, and any remaining follow-up risk."
  },
  {
    item: "Next-action ownership audit",
    templateScope:
      "Refresh follow-up evidence record, Resume queued PR review record, Release-blocking follow-up escalation record, Defer or park follow-up record, Close superseded follow-up record",
    reviewQuestion:
      "Does the outcome record leave one owner, one next action, and one stop or revisit condition?",
    requiredEvidence:
      "Owner, next action, stop condition or revisit date, queue or roadmap target, paused/resumed decision, and cross-PR or superseding link when relevant.",
    passWhen:
      "The next action is unambiguous, owned, dated or stop-conditioned, and does not leave deferred, parked, blocked, or superseded follow-up work ownerless.",
    ifMissing:
      "Assign an owner or keep the follow-up paused; do not resume review, close, park, or resolve escalation with ownerless next work.",
    record:
      "Record owner, next action, stop condition, revisit date if needed, paused/resumed state, and remaining owner handoff."
  },
  {
    item: "Default-path boundary audit",
    templateScope:
      "Refresh follow-up evidence record, Resume queued PR review record, Release-blocking follow-up escalation record, Defer or park follow-up record, Close superseded follow-up record",
    reviewQuestion:
      "Does the outcome record preserve the default local, deterministic, read-only `bootlane check` path?",
    requiredEvidence:
      "Read-only smoke result or explicit non-applicability, no target-file write note, no network requirement note, no project-script execution note, scanner-boundary note, and release verification decision when relevant.",
    passWhen:
      "The record proves or explicitly preserves the default-path boundary and escalates release-blocking uncertainty instead of allowing merge, closure, or review resume.",
    ifMissing:
      "Escalate to release-blocking follow-up or rerun read-only smoke before merge, closure, public-surface refresh, or review resume continues.",
    record:
      "Record read-only boundary decision, smoke evidence or non-applicability, release verification decision, escalation status, owner, and resolution condition."
  }
];

export const accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRouting = [
  {
    outcome: "Audit passed",
    auditScope:
      "Outcome/template match audit, Required-input completeness audit, Record-body traceability audit, Next-action ownership audit, Default-path boundary audit",
    appliesWhen:
      "Every selected audit checklist item passes and the record has one routed outcome, owner, next action, and preserved default-path boundary.",
    requiredEvidence:
      "Completed audit checklist entry, selected outcome record template, routed outcome, owner, verification summary, scope boundary, and pass note.",
    routeTo:
      "Resume the prior routed state: refreshed evidence, queued PR review, resolved escalation, defer/park status, or close/supersede decision.",
    maintainerAction:
      "Link the passed audit from the follow-up record, continue only the original routed action, and keep deferred or unrelated implementation out of scope.",
    record:
      "Record audit pass date, checklist items checked, prior routed outcome, owner, continuing route, verification summary, and unchanged default-path boundary."
  },
  {
    outcome: "Refresh outcome record",
    auditScope:
      "Outcome/template match audit, Required-input completeness audit, Record-body traceability audit, Next-action ownership audit",
    appliesWhen:
      "The audit finds a mismatched template, stale inputs, incomplete body traceability, missing owner, unclear next action, or stale revisit condition.",
    requiredEvidence:
      "Audit failure note, affected outcome record fields, source follow-up review, owner or missing-owner status, refresh command set if any, and paused state.",
    routeTo:
      "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates for a corrected or refreshed record before work continues.",
    maintainerAction:
      "Pause review, closure, parking, or escalation resolution; refresh the record fields; rerun focused verification only when the stale field depends on command output.",
    record:
      "Record failed audit item, stale or missing fields, refresh owner, rerun commands if any, corrected record link, and the paused-or-resumed decision."
  },
  {
    outcome: "Escalate audit blocker",
    auditScope: "Default-path boundary audit, Required-input completeness audit, Record-body traceability audit",
    appliesWhen:
      "The audit cannot prove read-only smoke, release verification, public-surface evidence, schema/check ID impact, or default-path boundary before merge or closure.",
    requiredEvidence:
      "Missing or failing boundary evidence, affected public or release surface, command output or evidence gap, owner, release verification decision, and blocker link.",
    routeTo:
      "Release-blocking follow-up escalation, read-only smoke refresh, `pnpm verify:release`, or scoped fix before queued PR review, merge, or closure proceeds.",
    maintainerAction:
      "Block merge, closure, and review resume until boundary evidence is current; record the escalation owner and resolution condition.",
    record:
      "Record blocker reason, affected surface, failed or missing evidence, release verification requirement, owner, blocker link, and resolution condition."
  },
  {
    outcome: "Keep follow-up parked",
    auditScope: "Next-action ownership audit, Record-body traceability audit, Required-input completeness audit",
    appliesWhen:
      "The audit confirms a defer/park outcome remains valid, owned, scoped, and dated or stop-conditioned without needing current implementation.",
    requiredEvidence:
      "Defer or park record, retained and deferred scope, owner, roadmap or starter batch target, evidence quality, revisit date or stop condition, and no-current-implementation note.",
    routeTo: "Existing parked roadmap candidate, deferred seed list, later starter batch, or closed current PR follow-up link.",
    maintainerAction:
      "Keep the follow-up parked, refresh only ownership or revisit metadata if stale, and avoid starting detector, scanner, reporter, scoring, schema, or example-output work.",
    record:
      "Record parked status, owner, target list, next review date or stop condition, retained scope, deferred scope, and reason implementation remains paused."
  },
  {
    outcome: "Block close or resume",
    auditScope:
      "Outcome/template match audit, Required-input completeness audit, Next-action ownership audit, Default-path boundary audit",
    appliesWhen:
      "A close, supersede, or resume-review decision is requested but audit evidence, owner, closure rationale, or default-path boundary is incomplete.",
    requiredEvidence:
      "Requested close or resume route, missing audit evidence, owner or missing-owner status, closure or resume rationale gap, read-only boundary decision, and paused state.",
    routeTo:
      "Refresh outcome record, follow-up review outcome routing, or release-blocking escalation before close, supersede, or review resume is allowed.",
    maintainerAction:
      "Keep the follow-up open or paused, assign the missing owner/evidence, and rerun only the focused verification needed to unblock the requested route.",
    record:
      "Record blocked route, missing evidence, owner assignment, boundary decision, required refresh or escalation, and condition for close or resume."
  }
];

export const accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordTemplates = [
  {
    template: "Audit passed continuation record",
    outcome: "Audit passed",
    useWhen:
      "Audit outcome routing confirms every selected audit checklist item passes and the original follow-up review outcome route can continue without broadening scope.",
    requiredInputs:
      "Passed audit checklist entry, selected audit outcome route, prior follow-up review outcome record, owner, verification summary, continuing route, scope boundary, and default-path boundary note.",
    recordBody:
      "Record the passed audit, checklist items reviewed, prior routed outcome, owner, verification summary, continuing route, unchanged scope boundary, and default-path boundary decision.",
    followUp:
      "Continue only the prior routed action and keep deferred detector, scanner, reporter, scoring, schema, or example-output work outside the current follow-up."
  },
  {
    template: "Outcome record refresh record",
    outcome: "Refresh outcome record",
    useWhen:
      "Audit outcome routing finds stale, missing, or mismatched outcome record fields that must be corrected before review, closure, parking, or escalation resolution continues.",
    requiredInputs:
      "Failed audit item, stale or missing fields, source follow-up review record, owner or missing-owner status, refresh command set if any, corrected record target, and paused state.",
    recordBody:
      "Record the failed audit item, stale or missing fields, correction owner, rerun commands if needed, corrected record link, paused-or-resumed decision, and remaining risk.",
    followUp:
      "Refresh the matching follow-up review outcome record template entry and rerun only the focused verification needed to make the stale field current."
  },
  {
    template: "Audit blocker escalation record",
    outcome: "Escalate audit blocker",
    useWhen:
      "Audit outcome routing finds missing or failing read-only smoke, release verification, public-surface evidence, schema/check ID impact, or default-path boundary evidence.",
    requiredInputs:
      "Blocker reason, affected public or release surface, failed or missing evidence, command output or gap, release verification decision, owner, blocker link, and resolution condition.",
    recordBody:
      "Record the blocker, affected surface, missing or failing evidence, release verification requirement, owner, blocker link, default-path boundary decision, and resolution condition.",
    followUp:
      "Keep merge, closure, and review resume blocked until read-only smoke and any required `pnpm verify:release` evidence prove the default path stayed bounded."
  },
  {
    template: "Parked follow-up audit record",
    outcome: "Keep follow-up parked",
    useWhen:
      "Audit outcome routing confirms a defer/park outcome remains valid, owned, scoped, and dated or stop-conditioned without starting current implementation.",
    requiredInputs:
      "Defer or park record, retained scope, deferred scope, owner, roadmap or starter batch target, evidence quality, revisit date or stop condition, and no-current-implementation note.",
    recordBody:
      "Record the parked status, owner, target list, retained and deferred scope, evidence quality, next review date or stop condition, and why implementation remains paused.",
    followUp:
      "Keep the follow-up parked, update only ownership or revisit metadata when stale, and avoid starting detector, scanner, reporter, scoring, schema, or example-output work."
  },
  {
    template: "Close or resume blocked audit record",
    outcome: "Block close or resume",
    useWhen:
      "Audit outcome routing blocks a requested close, supersede, or resume-review decision because evidence, owner, rationale, or default-path boundary is incomplete.",
    requiredInputs:
      "Requested close or resume route, missing evidence, owner or missing-owner status, closure or resume rationale gap, read-only boundary decision, required refresh or escalation, and paused state.",
    recordBody:
      "Record the blocked route, missing evidence, owner assignment, rationale gap, boundary decision, required refresh or escalation, paused state, and condition for close or resume.",
    followUp:
      "Keep the follow-up open or paused until the missing owner or evidence is assigned, then reroute through audit outcome routing before close or resume proceeds."
  }
];

export const accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutChecklist = [
  {
    item: "Audit outcome record is complete",
    templateScope:
      "Audit passed continuation record, Outcome record refresh record, Audit blocker escalation record, Parked follow-up audit record, Close or resume blocked audit record",
    appliesWhen:
      "Any audit outcome record is created before the routed action continues, refreshes, escalates, parks, blocks, closes, or resumes.",
    requiredEvidence:
      "Selected audit outcome record template, routed audit outcome, completed required inputs, record body, follow-up, owner, source follow-up record link, and current queued PR or issue link.",
    passWhen:
      "The selected template is filled, its outcome matches audit outcome routing, and the source record, owner, follow-up, and current route are linked without mixed states.",
    ifMissing:
      "Return to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates and keep the follow-up paused until the record is complete.",
    record:
      "Record template used, routed audit outcome, completed fields, owner, source link, current PR or issue link, and whether work remains paused or can continue."
  },
  {
    item: "Allowed continuation is explicit",
    templateScope: "Audit passed continuation record, Outcome record refresh record",
    appliesWhen:
      "The closeout decision would let a passed audit continue the prior route or let a refreshed outcome record return to review, closure, parking, or escalation resolution.",
    requiredEvidence:
      "Passed audit or refreshed record, continuing route, verification summary, owner, scope boundary, deferred-work note, and unchanged default-path boundary decision.",
    passWhen:
      "The next route is named, owned, limited to the prior or refreshed scope, and no detector, scanner, reporter, scoring, schema, or example-output work starts from the closeout itself.",
    ifMissing:
      "Keep the follow-up paused and reroute through audit outcome routing or refresh the outcome record before any review, closure, or resume decision proceeds.",
    record:
      "Record continuing route, owner, verification summary, retained scope, deferred scope, default-path boundary, and the condition that allows work to proceed."
  },
  {
    item: "Escalation or block is enforceable",
    templateScope: "Audit blocker escalation record, Close or resume blocked audit record",
    appliesWhen:
      "The closeout decision keeps merge, closure, review resume, or escalation resolution blocked because evidence, owner, or default-path boundary remains incomplete.",
    requiredEvidence:
      "Blocker or blocked-route record, missing evidence, owner, blocker link, paused state, read-only boundary decision, release verification requirement, and resolution condition.",
    passWhen:
      "Merge, closure, and review resume remain paused until the named owner satisfies the resolution condition and refreshed evidence is linked.",
    ifMissing:
      "Escalate or keep the follow-up open; do not close, resume review, or resolve escalation with missing owner, blocker link, or resolution condition.",
    record:
      "Record blocker status, paused route, owner, missing evidence, release verification decision, blocker link, resolution condition, and next review date."
  },
  {
    item: "Parked or blocked state is owned",
    templateScope: "Parked follow-up audit record, Close or resume blocked audit record",
    appliesWhen:
      "The closeout decision parks the follow-up, keeps a close/resume request blocked, or leaves deferred work outside the current queued PR.",
    requiredEvidence:
      "Parked or blocked record, owner, retained scope, deferred scope, target list or roadmap candidate, revisit date or stop condition, paused state, and no-current-implementation note.",
    passWhen:
      "The parked or blocked state has one owner, one next review or stop condition, visible target/status, and no current implementation path for the deferred scope.",
    ifMissing:
      "Assign an owner, add a revisit or stop condition, or refresh the record before parking, blocking close/resume, or closing the current PR or issue.",
    record:
      "Record owner, parked or blocked state, target list or roadmap status, retained and deferred scope, next review date or stop condition, and implementation pause note."
  },
  {
    item: "Default-path and verification closeout is recorded",
    templateScope:
      "Audit passed continuation record, Outcome record refresh record, Audit blocker escalation record, Parked follow-up audit record, Close or resume blocked audit record",
    appliesWhen:
      "Any audit outcome closeout would allow work to continue, stay parked, remain blocked, escalate, close, or resume after a follow-up review outcome record audit.",
    requiredEvidence:
      "Read-only smoke result or explicit non-applicability, release verification decision, no target-file write note, no network requirement note, no project-script execution note, verification summary, owner, and boundary decision.",
    passWhen:
      "Verification matches the routed closeout decision and the record proves default `bootlane check` stays local, deterministic, read-only, network-free, and free of project script execution.",
    ifMissing:
      "Rerun read-only smoke, escalate an audit blocker, or keep close/resume/review continuation paused until boundary evidence is current.",
    record:
      "Record verification summary, read-only smoke or non-applicability, release verification decision, no-write/no-network/no-script notes, owner, and default-path boundary result."
  }
];

export const accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates = [
  {
    template: "Audit outcome closeout completion record",
    item: "Audit outcome record is complete",
    useWhen:
      "Closeout confirms the audit outcome record template is filled, routed, owned, linked, and free of mixed continuation, refresh, escalation, park, or block states.",
    requiredInputs:
      "Closeout item, selected audit outcome record template, routed audit outcome, completed fields, owner, source follow-up record link, current queued PR or issue link, and paused-or-continue decision.",
    recordBody:
      "Record the completed template, routed audit outcome, source and current links, owner, required fields checked, mixed-state check result, and whether work remains paused or can continue.",
    followUp:
      "Allow the next closeout check only after the source record and current route are linked; otherwise refresh the audit outcome record before work continues."
  },
  {
    template: "Allowed continuation closeout record",
    item: "Allowed continuation is explicit",
    useWhen:
      "Closeout confirms a passed audit or refreshed outcome record may continue the prior or refreshed route without broadening scope.",
    requiredInputs:
      "Closeout item, passed audit or refreshed record, continuing route, owner, verification summary, retained scope, deferred scope, default-path boundary decision, and proceed condition.",
    recordBody:
      "Record the allowed route, owner, verification summary, retained and deferred scope, default-path boundary, proceed condition, and explicit note that implementation does not start from closeout.",
    followUp:
      "Continue only the named prior or refreshed route and send unrelated detector, scanner, reporter, scoring, schema, or example-output work back to its follow-up path."
  },
  {
    template: "Escalation or block closeout record",
    item: "Escalation or block is enforceable",
    useWhen:
      "Closeout confirms merge, closure, review resume, or escalation resolution must stay blocked until missing evidence or default-path boundary uncertainty is resolved.",
    requiredInputs:
      "Closeout item, blocker or blocked-route record, missing evidence, owner, blocker link, paused state, read-only boundary decision, release verification requirement, and resolution condition.",
    recordBody:
      "Record the blocked route, missing evidence, owner, blocker link, paused state, release verification decision, read-only boundary status, resolution condition, and next review date.",
    followUp:
      "Keep merge, closure, and review resume paused until the owner links refreshed evidence and reruns audit outcome routing or closeout as required."
  },
  {
    template: "Parked or blocked ownership closeout record",
    item: "Parked or blocked state is owned",
    useWhen:
      "Closeout confirms a parked follow-up, blocked close/resume request, or deferred scope has one owner, visible status, and a revisit or stop condition.",
    requiredInputs:
      "Closeout item, parked or blocked record, owner, retained scope, deferred scope, target list or roadmap candidate, revisit date or stop condition, paused state, and no-current-implementation note.",
    recordBody:
      "Record the parked or blocked status, owner, target list or roadmap status, retained and deferred scope, revisit date or stop condition, paused state, and implementation pause note.",
    followUp:
      "Keep the follow-up parked or blocked until the revisit condition is met; do not start implementation for deferred scope from this closeout record."
  },
  {
    template: "Default-path verification closeout record",
    item: "Default-path and verification closeout is recorded",
    useWhen:
      "Closeout confirms verification matches the audit outcome decision and default `bootlane check` remains local, deterministic, read-only, network-free, and free of project script execution.",
    requiredInputs:
      "Closeout item, read-only smoke result or non-applicability, release verification decision, no-write note, no-network note, no-project-script note, verification summary, owner, and boundary decision.",
    recordBody:
      "Record verification commands or non-applicability, read-only smoke result, release verification decision, no-write/no-network/no-script notes, owner, default-path boundary, and any remaining risk.",
    followUp:
      "Proceed, park, block, close, or resume only after boundary evidence is current; otherwise rerun read-only smoke or escalate an audit blocker."
  }
];

export const accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules = [
  {
    trigger: "Closeout source record changed",
    recordTemplate: "Audit outcome closeout completion record",
    refreshWhen:
      "The selected audit outcome record template, routed audit outcome, source follow-up record link, current queued PR or issue link, owner, or paused-or-continue decision changes after closeout was recorded.",
    updateRecord:
      "Update completed fields checked, source and current links, owner, mixed-state check result, and paused-or-continue decision.",
    rerun:
      "Rerun audit outcome routing and the closeout checklist before allowing the next closeout check or continuation decision.",
    blockWhenStale:
      "Do not continue, close, resume, or escalate from a closeout completion record that points to stale source or route evidence."
  },
  {
    trigger: "Continuation route changed",
    recordTemplate: "Allowed continuation closeout record",
    refreshWhen:
      "Continuing route, retained scope, deferred scope, verification summary, owner, default-path boundary decision, or proceed condition changes before review, closure, or resume continues.",
    updateRecord:
      "Update allowed route, owner, retained and deferred scope, verification summary, default-path boundary, proceed condition, and implementation pause note.",
    rerun:
      "Rerun the focused verification that supports the changed route and rerun closeout before work continues.",
    blockWhenStale:
      "Do not use an older allowed-continuation record to start detector, scanner, reporter, scoring, schema, example-output, or broader implementation work."
  },
  {
    trigger: "Blocker or escalation evidence changed",
    recordTemplate: "Escalation or block closeout record",
    refreshWhen:
      "Missing evidence, blocker link, paused state, release verification requirement, read-only boundary decision, owner, resolution condition, or next review date changes.",
    updateRecord:
      "Update blocked route, missing evidence, owner, blocker link, paused state, release verification decision, read-only boundary status, resolution condition, and next review date.",
    rerun:
      "Rerun read-only smoke and `pnpm verify:release` when the blocker touches release or default-path boundary evidence.",
    blockWhenStale:
      "Keep merge, closure, review resume, and escalation resolution paused while blocker evidence or resolution conditions are stale."
  },
  {
    trigger: "Parked or blocked ownership changed",
    recordTemplate: "Parked or blocked ownership closeout record",
    refreshWhen:
      "Owner, target list, roadmap candidate, retained scope, deferred scope, revisit date, stop condition, paused state, or no-current-implementation note changes.",
    updateRecord:
      "Update parked or blocked status, owner, target list or roadmap status, retained and deferred scope, revisit date or stop condition, paused state, and implementation pause note.",
    rerun:
      "Rerun docs-only triage checks and any focused verification needed for changed ownership, scope, or roadmap status.",
    blockWhenStale:
      "Do not close the source follow-up or start deferred implementation while ownership, revisit condition, or parked status is stale."
  },
  {
    trigger: "Default-path verification evidence changed",
    recordTemplate: "Default-path verification closeout record",
    refreshWhen:
      "Read-only smoke, release verification decision, no-write note, no-network note, no-project-script note, verification summary, owner, or boundary decision changes after closeout.",
    updateRecord:
      "Update verification commands or non-applicability, read-only smoke result, release verification decision, no-write/no-network/no-script notes, owner, default-path boundary, and remaining risk.",
    rerun:
      "Rerun read-only smoke and escalate to `pnpm verify:release` when release surfaces or package behavior changed.",
    blockWhenStale:
      "Do not proceed, park, block, close, or resume from stale boundary evidence; rerun verification or escalate an audit blocker first."
  }
];

export const accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewCadence = [
  {
    review: "Closeout source refresh review",
    refreshRule: "Closeout source record changed",
    cadence:
      "Review when the source follow-up record, routed audit outcome, owner, or current queued PR or issue link changes and again before continuation, closure, resume, or escalation uses the closeout record.",
    requiredInputs:
      "Closeout source record changed refresh rule, current source follow-up record, routed audit outcome, closeout record link, owner, current PR or issue link, and paused-or-continue decision.",
    staleWhen:
      "Source link is missing, owner changed without a refreshed record, route evidence no longer matches the audit outcome, or the paused-or-continue decision is older than the current follow-up state.",
    routeTo:
      "Refresh the closeout completion record, rerun audit outcome routing, keep the follow-up paused, or block continuation until source and route evidence match.",
    maintainerAction:
      "Compare the source record and current route, refresh links and owner, rerun the closeout checklist, and record whether work remains paused or can continue.",
    record:
      "Record review date, source link, current route, owner, stale fields, refresh decision, rerun result, and paused-or-continue status."
  },
  {
    review: "Continuation route refresh review",
    refreshRule: "Continuation route changed",
    cadence:
      "Review before review resumes, closure proceeds, implementation continues, or retained and deferred scope changes after an allowed continuation record exists.",
    requiredInputs:
      "Continuation route changed refresh rule, allowed continuation record, continuing route, retained scope, deferred scope, verification summary, owner, default-path boundary, and proceed condition.",
    staleWhen:
      "Route, retained scope, deferred scope, owner, verification summary, boundary decision, or proceed condition differs from the current queued PR or follow-up state.",
    routeTo:
      "Refresh the allowed continuation record, rerun focused verification, return to follow-up review outcome routing, keep work paused, or split deferred scope back to its follow-up path.",
    maintainerAction:
      "Check retained and deferred scope, rerun the focused command set, update owner and proceed condition, and keep unrelated implementation outside the continuation route.",
    record:
      "Record review date, continuing route, retained scope, deferred scope, owner, verification result, boundary decision, proceed condition, and next route."
  },
  {
    review: "Blocker evidence refresh review",
    refreshRule: "Blocker or escalation evidence changed",
    cadence:
      "Review at every release-blocking check, before merge or closure, and whenever blocker evidence, resolution condition, or default-path boundary evidence changes.",
    requiredInputs:
      "Blocker or escalation evidence changed refresh rule, blocker record, missing evidence, blocker link, owner, paused state, release verification requirement, boundary decision, and next review date.",
    staleWhen:
      "Blocker evidence is missing, owner is stale, next review date passed, resolution condition changed, or release/default-path verification no longer matches the blocker record.",
    routeTo:
      "Refresh the escalation or block record, rerun read-only smoke, run `pnpm verify:release` when required, keep merge or closure paused, or reroute to audit blocker escalation.",
    maintainerAction:
      "Refresh blocker evidence, verify owner and resolution condition, rerun required commands, and decide whether escalation remains blocking or can return to closeout.",
    record:
      "Record review date, blocker status, owner, missing evidence, command results, release verification decision, resolution condition, and next review date."
  },
  {
    review: "Parked ownership refresh review",
    refreshRule: "Parked or blocked ownership changed",
    cadence:
      "Review at the recorded revisit date, when ownership or roadmap status changes, and before closing the source follow-up or starting deferred scope.",
    requiredInputs:
      "Parked or blocked ownership changed refresh rule, parked or blocked record, owner, retained scope, deferred scope, target list or roadmap candidate, revisit date or stop condition, and paused state.",
    staleWhen:
      "Owner is missing, target list or roadmap status changed, revisit date passed, stop condition is unclear, retained or deferred scope changed, or paused state is no longer explicit.",
    routeTo:
      "Refresh the parked or blocked ownership record, keep the follow-up parked, update roadmap or target status, reroute to close/resume blocked audit, or close as obsolete after the stop condition is met.",
    maintainerAction:
      "Update owner, target status, retained and deferred scope, revisit or stop condition, and confirm no deferred implementation starts from the stale record.",
    record:
      "Record review date, owner, target status, retained and deferred scope, revisit or stop condition, paused state, refresh decision, and next action."
  },
  {
    review: "Default-path verification refresh review",
    refreshRule: "Default-path verification evidence changed",
    cadence:
      "Review immediately before proceed, park, block, close, or resume decisions and whenever read-only smoke, release surfaces, package behavior, or default-path boundary evidence changes.",
    requiredInputs:
      "Default-path verification evidence changed refresh rule, default-path verification closeout record, read-only smoke result or non-applicability, release verification decision, no-write/no-network/no-script notes, owner, and boundary decision.",
    staleWhen:
      "Read-only smoke is missing or older than the changed surface, release verification decision changed, no-write/no-network/no-script notes are absent, owner changed, or boundary decision no longer matches current behavior.",
    routeTo:
      "Refresh the default-path verification closeout record, rerun read-only smoke, run `pnpm verify:release` when required, escalate an audit blocker, or keep close/resume paused.",
    maintainerAction:
      "Rerun boundary verification, update no-write/no-network/no-script evidence, confirm owner and remaining risk, and decide whether closeout can proceed or must stay blocked.",
    record:
      "Record review date, verification commands or non-applicability, read-only smoke result, release verification decision, boundary notes, owner, remaining risk, and closeout route."
  }
];

export const accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRouting = [
  {
    outcome: "Accept refreshed closeout record",
    reviewScope:
      "Closeout source refresh review, Continuation route refresh review, Default-path verification refresh review",
    appliesWhen:
      "Refresh review confirms the closeout record, route, owner, verification, and default-path boundary are current and can support the named continuation, closure, resume, park, block, or escalation decision.",
    requiredEvidence:
      "Refresh review cadence entry, refreshed closeout record, current owner, refreshed source or route link, focused verification result or non-applicability, and default-path boundary decision.",
    routeTo:
      "Proceed with the named closeout decision, continuation route, closure, resume, parking, blocking, or escalation path without broadening implementation scope.",
    maintainerAction:
      "Link the refreshed record, record the accepted route, keep unrelated detector, scanner, reporter, scoring, schema, or example-output work outside scope, and continue only the named path.",
    record:
      "Record accepted outcome, review entry, refreshed record link, owner, verification summary, route, boundary decision, and next action."
  },
  {
    outcome: "Refresh closeout record again",
    reviewScope:
      "Closeout source refresh review, Continuation route refresh review, Parked ownership refresh review, Default-path verification refresh review",
    appliesWhen:
      "Refresh review finds the closeout record is still useful but owner, route, source link, retained or deferred scope, parked status, or verification evidence remains stale or incomplete.",
    requiredEvidence:
      "Refresh review cadence entry, stale fields, current closeout record, owner or missing-owner status, requested refresh, command set to rerun if any, and paused state.",
    routeTo:
      "Return to the matching Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules entry and keep the follow-up paused until fields are current.",
    maintainerAction:
      "Refresh only the stale fields, rerun focused verification only when evidence changed, update owner and next review date, and rerun refresh review before continuation or closure.",
    record:
      "Record stale fields, refresh owner, requested update, rerun commands or non-applicability, paused state, and next refresh review date."
  },
  {
    outcome: "Escalate or keep closeout blocked",
    reviewScope: "Blocker evidence refresh review, Default-path verification refresh review",
    appliesWhen:
      "Refresh review finds missing blocker evidence, failing read-only smoke, unresolved release verification, missing owner, or default-path uncertainty that prevents merge, closure, review resume, or escalation resolution.",
    requiredEvidence:
      "Refresh review cadence entry, blocker or default-path evidence gap, owner or missing-owner status, failed or missing command output, release verification requirement, blocker link, and resolution condition.",
    routeTo:
      "Audit blocker escalation, close/resume blocked audit, release-blocking review, or refreshed escalation record before closure, resume, or merge continues.",
    maintainerAction:
      "Keep closure and review resume paused, assign or confirm owner, rerun read-only smoke and `pnpm verify:release` when required, and record the blocker resolution condition.",
    record:
      "Record blocked outcome, blocker link, owner, missing evidence, command result, release verification decision, resolution condition, and next review date."
  },
  {
    outcome: "Park or defer refreshed closeout",
    reviewScope: "Continuation route refresh review, Parked ownership refresh review",
    appliesWhen:
      "Refresh review confirms refreshed evidence is current but the retained route, deferred scope, owner capacity, roadmap status, or revisit condition means the closeout should remain parked or deferred.",
    requiredEvidence:
      "Refresh review cadence entry, parked or deferred record, owner, retained scope, deferred scope, target list or roadmap candidate, revisit date or stop condition, and no-current-implementation note.",
    routeTo:
      "Parked follow-up audit record, roadmap candidate, deferred scope follow-up, or close/resume blocked audit when closure or resume is requested too early.",
    maintainerAction:
      "Update parked status, owner, roadmap or target list, retained and deferred scope, revisit or stop condition, and keep deferred implementation outside the current PR.",
    record:
      "Record parked or deferred outcome, owner, retained scope, deferred scope, target status, revisit or stop condition, paused state, and next action."
  },
  {
    outcome: "Close or supersede refreshed closeout",
    reviewScope:
      "Closeout source refresh review, Parked ownership refresh review, Default-path verification refresh review",
    appliesWhen:
      "Refresh review confirms the closeout is obsolete, superseded by a newer route, already closed by linked evidence, or out of scope without remaining fixture-backed follow-up work.",
    requiredEvidence:
      "Refresh review cadence entry, superseding route or closure rationale, refreshed source link, owner, no remaining action note, default-path boundary decision, and closure or supersede link.",
    routeTo:
      "Close the follow-up, link the superseding issue or PR, update roadmap status if needed, or record out-of-scope closure without starting implementation.",
    maintainerAction:
      "Link the superseding record, confirm no remaining fixture-backed work, preserve default-path boundary evidence, update owner or roadmap status, and close only after the record is current.",
    record:
      "Record close or supersede outcome, closure rationale, superseding link, owner, default-path boundary, no remaining action note, and final status."
  }
];

export const accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordTemplates = [
  {
    template: "Accepted refreshed closeout record",
    outcome: "Accept refreshed closeout record",
    useWhen:
      "Refresh review outcome routing accepts the refreshed closeout record as current enough to support the named continuation, closure, resume, park, block, or escalation decision.",
    requiredInputs:
      "Routing outcome, refresh review cadence entry, refreshed closeout record link, owner, source or route link, verification summary or non-applicability, default-path boundary decision, and next action.",
    recordBody:
      "Record the accepted outcome, refreshed record link, owner, verification summary, current route, default-path boundary decision, scope boundary, and next action.",
    followUp:
      "Proceed only with the named route and keep unrelated detector, scanner, reporter, scoring, schema, or example-output work outside the accepted closeout path."
  },
  {
    template: "Refresh-again closeout record",
    outcome: "Refresh closeout record again",
    useWhen:
      "Refresh review outcome routing finds the closeout record remains useful but stale fields, ownership, route, scope, parked status, or verification evidence still need another refresh.",
    requiredInputs:
      "Routing outcome, refresh review cadence entry, stale fields, current closeout record link, owner or missing-owner status, requested refresh, command set to rerun or non-applicability, paused state, and next review date.",
    recordBody:
      "Record stale fields, refresh owner, requested update, command rerun plan or non-applicability, paused state, current route, and next refresh review date.",
    followUp:
      "Return to the matching closeout record refresh rule, update only the stale fields, and rerun refresh review before continuation or closure proceeds."
  },
  {
    template: "Blocked refreshed closeout record",
    outcome: "Escalate or keep closeout blocked",
    useWhen:
      "Refresh review outcome routing keeps closure, merge, review resume, or escalation resolution blocked because blocker evidence, owner, release verification, or default-path boundary remains incomplete.",
    requiredInputs:
      "Routing outcome, refresh review cadence entry, blocker or default-path evidence gap, owner or missing-owner status, failed or missing command output, release verification requirement, blocker link, resolution condition, and next review date.",
    recordBody:
      "Record blocked outcome, blocker link, owner, missing evidence, command result, release verification decision, read-only boundary status, resolution condition, paused route, and next review date.",
    followUp:
      "Keep closure, merge, and review resume paused until the owner links refreshed evidence and reroutes through blocker escalation or closeout review as required."
  },
  {
    template: "Parked refreshed closeout record",
    outcome: "Park or defer refreshed closeout",
    useWhen:
      "Refresh review outcome routing confirms current evidence but leaves the closeout parked or deferred because retained scope, deferred scope, owner capacity, roadmap status, or revisit condition says work should not proceed now.",
    requiredInputs:
      "Routing outcome, refresh review cadence entry, parked or deferred record, owner, retained scope, deferred scope, target list or roadmap candidate, revisit date or stop condition, paused state, and no-current-implementation note.",
    recordBody:
      "Record parked or deferred outcome, owner, retained scope, deferred scope, target or roadmap status, revisit date or stop condition, paused state, and implementation pause note.",
    followUp:
      "Keep the follow-up parked or deferred until the revisit or stop condition is met; do not start deferred implementation from this record."
  },
  {
    template: "Closed or superseded refreshed closeout record",
    outcome: "Close or supersede refreshed closeout",
    useWhen:
      "Refresh review outcome routing closes or supersedes the refreshed closeout because a newer route owns the work, linked evidence already closed it, or no fixture-backed follow-up remains.",
    requiredInputs:
      "Routing outcome, refresh review cadence entry, superseding route or closure rationale, refreshed source link, owner, no remaining action note, default-path boundary decision, closure or supersede link, and final status.",
    recordBody:
      "Record close or supersede outcome, closure rationale, superseding link, owner, default-path boundary, no remaining action note, final status, and any roadmap status update.",
    followUp:
      "Close the follow-up or link the superseding issue or PR only after the refreshed record is current and no remaining fixture-backed work is unowned."
  }
];

export const accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditChecklist = [
  {
    item: "Refresh review outcome template matches route",
    templateScope:
      "Accepted refreshed closeout record, Refresh-again closeout record, Blocked refreshed closeout record, Parked refreshed closeout record, Closed or superseded refreshed closeout record",
    reviewQuestion:
      "Does the selected refreshed closeout outcome record template match the refresh review outcome route and current closeout state?",
    requiredEvidence:
      "Selected refresh review outcome route, selected refreshed closeout outcome record template, refresh review cadence entry, refreshed closeout record link, owner, current queued PR or issue link, and next action.",
    passWhen:
      "The template outcome matches the routed refresh review outcome and the record does not mix accepted, refresh-again, blocked, parked, or closed states.",
    ifMissing:
      "Return to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing before continuation or closure proceeds.",
    record:
      "Record template name, routed refresh review outcome, refreshed closeout record link, owner, current route, and confirmation that no other outcome state is mixed into the record."
  },
  {
    item: "Required inputs are complete",
    templateScope:
      "Accepted refreshed closeout record, Refresh-again closeout record, Blocked refreshed closeout record, Parked refreshed closeout record, Closed or superseded refreshed closeout record",
    reviewQuestion:
      "Are all required inputs from the selected refreshed closeout outcome record template present, current, and linked?",
    requiredEvidence:
      "Required inputs from the selected template, routing outcome, refresh review cadence entry, refreshed source link, owner, verification summary or non-applicability, blocker or parked status when relevant, next review date, and final status when closing.",
    passWhen:
      "Every required input is present, current, and specific enough for a reviewer to reproduce why the refreshed closeout is accepted, refreshed again, blocked, parked, closed, or superseded.",
    ifMissing:
      "Refresh the outcome record and keep continuation, closure, resume, parking, blocking, or escalation paused until missing inputs are filled.",
    record:
      "Record completed inputs, missing-input check result, owner, refreshed evidence links, verification or blocker evidence, paused state, and next review or final status."
  },
  {
    item: "Record body is traceable",
    templateScope:
      "Accepted refreshed closeout record, Refresh-again closeout record, Blocked refreshed closeout record, Parked refreshed closeout record, Closed or superseded refreshed closeout record",
    reviewQuestion:
      "Can a reviewer trace the record body from refresh review outcome to source evidence, verification, boundary decision, and follow-up without private context?",
    requiredEvidence:
      "Record body, refresh review cadence entry, refreshed closeout record link, evidence links, command output or non-applicability, blocker or superseding link when relevant, retained/deferred scope note, and default-path boundary decision.",
    passWhen:
      "The record body links the decision to evidence and verification, names the retained or closed scope, and explains the follow-up without relying on private context.",
    ifMissing:
      "Update the record body before continuation, closure, resume, parking, blocking, escalation, or roadmap/status change proceeds.",
    record:
      "Record traceability result, evidence links checked, command outputs checked, scope boundary, boundary decision, reviewer note, and remaining follow-up risk."
  },
  {
    item: "Owner and follow-up are explicit",
    templateScope:
      "Accepted refreshed closeout record, Refresh-again closeout record, Blocked refreshed closeout record, Parked refreshed closeout record, Closed or superseded refreshed closeout record",
    reviewQuestion:
      "Does the refreshed closeout outcome record leave one owner, one follow-up, and one stop, revisit, or closure condition?",
    requiredEvidence:
      "Owner, follow-up action, stop condition or revisit date, closure or supersede link when relevant, queue or roadmap target, paused/proceed decision, retained scope, and deferred scope.",
    passWhen:
      "The follow-up is unambiguous, owned, dated or stop-conditioned, and does not leave accepted, refresh-again, blocked, parked, closed, or superseded work ownerless.",
    ifMissing:
      "Assign an owner or keep the refreshed closeout paused; do not continue, close, park, block, supersede, or resolve escalation with ownerless follow-up.",
    record:
      "Record owner, follow-up action, retained and deferred scope, stop condition, revisit date if needed, paused/proceed state, and remaining owner handoff."
  },
  {
    item: "Default-path boundary is preserved",
    templateScope:
      "Accepted refreshed closeout record, Refresh-again closeout record, Blocked refreshed closeout record, Parked refreshed closeout record, Closed or superseded refreshed closeout record",
    reviewQuestion:
      "Does the refreshed closeout outcome record preserve the default local, deterministic, read-only `bootlane check` path?",
    requiredEvidence:
      "Read-only smoke result or explicit non-applicability, no target-file write note, no network requirement note, no project-script execution note, scanner-boundary note, release verification decision when relevant, and blocker escalation status when uncertain.",
    passWhen:
      "The record proves or explicitly preserves the default-path boundary and escalates uncertainty instead of allowing continuation, closure, resume, parking, blocking, or supersede to proceed unsupported.",
    ifMissing:
      "Rerun read-only smoke, refresh boundary evidence, or escalate a blocker before continuation, closure, public-surface refresh, parking, blocking, or review resume continues.",
    record:
      "Record read-only boundary decision, smoke evidence or non-applicability, release verification decision, no-write/no-network/no-script notes, escalation status, owner, and resolution condition."
  }
];

export const accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRouting = [
  {
    outcome: "Refreshed outcome record audit passed",
    auditScope: "Refresh review outcome template matches route, Required inputs are complete, Record body is traceable, Owner and follow-up are explicit, Default-path boundary is preserved",
    appliesWhen: "Every selected refreshed closeout outcome record audit checklist item passes and the record has one routed outcome, owner, follow-up, and preserved default-path boundary.",
    requiredEvidence: "Completed audit checklist entry, selected refreshed closeout outcome record template, routed refresh review outcome, refreshed closeout record link, owner, verification summary, default-path boundary decision, and next action.",
    routeTo: "Proceed with the named continuation, closure, resume, parking, blocking, or escalation route from the audited refreshed closeout outcome record without broadening scope.",
    maintainerAction: "Link the passed audit from the refreshed closeout outcome record, continue only the named route, and keep unrelated detector, scanner, reporter, scoring, schema, or example-output work out of scope.",
    record: "Record audit pass date, checklist items checked, refreshed outcome record template, routed outcome, owner, continuing route, verification summary, default-path boundary, and next action."
  },
  {
    outcome: "Refresh refreshed outcome record",
    auditScope: "Refresh review outcome template matches route, Required inputs are complete, Record body is traceable, Owner and follow-up are explicit",
    appliesWhen: "The audit finds a mismatched template, stale required input, incomplete traceability, missing owner, unclear follow-up, or stale stop, revisit, closure, or supersede condition.",
    requiredEvidence: "Audit failure note, affected refreshed outcome record fields, source refresh review outcome, refreshed closeout record link, owner or missing-owner status, refresh command set if any, and paused state.",
    routeTo: "Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates for a corrected or refreshed outcome record before continuation or closure proceeds.",
    maintainerAction: "Pause continuation, closure, resume, parking, blocking, or escalation resolution; refresh only the stale fields; rerun focused verification only when the stale field depends on command output.",
    record: "Record failed audit item, stale or missing fields, refresh owner, rerun commands or non-applicability, corrected record link, paused state, and next audit date."
  },
  {
    outcome: "Escalate refreshed outcome record blocker",
    auditScope: "Default-path boundary is preserved, Required inputs are complete, Record body is traceable",
    appliesWhen: "The audit cannot prove read-only smoke, release verification, blocker evidence, source evidence, closure rationale, supersede link, or default-path boundary before continuation, closure, resume, parking, blocking, or escalation resolution.",
    requiredEvidence: "Missing or failing boundary evidence, affected public or release surface, command output or evidence gap, owner or missing-owner status, blocker link, release verification decision, and resolution condition.",
    routeTo: "Audit blocker escalation, release-blocking review, read-only smoke refresh, pnpm verify:release, or scoped evidence refresh before continuation, closure, resume, or escalation resolution proceeds.",
    maintainerAction: "Block continuation, closure, review resume, and escalation resolution until boundary evidence is current; assign the owner and record the blocker resolution condition.",
    record: "Record blocker reason, affected surface, failed or missing evidence, release verification requirement, owner, blocker link, resolution condition, and next review date."
  },
  {
    outcome: "Keep refreshed closeout parked",
    auditScope: "Owner and follow-up are explicit, Record body is traceable, Required inputs are complete",
    appliesWhen: "The audit confirms a parked or deferred refreshed closeout outcome remains valid, owned, scoped, and dated or stop-conditioned without needing current implementation.",
    requiredEvidence: "Parked refreshed closeout record, retained scope, deferred scope, owner, target list or roadmap candidate, evidence quality, revisit date or stop condition, paused state, and no-current-implementation note.",
    routeTo: "Existing parked follow-up, roadmap candidate, deferred seed list, later starter batch, or closed current PR follow-up link without starting implementation.",
    maintainerAction: "Keep the refreshed closeout parked, refresh only ownership or revisit metadata if stale, and avoid starting detector, scanner, reporter, scoring, schema, or example-output work.",
    record: "Record parked status, owner, target list or roadmap status, retained scope, deferred scope, next review date or stop condition, paused state, and reason implementation remains paused."
  },
  {
    outcome: "Block closeout close or continuation",
    auditScope: "Refresh review outcome template matches route, Required inputs are complete, Owner and follow-up are explicit, Default-path boundary is preserved",
    appliesWhen: "A close, supersede, continuation, resume, park, block, or escalation-resolution decision is requested but audit evidence, owner, follow-up, closure rationale, or default-path boundary is incomplete.",
    requiredEvidence: "Requested close or continuation route, missing audit evidence, owner or missing-owner status, closure or continuation rationale gap, read-only boundary decision, blocker or refresh requirement, and paused state.",
    routeTo: "Refresh refreshed outcome record, refresh review outcome routing, audit blocker escalation, or close/resume blocked audit before the requested close or continuation is allowed.",
    maintainerAction: "Keep the refreshed closeout open or paused, assign missing owner or evidence, and rerun only the focused verification needed to unblock the requested route.",
    record: "Record blocked route, missing evidence, owner assignment, boundary decision, required refresh or escalation, paused state, and condition for close or continuation."
  }
];

export const accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordTemplates = [
  {
    template: "Refreshed outcome audit pass record",
    outcome: "Refreshed outcome record audit passed",
    useWhen: "Audit outcome routing confirms every selected refreshed closeout outcome record audit checklist item passes and the audited route can proceed without broadening scope.",
    requiredInputs: "Routing outcome, completed audit checklist entry, refreshed closeout outcome record template, routed refresh review outcome, refreshed closeout record link, owner, verification summary, default-path boundary decision, and next action.",
    recordBody: "Record the passed audit, checklist items reviewed, refreshed outcome record template, routed outcome, owner, verification summary, default-path boundary, continuing route, and next action.",
    followUp: "Continue only the named route from the audited refreshed closeout outcome record and keep unrelated detector, scanner, reporter, scoring, schema, or example-output work outside scope."
  },
  {
    template: "Refreshed outcome record refresh record",
    outcome: "Refresh refreshed outcome record",
    useWhen: "Audit outcome routing finds stale or mismatched refreshed closeout outcome record fields that must be corrected before continuation, closure, resume, parking, blocking, or escalation proceeds.",
    requiredInputs: "Routing outcome, failed audit item, stale or missing fields, source refresh review outcome, refreshed closeout record link, owner or missing-owner status, refresh command set or non-applicability, paused state, and next audit date.",
    recordBody: "Record the failed audit item, stale or missing fields, refresh owner, command rerun plan or non-applicability, corrected record link, paused state, remaining risk, and next audit date.",
    followUp: "Refresh the matching refreshed closeout outcome record template entry and rerun only focused verification required to make stale evidence current."
  },
  {
    template: "Refreshed outcome blocker escalation record",
    outcome: "Escalate refreshed outcome record blocker",
    useWhen: "Audit outcome routing finds missing or failing boundary evidence, release verification, blocker evidence, source evidence, closure rationale, supersede link, or default-path proof.",
    requiredInputs: "Routing outcome, blocker reason, affected public or release surface, failed or missing evidence, command output or evidence gap, owner or missing-owner status, blocker link, release verification decision, and resolution condition.",
    recordBody: "Record the blocker reason, affected surface, missing or failing evidence, command output summary, release verification requirement, owner, blocker link, default-path boundary decision, and resolution condition.",
    followUp: "Keep continuation, closure, review resume, and escalation resolution blocked until the owner links refreshed evidence and reroutes through audit outcome routing or blocker escalation."
  },
  {
    template: "Refreshed closeout parked record",
    outcome: "Keep refreshed closeout parked",
    useWhen: "Audit outcome routing confirms a parked or deferred refreshed closeout outcome remains valid, owned, scoped, and dated or stop-conditioned without starting current implementation.",
    requiredInputs: "Routing outcome, parked refreshed closeout record, owner, retained scope, deferred scope, target list or roadmap candidate, evidence quality, revisit date or stop condition, paused state, and no-current-implementation note.",
    recordBody: "Record parked status, owner, target list or roadmap status, retained and deferred scope, evidence quality, revisit date or stop condition, paused state, and why implementation remains paused.",
    followUp: "Keep the refreshed closeout parked until the revisit or stop condition is met; update only ownership or revisit metadata when stale."
  },
  {
    template: "Closeout close or continuation blocked record",
    outcome: "Block closeout close or continuation",
    useWhen: "Audit outcome routing blocks a requested close, supersede, continuation, resume, park, block, or escalation-resolution decision because evidence, owner, follow-up, rationale, or default-path boundary is incomplete.",
    requiredInputs: "Routing outcome, requested close or continuation route, missing evidence, owner or missing-owner status, closure or continuation rationale gap, read-only boundary decision, blocker or refresh requirement, paused state, and unblock condition.",
    recordBody: "Record the blocked route, missing evidence, owner assignment, rationale gap, boundary decision, required refresh or escalation, paused state, and condition for close or continuation.",
    followUp: "Keep the refreshed closeout open or paused until missing owner or evidence is assigned, then reroute through audit outcome routing before close or continuation proceeds."
  }
];

export const accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutChecklist = [
  {
    item: "Refreshed audit outcome record is complete",
    templateScope:
      "Refreshed outcome audit pass record, Refreshed outcome record refresh record, Refreshed outcome blocker escalation record, Refreshed closeout parked record, Closeout close or continuation blocked record",
    appliesWhen:
      "Any refreshed audit outcome record is created before a closeout, continuation, refresh, escalation, parking, blocking, closure, or supersede decision relies on it.",
    requiredEvidence:
      "Selected refreshed audit outcome record template, routed refreshed audit outcome, completed required inputs, record body, follow-up, owner, source refreshed closeout record link, and current queued PR or issue link.",
    passWhen:
      "The selected template is filled, its outcome matches refreshed audit outcome routing, and the source record, owner, follow-up, and requested closeout or continuation route are linked without mixed states.",
    ifMissing:
      "Return to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates and keep closure or continuation paused until the refreshed audit outcome record is complete.",
    record:
      "Record template used, routed refreshed audit outcome, completed fields, owner, source link, current PR or issue link, and whether closure or continuation remains paused or can proceed."
  },
  {
    item: "Allowed closeout or continuation is explicit",
    templateScope:
      "Refreshed outcome audit pass record, Refreshed outcome record refresh record",
    appliesWhen:
      "The refreshed audit outcome would allow the closeout to proceed, continue the refreshed route, refresh the record, or return to review, closure, parking, or escalation resolution.",
    requiredEvidence:
      "Passed refreshed audit or refreshed record, allowed closeout or continuation route, verification summary, owner, retained scope, deferred scope, follow-up boundary, and unchanged default-path boundary decision.",
    passWhen:
      "The closeout or continuation route is named, owned, limited to the refreshed scope, and does not start detector, scanner, reporter, scoring, schema, or example-output work from the closeout checklist itself.",
    ifMissing:
      "Keep the refreshed audit outcome paused and reroute through refreshed audit outcome routing or refresh the outcome record before closeout, review resume, closure, parking, or escalation resolution proceeds.",
    record:
      "Record allowed closeout or continuation route, owner, verification summary, retained scope, deferred scope, default-path boundary, and the condition that allows closure or continuation to proceed."
  },
  {
    item: "Blocker or escalation is enforceable",
    templateScope:
      "Refreshed outcome blocker escalation record, Closeout close or continuation blocked record",
    appliesWhen:
      "The refreshed audit outcome keeps closeout, merge, closure, continuation, review resume, or escalation resolution blocked because evidence, owner, follow-up, or default-path boundary remains incomplete.",
    requiredEvidence:
      "Blocker or blocked-route record, missing evidence, owner, blocker link, paused state, read-only boundary decision, release verification requirement, affected surface, and resolution condition.",
    passWhen:
      "Closeout, closure, continuation, review resume, and escalation resolution remain paused until the named owner satisfies the resolution condition and refreshed evidence is linked.",
    ifMissing:
      "Escalate or keep the refreshed closeout open; do not close, continue, resume review, or resolve escalation with missing owner, blocker link, affected surface, or resolution condition.",
    record:
      "Record blocker status, paused route, affected surface, owner, missing evidence, release verification decision, blocker link, resolution condition, and next review date."
  },
  {
    item: "Parked or blocked refreshed state is owned",
    templateScope:
      "Refreshed closeout parked record, Closeout close or continuation blocked record",
    appliesWhen:
      "The refreshed audit outcome parks the closeout, keeps a close or continuation request blocked, or leaves retained and deferred refreshed scope outside the current queued PR.",
    requiredEvidence:
      "Parked or blocked refreshed record, owner, retained scope, deferred scope, target list or roadmap candidate, revisit date or stop condition, paused state, and no-current-implementation note.",
    passWhen:
      "The parked or blocked refreshed state has one owner, one next review or stop condition, visible target or roadmap status, and no current implementation path for deferred scope.",
    ifMissing:
      "Assign an owner, add a revisit or stop condition, or refresh the record before parking, blocking closeout or continuation, closing the current PR, or superseding the refreshed closeout.",
    record:
      "Record owner, parked or blocked refreshed state, target list or roadmap status, retained and deferred scope, next review date or stop condition, paused state, and implementation pause note."
  },
  {
    item: "Default-path verification closeout is recorded",
    templateScope:
      "Refreshed outcome audit pass record, Refreshed outcome record refresh record, Refreshed outcome blocker escalation record, Refreshed closeout parked record, Closeout close or continuation blocked record",
    appliesWhen:
      "Any refreshed audit outcome closeout would allow work to continue, close, stay parked, remain blocked, escalate, supersede, or resume after refreshed closeout outcome record audit outcome routing.",
    requiredEvidence:
      "Read-only smoke result or explicit non-applicability, release verification decision, no target-file write note, no network requirement note, no project-script execution note, verification summary, owner, and boundary decision.",
    passWhen:
      "Verification matches the refreshed audit outcome closeout decision and the record proves default `bootlane check` stays local, deterministic, read-only, network-free, and free of project script execution.",
    ifMissing:
      "Rerun read-only smoke, escalate a refreshed audit blocker, or keep closeout, closure, continuation, parking, blocking, supersede, or review resume paused until boundary evidence is current.",
    record:
      "Record verification summary, read-only smoke or non-applicability, release verification decision, no-write/no-network/no-script notes, owner, and default-path boundary result."
  }
];

export const accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates = [
  {
    template: "Refreshed audit outcome closeout completion record",
    item: "Refreshed audit outcome record is complete",
    useWhen:
      "Closeout confirms the refreshed audit outcome record template is filled, routed, owned, linked, and free of mixed closeout, continuation, refresh, escalation, park, block, closure, or supersede states.",
    requiredInputs:
      "Closeout item, selected refreshed audit outcome record template, routed refreshed audit outcome, completed fields, owner, source refreshed closeout record link, current queued PR or issue link, and paused-or-proceed decision.",
    recordBody:
      "Record the completed refreshed audit outcome template, routed outcome, source and current links, owner, required fields checked, mixed-state check result, and whether closure or continuation remains paused or can proceed.",
    followUp:
      "Allow the next closeout or continuation check only after the source refreshed record and current route are linked; otherwise refresh the audit outcome record before closure or continuation proceeds."
  },
  {
    template: "Allowed refreshed closeout or continuation record",
    item: "Allowed closeout or continuation is explicit",
    useWhen:
      "Closeout confirms a passed refreshed audit or refreshed record may close, continue, resume review, park, or return to escalation resolution without broadening scope.",
    requiredInputs:
      "Closeout item, passed refreshed audit or refreshed record, allowed closeout or continuation route, owner, verification summary, retained scope, deferred scope, default-path boundary decision, and proceed condition.",
    recordBody:
      "Record the allowed closeout or continuation route, owner, verification summary, retained and deferred scope, default-path boundary, proceed condition, and explicit note that implementation does not start from closeout.",
    followUp:
      "Proceed only on the named refreshed route and send unrelated detector, scanner, reporter, scoring, schema, or example-output work back to its follow-up path."
  },
  {
    template: "Refreshed blocker or escalation closeout record",
    item: "Blocker or escalation is enforceable",
    useWhen:
      "Closeout confirms closeout, merge, closure, continuation, review resume, or escalation resolution must stay blocked until missing evidence, owner, follow-up, or default-path boundary uncertainty is resolved.",
    requiredInputs:
      "Closeout item, blocker or blocked-route record, missing evidence, affected surface, owner, blocker link, paused state, read-only boundary decision, release verification requirement, and resolution condition.",
    recordBody:
      "Record the blocked route, affected surface, missing evidence, owner, blocker link, paused state, release verification decision, read-only boundary status, resolution condition, and next review date.",
    followUp:
      "Keep closeout, closure, continuation, and review resume paused until the owner links refreshed evidence and reruns refreshed audit outcome routing or closeout as required."
  },
  {
    template: "Parked refreshed state closeout record",
    item: "Parked or blocked refreshed state is owned",
    useWhen:
      "Closeout confirms a refreshed parked closeout, blocked close or continuation request, or deferred refreshed scope has one owner, visible status, and a revisit or stop condition.",
    requiredInputs:
      "Closeout item, parked or blocked refreshed record, owner, retained scope, deferred scope, target list or roadmap candidate, revisit date or stop condition, paused state, and no-current-implementation note.",
    recordBody:
      "Record the parked or blocked refreshed status, owner, target list or roadmap status, retained and deferred scope, revisit date or stop condition, paused state, and implementation pause note.",
    followUp:
      "Keep the refreshed closeout parked or blocked until the revisit condition is met; do not start implementation for deferred scope from this closeout record."
  },
  {
    template: "Default-path refreshed verification closeout record",
    item: "Default-path verification closeout is recorded",
    useWhen:
      "Closeout confirms verification matches the refreshed audit outcome decision and default `bootlane check` remains local, deterministic, read-only, network-free, and free of project script execution.",
    requiredInputs:
      "Closeout item, read-only smoke result or non-applicability, release verification decision, no-write note, no-network note, no-project-script note, verification summary, owner, and boundary decision.",
    recordBody:
      "Record verification commands or non-applicability, read-only smoke result, release verification decision, no-write/no-network/no-script notes, owner, default-path boundary, and any remaining risk.",
    followUp:
      "Proceed, close, park, block, supersede, or resume only after boundary evidence is current; otherwise rerun read-only smoke or escalate a refreshed audit blocker."
  }
];

export const accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules = [
  {
    trigger: "Refreshed audit outcome source changed",
    recordTemplate: "Refreshed audit outcome closeout completion record",
    refreshWhen:
      "The selected refreshed audit outcome record template, routed refreshed audit outcome, source refreshed closeout record link, current queued PR or issue link, owner, or paused-or-proceed decision changes after the refreshed audit outcome closeout record was written.",
    updateRecord:
      "Update completed fields checked, source and current links, owner, mixed-state check result, routed refreshed audit outcome, and paused-or-proceed decision.",
    rerun:
      "Rerun refreshed audit outcome routing and the refreshed audit outcome closeout checklist before allowing closure, continuation, refresh, escalation, parking, blocking, supersede, or review resume decisions.",
    blockWhenStale:
      "Do not close, continue, resume, park, block, supersede, or escalate from a refreshed audit outcome completion record that points to stale source or route evidence."
  },
  {
    trigger: "Allowed refreshed closeout route changed",
    recordTemplate: "Allowed refreshed closeout or continuation record",
    refreshWhen:
      "Allowed closeout or continuation route, retained scope, deferred scope, verification summary, owner, default-path boundary decision, or proceed condition changes before closure, continuation, review resume, parking, or escalation resolution proceeds.",
    updateRecord:
      "Update allowed closeout or continuation route, owner, retained and deferred scope, verification summary, default-path boundary, proceed condition, and implementation pause note.",
    rerun:
      "Rerun the focused verification that supports the changed refreshed route and rerun closeout before closure or continuation continues.",
    blockWhenStale:
      "Do not use an older allowed refreshed closeout or continuation record to close, continue, resume review, park, resolve escalation, or start broader implementation work."
  },
  {
    trigger: "Refreshed blocker or escalation evidence changed",
    recordTemplate: "Refreshed blocker or escalation closeout record",
    refreshWhen:
      "Missing evidence, affected surface, blocker link, paused state, release verification requirement, read-only boundary decision, owner, resolution condition, or next review date changes.",
    updateRecord:
      "Update blocked route, affected surface, missing evidence, owner, blocker link, paused state, release verification decision, read-only boundary status, resolution condition, and next review date.",
    rerun:
      "Rerun read-only smoke and `pnpm verify:release` when the blocker touches release, package, public-surface, or default-path boundary evidence.",
    blockWhenStale:
      "Keep closeout, merge, closure, continuation, review resume, and escalation resolution paused while blocker evidence or resolution conditions are stale."
  },
  {
    trigger: "Parked refreshed state ownership changed",
    recordTemplate: "Parked refreshed state closeout record",
    refreshWhen:
      "Owner, target list, roadmap candidate, retained scope, deferred scope, revisit date, stop condition, paused state, or no-current-implementation note changes.",
    updateRecord:
      "Update parked or blocked refreshed status, owner, target list or roadmap status, retained and deferred scope, revisit date or stop condition, paused state, and implementation pause note.",
    rerun:
      "Rerun docs-only triage checks and any focused verification needed for changed ownership, refreshed scope, or roadmap status.",
    blockWhenStale:
      "Do not close, supersede, or start deferred implementation while refreshed ownership, revisit condition, or parked status is stale."
  },
  {
    trigger: "Default-path refreshed verification evidence changed",
    recordTemplate: "Default-path refreshed verification closeout record",
    refreshWhen:
      "Read-only smoke, release verification decision, no-write note, no-network note, no-project-script note, verification summary, owner, or boundary decision changes after refreshed audit outcome closeout.",
    updateRecord:
      "Update verification commands or non-applicability, read-only smoke result, release verification decision, no-write/no-network/no-script notes, owner, default-path boundary, and remaining risk.",
    rerun:
      "Rerun read-only smoke and escalate to `pnpm verify:release` when release surfaces, package behavior, or default-path behavior changed.",
    blockWhenStale:
      "Do not proceed, close, park, block, supersede, or resume from stale refreshed boundary evidence; rerun verification or escalate a refreshed audit blocker first."
  }
];

export const accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewCadence = [
  {
    review: "Refreshed audit outcome source refresh review",
    refreshRule: "Refreshed audit outcome source changed",
    cadence:
      "Review whenever the source refreshed audit outcome record template, routed refreshed audit outcome, source refreshed closeout record link, owner, current queued PR or issue link, or paused-or-proceed decision changes and again before closure, continuation, review resume, parking, blocking, supersede, or escalation relies on the record.",
    requiredInputs:
      "Refreshed audit outcome source changed refresh rule, refreshed audit outcome closeout completion record, selected refreshed audit outcome record template, routed refreshed audit outcome, source refreshed closeout record link, owner, current PR or issue link, and paused-or-proceed decision.",
    staleWhen:
      "Source link is missing, owner changed without a refreshed record, routed refreshed audit outcome no longer matches the source record, current PR or issue link changed, or the paused-or-proceed decision is older than current closeout state.",
    routeTo:
      "Refresh the refreshed audit outcome closeout completion record, rerun refreshed audit outcome routing and closeout checklist, keep closure or continuation paused, or escalate a refreshed audit blocker when source evidence cannot be reconciled.",
    maintainerAction:
      "Compare refreshed audit outcome source evidence with the current closeout route, update links and owner, rerun the required routing and checklist, and record whether closure or continuation stays paused.",
    record:
      "Record review date, refresh rule, source link, routed refreshed audit outcome, owner, stale fields, rerun result, paused-or-proceed status, and next review date."
  },
  {
    review: "Allowed refreshed closeout route refresh review",
    refreshRule: "Allowed refreshed closeout route changed",
    cadence:
      "Review before closure, continuation, review resume, parking, or escalation resolution whenever allowed route, retained scope, deferred scope, verification summary, owner, default-path boundary, or proceed condition changes.",
    requiredInputs:
      "Allowed refreshed closeout route changed refresh rule, allowed refreshed closeout or continuation record, allowed route, owner, retained scope, deferred scope, verification summary, default-path boundary decision, and proceed condition.",
    staleWhen:
      "Allowed route, owner, retained scope, deferred scope, verification summary, boundary decision, or proceed condition differs from the current refreshed closeout state or linked follow-up.",
    routeTo:
      "Refresh the allowed refreshed closeout or continuation record, rerun focused verification, return to refreshed closeout, keep continuation paused, or split deferred scope back to its follow-up path.",
    maintainerAction:
      "Recheck the allowed route and scope boundary, rerun the focused command set when evidence changed, update owner and proceed condition, and keep unrelated implementation outside the refreshed route.",
    record:
      "Record review date, allowed route, owner, retained scope, deferred scope, verification result, boundary decision, proceed condition, stale fields, and next route."
  },
  {
    review: "Refreshed blocker evidence refresh review",
    refreshRule: "Refreshed blocker or escalation evidence changed",
    cadence:
      "Review at every release-blocking check, before closeout, merge, closure, continuation, review resume, or escalation resolution, and whenever blocker evidence, affected surface, owner, or default-path boundary evidence changes.",
    requiredInputs:
      "Refreshed blocker or escalation evidence changed refresh rule, refreshed blocker or escalation closeout record, missing evidence, affected surface, blocker link, owner, paused state, release verification requirement, boundary decision, and next review date.",
    staleWhen:
      "Blocker evidence is missing, affected surface changed, owner is stale, next review date passed, resolution condition changed, or release/default-path verification no longer matches the closeout record.",
    routeTo:
      "Refresh the blocker or escalation closeout record, rerun read-only smoke, run `pnpm verify:release` when required, keep closure or continuation paused, or reroute to refreshed audit blocker escalation.",
    maintainerAction:
      "Refresh blocker evidence, verify owner and affected surface, rerun required commands, update resolution condition, and decide whether the blocker remains blocking or can return to closeout.",
    record:
      "Record review date, blocker status, affected surface, owner, missing evidence, command results, release verification decision, resolution condition, and next review date."
  },
  {
    review: "Parked refreshed state ownership refresh review",
    refreshRule: "Parked refreshed state ownership changed",
    cadence:
      "Review at the recorded revisit date, whenever owner, target list, roadmap candidate, retained scope, deferred scope, paused state, or stop condition changes, and before close, supersede, or deferred implementation starts.",
    requiredInputs:
      "Parked refreshed state ownership changed refresh rule, parked refreshed state closeout record, owner, retained scope, deferred scope, target list or roadmap candidate, revisit date or stop condition, paused state, and no-current-implementation note.",
    staleWhen:
      "Owner is missing, target list or roadmap status changed, revisit date passed, stop condition is unclear, retained or deferred refreshed scope changed, or paused state is no longer explicit.",
    routeTo:
      "Refresh the parked refreshed state closeout record, keep the refreshed closeout parked, update roadmap or target status, reroute to blocked closeout review, or close as obsolete after the stop condition is met.",
    maintainerAction:
      "Update owner, target status, retained and deferred scope, revisit or stop condition, and confirm no deferred implementation starts from stale refreshed parked state evidence.",
    record:
      "Record review date, owner, target status, retained and deferred scope, revisit or stop condition, paused state, refresh decision, and next action."
  },
  {
    review: "Default-path refreshed verification refresh review",
    refreshRule: "Default-path refreshed verification evidence changed",
    cadence:
      "Review immediately before proceed, close, park, block, supersede, or resume decisions and whenever read-only smoke, release surfaces, package behavior, owner, or default-path boundary evidence changes.",
    requiredInputs:
      "Default-path refreshed verification evidence changed refresh rule, default-path refreshed verification closeout record, read-only smoke result or non-applicability, release verification decision, no-write/no-network/no-script notes, owner, boundary decision, and remaining risk.",
    staleWhen:
      "Read-only smoke is missing or older than the changed surface, release verification decision changed, no-write/no-network/no-script notes are absent, owner changed, or boundary decision no longer matches current behavior.",
    routeTo:
      "Refresh the default-path refreshed verification closeout record, rerun read-only smoke, run `pnpm verify:release` when required, escalate a refreshed audit blocker, or keep close/continue/resume paused.",
    maintainerAction:
      "Rerun boundary verification, update no-write/no-network/no-script evidence, confirm owner and remaining risk, and decide whether closeout can proceed or must stay blocked.",
    record:
      "Record review date, verification commands or non-applicability, read-only smoke result, release verification decision, boundary notes, owner, remaining risk, and closeout route."
  }
];



export const accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRouting = [
  {
    outcome: "Accept refreshed audit outcome closeout refresh",
    reviewScope:
      "Refreshed audit outcome source refresh review, Allowed refreshed closeout route refresh review, Default-path refreshed verification refresh review",
    appliesWhen:
      "Refresh review confirms the refreshed audit outcome closeout record, owner, allowed route, verification, and default-path boundary are current enough to support closure, continuation, review resume, parking, blocking, supersede, or escalation.",
    requiredEvidence:
      "Refresh review cadence entry, refreshed audit outcome closeout record link, current owner, source refreshed audit outcome record link, allowed route or closure decision, verification result or non-applicability, and default-path boundary decision.",
    routeTo:
      "Proceed with the named closeout or continuation route, closure, review resume, parking, blocking, supersede, or escalation path without broadening implementation scope.",
    maintainerAction:
      "Link the accepted refreshed audit outcome closeout record, record the route, keep unrelated detector, scanner, reporter, scoring, schema, or example-output work outside scope, and continue only the named path.",
    record:
      "Record accepted refreshed audit outcome closeout refresh, review entry, closeout record link, owner, route, verification summary, boundary decision, and next action."
  },
  {
    outcome: "Refresh refreshed audit outcome closeout again",
    reviewScope:
      "Refreshed audit outcome source refresh review, Allowed refreshed closeout route refresh review, Parked refreshed state ownership refresh review, Default-path refreshed verification refresh review",
    appliesWhen:
      "Refresh review finds the refreshed audit outcome closeout record remains useful but source evidence, allowed route, owner, retained or deferred scope, parked status, or verification evidence is still stale or incomplete.",
    requiredEvidence:
      "Refresh review cadence entry, stale fields, current refreshed audit outcome closeout record link, owner or missing-owner status, requested refresh, command set to rerun if any, and paused state.",
    routeTo:
      "Return to the matching refreshed audit outcome closeout record refresh rule and keep closure, continuation, review resume, parking, blocking, supersede, or escalation paused until fields are current.",
    maintainerAction:
      "Refresh only stale fields, rerun focused verification only when evidence changed, update owner and next review date, and rerun refresh review before closure or continuation.",
    record:
      "Record stale fields, refresh owner, requested update, rerun commands or non-applicability, paused state, and next refresh review date."
  },
  {
    outcome: "Escalate or keep refreshed audit outcome closeout blocked",
    reviewScope: "Refreshed blocker evidence refresh review, Default-path refreshed verification refresh review",
    appliesWhen:
      "Refresh review finds missing blocker evidence, failed read-only smoke, unresolved release verification, missing owner, or default-path uncertainty that prevents closure, continuation, review resume, parking, blocking, supersede, or escalation resolution.",
    requiredEvidence:
      "Refresh review cadence entry, blocker or default-path evidence gap, owner or missing-owner status, failed or missing command output, release verification requirement, blocker link, affected surface, and resolution condition.",
    routeTo:
      "Refreshed audit blocker escalation, closeout close or continuation blocked record, release-blocking review, or refreshed audit outcome closeout record refresh before closure or continuation continues.",
    maintainerAction:
      "Keep closure, continuation, and review resume paused, assign or confirm owner, rerun read-only smoke and \`pnpm verify:release\` when required, and record the blocker resolution condition.",
    record:
      "Record blocked refreshed audit outcome closeout refresh, blocker link, affected surface, owner, missing evidence, command result, release verification decision, resolution condition, and next review date."
  },
  {
    outcome: "Park or defer refreshed audit outcome closeout",
    reviewScope: "Allowed refreshed closeout route refresh review, Parked refreshed state ownership refresh review",
    appliesWhen:
      "Refresh review confirms evidence is current but retained route, deferred scope, owner capacity, target list, roadmap status, revisit date, or stop condition means the refreshed audit outcome closeout should remain parked or deferred.",
    requiredEvidence:
      "Refresh review cadence entry, parked or deferred refreshed audit outcome closeout record, owner, retained scope, deferred scope, target list or roadmap candidate, revisit date or stop condition, and no-current-implementation note.",
    routeTo:
      "Parked refreshed state closeout record, roadmap candidate, deferred scope follow-up, or closeout close or continuation blocked record when closure or continuation is requested too early.",
    maintainerAction:
      "Update parked status, owner, roadmap or target list, retained and deferred scope, revisit or stop condition, and keep deferred implementation outside the current PR.",
    record:
      "Record parked or deferred refreshed audit outcome closeout refresh, owner, retained scope, deferred scope, target status, revisit or stop condition, paused state, and next action."
  },
  {
    outcome: "Close or supersede refreshed audit outcome closeout",
    reviewScope:
      "Refreshed audit outcome source refresh review, Parked refreshed state ownership refresh review, Default-path refreshed verification refresh review",
    appliesWhen:
      "Refresh review confirms the refreshed audit outcome closeout is obsolete, superseded by a newer route, already closed by linked evidence, or out of scope without remaining fixture-backed follow-up work.",
    requiredEvidence:
      "Refresh review cadence entry, superseding route or closure rationale, refreshed source link, owner, no remaining action note, default-path boundary decision, and closure or supersede link.",
    routeTo:
      "Close the refreshed audit outcome closeout, link the superseding issue or PR, update roadmap status if needed, or record out-of-scope closure without starting implementation.",
    maintainerAction:
      "Link the superseding record, confirm no remaining fixture-backed work, preserve default-path boundary evidence, update owner or roadmap status, and close only after the record is current.",
    record:
      "Record closed or superseded refreshed audit outcome closeout refresh, closure rationale, superseding link, owner, default-path boundary, no remaining action note, and final status."
  }
];


export const accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordTemplates = [
  {
    template: "Accepted refreshed audit outcome closeout refresh record",
    outcome: "Accept refreshed audit outcome closeout refresh",
    useWhen:
      "Outcome routing accepts the refreshed audit outcome closeout refresh as current enough to support the named closure, continuation, review resume, parking, blocking, supersede, or escalation path.",
    requiredInputs:
      "Routing outcome, refresh review cadence entry, refreshed audit outcome closeout record link, owner, allowed route or closure decision, verification summary or non-applicability, default-path boundary decision, and next action.",
    recordBody:
      "Record the accepted outcome, refreshed audit outcome closeout record link, owner, route, verification summary, default-path boundary decision, scope boundary, and next action.",
    followUp:
      "Proceed only with the named route and keep unrelated detector, scanner, reporter, scoring, schema, or example-output work outside the accepted refreshed audit outcome closeout path."
  },
  {
    template: "Refresh-again refreshed audit outcome closeout record",
    outcome: "Refresh refreshed audit outcome closeout again",
    useWhen:
      "Outcome routing finds the refreshed audit outcome closeout record remains useful but source evidence, allowed route, ownership, retained or deferred scope, parked status, or verification evidence still needs another refresh.",
    requiredInputs:
      "Routing outcome, refresh review cadence entry, stale fields, current refreshed audit outcome closeout record link, owner or missing-owner status, requested refresh, command set to rerun or non-applicability, paused state, and next review date.",
    recordBody:
      "Record stale fields, refresh owner, requested update, command rerun plan or non-applicability, paused state, current route, retained and deferred scope if affected, and next refresh review date.",
    followUp:
      "Return to the matching refreshed audit outcome closeout record refresh rule, update only stale fields, and rerun refresh review before closure or continuation proceeds."
  },
  {
    template: "Blocked refreshed audit outcome closeout refresh record",
    outcome: "Escalate or keep refreshed audit outcome closeout blocked",
    useWhen:
      "Outcome routing keeps closure, continuation, review resume, parking, blocking, supersede, or escalation resolution blocked because blocker evidence, owner, release verification, or default-path boundary remains incomplete.",
    requiredInputs:
      "Routing outcome, refresh review cadence entry, blocker or default-path evidence gap, affected surface, owner or missing-owner status, failed or missing command output, release verification requirement, blocker link, resolution condition, and next review date.",
    recordBody:
      "Record blocked outcome, blocker link, affected surface, owner, missing evidence, command result, release verification decision, read-only boundary status, resolution condition, paused route, and next review date.",
    followUp:
      "Keep closure, continuation, review resume, and escalation resolution paused until the owner links refreshed evidence and reruns refresh review outcome routing."
  },
  {
    template: "Parked refreshed audit outcome closeout refresh record",
    outcome: "Park or defer refreshed audit outcome closeout",
    useWhen:
      "Outcome routing confirms evidence is current but retained route, deferred scope, owner capacity, target list, roadmap status, revisit date, or stop condition keeps the refreshed audit outcome closeout parked or deferred.",
    requiredInputs:
      "Routing outcome, refresh review cadence entry, parked or deferred refreshed audit outcome closeout record link, owner, retained scope, deferred scope, target list or roadmap candidate, revisit date or stop condition, paused state, and no-current-implementation note.",
    recordBody:
      "Record parked or deferred outcome, owner, retained and deferred scope, target list or roadmap status, revisit date or stop condition, paused state, no-current-implementation note, and next action.",
    followUp:
      "Keep deferred implementation outside the current PR and revisit only through the recorded target, owner, and stop or review condition."
  },
  {
    template: "Closed or superseded refreshed audit outcome closeout refresh record",
    outcome: "Close or supersede refreshed audit outcome closeout",
    useWhen:
      "Outcome routing confirms the refreshed audit outcome closeout is obsolete, superseded, already closed by linked evidence, or out of scope without remaining fixture-backed follow-up work.",
    requiredInputs:
      "Routing outcome, refresh review cadence entry, superseding route or closure rationale, refreshed source link, owner, no remaining action note, default-path boundary decision, closure or supersede link, and final status.",
    recordBody:
      "Record closed or superseded outcome, closure rationale, superseding issue or PR link, owner, default-path boundary, no remaining fixture-backed action note, roadmap update if needed, and final status.",
    followUp:
      "Close or supersede only after links and boundary evidence are current; route any new fixture-backed scope through a fresh intake or follow-up path."
  }
];

export const accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditChecklist = [
  {
    item: "Refreshed audit outcome template matches route",
    templateScope:
      "Accepted refreshed audit outcome closeout refresh record, Refresh-again refreshed audit outcome closeout record, Blocked refreshed audit outcome closeout refresh record, Parked refreshed audit outcome closeout refresh record, Closed or superseded refreshed audit outcome closeout refresh record",
    reviewQuestion:
      "Does the selected refreshed audit outcome closeout refresh review outcome record template match the routed outcome and current closeout state?",
    requiredEvidence:
      "Selected refreshed audit outcome closeout refresh review outcome route, selected outcome record template, refresh review cadence entry, refreshed audit outcome closeout record link, owner, current queued PR or issue link, and next action.",
    passWhen:
      "The template outcome matches the routed refresh review outcome and the record does not mix accepted, refresh-again, blocked, parked, closed, or superseded states.",
    ifMissing:
      "Return to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing before closure or continuation proceeds.",
    record:
      "Record template name, routed refresh review outcome, refreshed audit outcome closeout record link, owner, current route, and confirmation that no other outcome state is mixed into the record."
  },
  {
    item: "Required refreshed audit outcome inputs are complete",
    templateScope:
      "Accepted refreshed audit outcome closeout refresh record, Refresh-again refreshed audit outcome closeout record, Blocked refreshed audit outcome closeout refresh record, Parked refreshed audit outcome closeout refresh record, Closed or superseded refreshed audit outcome closeout refresh record",
    reviewQuestion:
      "Are all required inputs from the selected refreshed audit outcome closeout refresh review outcome record template present, current, and linked?",
    requiredEvidence:
      "Required inputs from the selected template, routing outcome, refresh review cadence entry, refreshed source link, owner, verification summary or non-applicability, blocker or parked status when relevant, next review date, and final status when closing.",
    passWhen:
      "Every required input is present, current, and specific enough for a reviewer to reproduce why the refreshed audit outcome closeout refresh is accepted, refreshed again, blocked, parked, closed, or superseded.",
    ifMissing:
      "Refresh the outcome record and keep continuation, closure, review resume, parking, blocking, supersede, or escalation paused until missing inputs are filled.",
    record:
      "Record completed inputs, missing-input check result, owner, refreshed evidence links, verification or blocker evidence, paused state, and next review or final status."
  },
  {
    item: "Refreshed audit outcome record body is traceable",
    templateScope:
      "Accepted refreshed audit outcome closeout refresh record, Refresh-again refreshed audit outcome closeout record, Blocked refreshed audit outcome closeout refresh record, Parked refreshed audit outcome closeout refresh record, Closed or superseded refreshed audit outcome closeout refresh record",
    reviewQuestion:
      "Can a reviewer trace the record body from refreshed audit outcome closeout refresh review outcome to source evidence, verification, boundary decision, and follow-up without private context?",
    requiredEvidence:
      "Record body, refresh review cadence entry, refreshed audit outcome closeout record link, evidence links, command output or non-applicability, blocker or superseding link when relevant, retained/deferred scope note, and default-path boundary decision.",
    passWhen:
      "The record body links the decision to evidence and verification, names the retained or closed scope, and explains the follow-up without relying on private context.",
    ifMissing:
      "Update the record body before continuation, closure, review resume, parking, blocking, escalation, supersede, or roadmap/status change proceeds.",
    record:
      "Record traceability result, evidence links checked, command outputs checked, scope boundary, boundary decision, reviewer note, and remaining follow-up risk."
  },
  {
    item: "Refreshed audit outcome owner and follow-up are explicit",
    templateScope:
      "Accepted refreshed audit outcome closeout refresh record, Refresh-again refreshed audit outcome closeout record, Blocked refreshed audit outcome closeout refresh record, Parked refreshed audit outcome closeout refresh record, Closed or superseded refreshed audit outcome closeout refresh record",
    reviewQuestion:
      "Does the refreshed audit outcome closeout refresh review outcome record leave one owner, one follow-up, and one stop, revisit, or closure condition?",
    requiredEvidence:
      "Owner, follow-up action, stop condition or revisit date, closure or supersede link when relevant, queue or roadmap target, paused/proceed decision, retained scope, and deferred scope.",
    passWhen:
      "The follow-up is unambiguous, owned, dated or stop-conditioned, and does not leave accepted, refresh-again, blocked, parked, closed, or superseded work ownerless.",
    ifMissing:
      "Assign an owner or keep the refreshed audit outcome closeout refresh paused; do not continue, close, park, block, supersede, or resolve escalation with ownerless follow-up.",
    record:
      "Record owner, follow-up action, retained and deferred scope, stop condition, revisit date if needed, paused/proceed state, and remaining owner handoff."
  },
  {
    item: "Default-path boundary is recorded",
    templateScope:
      "Accepted refreshed audit outcome closeout refresh record, Refresh-again refreshed audit outcome closeout record, Blocked refreshed audit outcome closeout refresh record, Parked refreshed audit outcome closeout refresh record, Closed or superseded refreshed audit outcome closeout refresh record",
    reviewQuestion:
      "Does the refreshed audit outcome closeout refresh review outcome record record and preserve the default local, deterministic, read-only `bootlane check` path?",
    requiredEvidence:
      "Read-only smoke result or explicit non-applicability, no target-file write note, no network requirement note, no project-script execution note, scanner-boundary note, release verification decision when relevant, and blocker escalation status when uncertain.",
    passWhen:
      "The record proves or explicitly preserves the default-path boundary and escalates uncertainty instead of allowing continuation, closure, review resume, parking, blocking, supersede, or escalation to proceed unsupported.",
    ifMissing:
      "Rerun read-only smoke, refresh boundary evidence, or escalate a blocker before continuation, closure, public-surface refresh, parking, blocking, or review resume continues.",
    record:
      "Record read-only boundary decision, smoke evidence or non-applicability, release verification decision, no-write/no-network/no-script notes, escalation status, owner, and resolution condition."
  }
];

export const accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRouting = [
  {
    outcome: "Accept refreshed audit outcome closeout refresh review outcome record audit",
    reviewScope:
      "Refreshed audit outcome template matches route, Required refreshed audit outcome inputs are complete, Refreshed audit outcome record body is traceable, Refreshed audit outcome owner and follow-up are explicit, Default-path boundary is recorded",
    appliesWhen:
      "Audit confirms the refreshed audit outcome closeout refresh review outcome record matches its route, has complete inputs, is traceable, has explicit ownership and follow-up, and preserves the default-path boundary.",
    requiredEvidence:
      "Completed audit checklist, selected refreshed audit outcome closeout refresh review outcome record, routed outcome, owner, evidence links, verification or non-applicability, follow-up or closure condition, and default-path boundary decision.",
    routeTo:
      "Proceed with the named continuation, closure, review resume, parking, blocking, supersede, or escalation path without broadening implementation scope.",
    maintainerAction:
      "Link the passed audit, record the accepted route, keep unrelated detector, scanner, reporter, scoring, schema, or example-output work outside scope, and continue only the named path.",
    record:
      "Record accepted audit outcome, checklist items passed, source outcome record, owner, route, verification summary, boundary decision, and next action."
  },
  {
    outcome: "Refresh refreshed audit outcome closeout refresh review outcome record",
    reviewScope:
      "Refreshed audit outcome template matches route, Required refreshed audit outcome inputs are complete, Refreshed audit outcome record body is traceable, Refreshed audit outcome owner and follow-up are explicit",
    appliesWhen:
      "Audit finds the record remains useful but route match, required inputs, body traceability, owner, follow-up, source link, or closure condition is stale, incomplete, or inconsistent.",
    requiredEvidence:
      "Completed audit checklist, stale fields, current refreshed audit outcome closeout refresh review outcome record, owner or missing-owner status, requested refresh, evidence links to update, and paused state.",
    routeTo:
      "Return to the matching refreshed audit outcome closeout refresh review outcome record template or refresh review outcome route and keep continuation, closure, review resume, parking, blocking, supersede, or escalation paused.",
    maintainerAction:
      "Refresh only the stale fields, update owner and evidence links, rerun focused verification only when evidence changed, and rerun the audit checklist before continuation or closure.",
    record:
      "Record refresh audit outcome, stale fields, refresh owner, requested update, rerun commands or non-applicability, paused state, and next audit date."
  },
  {
    outcome: "Escalate or keep refreshed audit outcome closeout refresh review outcome blocked",
    reviewScope:
      "Required refreshed audit outcome inputs are complete, Refreshed audit outcome record body is traceable, Default-path boundary is recorded",
    appliesWhen:
      "Audit finds missing blocker evidence, failed or missing read-only smoke, unresolved release verification, missing owner, unsupported route, or default-path uncertainty that blocks continuation, closure, review resume, parking, blocking, supersede, or escalation resolution.",
    requiredEvidence:
      "Completed audit checklist, blocker or boundary evidence gap, owner or missing-owner status, failed or missing command output, release verification requirement, affected surface, blocker link, and resolution condition.",
    routeTo:
      "Refreshed audit blocker escalation, close or continuation blocked record, release-blocking review, or refreshed audit outcome closeout refresh review outcome record refresh before closure or continuation continues.",
    maintainerAction:
      "Keep closure, continuation, and review resume paused, assign or confirm owner, rerun read-only smoke and `pnpm verify:release` when required, and record the blocker resolution condition.",
    record:
      "Record blocked audit outcome, blocker link, affected surface, owner, missing evidence, command result, release verification decision, resolution condition, and next review date."
  },
  {
    outcome: "Park or defer refreshed audit outcome closeout refresh review outcome",
    reviewScope:
      "Refreshed audit outcome owner and follow-up are explicit, Default-path boundary is recorded",
    appliesWhen:
      "Audit confirms the record is current but retained route, deferred scope, owner capacity, target list, roadmap status, revisit date, or stop condition means the refreshed audit outcome closeout refresh review outcome should remain parked or deferred.",
    requiredEvidence:
      "Completed audit checklist, parked or deferred refreshed audit outcome closeout refresh review outcome record, owner, retained scope, deferred scope, target list or roadmap candidate, revisit date or stop condition, paused state, and default-path boundary decision.",
    routeTo:
      "Parked refreshed audit outcome follow-up, roadmap candidate, deferred scope follow-up, or close or continuation blocked record when closure or continuation is requested too early.",
    maintainerAction:
      "Update parked status, owner, roadmap or target list, retained and deferred scope, revisit or stop condition, and keep deferred implementation outside the current PR.",
    record:
      "Record parked or deferred audit outcome, owner, retained scope, deferred scope, target status, revisit or stop condition, paused state, boundary decision, and next action."
  },
  {
    outcome: "Close or supersede refreshed audit outcome closeout refresh review outcome",
    reviewScope:
      "Refreshed audit outcome template matches route, Refreshed audit outcome record body is traceable, Refreshed audit outcome owner and follow-up are explicit, Default-path boundary is recorded",
    appliesWhen:
      "Audit confirms the refreshed audit outcome closeout refresh review outcome is obsolete, superseded by a newer route, already closed by linked evidence, or out of scope without remaining fixture-backed follow-up work.",
    requiredEvidence:
      "Completed audit checklist, superseding route or closure rationale, refreshed source link, owner, no remaining action note, default-path boundary decision, closure or supersede link, and final status.",
    routeTo:
      "Close the refreshed audit outcome closeout refresh review outcome, link the superseding issue or PR, update roadmap status if needed, or record out-of-scope closure without starting implementation.",
    maintainerAction:
      "Link the superseding record, confirm no remaining fixture-backed work, preserve default-path boundary evidence, update owner or roadmap status, and close only after the audit is current.",
    record:
      "Record close or supersede audit outcome, closure rationale, superseding link, owner, default-path boundary, no remaining action note, and final status."
  }
];

export const accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordTemplates = [
  {
    template: "Accepted refreshed audit outcome closeout refresh review outcome audit record",
    outcome: "Accept refreshed audit outcome closeout refresh review outcome record audit",
    useWhen:
      "Audit outcome routing accepts the refreshed audit outcome closeout refresh review outcome record as current enough to support the named continuation, closure, review resume, parking, blocking, supersede, or escalation path.",
    requiredInputs:
      "Routing outcome, completed audit checklist, source refreshed audit outcome closeout refresh review outcome record, owner, route, verification summary or non-applicability, default-path boundary decision, and next action.",
    recordBody:
      "Record the accepted audit outcome, checklist items passed, source outcome record, owner, route, verification summary, default-path boundary decision, scope boundary, and next action.",
    followUp:
      "Proceed only with the named route and keep unrelated detector, scanner, reporter, scoring, schema, or example-output work outside the accepted refreshed audit outcome closeout refresh review outcome path."
  },
  {
    template: "Refresh-needed refreshed audit outcome closeout refresh review outcome audit record",
    outcome: "Refresh refreshed audit outcome closeout refresh review outcome record",
    useWhen:
      "Audit outcome routing finds the refreshed audit outcome closeout refresh review outcome record remains useful but route match, required inputs, traceability, owner, follow-up, source link, or closure condition needs another refresh.",
    requiredInputs:
      "Routing outcome, completed audit checklist, stale fields, current refreshed audit outcome closeout refresh review outcome record, owner or missing-owner status, requested refresh, evidence links to update, rerun commands or non-applicability, and paused state.",
    recordBody:
      "Record refresh-needed audit outcome, stale fields, refresh owner, requested update, evidence links, command rerun plan or non-applicability, paused state, and next audit date.",
    followUp:
      "Refresh only stale fields, rerun focused verification only when evidence changed, and rerun the audit checklist and audit outcome routing before continuation or closure proceeds."
  },
  {
    template: "Blocked refreshed audit outcome closeout refresh review outcome audit record",
    outcome: "Escalate or keep refreshed audit outcome closeout refresh review outcome blocked",
    useWhen:
      "Audit outcome routing keeps continuation, closure, review resume, parking, blocking, supersede, or escalation resolution blocked because blocker evidence, owner, release verification, unsupported route, or default-path boundary remains incomplete.",
    requiredInputs:
      "Routing outcome, completed audit checklist, blocker or boundary evidence gap, affected surface, owner or missing-owner status, failed or missing command output, release verification requirement, blocker link, resolution condition, and next review date.",
    recordBody:
      "Record blocked audit outcome, blocker link, affected surface, owner, missing evidence, command result, release verification decision, read-only boundary status, resolution condition, paused route, and next review date.",
    followUp:
      "Keep closure, continuation, and review resume paused until the owner links refreshed evidence and reroutes through blocker escalation or refreshed record audit as required."
  },
  {
    template: "Parked or deferred refreshed audit outcome closeout refresh review outcome audit record",
    outcome: "Park or defer refreshed audit outcome closeout refresh review outcome",
    useWhen:
      "Audit outcome routing confirms the record is current but retained route, deferred scope, owner capacity, target list, roadmap status, revisit date, or stop condition keeps the refreshed audit outcome closeout refresh review outcome parked or deferred.",
    requiredInputs:
      "Routing outcome, completed audit checklist, parked or deferred refreshed audit outcome closeout refresh review outcome record, owner, retained scope, deferred scope, target list or roadmap candidate, revisit date or stop condition, paused state, and default-path boundary decision.",
    recordBody:
      "Record parked or deferred audit outcome, owner, retained scope, deferred scope, target list or roadmap status, revisit date or stop condition, paused state, default-path boundary decision, and next action.",
    followUp:
      "Keep deferred implementation outside the current PR and revisit only through the recorded owner, target, and stop or review condition."
  },
  {
    template: "Closed or superseded refreshed audit outcome closeout refresh review outcome audit record",
    outcome: "Close or supersede refreshed audit outcome closeout refresh review outcome",
    useWhen:
      "Audit outcome routing confirms the refreshed audit outcome closeout refresh review outcome is obsolete, superseded by a newer route, already closed by linked evidence, or out of scope without remaining fixture-backed follow-up work.",
    requiredInputs:
      "Routing outcome, completed audit checklist, superseding route or closure rationale, refreshed source link, owner, no remaining action note, default-path boundary decision, closure or supersede link, and final status.",
    recordBody:
      "Record closed or superseded audit outcome, closure rationale, superseding issue or PR link, owner, default-path boundary decision, no remaining fixture-backed action note, roadmap update if needed, and final status.",
    followUp:
      "Close or supersede only after links and boundary evidence are current; route any new fixture-backed scope through a fresh intake or follow-up path."
  }
];

export const accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutChecklist = [
  {
    item: "Refreshed audit outcome closeout refresh review outcome audit record is complete",
    templateScope:
      "Accepted refreshed audit outcome closeout refresh review outcome audit record, Refresh-needed refreshed audit outcome closeout refresh review outcome audit record, Blocked refreshed audit outcome closeout refresh review outcome audit record, Parked or deferred refreshed audit outcome closeout refresh review outcome audit record, Closed or superseded refreshed audit outcome closeout refresh review outcome audit record",
    appliesWhen:
      "Any refreshed audit outcome closeout refresh review outcome audit record is created before closure, continuation, refresh, escalation, parking, deferral, supersede, or final closeout relies on it.",
    requiredEvidence:
      "Selected audit outcome record template, routed audit outcome, completed required inputs, record body, follow-up, owner, source refreshed audit outcome closeout refresh review outcome record link, and current queued PR or issue link.",
    passWhen:
      "The selected template is filled, its outcome matches audit outcome routing, and the source record, owner, follow-up, current route, and closure or continuation decision are linked without mixed states.",
    ifMissing:
      "Return to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates and keep closure or continuation paused until the audit outcome record is complete.",
    record:
      "Record template used, routed audit outcome, completed fields, owner, source link, current PR or issue link, and whether closure or continuation remains paused or can proceed."
  },
  {
    item: "Allowed closure or continuation is explicit",
    templateScope:
      "Accepted refreshed audit outcome closeout refresh review outcome audit record, Refresh-needed refreshed audit outcome closeout refresh review outcome audit record",
    appliesWhen:
      "The audit outcome record would allow the accepted route to proceed, refresh the record, resume review, close, continue, park, defer, supersede, or return to escalation resolution.",
    requiredEvidence:
      "Accepted or refresh-needed audit outcome record, allowed closure or continuation route, owner, verification summary or non-applicability, retained scope, deferred scope, follow-up boundary, and default-path boundary decision.",
    passWhen:
      "The closure or continuation route is named, owned, limited to the routed scope, and does not start detector, scanner, reporter, scoring, schema, or example-output work from the closeout checklist itself.",
    ifMissing:
      "Keep closure or continuation paused and reroute through audit outcome routing or refresh the audit outcome record before closeout, review resume, parking, deferral, supersede, or escalation resolution proceeds.",
    record:
      "Record allowed closure or continuation route, owner, verification summary, retained scope, deferred scope, default-path boundary, and the condition that allows work to proceed."
  },
  {
    item: "Blocker, escalation, or deferral is enforceable",
    templateScope:
      "Blocked refreshed audit outcome closeout refresh review outcome audit record, Parked or deferred refreshed audit outcome closeout refresh review outcome audit record, Closed or superseded refreshed audit outcome closeout refresh review outcome audit record",
    appliesWhen:
      "The audit outcome record keeps closure, continuation, review resume, parking, deferral, supersede, or escalation resolution blocked, parked, deferred, closed, or superseded because evidence, owner, route, or default-path boundary controls the next step.",
    requiredEvidence:
      "Blocked, parked, deferred, closed, or superseded audit outcome record, owner, missing evidence or closure rationale, blocker or superseding link, paused state, target list or roadmap status, read-only boundary decision, release verification requirement when relevant, and resolution or final condition.",
    passWhen:
      "The blocked, parked, deferred, closed, or superseded state has one owner, one visible condition, linked blocker or superseding evidence when relevant, and no hidden implementation path for deferred or closed scope.",
    ifMissing:
      "Assign an owner, add blocker or superseding evidence, refresh the audit outcome record, or keep closure and continuation paused until the state is enforceable.",
    record:
      "Record blocker, parked, deferred, closed, or superseded state, owner, missing evidence or closure rationale, target or superseding link, paused state, resolution or final condition, and next review date if any."
  },
  {
    item: "Follow-up ownership and stop condition are recorded",
    templateScope:
      "Accepted refreshed audit outcome closeout refresh review outcome audit record, Refresh-needed refreshed audit outcome closeout refresh review outcome audit record, Blocked refreshed audit outcome closeout refresh review outcome audit record, Parked or deferred refreshed audit outcome closeout refresh review outcome audit record, Closed or superseded refreshed audit outcome closeout refresh review outcome audit record",
    appliesWhen:
      "The audit outcome record leaves any next action, refresh, blocker resolution, parked review, deferred scope, closeout, supersede, or final no-action decision.",
    requiredEvidence:
      "Owner, next action, stop condition or revisit date, closure or supersede link when relevant, queue or roadmap target, paused/proceed decision, retained scope, deferred scope, and final status when closing.",
    passWhen:
      "Every continuing, paused, parked, deferred, blocked, closed, or superseded state has one owner and one stop, revisit, closure, or supersede condition that a maintainer can verify later.",
    ifMissing:
      "Assign ownership, add a revisit or stop condition, or keep the audit outcome record open before closure, continuation, review resume, parking, deferral, or supersede proceeds.",
    record:
      "Record owner, follow-up action, retained and deferred scope, stop condition, revisit date if needed, paused or proceed state, closure or supersede link, and final status when applicable."
  },
  {
    item: "Default-path closeout evidence is current",
    templateScope:
      "Accepted refreshed audit outcome closeout refresh review outcome audit record, Refresh-needed refreshed audit outcome closeout refresh review outcome audit record, Blocked refreshed audit outcome closeout refresh review outcome audit record, Parked or deferred refreshed audit outcome closeout refresh review outcome audit record, Closed or superseded refreshed audit outcome closeout refresh review outcome audit record",
    appliesWhen:
      "Any audit outcome record closeout would allow work to continue, close, stay parked, remain blocked, defer, supersede, escalate, refresh, or resume after audit outcome record templates.",
    requiredEvidence:
      "Read-only smoke result or explicit non-applicability, release verification decision, no target-file write note, no network requirement note, no project-script execution note, scanner-boundary note, verification summary, owner, and default-path boundary decision.",
    passWhen:
      "Verification matches the audit outcome record decision and proves or explicitly preserves default `bootlane check` as local, deterministic, read-only, network-free, and free of project script execution.",
    ifMissing:
      "Rerun read-only smoke, escalate a blocker, refresh boundary evidence, or keep closure, continuation, parking, deferral, blocking, supersede, or review resume paused until boundary evidence is current.",
    record:
      "Record verification summary, read-only smoke or non-applicability, release verification decision, no-write/no-network/no-script notes, scanner boundary, owner, and default-path boundary result."
  }
];

export const accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates = [
  {
    template: "Completed refreshed audit outcome closeout refresh review outcome audit closeout record",
    item: "Refreshed audit outcome closeout refresh review outcome audit record is complete",
    useWhen:
      "Closeout confirms the refreshed audit outcome closeout refresh review outcome audit record is filled, routed, owned, linked, and free of mixed closure, continuation, refresh, escalation, parking, deferral, supersede, or final closeout states.",
    requiredInputs:
      "Closeout item, selected audit outcome record template, routed audit outcome, completed fields, owner, source refreshed audit outcome closeout refresh review outcome record link, current queued PR or issue link, and paused-or-proceed decision.",
    recordBody:
      "Record the completed audit outcome template, routed outcome, source and current links, owner, required fields checked, mixed-state check result, and whether closure or continuation remains paused or can proceed.",
    followUp:
      "Allow the next closeout or continuation check only after the source audit outcome record and current route are linked; otherwise refresh the audit outcome record before closure or continuation proceeds."
  },
  {
    template: "Allowed refreshed audit outcome closure or continuation record",
    item: "Allowed closure or continuation is explicit",
    useWhen:
      "Closeout confirms the accepted or refresh-needed audit outcome record may close, continue, refresh, resume review, park, defer, supersede, or return to escalation resolution without broadening scope.",
    requiredInputs:
      "Closeout item, accepted or refresh-needed audit outcome record, allowed closure or continuation route, owner, verification summary or non-applicability, retained scope, deferred scope, default-path boundary decision, and proceed condition.",
    recordBody:
      "Record the allowed closure or continuation route, owner, verification summary, retained and deferred scope, default-path boundary, proceed condition, and explicit note that implementation does not start from closeout.",
    followUp:
      "Proceed only on the named route and send unrelated detector, scanner, reporter, scoring, schema, or example-output work back to its follow-up path."
  },
  {
    template: "Enforceable refreshed audit outcome blocker or deferral record",
    item: "Blocker, escalation, or deferral is enforceable",
    useWhen:
      "Closeout confirms blocker, escalation, parked, deferred, closed, or superseded state is enforceable and cannot be bypassed by closure, continuation, review resume, parking, deferral, supersede, or escalation resolution.",
    requiredInputs:
      "Closeout item, blocked, parked, deferred, closed, or superseded audit outcome record, owner, missing evidence or closure rationale, blocker or superseding link, paused state, target list or roadmap status, read-only boundary decision, release verification requirement when relevant, and resolution or final condition.",
    recordBody:
      "Record enforceable state, owner, missing evidence or closure rationale, blocker or superseding link, paused state, target or roadmap status, read-only boundary decision, release verification requirement, and resolution or final condition.",
    followUp:
      "Keep closure or continuation paused until the named owner satisfies the resolution condition, or close/supersede only when final evidence and boundary notes are current."
  },
  {
    template: "Owned refreshed audit outcome follow-up stop-condition record",
    item: "Follow-up ownership and stop condition are recorded",
    useWhen:
      "Closeout confirms continuing, refreshed, blocked, parked, deferred, closed, or superseded audit outcome work has one owner, one follow-up, and one stop, revisit, closure, or supersede condition.",
    requiredInputs:
      "Closeout item, owner, next action, stop condition or revisit date, closure or supersede link when relevant, queue or roadmap target, paused/proceed decision, retained scope, deferred scope, and final status when closing.",
    recordBody:
      "Record owner, follow-up action, retained and deferred scope, stop condition, revisit date if needed, paused or proceed state, closure or supersede link, remaining owner handoff, and final status when applicable.",
    followUp:
      "Continue, pause, park, defer, close, or supersede only through the recorded owner and stop condition; refresh the audit outcome record when ownership changes."
  },
  {
    template: "Current default-path refreshed audit outcome closeout evidence record",
    item: "Default-path closeout evidence is current",
    useWhen:
      "Closeout confirms verification evidence is current enough for the audit outcome record decision to continue, close, park, remain blocked, defer, supersede, escalate, refresh, or resume.",
    requiredInputs:
      "Closeout item, read-only smoke result or explicit non-applicability, release verification decision, no target-file write note, no network requirement note, no project-script execution note, scanner-boundary note, verification summary, owner, and default-path boundary decision.",
    recordBody:
      "Record verification summary, read-only smoke or non-applicability, release verification decision, no-write/no-network/no-script notes, scanner boundary, owner, boundary result, and whether the route remains paused or can proceed.",
    followUp:
      "Proceed only while default-path evidence stays current; rerun read-only smoke, refresh boundary evidence, or escalate a blocker before stale evidence supports closure or continuation."
  }
];

export const accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules = [
  {
    trigger: "Refreshed audit outcome closeout source changed",
    recordTemplate: "Completed refreshed audit outcome closeout refresh review outcome audit closeout record",
    refreshWhen:
      "Selected audit outcome record template, routed outcome, source refreshed audit outcome closeout refresh review outcome record link, current queued PR or issue link, owner, completed fields, mixed-state check result, or paused-or-proceed decision changes after closeout was recorded.",
    updateRecord:
      "Update the completed audit outcome template, routed outcome, source and current links, owner, required fields checked, mixed-state check result, and whether closure or continuation remains paused or can proceed.",
    rerun:
      "Rerun audit outcome routing and the audit outcome record closeout checklist before allowing the next closeout or continuation check.",
    blockWhenStale:
      "Do not close, continue, resume review, park, defer, supersede, or escalate from a completed closeout record that points to stale source, owner, route, or mixed-state evidence."
  },
  {
    trigger: "Allowed refreshed audit outcome closure or continuation route changed",
    recordTemplate: "Allowed refreshed audit outcome closure or continuation record",
    refreshWhen:
      "Allowed closure or continuation route, retained scope, deferred scope, verification summary, owner, default-path boundary decision, or proceed condition changes before closure, continuation, refresh, review resume, parking, deferral, supersede, or escalation resolution proceeds.",
    updateRecord:
      "Update the allowed closure or continuation route, owner, verification summary, retained and deferred scope, default-path boundary, proceed condition, and explicit note that implementation does not start from closeout.",
    rerun:
      "Rerun focused verification that supports the changed route and rerun closeout before closure or continuation continues.",
    blockWhenStale:
      "Do not use an older allowed closure or continuation record to close, continue, refresh, resume review, park, defer, supersede, resolve escalation, or start broader implementation work."
  },
  {
    trigger: "Refreshed audit outcome blocker or deferral evidence changed",
    recordTemplate: "Enforceable refreshed audit outcome blocker or deferral record",
    refreshWhen:
      "Missing evidence, closure rationale, blocker or superseding link, paused state, target list or roadmap status, release verification requirement, read-only boundary decision, owner, resolution condition, final condition, or next review date changes.",
    updateRecord:
      "Update enforceable state, owner, missing evidence or closure rationale, blocker or superseding link, paused state, target or roadmap status, read-only boundary decision, release verification requirement, and resolution or final condition.",
    rerun:
      "Rerun read-only smoke and `pnpm verify:release` when the changed blocker, deferral, closure, supersede, package, public-surface, or default-path evidence touches release or boundary behavior.",
    blockWhenStale:
      "Keep closure, continuation, review resume, parking, deferral, supersede, and escalation resolution paused while blocker, deferral, closure, supersede, or resolution evidence is stale."
  },
  {
    trigger: "Refreshed audit outcome follow-up ownership or stop condition changed",
    recordTemplate: "Owned refreshed audit outcome follow-up stop-condition record",
    refreshWhen:
      "Owner, next action, retained scope, deferred scope, stop condition, revisit date, paused/proceed state, queue or roadmap target, closure or supersede link, remaining owner handoff, or final status changes.",
    updateRecord:
      "Update owner, follow-up action, retained and deferred scope, stop condition, revisit date if needed, paused or proceed state, closure or supersede link, remaining owner handoff, and final status when applicable.",
    rerun:
      "Rerun docs-only triage checks and any focused verification needed for changed ownership, retained or deferred scope, roadmap target, closure link, supersede link, or final status.",
    blockWhenStale:
      "Do not close, continue, pause, park, defer, supersede, or start deferred implementation while ownership, follow-up, stop condition, closure link, supersede link, or final status is stale."
  },
  {
    trigger: "Current default-path refreshed audit outcome closeout evidence changed",
    recordTemplate: "Current default-path refreshed audit outcome closeout evidence record",
    refreshWhen:
      "Read-only smoke result, explicit non-applicability, release verification decision, no-write note, no-network note, no-project-script note, scanner-boundary note, verification summary, owner, boundary result, or paused-or-proceed route changes after closeout.",
    updateRecord:
      "Update verification summary, read-only smoke or non-applicability, release verification decision, no-write/no-network/no-script notes, scanner boundary, owner, boundary result, and whether the route remains paused or can proceed.",
    rerun:
      "Rerun read-only smoke and escalate to `pnpm verify:release` when release surfaces, package behavior, scanner boundary, or default-path behavior changed.",
    blockWhenStale:
      "Do not proceed, close, park, block, defer, supersede, escalate, or resume from stale default-path evidence; rerun verification or escalate a blocker first."
  }
];

export const accuracyIntakeClosureCriteria = [

  {
    outcome: "Fixture-backed fix merged",
    appliesTo: "Confirmed false positives, missing detections, env precision issues, command recognition misses, and report clarity fixes.",
    requiredEvidence:
      "Accuracy lane, Accuracy priority, Fixture target, Expected output, Happy-path impact, and a failing fixture or focused test that passes after the fix.",
    closeWhen: "The fix merges, relevant docs or examples are updated, and existing Node/Python happy-path fixtures remain stable."
  },
  {
    outcome: "Needs more fixture evidence",
    appliesTo: "Reports with plausible accuracy impact but missing reproduction details, fixture target, expected output, or happy-path impact.",
    requiredEvidence: "A maintainer comment naming the missing fixture intake fields and the narrow evidence needed next.",
    closeWhen: "The reporter provides the missing evidence, or the issue is marked `needs-more-info` and closed after the follow-up window."
  },
  {
    outcome: "Moved to roadmap backlog",
    appliesTo: "Accuracy-adjacent requests that are too broad, speculative, repeated but not fixture-ready, or better handled as 0.3.0+ planning.",
    requiredEvidence: "Roadmap candidate, evidence status, review trigger, and rationale for not entering 0.2.0 implementation.",
    closeWhen: "The Roadmap entry is updated and the issue links the candidate, review cadence, or status transition that will revisit it."
  },
  {
    outcome: "Closed out of scope",
    appliesTo: "Requests that depend on cloud accounts, telemetry, LLMs, vulnerability scanning, network-only checks, or default-path writes.",
    requiredEvidence: "Local-first setup-readiness rationale plus any optional future discussion link if appropriate.",
    closeWhen: "The issue explains why the request is outside the default `bootlane check` path and no fixture-backed action remains."
  },
  {
    outcome: "Accuracy PR ready for review",
    appliesTo: "Pull requests that implement 0.2.0 accuracy work.",
    requiredEvidence:
      "PR template confirms Accuracy lane, Accuracy priority, Fixture target, Expected output, Happy-path impact, read-only behavior, and relevant docs or report updates.",
    closeWhen: "Review can start because fixture evidence, schema/check ID impact, and happy-path impact are explicit."
  }
];

export const roadmapCandidateReviewCadence = [
  {
    review: "Post-launch feedback batch review",
    when: "After the first public feedback batch and then whenever several related reports arrive together.",
    requiredInput: "Grouped issues or discussions mapped to Roadmap Candidate Review categories and evidence status.",
    decision: "Promote repeated fixture-sized work to `Ready for fixture`, keep weak signals in `Collecting evidence`, or close default-path out-of-scope requests."
  },
  {
    review: "Milestone planning review",
    when: "Before opening or reshaping a 0.2.0, 0.3.0, or later milestone.",
    requiredInput: "Candidate target, required evidence, owner, user impact, and current release-candidate stability notes.",
    decision: "Only move candidates with evidence and a clear boundary into milestone planning; keep speculative work parked or deferred."
  },
  {
    review: "Staleness review",
    when: "When a candidate has no new evidence for a review cycle or its review trigger is no longer current.",
    requiredInput: "Last evidence link, last review date, current target, and whether the request still matches product boundaries.",
    decision: "Refresh the required evidence, downgrade to `Parked`, move to `Deferred`, or close out of scope with rationale."
  },
  {
    review: "Boundary review",
    when: "Before planning integrations, new ecosystems, write-capable flows, or anything that may affect the default check path.",
    requiredInput: "Read-only impact, release-safety impact, command boundary, fixture strategy, and docs impact.",
    decision: "Proceed only when default `bootlane check` stays local and read-only; otherwise defer or require an explicit opt-in design."
  },
  {
    review: "Closeout review",
    when: "When a candidate is implemented, superseded, duplicated, or no longer fits Bootlane's scope.",
    requiredInput: "Issue or PR link, final status, rationale, and any follow-up candidate if work continues elsewhere.",
    decision: "Close with a documented outcome so the backlog does not accumulate stale release promises."
  }
];

export const roadmapCandidateStatusTransitions = [
  {
    from: "Collecting evidence",
    to: "Ready for fixture",
    condition: "Repeated reports, a minimal reproduction, or a representative public repository can be turned into a focused fixture.",
    requiredAction: "Record the fixture target, expected finding or report change, and false-positive risk before implementation."
  },
  {
    from: "Collecting evidence",
    to: "Parked",
    condition: "The idea remains plausible but lacks repeated evidence or a clear next milestone.",
    requiredAction: "Keep the review trigger explicit and wait for stronger feedback before planning work."
  },
  {
    from: "Ready for fixture",
    to: "Collecting evidence",
    condition: "The fixture cannot be minimized, expected behavior is unclear, or false-positive risk is higher than expected.",
    requiredAction: "Capture the uncertainty and ask for narrower evidence before changing checks."
  },
  {
    from: "Parked",
    to: "Deferred",
    condition: "The idea needs a larger design boundary, release-safety review, or opt-in command design before it can be planned.",
    requiredAction: "Record the design boundary that must exist before the candidate can be reconsidered."
  },
  {
    from: "Parked",
    to: "Closed out of scope",
    condition: "The idea depends on cloud accounts, telemetry, LLMs, vulnerability scanning, network-only behavior, or default-path writes.",
    requiredAction: "Close with local-first setup-readiness rationale and link any optional future discussion if appropriate."
  },
  {
    from: "Deferred",
    to: "Parked",
    condition: "A design boundary exists, but the work still lacks evidence or priority for an active milestone.",
    requiredAction: "Update the target and review trigger without starting implementation."
  },
  {
    from: "Closed out of scope",
    to: "Collecting evidence",
    condition: "The product scope changes or new evidence reframes the request as local-first setup-readiness work.",
    requiredAction: "Re-run the Roadmap Candidate Review and document why reopening is justified."
  }
];
