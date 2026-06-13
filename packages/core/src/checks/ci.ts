import { readTextFile } from "../files.js";
import { getPythonInstallCommand, getPythonTestCommand, isPythonTestFile } from "../signals/python.js";
import type { Check, ProjectContext } from "../types.js";
import { finding, hasNodeTestCommand, hasPythonTestCommand } from "./helpers.js";

const workflowPattern = /^\.github\/workflows\/.+\.(ya?ml)$/;

export const ciCheck: Check = {
  id: "ci.github-actions",
  category: "ci",
  appliesTo: (context) => context.project.type === "node",
  async run(context) {
    const workflows = context.files.filter((file) => workflowPattern.test(file));
    if (workflows.length === 0) {
      return [
        finding({
          id: "ci.github-actions.missing",
          category: "ci",
          title: "No GitHub Actions workflow found",
          severity: "info",
          message: "The repo does not include a GitHub Actions workflow.",
          suggestion: "Add a workflow that installs dependencies and runs tests on pull requests.",
          confidence: "high"
        })
      ];
    }

    const contents = await Promise.all(workflows.map((workflow) => readTextFile(context.targetPath, workflow)));
    const hasTestCommand = contents.some((content) => content && hasNodeTestCommand(content));

    if (!hasTestCommand && context.project.packageJson?.scripts.test) {
      return [
        finding({
          id: "ci.github-actions.no-test",
          category: "ci",
          title: "GitHub Actions does not appear to run tests",
          severity: "warning",
          message: "A workflow exists, but Bootlane did not find a recognizable test command in it.",
          suggestion: "Add the project test command to the workflow.",
          files: workflows,
          confidence: "medium"
        })
      ];
    }

    return [];
  }
};

export const pythonCiCheck: Check = {
  id: "ci.github-actions.python",
  category: "ci",
  appliesTo: (context) => context.project.type === "python",
  async run(context) {
    const workflows = context.files.filter((file) => workflowPattern.test(file));
    const hasTestFiles = context.files.some(isPythonTestFile);

    if (!hasTestFiles) {
      return [];
    }

    if (workflows.length === 0) {
      return [
        finding({
          id: "ci.github-actions.missing",
          category: "ci",
          title: "No GitHub Actions workflow found",
          severity: "info",
          message: "The Python project has test signals, but no GitHub Actions workflow was found.",
          suggestion: pythonWorkflowSuggestion(context),
          confidence: "medium"
        })
      ];
    }

    const contents = await Promise.all(workflows.map((workflow) => readTextFile(context.targetPath, workflow)));
    const hasTestCommand = contents.some((content) => content && hasPythonTestCommand(content));

    if (!hasTestCommand) {
      return [
        finding({
          id: "ci.github-actions.no-test",
          category: "ci",
          title: "GitHub Actions does not appear to run Python tests",
          severity: "warning",
          message: "A workflow exists, but Bootlane did not find a recognizable Python test command in it.",
          suggestion: pythonWorkflowTestSuggestion(context),
          files: workflows,
          confidence: "medium"
        })
      ];
    }

    return [];
  }
};

function pythonWorkflowSuggestion(context: ProjectContext): string {
  const installCommand = getPythonInstallCommand(context.project.packageManager, context.files);
  const testCommand = getPythonTestCommand(context.project.packageManager, context.project.python?.testTools ?? []);

  if (installCommand && testCommand) {
    return `Add a workflow that runs \`${installCommand}\` and \`${testCommand}\` on pull requests.`;
  }

  if (testCommand) {
    return `Add a workflow that installs Python dependencies and runs \`${testCommand}\` on pull requests.`;
  }

  if (installCommand) {
    return `Add a workflow that runs \`${installCommand}\` and the project Python test command on pull requests.`;
  }

  return "Add a workflow that installs Python dependencies and runs tests on pull requests.";
}

function pythonWorkflowTestSuggestion(context: ProjectContext): string {
  const testCommand = getPythonTestCommand(context.project.packageManager, context.project.python?.testTools ?? []);

  if (testCommand) {
    return `Add \`${testCommand}\` to the workflow.`;
  }

  return "Add the project Python test command to the workflow.";
}
