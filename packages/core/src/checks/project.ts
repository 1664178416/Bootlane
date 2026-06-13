import type { Check } from "../types.js";
import { finding } from "./helpers.js";

export const projectCheck: Check = {
  id: "project.detect",
  category: "project",
  appliesTo: () => true,
  async run(context) {
    if (context.project.type !== "unknown") {
      return [];
    }

    return [
      finding({
        id: "project.unknown",
        category: "project",
        title: "Project type could not be detected",
        severity: "critical",
        message: "Bootlane could not find a supported project manifest such as package.json.",
        suggestion: "Run Bootlane in the repository root, or add a supported manifest.",
        confidence: "high"
      })
    ];
  }
};

