# Bootlane Iteration Plan

Last updated: 2026-06-08

## Current Baseline

The repository now has a working MVP skeleton:

- pnpm workspace.
- `@bootlane/core` package.
- `bootlane` CLI package.
- Node project detection.
- Static checks for README, dependencies, runtime version, env vars, tests, secrets, and GitHub Actions.
- Package-manager-specific lockfile and mismatch diagnostics.
- Shared Node command recognition for README and CI checks.
- Comment-aware and string-example-aware env scanning for Node and Python source files.
- Terminal, JSON, and Markdown output.
- Compact and verbose terminal output modes.
- Report file writing with `--output`, including CI failure-path coverage.
- CLI exit code classification for invalid usage/config errors and unexpected runtime failures.
- Verbose terminal fix previews with 40-line-capped inline dry-run content previews.
- Markdown fix preview summaries for GitHub-friendly reports.
- `bootlane.config.json` support.
- Stable JSON/Markdown report snapshots and documented schema.
- GitHub Actions CI workflow and downstream CI usage docs.
- Dry-run fix proposals for `.env.example` and README setup gaps.
- Initial Python detection and read-only setup checks.
- Python README command recognition for pip, uv, module invocation, and common test runners.
- Python test signal classification for real test files versus declared tooling without test files.
- Python package metadata diagnostics for pyproject-only projects, missing Python lockfiles, and mixed Python package-manager signals.
- Python README install guidance for editable installs, directory installs, pyproject-only projects, and lockfile-based tools.
- Python GitHub Actions signal detection that shares test command recognition with Python README checks.
- Python README test guidance that suggests package-manager-specific and runner-specific commands.
- Node GitHub Actions workflow previews for deterministic npm, pnpm, Yarn, and Bun projects.
- Python GitHub Actions workflow previews that infer setup Python versions from supported runtime metadata.
- Release metadata checks, current changelog, and package binary smoke script with compact report-contract and output-artifact assertions.
- Repository CI runs build, tests, check ID docs, release blocker docs, package metadata checks, built CLI smoke, and package dry-run content validation.
- npm package dry-run validation with required package content assertions.
- Human-readable npm package contents contract with docs validation.
- First-publish release evidence checklist and fillable evidence tables with docs validation.
- Generated first-publish release evidence snapshot with drift validation.
- Shared release gate contract and self-check for release verification, evidence snapshots, quality gate docs, and PR template checks.
- CI workflow contract validation for triggers, permissions, Node matrix, setup, and release gate command order.
- Release safety fixture checks for package URL metadata, release workflow triggers, publish commands, write permissions, npm tokens, and provenance drift.
- Changelog release asset validation for the 0.1.0 release-candidate notes.
- PR template gate parity for local/CI, release-readiness, and external publish-time checks.
- Release safety guard that blocks premature package URL metadata and publish automation.
- Contributor guide, architecture map, adding-checks guide, and check ID catalog validation.
- Fixture tests and CLI smoke coverage.

## Iteration Loop

Each iteration should follow this loop:

1. Pick one user-visible capability.
2. Write or update fixtures that prove the behavior.
3. Implement the smallest internal API needed to support the capability cleanly.
4. Run `pnpm build`, `pnpm test`, and at least one built CLI smoke command.
5. Update README/docs only when behavior or commands change.

## Next Iterations

### Iteration 1: Config File Support

Goal:

Let real projects tune Bootlane without changing CLI flags every time.

Status:

Implemented in the MVP codebase.

Scope:

- Load `bootlane.config.json` from the target repo root.
- Support `ignore`, `failOn`, and `checks` overrides.
- Add `--config <file>` for non-default config paths.
- Let CLI flags override config file values.
- Add fixtures and tests for disabled checks and severity overrides.

Acceptance:

- `bootlane check fixture-with-config --ci` respects config `failOn`.
- `checks["ci.github-actions.missing"] = "off"` removes that finding.
- `checks["runtime.node-version.missing"] = "error"` promotes that finding to critical.

### Iteration 2: Report Stability

Goal:

Make reports stable enough for CI and future GitHub comments.

Status:

Implemented in the MVP codebase.

Scope:

- Document JSON schema fields.
- Add snapshot tests for Markdown and JSON reports.
- Add stable sorting for files and findings everywhere.
- Add `--summary` or compact mode only if terminal output becomes too noisy.

Acceptance:

- JSON report snapshots are deterministic except `generatedAt`.
- Markdown report can be pasted into a GitHub issue.

### Iteration 3: GitHub Action Example

Goal:

Make Bootlane easy for maintainers to add to CI.

Status:

Implemented in the MVP codebase.

Scope:

- Add `.github/workflows/ci.yml` for Bootlane itself.
- Add docs example for downstream projects.
- Consider a composite action after CLI behavior stabilizes.

Acceptance:

- README includes copy-paste workflow.
- `--ci --fail-on critical` behavior is documented and tested.

### Iteration 4: Safe Fix Preview

Goal:

Start the path toward `bootlane fix` without writing risky mutations.

Status:

Implemented in the MVP codebase.

Scope:

- Add core `FixProposal` type.
- Generate dry-run proposals for `.env.example` and README snippets.
- No file writes yet.

Acceptance:

- `bootlane check --format json` can include fix proposal metadata.
- Fixtures prove generated `.env.example` suggestions are correct.

### Iteration 5: Python Detection Spike

Goal:

Explore the second ecosystem without weakening Node quality.

Status:

Implemented in the MVP codebase.

Scope:

- Detect `pyproject.toml`, `requirements.txt`, `uv.lock`, `.python-version`.
- Add read-only checks for Python version, install docs, env example, and tests.

Acceptance:

- Python support is behind clear checks and fixtures.
- Node tests stay green and unchanged.

### Iteration 6: Release Readiness

Goal:

Make the MVP easier to publish, demo, and maintain.

Scope:

- Add package metadata for npm publishing.
- Add a short CLI demo section to README.
- Add a changelog/release notes skeleton.
- Add a packaging smoke test for the `bootlane` binary.

Status:

Implemented in the MVP codebase.

Acceptance:

- `pnpm build` and `pnpm test` stay green.
- Built CLI can run through the package `bin` entry.
- README has enough information for a first GitHub release.

### Iteration 7: Contributor Readiness

Goal:

Make the codebase easier for outside contributors to understand and extend.

Scope:

- Add contribution guidelines.
- Document how to add a new check.
- Add a check ID catalog.
- Add a short architecture map for detectors, checks, reporters, and fix proposals.

Status:

Implemented in the MVP codebase.

Acceptance:

- A contributor can add a small check by following docs.
- Check IDs are discoverable without reading every source file.
- Existing build, tests, bin smoke, and pack dry-run stay green.

### Iteration 8: Config Polish and Ignore Docs

Goal:

Make project configuration clearer and safer before broader use.

Status:

Implemented in the MVP codebase.

Scope:

- Document default ignore patterns.
- Add tests for config `ignore` behavior.
- Add an example config file for common repos.
- Consider `--print-config` for debugging merged config.

Acceptance:

- Users can predict why files are skipped.
- Config ignore behavior is covered by fixtures.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 9: CLI UX Polish

Goal:

Make terminal output easier to scan during local setup work and easier to debug when findings need context.

Status:

Implemented in the MVP codebase.

Scope:

- Add `--summary` for compact terminal output with score and finding counts.
- Add `--verbose` for terminal output with category, confidence, and fix preview details.
- Reject conflicting `--summary --verbose` usage.
- Keep JSON and Markdown report schemas unchanged.

Acceptance:

- `bootlane check . --summary` prints score, finding counts, and fix preview count without full finding details.
- `bootlane check . --verbose` prints normal findings plus diagnostic metadata and fix previews.
- CLI tests cover summary, verbose, and conflicting mode behavior.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 10: Command Pattern Accuracy

Goal:

Reduce README and CI false positives for common package-manager command styles used in real Node repositories.

Status:

Implemented in the MVP codebase.

Scope:

- Recognize `npm ci` as a valid dependency install command.
- Recognize `pnpm run <script>`, `yarn run <script>`, and `bun <script>` variants for run/test commands.
- Share Node command recognition between README and GitHub Actions checks.
- Add fixtures for common npm and pnpm command styles.

Acceptance:

- A project documenting `npm ci` is not flagged for missing install instructions.
- A project documenting `pnpm run dev` and `pnpm run test` is not flagged for missing run/test instructions.
- A GitHub Actions workflow using `pnpm run test` is recognized as running tests.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 11: Env Scanner Accuracy

Goal:

Make environment-variable detection more useful on real projects while keeping false positives low.

Status:

Implemented in the MVP codebase.

Scope:

- Add fixture coverage for comment-only env references in Node and Python projects.
- Ignore env access patterns in line and block comments where practical without adding a full parser.
- Keep `.env.example` fix proposals deterministic.
- Document scanner limitations and confidence behavior.

Acceptance:

- Env scanner catches common Node/Python env access patterns used in source code.
- Comment-only env names do not produce high-confidence missing-env findings.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 12: Env Scanner Fallback Patterns

Goal:

Broaden environment-variable detection for common fallback/default coding styles without making scanner output noisy.

Status:

Implemented in the MVP codebase.

Scope:

- Add fixture coverage for optional env reads with defaults in Node and Python.
- Preserve deterministic `.env.example` create/append proposal ordering.
- Ignore string-literal-only env mentions unless the env access expression itself starts in code.
- Keep ignored OS/session env names documented.

Acceptance:

- Common fallback patterns still produce missing-env findings when source code actually reads the variable.
- String-literal examples do not become high-confidence findings without code access context.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 13: Dependency Metadata Polish

Goal:

Make dependency and package-manager findings more helpful for repositories with mixed or incomplete package metadata.

Status:

Implemented in the MVP codebase.

Scope:

- Add fixture coverage for declared package managers without matching lockfiles.
- Improve mismatch messages when multiple lockfiles are present.
- Add package-manager-specific install command suggestions for missing lockfiles.
- Keep package manager detection deterministic and read-only.

Acceptance:

- Package-manager mismatch findings point to the expected lockfile and the conflicting metadata.
- Missing lockfile suggestions are specific enough for npm, pnpm, yarn, and bun projects.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 14: Python README Command Accuracy

Goal:

Reduce README false positives for common Python dependency and test command styles.

Status:

Implemented in the MVP codebase.

Scope:

- Add fixture coverage for `python3 -m pip install -r requirements.txt`.
- Add fixture coverage for `py -m pytest`, `uv pip install`, and `uv run pytest`.
- Expand Python README command recognition for common pip/uv/module invocations.
- Keep Python support read-only and conservative.

Acceptance:

- Python README install/test commands are recognized across pip, uv, poetry, and common module invocations.
- Existing Python setup-gap fixtures still report missing instructions.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 15: Python Test Signal Accuracy

Goal:

Make Python test detection more accurate for common test layouts and config-only projects.

Status:

Implemented in the MVP codebase.

Scope:

- Add fixture coverage for unittest-style test files and `tests` package layouts.
- Add fixture coverage for pyproject-only pytest/unittest tool signals without test files.
- Improve test-signal messages when tests are absent but test tools are declared.
- Keep Python checks read-only and deterministic.

Acceptance:

- Python test signal detection recognizes common pytest and unittest layouts.
- Projects with declared test tooling but no test files get a useful, non-noisy result.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 16: Python Package Metadata Polish

Goal:

Make Python package-manager and dependency metadata diagnostics more helpful for pyproject-only and mixed-tooling projects.

Status:

Implemented in the MVP codebase.

Scope:

- Add fixture coverage for pyproject-only projects with and without lockfiles.
- Improve package manager classification for `pyproject.toml` build backends and tool sections.
- Add dependency metadata messages that distinguish missing dependency files from intentionally dependency-light projects.
- Keep Python checks read-only and deterministic.

Acceptance:

- pyproject-only Python projects get predictable package manager summaries.
- Mixed uv, poetry, pipenv, and requirements metadata does not produce confusing suggestions.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 17: Python README Install Guidance Polish

Goal:

Make Python README guidance more precise for package-manager-specific and source-layout-specific projects.

Status:

Implemented in the MVP codebase.

Scope:

- Add fixture coverage for pyproject-only projects missing install docs.
- Improve README install suggestions for editable installs, package directories, and lockfile-based tools.
- Keep command recognition forgiving for pip, uv, Poetry, and Pipenv.
- Avoid generating README fix previews until Python snippets have enough fixture coverage.

Acceptance:

- README install findings suggest commands that match detected Python metadata.
- Existing Python command-recognition fixtures stay false-positive-free.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 18: Python CI Signal Detection

Goal:

Start detecting whether Python projects run checks in GitHub Actions without weakening the existing Node CI behavior.

Status:

Implemented in the MVP codebase.

Scope:

- Add fixture coverage for Python GitHub Actions workflows that run pytest, unittest, tox, nox, uv, Poetry, or Pipenv commands.
- Add a Python-scoped CI check for missing workflows and workflows that omit recognizable test commands.
- Share Python test command recognition between README and CI checks.
- Keep Node CI findings and fixtures unchanged.

Acceptance:

- Python projects with a workflow running tests avoid CI false positives.
- Python projects with tests but no CI get a useful low-noise finding.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 19: Python Shared Signal Helpers

Goal:

Reduce duplication in Python test-file and package-manager signal logic before adding more Python checks.

Status:

Implemented in the MVP codebase.

Scope:

- Extract shared Python test-file recognition from README, tests, and CI checks.
- Extract shared Python package-manager signal metadata from detector and dependency checks.
- Add focused unit tests for shared helpers so fixture tests stay readable.
- Preserve current public finding IDs and report behavior.

Acceptance:

- Python checks use one source of truth for test-file detection.
- Python package-manager diagnostics still match current fixtures.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 20: Python Test Command Helper Coverage

Goal:

Make shared Python command recognition easier to evolve without broad fixture churn.

Status:

Implemented in the MVP codebase.

Scope:

- Add focused tests for shared Python README/CI test command recognition.
- Add edge-case coverage for uv, Poetry, Pipenv, tox, nox, pytest, and unittest commands.
- Keep README and CI checks using the same command helper.
- Preserve current Python fixture behavior.

Acceptance:

- Python command helper tests cover the supported command matrix directly.
- README and CI checks still share one source of truth for Python test commands.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 21: Python README Test Guidance Polish

Goal:

Make Python README test guidance more precise for project-specific package managers and test runners.

Status:

Implemented in the MVP codebase.

Scope:

- Improve `readme.python-test.missing` suggestions based on detected package manager and test tooling.
- Add fixture coverage for uv, Poetry, Pipenv, tox, nox, pytest, and unittest projects missing README test docs.
- Keep command recognition shared between README and CI checks.
- Preserve current low-noise handling for projects with declared tooling but no test files.

Acceptance:

- Python README test findings suggest commands that match detected metadata.
- Existing Python README and CI command fixtures stay false-positive-free.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 22: Python README Fix Preview Spike

Goal:

Explore read-only README fix proposals for Python setup guidance now that install and test suggestions are more precise.

Status:

Implemented in the MVP codebase.

Scope:

- Add fixture coverage for Python README install/test gaps that can produce deterministic snippets.
- Generate dry-run README proposals for Python only when install and test suggestions are high confidence.
- Keep proposals read-only and marked `review`.
- Preserve current Node README fix proposal behavior.

Acceptance:

- Python README fix proposals include package-manager-aware install and test commands.
- Python fixtures without enough metadata do not get overconfident snippets.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 23: Python CI Suggestion Precision

Goal:

Reuse Python setup command helpers in CI findings so workflow suggestions match package-manager and test-tool metadata.

Status:

Implemented in the MVP codebase.

Scope:

- Suggest Python CI install/test commands from the same helpers used by README checks and fix previews.
- Add fixture coverage for uv, Poetry, Pipenv, tox, nox, pytest, and unittest CI gaps.
- Keep CI checks gated on real Python test files.
- Preserve current Node CI behavior.

Acceptance:

- Python CI findings suggest deterministic commands when metadata is available.
- Python CI findings avoid overconfident command snippets when metadata is incomplete.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 24: Python CI Fix Preview Spike

Goal:

Explore read-only GitHub Actions workflow proposals for Python projects with deterministic install and test commands.

Status:

Implemented in the MVP codebase.

Scope:

- Generate dry-run workflow snippets for Python projects missing GitHub Actions only when install and test commands are high confidence.
- Keep workflow proposals read-only and marked `review`.
- Avoid proposing workflow content when test tooling metadata is incomplete.
- Preserve current Node CI and README fix proposal behavior.

Acceptance:

- Python CI fix proposals include package-manager-aware install and test commands when metadata is available.
- Python fixtures without enough metadata do not get overconfident workflow snippets.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 25: Python Workflow Preview Matrix

Goal:

Broaden Python GitHub Actions workflow preview fixture coverage across package managers and test runners.

Status:

Implemented in the MVP codebase.

Scope:

- Add fixture coverage for uv, Poetry, Pipenv, tox, nox, pytest, and unittest missing-workflow previews.
- Verify generated workflow snippets use the expected install and test command pairs.
- Keep previews disabled when install or test command metadata is incomplete.
- Preserve current Node CI and README fix proposal behavior.

Acceptance:

- Python workflow previews are covered by a package-manager and test-runner matrix.
- Negative fixtures continue proving that incomplete metadata does not create workflow snippets.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 26: Workflow Preview Content Polish

Goal:

Make generated Python GitHub Actions workflow previews more complete while staying deterministic and read-only.

Status:

Implemented in the MVP codebase.

Scope:

- Include package-manager setup steps when a tool commonly needs installation before its install command.
- Keep generated workflows minimal and understandable.
- Preserve current package-manager and test-runner command matrix behavior.
- Keep previews disabled when install or test command metadata is incomplete.

Acceptance:

- Generated uv, Poetry, and Pipenv workflow previews include the setup needed to run their commands.
- Generated pip, tox, nox, and unittest previews remain simple and do not gain unnecessary tool setup.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 27: Workflow Preview Python Version Sources

Goal:

Improve Python version inference for generated GitHub Actions workflow previews.

Status:

Implemented in the MVP codebase.

Scope:

- Infer workflow Python versions from `.python-version`, `runtime.txt`, and `.tool-versions` when `requires-python` is absent.
- Keep `requires-python` as the first source when available.
- Preserve the current fallback to `3.x` when no deterministic version is available.
- Add fixture coverage for each supported version source.

Acceptance:

- Generated workflow previews use deterministic Python versions from supported files.
- Missing or ambiguous version metadata still falls back to `3.x`.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 28: Workflow Preview YAML Hygiene

Goal:

Make generated GitHub Actions workflow previews easier to review and less likely to drift as more ecosystems are added.

Status:

Implemented in the MVP codebase.

Scope:

- Add focused tests for the structure and ordering of generated Python workflow YAML.
- Introduce a small workflow rendering helper so setup, install, and test steps stay predictable.
- Preserve current generated content and fix proposal IDs.
- Keep previews read-only and marked `review`.

Acceptance:

- Workflow previews keep stable action versions, permissions, branch triggers, and step ordering.
- Package-manager setup steps remain present only for uv, Poetry, and Pipenv.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 29: Node CI Fix Preview Spike

Goal:

Explore read-only GitHub Actions workflow proposals for Node projects without changing existing CI findings.

Status:

Implemented in the MVP codebase.

Scope:

- Generate a dry-run workflow proposal for npm projects when `npm ci`, a useful test script, and a deterministic Node version are available.
- Reuse the shared workflow renderer introduced for Python workflow previews.
- Keep previews disabled for Node projects with incomplete runtime or package-manager metadata.
- Preserve current finding IDs and Node CI signal behavior.

Acceptance:

- Node npm projects missing GitHub Actions can receive a deterministic workflow preview.
- Existing Node fixtures without enough metadata do not gain overconfident workflow snippets.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 30: Node Workflow Version Sources

Goal:

Improve Node version inference for generated GitHub Actions workflow previews.

Status:

Implemented in the MVP codebase.

Scope:

- Infer workflow Node versions from `.nvmrc`, `.node-version`, and `.tool-versions` when `engines.node` and Volta metadata are absent.
- Keep package metadata as the first source when available.
- Avoid generating Node workflow previews when no deterministic version is available.
- Add fixture coverage for each supported version source and the missing-metadata negative case.

Acceptance:

- Generated Node workflow previews use deterministic versions from supported files.
- Missing Node version metadata keeps the CI finding but suppresses the workflow preview.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 31: Node Workflow Package Manager Matrix

Goal:

Broaden Node GitHub Actions workflow previews across common JavaScript package managers while keeping snippets deterministic.

Status:

Implemented in the MVP codebase.

Scope:

- Generate Node workflow previews for npm, pnpm, Yarn, and Bun when lockfile, test script, and Node version metadata are available.
- Use lockfile-backed install commands for each package manager.
- Include package-manager setup steps for pnpm, Yarn, and Bun.
- Preserve existing Node CI finding behavior and `fix.ci.github-actions.node.create`.

Acceptance:

- npm, pnpm, Yarn, and Bun missing-workflow fixtures receive deterministic workflow previews.
- Generated pnpm and Yarn previews include `corepack enable`; Bun previews include `oven-sh/setup-bun@v2`.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 32: Verbose Fix Preview Content

Goal:

Make terminal fix previews easier to review without requiring JSON output.

Status:

Implemented in the MVP codebase.

Scope:

- Show dry-run proposal content in `bootlane check --verbose` fix preview sections.
- Keep normal and summary terminal modes unchanged.
- Add a line cap so very large proposals do not flood terminal output.
- Preserve JSON and Markdown report schemas.

Acceptance:

- Verbose terminal output includes action path, related findings, safety metadata, and content preview.
- Summary output still reports only the number of available fix previews.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 33: Markdown Fix Preview Summary

Goal:

Make Markdown reports more useful for GitHub comments by including dry-run fix proposal summaries.

Status:

Implemented in the MVP codebase.

Scope:

