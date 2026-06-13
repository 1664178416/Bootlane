import { fileExists } from "../files.js";
import type { Check } from "../types.js";
import { finding } from "./helpers.js";

export const runtimeCheck: Check = {
  id: "runtime.node",
  category: "runtime",
  appliesTo: (context) => context.project.type === "node",
  async run(context) {
    const packageJson = context.project.packageJson;
    const hasEnginesNode = Boolean(packageJson?.engines?.node);
    const hasVoltaNode = Boolean(packageJson?.volta?.node);
    const hasNodeVersionFile =
      (await fileExists(context.targetPath, ".nvmrc")) ||
      (await fileExists(context.targetPath, ".node-version")) ||
      (await fileExists(context.targetPath, ".tool-versions"));

    if (hasEnginesNode || hasVoltaNode || hasNodeVersionFile) {
      return [];
    }

    return [
      finding({
        id: "runtime.node-version.missing",
        category: "runtime",
        title: "Node version is not declared",
        severity: "warning",
        message: "The repo does not declare which Node.js version users should run.",
        suggestion: "Add engines.node to package.json or commit .nvmrc/.node-version.",
        files: ["package.json"],
        confidence: "high"
      })
    ];
  }
};
