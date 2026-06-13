# Bootlane GitHub Actions

Last updated: 2026-06-08

Bootlane supports CI usage through the CLI:

```bash
bootlane check --ci --fail-on critical
```

## Downstream Project Example

After Bootlane is published to npm, projects can add:

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

## Current Repository CI

Bootlane itself uses:

See [Quality Gates](QUALITY_GATES.md) for the full CI/release gate map.
See [Release Evidence](RELEASE_EVIDENCE.md) for first-publish manual and external evidence.
See [Release Evidence Snapshot](RELEASE_EVIDENCE_SNAPSHOT.md) for the generated first-publish evidence draft.
See [Release Safety Fixtures](RELEASE_SAFETY_FIXTURES.md) for the first-publish drift fixture matrix.

- `actions/checkout@v6`
- `pnpm/action-setup@v6`
- `actions/setup-node@v6`
- Node 22 and Node 24 matrix
- `pnpm install --frozen-lockfile`
- `pnpm build`
- `pnpm example:report:check`
- `pnpm test`
- `pnpm docs:check-contributing`
- `pnpm docs:check-templates`
- `pnpm docs:check-triage`
- `pnpm docs:check-quality-gates`
- `pnpm ci:workflow:check`
- `pnpm docs:check-security`
- `pnpm docs:check-package-contents`
- `pnpm docs:check-release-evidence`
- `pnpm release:evidence:check`
- `pnpm release:gates:check`
- `pnpm docs:check-changelog`
- `pnpm docs:check-ids`
- `pnpm docs:check-release-blockers`
- `pnpm metadata:check`
- `pnpm release-safety:check`
- `pnpm release-safety:fixtures`
- `pnpm docs:check-release-safety-fixtures`
- Built CLI smoke test
- npm package dry-run content validation

## Project CI Signal Checks

Bootlane reports GitHub Actions setup findings for Node and Python projects:

- `ci.github-actions.missing`: no workflow exists.
- `ci.github-actions.no-test`: a workflow exists but Bootlane cannot find a recognizable test command.

Node workflow fix previews can generate minimal workflows for npm, pnpm, Yarn, and Bun projects when Bootlane can infer a lockfile-backed install command, a useful test script, and a deterministic Node version. Version inference checks `engines.node`, Volta `node`, `.nvmrc`, `.node-version`, then the `node` or `nodejs` entry in `.tool-versions`.

Generated Node workflow previews use:

| Package manager | Setup | Install | Test |
| --- | --- | --- | --- |
| npm | None | `npm ci` | `npm run test` |
| pnpm | `corepack enable` | `pnpm install --frozen-lockfile` | `pnpm test` |
| Yarn 1 | `corepack enable` | `yarn install --frozen-lockfile` | `yarn test` |
| Yarn 2+ | `corepack enable` | `yarn install --immutable` | `yarn test` |
| Bun | `oven-sh/setup-bun@v2` | `bun install --frozen-lockfile` | `bun run test` |

Python CI checks only run when Python test files are present. Common commands such as `pytest`, `python -m unittest`, `uv run pytest`, `poetry run pytest`, `pipenv run pytest`, `tox`, and `nox` are recognized.

Python CI suggestions reuse the same setup command helpers as Python README checks and fix previews. When metadata is clear, Bootlane suggests commands such as `uv sync` with `uv run pytest`, `poetry run pytest`, `pipenv run pytest`, `tox`, `nox`, or `python -m unittest`. If test files exist but no supported test tooling is declared, Bootlane keeps the suggestion generic instead of guessing a runner.

Python workflow fix previews also include minimal tool setup before uv, Poetry, or Pipenv commands, using `python -m pip install uv`, `python -m pip install poetry`, or `python -m pip install pipenv` as needed.

Generated Python workflow previews infer `actions/setup-python` versions from `requires-python`, `.python-version`, `runtime.txt`, or the `python` entry in `.tool-versions`, falling back to `3.x` when no deterministic version metadata exists.

## Failure Thresholds

`--ci` makes Bootlane exit with code `1` when findings cross the selected threshold.

| Command | Fails on |
| --- | --- |
| `bootlane check --ci` | Critical findings |
| `bootlane check --ci --fail-on critical` | Critical findings |
| `bootlane check --ci --fail-on warning` | Critical and warning findings |
| `bootlane check --ci --fail-on info` | Critical, warning, and info findings |

`bootlane.config.json` can also set `failOn`, and CLI flags override config values.

## References

- actions/checkout releases: https://github.com/actions/checkout/releases
- actions/setup-node releases: https://github.com/actions/setup-node/releases
- pnpm/action-setup: https://github.com/pnpm/action-setup
