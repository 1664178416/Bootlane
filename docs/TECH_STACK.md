# Bootlane Technical Stack

Last updated: 2026-06-10

## 1. Decision Summary

Bootlane is a Node.js + TypeScript CLI monorepo distributed as npm packages.

| Layer | Current choice | Why |
| --- | --- | --- |
| Runtime | Node.js, ESM | Native fit for `npx bootlane` and JS/TS project diagnostics |
| Supported Node versions | `>=22.12`, test on Node 22 and 24 | Keeps the CLI on maintained modern Node lines while avoiding older-runtime complexity |
| Language | TypeScript strict mode | Safer check/report contracts and easier contributor onboarding |
| Package manager | pnpm workspaces | Clean multi-package repo with local workspace linking |
| Build | `tsc -b` project references | Low complexity, clear declaration output, no bundler required |
| CLI framework | commander | Mature command parsing, help output, default command support |
| File scanning | fast-glob | Reliable file discovery with ignore support |
| Schema/config validation | zod | Typed config parsing and report-adjacent validation |
| Terminal color | picocolors | Tiny dependency for deterministic CLI output |
| Test runner | Vitest | Fast TypeScript-friendly tests |
| Report formats | Terminal, JSON, Markdown | Covers local use, automation, and GitHub-friendly sharing |
| CI | GitHub Actions | Runs the documented [Quality Gates](QUALITY_GATES.md) CI subset |
| Release | Manual first release with scripted gates | Avoids accidental publish automation before repository URL, npm access, and tag target are confirmed |

References checked on 2026-06-07:

- Node.js release schedule: https://nodejs.org/en/about/previous-releases
- pnpm workspaces: https://pnpm.io/workspaces
- Commander: https://github.com/tj/commander.js
- Zod: https://zod.dev/
- Vitest: https://vitest.dev/guide/

## 2. Runtime and Package Target

Use:

```json
{
  "type": "module",
  "engines": {
    "node": ">=22.12"
  }
}
```

Rationale:

- Bootlane is a Node CLI distributed through npm.
- ESM keeps the codebase aligned with modern Node and TypeScript.
- Node 22 and Node 24 cover the current compatibility target for the first release candidate.
- Supporting older Node lines should only happen if real user demand outweighs the maintenance cost.

CI matrix:

```yaml
node-version: [22.x, 24.x]
```

Revisit this when Node 26 becomes LTS or when npm installation data shows a meaningful runtime mismatch.

## 3. Repository Layout

Use pnpm workspaces:

```text
packages:
  - "packages/*"
```

Current packages:

```text
packages/core
packages/cli
```

Package responsibilities:

- `@bootlane/core`: detectors, scanners, checks, scoring, report models, JSON/Markdown rendering, config helpers, and dry-run fix proposals.
- `bootlane`: executable CLI, terminal renderer, command options, report file output, and CI exit codes.

Why not a single package:

- Core needs to stay UI-free so future GitHub Action wrappers, web demos, and downstream tests can reuse it.
- A two-package monorepo gives enough separation without heavy architecture.

## 4. Build Strategy

Current scripts:

```json
{
  "scripts": {
    "build": "tsc -b",
    "typecheck": "tsc -b --pretty false",
    "test": "vitest run",
    "test:watch": "vitest",
    "docs:check-contributing": "node scripts/check-contributing-doc.mjs",
    "docs:check-templates": "node scripts/check-github-templates.mjs",
    "docs:check-triage": "node scripts/check-triage-doc.mjs",
    "docs:check-quality-gates": "node scripts/check-quality-gates-doc.mjs",
    "ci:workflow:check": "node scripts/check-ci-workflow-contract.mjs",
    "docs:check-security": "node scripts/check-security-doc.mjs",
    "docs:check-package-contents": "node scripts/check-package-contents-doc.mjs",
    "docs:check-release-evidence": "node scripts/check-release-evidence-doc.mjs",
    "docs:check-changelog": "node scripts/check-changelog-doc.mjs",
    "docs:check-ids": "node scripts/check-id-catalog.mjs",
    "docs:check-release-blockers": "node scripts/check-release-blockers-doc.mjs",
    "docs:check-release-safety-fixtures": "node scripts/check-release-safety-fixtures-doc.mjs",
    "example:report": "node scripts/generate-example-report.mjs",
    "example:report:check": "node scripts/generate-example-report.mjs --check",
    "release:evidence": "node scripts/generate-release-evidence-snapshot.mjs",
    "release:evidence:check": "node scripts/generate-release-evidence-snapshot.mjs --check",
    "release:gates:check": "node scripts/check-release-gate-contracts.mjs",
    "metadata:check": "node scripts/check-package-metadata.mjs",
    "release-safety:check": "node scripts/check-release-safety.mjs",
    "release-safety:fixtures": "node scripts/check-release-safety-fixtures.mjs",
    "npm-names:check": "node scripts/check-npm-package-names.mjs",
    "smoke:bin": "node scripts/smoke-bin.mjs",
    "smoke:packed-install": "node scripts/smoke-packed-install.mjs",
    "pack:dry-run": "node scripts/pack-dry-run.mjs",
    "verify:release": "node scripts/verify-release.mjs",
    "clean": "tsc -b --clean"
  }
}
```