- Add a `Fix Previews` section to Markdown reports when proposals are available.
- Summarize proposal title, ID, action path, related findings, safety, and confidence.
- Keep generated proposal content in JSON reports and verbose terminal output rather than full Markdown comments.
- Preserve JSON report schema and existing finding grouping.

Acceptance:

- Markdown reports include fix preview summaries after findings.
- Markdown output remains compact enough for issues and PR comments.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 34: Terminal Fix Preview Truncation Coverage

Goal:

Keep verbose terminal fix preview output useful when generated snippets grow large.

Status:

Implemented in the MVP codebase.

Scope:

- Add focused coverage for verbose content preview truncation.
- Keep the current 40-line terminal preview cap documented.
- Preserve full proposal content in JSON reports.
- Preserve compact Markdown fix preview summaries.

Acceptance:

- Verbose terminal output shows the first 40 content lines for long proposals.
- Verbose terminal output reports the number of hidden lines after truncation.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 35: CLI Smoke Contract Assertions

Goal:

Make the built binary smoke test catch report contract regressions before packaging.

Status:

Implemented in the MVP codebase.

Scope:

- Keep running the built `bootlane` package bin entry.
- Assert `--version` output matches package metadata.
- Parse JSON reports from healthy Node and Python fixtures.
- Assert Markdown reports include fix preview summaries without embedding full proposal content.

Acceptance:

- `pnpm smoke:bin` fails if healthy fixture JSON is malformed or reports findings.
- `pnpm smoke:bin` fails if Markdown fix preview summaries disappear.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 36: Output Artifact CI Contract

Goal:

Make saved report artifacts reliable for CI jobs and local handoff workflows.

Status:

Implemented in the MVP codebase.

Scope:

- Add program-level coverage for `--output` report writing.
- Verify reports are written before `--ci` exit behavior is applied.
- Verify `--output` suppresses stdout report printing.
- Document saved report behavior in user-facing CLI docs.

Acceptance:

- `bootlane check --format markdown --output <file> --ci` writes the report even when findings fail the CI threshold.
- `--output` runs do not duplicate the rendered report to stdout.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 37: Built CLI Output Artifact Smoke

Goal:

Verify saved report behavior through the packaged CLI entrypoint, not only program-level tests.

Status:

Implemented in the MVP codebase.

Scope:

- Extend `pnpm smoke:bin` to support expected non-zero CLI exits.
- Run the built CLI with `--format markdown --output <file> --ci --fail-on critical`.
- Assert the saved report exists and includes fix preview summaries.
- Assert `--output` keeps stdout empty in the built binary smoke path.

Acceptance:

- `pnpm smoke:bin` fails if the built CLI stops writing report artifacts before CI exits.
- `pnpm smoke:bin` fails if `--output` starts duplicating rendered reports to stdout.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 38: Compact Built CLI Smoke Output

Goal:

Keep release smoke logs readable while preserving built CLI contract assertions.

Status:

Implemented in the MVP codebase.

Scope:

- Stop printing full JSON and Markdown reports on successful `pnpm smoke:bin` runs.
- Print compact `ok ...` status lines after each smoke assertion group passes.
- Keep raw stdout/stderr forwarding for failed smoke commands.
- Preserve version, JSON, Markdown, and `--output --ci` artifact assertions.

Acceptance:

- `pnpm smoke:bin` success output is short enough to scan in CI logs.
- Failed smoke commands still expose command output for debugging.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 39: Package Dry-Run Content Assertions

Goal:

Make package dry-run validation catch missing publish artifacts automatically.

Status:

Implemented in the MVP codebase.

Scope:

- Parse `npm pack --dry-run --json` output for each publishable package.
- Assert package names and versions match release metadata.
- Assert required package files such as `LICENSE`, `README.md`, `package.json`, CLI entrypoints, core entrypoints, declarations, reporters, and fixers are included.
- Print compact success lines instead of full npm notice output.

Acceptance:

- `pnpm pack:dry-run` fails if a package omits required runtime, type, or metadata files.
- `pnpm pack:dry-run` success output is short enough to scan in CI logs.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 40: Current Changelog Coverage

Goal:

Make the first release changelog reflect the current MVP rather than an earlier skeleton.

Status:

Implemented in the MVP codebase.

Scope:

- Expand the 0.1.0 changelog entry to cover current Node and Python readiness checks.
- Document report modes, config support, fix previews, CI behavior, and release-readiness scripts.
- Note the read-only contract and deterministic workflow preview constraints.
- Keep changelog content concise enough for release review.

Acceptance:

- `CHANGELOG.md` describes the main user-visible capabilities currently implemented.
- Release notes no longer understate Python, fix preview, output artifact, or packaging validation support.
- Existing build, tests, docs check, bin smoke, and pack dry-run stay green.

### Iteration 41: Package Metadata Consistency Check

Goal:

Automate deterministic release manifest checks without guessing the final GitHub repository URL.

Status:

Implemented in the MVP codebase.

Scope:

- Add `pnpm metadata:check` for root, core, and CLI package manifest contracts.
- Verify package versions, publishability, licenses, ESM settings, Node engine, scripts, keywords, files entries, exports, types, CLI bin, and CLI-to-core dependency version.
- Verify package README and LICENSE files exist.
- Keep final `repository`, `homepage`, and `bugs` URLs as manual release checklist items until the real Bootlane repository URL is confirmed.

Acceptance:

- `pnpm metadata:check` fails if deterministic package metadata drifts before release.
- Release docs include metadata checking while preserving the manual final URL confirmation.
- Existing build, tests, docs check, metadata check, bin smoke, and pack dry-run stay green.

### Iteration 42: CI Metadata Gate Alignment

Goal:

Keep repository CI aligned with the local release verification checklist.

Status:

Implemented in the MVP codebase.

Scope:

- Add `pnpm metadata:check` to the GitHub Actions CI workflow.
- Keep metadata validation after build, tests, and check ID docs, before package smoke and pack validation.
- Update GitHub Actions docs so the documented CI steps match the workflow.
- Preserve existing Node 22 and Node 24 matrix coverage.

Acceptance:

- CI runs the same deterministic package metadata check documented for local release verification.
- GitHub Actions docs list check ID docs, package metadata, package bin smoke, and package dry-run validation.
- Existing build, tests, docs check, metadata check, bin smoke, and pack dry-run stay green.

### Iteration 43: One-Command Release Verification

Goal:

Reduce release checklist drift by giving maintainers a single local command for the full release gate.

Status:

Implemented in the MVP codebase.

Scope:

- Add `pnpm verify:release`.
- Run build, tests, check ID docs, package metadata checks, built CLI smoke, and package dry-run validation in order.
- Keep individual scripts available for focused debugging.
- Document the one-command release gate in README and release notes.

Acceptance:

- `pnpm verify:release` fails when any release gate fails.
- `pnpm verify:release` prints clear stage start and success lines.
- Existing build, tests, docs check, metadata check, bin smoke, pack dry-run, and verify release stay green.

### Iteration 44: npm Package Name Availability Check

Goal:

Make npm package-name availability a repeatable release-time check instead of a one-off manual lookup.

Status:

Implemented in the MVP codebase.

Scope:

- Add `pnpm npm-names:check`.
- Query the official npm registry for `bootlane` and `@bootlane/core`.
- Treat npm `E404`/not found responses as names currently unpublished.
- Fail when a package name already has a published version.
- Keep the check out of regular CI because npm package-name availability is external, time-sensitive state.

Acceptance:

- `pnpm npm-names:check` confirms both publishable package names are currently unpublished when npm registry returns `E404`.
- Release docs list the package-name check as a networked release-time check.
- Existing build, tests, docs check, metadata check, bin smoke, pack dry-run, and verify release stay green.

### Iteration 45: Release Blocker Ledger

Goal:

Make external first-release blockers explicit so green local gates are not mistaken for publish readiness.

Status:

Implemented in the MVP codebase.

Scope:

- Add `docs/RELEASE_BLOCKERS.md`.
- Track final Bootlane repository URL, npm account/org access, npm package-name re-check timing, and release tag target as human/external blockers.
- Add `pnpm docs:check-release-blockers`.
- Include release blocker doc validation in CI and `pnpm verify:release`.
- Link release blockers from README and release notes.

Acceptance:

- Release blockers are visible from README and release notes.
- `pnpm docs:check-release-blockers` fails if the blocker ledger stops tracking critical external items.
- Existing build, tests, docs checks, metadata check, bin smoke, pack dry-run, and verify release stay green.

### Iteration 46: Manual Publish Runbook

Goal:

Make the first manual npm publish sequence explicit and reviewable.

Status:

Implemented in the MVP codebase.

Scope:

- Expand the release publish plan into pre-publish, publish, and post-publish sections.
- Document `pnpm verify:release`, `pnpm npm-names:check`, and `npm publish --dry-run --access public`.
- Document the manual publish order: `@bootlane/core` before `bootlane`.
- Document post-publish `npx bootlane@latest` checks.
- Extend release blocker doc validation to guard the publish runbook.

Acceptance:

- Release docs include copy-pasteable dry-run and publish commands.
- Release docs make the core-before-CLI publish order explicit.
- `pnpm docs:check-release-blockers` fails if critical publish commands disappear from the release runbook.
- Existing build, tests, docs checks, metadata check, bin smoke, pack dry-run, and verify release stay green.

### Iteration 47: Built CLI Read-Only Smoke

Goal:

Turn the `bootlane check` read-only promise into a built CLI smoke assertion.

Status:

Implemented in the MVP codebase.

Scope:

- Copy a fixture project into a temporary directory.
- Snapshot the copied project files before running the built CLI.
- Run `bootlane check --verbose --no-color` through the built package bin.
- Snapshot the copied project files after the command and fail if any file changed.
- Document the read-only smoke coverage in release notes.

Acceptance:

- `pnpm smoke:bin` fails if `bootlane check` mutates analyzed project files.
- `pnpm smoke:bin` still verifies version, JSON reports, Markdown fix previews, output artifacts, and read-only behavior.
- Existing build, tests, docs checks, metadata check, bin smoke, pack dry-run, and verify release stay green.

### Iteration 48: README Release Candidate Status

Goal:

Make the top-level README describe the current 0.1.0 release candidate instead of an earlier MVP skeleton.

Status:

Implemented in the MVP codebase.

Scope:

- Update the README Current Status section.
- Cover current core and CLI responsibilities.
- Include Node and Python readiness checks, package-manager-aware diagnostics, fix previews, configuration, release gates, and read-only smoke coverage.
- Keep detailed references in the existing docs rather than overloading the README.

Acceptance:

- README no longer understates Python, fix preview, output artifact, release gate, or read-only smoke support.
- README remains concise enough for first-time users to scan.
- Existing build, tests, docs checks, metadata check, bin smoke, pack dry-run, and verify release stay green.

### Iteration 49: Package README Publish Quality

Goal:

Improve the npm package pages and guard against losing key package README content.

Status:

Implemented in the MVP codebase.

Scope:

- Expand `@bootlane/core` README with programmatic usage, check coverage, fix proposal scope, and read-only contract.
- Keep the CLI README focused on command usage.
- Add package README content assertions to `pnpm pack:dry-run`.
- Preserve existing package file content assertions.

Acceptance:

- `@bootlane/core` README gives library consumers enough context to start.
- `pnpm pack:dry-run` fails if critical package README content disappears.
- Existing build, tests, docs checks, metadata check, bin smoke, pack dry-run, and verify release stay green.

### Iteration 50: Local Packed Install Smoke

Goal:

Validate the packages after `npm pack` in a temporary install environment before publishing.

Status:

Implemented in the MVP codebase.

Scope:

- Add `pnpm smoke:packed-install`.
- Create local tarballs for `@bootlane/core` and `bootlane`.
- Install those tarballs into a temporary package.
- Run the installed `bootlane` binary for `--version` and a JSON fixture check.
- Document this as a network-sensitive pre-publish smoke rather than a regular CI gate.

Acceptance:

- `pnpm smoke:packed-install` verifies local tarball install behavior.
- Release docs include the packed install smoke near publish time.
- Existing build, tests, docs checks, metadata check, bin smoke, pack dry-run, packed install smoke, and verify release stay green.

### Iteration 51: Packed Install Smoke Cleanup

Goal:

Keep packed install smoke verification from leaving tarball artifacts in package directories.

Status:

Implemented in the MVP codebase.

Scope:

- Use `npm pack --pack-destination` so generated tarballs live in the smoke temp directory.
- Install local tarballs from that temp directory.
- Clean up previously generated package tarballs.
- Verify package directories do not retain `.tgz` artifacts after smoke runs.

Acceptance:

- `pnpm smoke:packed-install` passes without leaving `.tgz` files in `packages/core` or `packages/cli`.
- Existing build, tests, docs checks, metadata check, bin smoke, pack dry-run, packed install smoke, and verify release stay green.

### Iteration 52: Design and Stack Reality Refresh

Goal:

Keep the foundational planning documents aligned with the current 0.1.0 release candidate instead of the earliest Node-only MVP assumptions.

Status:

Implemented in the MVP codebase.

Scope:

- Refresh `docs/BOOTLANE_DESIGN.md` to describe the current Node plus conservative Python release candidate scope.
- Document the read-only `bootlane check` contract and current dry-run fix preview strategy.
- Refresh `docs/TECH_STACK.md` to match actual dependencies, scripts, CI gates, and manual first-release strategy.
- Move unimplemented tooling such as lint/format automation, bundling, process execution helpers, Changesets, and npm provenance into deferred or open-decision sections.
- Preserve the release blocker rule that final repository URLs must not be guessed.

Acceptance:

- Design docs no longer say the first public version only supports Node.js repositories.
- Technical stack docs no longer present unimplemented release automation or lint tooling as current behavior.
- Roadmap and open decisions distinguish shipped release-candidate behavior from deferred product ideas.
- Existing build, tests, docs checks, metadata check, bin smoke, pack dry-run, and verify release stay green.

### Iteration 53: CLI README Publish Quality

Goal:

Make the `bootlane` npm package README useful as a standalone package page and guard its most important user-facing sections.

Status:

Implemented in the MVP codebase.

Scope:

- Expand `packages/cli/README.md` beyond a short repository README pointer.
- Document quick start, command examples, Node/Python check coverage, output modes, CI usage, configuration, fix previews, read-only behavior, exit codes, and the relationship to `@bootlane/core`.
- Strengthen `pnpm pack:dry-run` README content assertions for the CLI package.
- Keep package dry-run validation focused on publish artifacts and critical package README content.

Acceptance:

- The `bootlane` npm README gives users enough context to run the CLI without opening the repository README first.
- `pnpm pack:dry-run` fails if critical CLI README sections disappear.
- Existing build, tests, docs checks, metadata check, bin smoke, pack dry-run, and verify release stay green.

### Iteration 54: First Release Review Checklist

Goal:

Make the first manual publish review less error-prone by turning scattered release notes into an explicit checklist guarded by docs validation.

Status:

Implemented in the MVP codebase.

Scope:

- Add a first-release review checklist to `docs/RELEASE.md`.
- Cover repository identity, npm identity, user-facing content, package artifacts, and post-publish verification.
- Keep the final Bootlane repository URL as a human-confirmed blocker instead of guessing from the current remote.
- Link the manual checklist from `docs/RELEASE_BLOCKERS.md`.
- Extend `pnpm docs:check-release-blockers` so critical checklist sections and commands cannot disappear silently.

Acceptance:

- Release docs require `git remote -v` review before publishing.
- Release docs require review of root, core, and CLI package READMEs, changelog, and report schema.
- Release docs keep dry-run, packed install, publish-order, and post-publish `npx bootlane@latest` checks visible.
- Existing build, tests, docs checks, metadata check, bin smoke, pack dry-run, and verify release stay green.

### Iteration 55: Example Markdown Report Launch Asset

Goal:

Add a real, committed Markdown report example for launch materials and keep it synchronized with the current report renderer.

Status:

Implemented in the MVP codebase.

Scope:

- Generate `examples/reports/node-missing-env.md` from the real analyzer and Markdown renderer.
- Normalize the example target path and timestamp so the artifact is stable across machines.
- Add `pnpm example:report` and `pnpm example:report:check`.
- Include the example report check in CI and `pnpm verify:release`.
- Link the example report from README and release launch assets.
- Extend release docs validation so the example report and launch asset links cannot disappear silently.

Acceptance:

- The committed example report shows real findings and fix preview summaries.
- `pnpm example:report:check` fails if the committed report drifts from the current renderer.
- README and release docs link the example report.
- Existing build, tests, docs checks, metadata check, bin smoke, pack dry-run, and verify release stay green.

### Iteration 56: Launch Checklist

Goal:

Make the first public launch easier to execute by documenting messaging, launch assets, sharing targets, feedback collection, and post-launch triage.

Status:

Implemented in the MVP codebase.

Scope:

- Add `docs/LAUNCH.md`.
- Document the launch goal, positioning guardrails, launch assets, pre-launch checks, announcement copy, sharing targets, feedback topics, post-launch triage, and follow-up candidates.
- Link the launch checklist from README, release notes, and design docs.
- Extend release docs validation so launch messaging, assets, share targets, feedback collection, and read-only positioning cannot disappear silently.
- Keep launch docs separate from publish mechanics in `docs/RELEASE.md`.

Acceptance:

- Launch docs preserve the "From clone to run" positioning.
- Launch docs include example report, package README, GitHub Actions, changelog, and release doc assets.
- Launch docs include post-launch feedback and triage guidance.
- Existing build, tests, docs checks, metadata check, bin smoke, pack dry-run, and verify release stay green.

### Iteration 57: Contributor Entry Readiness

Goal:

Make the contributor entry point match the current 0.1.0 release candidate workflow and keep it from drifting behind the real gates.

Status:

Implemented in the MVP codebase.

Scope:

- Refresh `CONTRIBUTING.md` with current setup, fixture smoke commands, PR checks, release-readiness checks, and project boundaries.
- Document `pnpm example:report:check`, `pnpm docs:check-release-blockers`, `pnpm metadata:check`, `pnpm verify:release`, `pnpm npm-names:check`, and `pnpm smoke:packed-install`.
- Preserve guidance that `bootlane check` is read-only and must not execute project scripts or write files.
- Add `pnpm docs:check-contributing`.
- Include the contributing docs check in CI, metadata validation, release docs, and `pnpm verify:release`.

Acceptance:

- README links a non-stale contributor guide.
- `CONTRIBUTING.md` tells contributors how to add checks, fixtures, docs, and report changes safely.
- `pnpm docs:check-contributing` fails if key contributor commands or boundaries disappear.
- Existing build, tests, docs checks, metadata check, bin smoke, pack dry-run, and verify release stay green.

### Iteration 58: Issue and PR Templates

Goal:

Make post-launch feedback easier to triage by giving users structured issue forms and contributors a PR checklist aligned with Bootlane's release gates.

Status:

Implemented in the MVP codebase.

Scope:

- Add issue forms for false positives, missing detections, docs confusion, and feature requests.
- Add a pull request template with verification, fixture, check ID, report schema, example report, and read-only reminders.
- Add `pnpm docs:check-templates`.
- Include the template check in CI, metadata validation, release docs, contributor docs, and `pnpm verify:release`.
- Link the PR template from `CONTRIBUTING.md`.
- Update launch feedback guidance to point users toward the matching issue form.

Acceptance:

- False-positive and missing-detection forms ask for Bootlane version, command, output, reproduction details, and secret redaction.
- Feature request and PR templates preserve the read-only `bootlane check` boundary.
- `pnpm docs:check-templates` fails if critical issue/PR template sections disappear.
- Existing build, tests, docs checks, metadata check, bin smoke, pack dry-run, and verify release stay green.

### Iteration 59: Post-Launch Triage Workflow

Goal:

Give maintainers a clear workflow for turning launch feedback into fixtures, check changes, docs fixes, or roadmap candidates.

Status:

Implemented in the MVP codebase.

Scope:

- Add `docs/TRIAGE.md`.
- Document triage goals, labels, false-positive handling, missing-detection handling, docs confusion handling, feature request handling, PR triage, escalation rules, and closing criteria.
- Link the triage guide from README, launch docs, and contributing docs.
- Add `pnpm docs:check-triage`.
- Include the triage docs check in CI, metadata validation, release docs, contributing docs, template docs, and `pnpm verify:release`.
- Preserve read-only, fixture-backed, check ID, report schema, and secret-redaction boundaries.

Acceptance:

- Maintainers can classify issue forms into false-positive, missing-detection, docs, enhancement, fixture, or more-info paths.
- Triage docs require fixture or focused test coverage for fixed false positives and missing detections.
- Triage docs define release-blocking escalation criteria.
- Existing build, tests, docs checks, metadata check, bin smoke, pack dry-run, and verify release stay green.

### Iteration 60: Quality Gates Map

Goal:

Make the growing set of development, CI, release, networked, and manual checks easy to understand from one authoritative document.

Status:

Implemented in the MVP codebase.

Scope:

- Add `docs/QUALITY_GATES.md`.
- Document daily development, pull request, CI, release, networked release, manual release, ownership, and read-only contract gates.
- Add `pnpm docs:check-quality-gates`.
- Include the quality gates check in CI, metadata validation, release docs, contributing docs, template docs, triage docs, release blocker docs, and `pnpm verify:release`.
- Link quality gates from README, contributing docs, release docs, tech stack, and GitHub Actions docs.
- Keep `pnpm npm-names:check` and `pnpm smoke:packed-install` explicitly outside normal CI and `verify:release`.

Acceptance:

- Quality gates docs list every current local/CI/release gate and its command.
- Quality gates docs distinguish CI gates, release gates, networked checks, and manual external-state checks.
- `pnpm docs:check-quality-gates` fails if key gates or read-only boundaries disappear.
- Existing build, tests, docs checks, metadata check, bin smoke, pack dry-run, and verify release stay green.

### Iteration 61: Security Policy and Secret Reporting

Goal:

