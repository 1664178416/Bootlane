import { readTextFile } from "../files.js";
import {
  getPythonInstallCommand,
  getPythonManagerSignals,
  getPythonTestCommand,
  isPythonLockingManager,
  isPythonTestFile,
  pythonLockCommands,
  pythonLockfiles
} from "../signals/python.js";
import type { Check, PackageManager } from "../types.js";
import { finding, hasPythonTestCommand } from "./helpers.js";

const readmeCandidates = ["README.md", "readme.md", "README.MD", "README"];
const commandBoundary = String.raw`(?=\s|$|[;&|])`;
const pipProjectTargetPattern = String.raw`(?:(?:["']?\.(?:\[[^\]\s"'<>]+\])?["']?)|\./[^\s"'<>]+)`;
const pipInstallTargetPattern = String.raw`(?:-r\s+requirements\.txt|(?:--editable|-e)\s+${pipProjectTargetPattern}|${pipProjectTargetPattern})`;
const installPattern = new RegExp(
  String.raw`\b(?:pip\s+install\s+${pipInstallTargetPattern}|(?:python|python3|py)\s+-m\s+pip\s+install(?:\s+${pipInstallTargetPattern})?|uv\s+(?:sync|pip\s+install(?:\s+${pipInstallTargetPattern})?)|poetry\s+install|pipenv\s+(?:install|sync))${commandBoundary}`,
  "i"
);
export const pythonRuntimeCheck: Check = {
  id: "runtime.python",
  category: "runtime",
  appliesTo: (context) => context.project.type === "python",
  async run(context) {
    const hasVersion =
      Boolean(context.project.python?.requiresPython) ||
      context.files.includes(".python-version") ||
      context.files.includes("runtime.txt") ||
      context.files.includes(".tool-versions");

    if (hasVersion) {
      return [];
    }

    return [
      finding({
        id: "runtime.python-version.missing",
        category: "runtime",
        title: "Python version is not declared",
        severity: "warning",
        message: "The repo does not declare which Python version users should run.",
        suggestion: "Add requires-python to pyproject.toml or commit .python-version.",
        files: context.files.includes("pyproject.toml") ? ["pyproject.toml"] : undefined,
        confidence: "high"
      })
    ];
  }
};

export const pythonReadmeCheck: Check = {
  id: "readme.python",
  category: "readme",
  appliesTo: (context) => context.project.type === "python",
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

    if (!content || !installPattern.test(content)) {
      findings.push(
        finding({
          id: "readme.python-install.missing",
          category: "readme",
          title: "README does not show how to install Python dependencies",
          severity: "warning",
          message: "The README does not include a recognizable Python install command.",
          suggestion: `Add an install step such as \`${suggestedPythonInstallCommand(context.project.packageManager, context.files)}\`.`,
          files: [readmePath],
          confidence: "medium"
        })
      );
    }

    const testSignals = getPythonTestSignals(context.files, context.project.python?.testTools ?? []);
    if (testSignals.hasTestFiles && (!content || !hasPythonTestCommand(content))) {
      findings.push(
        finding({
          id: "readme.python-test.missing",
          category: "readme",
          title: "README does not show how to run Python tests",
          severity: "warning",
          message: "The repo appears to have Python tests, but README does not document how to run them.",
          suggestion: `Add a test step such as \`${suggestedPythonTestCommand(context.project.packageManager, context.project.python?.testTools ?? [])}\`.`,
          files: [readmePath],
          confidence: "medium"
        })
      );
    }

    return findings;
  }
};

export const pythonDependenciesCheck: Check = {
  id: "dependencies.python",
  category: "dependencies",
  appliesTo: (context) => context.project.type === "python",
  async run(context) {
    const pyproject = await readTextFile(context.targetPath, "pyproject.toml");
    const managerSignals = getPythonManagerSignals(context.files, pyproject);
    const lockfileManagers = managerSignals.filter((signal) => isPythonLockingManager(signal.manager));
    const uniqueLockfileManagers = [...new Set(lockfileManagers.map((signal) => signal.manager))];

    if (uniqueLockfileManagers.length > 1) {
      return [
        finding({
          id: "dependencies.python.package-manager.mismatch",
          category: "dependencies",
          title: "Python dependency metadata points to multiple package managers",
          severity: "warning",
          message: `Bootlane found Python metadata for ${formatList(uniqueLockfileManagers)}. Multiple lockfile-based tools can make installs inconsistent.`,
          suggestion: "Keep one Python package manager metadata set, then regenerate its lockfile.",
          files: lockfileManagers.flatMap((signal) => signal.files),
          confidence: "high"
        })
      ];
    }

    if (!isPythonLockingManager(context.project.packageManager)) {
      return [];
    }

    const expectedLockfile = pythonLockfiles[context.project.packageManager];
    if (context.files.includes(expectedLockfile)) {
      return [];
    }

    return [
      finding({
        id: "dependencies.python.lockfile.missing",
        category: "dependencies",
        title: "Python package manager lockfile is missing",
        severity: "warning",
        message: `Bootlane detected ${context.project.packageManager} metadata, but could not find ${expectedLockfile}.`,
        suggestion: `Run ${pythonLockCommands[context.project.packageManager]} and commit ${expectedLockfile} so installs are reproducible.`,
        files: managerSignals.find((signal) => signal.manager === context.project.packageManager)?.files,
        confidence: "high"
      })
    ];
  }
};

export const pythonTestsCheck: Check = {
  id: "tests.python",
  category: "tests",
  appliesTo: (context) => context.project.type === "python",
  async run(context) {
    const testSignals = getPythonTestSignals(context.files, context.project.python?.testTools ?? []);

    if (testSignals.hasTestFiles) {
      return [];
    }

    if (testSignals.hasDeclaredTestTools) {
      return [
        finding({
          id: "tests.python.tooling-no-files",
          category: "tests",
          title: "Python test tooling is declared but no test files were found",
          severity: "info",
          message: "Bootlane found Python test tooling, but no test files matching common pytest or unittest layouts.",
          suggestion: "Add test files such as `tests/test_app.py` when the project has behavior to cover.",
          files: context.project.python?.dependencyFiles,
          confidence: "medium"
        })
      ];
    }

    return [
      finding({
        id: "tests.python.missing",
        category: "tests",
        title: "No Python test signal found",
        severity: "warning",
        message: "Bootlane could not find Python test files or common test tooling.",
        suggestion: "Add tests with pytest/unittest and document how to run them.",
        confidence: "medium"
      })
    ];
  }
};

function getPythonTestSignals(files: string[], testTools: string[]): {
  hasTestFiles: boolean;
  hasDeclaredTestTools: boolean;
} {
  return {
    hasTestFiles: files.some(isPythonTestFile),
    hasDeclaredTestTools: testTools.length > 0
  };
}

function suggestedPythonInstallCommand(packageManager: PackageManager, files: string[]): string {
  return getPythonInstallCommand(packageManager, files) ?? "python -m pip install -r requirements.txt";
}

function suggestedPythonTestCommand(packageManager: PackageManager, testTools: string[]): string {
  return getPythonTestCommand(packageManager, testTools) ?? "python -m pytest";
}

function formatList(values: string[]): string {
  if (values.length <= 1) {
    return values[0] ?? "";
  }

  return `${values.slice(0, -1).join(", ")} and ${values[values.length - 1]}`;
}
