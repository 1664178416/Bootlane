# Bootlane

From clone to run.

Bootlane is an open-source CLI for checking whether a repository is ready to run. It diagnoses setup docs, dependencies, env vars, tests, secrets, and CI readiness, then produces terminal, Markdown, and JSON reports.

## Demo

```bash
npx bootlane
```

Example output:

```text
Bootlane Report

Project: Node + Vite
Package manager: npm
Health score: 77/100 (B)

Critical
- .env.example is missing env.example.missing
  Source code reads environment variables, but .env.example is missing: DATABASE_URL, VITE_API_URL.
  Suggested fix: Add .env.example with DATABASE_URL=, VITE_API_URL=.
```

See the full [example Markdown report](examples/reports/node-missing-env.md).

## Current Status

Bootlane is a 0.1.0 release candidate. The current implementation includes:

- `@bootlane/core`: project detection, scanners, checks, scoring, report models, Markdown/JSON renderers, and dry-run fix proposal generation.
- `bootlane`: CLI entrypoint with terminal, JSON, Markdown, compact `--summary`, diagnostic `--verbose`, CI failure thresholds, and `--output` report artifacts.
- Node readiness checks for setup docs, package-manager metadata, runtime versions, env examples, tests, secrets, and GitHub Actions.
- Python readiness checks for runtime metadata, dependency files, README install/test guidance, env examples, tests, and GitHub Actions.
- Package-manager-aware diagnostics for npm, pnpm, Yarn, Bun, pip, uv, Poetry, and Pipenv projects.
- Dry-run fix previews for `.env.example`, README setup sections, and deterministic GitHub Actions workflows.
- Configuration through `bootlane.config.json` for ignore patterns, failure thresholds, disabled checks, and severity overrides.
- Fixture coverage, report snapshots, synchronized example reports, release evidence snapshots, built CLI smoke tests, package metadata checks, package dry-run content assertions, changelog validation, and one-command release verification.
- Read-only `bootlane check` behavior covered by built CLI smoke tests.

## Usage

Published package usage:

```bash
npx bootlane
npx bootlane check . --summary
npx bootlane check . --verbose
npx bootlane check . --format markdown
npx bootlane check . --format markdown --output bootlane-report.md
npx bootlane check . --format json
npx bootlane check . --print-config
npx bootlane check . --ci --fail-on critical
```

Local development usage:

```bash
pnpm install
pnpm build
node packages/cli/dist/index.js check examples/fixtures/node-good
node packages/cli/dist/index.js check examples/fixtures/node-missing-env --summary
node packages/cli/dist/index.js check examples/fixtures/node-missing-env --verbose
node packages/cli/dist/index.js check examples/fixtures/node-missing-env --format markdown
node packages/cli/dist/index.js check examples/fixtures/node-missing-env --format markdown --output bootlane-report.md
node packages/cli/dist/index.js check examples/fixtures/node-good --format json
node packages/cli/dist/index.js check examples/fixtures/node-configured --ci
node packages/cli/dist/index.js check examples/fixtures/python-good --format json
```

CI mode:

```bash
node packages/cli/dist/index.js check . --ci --fail-on critical
```

When `--output` is used, Bootlane writes the report file before applying the `--ci` exit threshold. This lets CI jobs keep a Markdown or JSON artifact even when findings fail the build.

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

More details: [Configuration](docs/CONFIGURATION.md).

## Fix Preview

JSON reports include dry-run fix proposals when Bootlane can infer safe next steps. Terminal `--verbose` output also shows inline content previews for those proposals.

```bash
node packages/cli/dist/index.js check examples/fixtures/node-missing-env --format json
node packages/cli/dist/index.js check examples/fixtures/node-ci-missing-pnpm --verbose
```

More details: [Fix Preview](docs/FIX_PREVIEW.md).

## Development

```bash
pnpm build
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
pnpm example:report:check
pnpm metadata:check
pnpm release-safety:check
pnpm release-safety:fixtures
pnpm docs:check-release-safety-fixtures
pnpm npm-names:check
pnpm smoke:bin
pnpm pack:dry-run
pnpm verify:release
```

## Contributing

Start with [CONTRIBUTING.md](CONTRIBUTING.md), then read:

- [Architecture](docs/ARCHITECTURE.md)
- [Adding Checks](docs/ADDING_CHECKS.md)
- [Check IDs](docs/CHECK_IDS.md)

## Planning Documents

Implementation should follow these documents:

- [Bootlane Design](docs/BOOTLANE_DESIGN.md)
- [Technical Stack](docs/TECH_STACK.md)
- [Iteration Plan](docs/ITERATION_PLAN.md)
- [Roadmap](docs/ROADMAP.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Adding Checks](docs/ADDING_CHECKS.md)
- [Check IDs](docs/CHECK_IDS.md)
- [Configuration](docs/CONFIGURATION.md)
- [Report Schema](docs/REPORT_SCHEMA.md)
- [Fix Preview](docs/FIX_PREVIEW.md)
- [GitHub Actions](docs/GITHUB_ACTIONS.md)
- [Python Support](docs/PYTHON_SUPPORT.md)
- [Security Policy](SECURITY.md)
- [Quality Gates](docs/QUALITY_GATES.md)
- [Package Contents](docs/PACKAGE_CONTENTS.md)
- [Release Evidence](docs/RELEASE_EVIDENCE.md)
- [Release Evidence Snapshot](docs/RELEASE_EVIDENCE_SNAPSHOT.md)
- [Release Safety Fixtures](docs/RELEASE_SAFETY_FIXTURES.md)
- [Changelog](CHANGELOG.md)
- [Launch Checklist](docs/LAUNCH.md)
- [Triage Guide](docs/TRIAGE.md)
- [Release Notes](docs/RELEASE.md)
- [Release Blockers](docs/RELEASE_BLOCKERS.md)
- [ADR 0001: Initial Architecture and Stack](docs/adr/0001-initial-architecture.md)