Make Bootlane's security boundaries explicit before launch, especially around secret redaction, private reporting, and the fact that Bootlane is not a vulnerability scanner.

Status:

Implemented in the MVP codebase.

Scope:

- Add `SECURITY.md`.
- Document supported versions, security reporting, secret handling policy, current secret-check scope, read-only security boundary, maintainer response, and public discussion guidelines.
- Keep the final private security reporting channel as a release-time placeholder until the real Bootlane repository and maintainer contact are confirmed.
- Link security policy from README, contributing docs, release docs, launch docs, and quality gates.
- Add `pnpm docs:check-security`.
- Include the security docs check in CI, metadata validation, release docs, quality gates, PR template, and `pnpm verify:release`.

Acceptance:

- Security policy says Bootlane is not a vulnerability scanner and does not replace dedicated security tools.
- Security policy forbids printing full secrets in reports, logs, or fix proposals.
- Security policy preserves the read-only `bootlane check` boundary.
- Existing build, tests, docs checks, metadata check, bin smoke, pack dry-run, and verify release stay green.

### Iteration 62: Secret Redaction Regression Coverage

Goal:

Turn the secret-redaction security policy into test-backed behavior across core findings and rendered reports.

Status:

Implemented in the MVP codebase.

Scope:

- Strengthen the `node-secret-leak` fixture coverage.
- Assert secret findings include only redacted previews.
- Assert JSON and Markdown reports do not include full matched secret values.
- Assert terminal output does not include full matched secret values.
- Update security and quality gate docs to document JSON, Markdown, and terminal redaction coverage.

Acceptance:

- A full OpenAI-style fixture key never appears in core finding messages, JSON reports, Markdown reports, or terminal output.
- Redacted previews remain visible enough to identify the finding location.
- Existing build, tests, docs checks, metadata check, bin smoke, pack dry-run, and verify release stay green.

### Iteration 63: Secret Scanner Pattern Redaction Tests

Goal:

Add focused scanner-level coverage for every supported high-signal secret pattern so redaction regressions fail before report rendering.

Status:

Implemented in the MVP codebase.

Scope:

- Add `packages/core/test/secrets.test.ts`.
- Cover GitHub token, AWS access key ID, OpenAI API key, and private key block detection.
- Assert each scanner hit includes the expected ID, label, file, line number, and redacted preview.
- Assert scanner hit JSON does not contain the full matched secret.
- Cover committed env file classification without flagging `.env.example`.
- Update security and quality gate docs to mention focused scanner tests.

Acceptance:

- Every supported secret pattern has direct redaction coverage.
- Scanner previews are useful but never equal the full matched secret.
- Existing build, tests, docs checks, metadata check, bin smoke, pack dry-run, and verify release stay green.

### Iteration 64: Package Contents Contract

Goal:

Make the npm package artifact contract explicit, reviewable, and guarded before first publish.

Status:

Implemented in the MVP codebase.

Scope:

- Add `docs/PACKAGE_CONTENTS.md`.
- Document the shared manifest contract for `@bootlane/core` and `bootlane`.
- Document required packed files, package README content, dependencies, exports, and CLI bin entries.
- Extract shared package content expectations into `scripts/package-contracts.mjs`.
- Add `pnpm docs:check-package-contents`.
- Include package contents docs validation in CI, release verification, metadata validation, release notes, quality gates, contributor docs, and README links.
- Keep final `repository`, `homepage`, and `bugs` fields blocked until the real Bootlane repository URL is confirmed.

Acceptance:

- The package contents contract is visible from README, release notes, quality gates, and contributor docs.
- `pnpm docs:check-package-contents` fails if the package contents contract drifts from package manifests or pack dry-run expectations.
- `pnpm pack:dry-run` still validates the real npm dry-run output for both packages.
- Existing build, tests, docs checks, metadata check, bin smoke, pack dry-run, and verify release stay green.

### Iteration 65: First-Publish Release Evidence

Goal:

Make the manual and external first-publish evidence explicit so maintainers do not treat green local gates as publish approval.

Status:

Implemented in the MVP codebase.

Scope:

- Add `docs/RELEASE_EVIDENCE.md`.
- Document repository identity evidence, local gate evidence, networked release evidence, package dry-run evidence, npm account evidence, security/content evidence, publish evidence, and post-publish evidence.
- Preserve the rule that the final Bootlane repository URL must not be guessed from the current working tree.
- Add `pnpm docs:check-release-evidence`.
- Include release evidence docs validation in CI, release verification, metadata validation, release notes, release blockers, quality gates, contributor docs, GitHub Actions docs, technical stack docs, and README links.
- Keep evidence storage guidance clear about avoiding secrets, tokens, private contact addresses, and registry auth output in public comments.

Acceptance:

- The release evidence checklist is visible from README, release notes, release blockers, quality gates, tech stack, GitHub Actions docs, and contributor docs.
- `pnpm docs:check-release-evidence` fails if critical first-publish evidence categories, commands, or external-state warnings disappear.
- `pnpm verify:release` includes release evidence docs validation.
- Existing build, tests, docs checks, metadata check, bin smoke, pack dry-run, and verify release stay green.

### Iteration 66: Release Safety Guard

Goal:

Prevent accidental first-release publish drift while the final Bootlane repository URL, npm access, provenance expectations, and release automation are still unresolved.

Status:

Implemented in the MVP codebase.

Scope:

- Add `scripts/check-release-safety.mjs`.
- Add `pnpm release-safety:check`.
- Fail if root, `@bootlane/core`, or `bootlane` package manifests define `repository`, `homepage`, or `bugs` before the final Bootlane repository URL is confirmed.
- Fail if GitHub Actions workflows add release triggers, manual dispatch, npm publish commands, provenance setup, write permissions, or npm tokens before publish automation is intentionally designed.
- Include release safety validation in CI, release verification, metadata validation, release notes, release evidence, package contents docs, quality gates, contributor docs, technical stack docs, GitHub Actions docs, and README commands.

Acceptance:

- `pnpm release-safety:check` passes for the current manual-first-release posture.
- `pnpm release-safety:check` fails if package URL metadata or publish automation is added prematurely.
- `pnpm verify:release` includes release safety validation.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 67: CLI Exit Code Boundary

Goal:

Make the documented CLI exit code policy true in the packaged binary, especially for CI users who distinguish invalid usage from unexpected runtime failures.

Status:

Implemented in the MVP codebase.

Scope:

- Add a small CLI error classification boundary.
- Map invalid Bootlane option values, conflicting terminal modes, and commander parse errors to exit code `2`.
- Keep unexpected runtime errors mapped to exit code `3`.
- Preserve CI threshold failures as exit code `1`.
- Add unit coverage for usage/config error classification.
- Add built CLI smoke coverage for invalid `--format` and invalid `--fail-on` behavior.
- Refresh technical stack docs to describe the implemented error boundary.

Acceptance:

- `bootlane check --format xml` exits `2` with a clear supported-format message.
- `bootlane check --ci --fail-on fatal` exits `2` with a clear supported-severity message.
- `bootlane check --summary --verbose` is classified as invalid usage.
- `pnpm smoke:bin` validates invalid usage exit code behavior through the built CLI.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 68: Config Error Exit Code Boundary

Goal:

Complete the documented exit code policy by treating unreadable or invalid Bootlane config files as invalid config errors instead of unexpected runtime failures.

Status:

Implemented in the MVP codebase.

Scope:

- Wrap config read and parse failures in the CLI layer as usage/config errors.
- Preserve core `loadConfigFile` behavior for library consumers.
- Add CLI unit coverage for invalid config content and missing explicit config paths.
- Add built CLI smoke coverage for invalid config exit code behavior.
- Keep successful config loading and `--print-config` behavior unchanged.

Acceptance:

- `bootlane check --config missing.bootlane.config.json` exits `2` with a clear config read message.
- Invalid `bootlane.config.json` content is classified as exit code `2`.
- Normal fixture config loading still works.
- `pnpm smoke:bin` validates invalid config behavior through the built CLI.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 69: Target Path Exit Code Boundary

Goal:

Treat invalid `bootlane check [path]` targets as clear user errors so CI users can distinguish missing paths from unexpected runtime failures.

Status:

Implemented in the MVP codebase.

Scope:

- Validate the resolved target path in the CLI before running analysis.
- Classify missing target paths as exit code `2`.
- Classify non-directory target paths as exit code `2`.
- Preserve core analyzer behavior for library consumers.
- Add CLI unit coverage for missing and non-directory targets.
- Add built CLI smoke coverage for missing target path behavior.

Acceptance:

- `bootlane check ./missing-repo` exits `2` with a clear missing target message.
- `bootlane check ./some-file.txt` is classified as invalid usage.
- Normal fixture analysis remains unchanged.
- `pnpm smoke:bin` validates invalid target behavior through the built CLI.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 70: Output Path Exit Code Boundary

Goal:

Treat invalid `--output` destinations as clear user errors while preserving the guarantee that valid output files are written before CI exit thresholds are applied.

Status:

Implemented in the MVP codebase.

Scope:

- Wrap report file writes in the CLI layer.
- Classify missing output parent directories and directory-as-file outputs as exit code `2`.
- Preserve successful `--output` behavior and CI failure-path artifact writing.
- Add CLI unit coverage for invalid output destinations.
- Add built CLI smoke coverage for invalid output path behavior.

Acceptance:

- `bootlane check . --output missing-dir/report.md` exits `2` with a clear report write message.
- `bootlane check . --output existing-directory` is classified as invalid usage.
- Valid `--output` still writes reports before CI failure behavior.
- `pnpm smoke:bin` validates invalid output behavior through the built CLI.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 71: CLI Help and Default Command Smoke

Goal:

Make the first post-install CLI touchpoints stable: help output, `check --help`, and the documented default `bootlane` alias for `bootlane check .`.

Status:

Implemented in the MVP codebase.

Scope:

- Add commander-level tests for root help output.
- Add commander-level tests for `bootlane check --help`.
- Add commander-level tests for default check command parsing.
- Add built CLI smoke coverage for root help and check help.
- Add built CLI smoke coverage for the default check command alias.

Acceptance:

- `bootlane --help` prints root usage and description.
- `bootlane check --help` prints check usage and key options.
- `bootlane <path> --format json` runs the default check command.
- `pnpm smoke:bin` validates help output and default command behavior through the built CLI.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 72: Changelog Release Asset Guard

Goal:

Turn `CHANGELOG.md` into a guarded release asset instead of an unvalidated release note draft.

Status:

Implemented in the MVP codebase.

Scope:

- Add `pnpm docs:check-changelog`.
- Guard the `0.1.0 - Unreleased` changelog entry for current Node, Python, report, config, fix preview, CI, package, release-safety, evidence, exit-code, help, read-only, schema, and security scope notes.
- Include changelog validation in CI, package metadata validation, `pnpm verify:release`, quality gates, release notes, release evidence, contributor docs, GitHub Actions docs, technical stack docs, README commands, and PR checklist.
- Keep the changelog user-facing and aligned with the manual first-release posture.

Acceptance:

- `pnpm docs:check-changelog` fails if critical 0.1.0 release-candidate capabilities or boundaries disappear.
- `pnpm verify:release` includes changelog docs validation.
- README, contributing docs, release notes, release evidence, quality gates, GitHub Actions docs, and technical stack docs all document changelog validation.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 73: PR Template Gate Parity

Goal:

Keep the pull request checklist aligned with the current quality gates without turning publish-time external checks into ordinary CI requirements.

Status:

Implemented in the MVP codebase.

Scope:

- Split the PR template verification checklist into a Local/CI Gate section and a Release Readiness section.
- Keep the Local/CI Gate section aligned with the regular PR commands in `docs/QUALITY_GATES.md`.
- Keep `pnpm verify:release`, `pnpm npm-names:check`, and `pnpm smoke:packed-install` visible as release-readiness checks for applicable PRs.
- Preserve first-publish safeguards for release evidence, final repository URL metadata, publish automation, npm tokens, write permissions, and provenance settings.
- Strengthen `pnpm docs:check-templates` so the PR template cannot silently lose key gates, release-readiness boundaries, or contract reminders.

Acceptance:

- The PR template clearly separates normal local/CI checks from release-readiness and external publish-time checks.
- `pnpm docs:check-templates` fails if required PR template sections, commands, or first-publish safeguards disappear.
- Contributor and quality gate docs describe the PR template parity model.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 74: Release Evidence Template Starter

Goal:

Make first-publish evidence collection directly fillable instead of relying on maintainers to translate narrative checklist items into a release issue by hand.

Status:

Implemented in the MVP codebase.

Scope:

- Add an Evidence Record Header for release version, evidence location, owner, date range, commit or tree state, and overall status.
- Convert repository, local gate, networked release, package dry-run, npm account, security/content, publish, and post-publish evidence into fillable tables.
- Preserve explicit warnings that green local gates are not publish approval and that final repository URL, npm access, npm registry state, security contact, and post-publish behavior require human or external confirmation.
- Strengthen `pnpm docs:check-release-evidence` so key fillable fields, package dry-run records, tarball residue checks, npm package page checks, and GitHub tag/release checks cannot disappear silently.
- Link the Evidence Record Header flow from release notes, quality gates, and contributing docs.

Acceptance:

- `docs/RELEASE_EVIDENCE.md` can be copied into a release issue, release PR, or release draft and filled without inventing extra table structure.
- `pnpm docs:check-release-evidence` fails if the evidence header, fillable fields, command records, or post-publish checks disappear.
- Release, quality gate, and contributor docs tell maintainers when to fill the Evidence Record Header.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 75: Release Evidence Snapshot Generator

Goal:

Reduce first-publish evidence busywork by generating a deterministic copy-paste draft from the current package metadata and gate list.

Status:

Implemented in the MVP codebase.

Scope:

- Add `scripts/generate-release-evidence-snapshot.mjs`.
- Add `pnpm release:evidence` to regenerate `docs/RELEASE_EVIDENCE_SNAPSHOT.md`.
- Add `pnpm release:evidence:check` to fail when the committed evidence snapshot drifts.
- Include release evidence snapshot validation in CI, package metadata validation, quality gates, release notes, contributor docs, GitHub Actions docs, technical stack docs, PR checklist, and `pnpm verify:release`.
- Keep the generator deterministic and read-only with respect to release commands; it must not run local gates, networked checks, npm dry-runs, publish commands, or post-publish `npx` checks.

Acceptance:

- `docs/RELEASE_EVIDENCE_SNAPSHOT.md` gives maintainers a copy-paste starting point with package metadata, local gate commands, external/manual checks, content reviews, and fill order.
- `pnpm release:evidence:check` fails if the snapshot is stale.
- `pnpm verify:release` includes release evidence snapshot validation.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 76: Release Gate Source of Truth Refactor

Goal:

Reduce release gate drift by keeping gate commands, verify execution metadata, release evidence snapshot rows, and PR checklist validation aligned from one local contract.

Status:

Implemented in the MVP codebase.

Scope:

- Add `scripts/release-gate-contracts.mjs`.
- Move `pnpm verify:release` stage metadata into the shared contract.
- Make `pnpm release:evidence` generate local gate, external/manual, and content-review rows from the shared contract.
- Make quality gate docs validation, release evidence docs validation, and PR template validation read command expectations from the shared contract.
- Preserve manual and external release checks outside regular CI and outside the snapshot generator's execution path.

Acceptance:

- `pnpm verify:release` still runs the same stages in the same order.
- `pnpm release:evidence:check` still fails when the evidence snapshot drifts.
- Docs checks fail if quality gate, release evidence, or PR template command lists drift from the shared contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 77: Release Gate Contract Self-Check

Goal:

Give the shared release gate contract its own focused guard so future release gate edits fail early when package scripts, CI, verify execution, snapshot generation, or docs checks drift.

Status:

Implemented in the MVP codebase.

Scope:

- Add `scripts/check-release-gate-contracts.mjs`.
- Add `pnpm release:gates:check`.
- Include release gate contract validation in CI, package metadata validation, PR checklist, quality gates, release evidence, release notes, technical stack docs, and `pnpm verify:release`.
- Validate release gate IDs, commands, labels, quality stages, run specs, package script references, CI workflow commands, `verify:release` contract usage, snapshot generator contract usage, and docs check contract imports.
- Keep the self-check lightweight and read-only; it must not execute local gates, networked checks, npm dry-runs, publish commands, or post-publish `npx` checks.

Acceptance:

- `pnpm release:gates:check` passes for the current contract and fails if contract metadata loses package script, CI, verify, snapshot, or docs-check alignment.
- `pnpm verify:release` includes release gate contract validation.
- Quality gates, release evidence, PR template, release notes, contributor docs, and technical stack docs document the self-check.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 78: CI Workflow Contract Check

Goal:

Keep `.github/workflows/ci.yml` aligned with Bootlane's release gate contract, read-only security posture, and Node compatibility target.

Status:

Implemented in the MVP codebase.

Scope:

- Add `scripts/check-ci-workflow-contract.mjs`.
- Add `pnpm ci:workflow:check`.
- Include CI workflow contract validation in CI, package metadata validation, PR checklist, quality gates, release evidence, release notes, GitHub Actions docs, technical stack docs, and `pnpm verify:release`.
- Validate workflow triggers, `contents: read` permissions, absence of publish/write-token behavior, Node 22/24 matrix, pnpm setup version, dependency install command, and release gate command order.
- Use `scripts/release-gate-contracts.mjs` as the command-order source of truth.

Acceptance:

- `pnpm ci:workflow:check` passes for the current workflow and fails if commands, permissions, matrix, setup, or publish-safety boundaries drift.
- `pnpm verify:release` includes CI workflow contract validation.
- CI still runs every local release gate in the same order as the release gate contract after `pnpm install --frozen-lockfile`.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 79: Release Safety Fixture Checks

Goal:

Prove the release safety guard catches the first-publish drift it is meant to block, not just that the current repository happens to pass.

Status:

Implemented in the MVP codebase.

Scope:

- Refactor `scripts/check-release-safety.mjs` so its core check can run against a supplied root directory.
- Add `scripts/check-release-safety-fixtures.mjs`.
- Add `pnpm release-safety:fixtures`.
- Exercise a clean minimal release-safety fixture plus negative cases for root `repository`, core `homepage`, CLI `bugs`, release workflow triggers, manual workflow dispatch, npm publish commands, id-token write permissions, contents write permissions, npm token references, and npm provenance drift.
- Include release safety fixture validation in CI, package metadata validation, PR checklist, quality gates, release evidence, release notes, GitHub Actions docs, technical stack docs, and `pnpm verify:release`.

Acceptance:

- `pnpm release-safety:fixtures` passes for the clean fixture and fails each negative fixture with the expected release safety error.
- `pnpm verify:release` includes release safety fixture validation.
- Release docs make clear that release safety blocks package URL metadata and publish automation until the final repository URL and release automation are intentionally confirmed.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 80: Release Safety Fixture Matrix Docs

Goal:

Make each release safety fixture case reviewable as documentation, and keep the matrix synchronized with the executable fixture metadata.

Status:

Implemented in the MVP codebase.

Scope:

- Add `docs/RELEASE_SAFETY_FIXTURES.md`.
- Export clean and negative fixture metadata from `scripts/check-release-safety-fixtures.mjs` while preserving direct CLI execution.
- Add `scripts/check-release-safety-fixtures-doc.mjs`.
- Add `pnpm docs:check-release-safety-fixtures`.
- Include release safety fixture docs validation in CI, package metadata validation, PR checklist, quality gates, release evidence, release notes, GitHub Actions docs, technical stack docs, changelog notes, and `pnpm verify:release`.

Acceptance:

- `docs/RELEASE_SAFETY_FIXTURES.md` documents the clean fixture, all 10 negative fixture cases, their coverage, and their expected failure substrings.
- `pnpm docs:check-release-safety-fixtures` fails if the documentation drifts from the fixture metadata.
- `pnpm verify:release` includes release safety fixture docs validation.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 81: Release Evidence Entry Format Contract

Goal:

Reduce first-publish evidence ambiguity by giving release evidence records a shared status and field format that is used by the checklist, generated snapshot, and validation scripts.

Status:

Implemented in the MVP codebase.

Scope:

- Add evidence status values and entry-field rules to `scripts/release-gate-contracts.mjs`.
- Update `docs/RELEASE_EVIDENCE.md` with an Evidence Entry Format section.
- Update `scripts/generate-release-evidence-snapshot.mjs` so generated evidence drafts include the same status values and field rules.
- Update `scripts/check-release-evidence-doc.mjs` to validate the checklist and snapshot against the shared format contract.
- Update `scripts/check-release-gate-contracts.mjs` to ensure evidence format metadata is non-empty, unique, and used by the snapshot generator and release evidence docs check.
- Mention the Evidence Entry Format in contributor, release, quality gate, technical stack, changelog, and planning docs.

Acceptance:

- `docs/RELEASE_EVIDENCE.md` documents status values and rules for Status, Date/operator, Output summary, Required record, and Evidence link.
- `docs/RELEASE_EVIDENCE_SNAPSHOT.md` includes the same status values and entry-field rules.
- `pnpm docs:check-release-evidence` fails if the checklist or snapshot drifts from the shared evidence entry format.
- `pnpm release:gates:check` fails if the snapshot generator or release evidence docs check stops using the shared evidence format contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 82: Release Evidence Redaction Examples

Goal:

Make first-publish evidence safe to copy into public release records by documenting concrete examples of what can be recorded and what must stay private.

Status:

Implemented in the MVP codebase.

Scope:

- Add release evidence redaction examples to `scripts/release-gate-contracts.mjs`.
- Cover npm auth checks, npm registry checks, CI/local command logs, security contact review, and secret or scanner findings.
- Update `docs/RELEASE_EVIDENCE.md` with an Evidence Redaction Examples matrix.
- Update `scripts/generate-release-evidence-snapshot.mjs` so generated evidence drafts include the redaction matrix.
- Update `scripts/check-release-evidence-doc.mjs` and `scripts/check-release-gate-contracts.mjs` so checklist, snapshot, generator, and docs validation share the redaction examples.
- Link the release evidence redaction examples from `SECURITY.md`, contributor docs, release notes, quality gates, technical stack docs, changelog notes, and this plan.

