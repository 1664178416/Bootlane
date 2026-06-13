# Bootlane Design

Last updated: 2026-06-08

## 1. Product Positioning

Bootlane is an open-source CLI that answers one question:

> Can this repository go from clone to first run, and if not, what is missing?

Tagline:

> From clone to run.

One-line description:

> Bootlane checks whether a repo is ready to run: setup docs, dependencies, env vars, tests, secrets, and CI readiness.

Bootlane should feel like a project health inspector, not a heavy DevOps platform. It must be fast, local-first, installable with one command, and useful before any account, API key, dashboard, hosted service, or AI feature exists.

## 2. Users

Primary users:

- CS students who clone course projects and cannot get them running.
- New developers evaluating an unfamiliar GitHub repo.
- Open-source maintainers who want clearer setup quality.
- Bootcamp instructors and teaching assistants who review many student repos.

Secondary users:

- Engineering teams checking internal starter templates.
- Maintainers who want setup-readiness checks in GitHub Actions.
- AI coding-tool users who need a deterministic preflight report before asking an agent to fix a repo.

## 3. Product Principles

- Zero setup first: `npx bootlane` should work in a cloned repo after publication.
- Local-first: core checks do not require an account, cloud service, telemetry, or project dependency installation.
- Explainable: every finding should include why it matters and what to do next.
- Read-only by default: `bootlane check` must not mutate the analyzed repository.
- Dry-run repair guidance: fix proposals are report metadata until an explicit write flow is designed and tested.
- Developer-native output: terminal by default, Markdown and JSON for sharing and automation.
- Useful before perfect: checks can be heuristic, but confidence and limitations must be clear.

## 4. Non-Goals

Bootlane is not:

- A package vulnerability scanner. It may warn about exposed secrets, but it does not replace `npm audit`, Dependabot, Snyk, or GitHub Advanced Security.
- A full build/test runner. It should inspect setup signals and CI configuration, but it must not execute arbitrary project scripts by default.
- A cloud dashboard.
- An AI product in v1.
- SourceLine. SourceLine is a separate future project for claim-by-claim evidence tracing; it should not be mixed into this repo.

## 5. 0.1.0 Release Candidate Scope

The first public release candidate supports Node.js repositories well and includes conservative Python readiness checks. The product shape is a read-only analyzer with deterministic reports and dry-run fix previews.

Current supported checks:

| Area | Current behavior |
| --- | --- |
| Project detection | Detect Node, Python, framework hints, package manager signals, and unknown projects |
| Dependencies | Detect lockfiles, package-manager mismatches, missing lockfiles, and Python package metadata gaps |
| Runtime versions | Check Node metadata such as `engines.node`, Volta, `.nvmrc`, `.node-version`, and `.tool-versions`; check Python metadata such as `requires-python`, `.python-version`, `runtime.txt`, and `.tool-versions` |
| README setup | Check install, run, test, and env guidance for Node and Python projects |
| Env vars | Scan common Node and Python env access patterns and compare with `.env.example` |
| Tests | Check Node test scripts and Python test files/tooling signals |
| Secrets | Detect committed `.env` files, private keys, and high-signal token patterns without printing full secrets |
| CI | Detect GitHub Actions workflows and recognizable Node/Python test commands |
| Reports | Render terminal, Markdown, and JSON reports |
| Fix previews | Generate dry-run proposals for `.env.example`, README snippets, and deterministic GitHub Actions workflows |
| Score | Calculate a transparent setup health score from failed findings |

Current command surface:

```bash
npx bootlane
bootlane
bootlane check
bootlane check ./some-repo
bootlane check --summary
bootlane check --verbose
bootlane check --format json
bootlane check --format markdown --output bootlane-report.md
bootlane check --print-config
bootlane check --ci --fail-on critical
```

Deferred command surface:

```bash
bootlane fix
bootlane init-action
bootlane explain
```

`bootlane fix` should not ship until write behavior, diffs, backups, and failure modes are fully specified and covered by tests.

## 6. User Experience

