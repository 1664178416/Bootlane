# Bootlane

From clone to run.

Bootlane is a CLI for checking whether a repository is ready to run. It diagnoses setup docs, dependencies, env vars, tests, secrets, and CI readiness, then produces terminal, Markdown, and JSON reports.

## Quick Start

Run Bootlane from a cloned repository:

```bash
npx bootlane
```

After global or project installation:

```bash
bootlane
bootlane check .
bootlane check ./some-repo
```

`bootlane` defaults to `bootlane check .`.

## Common Commands

```bash
npx bootlane check . --summary
npx bootlane check . --verbose
npx bootlane check . --format markdown
npx bootlane check . --format markdown --output bootlane-report.md
npx bootlane check . --format json
npx bootlane check . --print-config
npx bootlane check . --ci --fail-on critical
```

## What Bootlane Checks

Bootlane currently checks Node and Python repository setup signals:

- Project type and framework hints.
- Package-manager metadata and lockfile consistency.
- Node and Python runtime version metadata.
- README install, run, test, and env guidance.
- Source-code env var usage compared with `.env.example`.
- Test scripts, Python test files, and test-tool metadata.
- Committed `.env` files and high-signal secret patterns.
- GitHub Actions workflows and recognizable test commands.

Bootlane does not install dependencies, run project scripts, call external services, or upload repository contents during `check`.

## Output Formats

Terminal output is the default:

```bash
bootlane check .
```

Use `--summary` for compact local or CI logs:

```bash
bootlane check . --summary
```

Use `--verbose` when you need diagnostic metadata, confidence levels, categories, file paths, and inline dry-run fix preview content:

```bash
bootlane check . --verbose
```

Use Markdown for GitHub issues, pull request comments, and saved report artifacts:

```bash
bootlane check . --format markdown
bootlane check . --format markdown --output bootlane-report.md
```

Use JSON for automation:

```bash
bootlane check . --format json
```

When `--output` is used, Bootlane writes the rendered report to the target file and does not print the full report to stdout.

## CI Usage

`--ci` makes Bootlane exit with code `1` when findings cross the selected threshold. The default threshold is `critical`.

```bash
bootlane check . --ci
bootlane check . --ci --fail-on critical
bootlane check . --ci --fail-on warning
bootlane check . --ci --fail-on info
```

Recommended GitHub Actions step after the package is published:

```yaml
- run: npx bootlane@latest check --ci --fail-on critical --format markdown --output bootlane-report.md
```

`--output` writes the rendered report before CI exit behavior is applied, so failing CI runs can still keep Markdown or JSON artifacts.

## Configuration

Bootlane automatically loads `bootlane.config.json` from the target repository root.

```json
{
  "ignore": ["generated/**"],
  "failOn": "warning",
  "checks": {
    "ci.github-actions.missing": "off",
    "runtime.node-version.missing": "error"
  }
}
```

Use `--config <file>` to load a specific config file. Use `--print-config` to inspect the merged config Bootlane will use.

CLI flags override config file values when both are provided.

## Fix Previews

Bootlane can include dry-run fix proposals in reports when it can infer safe next steps. Current proposals include:

- Creating or appending `.env.example` entries.
- Creating or appending README setup snippets.
- Creating deterministic GitHub Actions workflow previews for Node and Python projects.

Fix previews are report metadata only. `bootlane check` remains read-only and does not write these changes.

JSON reports include full proposal content. Markdown reports summarize proposals. Terminal `--verbose` shows capped inline content previews.

## Read-Only Contract

`bootlane check` must not mutate the repository being analyzed.

It may write only the file explicitly passed with `--output`. Built CLI smoke tests cover this read-only behavior before release.

Future write-capable commands must use an explicit write flow and should be designed around the existing dry-run fix proposal model.

## Exit Codes

| Code | Meaning |
| --- | --- |
| 0 | Completed and did not cross the CI failure threshold |
| 1 | Completed and crossed the CI failure threshold |
| 2 | Invalid CLI usage or config |
| 3 | Unexpected runtime error |

## Package Layout

This package provides the `bootlane` executable and depends on `@bootlane/core` for analysis.

Use `@bootlane/core` directly when you need programmatic access to reports from another Node.js tool.