Acceptance:

- `docs/RELEASE_EVIDENCE.md` documents safe-to-record, do-not-paste, and handling guidance for all redaction example areas.
- `docs/RELEASE_EVIDENCE_SNAPSHOT.md` includes the same redaction examples.
- `pnpm docs:check-release-evidence` fails if the checklist or snapshot loses any redaction example.
- `pnpm release:gates:check` fails if the snapshot generator or release evidence docs check stops using the shared redaction examples.
- Security docs point maintainers to the release evidence redaction examples before copying npm auth checks, CI logs, security contact notes, or scanner output into public release records.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 83: Release Evidence Dry-Run Transcript Template

Goal:

Make package dry-run, packed install smoke, tarball residue, and publish order evidence easy to summarize consistently without copying noisy package listings or auth-sensitive output.

Status:

Implemented in the MVP codebase.

Scope:

- Add dry-run transcript fields to `scripts/release-gate-contracts.mjs`.
- Cover exact command, package or check, version, file count and package size, required artifacts, tarball residue, packed install target, installed CLI result, publish order, and evidence link.
- Update `docs/RELEASE_EVIDENCE.md` with a Dry-Run Transcript Template under Package Dry-Run Evidence.
- Update `scripts/generate-release-evidence-snapshot.mjs` so generated evidence drafts include the same dry-run transcript template.
- Update `scripts/check-release-evidence-doc.mjs` and `scripts/check-release-gate-contracts.mjs` so checklist, snapshot, generator, and docs validation share the transcript fields.
- Mention the Dry-Run Transcript Template in contributor docs, release notes, quality gates, technical stack docs, changelog notes, and this plan.

Acceptance:

- `docs/RELEASE_EVIDENCE.md` documents transcript fields for `pnpm pack:dry-run`, package-level `npm publish --dry-run --access public`, and `pnpm smoke:packed-install`.
- `docs/RELEASE_EVIDENCE_SNAPSHOT.md` includes the same transcript fields.
- `pnpm docs:check-release-evidence` fails if the checklist or snapshot loses any transcript field.
- `pnpm release:gates:check` fails if the snapshot generator or release evidence docs check stops using the shared transcript fields.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 84: Release Evidence Manual Decision Log

Goal:

Make the final first-publish decision explicit by recording whether maintainers should proceed, pause, or treat the release as blocked based on manual and external evidence.

Status:

Implemented in the MVP codebase.

Scope:

- Add manual decision log fields to `scripts/release-gate-contracts.mjs`.
- Add manual decision checklist items for final repository identity, npm identity and access, security contact readiness, package artifact readiness, packed install readiness, package page readiness, and post-publish readiness.
- Update `docs/RELEASE_EVIDENCE.md` with a Manual Decision Log section.
- Update `scripts/generate-release-evidence-snapshot.mjs` so generated evidence drafts include the same decision fields and checklist.
- Update `scripts/check-release-evidence-doc.mjs` and `scripts/check-release-gate-contracts.mjs` so checklist, snapshot, generator, and docs validation share the decision log contract.
- Mention the Manual Decision Log in contributor docs, release notes, quality gates, technical stack docs, changelog notes, and this plan.

Acceptance:

- `docs/RELEASE_EVIDENCE.md` documents the manual decision fields and checklist.
- `docs/RELEASE_EVIDENCE_SNAPSHOT.md` includes the same manual decision fields and checklist.
- `pnpm docs:check-release-evidence` fails if the checklist or snapshot loses any manual decision field or checklist item.
- `pnpm release:gates:check` fails if the snapshot generator or release evidence docs check stops using the shared manual decision contract.
- Release-readiness docs make clear that a green local gate is not enough to set the decision to `Proceed`.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 85: Release Evidence Staleness Rules

Goal:

Prevent first-publish decisions from relying on evidence that became stale after release files, package outputs, registry state, or manual checks changed.

Status:

Implemented in the MVP codebase.

Scope:

- Add release evidence staleness rules to `scripts/release-gate-contracts.mjs`.
- Cover local release gates, npm package name availability, package dry-runs, packed install smoke, security contact readiness, manual decision logs, npm package page review, and post-publish `npx` checks.
- Update `docs/RELEASE_EVIDENCE.md` with an Evidence Staleness Rules section.
- Update `scripts/generate-release-evidence-snapshot.mjs` so generated evidence drafts include the same staleness matrix.
- Update `scripts/check-release-evidence-doc.mjs` and `scripts/check-release-gate-contracts.mjs` so checklist, snapshot, generator, and docs validation share the staleness rules.
- Mention the Evidence Staleness Rules in contributor docs, release notes, quality gates, technical stack docs, changelog notes, and this plan.

Acceptance:

- `docs/RELEASE_EVIDENCE.md` documents stale conditions and re-run or re-review actions for each evidence type.
- `docs/RELEASE_EVIDENCE_SNAPSHOT.md` includes the same staleness rules.
- `pnpm docs:check-release-evidence` fails if the checklist or snapshot loses any staleness rule.
- `pnpm release:gates:check` fails if the snapshot generator or release evidence docs check stops using the shared staleness contract.
- Release-readiness docs tell maintainers to re-run or re-review stale evidence before setting the Manual Decision Log to `Proceed`.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 86: Release Publish Window Checklist

Goal:

Make the final first-publish window executable as a short ordered checklist, so maintainers do not have to reconcile scattered release notes, evidence tables, publish order, stale-evidence review, and post-publish checks under time pressure.

Status:

Implemented in the MVP codebase.

Scope:

- Add a publish-window checklist to `scripts/release-gate-contracts.mjs`.
- Cover opening the evidence record, confirming external identity, running the local release gate, refreshing publish-window checks, recording the final decision, publishing packages in dependency order, verifying published packages, and closing the release record.
- Update `docs/RELEASE_EVIDENCE.md` with a Publish Window Checklist section.
- Update `scripts/generate-release-evidence-snapshot.mjs` so generated evidence drafts include the same publish-window checklist.
- Update `scripts/check-release-evidence-doc.mjs` and `scripts/check-release-gate-contracts.mjs` so checklist, snapshot, generator, and docs validation share the publish-window contract.
- Mention the Publish Window Checklist in contributor docs, release notes, quality gates, technical stack docs, changelog notes, and this plan.

Acceptance:

- `docs/RELEASE_EVIDENCE.md` documents the ordered publish-window phases, actions, and required evidence.
- `docs/RELEASE_EVIDENCE_SNAPSHOT.md` includes the same publish-window checklist.
- `pnpm docs:check-release-evidence` fails if the checklist or snapshot loses any publish-window phase, action, or required evidence.
- `pnpm release:gates:check` fails if the snapshot generator or release evidence docs check stops using the shared publish-window checklist.
- Release-readiness docs make clear that packages are not published until the Manual Decision Log is set to `Proceed`.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 87: Release Readiness Issue Form

Goal:

Make the first-publish evidence record easy to open from GitHub without maintainers inventing the issue shape, omitting required evidence fields, copying secrets, or treating a green local gate as publish approval.

Status:

Implemented in the MVP codebase.

Scope:

- Add `.github/ISSUE_TEMPLATE/release-readiness.yml`.
- Collect release version, evidence owner, commit or tree state, generated release evidence snapshot, local gate evidence, external/manual evidence, publish-window readiness, Manual Decision Log status, publish evidence, and post-publish evidence.
- Keep secret-redaction, no-publish-automation, no-token, no-write-permission, and no-provenance boundaries visible in the form.
- Update `scripts/check-github-templates.mjs` so `pnpm docs:check-templates` guards the release readiness issue form.
- Link the release readiness issue form from release notes, release evidence, quality gates, contributor docs, changelog notes, and this plan.

Acceptance:

- `.github/ISSUE_TEMPLATE/release-readiness.yml` gives maintainers a first-publish evidence issue shape that references the generated release evidence snapshot and key release evidence sections.
- `pnpm docs:check-templates` fails if the release readiness issue form loses critical evidence fields, release commands, post-publish checks, or first-publish safety boundaries.
- Release notes and release evidence docs tell maintainers to open the release readiness issue form before filling the evidence record.
- Quality gate and contributor docs include the form as part of the release workflow surface.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 88: Release External State Confirmations

Goal:

Centralize first-publish facts that normal CI cannot prove, so final repository identity, npm registry/account state, security contact readiness, package page rendering, and published CLI behavior have explicit confirmation and blocking rules.

Status:

Implemented in the MVP codebase.

Scope:

- Add external state confirmations to `scripts/release-gate-contracts.mjs`.
- Cover final Bootlane repository URL, package URL metadata timing, npm package name availability, npm account and scoped access, security contact readiness, release tag and GitHub release target, npm package page rendering, and published CLI resolution.
- Update `docs/RELEASE_EVIDENCE.md` with an External State Confirmations section.
- Update `scripts/generate-release-evidence-snapshot.mjs` so generated evidence drafts include the same external-state matrix.
- Update `scripts/check-release-evidence-doc.mjs` and `scripts/check-release-gate-contracts.mjs` so checklist, snapshot, generator, and docs validation share the external-state contract.
- Mention External State Confirmations in contributor docs, release notes, quality gates, release blockers, technical stack docs, changelog notes, the release readiness issue form, and this plan.

Acceptance:

- `docs/RELEASE_EVIDENCE.md` documents each external fact, how to confirm it, required evidence, and the condition that blocks publishing.
- `docs/RELEASE_EVIDENCE_SNAPSHOT.md` includes the same external-state confirmation matrix.
- `pnpm docs:check-release-evidence` fails if the checklist or snapshot loses any external-state fact, confirmation method, evidence requirement, or blocker.
- `pnpm release:gates:check` fails if the snapshot generator or release evidence docs check stops using the shared external-state contract.
- Release-readiness docs make clear that the Manual Decision Log cannot be set to `Proceed` until these external facts are current and confirmed.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 89: Post-Publish Verification Transcript

Goal:

Make post-publish evidence as structured as package dry-run evidence, so maintainers record published CLI checks, npm package page reviews, and GitHub tag or release confirmation consistently after the first publish.

Status:

Implemented in the MVP codebase.

Scope:

- Add post-publish verification fields to `scripts/release-gate-contracts.mjs`.
- Cover verification item, command or URL, observed version or target, expected result, output summary, date/operator, evidence link, and follow-up if not confirmed.
- Update `docs/RELEASE_EVIDENCE.md` with a Post-Publish Verification Transcript section.
- Update `scripts/generate-release-evidence-snapshot.mjs` so generated evidence drafts include the same post-publish transcript template.
- Update `scripts/check-release-evidence-doc.mjs` and `scripts/check-release-gate-contracts.mjs` so checklist, snapshot, generator, and docs validation share the post-publish transcript contract.
- Mention the Post-Publish Verification Transcript in contributor docs, release notes, quality gates, technical stack docs, changelog notes, the release readiness issue form, and this plan.

Acceptance:

- `docs/RELEASE_EVIDENCE.md` documents the post-publish transcript fields for `npx bootlane@latest` checks, npm package page review, and GitHub tag or release confirmation.
- `docs/RELEASE_EVIDENCE_SNAPSHOT.md` includes the same post-publish transcript fields.
- `pnpm docs:check-release-evidence` fails if the checklist or snapshot loses any post-publish transcript field, scope, or record rule.
- `pnpm release:gates:check` fails if the snapshot generator or release evidence docs check stops using the shared post-publish transcript contract.
- Release-readiness docs make clear that failed or stale post-publish checks keep the record in `Pause` or `Blocked` until reconfirmed.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 90: Release Evidence Maintainer Execution Path

Goal:

Turn the first-publish evidence templates into one maintainer-facing execution path, so the release readiness issue form, generated evidence snapshot, release notes, and evidence checklist lead maintainers through the same ordered flow.

Status:

Implemented in the MVP codebase.

Scope:

- Add release evidence maintainer execution steps to `scripts/release-gate-contracts.mjs`.
- Cover opening the release evidence issue, generating the evidence snapshot, filling the evidence baseline, running the local release gate, confirming external state, refreshing publish-window checks, recording the manual decision, publishing packages, verifying post-publish behavior, and closing the release record.
- Update `docs/RELEASE_EVIDENCE.md` with a Maintainer Execution Path section.
- Update `scripts/generate-release-evidence-snapshot.mjs` so generated evidence drafts include the same maintainer path and stop carrying a separate hand-written fill order.
- Update `scripts/check-release-evidence-doc.mjs` and `scripts/check-release-gate-contracts.mjs` so checklist, snapshot, generator, and docs validation share the maintainer path contract.
- Mention the Maintainer Execution Path in contributor docs, release notes, quality gates, technical stack docs, changelog notes, the release readiness issue form, and this plan.

Acceptance:

- `docs/RELEASE_EVIDENCE.md` documents each maintainer path step, action, and record expectation.
- `docs/RELEASE_EVIDENCE_SNAPSHOT.md` includes the same maintainer execution path.
- `pnpm docs:check-release-evidence` fails if the checklist or snapshot loses any maintainer path step, action, or record expectation.
- `pnpm release:gates:check` fails if the snapshot generator or release evidence docs check stops using the shared maintainer path contract.
- Release-readiness docs and issue form point maintainers to the same execution path before they collect evidence or publish packages.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 91: Release Evidence Section Guide

Goal:

Reduce first-publish evidence document sprawl by giving maintainers a compact guide for which evidence section to use, when to use it, and where to record the result.

Status:

Implemented in the MVP codebase.

Scope:

- Add release evidence section guide entries to `scripts/release-gate-contracts.mjs`.
- Cover the maintainer execution path, evidence record header, evidence formatting and redaction, manual decision log, staleness rules, external state confirmations, local gate evidence, networked and dry-run evidence, publish evidence, and post-publish evidence.
- Update `docs/RELEASE_EVIDENCE.md` with an Evidence Section Guide section.
- Update `scripts/generate-release-evidence-snapshot.mjs` so generated evidence drafts include the same section guide.
- Update `scripts/check-release-evidence-doc.mjs` and `scripts/check-release-gate-contracts.mjs` so checklist, snapshot, generator, and docs validation share the section guide contract.
- Mention the Evidence Section Guide in contributor docs, release notes, quality gates, technical stack docs, changelog notes, the release readiness issue form, and this plan.

Acceptance:

- `docs/RELEASE_EVIDENCE.md` documents each section guide entry, when maintainers should use it, and where they should record results.
- `docs/RELEASE_EVIDENCE_SNAPSHOT.md` includes the same section guide.
- `pnpm docs:check-release-evidence` fails if the checklist or snapshot loses any section guide entry, use case, or record target.
- `pnpm release:gates:check` fails if the snapshot generator or release evidence docs check stops using the shared section guide contract.
- Release-readiness docs and issue form point maintainers to the section guide before evidence collection starts.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 92: Release Evidence Snapshot Focus Policy

Goal:

Keep the generated first-publish evidence snapshot practical to paste by limiting it to fillable draft evidence and linking long reference guidance back to the full release evidence checklist.

Status:

Implemented in the MVP codebase.

Scope:

- Add snapshot focus policy and snapshot reference guide entries to `scripts/release-gate-contracts.mjs`.
- Update `scripts/generate-release-evidence-snapshot.mjs` so the snapshot includes Snapshot Focus Policy and Snapshot Reference Guide sections instead of duplicating long reference matrices.
- Keep the full maintainer path, section guide, status values, entry format, redaction examples, staleness rules, publish-window checklist, external confirmations, dry-run transcript, and post-publish transcript in `docs/RELEASE_EVIDENCE.md`.
- Update `scripts/check-release-evidence-doc.mjs` so the full checklist is guarded in `docs/RELEASE_EVIDENCE.md`, while `docs/RELEASE_EVIDENCE_SNAPSHOT.md` is guarded as a compact draft under 180 lines.
- Update `scripts/check-release-gate-contracts.mjs` so generator and docs checks use the shared snapshot focus and reference contracts.
- Mention the Snapshot Focus Policy and Snapshot Reference Guide in release notes, quality gates, contributor docs, technical stack docs, changelog notes, the release readiness issue form, and this plan.

Acceptance:

- `docs/RELEASE_EVIDENCE.md` documents each snapshot focus principle and reference guide entry.
- `docs/RELEASE_EVIDENCE_SNAPSHOT.md` includes the Snapshot Focus Policy, Snapshot Reference Guide, fillable evidence drafts, local gate commands, external/manual checks, package metadata, and content review rows.
- `docs/RELEASE_EVIDENCE_SNAPSHOT.md` stays under 180 lines after `pnpm release:evidence`.
- `pnpm docs:check-release-evidence` fails if the full checklist loses required reference guidance or the snapshot regrows long copied matrices.
- `pnpm release:gates:check` fails if the snapshot generator or release evidence docs check stops using the shared snapshot focus contract.
- Release-readiness docs make clear that the generated snapshot is a compact starting point and the full guidance remains in [Release Evidence](RELEASE_EVIDENCE.md).
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 93: Release Evidence Snapshot Refresh Rules

Goal:

Prevent maintainers from reusing a stale generated evidence snapshot after package metadata, release gates, workflows, evidence contracts, or final publish tree state changes.

Status:

Implemented in the MVP codebase.

Scope:

- Add snapshot refresh rules to `scripts/release-gate-contracts.mjs`.
- Cover package metadata changes, release gate contract changes, release evidence contract changes, final publish tree selection, and snapshots copied before final checks.
- Update `scripts/generate-release-evidence-snapshot.mjs` so the generated evidence draft includes the same Snapshot Refresh Rules.
- Update `docs/RELEASE_EVIDENCE.md` with a Snapshot Refresh Rules section.
- Update `scripts/check-release-evidence-doc.mjs`, `scripts/check-release-gate-contracts.mjs`, and `scripts/check-github-templates.mjs` so docs, snapshot, issue form, and generator validation share the refresh rules.
- Mention Snapshot Refresh Rules in release notes, quality gates, contributor docs, technical stack docs, changelog notes, the release readiness issue form, PR template, and this plan.

Acceptance:

- `docs/RELEASE_EVIDENCE.md` documents each snapshot refresh trigger, maintainer action, and required evidence.
- `docs/RELEASE_EVIDENCE_SNAPSHOT.md` includes the Snapshot Refresh Rules without exceeding the 180-line snapshot budget.
- `pnpm docs:check-release-evidence` fails if release evidence docs, release notes, quality gates, contributor docs, or the generated snapshot lose the refresh rules.
- `pnpm release:gates:check` fails if the snapshot generator or release evidence docs check stops using the shared snapshot refresh contract.
- `pnpm docs:check-templates` fails if the release readiness issue form stops reminding maintainers to refresh stale snapshots.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 94: Release Evidence Closeout Checklist

Goal:

Make the end of the first-publish evidence record explicit, so maintainers close the release with final status, package confirmation, tag or release links, unresolved follow-ups, and announcement readiness instead of leaving those facts scattered across comments.

Status:

Implemented in the MVP codebase.

Scope:

- Add release closeout checklist items to `scripts/release-gate-contracts.mjs`.
- Cover final release status, published package confirmation, GitHub tag or release link, unresolved follow-ups, and public announcement readiness.
- Update `docs/RELEASE_EVIDENCE.md` with a Release Closeout Checklist section and link it from the evidence section guide and snapshot reference guide.
- Update `scripts/generate-release-evidence-snapshot.mjs` so generated evidence drafts include a Release Closeout Draft.
- Update `scripts/check-release-evidence-doc.mjs`, `scripts/check-release-gate-contracts.mjs`, and `scripts/check-github-templates.mjs` so docs, snapshot, generator, and release readiness issue form validation share the closeout contract.
- Mention the Release Closeout Checklist in release notes, quality gates, contributor docs, technical stack docs, changelog notes, the release readiness issue form, PR template, and this plan.

Acceptance:

- `docs/RELEASE_EVIDENCE.md` documents each release closeout item, required evidence, and closeout action.
- `docs/RELEASE_EVIDENCE_SNAPSHOT.md` includes a Release Closeout Draft without exceeding the 180-line snapshot budget.
- `.github/ISSUE_TEMPLATE/release-readiness.yml` gives maintainers a dedicated Release closeout field.
- `pnpm docs:check-release-evidence` fails if release evidence docs, release notes, quality gates, contributor docs, or the generated snapshot lose the closeout checklist.
- `pnpm release:gates:check` fails if the snapshot generator or release evidence docs check stops using the shared closeout contract.
- `pnpm docs:check-templates` fails if the release readiness issue form stops collecting release closeout evidence.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 95: Launch Announcement Readiness Gate

Goal:

Connect release closeout evidence to broad public sharing, so maintainers do not announce until package pages, published CLI checks, announcement copy, feedback intake, and final release evidence are ready.

Status:

Implemented in the MVP codebase.

Scope:

- Add launch announcement readiness items to `scripts/release-gate-contracts.mjs`.
- Cover release closeout completion, published install path verification, package and release page readiness, public message review, and feedback intake readiness.
- Update `docs/LAUNCH.md` with an Announcement Readiness Gate section.
- Update the Release Closeout Checklist public announcement readiness item to reference the Announcement Readiness Gate.
- Update `scripts/check-release-blockers-doc.mjs` and `scripts/check-release-gate-contracts.mjs` so launch docs and shared contracts stay synchronized.
- Mention the Announcement Readiness Gate in release notes, contributor docs, technical stack docs, changelog notes, and this plan.

Acceptance:

- `docs/LAUNCH.md` documents each announcement readiness item, required pre-announcement condition, and record location.
- `docs/RELEASE.md` directs maintainers to complete the Announcement Readiness Gate before broad announcement.
- `docs/RELEASE_EVIDENCE.md` connects public announcement readiness in the Release Closeout Checklist to the Announcement Readiness Gate.
- `pnpm docs:check-release-blockers` fails if launch docs or release notes lose the Announcement Readiness Gate.
- `pnpm release:gates:check` fails if the launch docs check stops using the shared announcement readiness contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 96: Post-Launch Feedback Closure Matrix