Why not bundle immediately:

- A Node CLI can publish compiled JS plus dependencies cleanly.
- Unbundled output gives clearer stack traces and simpler licensing.
- Build complexity should stay low until startup time or install size becomes a real measured problem.

Deferred tooling:

- ESLint and Prettier can be added after the first release if contributor volume or style drift justifies it.
- A bundler such as `tsdown` can be considered if cold start or package size becomes a real issue.
- Process execution helpers such as `execa` should wait until Bootlane has opt-in validation or write flows that actually execute project commands.

## 5. CLI Design

Use commander.

Command shape:

```bash
bootlane
bootlane check [path]
bootlane check --format terminal
bootlane check --format markdown --output bootlane-report.md
bootlane check --format json
bootlane check --summary
bootlane check --verbose
bootlane check --print-config
bootlane check --ci
bootlane check --fail-on warning
bootlane --version
bootlane --help
```

Default behavior:

- `bootlane` aliases to `bootlane check .`.
- Default format is `terminal`.
- Default path is current working directory.
- In normal terminal mode, exit `0` even with findings.
- In `--ci` mode, exit non-zero based on `--fail-on`, defaulting to `critical`.
- `--output` writes the report before applying CI exit behavior.

Exit code policy:

| Code | Meaning |
| --- | --- |
| 0 | Completed and did not cross fail threshold |
| 1 | Completed and crossed fail threshold |
| 2 | Invalid CLI usage or config |
| 3 | Unexpected runtime error |

The CLI maps Bootlane usage/config errors to exit `2` through a small error boundary, and leaves unexpected runtime failures as exit `3`. Built CLI smoke coverage checks invalid option values as packaged binary behavior.

## 6. Core Analysis Design

Core exposes one main function:

```ts
export async function analyzeProject(options: AnalyzeOptions): Promise<BootlaneReport>;
```

Input:

```ts
export type AnalyzeOptions = {
  targetPath: string;
  toolVersion?: string;
  config?: Partial<BootlaneConfig>;
  now?: Date;
};
```

Current internal flow:

```text
resolve config
  -> list files
  -> detect project
  -> run applicable checks
  -> score findings
  -> generate fix proposals
  -> return report
```

Design rules:

- Checks should avoid side effects.
- Checks should not install dependencies or execute project scripts.
- Shared heuristics belong in signal helpers when more than one check needs them.
- `generatedAt` can be injected for deterministic tests.
- JSON and Markdown renderers live in core; terminal rendering lives in CLI.

## 7. Check IDs

Stable IDs include:

```text
project.node.detected
project.python.detected
dependencies.lockfile.missing
dependencies.package-manager.mismatch
dependencies.python.lockfile.missing
dependencies.python.package-manager.mismatch
runtime.node-version.missing
runtime.python-version.missing
readme.install.missing
readme.run.missing
readme.test.missing
readme.python-install.missing
readme.python-test.missing
env.example.missing
env.example.incomplete
tests.script.missing
tests.python.missing
tests.python.tooling-no-files
security.env-file.committed
security.secret-pattern.detected
ci.github-actions.missing
ci.github-actions.no-test
```

Stable IDs enable:

- Config overrides.
- Snapshot tests.
- Documentation anchors.
- Future GitHub annotations.

The canonical list is guarded by `pnpm docs:check-ids`.

## 8. Env Var Scanning

Supported patterns:

```text
process.env.NAME
process.env["NAME"]
process.env['NAME']
import.meta.env.VITE_NAME
os.getenv("NAME")
os.environ["NAME"]
```

