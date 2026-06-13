# Bootlane Architecture

Last updated: 2026-06-08

Bootlane is a small TypeScript monorepo with a reusable analysis engine and a CLI wrapper.

## Packages

```text
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
      index.ts
      scoring.ts
      types.ts
  cli/
    src/
      index.ts
      program.ts
      terminal.ts
```

## Runtime Flow

```text
CLI args
  -> load bootlane.config.json
  -> analyzeProject()
  -> list files
  -> detect project
  -> run applicable checks
  -> score findings
  -> generate dry-run fix proposals
  -> render terminal/json/markdown
  -> choose exit code in --ci mode
```

## Core Boundaries

`@bootlane/core` owns:

- Project detection.
- File scanning.
- Readiness checks.
- Finding IDs and report models.
- Scoring.
- Markdown and JSON report rendering.
- Dry-run fix proposals.

`bootlane` owns:

- CLI parsing.
- Terminal output.
- Config file loading from CLI target paths.
- `--ci` exit behavior.
- Writing report output when `--output` is used.

## Detectors

Detectors live in `packages/core/src/detectors`.

Current detectors:

- `node.ts`: detects `package.json`, package manager, and JS framework hints.
- `python.ts`: detects `pyproject.toml`, `requirements.txt`, `uv.lock`, and Python framework hints.
- `project.ts`: combines detectors and returns `unknown` when no supported project type is found.

Detection should stay fast and local. It should not install dependencies, import project code, or execute scripts.

## Signals

Shared signal helpers live in `packages/core/src/signals`.

Current helpers:

- `python.ts`: Python project signals, package-manager metadata, lockfile metadata, and test-file recognition.

Signals are the small, reusable facts that detectors and checks share. Put cross-check heuristics here when two or more checks need the same rule.

## Checks

Checks live in `packages/core/src/checks`.

Each check implements:

```ts
export type Check = {
  id: string;
  category: CheckCategory;
  appliesTo(context: ProjectContext): boolean | Promise<boolean>;
  run(context: ProjectContext): Promise<Finding[]>;
};
```

Checks should:

- Return failed findings only.
- Include stable finding IDs.
- Include actionable suggestions.
- Use `appliesTo` to stay scoped to Node, Python, or cross-project behavior.
- Avoid side effects.

## Reporters

Reporters live in `packages/core/src/reporters`.

Current report formats:

- JSON: automation source of truth.
- Markdown: GitHub issue/PR friendly.
- Terminal: human default from the CLI package.

## Fix Proposals

Fix proposals live in `packages/core/src/fixers`.

They are dry-run metadata and must not write files. Future write behavior should reuse the same proposals, show a diff, and require an explicit write flag.

## Fixtures

Fixtures live in `examples/fixtures`.

Every new behavior should have at least one fixture that proves it. Prefer small synthetic projects over large real-world copies.