Goal:

Make the first feedback cycle after launch executable by routing every report toward a fixture-backed fix, docs update, roadmap candidate, release evidence update, or launch follow-up with clear closure criteria.

Status:

Implemented in the MVP codebase.

Scope:

- Add post-launch feedback closure routes to `scripts/triage-contracts.mjs`.
- Cover false positives, missing detections, docs confusion, feature requests, and release or launch blockers.
- Update `docs/TRIAGE.md` with a Post-Launch Feedback Closure Matrix section.
- Update `docs/LAUNCH.md` so post-launch triage points maintainers to the closure matrix.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-github-templates.mjs`, and `scripts/check-release-gate-contracts.mjs` so triage docs, launch docs, templates, and gate contracts stay synchronized.
- Mention the closure matrix in contributor docs, technical stack docs, changelog notes, and this plan.

Acceptance:

- `docs/TRIAGE.md` documents each feedback route, first action, required artifact, and close condition.
- `docs/LAUNCH.md` points post-launch triage to the Post-Launch Feedback Closure Matrix.
- `pnpm docs:check-triage` fails if the closure matrix loses any shared route or closure condition.
- `pnpm docs:check-release-blockers` and `pnpm docs:check-templates` fail if launch or template-adjacent docs stop linking the closure matrix.
- `pnpm release:gates:check` fails if the triage docs check stops using the shared triage contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 97: Roadmap Candidate Review

Goal:

Turn broad post-launch feature requests into an explicit review workflow, so maintainers can separate small deterministic checks from integrations, ecosystem expansion, write-capable flows, and out-of-scope ideas before planning.

Status:

Implemented in the MVP codebase.

Scope:

- Add roadmap candidate review categories to `scripts/triage-contracts.mjs`.
- Cover small deterministic checks, integration or output workflows, new ecosystem expansion, write-capable flows, and out-of-scope requests.
- Update `docs/TRIAGE.md` with a Roadmap Candidate Review section that documents category, review question, required evidence, and next action.
- Update the feature-request issue form so incoming requests capture the roadmap category and supporting evidence.
- Update `docs/LAUNCH.md` so post-launch triage points maintainers to the Roadmap Candidate Review before parking broad feature requests.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so triage docs, launch docs, issue templates, and gate contracts stay synchronized.
- Mention the review checklist in contributor docs, technical stack docs, changelog notes, and this plan.

Acceptance:

- `docs/TRIAGE.md` documents each roadmap category, review question, required evidence, and next action.
- `.github/ISSUE_TEMPLATE/feature-request.yml` includes each roadmap category and collects roadmap evidence.
- `docs/LAUNCH.md` points broad post-launch feature requests to the Roadmap Candidate Review.
- `pnpm docs:check-triage` fails if the Roadmap Candidate Review loses any shared category or evidence requirement.
- `pnpm docs:check-templates` fails if the feature-request issue form loses roadmap categories or roadmap evidence collection.
- `pnpm docs:check-release-blockers` fails if launch or triage docs stop mentioning the Roadmap Candidate Review.
- `pnpm release:gates:check` fails if triage or template docs checks stop using the shared roadmap review contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 98: Roadmap Candidate Backlog

Goal:

Give parked feature requests a maintained backlog, so roadmap candidates have a target, evidence status, required evidence, review trigger, and next action before they become release work.

Status:

Implemented in the MVP codebase.

Scope:

- Add roadmap candidate backlog statuses and candidate entries to `scripts/triage-contracts.mjs`.
- Add `docs/ROADMAP.md` as the candidate backlog and explicitly state that it is not a release promise.
- Cover real-world accuracy fixtures, env var scanning precision, GitHub integration improvements, safe write-capable fix flow, new ecosystem support, and cloud dashboard or telemetry requests.
- Update `docs/TRIAGE.md` so broad feature requests are parked in the Roadmap with category, evidence status, target, review trigger, and next action.
- Update `docs/LAUNCH.md`, `README.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, `docs/QUALITY_GATES.md`, and `CHANGELOG.md` so maintainers can find and maintain the backlog.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-quality-gates-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so the backlog stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each backlog status and each candidate entry from `scripts/triage-contracts.mjs`.
- Every roadmap candidate uses a known Roadmap Candidate Review category and a known evidence status.
- `docs/ROADMAP.md` preserves the 0.1.0 release-candidate boundary by stating candidates are not release promises.
- `docs/TRIAGE.md` and `docs/LAUNCH.md` point broad feature requests to the Roadmap after Roadmap Candidate Review.
- `README.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `docs/QUALITY_GATES.md` expose the Roadmap as a maintained planning document.
- `pnpm docs:check-triage` fails if backlog statuses, candidates, targets, required evidence, review triggers, or next actions drift from the shared triage contract.
- `pnpm docs:check-templates`, `pnpm docs:check-release-blockers`, `pnpm docs:check-quality-gates`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if the Roadmap loses key entry points or release-candidate boundaries.
- `pnpm release:gates:check` fails if the triage docs check stops using the shared roadmap backlog contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 99: Roadmap Review Cadence

Goal:

Make roadmap candidate maintenance active instead of passive by defining when maintainers review candidates and how evidence status changes are promoted, downgraded, deferred, or closed.

Status:

Implemented in the MVP codebase.

Scope:

- Add roadmap review cadence entries to `scripts/triage-contracts.mjs`.
- Add roadmap evidence status transition rules to `scripts/triage-contracts.mjs`.
- Cover post-launch feedback batch review, milestone planning review, staleness review, boundary review, and closeout review.
- Cover transitions between `Collecting evidence`, `Ready for fixture`, `Parked`, `Deferred`, and `Closed out of scope`.
- Update `docs/ROADMAP.md` with Review Cadence and Status Transitions sections.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so roadmap maintenance references review cadence and status transitions.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so the new roadmap maintenance rules stay synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each review cadence entry, timing, required input, and decision rule.
- `docs/ROADMAP.md` documents each status transition, condition, and required action.
- Every status transition uses known roadmap evidence statuses.
- Backlog maintenance rules require a review cycle before target or evidence status changes.
- Backlog maintenance rules require every evidence status change to match a Status Transitions row and leave a rationale.
- `pnpm docs:check-triage` fails if review cadence entries or status transition rules drift from `scripts/triage-contracts.mjs`.
- `pnpm docs:check-templates`, `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if roadmap review cadence or status transition entry points disappear.
- `pnpm release:gates:check` fails if the triage docs check stops using the shared cadence or transition contracts.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 100: 0.2.0 Accuracy Work Intake

Goal:

Turn 0.2.0 accuracy candidates into executable intake lanes so post-launch false positives, missing detections, env precision reports, package-manager command recognition issues, and report clarity work are prioritized by trust impact, supported-signal repetition, and fixture quality before implementation.

Status:

Implemented in the MVP codebase.

Scope:

- Add 0.2.0 accuracy intake lanes to `scripts/triage-contracts.mjs`.
- Add accuracy prioritization rules to `scripts/triage-contracts.mjs`.
- Cover false-positive reduction, missing-detection coverage, env var precision, package-manager command recognition, and report clarity or scoring adjustment.
- Cover P0 trust regressions, P1 repeated supported misses, P2 precision polish, and P3 speculative expansion.
- Update `docs/ROADMAP.md` with a 0.2.0 Accuracy Work Intake section, intake lanes, and prioritization rules.
- Update `docs/TRIAGE.md` so false-positive, missing-detection, and feature-request flows point 0.2.0 accuracy work through the intake before implementation.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention the intake.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so the intake stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each accuracy intake lane, roadmap candidate, source, required fixture, priority rule, and implementation gate.
- `docs/ROADMAP.md` documents each prioritization rule, required evidence, and action.
- Every accuracy intake lane references a known roadmap candidate.
- `docs/TRIAGE.md` points false-positive, missing-detection, and 0.2.0 accuracy feature-request flows to the Accuracy Work Intake before implementation.
- `docs/LAUNCH.md` points post-launch accuracy feedback to the intake.
- `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention 0.2.0 Accuracy Work Intake as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if intake lanes or prioritization rules drift from `scripts/triage-contracts.mjs`.
- `pnpm docs:check-templates`, `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if the intake entry points disappear.
- `pnpm release:gates:check` fails if the triage docs check stops using the shared accuracy intake contracts.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 101: Accuracy Fixture Intake Template

Goal:

Move 0.2.0 accuracy intake from planning docs into issue and PR templates, so false-positive reports, missing-detection reports, and accuracy PRs carry lane, priority, fixture target, expected output, and happy-path impact before implementation starts.

Status:

Implemented in the MVP codebase.

Scope:

- Add fixture intake fields to `scripts/triage-contracts.mjs`.
- Update false-positive and missing-detection issue forms with Accuracy lane, Accuracy priority, Fixture target, Expected output, and Happy-path impact fields.
- Update the PR template so accuracy PRs confirm the same fixture intake fields.
- Update `docs/ROADMAP.md` with Fixture Intake Fields under 0.2.0 Accuracy Work Intake.
- Update `docs/TRIAGE.md` so false-positive, missing-detection, and accuracy PR workflows mention the template fields.
- Update `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so contributor and release-facing docs mention Fixture Intake Fields.
- Update `scripts/check-github-templates.mjs`, `scripts/check-triage-doc.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so template fields stay synchronized with the shared triage contract.

Acceptance:

- `.github/ISSUE_TEMPLATE/false-positive.yml` collects Accuracy lane, Accuracy priority, Fixture target, Expected output, and Happy-path impact.
- `.github/ISSUE_TEMPLATE/missing-detection.yml` collects Accuracy lane, Accuracy priority, Fixture target, Expected output, and Happy-path impact.
- `.github/PULL_REQUEST_TEMPLATE.md` asks accuracy PRs to record the same fixture intake fields.
- False-positive and missing-detection forms include the relevant accuracy lanes and prioritization options from `scripts/triage-contracts.mjs`.
- `docs/ROADMAP.md` documents each fixture intake field, purpose, and required-for guidance.
- `docs/TRIAGE.md` points false-positive, missing-detection, and accuracy PR workflows to the fixture intake fields.
- `pnpm docs:check-templates` fails if issue forms or the PR template lose required fixture intake fields.
- `pnpm docs:check-triage` fails if Roadmap, issue forms, or PR template drift from `accuracyFixtureIntakeFields`.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared fixture intake field contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 102: Accuracy Intake Closure Criteria

Goal:

Connect accuracy intake fields to issue closure and PR review readiness, so maintainers know when to close, request more fixture evidence, move work back to Roadmap, close out of scope, or begin review.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy intake closure criteria to `scripts/triage-contracts.mjs`.
- Cover fixture-backed fixes, missing fixture evidence, roadmap parking, out-of-scope closure, and accuracy PR review readiness.
- Update `docs/ROADMAP.md` with Accuracy Work Intake Closure Criteria under the 0.2.0 Accuracy Work Intake section.
- Update `docs/TRIAGE.md` so closing criteria and PR triage reference Accuracy Work Intake Closure Criteria.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so accuracy PRs confirm closure criteria before review.
- Update `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so contributor and planning docs mention closure criteria.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so closure criteria stay synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each accuracy closure outcome, applies-to scope, required evidence, and close condition.
- `docs/TRIAGE.md` uses Accuracy Work Intake Closure Criteria for false-positive, missing-detection, and 0.2.0 accuracy PR outcomes.
- `docs/TRIAGE.md` explains when to close with fixture-backed fix, request missing fixture evidence, move to roadmap backlog, or close out of scope.
- `.github/PULL_REQUEST_TEMPLATE.md` asks accuracy PRs to confirm closure criteria, fixture evidence, schema/check ID impact, and happy-path impact before review.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or PR template drift from `accuracyIntakeClosureCriteria`.
- `pnpm docs:check-templates` fails if the PR template loses accuracy closure readiness language.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if closure criteria entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared closure criteria contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 103: Accuracy Fixture Case Matrix

Goal:

Turn 0.2.0 accuracy intake and closure into a fixture case matrix, so each accuracy lane maps to fixture type, minimal files, expected report diff, and happy-path fixture protection before implementation starts.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy fixture case matrix rows to `scripts/triage-contracts.mjs`.
- Cover false-positive reduction, missing-detection coverage, env var precision, package-manager command recognition, and report clarity or scoring adjustment.
- Update `docs/ROADMAP.md` with a Fixture Case Matrix under 0.2.0 Accuracy Work Intake.
- Update `docs/TRIAGE.md` so false-positive, missing-detection, PR triage, and closing criteria require matrix mapping before accuracy implementation or closure.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so accuracy PRs confirm minimal files, expected report diff, and happy-path fixture protection.
- Update `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so contributor and planning docs mention the Fixture Case Matrix.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so the matrix stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each accuracy fixture case matrix row, lane, case type, minimal files, expected report diff, happy-path protection, and readiness condition.
- Every matrix row uses a known 0.2.0 Accuracy Work Intake lane.
- `docs/TRIAGE.md` points false-positive, missing-detection, and 0.2.0 accuracy PR workflows to the Fixture Case Matrix before implementation or closure.
- `.github/PULL_REQUEST_TEMPLATE.md` asks accuracy PRs to confirm matrix mapping, minimal files, expected report diff, and happy-path fixture protection.
- `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Fixture Case Matrix as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or PR template drift from `accuracyFixtureCaseMatrix`.
- `pnpm docs:check-templates` fails if the PR template loses Fixture Case Matrix readiness language.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Fixture Case Matrix entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared fixture case matrix contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 104: Accuracy Fixture Seed Backlog

Goal:

Turn the Fixture Case Matrix into a first-batch seed backlog, so early 0.2.0 accuracy work has named starting points, target artifacts, triggers, expected first tests, happy-path guards, and next actions before implementation PRs open.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy fixture seed backlog entries to `scripts/triage-contracts.mjs`.
- Cover happy-path false-positive guard, supported signal miss guard, env placeholder precision guard, package-manager command variant guard, and report wording or score clarity guard.
- Connect each seed to a known 0.2.0 Accuracy Work Intake lane, Fixture Case Matrix case, and prioritization rule.
- Update `docs/ROADMAP.md` with a Fixture Seed Backlog under 0.2.0 Accuracy Work Intake.
- Update `docs/TRIAGE.md` so false-positive, missing-detection, PR triage, and closing criteria use the seed backlog for first-batch 0.2.0 accuracy work.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so first-batch accuracy PRs name the seed or explain why a new seed is needed.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention the Fixture Seed Backlog.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so the seed backlog stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each seed, lane, matrix case, priority, target artifact, trigger, expected first test, happy-path guard, and next action.
- Every seed uses a known 0.2.0 Accuracy Work Intake lane, Fixture Case Matrix case, and prioritization rule.
- `docs/TRIAGE.md` points false-positive, missing-detection, and 0.2.0 accuracy PR workflows to the Fixture Seed Backlog for first-batch accuracy work.
- `.github/PULL_REQUEST_TEMPLATE.md` asks first-batch accuracy PRs to name the seed or explain why a new seed is needed.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Fixture Seed Backlog as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, Launch, or PR template drift from `accuracyFixtureSeedBacklog`.
- `pnpm docs:check-templates` fails if the PR template loses Fixture Seed Backlog readiness language.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Fixture Seed Backlog entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared fixture seed backlog contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 105: Accuracy Seed Issue Routing

Goal:

Move the Fixture Seed Backlog into false-positive and missing-detection issue intake, so first-batch 0.2.0 accuracy reports can name the closest seed, explain the seed fit, or state why a new seed is needed before triage starts.

Status:

Implemented in the MVP codebase.

Scope:

- Add seed issue routing fields to `scripts/triage-contracts.mjs`.
- Update false-positive and missing-detection issue forms with Fixture seed and Seed fit or new seed rationale fields.
- Include relevant Fixture Seed Backlog options in each issue form plus a New seed needed fallback.
- Update `docs/ROADMAP.md` with Seed Issue Routing Fields under 0.2.0 Accuracy Work Intake.
- Update `docs/TRIAGE.md` so false-positive and missing-detection workflows mention the routing fields before implementation.
- Update `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so contributor and planning docs mention Seed Issue Routing Fields.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so seed issue routing stays synchronized with the shared triage contract.

Acceptance:

- `.github/ISSUE_TEMPLATE/false-positive.yml` collects Fixture seed and Seed fit or new seed rationale.
- `.github/ISSUE_TEMPLATE/missing-detection.yml` collects Fixture seed and Seed fit or new seed rationale.
- Issue forms include the relevant Fixture Seed Backlog seeds and a New seed needed fallback.
- `docs/ROADMAP.md` documents each seed issue routing field, purpose, and required-for guidance.
- `docs/TRIAGE.md` points false-positive and missing-detection workflows to the seed issue routing fields.
- `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Issue Routing Fields as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or issue forms drift from `accuracySeedIssueRoutingFields`.
- `pnpm docs:check-templates` fails if issue forms lose seed routing fields, relevant seed options, or the New seed needed fallback.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Issue Routing Fields entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed issue routing contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 106: Accuracy Seed Triage Routing

Goal:

Turn seed issue routing fields into maintainer actions, so first-batch 0.2.0 accuracy reports consistently map to labels, roadmap status, and next action before implementation starts.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed triage routing entries to `scripts/triage-contracts.mjs`.
- Cover known seed with enough reproduction detail, known seed with small isolated first test, known seed but missing evidence, new seed needed but accuracy-scoped, and broad or out-of-scope seed requests.
- Use existing labels such as `needs-fixture`, `good-first-issue`, `needs-more-info`, `needs-triage`, `false-positive`, `missing-detection`, and `enhancement` without introducing new labels.
- Map each routing condition to an existing Roadmap status and maintainer action.
- Update `docs/ROADMAP.md` with Seed Triage Routing under 0.2.0 Accuracy Work Intake.
- Update `docs/TRIAGE.md` so Labels, false-positive flow, missing-detection flow, and closing criteria use Seed Triage Routing.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Triage Routing.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so seed triage routing stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each seed triage routing condition, applies-when rule, label set, roadmap status, and maintainer action.
- Every seed triage routing status uses a known Roadmap candidate status.
- `docs/TRIAGE.md` points labels, false-positive, missing-detection, and closing criteria to Seed Triage Routing.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Triage Routing as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedTriageRouting`.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Triage Routing entry point.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Triage Routing entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed triage routing contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 107: Accuracy Seed Batch Review Cadence

Goal:

Give seed-routed 0.2.0 accuracy reports a batch review cadence, so maintainers can consolidate repeated reports, choose canonical fixtures, request missing evidence, add or reject new seed candidates, and shape milestone-ready batches without scattering implementation work across single issues.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed batch review cadence entries to `scripts/triage-contracts.mjs`.
- Cover first accuracy feedback batch review, repeated seed consolidation review, missing seed evidence review, new seed candidate review, and 0.2.0 seed milestone readiness review.
- Record when each review runs, required input, decision, and required record.
- Update `docs/ROADMAP.md` with Seed Batch Review Cadence under 0.2.0 Accuracy Work Intake.
- Update `docs/TRIAGE.md` so labels and closing criteria point maintainers to the batch cadence when multiple seed-routed reports arrive together.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Batch Review Cadence.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so seed batch review cadence stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each seed batch review, timing, required input, decision, and record requirement.
- `docs/TRIAGE.md` points labels and closing criteria to Seed Batch Review Cadence for multiple seed-routed reports.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Batch Review Cadence as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedBatchReviewCadence`.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Batch Review Cadence entry point.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Batch Review Cadence entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed batch review cadence contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 108: Accuracy Seed Evidence Comment Templates

Goal:

Give maintainers copy-ready issue comment templates for seed-routed 0.2.0 accuracy work, so missing evidence requests, canonical fixture target confirmations, duplicate seed consolidation, new seed decisions, and milestone readiness decisions are recorded consistently before implementation starts.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed evidence comment templates to `scripts/triage-contracts.mjs`.
- Cover missing seed evidence requests, canonical fixture target confirmations, duplicate seed consolidation notes, new seed candidate decisions, and 0.2.0 seed milestone readiness decisions.
- Record template name, use case, required inputs, comment body, and follow-up action for each template.
- Update `docs/ROADMAP.md` with Seed Evidence Comment Templates under 0.2.0 Accuracy Work Intake.
- Update `docs/TRIAGE.md` so labels and closing criteria point maintainers to the templates for seed-routed comments.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm the templates were used when relevant.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Evidence Comment Templates.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so the templates stay synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each seed evidence comment template, use case, required inputs, comment body, and follow-up action.
- `docs/TRIAGE.md` points labels and closing criteria to Seed Evidence Comment Templates for seed-routed maintainer comments.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm the templates were used when missing evidence, canonical fixture target, duplicate consolidation, new seed, or milestone readiness decisions matter.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Evidence Comment Templates as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedEvidenceCommentTemplates`.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Evidence Comment Templates entry point.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Evidence Comment Templates entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed evidence comment template contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 109: Accuracy Seed Fixture Readiness Handoff

Goal:

