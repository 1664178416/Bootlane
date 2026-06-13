# ADR 0001: Initial Architecture and Stack

Date: 2026-06-07

## Status

Accepted for initial implementation.

## Context

Bootlane needs to become an open-source CLI that can diagnose whether a cloned repository is ready to run. The first release should focus on Node.js projects and produce terminal, Markdown, and JSON reports.

The project should be easy to install with `npx bootlane`, easy to test with fixtures, and easy to extend with more checks later.

## Decision

Use a small pnpm workspace with two packages:

- `@bootlane/core` for project detection, checks, scoring, and report models.
- `bootlane` for the CLI executable and terminal output.

Use Node.js + TypeScript, ESM modules, `tsc -b` for builds, commander for CLI parsing, fast-glob for file discovery, zod for config validation, picocolors for output color, and Vitest for tests.

Support Node `>=22.12` and test on Node 22 and Node 24.

Do not use a bundler in the first implementation. Publish compiled JavaScript and runtime dependencies.

## Consequences

Benefits:

- Keeps the analysis engine independent from terminal/UI concerns.
- Makes fixture-driven tests straightforward.
- Avoids early bundler complexity.
- Leaves room for a future GitHub Action or web UI to reuse the core package.

Tradeoffs:

- Package install size may be larger than a bundled single-file CLI.
- ESM-only support may exclude older Node environments.
- The public `@bootlane/core` API must be treated carefully if published early.

Follow-up:

- Revisit bundling only after measuring startup time and install size.
- Revisit minimum Node version when Node 26 becomes LTS.
- Add separate ADRs for config format, env scanning strategy, and GitHub Action packaging.

