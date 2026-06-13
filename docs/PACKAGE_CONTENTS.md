# Bootlane Package Contents

Last updated: 2026-06-08

This document is the human-readable npm artifact contract for the first Bootlane release candidate. It is guarded by `pnpm docs:check-package-contents`, `pnpm pack:dry-run`, and `pnpm verify:release`.

## Scope

Bootlane publishes two public npm packages:

- `@bootlane/core` from `packages/core`: Programmatic analysis engine.
- `bootlane` from `packages/cli`: Executable CLI package.

Root package remains private. Do not publish the workspace root.

Do not add `repository`, `homepage`, or `bugs` fields until the final Bootlane repository URL is confirmed.
`pnpm release-safety:check` fails if those fields are added before the repository decision is complete.

## Shared Manifest Contract

Both publishable packages must keep these manifest fields:

- version: `0.1.0`
- private: `false`
- license: `MIT`
- type: `module`
- engines.node: `>=22.12`
- publishConfig.access: `public`

Both publishable packages must use the same `files` allowlist:

- `dist/**/*.js`
- `dist/**/*.d.ts`
- `dist/**/*.js.map`
- `dist/**/*.d.ts.map`
- `README.md`
- `LICENSE`

This keeps the npm artifacts focused on compiled runtime code, declarations, package metadata, licensing, and package-level documentation.

## Package-Specific Contract

### `@bootlane/core`

Directory: `packages/core`

Description: Core analysis engine for Bootlane repository readiness checks.

Role: Programmatic analysis engine

Required manifest entries:

- `types: ./dist/index.d.ts`
- `exports[.].types: ./dist/index.d.ts`
- `exports[.].import: ./dist/index.js`

Runtime dependencies:

- `fast-glob`
- `zod`

Required packed files:

- `LICENSE`
- `README.md`
- `package.json`
- `dist/index.js`
- `dist/index.d.ts`
- `dist/types.d.ts`
- `dist/reporters/json.js`
- `dist/reporters/markdown.js`
- `dist/fixers/index.js`

Required package README content:

- `Programmatic Usage`
- `Read-Only Contract`
- `renderJsonReport`

### `bootlane`

Directory: `packages/cli`

Description: Check whether a repository is ready to run: docs, dependencies, env vars, tests, secrets, and CI.

Role: Executable CLI package

Required manifest entries:

- `bin.bootlane: ./dist/index.js`
- `types: ./dist/index.d.ts`
- `exports[.].types: ./dist/index.d.ts`
- `exports[.].import: ./dist/index.js`

Runtime dependencies:

- `@bootlane/core`
- `commander`
- `picocolors`

Required packed files:

- `LICENSE`
- `README.md`
- `package.json`
- `dist/index.js`
- `dist/index.d.ts`
- `dist/program.js`
- `dist/terminal.js`

Required package README content:

- `Quick Start`
- `What Bootlane Checks`
- `Output Formats`
- `CI Usage`
- `bootlane.config.json`
- `Fix Previews`
- `Read-Only Contract`
- `--ci --fail-on critical`
- `--print-config`
- `@bootlane/core`

## Release Review

Before publishing:

- Run `pnpm docs:check-package-contents`.
- Run `pnpm pack:dry-run`.
- Run `pnpm verify:release`.
- Run `npm publish --dry-run --access public` from `packages/core`.
- Run `npm publish --dry-run --access public` from `packages/cli`.
- Confirm the `@bootlane/core` package page renders the package README correctly.
- Confirm the `bootlane` package page renders the CLI README correctly.
- Confirm no `.tgz` artifacts remain in `packages/core` or `packages/cli`.

Publish `@bootlane/core` before `bootlane` because the CLI depends on the core package.