Add a seed fixture readiness handoff between seed triage comments and implementation PRs, so first-batch 0.2.0 accuracy work only starts after owner, target artifact, expected first test, happy-path guard, verification commands, and implementation boundary are explicit.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture readiness handoff entries to `scripts/triage-contracts.mjs`.
- Cover known seed fixture-ready handoff, consolidated duplicate seed handoff, new seed accepted handoff, milestone seed batch handoff, and not-ready seed evidence handoff.
- Record use case, required inputs, ready signal, implementation boundary, and required record for each handoff.
- Update `docs/ROADMAP.md` with Seed Fixture Readiness Handoff under 0.2.0 Accuracy Work Intake.
- Update `docs/TRIAGE.md` so labels, false-positive and missing-detection flows, PR triage, and closing criteria point maintainers to the handoff before fixture-first implementation starts.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm owner, target artifact, expected first test, happy-path guard, verification commands, and implementation boundary.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Readiness Handoff.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so the handoff stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each seed fixture readiness handoff, use case, required inputs, ready signal, implementation boundary, and record requirement.
- `docs/TRIAGE.md` points labels, false-positive and missing-detection flows, PR triage, and closing criteria to Seed Fixture Readiness Handoff before fixture-first implementation starts.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm the handoff records owner, target artifact, expected first test, happy-path guard, verification commands, and implementation boundary.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Readiness Handoff as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureReadinessHandoff`.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Readiness Handoff entry point.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Readiness Handoff entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture readiness handoff contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 110: Accuracy Seed Verification Command Sets

Goal:

Standardize verification command sets for seed-routed 0.2.0 accuracy work, so docs-only seed planning, fixture-ready implementation, duplicate consolidation, new seed acceptance, and milestone batch decisions record the right command scope and escalation condition.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed verification command sets to `scripts/triage-contracts.mjs`.
- Cover seed triage docs-only verification, fixture-ready implementation verification, duplicate seed consolidation verification, new seed accepted verification, and milestone seed batch verification.
- Record use case, commands, required record, and escalation condition for each command set.
- Update `docs/ROADMAP.md` with Seed Verification Command Sets under 0.2.0 Accuracy Work Intake.
- Update `docs/TRIAGE.md` so PR triage and closing criteria require the matching command set before closing or promoting seed-routed work.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm the chosen command set, required record, and escalation condition.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Verification Command Sets.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so command sets stay synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each seed verification command set, use case, commands, required record, and escalation condition.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Verification Command Sets for seed-routed comments, handoffs, PRs, and milestone decisions.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm the matching command set, required record, and escalation condition.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Verification Command Sets as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedVerificationCommandSets`.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Verification Command Sets entry point.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Verification Command Sets entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed verification command sets contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 111: Accuracy Seed Evidence Record Fields

Goal:

Standardize the evidence fields that seed-routed 0.2.0 accuracy comments, handoffs, PRs, and milestone decisions must record after choosing a verification command set, so maintainers can review the decision, route, fixture readiness, verification evidence, owner, and follow-up from one place.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed evidence record fields to `scripts/triage-contracts.mjs`.
- Cover seed evidence record location, canonical issue or report links, seed route summary, fixture readiness summary, verification evidence summary, and next owner and follow-up.
- Record purpose, required-for guidance, and completion signal for each field.
- Update `docs/ROADMAP.md` with Seed Evidence Record Fields under 0.2.0 Accuracy Work Intake.
- Update `docs/TRIAGE.md` so PR triage and closing criteria require the record fields before closing, parking, promoting, or handing off seed-routed work.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm the record location, canonical links, route summary, fixture readiness summary, verification evidence summary, and next owner and follow-up.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Evidence Record Fields.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so record fields stay synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each seed evidence record field, purpose, required-for guidance, and completion signal.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Evidence Record Fields for seed-routed comments, handoffs, PRs, and milestone decisions.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm record location, canonical links, seed route summary, fixture readiness summary, verification evidence summary, and next owner and follow-up.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Evidence Record Fields as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedEvidenceRecordFields`.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Evidence Record Fields entry point.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Evidence Record Fields entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed evidence record fields contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 112: Accuracy Seed Evidence Refresh Rules

Goal:

Define when seed-routed 0.2.0 accuracy evidence becomes stale and how maintainers must refresh the record, rerun focused checks, or escalate to `pnpm verify:release` before closing, promoting, handing off, or implementing seed work.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed evidence refresh rules to `scripts/triage-contracts.mjs`.
- Cover seed route changes, fixture target changes, verification scope changes, duplicate or canonical issue changes, and milestone or owner changes.
- Record refresh trigger, refresh condition, record update, rerun command guidance, and drift prevention for each rule.
- Update `docs/ROADMAP.md` with Seed Evidence Refresh Rules under 0.2.0 Accuracy Work Intake.
- Update `docs/TRIAGE.md` so PR triage and closing criteria require refresh rules before closing, parking, promoting, handing off, or implementing seed-routed work when evidence changes.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm refresh rules were applied when route, target artifact, verification scope, canonical issue, milestone, or owner changed after the first evidence record.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Evidence Refresh Rules.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so refresh rules stay synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each seed evidence refresh trigger, refresh condition, record update, rerun command guidance, and drift prevention rule.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Evidence Refresh Rules for seed-routed comments, handoffs, PRs, and milestone decisions.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm refresh rules were applied when seed evidence changed after the first record.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Evidence Refresh Rules as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedEvidenceRefreshRules`.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Evidence Refresh Rules entry point.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Evidence Refresh Rules entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed evidence refresh rules contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 113: Accuracy Seed Evidence Audit Checklist

Goal:

Add a final audit checklist for seed-routed 0.2.0 accuracy evidence, so maintainers can verify record location, route/status sync, fixture readiness, verification scope, duplicates, and ownership before closing, parking, promoting, handing off, implementing, or requesting review.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed evidence audit checklist entries to `scripts/triage-contracts.mjs`.
- Cover current record location, synchronized route/status, reviewable fixture readiness, matching verification evidence, and settled duplicates/owners.
- Record review question, required evidence, pass condition, and missing-evidence action for each audit item.
- Update `docs/ROADMAP.md` with Seed Evidence Audit Checklist under 0.2.0 Accuracy Work Intake.
- Update `docs/TRIAGE.md` so PR triage and closing criteria require the audit checklist before label, roadmap status, milestone scope, ownership, closure, promotion, handoff, implementation, or review request changes.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm the audit checklist passed before closure, promotion, handoff, implementation, or review request.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Evidence Audit Checklist.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so the audit checklist stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each seed evidence audit item, review question, required evidence, pass condition, and missing-evidence action.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Evidence Audit Checklist before changing labels, roadmap status, milestone scope, ownership, closure, promotion, handoff, implementation, or review request state.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm the audit checklist passed before closure, promotion, handoff, implementation, or review request.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Evidence Audit Checklist as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedEvidenceAuditChecklist`.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Evidence Audit Checklist entry point.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Evidence Audit Checklist entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed evidence audit checklist contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 114: Accuracy Seed Audit Outcome Routing

Goal:

Define the required next state after a Seed Evidence Audit Checklist pass or failure, so seed-routed 0.2.0 accuracy work consistently routes to fixture implementation, missing-evidence follow-up, duplicate consolidation, roadmap parking, out-of-scope closure, or milestone batch decisions.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed audit outcome routing entries to `scripts/triage-contracts.mjs`.
- Cover fixture implementation readiness, needs-more-evidence follow-up, duplicate evidence-only consolidation, parked roadmap evidence, out-of-scope closure, and milestone batch ready or deferred decisions.
- Record outcome, applies-when guidance, required evidence, route target, maintainer action, and required record for each outcome.
- Update `docs/ROADMAP.md` with Seed Audit Outcome Routing under 0.2.0 Accuracy Work Intake, between Seed Evidence Audit Checklist and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria require a Seed Audit Outcome Routing outcome after audit pass or failure and before closure, promotion, handoff, implementation, milestone selection, or review request changes.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm the outcome routing decision before closure, promotion, handoff, implementation, milestone selection, or review request.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Audit Outcome Routing.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so outcome routing stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each seed audit outcome, applies-when condition, required evidence, route target, maintainer action, and required record.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Audit Outcome Routing after the audit passes or fails.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm the Seed Audit Outcome Routing outcome before closure, promotion, handoff, implementation, milestone selection, or review request.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Audit Outcome Routing as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedAuditOutcomeRouting`.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Audit Outcome Routing entry point.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Audit Outcome Routing entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed audit outcome routing contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 115: Accuracy Seed Audit Outcome Record Templates

Goal:

Define the required record shape after Seed Audit Outcome Routing selects an outcome, so issue comments, PR sections, milestone notes, and roadmap notes consistently capture required inputs, record body, and follow-up before closure, promotion, handoff, implementation, milestone selection, or review request.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed audit outcome record templates to `scripts/triage-contracts.mjs`.
- Cover fixture implementation ready, needs more seed evidence, duplicate consolidated evidence-only, parked roadmap evidence, closed out of scope, and milestone batch ready or deferred records.
- Tie every record template to a known Seed Audit Outcome Routing outcome.
- Record template name, outcome, use-when guidance, required inputs, record body, and follow-up for each template.
- Update `docs/ROADMAP.md` with Seed Audit Outcome Record Templates under 0.2.0 Accuracy Work Intake, between Seed Audit Outcome Routing and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria require the matching Seed Audit Outcome Record Templates entry after outcome routing.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm required inputs, record body, and follow-up are recorded before review.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Audit Outcome Record Templates.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so record templates stay synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each seed audit outcome record template, outcome, use-when guidance, required inputs, record body, and follow-up.
- Every Seed Audit Outcome Record Templates entry references a known Seed Audit Outcome Routing outcome.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Audit Outcome Record Templates after outcome routing.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm required inputs, record body, and follow-up are recorded before review.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Audit Outcome Record Templates as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedAuditOutcomeRecordTemplates`.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Audit Outcome Record Templates entry point or if a record template references an unknown outcome.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Audit Outcome Record Templates entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed audit outcome record templates contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 116: Accuracy Seed Fixture Implementation Batch Fields

Goal:

Define the required fields before seed-routed 0.2.0 accuracy work enters a fixture-first implementation batch or PR, so maintainers can keep selected work small, fixture-first, reviewable, and bounded before detector, reporter, scoring, schema, or example output changes start.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation batch fields to `scripts/triage-contracts.mjs`.
- Cover batch scope, selected and deferred seeds, fixture implementation target, expected first failure, happy-path guard set, schema and check ID impact, verification plan, and batch stop condition.
- Record purpose, required-for guidance, and completion signal for each field.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Batch Fields under 0.2.0 Accuracy Work Intake, between Seed Audit Outcome Record Templates and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria require Seed Fixture Implementation Batch Fields before fixture, detector, reporter, scoring, schema, or example output changes start.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm batch fields were filled before implementation changes started.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Batch Fields.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so implementation batch fields stay synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each seed fixture implementation batch field, purpose, required-for guidance, and completion signal.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Fixture Implementation Batch Fields before implementation changes start.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm Seed Fixture Implementation Batch Fields were filled before fixture, detector, reporter, scoring, schema, or example output changes started.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Batch Fields as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationBatchFields`.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Batch Fields entry point.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Batch Fields entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation batch fields contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 117: Accuracy Seed Fixture Implementation Batch Execution Checklist

Goal:

Define the ordered execution checklist for fixture-first 0.2.0 seed implementation batches, so maintainers lock scope, write the first failing fixture, keep implementation minimal, run happy-path guards, update public report surfaces only when needed, and match verification to final scope before review or closure.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation batch execution checklist entries to `scripts/triage-contracts.mjs`.
- Cover locking batch scope before code, writing the first failing fixture, applying the smallest implementation change, running happy-path guards, updating public report surfaces, and closing with matching verification.
- Record step, use-when guidance, required input, pass condition, stop condition, and required record for each checklist entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Batch Execution Checklist under 0.2.0 Accuracy Work Intake, between Seed Fixture Implementation Batch Fields and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria require the execution checklist after batch fields are filled and before review or closure.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm they followed the checklist from locked scope through matching verification.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Batch Execution Checklist.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so the execution checklist stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each seed fixture implementation batch execution step, use-when guidance, required input, pass condition, stop condition, and required record.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Fixture Implementation Batch Execution Checklist before review or closure.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm locked scope, first failing fixture, minimal implementation, happy-path guards, public report surface updates, and matching verification.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Batch Execution Checklist as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationBatchExecutionChecklist`.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Batch Execution Checklist entry point.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Batch Execution Checklist entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation batch execution checklist contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 118: Accuracy Seed Fixture Implementation Starter Batches

Goal:

Define the first selectable fixture-first 0.2.0 accuracy implementation starter batches, so audited seed-routed work can move from seed backlog and execution checklist into small PR-ready groups without broad detector, reporter, scoring, schema, or example output changes leaking into scope.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation starter batches to `scripts/triage-contracts.mjs`.
- Cover happy-path trust guard, supported signal miss, env placeholder precision, package-manager command variant, and report wording/score clarity starters.
- Tie every starter batch to one or more known Fixture Seed Backlog seeds.
- Record batch, selected seeds, deferral guidance, first fixture target, first failure, happy-path guard, verification, and stop condition for each starter batch.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Starter Batches under 0.2.0 Accuracy Work Intake, between Seed Fixture Implementation Batch Execution Checklist and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria require first implementation PRs to choose a starter batch or explain a smaller/different audited batch.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm starter batch selection or alternate audited-batch rationale.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Starter Batches.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so starter batches stay synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each starter batch, selected seeds, deferral guidance, first fixture target, first failure, happy-path guard, verification, and stop condition.
- Every Seed Fixture Implementation Starter Batches entry references known Fixture Seed Backlog seeds.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Fixture Implementation Starter Batches for first implementation PR selection.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm starter batch selection or alternate audited-batch rationale.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Starter Batches as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationStarterBatches` or if a starter batch references an unknown seed.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Starter Batches entry point or if a starter batch references an unknown seed.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Starter Batches entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation starter batches contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 119: Accuracy Seed Fixture Implementation PR Queue

Goal:

Define the default queue for the first fixture-first 0.2.0 accuracy PRs, so starter batches can move into implementation in a stable order with explicit focus, dependencies, ready conditions, verification, merge gates, and stop conditions.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation PR queue entries to `scripts/triage-contracts.mjs`.
- Cover PR-1 happy-path trust guard, PR-2 supported signal miss, PR-3 env placeholder precision, PR-4 package-manager command variant, and PR-5 report wording/score clarity.
- Tie every PR queue entry to a known Seed Fixture Implementation Starter Batches entry.
- Keep PR queue order unique.
- Record order, starter batch, focus, dependency, ready condition, verification, merge gate, and stop condition for each PR queue entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation PR Queue under 0.2.0 Accuracy Work Intake, between Seed Fixture Implementation Starter Batches and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria require first implementation PRs to name queue order or record audited skip, split, or reorder rationale.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm queue order or audited queue rationale.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation PR Queue.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so the PR queue stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each PR queue order, starter batch, focus, dependency, ready condition, verification, merge gate, and stop condition.
- Every Seed Fixture Implementation PR Queue entry references a known Seed Fixture Implementation Starter Batches entry.
- Every PR queue order is unique.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Fixture Implementation PR Queue for first implementation PR ordering.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm queue order or audited skip, split, or reorder rationale.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation PR Queue as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationPrQueue`, if queue order is duplicated, or if a queue entry references an unknown starter batch.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation PR Queue entry point, if queue order is duplicated, or if a queue entry references an unknown starter batch.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation PR Queue entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation PR queue contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 120: Accuracy Seed Fixture Implementation Queued PR Readiness Checklist

Goal:

Define the readiness checklist that must pass before opening each queued fixture-first 0.2.0 accuracy PR, so missing evidence, guard gaps, redaction risk, public-surface uncertainty, and unclear split conditions block implementation before code changes start.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR readiness checklist entries to `scripts/triage-contracts.mjs`.
- Cover PR-1 happy-path reproducibility and guard baselines, PR-2 supported signal evidence and helper guard scope, PR-3 env evidence and redaction risk, PR-4 command variant evidence and helper guard scope, and PR-5 report clarity classification and public report examples.
- Tie every readiness checklist entry to a known Seed Fixture Implementation PR Queue order.
- Record queue order, readiness check, required evidence, ready condition, blocked condition, and required record for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Readiness Checklist under 0.2.0 Accuracy Work Intake, between Seed Fixture Implementation PR Queue and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria require matching queued PR readiness checks before implementation starts.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm matching queued PR readiness checks passed before implementation started.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Readiness Checklist.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so queued PR readiness stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR readiness queue order, readiness check, required evidence, ready condition, blocked condition, and required record.
- Every queued PR readiness entry references a known Seed Fixture Implementation PR Queue order.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Fixture Implementation Queued PR Readiness Checklist before implementation starts.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm matching queued PR readiness checks passed before implementation started.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Readiness Checklist as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrReadinessChecklist` or if a readiness entry references an unknown PR queue order.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Readiness Checklist entry point or if a readiness entry references an unknown PR queue order.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Readiness Checklist entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR readiness checklist contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 121: Accuracy Seed Fixture Implementation Queued PR Review Handoff

Goal:

Define the review handoff that must be recorded after queued PR readiness passes and before requesting review for each fixture-first 0.2.0 accuracy PR, so reviewers know the required inputs, review focus, merge evidence, and fallback path without widening implementation scope.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR review handoff entries to `scripts/triage-contracts.mjs`.
- Cover PR-1 happy-path trust review, PR-2 supported signal miss review, PR-3 env precision and redaction review, PR-4 package-manager command variant review, and PR-5 report clarity/scoring review.
- Tie every review handoff entry to a known Seed Fixture Implementation PR Queue order.
- Record handoff, queue order, use case, required inputs, review focus, merge evidence, and fallback for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Review Handoff under 0.2.0 Accuracy Work Intake, between Seed Fixture Implementation Queued PR Readiness Checklist and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria require matching queued PR review handoff before review starts.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm matching queued PR review handoff is recorded before requesting review.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Review Handoff.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so queued PR review handoff stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR review handoff, queue order, use case, required inputs, review focus, merge evidence, and fallback.
- Every queued PR review handoff entry references a known Seed Fixture Implementation PR Queue order.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Fixture Implementation Queued PR Review Handoff before review starts.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm matching queued PR review handoff is recorded before requesting review.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Review Handoff as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrReviewHandoff` or if a handoff entry references an unknown PR queue order.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Review Handoff entry point or if a handoff entry references an unknown PR queue order.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Review Handoff entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR review handoff contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 122: Accuracy Seed Fixture Implementation Queued PR Review Outcome Routing

Goal:

Define the routing table that must be used after queued fixture-first PR review, so approval, requested changes, readiness return, split/defer, and public-surface refresh decisions have one auditable next state before merge or closure.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR review outcome routing entries to `scripts/triage-contracts.mjs`.
- Cover approved fixture merge, in-scope change requests, return to readiness, split or deferred expanded scope, and public-surface refresh requirements.
- Tie every review outcome routing entry to known Seed Fixture Implementation Queued PR Review Handoff scopes.
- Record outcome, handoff scope, applies-when condition, required evidence, route target, maintainer action, and required record for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Review Outcome Routing under 0.2.0 Accuracy Work Intake, between Seed Fixture Implementation Queued PR Review Handoff and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria require matching queued PR review outcome routing before merge, revision, readiness return, split/defer, or public-surface refresh.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm matching queued PR review outcome routing is recorded after review.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Review Outcome Routing.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so queued PR review outcome routing stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR review outcome, handoff scope, applies-when condition, required evidence, route target, maintainer action, and required record.
- Every queued PR review outcome handoff scope references known Seed Fixture Implementation Queued PR Review Handoff entries.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Fixture Implementation Queued PR Review Outcome Routing after queued PR review.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm matching queued PR review outcome routing is recorded after review.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Review Outcome Routing as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrReviewOutcomeRouting` or if an outcome references an unknown review handoff.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Review Outcome Routing entry point or if an outcome references an unknown review handoff.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Review Outcome Routing entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR review outcome routing contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 123: Accuracy Seed Fixture Implementation Queued PR Review Outcome Record Templates

Goal:

Define the record templates that must be used after queued fixture-first PR review outcome routing, so each approval, requested-change, readiness-return, split/defer, or public-surface-refresh decision leaves required inputs, record body, and follow-up before merge or closure.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR review outcome record templates to `scripts/triage-contracts.mjs`.
- Cover approved merge records, scoped change request records, readiness return records, split/defer records, and public-surface refresh records.
- Tie every record template entry to a known Seed Fixture Implementation Queued PR Review Outcome Routing outcome.
- Record template name, outcome, use case, required inputs, record body, and follow-up for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Review Outcome Record Templates under 0.2.0 Accuracy Work Intake, between Seed Fixture Implementation Queued PR Review Outcome Routing and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria require the matching queued PR review outcome record template after outcome routing.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm matching queued PR review outcome record template is used before merge or closure.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Review Outcome Record Templates.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so queued PR review outcome record templates stay synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR review outcome record template, outcome, use case, required inputs, record body, and follow-up.
- Every queued PR review outcome record template references a known Seed Fixture Implementation Queued PR Review Outcome Routing outcome.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Fixture Implementation Queued PR Review Outcome Record Templates after outcome routing.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm matching queued PR review outcome record template is used before merge or closure.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Review Outcome Record Templates as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrReviewOutcomeRecordTemplates` or if a template references an unknown outcome.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Review Outcome Record Templates entry point or if a template references an unknown outcome.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Review Outcome Record Templates entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR review outcome record template contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 124: Accuracy Seed Fixture Implementation Queued PR Closeout Checklist

Goal:

Define the closeout checklist that must pass before queued fixture-first PRs merge, close, split, defer, or return to readiness, so final verification, public-surface synchronization, follow-up ownership, and read-only evidence are recorded after review outcome records.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR closeout checklist entries to `scripts/triage-contracts.mjs`.
- Cover complete review outcome records, final verification matching the outcome, public surface and release note synchronization, split/defer/readiness owner assignment, and read-only implementation boundary preservation.
- Record item, applies-when condition, required evidence, pass condition, missing-evidence action, and required record for each closeout entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Closeout Checklist under 0.2.0 Accuracy Work Intake, between Seed Fixture Implementation Queued PR Review Outcome Record Templates and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria require the queued PR closeout checklist before merge, closure, split, defer, or readiness return.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm the queued PR closeout checklist passed before merge or closure.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Closeout Checklist.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so queued PR closeout stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR closeout item, applies-when condition, required evidence, pass condition, missing-evidence action, and required record.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Fixture Implementation Queued PR Closeout Checklist before merge, closure, split, defer, or readiness return.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm queued PR closeout passed before merge or closure.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Closeout Checklist as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrCloseoutChecklist`.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Closeout Checklist entry point.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Closeout Checklist entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR closeout contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 125: Accuracy Seed Fixture Implementation Queued PR Closeout Record Templates

