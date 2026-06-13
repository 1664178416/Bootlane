import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { analyzeProject, renderJsonReport, renderMarkdownReport, type BootlaneReport } from "../src/index.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const fixtureRoot = path.join(repoRoot, "examples", "fixtures");

describe("reporters", () => {
  it("renders stable JSON reports", async () => {
    const report = await normalizedReport("node-missing-env");

    expect(renderJsonReport(report)).toMatchInlineSnapshot(`
      "{
        "schemaVersion": "1",
        "toolVersion": "0.1.0",
        "targetPath": "<target>",
        "project": {
          "type": "node",
          "frameworks": [
            "Vite"
          ],
          "packageManager": "npm",
          "packageJson": {
            "name": "node-missing-env",
            "version": "0.1.0",
            "scripts": {
              "dev": "vite",
              "test": "vitest run"
            },
            "dependencies": {
              "vite": "^6.0.0"
            },
            "devDependencies": {}
          }
        },
        "score": {
          "value": 77,
          "max": 100,
          "grade": "B"
        },
        "findings": [
          {
            "id": "env.example.missing",
            "category": "env",
            "title": ".env.example is missing",
            "severity": "critical",
            "message": "Source code reads environment variables, but .env.example is missing: DATABASE_URL, VITE_API_URL.",
            "suggestion": "Add .env.example with DATABASE_URL=, VITE_API_URL=.",
            "files": [
              "src/index.ts"
            ],
            "confidence": "high",
            "passed": false
          },
          {
            "id": "runtime.node-version.missing",
            "category": "runtime",
            "title": "Node version is not declared",
            "severity": "warning",
            "message": "The repo does not declare which Node.js version users should run.",
            "suggestion": "Add engines.node to package.json or commit .nvmrc/.node-version.",
            "files": [
              "package.json"
            ],
            "confidence": "high",
            "passed": false
          },
          {
            "id": "ci.github-actions.missing",
            "category": "ci",
            "title": "No GitHub Actions workflow found",
            "severity": "info",
            "message": "The repo does not include a GitHub Actions workflow.",
            "suggestion": "Add a workflow that installs dependencies and runs tests on pull requests.",
            "confidence": "high",
            "passed": false
          }
        ],
        "fixProposals": [
          {
            "id": "fix.env-example.create",
            "title": "Create .env.example",
            "description": "Create a sample env file with variables detected in source code.",
            "findingIds": [
              "env.example.missing"
            ],
            "action": {
              "type": "create_file",
              "path": ".env.example",
              "content": "DATABASE_URL=\\nVITE_API_URL=\\n"
            },
            "safety": "safe",
            "confidence": "high"
          }
        ],
        "generatedAt": "2026-06-07T00:00:00.000Z"
      }
      "
    `);
  });

  it("renders stable Markdown reports", async () => {
    const report = await normalizedReport("node-missing-env");

    expect(renderMarkdownReport(report)).toMatchInlineSnapshot(`
      "# Bootlane Report

      Target: \`<target>\`
      Project: Node / Vite / npm
      Health score: **77/100 (B)**
      Generated: 2026-06-07T00:00:00.000Z

      ## Critical

      - **.env.example is missing** \`env.example.missing\`
        Source code reads environment variables, but .env.example is missing: DATABASE_URL, VITE_API_URL.
        Files: \`src/index.ts\`
        Suggestion: Add .env.example with DATABASE_URL=, VITE_API_URL=.

      ## Warnings

      - **Node version is not declared** \`runtime.node-version.missing\`
        The repo does not declare which Node.js version users should run.
        Files: \`package.json\`
        Suggestion: Add engines.node to package.json or commit .nvmrc/.node-version.

      ## Info

      - **No GitHub Actions workflow found** \`ci.github-actions.missing\`
        The repo does not include a GitHub Actions workflow.
        Suggestion: Add a workflow that installs dependencies and runs tests on pull requests.

      ## Fix Previews

      - **Create .env.example** \`fix.env-example.create\`
        Create a sample env file with variables detected in source code.
        Action: \`create_file\` \`.env.example\`
        Related findings: \`env.example.missing\`
        Safety: \`safe\`; Confidence: \`high\`
      "
    `);
  });

  it("redacts secrets in JSON and Markdown reports", async () => {
    const fullSecret = "sk-abcdefghijklmnopqrstuvwxyz0123456789";
    const report = await normalizedReport("node-secret-leak");
    const json = renderJsonReport(report);
    const markdown = renderMarkdownReport(report);

    expect(json).toContain("sk-a...6789");
    expect(markdown).toContain("sk-a...6789");
    expect(json).not.toContain(fullSecret);
    expect(markdown).not.toContain(fullSecret);
  });
});

async function normalizedReport(fixtureName: string): Promise<BootlaneReport> {
  const report = await analyzeProject({
    targetPath: path.join(fixtureRoot, fixtureName),
    now: new Date("2026-06-07T00:00:00.000Z")
  });

  return {
    ...report,
    targetPath: "<target>"
  };
}
