import { readTextFile } from "../files.js";
import {
  detectPythonPackageManagerFromSignals,
  getPythonDependencyFiles,
  hasPythonProjectSignal
} from "../signals/python.js";
import type { ProjectSummary, PythonProjectSummary } from "../types.js";

export async function detectPythonProject(targetPath: string, files: string[]): Promise<ProjectSummary | undefined> {
  if (!hasPythonProjectSignal(files)) {
    return undefined;
  }

  const pyproject = await readTextFile(targetPath, "pyproject.toml");
  const requirements = await readTextFile(targetPath, "requirements.txt");
  const pipfile = await readTextFile(targetPath, "Pipfile");
  const metadataText = `${pyproject ?? ""}\n${requirements ?? ""}\n${pipfile ?? ""}`;

  const summary: PythonProjectSummary = {
    name: extractTomlString(pyproject, "name"),
    version: extractTomlString(pyproject, "version"),
    requiresPython: extractRequiresPython(pyproject, pipfile),
    dependencyFiles: getPythonDependencyFiles(files),
    testTools: detectTestTools(metadataText)
  };

  return {
    type: "python",
    frameworks: detectFrameworks(metadataText),
    packageManager: detectPythonPackageManagerFromSignals(files, pyproject),
    python: summary
  };
}

function detectFrameworks(text: string): string[] {
  const rules: Array<[string, RegExp]> = [
    ["FastAPI", /\bfastapi\b/i],
    ["Django", /\bdjango\b/i],
    ["Flask", /\bflask\b/i],
    ["Streamlit", /\bstreamlit\b/i]
  ];

  return rules.filter(([, pattern]) => pattern.test(text)).map(([label]) => label);
}

function detectTestTools(text: string): string[] {
  const tools: Array<[string, RegExp]> = [
    ["pytest", /\bpytest\b/i],
    ["unittest", /\bunittest\b/i],
    ["tox", /\btox\b/i],
    ["nox", /\bnox\b/i]
  ];

  return tools.filter(([, pattern]) => pattern.test(text)).map(([label]) => label);
}

function extractTomlString(content: string | undefined, key: string): string | undefined {
  if (!content) {
    return undefined;
  }

  const match = new RegExp(`^\\s*${key}\\s*=\\s*["']([^"']+)["']`, "m").exec(content);
  return match?.[1];
}

function extractRequiresPython(pyproject?: string, pipfile?: string): string | undefined {
  return extractTomlString(pyproject, "requires-python") ?? extractTomlString(pipfile, "python_version");
}
