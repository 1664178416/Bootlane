# Bootlane Report Schema

Last updated: 2026-06-08

Bootlane reports use schema version `1`.

Reports are designed for three consumers:

- Humans reading terminal or Markdown output.
- CI systems deciding whether to fail.
- Tools that parse JSON output for comments, dashboards, or follow-up automation.

## JSON Report

`bootlane check --format json` emits a single JSON object followed by a trailing newline.

```ts
type BootlaneReport = {
  schemaVersion: "1";
  toolVersion: string;
  targetPath: string;
  project: ProjectSummary;
  score: Score;
  findings: Finding[];
  fixProposals: FixProposal[];
  generatedAt: string;
};
```

### Fields

| Field | Type | Meaning |
| --- | --- | --- |
| `schemaVersion` | `"1"` | Report schema version |
| `toolVersion` | `string` | Bootlane CLI/core version that generated the report |
| `targetPath` | `string` | Absolute path of the analyzed repository |
| `project` | `ProjectSummary` | Detected project type, frameworks, package manager, and package metadata |
| `score` | `Score` | Setup readiness score and grade |
| `findings` | `Finding[]` | Sorted list of failed findings |
| `fixProposals` | `FixProposal[]` | Dry-run repair proposals generated from findings |
| `generatedAt` | ISO datetime string | Report generation time |

## Project Summary

```ts
type ProjectSummary = {
  type: "node" | "python" | "unknown";
  frameworks: string[];
  packageManager:
    | "npm"
    | "pnpm"
    | "yarn"
    | "bun"
    | "pip"
    | "uv"
    | "poetry"
    | "pipenv"
    | "unknown";
  packageJson?: PackageJsonSummary;
  python?: PythonProjectSummary;
};
```

`packageJson` and `python` intentionally contain only summary metadata needed by reports. They are not full copies of project manifests.

## Score

```ts
type Score = {
  value: number;
  max: 100;
  grade: "A" | "B" | "C" | "D" | "F";
};
```

Current scoring formula:

- Start at `100`.
- Critical finding: `-15`.
- Warning finding: `-6`.
- Info finding: `-2`.
- Minimum score: `0`.

## Finding

```ts
type Finding = {
  id: string;
  category:
    | "project"
    | "dependencies"
    | "runtime"
    | "readme"
    | "env"
    | "tests"
    | "security"
    | "ci";
  title: string;
  severity: "critical" | "warning" | "info";
  passed: false;
  message: string;
  suggestion?: string;
  files?: string[];
  confidence: "high" | "medium" | "low";
};
```

Stable finding IDs are part of the public contract. They are used by `bootlane.config.json` overrides.

## Fix Proposal

```ts
type FixProposal = {
  id: string;
  title: string;
  description: string;
  findingIds: string[];
  action: {
    type: "create_file" | "append_file";
    path: string;
    content: string;
  };
  safety: "safe" | "review";
  confidence: "high" | "medium" | "low";
};
```

Fix proposals are dry-run metadata. Bootlane does not write files during `check`.

Current proposal types:

- Create or append `.env.example` entries from detected env vars.
- Create or append a README setup section inferred from package metadata.
- Create a GitHub Actions workflow preview for deterministic Node projects.
- Create a GitHub Actions workflow preview for deterministic Python projects.

## Sorting Guarantees

Bootlane sorts failed findings before rendering:

1. Severity: critical, warning, info.
2. Category.
3. Finding ID.
4. Message.

Finding `files` are normalized to forward slashes, de-duplicated, and sorted alphabetically.

## Markdown Report

`bootlane check --format markdown` emits a GitHub-friendly report:

- H1 title.
- Target path, project summary, health score, generated time.
- Findings grouped by severity.
- Stable finding IDs shown inline.
- Files rendered as inline code.
- Suggestions rendered directly below each finding.
- Fix preview summaries rendered after findings when proposals are available.

The Markdown format is intended for GitHub issues, PR comments, and copied support requests. It summarizes fix previews without embedding full generated content. The JSON format remains the source of truth for automation.
