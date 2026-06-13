import type { Check } from "../types.js";
import { finding } from "./helpers.js";

const placeholderTestScripts = new Set([
  "echo \"Error: no test specified\" && exit 1",
  "echo 'Error: no test specified' && exit 1"
]);

export const testsCheck: Check = {
  id: "tests.node",
  category: "tests",
  appliesTo: (context) => context.project.type === "node",
  async run(context) {
    const testScript = context.project.packageJson?.scripts.test?.trim();

    if (!testScript || placeholderTestScripts.has(testScript)) {
      return [
        finding({
          id: "tests.script.missing",
          category: "tests",
          title: "No useful test script found",
          severity: "warning",
          message: "package.json does not define a useful test script.",
          suggestion: "Add a test script so users and CI can validate the project.",
          files: ["package.json"],
          confidence: "high"
        })
      ];
    }

    return [];
  }
};