Goal:

Define the record templates that must be used after queued fixture-first PR closeout, so final evidence, verification, public-surface synchronization, ownership, and read-only boundary decisions are documented consistently before merge, closure, split, defer, or readiness return.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR closeout record templates to `scripts/triage-contracts.mjs`.
- Cover closeout evidence records, final verification records, public surface closeout records, follow-up owner records, and read-only closeout records.
- Tie every closeout record template entry to a known Seed Fixture Implementation Queued PR Closeout Checklist item.
- Record template name, checklist item, use case, required inputs, record body, and follow-up for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Closeout Record Templates under 0.2.0 Accuracy Work Intake, between Seed Fixture Implementation Queued PR Closeout Checklist and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria require the matching queued PR closeout record template after closeout.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm matching queued PR closeout record template is used before merge or closure.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Closeout Record Templates.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so queued PR closeout record templates stay synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR closeout record template, checklist item, use case, required inputs, record body, and follow-up.
- Every queued PR closeout record template references a known Seed Fixture Implementation Queued PR Closeout Checklist item.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Fixture Implementation Queued PR Closeout Record Templates after closeout.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm matching queued PR closeout record template is used before merge or closure.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Closeout Record Templates as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrCloseoutRecordTemplates` or if a template references an unknown closeout item.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Closeout Record Templates entry point or if a template references an unknown closeout item.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Closeout Record Templates entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR closeout record template contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 126: Accuracy Seed Fixture Implementation Queued PR Follow-Up Queue

Goal:

Define the queue that routes follow-up work created by queued fixture-first PR closeout, so deferred scope, readiness refreshes, public-surface work, split PRs, and read-only escalations have one owner, route, verification path, and stop condition before planning or implementation resumes.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up queue entries to `scripts/triage-contracts.mjs`.
- Cover deferred scope follow-ups, readiness refresh follow-ups, public surface follow-ups, split queued PR follow-ups, and read-only escalation follow-ups.
- Tie every follow-up queue entry to a known Seed Fixture Implementation Queued PR Closeout Checklist item.
- Record follow-up name, source closeout item, use case, required inputs, route, owner action, verification, and stop condition for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Queue under 0.2.0 Accuracy Work Intake, between Seed Fixture Implementation Queued PR Closeout Record Templates and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria route closeout-created follow-ups through the matching follow-up queue entry.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm closeout-created follow-ups have an owner, route, verification path, and stop condition.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Queue.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so queued PR follow-up routing stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up, source closeout item, use case, required inputs, route, owner action, verification, and stop condition.
- Every queued PR follow-up references a known Seed Fixture Implementation Queued PR Closeout Checklist item.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Queue after closeout creates follow-up work.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm closeout-created follow-ups have an owner, route, verification path, and stop condition.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Queue as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpQueue` or if a follow-up references an unknown closeout item.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Queue entry point or if a follow-up references an unknown closeout item.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Queue entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up queue contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.
### Iteration 127: Accuracy Seed Fixture Implementation Queued PR Follow-Up Record Templates

Goal:

Define the record templates used after queued PR follow-up routing, so deferred scope, readiness refreshes, public-surface work, split PRs, and read-only escalations leave required inputs, record body, next action, and verification context before work continues.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up record templates to `scripts/triage-contracts.mjs`.
- Cover deferred scope follow-up records, readiness refresh follow-up records, public surface follow-up records, split queued PR follow-up records, and read-only escalation follow-up records.
- Tie every follow-up record template entry to a known Seed Fixture Implementation Queued PR Follow-Up Queue route.
- Record template name, follow-up route, use case, required inputs, record body, and next action for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Record Templates under 0.2.0 Accuracy Work Intake, between Seed Fixture Implementation Queued PR Follow-Up Queue and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria require the matching follow-up record template after follow-up routing.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm matching follow-up record template is used before follow-up work continues.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Record Templates.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so follow-up record templates stay synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up record template, follow-up route, use case, required inputs, record body, and next action.
- Every queued PR follow-up record template references a known Seed Fixture Implementation Queued PR Follow-Up Queue route.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Record Templates after follow-up routing.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm matching follow-up record template is used before work continues.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Record Templates as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpRecordTemplates` or if a template references an unknown follow-up route.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Record Templates entry point or if a template references an unknown follow-up route.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Record Templates entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up record template contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.
### Iteration 128: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Cadence

Goal:

Define the review cadence and aging policy for queued PR follow-up records, so stale deferred scope, readiness refreshes, public-surface work, split PRs, and read-only escalations are refreshed, escalated, deferred, or closed before planning or implementation continues.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review cadence entries to `scripts/triage-contracts.mjs`.
- Cover deferred scope follow-up reviews, readiness refresh follow-up reviews, public surface follow-up reviews, split queued PR follow-up reviews, and read-only escalation follow-up reviews.
- Tie every follow-up review cadence entry to a known Seed Fixture Implementation Queued PR Follow-Up Record Templates entry.
- Record review name, record template, cadence, required inputs, stale condition, route, maintainer action, and record guidance for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Cadence under 0.2.0 Accuracy Work Intake, between Seed Fixture Implementation Queued PR Follow-Up Record Templates and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria apply the matching review cadence before stale follow-ups change owner, resume review, split scope, touch public surfaces, or resolve read-only escalations.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm stale follow-ups were reviewed, refreshed, escalated, deferred, or closed before planning or implementation continues.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Cadence.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so follow-up review cadence stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review, record template, cadence, required inputs, stale condition, route, maintainer action, and review record.
- Every queued PR follow-up review cadence entry references a known Seed Fixture Implementation Queued PR Follow-Up Record Templates entry.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Cadence after follow-up records exist.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm stale follow-ups were reviewed, refreshed, escalated, deferred, or closed before planning or implementation continues.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Cadence as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewCadence` or if a cadence entry references an unknown follow-up record template.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Cadence entry point or if a cadence entry references an unknown follow-up record template.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Cadence entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review cadence contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.
### Iteration 129: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing

Goal:

Define the outcome routing used after queued PR follow-up review cadence, so refresh, resume-review, release-blocking escalation, defer/park, and close/supersede decisions leave one explicit route before follow-up work continues or closes.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review outcome routing entries to `scripts/triage-contracts.mjs`.
- Cover refresh follow-up evidence, resume queued PR review, escalate release-blocking follow-up, defer or park follow-up, and close superseded follow-up outcomes.
- Tie every follow-up review outcome routing entry to known Seed Fixture Implementation Queued PR Follow-Up Review Cadence review names through its review scope.
- Record outcome, review scope, applies-when condition, required evidence, route, maintainer action, and record guidance for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing under 0.2.0 Accuracy Work Intake, between Seed Fixture Implementation Queued PR Follow-Up Review Cadence and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria record the matching follow-up review outcome before refreshing evidence, resuming review, escalating blockers, deferring/parking, or closing a follow-up.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm matching follow-up review outcome routing is recorded before follow-up state changes.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so follow-up review outcome routing stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review outcome, review scope, applies-when condition, required evidence, route, maintainer action, and required record.
- Every queued PR follow-up review outcome routing entry references known Seed Fixture Implementation Queued PR Follow-Up Review Cadence review names.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing after follow-up review.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm matching follow-up review outcome routing is recorded before follow-up state changes.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRouting` or if an outcome references an unknown follow-up review.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing entry point or if an outcome references an unknown follow-up review.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review outcome routing contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.
### Iteration 130: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates

Goal:

Define the record templates used after queued PR follow-up review outcome routing, so refresh, resume-review, release-blocking escalation, defer/park, and close/supersede decisions leave required inputs, record body, and next action before follow-up work resumes, blocks, parks, or closes.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review outcome record template entries to `scripts/triage-contracts.mjs`.
- Cover refresh follow-up evidence, resume queued PR review, release-blocking follow-up escalation, defer or park follow-up, and close superseded follow-up records.
- Tie every follow-up review outcome record template to a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing outcome.
- Record template name, outcome, use case, required inputs, record body, and next action for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates under 0.2.0 Accuracy Work Intake, between Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria use follow-up review outcome record templates after outcome routing.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm follow-up review outcome records include required inputs, record body, and next action before work resumes, blocks, parks, or closes.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so follow-up review outcome record templates stay synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review outcome record template, outcome, use case, required inputs, record body, and next action.
- Every queued PR follow-up review outcome record template references a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Routing outcome.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates after follow-up review outcome routing.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm matching follow-up review outcome record templates before work resumes, blocks, parks, or closes.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordTemplates` or if a template references an unknown follow-up review outcome.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates entry point or if a template references an unknown follow-up review outcome.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review outcome record template contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.
### Iteration 131: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Checklist

Goal:

Define the audit checklist used after queued PR follow-up review outcome record templates, so template match, required inputs, traceable body, owned next action, and default-path boundary are reviewed before follow-up work resumes, blocks, parks, or closes.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review outcome record audit checklist entries to `scripts/triage-contracts.mjs`.
- Cover outcome/template match, required-input completeness, record-body traceability, next-action ownership, and default-path boundary audits.
- Tie every audit checklist entry to known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates through its template scope.
- Record audit item, template scope, review question, required evidence, pass condition, missing action, and record guidance for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Checklist under 0.2.0 Accuracy Work Intake, between Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria pass the audit checklist after follow-up review outcome records exist.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm the audit checklist passed before follow-up work resumes, blocks, parks, or closes.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Checklist.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so follow-up review outcome record audits stay synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review outcome record audit item, template scope, review question, required evidence, pass condition, missing action, and required record.
- Every queued PR follow-up review outcome record audit checklist entry references known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Templates.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Checklist after outcome records exist.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm the audit checklist before work resumes, blocks, parks, or closes.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Checklist as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditChecklist` or if an audit item references an unknown outcome record template.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Checklist entry point or if an audit item references an unknown outcome record template.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Checklist entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review outcome record audit checklist contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.
### Iteration 132: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Routing

Goal:

Define routing after queued PR follow-up review outcome record audits, so passed audits, stale records, release blockers, parked follow-ups, and blocked close/resume requests each leave one visible next route.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review outcome record audit outcome routing entries to `scripts/triage-contracts.mjs`.
- Cover audit passed, refresh outcome record, escalate audit blocker, keep follow-up parked, and block close or resume outcomes.
- Tie every audit outcome routing entry to known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Checklist items through its audit scope.
- Record outcome, audit scope, applies-when condition, required evidence, route, maintainer action, and record guidance for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Routing under 0.2.0 Accuracy Work Intake, between the audit checklist and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria route audit results before follow-up work resumes, blocks, parks, closes, or refreshes records.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm the audit outcome routing result.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Routing.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so audit outcome routing stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review outcome record audit outcome, audit scope, applies-when condition, required evidence, route, maintainer action, and record.
- Every queued PR follow-up review outcome record audit outcome routing entry references known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Checklist items.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Routing after audit checklist review.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm the audit outcome routing result before passed audits, record refreshes, blocker escalations, parked follow-ups, or close/resume decisions proceed.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Routing as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRouting` or if an audit outcome references an unknown audit checklist item.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Routing entry point or if an audit outcome references an unknown audit checklist item.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Routing entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review outcome record audit outcome routing contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.
### Iteration 133: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates

Goal:

Define the record templates used after queued PR follow-up review outcome record audit outcome routing, so passed audits, record refreshes, blocker escalations, parked follow-ups, and blocked close/resume decisions capture required inputs, record body, and follow-up before work continues.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review outcome record audit outcome record templates to `scripts/triage-contracts.mjs`.
- Cover audit passed continuation, outcome record refresh, audit blocker escalation, parked follow-up audit, and close or resume blocked audit records.
- Tie every audit outcome record template to known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Routing outcomes.
- Record template, outcome, use-when condition, required inputs, record body, and follow-up guidance for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates under 0.2.0 Accuracy Work Intake, between audit outcome routing and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria require audit outcome record templates after audit outcome routing.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm the matching audit outcome record template.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so audit outcome record templates stay synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review outcome record audit outcome record template, outcome, use-when condition, required inputs, record body, and follow-up.
- Every queued PR follow-up review outcome record audit outcome record template references a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Routing outcome.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates after audit outcome routing.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm the matching audit outcome record template before audit outcome work continues.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordTemplates` or if a template references an unknown audit outcome.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates entry point or if a template references an unknown audit outcome.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review outcome record audit outcome record templates contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.
### Iteration 134: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Checklist

Goal:

Define the closeout checklist used after queued PR follow-up review outcome record audit outcome record templates, so completed records are checked for allowed continuation, enforceable blocks, parked ownership, and default-path verification before audit outcome work continues.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout checklist entries to `scripts/triage-contracts.mjs`.
- Cover record completeness, allowed continuation, enforceable escalation or block, parked or blocked ownership, and default-path verification closeout.
- Tie every closeout checklist entry to known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates through its template scope.
- Record item, template scope, applies-when condition, required evidence, pass condition, missing action, and record guidance for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Checklist under 0.2.0 Accuracy Work Intake, between audit outcome record templates and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria require closeout after audit outcome records exist.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm the audit outcome record closeout checklist.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Checklist.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so audit outcome record closeout stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review outcome record audit outcome record closeout item, template scope, applies-when condition, required evidence, pass condition, missing action, and record.
- Every queued PR follow-up review outcome record audit outcome record closeout checklist entry references known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Templates.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Checklist after audit outcome records exist.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm the closeout checklist before continuing, pausing, escalating, parking, closing, or resuming audit outcome work.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Checklist as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutChecklist` or if a closeout item references an unknown audit outcome record template.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Checklist entry point or if a closeout item references an unknown audit outcome record template.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Checklist entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout checklist contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.
### Iteration 135: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Templates

Goal:

Define the record templates used after queued PR follow-up review outcome record audit outcome record closeout, so completion, continuation, enforceable blocks, parked ownership, and default-path verification decisions capture required inputs, record body, and follow-up.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record templates to `scripts/triage-contracts.mjs`.
- Cover closeout completion, allowed continuation, escalation/block, parked or blocked ownership, and default-path verification closeout records.
- Tie every closeout record template to known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Checklist items.
- Record template, item, use-when condition, required inputs, record body, and follow-up guidance for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Templates under 0.2.0 Accuracy Work Intake, between closeout checklist and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria require closeout record templates after closeout.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm the matching closeout record template.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Templates.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so closeout record templates stay synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review outcome record audit outcome record closeout record template, item, use-when condition, required inputs, record body, and follow-up.
- Every queued PR follow-up review outcome record audit outcome record closeout record template references a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Checklist item.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Templates after closeout.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm the matching closeout record template before closeout work continues.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Templates as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates` or if a template references an unknown closeout item.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Templates entry point or if a template references an unknown closeout item.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Templates entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record templates contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 136: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules

Goal:

Define refresh rules for queued PR follow-up review outcome record audit outcome record closeout records, so stale source evidence, routes, owners, blockers, parked status, and default-path verification cannot support continuation, closure, resume, parking, blocking, or escalation.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh rules to `scripts/triage-contracts.mjs`.
- Cover closeout source record changes, continuation route changes, blocker or escalation evidence changes, parked or blocked ownership changes, and default-path verification evidence changes.
- Tie every refresh rule to a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Templates entry.
- Record trigger, record template, refresh condition, update record guidance, rerun command guidance, and stale-block condition for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules under 0.2.0 Accuracy Work Intake, between closeout record templates and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria require refresh rules before stale closeout records support closure or continuation.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm stale closeout records were refreshed before closure or continuation.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so closeout record refresh rules stay synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review outcome record audit outcome record closeout record refresh rule, record template, refresh condition, update record guidance, rerun guidance, and stale-block condition.
- Every queued PR follow-up review outcome record audit outcome record closeout record refresh rule references a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Templates entry.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules whenever stale closeout evidence changes.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm stale closeout records were refreshed before closure or continuation.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules` or if a refresh rule references an unknown closeout record template.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules entry point or if a refresh rule references an unknown closeout record template.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh rules contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 137: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence

Goal:

Define the review cadence for refreshed queued PR follow-up review outcome record audit outcome record closeout records, so refreshed closeout records are reviewed, routed, and recorded before they support continuation, closure, resume, parking, blocking, or escalation.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review cadence to `scripts/triage-contracts.mjs`.
- Cover closeout source refresh, continuation route refresh, blocker evidence refresh, parked ownership refresh, and default-path verification refresh reviews.
- Tie every refresh review cadence entry to a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules trigger.
- Record review name, refresh rule, cadence, required inputs, stale condition, route, maintainer action, and record guidance for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence under 0.2.0 Accuracy Work Intake, between closeout record refresh rules and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria require refresh review cadence before refreshed closeout records support closure or continuation.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm refreshed closeout records were reviewed, routed, and recorded.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so refresh review cadence stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review outcome record audit outcome record closeout record refresh review cadence entry, refresh rule, cadence, required inputs, stale condition, route, maintainer action, and record guidance.
- Every queued PR follow-up review outcome record audit outcome record closeout record refresh review cadence entry references a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules trigger.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence whenever refreshed closeout records support continuation, closure, resume, parking, blocking, or escalation.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm refreshed closeout records were reviewed, routed, and recorded before closure or continuation.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewCadence` or if a cadence entry references an unknown refresh rule.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence entry point or if a cadence entry references an unknown refresh rule.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review cadence contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 138: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing

Goal:

Define routing outcomes after refreshed queued PR follow-up review outcome record audit outcome record closeout records are reviewed, so refresh review results land in one accepted, refresh-again, blocked, parked, or closed route before continuation, closure, resume, parking, blocking, or escalation proceeds.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome routing to `scripts/triage-contracts.mjs`.
- Cover accepted refreshed closeout records, refresh-again decisions, blocked or escalated closeouts, parked or deferred refreshed closeouts, and close or supersede outcomes.
- Tie every routing entry to known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence review names through its review scope.
- Record outcome, review scope, applies-when condition, required evidence, route, maintainer action, and record guidance for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing under 0.2.0 Accuracy Work Intake, between refresh review cadence and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria require outcome routing before refreshed closeouts are accepted, refreshed again, blocked, parked, closed, or superseded.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm the refresh review outcome routing result.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so refresh review outcome routing stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome routing entry, review scope, applies-when condition, required evidence, route, maintainer action, and record guidance.
- Every queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome routing entry references known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence review names.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing whenever refreshed closeouts are accepted, refreshed again, blocked, parked, closed, or superseded.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm the refresh review outcome routing result.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRouting` or if a routing entry references an unknown refresh review cadence entry.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing entry point or if a routing entry references an unknown refresh review cadence entry.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome routing contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 139: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates

Goal:

Define record templates after queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome routing, so accepted, refresh-again, blocked, parked, and closed refreshed closeout outcomes capture required inputs, record body, and follow-up.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record templates to `scripts/triage-contracts.mjs`.
- Cover accepted refreshed closeout records, refresh-again closeout records, blocked refreshed closeout records, parked refreshed closeout records, and closed or superseded refreshed closeout records.
- Tie every outcome record template to a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing outcome.
- Record template, outcome, use-when condition, required inputs, record body, and follow-up guidance for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates under 0.2.0 Accuracy Work Intake, between refresh review outcome routing and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria require the matching refresh review outcome record template after outcome routing.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm the matching refresh review outcome record template.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so refresh review outcome record templates stay synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record template, outcome, use-when condition, required inputs, record body, and follow-up.
- Every queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record template references a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing outcome.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates after outcome routing.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm the matching refresh review outcome record template before closure or continuation.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordTemplates` or if a template references an unknown refresh review outcome.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates entry point or if a template references an unknown refresh review outcome.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record templates contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 140: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist

Goal:

Define an audit checklist after queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record templates, so refreshed closeout outcome records are checked for template match, input completeness, traceability, ownership, and default-path boundary before closure or continuation relies on them.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit checklist to `scripts/triage-contracts.mjs`.
- Cover refresh review outcome template match, required input completeness, record body traceability, owner and follow-up clarity, and default-path boundary preservation.
- Tie every checklist row to the known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates entries.
- Record item, template scope, review question, required evidence, pass condition, missing-action guidance, and record guidance for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist under 0.2.0 Accuracy Work Intake, between refresh review outcome record templates and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria require the audit checklist after refresh review outcome records exist.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm the refreshed closeout outcome record audit checklist before continuation, closure, resume, parking, blocking, or escalation.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so refresh review outcome record audit checklist entries stay synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit checklist item, template scope, review question, required evidence, pass condition, missing-action guidance, and record guidance.
- Every queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit checklist entry references known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates entries.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist after refresh review outcome records exist.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm the refreshed closeout outcome record audit checklist before closure or continuation.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditChecklist` or if a checklist entry references an unknown refresh review outcome record template.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist entry point or if a checklist entry references an unknown refresh review outcome record template.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit checklist contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 141: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing

Goal:

