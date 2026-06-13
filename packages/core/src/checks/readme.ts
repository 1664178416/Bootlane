import { readTextFile } from "../files.js";
import type { Check } from "../types.js";
import { finding, hasNodeInstallCommand, hasNodeRunCommand, hasNodeTestCommand, packageManagerRunCommand } from "./helpers.js";

const readmeCandidates = ["README.md", "readme.md", "README.MD", "README"];

const envPattern =
  /\.env(\.example)?|\benvironment\b|\benvironment variables\b|\bVITE_[A-Z0-9_]+\b|\b[A-Z][A-Z0-9_]*_URL\b/i;

export const readmeCheck: Check = {
  id: "readme.node",
  category: "readme",
  appliesTo: (context) => context.project.type === "node",
  async run(context) {
    const readmePath = readmeCandidates.find((candidate) => context.files.includes(candidate));
    if (!readmePath) {
      return [
        finding({
          id: "readme.missing",
          category: "readme",
          title: "README is missing",
          severity: "critical",
          message: "Users need a README to understand how to install and run the project.",
          suggestion: "Add README.md with install, run, test, and environment variable instructions.",
          confidence: "high"
        })
      ];
    }

    const content = await readTextFile(context.targetPath, readmePath);
    const findings = [];

    if (!content || !hasNodeInstallCommand(content)) {
      findings.push(
        finding({
          id: "readme.install.missing",
          category: "readme",
          title: "README does not show how to install dependencies",
          severity: "warning",
          message: "The README does not include a recognizable install command.",
          suggestion: `Add an install step such as \`${context.project.packageManager === "unknown" ? "npm install" : `${context.project.packageManager} install`}\`.`,
          files: [readmePath],
          confidence: "medium"
        })
      );
    }

    if (!content || !hasNodeRunCommand(content)) {
      const scripts = context.project.packageJson?.scripts ?? {};
      const likelyRunScript = scripts.dev ? "dev" : scripts.start ? "start" : undefined;

      findings.push(
        finding({
          id: "readme.run.missing",
          category: "readme",
          title: "README does not show how to run the project",
          severity: "critical",
          message: "The README does not include a recognizable run command.",
          suggestion: likelyRunScript
            ? `Add a run step such as \`${packageManagerRunCommand(context.project.packageManager, likelyRunScript)}\`.`
            : "Add the command users should run after installing dependencies.",
          files: [readmePath],
          confidence: "medium"
        })
      );
    }

    const hasTestScript = Boolean(context.project.packageJson?.scripts.test);
    if (hasTestScript && (!content || !hasNodeTestCommand(content))) {
      findings.push(
        finding({
          id: "readme.test.missing",
          category: "readme",
          title: "README does not show how to run tests",
          severity: "warning",
          message: "package.json defines a test script, but README does not document it.",
          suggestion: `Add a test step such as \`${packageManagerRunCommand(context.project.packageManager, "test")}\`.`,
          files: [readmePath],
          confidence: "medium"
        })
      );
    }

    const hasEnvExample = context.files.includes(".env.example");
    if (hasEnvExample && (!content || !envPattern.test(content))) {
      findings.push(
        finding({
          id: "readme.env.missing",
          category: "readme",
          title: "README does not mention environment variables",
          severity: "warning",
          message: "The repo includes .env.example, but the README does not mention environment setup.",
          suggestion: "Add a short environment setup section that tells users to copy .env.example.",
          files: [readmePath, ".env.example"],
          confidence: "medium"
        })
      );
    }

    return findings;
  }
};