Default terminal output should be compact and scan-friendly:

```text
Bootlane Report

Project: Node + Vite
Package manager: pnpm
Health score: 72/100 (C)

Critical
- .env.example is missing env.example.missing
  Source code reads environment variables, but .env.example is missing: VITE_API_URL.
  Suggested fix: Add .env.example with VITE_API_URL=.

Warnings
- Node version is not declared runtime.node-version.missing
  Declare a supported Node version so contributors can use the right runtime.
```

Output rules:

- Use color only when appropriate for terminal output.
- Disable color in CI or when `--no-color` is passed.
- Keep issue IDs stable so users can ignore, track, configure, and document them.
- Always include file paths when a finding is tied to a file.
- Keep suggestions actionable and short.
- Keep normal terminal mode concise, `--summary` very compact, and `--verbose` diagnostic.

## 7. Report Model

Core public types:

```ts
export type Severity = "critical" | "warning" | "info";

export type CheckCategory =
  | "project"
  | "dependencies"
  | "runtime"
  | "readme"
  | "env"
  | "tests"
  | "security"
  | "ci";

export type Finding = {
  id: string;
  category: CheckCategory;
  title: string;
  severity: Severity;
  passed: boolean;
  message: string;
  suggestion?: string;
  files?: string[];
  confidence: "high" | "medium" | "low";
};

export type FixProposal = {
  id: string;
  title: string;
  description: string;
  findingIds: string[];
  action: {
    type: "create_file" | "append_file";
    path: string;
    content: string;
  };
  safety: "safe" | "review";
  confidence: "high" | "medium" | "low";
};

export type BootlaneReport = {
  schemaVersion: "1";
  toolVersion: string;
  targetPath: string;
  project: ProjectSummary;
  score: {
    value: number;
    max: 100;
    grade: "A" | "B" | "C" | "D" | "F";
  };
  findings: Finding[];
  fixProposals: FixProposal[];
  generatedAt: string;
};
```

Report formats:

- Terminal: optimized for humans.
- Markdown: optimized for README/issues/PR comments.
- JSON: optimized for CI, integrations, and future web UI.

The JSON schema is the automation contract. Markdown and terminal output may evolve more freely as long as the CLI remains readable.

## 8. Scoring

Current scoring is simple and visible:

- Start at 100.
- Critical finding: -15.
- Warning finding: -6.
- Info finding: -2.
- Never go below 0.
- Passed checks do not add points; they keep the score from falling.

Grades:

| Score | Grade | Meaning |
| --- | --- | --- |
| 90-100 | A | Ready for most users |
| 75-89 | B | Mostly ready, small setup gaps |
| 60-74 | C | Runnable with friction |
| 40-59 | D | Serious setup risk |
| 0-39 | F | Likely not runnable |

This model is intentionally not scientific. It is a communication device. Once real reports accumulate, weights can be tuned based on user feedback.

## 9. Architecture

Current repository shape:

```text
bootlane/
  packages/
    core/
      src/
        checks/
        detectors/
        fixers/
        reporters/
        scanners/
        signals/
        config.ts
        files.ts
        scoring.ts
        types.ts
        index.ts
    cli/
      src/
        index.ts
        program.ts
        terminal.ts
  examples/
    fixtures/
  docs/
  scripts/
  .github/
    workflows/
```

Package boundaries:

- `@bootlane/core`: pure analysis engine. It owns project detection, file scanning, checks, scoring, JSON/Markdown rendering, config helpers, and dry-run fix proposal generation.
- `bootlane`: CLI package. It owns command parsing, terminal rendering, output file writes, and CI exit behavior.
- Future `@bootlane/action`: optional wrapper for GitHub Actions only if a composite action or plain `npx bootlane` usage becomes insufficient.

Runtime flow:

```text
CLI args
  -> load and merge config
  -> analyzeProject()
  -> list files
  -> detect project type
  -> run applicable checks
  -> score report
  -> generate dry-run fix proposals
  -> render terminal/json/markdown
  -> write output if requested
  -> choose exit code in --ci mode
```