Define outcome routing after queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit checklist, so passed refreshed outcome audits, stale record refreshes, blocker escalations, parked closeouts, and blocked close/continuation requests land in one visible route.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing to `scripts/triage-contracts.mjs`.
- Cover refreshed outcome record audit passed, refresh refreshed outcome record, escalate refreshed outcome record blocker, keep refreshed closeout parked, and block closeout close or continuation routes.
- Tie every routing entry to known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist items through its audit scope.
- Record outcome, audit scope, applies-when condition, required evidence, route target, maintainer action, and record guidance for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing under 0.2.0 Accuracy Work Intake, between the audit checklist and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria require the matching audit outcome route after refreshed closeout outcome record audits.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm the refreshed closeout outcome record audit outcome route.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so audit outcome routing entries stay synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome route, audit scope, applies-when condition, required evidence, route target, maintainer action, and record guidance.
- Every queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing entry references known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist items.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing after refreshed outcome record audits.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm the refreshed closeout outcome record audit outcome route before closure or continuation.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRouting` or if a routing entry references an unknown refreshed outcome record audit checklist item.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing entry point or if a routing entry references an unknown refreshed outcome record audit checklist item.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 142: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates

Goal:

Define record templates after queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing, so passed refreshed audits, record refreshes, blocker escalations, parked closeouts, and blocked close/continuation requests capture required inputs, record body, and follow-up.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record templates to `scripts/triage-contracts.mjs`.
- Cover refreshed outcome audit pass records, refreshed outcome record refresh records, refreshed outcome blocker escalation records, refreshed closeout parked records, and closeout close or continuation blocked records.
- Tie every record template to a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing outcome.
- Record template, outcome, use-when condition, required inputs, record body, and follow-up guidance for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates under 0.2.0 Accuracy Work Intake, between audit outcome routing and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so PR triage and closing criteria require the matching refreshed audit outcome record template after audit outcome routing.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm the refreshed audit outcome record template.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so audit outcome record templates stay synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record template, outcome, use-when condition, required inputs, record body, and follow-up.
- Every queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record template references a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing outcome.
- `docs/TRIAGE.md` points PR triage and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates after audit outcome routing.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm the refreshed audit outcome record template before closure or continuation.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordTemplates` or if a template references an unknown refreshed audit outcome.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates entry point or if a template references an unknown refreshed audit outcome.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record templates contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.


### Iteration 143: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist

Goal:

Define a closeout checklist after queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record templates, so refreshed audit outcome records are complete, allowed closeout or continuation is explicit, blocker escalation is enforceable, parked state is owned, and default-path verification is recorded before closure or continuation proceeds.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist entries to `scripts/triage-contracts.mjs`.
- Cover refreshed audit outcome record completion, allowed closeout or continuation, enforceable blockers or escalation, owned parked or blocked refreshed state, and default-path verification closeout.
- Tie every checklist entry to known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates.
- Record item, template scope, applies-when condition, required evidence, pass condition, missing-action guidance, and record guidance for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist under 0.2.0 Accuracy Work Intake, between refreshed audit outcome record templates and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so top guidance, PR triage, and closing criteria require the closeout checklist after refreshed audit outcome record templates.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm the closeout checklist before closure or continuation.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so the closeout checklist stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist item, template scope, applies-when condition, required evidence, pass condition, missing action, and record guidance.
- Every checklist entry references known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates.
- `docs/TRIAGE.md` points top guidance, PR triage, and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist after refreshed audit outcome record templates.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm the closeout checklist before closure or continuation.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutChecklist` or if a checklist item references an unknown refreshed audit outcome record template.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist entry point or if a checklist item references an unknown refreshed audit outcome record template.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.


### Iteration 144: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates

Goal:

Define record templates after queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist, so completion, allowed closeout or continuation, blocker escalation, parked state, and default-path verification decisions capture required inputs, record body, and follow-up.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record templates to `scripts/triage-contracts.mjs`.
- Cover refreshed audit outcome closeout completion records, allowed refreshed closeout or continuation records, refreshed blocker or escalation closeout records, parked refreshed state closeout records, and default-path refreshed verification closeout records.
- Tie every closeout record template to a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist item.
- Record template, item, use-when condition, required inputs, record body, and follow-up guidance for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates under 0.2.0 Accuracy Work Intake, between the closeout checklist and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so top guidance, PR triage, and closing criteria require the matching closeout record template after the closeout checklist.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm the closeout record template before closure or continuation.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so closeout record templates stay synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record template, item, use-when condition, required inputs, record body, and follow-up.
- Every closeout record template references a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist item.
- `docs/TRIAGE.md` points top guidance, PR triage, and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates after the closeout checklist.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm the closeout record template before closure or continuation.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates` or if a template references an unknown closeout checklist item.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates entry point or if a template references an unknown closeout checklist item.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record templates contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.


### Iteration 145: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules

Goal:

Define refresh rules after queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record templates, so stale refreshed audit outcome source evidence, allowed closeout routes, blockers, parked ownership, and default-path verification are refreshed before closure or continuation relies on them.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rules to `scripts/triage-contracts.mjs`.
- Cover refreshed audit outcome source changes, allowed refreshed closeout route changes, refreshed blocker or escalation evidence changes, parked refreshed ownership changes, and default-path refreshed verification evidence changes.
- Tie every refresh rule to a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates entry.
- Record trigger, record template, refresh condition, update record guidance, rerun command, and stale blocker for each rule.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules under 0.2.0 Accuracy Work Intake, between refreshed audit outcome closeout record templates and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so top guidance, PR triage, and closing criteria require the refresh rules after refreshed audit outcome closeout record templates.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm stale refreshed audit outcome closeout evidence is refreshed before closure or continuation.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so closeout record refresh rules stay synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rule trigger, record template, refresh condition, update record guidance, rerun command, and stale blocker.
- Every refresh rule references a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates entry.
- `docs/TRIAGE.md` points top guidance, PR triage, and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules after the closeout record templates.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to refresh stale refreshed audit outcome closeout evidence before closure or continuation.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules` or if a refresh rule references an unknown refreshed audit outcome closeout record template.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules entry point or if a refresh rule references an unknown refreshed audit outcome closeout record template.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rules contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.


### Iteration 146: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence

Goal:

Define review cadence after queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rules, so refreshed audit outcome closeout record refreshes are reviewed before closure, continuation, review resume, parking, blocking, supersede, or escalation relies on them.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review cadence to `scripts/triage-contracts.mjs`.
- Cover refreshed audit outcome source refresh review, allowed refreshed closeout route refresh review, refreshed blocker evidence refresh review, parked refreshed state ownership refresh review, and default-path refreshed verification refresh review.
- Tie every cadence entry to a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules trigger.
- Record review, refresh rule, cadence, required inputs, stale condition, route target, maintainer action, and record guidance for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence under 0.2.0 Accuracy Work Intake, between refreshed audit outcome closeout record refresh rules and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so top guidance, PR triage, and closing criteria require the cadence after refreshed audit outcome closeout record refresh rules.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm refreshed audit outcome closeout refreshes were reviewed before closure or continuation.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so refresh review cadence stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review cadence entry, refresh rule, cadence, required inputs, stale condition, route target, maintainer action, and record guidance.
- Every cadence entry references a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules trigger.
- `docs/TRIAGE.md` points top guidance, PR triage, and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence after refresh rules.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm refreshed audit outcome closeout refreshes were reviewed before closure or continuation.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewCadence` or if a cadence entry references an unknown refresh rule.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence entry point or if a cadence entry references an unknown refresh rule.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review cadence contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 147: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing

Goal:

Define outcome routing after queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review cadence, so refreshed audit outcome closeout refresh reviews land in one accepted, refresh-again, blocked, parked, closed, or superseded state before closure or continuation relies on them.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome routing to `scripts/triage-contracts.mjs`.
- Cover accept refreshed audit outcome closeout refresh, refresh refreshed audit outcome closeout again, escalate or keep refreshed audit outcome closeout blocked, park or defer refreshed audit outcome closeout, and close or supersede refreshed audit outcome closeout.
- Tie every routing entry to known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence review names through its review scope.
- Record outcome, review scope, applies-when condition, required evidence, route target, maintainer action, and record guidance for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing under 0.2.0 Accuracy Work Intake, between refreshed audit outcome closeout record refresh review cadence and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so top guidance, PR triage, and closing criteria require outcome routing after refreshed audit outcome closeout record refresh review cadence.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm refreshed audit outcome closeout refresh reviews have a routed outcome before closure or continuation.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so outcome routing stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome routing entry, review scope, applies-when condition, required evidence, route target, maintainer action, and record guidance.
- Every routing entry references known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence review names.
- `docs/TRIAGE.md` points top guidance, PR triage, and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing after refresh review cadence.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm refreshed audit outcome closeout refresh reviews have a routed outcome before closure or continuation.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRouting` or if a routing entry references an unknown refresh review cadence entry.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing entry point or if a routing entry references an unknown refresh review cadence entry.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome routing contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 148: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates

Goal:

Define record templates after queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome routing, so every accepted, refresh-again, blocked, parked, closed, or superseded refreshed audit outcome closeout refresh leaves required inputs, record body, and follow-up before closure or continuation relies on it.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record templates to `scripts/triage-contracts.mjs`.
- Cover accepted refreshed audit outcome closeout refresh record, refresh-again refreshed audit outcome closeout record, blocked refreshed audit outcome closeout refresh record, parked refreshed audit outcome closeout refresh record, and closed or superseded refreshed audit outcome closeout refresh record.
- Tie every template to a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing outcome.
- Record template, outcome, use-when condition, required inputs, record body, and follow-up guidance for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates under 0.2.0 Accuracy Work Intake, between refresh review outcome routing and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so top guidance, PR triage, and closing criteria require the matching outcome record template after refreshed audit outcome closeout refresh review outcome routing.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm refreshed audit outcome closeout refresh review outcomes have matching record templates before closure or continuation.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so outcome record templates stay synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record template, outcome, use-when condition, required inputs, record body, and follow-up.
- Every template references a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Routing outcome.
- `docs/TRIAGE.md` points top guidance, PR triage, and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates after outcome routing.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm refreshed audit outcome closeout refresh review outcomes have matching record templates before closure or continuation.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordTemplates` or if a template references an unknown outcome.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates entry point or if a template references an unknown outcome.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record templates contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 149: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist

Goal:

Define an audit checklist after queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record templates, so every accepted, refresh-again, blocked, parked, closed, or superseded refreshed audit outcome closeout refresh review outcome record is checked for template match, required inputs, traceability, ownership, and default-path boundary before closure or continuation relies on it.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit checklist to `scripts/triage-contracts.mjs`.
- Cover refreshed audit outcome template matches route, required refreshed audit outcome inputs are complete, refreshed audit outcome record body is traceable, refreshed audit outcome owner and follow-up are explicit, and default-path boundary is recorded.
- Tie every audit checklist template scope to a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates entry.
- Record item, template scope, review question, required evidence, pass condition, missing-evidence action, and record guidance for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist under 0.2.0 Accuracy Work Intake, between outcome record templates and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so top guidance, PR triage, and closing criteria require the audit checklist after refreshed audit outcome closeout refresh review outcome record templates.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm refreshed audit outcome closeout refresh review outcome records pass the audit checklist before closure or continuation.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so the audit checklist stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit checklist item, template scope, review question, required evidence, pass condition, missing-evidence action, and record guidance.
- Every checklist template scope references a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Templates entry.
- `docs/TRIAGE.md` points top guidance, PR triage, and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist after outcome record templates.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm refreshed audit outcome closeout refresh review outcome records pass the audit checklist before closure or continuation.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditChecklist` or if an audit checklist template scope references an unknown template.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist entry point or if a checklist references an unknown template.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit checklist contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 150: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing

Goal:

Define outcome routing after queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit checklist, so accepted audits, refreshed records, blocker escalations, parked or deferred outcomes, and closed or superseded refreshed audit outcome closeout refresh review outcomes land in one visible route before closure or continuation proceeds.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing to `scripts/triage-contracts.mjs`.
- Cover accept refreshed audit outcome closeout refresh review outcome record audit, refresh refreshed audit outcome closeout refresh review outcome record, escalate or keep refreshed audit outcome closeout refresh review outcome blocked, park or defer refreshed audit outcome closeout refresh review outcome, and close or supersede refreshed audit outcome closeout refresh review outcome.
- Tie every routing entry to known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist items through its review scope.
- Record outcome, review scope, applies-when condition, required evidence, route, maintainer action, and record guidance for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing under 0.2.0 Accuracy Work Intake, between the audit checklist and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so top guidance, PR triage, and closing criteria require the audit outcome route after refreshed audit outcome closeout refresh review outcome record audits.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm refreshed audit outcome closeout refresh review outcome record audits route before closure or continuation.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so the audit outcome routing stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing outcome, review scope, applies-when condition, required evidence, route, maintainer action, and record guidance.
- Every routing review scope references known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Checklist items.
- `docs/TRIAGE.md` points top guidance, PR triage, and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing after audit checklist review.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm refreshed audit outcome closeout refresh review outcome record audits route before closure or continuation.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRouting` or if a routing review scope references an unknown checklist item.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing entry point or if a routing entry references an unknown checklist item.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 151: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates

Goal:

Define record templates after queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome routing, so accepted audits, refreshed records, blocker escalations, parked or deferred outcomes, and closed or superseded refreshed audit outcome closeout refresh review outcomes consistently capture required inputs, record body, and follow-up before closure or continuation proceeds.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record templates to `scripts/triage-contracts.mjs`.
- Cover accepted refreshed audit outcome closeout refresh review outcome audit record, refresh-needed refreshed audit outcome closeout refresh review outcome audit record, blocked refreshed audit outcome closeout refresh review outcome audit record, parked or deferred refreshed audit outcome closeout refresh review outcome audit record, and closed or superseded refreshed audit outcome closeout refresh review outcome audit record.
- Tie every record template to a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing outcome.
- Record template, outcome, use-when condition, required inputs, record body, and follow-up for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates under 0.2.0 Accuracy Work Intake, between audit outcome routing and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so top guidance, PR triage, and closing criteria require the matching record template after audit outcome routing.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm routed refreshed audit outcome closeout refresh review outcome audits use the matching record template.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so the audit outcome record templates stay synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record template, outcome, use-when condition, required inputs, record body, and follow-up.
- Every template references a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Routing outcome.
- `docs/TRIAGE.md` points top guidance, PR triage, and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates after audit outcome routing.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm routed refreshed audit outcome closeout refresh review outcome audits use matching record templates before closure or continuation.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordTemplates` or if a template references an unknown audit outcome.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates entry point or if a template references an unknown audit outcome.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record templates contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 152: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist

Goal:

Define a closeout checklist after queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record templates, so every accepted, refresh-needed, blocked, parked or deferred, and closed or superseded refreshed audit outcome closeout refresh review outcome audit record is checked for completion, allowed closure or continuation, enforceable blocker/deferral/closure state, ownership, stop conditions, and default-path evidence before closure or continuation relies on it.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist to `scripts/triage-contracts.mjs`.
- Cover audit outcome record completeness, allowed closure or continuation, enforceable blocker/deferral/closure state, follow-up ownership and stop condition, and current default-path closeout evidence.
- Tie every closeout checklist template scope to a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates entry.
- Record item, template scope, applies-when condition, required evidence, pass condition, missing-evidence action, and record guidance for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist under 0.2.0 Accuracy Work Intake, between audit outcome record templates and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so top guidance, PR triage, and closing criteria require the closeout checklist after audit outcome record templates.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm audit outcome records pass the closeout checklist before closure or continuation.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so the closeout checklist stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist item, template scope, applies-when condition, required evidence, pass condition, missing-evidence action, and record guidance.
- Every closeout checklist template scope references a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Templates entry.
- `docs/TRIAGE.md` points top guidance, PR triage, and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist after audit outcome record templates.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm audit outcome records pass the closeout checklist before closure or continuation.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutChecklist` or if a closeout checklist template scope references an unknown template.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist entry point or if a closeout checklist references an unknown template.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 153: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates

Goal:

Define closeout record templates after queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout checklist, so completed records, closure or continuation decisions, blocker/deferral/closure enforcement, ownership stop conditions, and default-path evidence leave required inputs, record body, and follow-up before closure or continuation proceeds.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record templates to `scripts/triage-contracts.mjs`.
- Cover completed audit closeout record, allowed closure or continuation record, enforceable blocker or deferral record, owned follow-up stop-condition record, and current default-path closeout evidence record.
- Tie every closeout record template to a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist item.
- Record template, item, use-when condition, required inputs, record body, and follow-up for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates under 0.2.0 Accuracy Work Intake, between the closeout checklist and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so top guidance, PR triage, and closing criteria require matching closeout record templates after the closeout checklist.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm audit outcome closeout decisions use matching record templates before closure or continuation.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so the closeout record templates stay synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record template, item, use-when condition, required inputs, record body, and follow-up.
- Every closeout record template references a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Checklist item.
- `docs/TRIAGE.md` points top guidance, PR triage, and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates after the closeout checklist.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm audit outcome closeout decisions use matching record templates before closure or continuation.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordTemplates` or if a closeout record template references an unknown closeout checklist item.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates entry point or if a closeout record template references an unknown closeout checklist item.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record templates contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 154: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules

Goal:

Define refresh rules after queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record templates, so stale source evidence, closure or continuation routes, blocker/deferral/closure evidence, ownership, stop conditions, and default-path evidence are refreshed before closure or continuation proceeds.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rules to `scripts/triage-contracts.mjs`.
- Cover refreshed audit outcome closeout source changes, allowed closure or continuation route changes, blocker or deferral evidence changes, follow-up ownership or stop-condition changes, and current default-path closeout evidence changes.
- Tie every refresh rule to a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates entry.
- Record trigger, record template, refresh condition, update record, rerun command guidance, and stale-blocking rule for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules under 0.2.0 Accuracy Work Intake, between closeout record templates and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so top guidance, PR triage, and closing criteria require refresh rules after closeout record templates.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm stale audit outcome closeout records are refreshed before closure or continuation.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so the refresh rules stay synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh trigger, record template, refresh condition, update record, rerun command guidance, and stale-blocking rule.
- Every refresh rule references a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Templates entry.
- `docs/TRIAGE.md` points top guidance, PR triage, and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules after closeout record templates.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm stale audit outcome closeout records are refreshed before closure or continuation.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshRules` or if a refresh rule references an unknown closeout record template.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules entry point or if a refresh rule references an unknown closeout record template.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rules contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.

### Iteration 155: Accuracy Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence

Goal:

Define review cadence after queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh rules, so refreshed audit outcome closeout records are reviewed before closure, continuation, review resume, parking, deferral, supersede, or escalation relies on them.

Status:

Implemented in the MVP codebase.

Scope:

- Add accuracy seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review cadence to `scripts/triage-contracts.mjs`.
- Cover refreshed audit outcome closeout source refresh, allowed closure or continuation route refresh, blocker or deferral evidence refresh, ownership or stop-condition refresh, and current default-path closeout evidence refresh reviews.
- Tie every cadence entry to a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules trigger.
- Record review, refresh rule, cadence, required inputs, stale condition, route, maintainer action, and record guidance for each entry.
- Update `docs/ROADMAP.md` with Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence under 0.2.0 Accuracy Work Intake, between closeout record refresh rules and Accuracy Work Intake Closure Criteria.
- Update `docs/TRIAGE.md` so top guidance, PR triage, escalation/closing guidance, and closing criteria require the refresh review cadence after refresh rules apply.
- Update `.github/PULL_REQUEST_TEMPLATE.md` so seed-routed accuracy PRs confirm refreshed audit outcome closeout records were reviewed before closure, continuation, review resume, parking, deferral, supersede, or escalation.
- Update `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` so launch and contributor workflows mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence.
- Update `scripts/check-triage-doc.mjs`, `scripts/check-github-templates.mjs`, `scripts/check-release-blockers-doc.mjs`, `scripts/check-changelog-doc.mjs`, `scripts/check-contributing-doc.mjs`, and `scripts/check-release-gate-contracts.mjs` so the refresh review cadence stays synchronized with the shared triage contract.

Acceptance:

- `docs/ROADMAP.md` documents each queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review cadence entry, refresh rule, cadence, required inputs, stale condition, route, maintainer action, and record guidance.
- Every refresh review cadence entry references a known Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Rules trigger.
- `docs/TRIAGE.md` points top guidance, PR triage, escalation guidance, and closing criteria to Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence after refresh rules apply.
- `.github/PULL_REQUEST_TEMPLATE.md` asks seed-routed accuracy PRs to confirm refreshed audit outcome closeout records are reviewed before closure, continuation, review resume, parking, deferral, supersede, or escalation.
- `docs/LAUNCH.md`, `CONTRIBUTING.md`, `docs/TECH_STACK.md`, and `CHANGELOG.md` mention Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence as a planning and contribution boundary.
- `pnpm docs:check-triage` fails if Roadmap, Triage, PR template, or Launch drift from `accuracySeedFixtureImplementationQueuedPrFollowUpReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewOutcomeRecordAuditOutcomeRecordCloseoutRecordRefreshReviewCadence` or if a cadence entry references an unknown refresh rule.
- `pnpm docs:check-templates` fails if template-adjacent docs lose the Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence entry point or if a cadence entry references an unknown refresh rule.
- `pnpm docs:check-release-blockers`, `pnpm docs:check-changelog`, and `pnpm docs:check-contributing` fail if Seed Fixture Implementation Queued PR Follow-Up Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Outcome Record Audit Outcome Record Closeout Record Refresh Review Cadence entry points disappear.
- `pnpm release:gates:check` fails if template or triage docs checks stop using the shared seed fixture implementation queued PR follow-up review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review outcome record audit outcome record closeout record refresh review cadence contract.
- Existing build, tests, docs checks, metadata check, release safety, bin smoke, pack dry-run, and verify release stay green.
