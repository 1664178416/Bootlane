import type { BootlaneReport } from "@bootlane/core";
import { describe, expect, it } from "vitest";
import { renderTerminalReport } from "../src/terminal.js";

const report: BootlaneReport = {
  schemaVersion: "1",
  toolVersion: "0.1.0",
  targetPath: "<target>",
  project: {
    type: "node",
    frameworks: ["Vite"],
    packageManager: "npm"
  },
  score: {
    value: 77,
    max: 100,
    grade: "B"
  },
  findings: [
    {
      id: "env.example.missing",
      category: "env",
      title: ".env.example is missing",
      severity: "critical",
      passed: false,
      message: "Source code reads environment variables, but .env.example is missing: DATABASE_URL.",
      suggestion: "Add .env.example with DATABASE_URL=.",
      files: ["src/index.ts"],
      confidence: "high"
    },
    {
      id: "runtime.node-version.missing",
      category: "runtime",
      title: "Node version is not declared",
      severity: "warning",
      passed: false,
      message: "The repo does not declare which Node.js version users should run.",
      suggestion: "Add engines.node to package.json or commit .nvmrc/.node-version.",
      files: ["package.json"],
      confidence: "high"
    },
    {
      id: "ci.github-actions.missing",
      category: "ci",
      title: "No GitHub Actions workflow found",
      severity: "info",
      passed: false,
      message: "The repo does not include a GitHub Actions workflow.",
      suggestion: "Add a workflow that installs dependencies and runs tests on pull requests.",
      confidence: "high"
    }
  ],
  fixProposals: [
    {
      id: "fix.env-example.create",
      title: "Create .env.example",
      description: "Create a sample env file with variables detected in source code.",
      findingIds: ["env.example.missing"],
      action: {
        type: "create_file",
        path: ".env.example",
        content: "DATABASE_URL=\n"
      },
      safety: "safe",
      confidence: "high"
    }
  ],
  generatedAt: "2026-06-07T00:00:00.000Z"
};

describe("terminal reporter", () => {
  it("renders compact summary output", () => {
    const output = renderTerminalReport(report, { color: false, mode: "summary" });

    expect(output).toContain("Findings: 1 critical, 1 warning, 1 info");
    expect(output).toContain("Fix previews: 1 available");
    expect(output).not.toContain(".env.example is missing");
  });

  it("renders verbose diagnostic details and fix previews", () => {
    const output = renderTerminalReport(report, { color: false, mode: "verbose" });

    expect(output).toContain("Category: env; Confidence: high");
    expect(output).toContain("Fix previews");
    expect(output).toContain("Action: create_file .env.example");
    expect(output).toContain("Content preview:");
    expect(output).toContain("    DATABASE_URL=");
    expect(output).toContain("Related findings: env.example.missing");
  });

  it("caps verbose fix preview content", () => {
    const baseProposal = report.fixProposals[0];
    if (!baseProposal) {
      throw new Error("Expected test report to include a fix proposal");
    }

    const longContent = `${Array.from({ length: 43 }, (_, index) => `LINE_${index + 1}`).join("\n")}\n`;
    const output = renderTerminalReport(
      {
        ...report,
        fixProposals: [
          {
            ...baseProposal,
            action: {
              ...baseProposal.action,
              content: longContent
            }
          }
        ]
      },
      { color: false, mode: "verbose" }
    );

    expect(output).toContain("    LINE_1");
    expect(output).toContain("    LINE_40");
    expect(output).not.toContain("    LINE_41");
    expect(output).toContain("    ... (3 more lines)");
  });

  it("does not print full secrets in terminal output", () => {
    const fullSecret = "sk-abcdefghijklmnopqrstuvwxyz0123456789";
    const redactedSecret = "sk-a...6789";
    const output = renderTerminalReport(
      {
        ...report,
        findings: [
          {
            id: "security.secret-pattern.detected",
            category: "security",
            title: "Potential secret detected",
            severity: "critical",
            passed: false,
            message: `OpenAI API key in .env:1 (${redactedSecret})`,
            suggestion: "Rotate the secret if it was real, remove it from history, and use environment variables instead.",
            files: [".env"],
            confidence: "high"
          }
        ],
        fixProposals: []
      },
      { color: false, mode: "verbose" }
    );

    expect(output).toContain(redactedSecret);
    expect(output).not.toContain(fullSecret);
  });
});
