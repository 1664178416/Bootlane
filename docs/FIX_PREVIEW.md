# Bootlane Fix Preview

Last updated: 2026-06-08

Bootlane can include dry-run fix proposals in JSON reports.

Fix preview is intentionally read-only:

- `bootlane check` never writes files.
- Proposals are metadata for humans, CI tools, or a future `bootlane fix` command.
- Each proposal includes the target path and full content snippet that would be created or appended.

Terminal `--verbose` output shows an inline content preview so users can review proposed snippets without switching to JSON. Inline terminal content previews are capped at 40 lines and show the number of hidden lines when truncated. Markdown reports show a compact fix preview summary suitable for GitHub comments.

## Example

```bash
bootlane check . --format json
```

Example `fixProposals` entry:

```json
{
  "id": "fix.env-example.create",
  "title": "Create .env.example",
  "description": "Create a sample env file with variables detected in source code.",
  "findingIds": ["env.example.missing"],
  "action": {
    "type": "create_file",
    "path": ".env.example",
    "content": "DATABASE_URL=\nVITE_API_URL=\n"
  },
  "safety": "safe",
  "confidence": "high"
}
```

## Current Proposal Types

| Proposal | Trigger | Action |
| --- | --- | --- |
| `fix.ci.github-actions.node.create` | Node GitHub Actions workflow is missing and setup commands are deterministic | Create `.github/workflows/ci.yml` |
| `fix.ci.github-actions.python.create` | Python GitHub Actions workflow is missing and setup commands are deterministic | Create `.github/workflows/ci.yml` |
| `fix.env-example.create` | `.env.example` is missing | Create `.env.example` |
| `fix.env-example.append` | `.env.example` is incomplete | Append missing env names |
| `fix.readme.setup.create` | Node or Python README is missing | Create README setup section |
| `fix.readme.setup.append` | Node or Python README is incomplete | Append setup section |

Python README setup previews are generated only when Bootlane can infer deterministic setup commands from project metadata. Python test snippets require both real test files and declared test tooling such as pytest, unittest, tox, or nox.

Node GitHub Actions workflow previews are generated for npm, pnpm, Yarn, and Bun projects when Bootlane can infer a lockfile-backed install command, a useful test script, and a deterministic Node version from `engines.node`, Volta `node`, `.nvmrc`, `.node-version`, or `.tool-versions`. pnpm and Yarn previews include `corepack enable`; Bun previews include `oven-sh/setup-bun@v2`. If version or lockfile metadata is missing, Bootlane keeps the CI finding but does not generate an overconfident workflow snippet.

Python GitHub Actions workflow previews are generated only when Bootlane can infer both install and test commands from metadata. They are marked `review` and remain dry-run metadata.

Python workflow previews infer the `actions/setup-python` version from `requires-python`, `.python-version`, `runtime.txt`, or `.tool-versions`, and use `3.x` when no deterministic version is available.

## Safety Levels

| Safety | Meaning |
| --- | --- |
| `safe` | Low-risk generated content, usually mechanical |
| `review` | Useful generated content that should be reviewed before writing |

Future `bootlane fix` work should reuse these proposals, show a diff, and require an explicit write flag before changing files.