Ignored names:

```text
NODE_ENV
CI
PWD
PATH
HOME
USER
USERNAME
SHELL
TERM
```

Rules:

- Only scan source-like files such as `.js`, `.jsx`, `.ts`, `.tsx`, `.mjs`, `.cjs`, `.vue`, `.svelte`, and `.py`.
- Ignore `node_modules`, `dist`, `build`, `coverage`, `.git`, lockfiles, and configured ignore paths.
- Strip common line and block comments before scanning.
- Ignore env access patterns that appear only inside string examples where practical.
- Treat supported source-code env access patterns as high confidence.

Later improvement:

- Replace or supplement heuristic scanning with AST extraction for JS/TS if fixture data shows meaningful false positives.

## 9. Secret Scanning

Current checks should stay high-signal:

- Committed `.env` files.
- PEM private key blocks.
- GitHub tokens.
- AWS access key IDs.
- OpenAI-style API key patterns.
- Generic `API_KEY=...` style patterns only when the value looks secret-like and is not an obvious placeholder.

Rules:

- Never print full secret values.
- Show file path, line number when available, and redacted preview.
- Document that Bootlane is not a full secret scanner.
- Keep pattern tests strict to avoid noisy reports.

## 10. README Checks

README analysis should be heuristic and forgiving.

Node command recognition includes:

- Install commands: `npm install`, `npm ci`, `pnpm install`, `yarn install`, `bun install`.
- Run commands: `npm run dev`, `pnpm dev`, `pnpm run dev`, `npm start`, `pnpm start`, `yarn run dev`, `bun dev`.
- Test commands: `npm test`, `npm run test`, `pnpm test`, `pnpm run test`, `yarn test`, `bun test`, `vitest`, `jest`.

Python command recognition includes:

- Install commands: `pip install -r requirements.txt`, `python -m pip install`, `uv sync`, `uv pip install`, `poetry install`, `pipenv install`.
- Test commands: `pytest`, `python -m pytest`, `python -m unittest`, `uv run pytest`, `poetry run pytest`, `pipenv run pytest`, `tox`, `nox`.

Language:

- Support English and Chinese section hints.
- Do not require exact headings; commands are stronger evidence than headings.
- Share command recognition with CI checks where possible so README and GitHub Actions behavior does not drift.

## 11. GitHub Actions

Start with CLI-based CI usage, not a custom Action package.

Downstream example:

```yaml
name: Bootlane

on:
  pull_request:
  push:
    branches:
      - main

permissions:
  contents: read

jobs:
  bootlane:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: 24
      - run: npx bootlane@latest check --ci --fail-on critical --format markdown
```

Future:

- Publish `bootlane/action` only if annotations, PR comments, or caching justify it.
- Keep generated workflow previews deterministic and review-only.

## 12. Testing Strategy

Test layers:

- Unit tests for scoring, config parsing, command recognition, env parsing, secret patterns, and helper functions.
- Fixture tests for realistic Node and Python project directories.
- CLI tests for command options, output modes, report writing, and CI thresholds.
- Built binary smoke tests that run the compiled CLI against fixtures.
- Package dry-run validation for publish artifacts.
- Packed install smoke before publishing.

Fixture examples:

```text
examples/fixtures/node-good
examples/fixtures/node-missing-env
examples/fixtures/node-ci-missing-pnpm
examples/fixtures/python-good
examples/fixtures/python-ci-missing-uv
```

Quality gates:

See [Quality Gates](QUALITY_GATES.md) for the full gate map.
Use [Release Evidence](RELEASE_EVIDENCE.md) to record first-publish manual and external checks.
Use [Release Evidence Snapshot](RELEASE_EVIDENCE_SNAPSHOT.md) as the generated first-publish evidence draft.
Use [Release Safety Fixtures](RELEASE_SAFETY_FIXTURES.md) to review the first-publish drift fixture matrix.
The release evidence entry format is part of the shared release contract so copied evidence records stay consistent.
The Snapshot Focus Policy keeps the generated draft compact, the Snapshot Reference Guide links longer release evidence guidance back to the full checklist, the Snapshot Refresh Rules tell maintainers when to regenerate the draft after release-surface changes, the Release Closeout Checklist records final status, links, and follow-ups, and the launch Announcement Readiness Gate guards broad public sharing.
The Post-Launch Feedback Closure Matrix in [Triage Guide](TRIAGE.md) routes feedback into fixture-backed fixes, docs updates, roadmap candidates, release evidence updates, or launch follow-ups. The Roadmap Candidate Review keeps broad feature requests classified by evidence, implementation boundary, and next action before they enter planning. [Roadmap](ROADMAP.md) records candidate target, evidence status, review trigger, review cadence, status transitions, 0.2.0 Accuracy Work Intake, Fixture Intake Fields, Fixture Case Matrix, Fixture Seed Backlog, Seed Issue Routing Fields, Seed Triage Routing, Seed Batch Review Cadence, Seed Evidence Comment Templates, Seed Fixture Readiness Handoff, Seed Verification Command Sets, Seed Evidence Record Fields, Seed Evidence Refresh Rules, Seed Evidence Audit Checklist, Seed Audit Outcome Routing, Seed Audit Outcome Record Templates, Seed Fixture Implementation Batch Fields, Seed Fixture Implementation Batch Execution Checklist, Seed Fixture Implementation Starter Batches, Seed Fixture Implementation PR Queue, Seed Fixture Implementation Queued PR Readiness Checklist, Seed Fixture Implementation Queued PR Review Handoff, Seed Fixture Implementation Queued PR Review Outcome Routing, Seed Fixture Implementation Queued PR Review Outcome Record Templates, Seed Fixture Implementation Queued PR Closeout Checklist, Seed Fixture Implementation Queued PR Closeout Record Templates, Seed Fixture Implementation Queued PR Follow-Up Queue, Seed Fixture Implementation Queued PR Follow-Up Record Templates, Seed Fixture Implementation Queued PR Follow-Up Review Cadence, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Checklist, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Routing, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Checklist, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Templates, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates, Accuracy Work Intake Closure Criteria, and next action without turning parked ideas into release commitments.
Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist closes the latest audit outcome record template loop before closure or continuation can rely on the record.
Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates records the resulting closeout decisions with required inputs, body, and follow-up before closure or continuation proceeds.
Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules keeps those closeout records current when source evidence, closure or continuation route, blocker or deferral evidence, owner, stop condition, or default-path verification changes.

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
pnpm verify:release
```

Networked or environment-sensitive release checks:

```bash
pnpm npm-names:check
pnpm smoke:packed-install
```

## 13. Release Strategy

Use a manual first-release flow guarded by scripts.

Current rules:

- Publish `@bootlane/core` and `bootlane` as public packages.
- Keep both packages versioned together for `0.1.0`.
- Publish `@bootlane/core` before `bootlane` because the CLI depends on core.
- Do not add `repository`, `homepage`, or `bugs` fields until the real Bootlane repository URL is confirmed.
- Do not add automated publish workflows until npm access, provenance expectations, and repository permissions are intentionally designed.
- Use `pnpm release-safety:check` to guard against premature package URL metadata or publish automation.
- Use `pnpm release-safety:fixtures` to prove the release safety guard catches package URL metadata, release workflow triggers, publish commands, write permissions, npm tokens, and provenance drift.
- Use `pnpm docs:check-release-safety-fixtures` to keep [Release Safety Fixtures](RELEASE_SAFETY_FIXTURES.md) synchronized with the fixture case matrix.
- Keep release evidence maintainer execution steps, section guide entries, snapshot focus policy, snapshot reference guide entries, snapshot refresh rules, status values, entry-field rules, redaction examples, dry-run transcript fields, post-publish verification fields, release closeout checklist items, launch announcement readiness items, manual decision log fields, manual decision checklist items, staleness rules, the publish-window checklist, and external state confirmations in `scripts/release-gate-contracts.mjs` so [Release Evidence](RELEASE_EVIDENCE.md), [Release Evidence Snapshot](RELEASE_EVIDENCE_SNAPSHOT.md), [Launch Checklist](LAUNCH.md), and release docs checks share one source of truth.
- Keep post-launch feedback closure routes, roadmap candidate review categories, roadmap candidate backlog entries, review cadence, status transitions, 0.2.0 accuracy intake rules, Fixture Intake Fields, Fixture Case Matrix, Fixture Seed Backlog, Seed Issue Routing Fields, Seed Triage Routing, Seed Batch Review Cadence, Seed Evidence Comment Templates, Seed Fixture Readiness Handoff, Seed Verification Command Sets, Seed Evidence Record Fields, Seed Evidence Refresh Rules, Seed Evidence Audit Checklist, Seed Audit Outcome Routing, Seed Audit Outcome Record Templates, Seed Fixture Implementation Batch Fields, Seed Fixture Implementation Batch Execution Checklist, Seed Fixture Implementation Starter Batches, Seed Fixture Implementation PR Queue, Seed Fixture Implementation Queued PR Readiness Checklist, Seed Fixture Implementation Queued PR Review Handoff, Seed Fixture Implementation Queued PR Review Outcome Routing, Seed Fixture Implementation Queued PR Review Outcome Record Templates, Seed Fixture Implementation Queued PR Closeout Checklist, Seed Fixture Implementation Queued PR Closeout Record Templates, Seed Fixture Implementation Queued PR Follow-Up Queue, Seed Fixture Implementation Queued PR Follow-Up Record Templates, Seed Fixture Implementation Queued PR Follow-Up Review Cadence, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Checklist, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Routing, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Checklist, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Templates, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing, Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates, and Accuracy Work Intake Closure Criteria in `scripts/triage-contracts.mjs` so [Triage Guide](TRIAGE.md), [Roadmap](ROADMAP.md), launch docs, template docs checks, and `pnpm docs:check-triage` share one source of truth.
- Keep Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist in `scripts/triage-contracts.mjs` so the newest audit outcome record closeout checks share one source of truth with [Triage Guide](TRIAGE.md), [Roadmap](ROADMAP.md), launch docs, and template docs checks.
- Keep Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates in `scripts/triage-contracts.mjs` so closeout record templates share one source of truth with [Triage Guide](TRIAGE.md), [Roadmap](ROADMAP.md), launch docs, and template docs checks.
- Keep Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules in `scripts/triage-contracts.mjs` so stale closeout refresh rules share one source of truth with [Triage Guide](TRIAGE.md), [Roadmap](ROADMAP.md), launch docs, and template docs checks.
- Use `pnpm release:evidence` to regenerate the copy-paste first-publish evidence snapshot, and `pnpm release:evidence:check` to guard it in CI and release verification.
- Keep release gate command metadata in `scripts/release-gate-contracts.mjs` so `pnpm verify:release`, the release evidence snapshot, quality gate docs checks, and PR template checks share one source of truth. Use `pnpm release:gates:check` to validate that contract against package scripts, CI, and release docs checks.
- Use `pnpm ci:workflow:check` to guard CI triggers, read-only permissions, Node 22/24 matrix, pnpm setup, dependency install, and command order against the release gate contract.
- Keep changelog user-facing: new checks, changed scoring, bug fixes, breaking changes. `pnpm docs:check-changelog` guards the 0.1.0 release-candidate notes.

Suggested milestones:

- `0.1.0`: Node and Python setup-readiness release candidate with terminal/JSON/Markdown reports, config, dry-run fix previews, and release gates.
- `0.2.0`: Accuracy polish from real-world repository feedback.
- `0.3.0`: GitHub integration improvements if CLI-only CI usage is not enough.
- `0.4.0`: First safe write-capable fix flow.
- `1.0.0`: Stable check IDs, stable JSON schema, documented config, and proven low-noise behavior.

## 14. Risks and Mitigations

| Risk | Mitigation |
| --- | --- |
| Too many false positives | Use confidence levels, strict patterns, fixtures, and documented limitations |
| CLI feels noisy | Keep default report compact; support `--summary` and `--verbose` |
| Score feels arbitrary | Publish scoring formula and let users focus on findings |
| Secret scanning creates fear | Redact values, use high-signal patterns, clarify scope |
| Running scripts is unsafe | Do not execute project scripts by default |
| Multi-language support spreads effort thin | Keep Python conservative and avoid adding more ecosystems until Node/Python are stable |
| Publish metadata points to the wrong repo | Keep URL fields blocked until the real Bootlane repository is confirmed |

## 15. Open Decisions

These should become ADRs or release-plan updates when they are ready to implement:

- Whether to use AST parsing for env vars or keep heuristic scanning.
- Whether to publish a dedicated GitHub Action package or continue recommending `npx bootlane@latest`.
- Whether config should stay JSON-only or also support `bootlane.config.ts`.
- Whether to add ESLint/Prettier before or after the first public release.
- Whether the first write-capable flow should be `bootlane fix --write` or a separate safer command.
