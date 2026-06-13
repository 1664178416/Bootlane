# Adding Checks

Last updated: 2026-06-08

This guide shows how to add a Bootlane readiness check.

## 1. Choose Scope

Decide whether the check applies to:

- Node projects.
- Python projects.
- All projects.

Use `context.project.type` in `appliesTo`.

## 2. Pick IDs

Every check has an internal check ID. Every user-facing issue has a finding ID.

Pattern:

```text
<category>.<subject>.<condition>
```

Examples:

```text
runtime.node-version.missing
readme.python-install.missing
ci.github-actions.no-test
```

Add new IDs to [CHECK_IDS.md](CHECK_IDS.md).

## 3. Implement the Check

Create or update a file in `packages/core/src/checks`.

```ts
import type { Check } from "../types.js";
import { finding } from "./helpers.js";

export const exampleCheck: Check = {
  id: "example.demo",
  category: "project",
  appliesTo: (context) => context.project.type === "node",
  async run(context) {
    if (context.files.includes("demo.txt")) {
      return [];
    }

    return [
      finding({
        id: "project.demo-file.missing",
        category: "project",
        title: "Demo file is missing",
        severity: "info",
        message: "The repo does not include demo.txt.",
        suggestion: "Add demo.txt if this project needs a simple demo marker.",
        confidence: "high"
      })
    ];
  }
};
```

Register it in `packages/core/src/checks/index.ts`.

## 4. Add Fixtures

Add a small fixture under `examples/fixtures`.

Use one fixture for a passing case when practical, and one fixture for a failing case when the behavior is new.

## 5. Add Tests

Update tests in `packages/core/test`.

At minimum, assert:

- The expected finding ID appears.
- Severity is correct.
- Important files/suggestions are present.
- Existing happy-path fixtures still pass.

## 6. Update Docs

Update:

- [CHECK_IDS.md](CHECK_IDS.md)
- [REPORT_SCHEMA.md](REPORT_SCHEMA.md) if report shape changes
- Feature docs when behavior is user-visible

Then run:

```bash
pnpm docs:check-ids
pnpm build
pnpm test
```

## Rules of Thumb

- Prefer high-confidence findings.
- Avoid noisy generic regexes unless they are tightly scoped.
- Do not execute user project code.
- Do not run install, build, or test commands inside target repos.
- Put generated repair ideas in fix proposals, not in mutating behavior.

