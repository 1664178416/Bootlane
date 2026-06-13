# Bootlane Check IDs

Last updated: 2026-06-08

This catalog lists stable IDs used by Bootlane checks, findings, secret scanners, and fix proposals.

Finding IDs are public because users can reference them in `bootlane.config.json`.

## Internal Check IDs

These IDs identify check modules. They are useful for maintainers, but user configuration normally targets finding IDs.

| ID | Scope | Source |
| --- | --- | --- |
| `ci.github-actions` | Node | `packages/core/src/checks/ci.ts` |
| `ci.github-actions.python` | Python | `packages/core/src/checks/ci.ts` |
| `dependencies.node` | Node | `packages/core/src/checks/dependencies.ts` |
| `dependencies.python` | Python | `packages/core/src/checks/python.ts` |
| `env.node` | Node/Python | `packages/core/src/checks/env.ts` |
| `project.detect` | All | `packages/core/src/checks/project.ts` |
| `readme.node` | Node | `packages/core/src/checks/readme.ts` |
| `readme.python` | Python | `packages/core/src/checks/python.ts` |
| `runtime.node` | Node | `packages/core/src/checks/runtime.ts` |
| `runtime.python` | Python | `packages/core/src/checks/python.ts` |
| `security.secrets` | All | `packages/core/src/checks/security.ts` |
| `tests.node` | Node | `packages/core/src/checks/tests.ts` |
| `tests.python` | Python | `packages/core/src/checks/python.ts` |

## Finding IDs

These IDs appear in reports and can be configured with `bootlane.config.json`.

| ID | Default severity | Meaning |
| --- | --- | --- |
| `ci.github-actions.missing` | info | No GitHub Actions workflow was found |
| `ci.github-actions.no-test` | warning | Workflow exists but does not appear to run tests |
| `dependencies.lockfile.missing` | warning | Node project has no recognized package lockfile |
| `dependencies.package-manager.mismatch` | warning | Declared package manager does not match lockfile metadata |
| `dependencies.python.lockfile.missing` | warning | Python package manager metadata is missing its expected lockfile |
| `dependencies.python.package-manager.mismatch` | warning | Python dependency metadata points to multiple package managers |
| `env.example.incomplete` | critical | `.env.example` exists but misses detected env vars |
| `env.example.missing` | critical | Source reads env vars but `.env.example` is missing |
| `project.unknown` | critical | Bootlane could not detect a supported project type |
| `readme.env.missing` | warning | README does not mention env setup despite `.env.example` |
| `readme.install.missing` | warning | Node README lacks install instructions |
| `readme.missing` | critical | README is missing |
| `readme.python-install.missing` | warning | Python README lacks install instructions |
| `readme.python-test.missing` | warning | Python tests exist but README lacks test instructions |
| `readme.run.missing` | critical | Node README lacks run instructions |
| `readme.test.missing` | warning | Node project has tests but README lacks test instructions |
| `runtime.node-version.missing` | warning | Node version is not declared |
| `runtime.python-version.missing` | warning | Python version is not declared |
| `security.env-file.committed` | critical | A real env file appears committed |
| `security.secret-pattern.detected` | critical | A high-signal secret pattern was detected |
| `tests.python.missing` | warning | Python test signal was not found |
| `tests.python.tooling-no-files` | info | Python test tooling is declared but no test files were found |
| `tests.script.missing` | warning | Node test script is missing or a placeholder |

## Secret Pattern IDs

Secret pattern IDs are internal scanner labels. Findings are grouped into `security.secret-pattern.detected`.

| ID | Meaning |
| --- | --- |
| `security.secret.aws-access-key` | AWS access key ID pattern |
| `security.secret.github-token` | GitHub token pattern |
| `security.secret.openai-key` | OpenAI API key pattern |
| `security.secret.private-key` | Private key block pattern |

## Fix Proposal IDs

Fix proposal IDs appear in JSON reports under `fixProposals`.

| ID | Action |
| --- | --- |
| `fix.ci.github-actions.node.create` | Create a Node GitHub Actions workflow |
| `fix.ci.github-actions.python.create` | Create a Python GitHub Actions workflow |
| `fix.env-example.append` | Append missing entries to `.env.example` |
| `fix.env-example.create` | Create `.env.example` from detected env vars |
| `fix.readme.setup.append` | Append a setup section to README |
| `fix.readme.setup.create` | Create README content with a setup section |
