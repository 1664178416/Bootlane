import { readEnvExampleNames, scanEnvUsages } from "../scanners/env.js";
import type { Check } from "../types.js";
import { finding } from "./helpers.js";

export const envCheck: Check = {
  id: "env.node",
  category: "env",
  appliesTo: (context) => context.project.type === "node" || context.project.type === "python",
  async run(context) {
    const usages = await scanEnvUsages(context.targetPath, context.files);
    if (usages.length === 0) {
      return [];
    }

    const exampleNames = await readEnvExampleNames(context.targetPath);
    const usedNames = usages.map((usage) => usage.name);
    const sourceFiles = [...new Set(usages.flatMap((usage) => usage.files))].sort((a, b) => a.localeCompare(b));

    if (!exampleNames) {
      return [
        finding({
          id: "env.example.missing",
          category: "env",
          title: ".env.example is missing",
          severity: "critical",
          message: `Source code reads environment variables, but .env.example is missing: ${usedNames.join(", ")}.`,
          suggestion: `Add .env.example with ${usedNames.map((name) => `${name}=`).join(", ")}.`,
          files: sourceFiles,
          confidence: "high"
        })
      ];
    }

    const missing = usages.filter((usage) => !exampleNames.has(usage.name));
    if (missing.length === 0) {
      return [];
    }

    return [
      finding({
        id: "env.example.incomplete",
        category: "env",
        title: ".env.example is incomplete",
        severity: "critical",
        message: `.env.example is missing entries used by source code: ${missing.map((usage) => usage.name).join(", ")}.`,
        suggestion: `Add ${missing.map((usage) => `${usage.name}=`).join(", ")} to .env.example.`,
        files: [".env.example", ...new Set(missing.flatMap((usage) => usage.files))],
        confidence: missing.every((usage) => usage.confidence === "high") ? "high" : "medium"
      })
    ];
  }
};
