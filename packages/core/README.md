# @bootlane/core

Core analysis engine for Bootlane.

This package provides project detection, checks, scoring, report models, JSON/Markdown renderers, and dry-run fix proposal generation used by the `bootlane` CLI.

Most users should install and run the CLI package:

```bash
npx bootlane
```

## Programmatic Usage

```ts
import { analyzeProject, renderJsonReport, renderMarkdownReport } from "@bootlane/core";

const report = await analyzeProject({
  targetPath: process.cwd()
});

console.log(renderJsonReport(report));
console.log(renderMarkdownReport(report));
```

## What It Checks

- Node setup docs, dependency metadata, runtime versions, env examples, tests, secrets, and GitHub Actions.
- Python runtime metadata, dependency files, README install/test guidance, env examples, tests, and GitHub Actions.
- Package-manager signals for npm, pnpm, Yarn, Bun, pip, uv, Poetry, and Pipenv.
- Dry-run fix proposals for `.env.example`, README setup sections, and deterministic GitHub Actions workflow previews.

## Read-Only Contract

`@bootlane/core` analyzes files and returns reports. It does not install dependencies, execute project scripts, or mutate target repositories during analysis.