Check contract:

```ts
export type Check = {
  id: string;
  category: CheckCategory;
  appliesTo(context: ProjectContext): boolean | Promise<boolean>;
  run(context: ProjectContext): Promise<Finding[]>;
};
```

This keeps checks small, testable, and easy for contributors to add.

## 10. Configuration

Config file name:

```text
bootlane.config.json
```

Current config:

```json
{
  "ignore": ["dist/**", "coverage/**"],
  "failOn": "critical",
  "checks": {
    "ci.github-actions.missing": "warn",
    "security.env-file.committed": "error"
  }
}
```

Config is optional. Defaults must be good enough for most public GitHub repos. CLI flags override config where both are provided.

## 11. Fix Preview Strategy

The 0.1.0 release candidate ships dry-run fix proposals as report data, not file writes.

Current proposals:

- Create or append `.env.example` entries from detected env vars.
- Create or append README setup snippets when install/test guidance can be inferred.
- Create a GitHub Actions workflow preview for deterministic Node projects.
- Create a GitHub Actions workflow preview for deterministic Python projects.

Rules:

- `bootlane check` is read-only.
- Proposals must include related finding IDs, target path, action type, confidence, and safety metadata.
- Terminal `--verbose` may show capped inline content previews.
- Markdown summarizes proposals; JSON keeps the full proposal content.
- Future write mode must show a diff and require an explicit write flag.
- Every write-capable fixer must have unit tests, fixture tests, and smoke coverage before release.

## 12. Release Shape

The first public release is `0.1.0`.

The release candidate is intentionally package-ready but not published until external blockers are resolved:

- The final Bootlane GitHub repository URL is not confirmed.
- npm account/org permissions must be confirmed.
- npm package-name availability must be checked close to publish time.
- The release tag target must be confirmed in the final repository.

Local release confidence comes from:

- Build and tests.
- Check ID catalog validation.
- Release blocker doc validation.
- Package metadata checks.
- Built CLI smoke tests.
- npm pack dry-run content validation.
- Local packed install smoke before publishing.
- One-command `pnpm verify:release`.

## 13. Roadmap

Phase 1: Release candidate hardening

- Keep Node and Python checks deterministic and read-only.
- Tighten package README quality and release metadata validation.
- Keep CI and local release gates aligned.
- Resolve external release blockers without guessing repository URLs.

Phase 2: First public release

- Publish `@bootlane/core` before `bootlane`.
- Verify `npx bootlane@latest` behavior after publish.
- Create the GitHub release and publish concise 0.1.0 notes.
- Collect real repo reports to identify false positives.

Phase 3: Accuracy and ecosystem depth

- Expand Node and Python fixture coverage from real-world setup patterns.
- Improve env scanning where heuristics produce false positives.
- Add Docker setup readiness checks after Node/Python behavior stays reliable.
- Consider Go/Rust only after the report model has proven stable.

Phase 4: Safe write flows

- Design `bootlane fix` around existing dry-run proposals.
- Add diff rendering and explicit write confirmation.
- Start with `.env.example` and README updates before workflow file writes.

Phase 5: Optional integrations

- GitHub Action wrapper if annotations or PR comments justify it.
- Optional AI assistance for explaining confusing install/test logs.
- Keep AI optional and never required for deterministic checks.

## 14. Launch Assets

Minimum public launch assets:

- README with clear output examples.
- `docs/LAUNCH.md` with launch messaging, sharing checklist, and feedback triage.
- Example Markdown report in `examples/reports/node-missing-env.md`.
- GitHub Actions usage example.
- Package READMEs for `bootlane` and `@bootlane/core`.
- A short positioning sentence: "From clone to run."
- A comparison note: "Bootlane checks setup readiness; it is not a vulnerability scanner."
- Release blockers resolved and reflected in package manifests.

First places to share:

- GitHub README and topics.
- V2EX, Juejin, Reddit, Hacker News.
- Student developer communities.
- Open-source maintainer communities.
