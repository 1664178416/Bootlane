import { hasFile } from "../files.js";
import type { PackageManager } from "../types.js";

export const pythonProjectSignals = [
  "pyproject.toml",
  "requirements.txt",
  "uv.lock",
  "poetry.lock",
  "Pipfile",
  "Pipfile.lock",
  "setup.py",
  "setup.cfg"
] as const;

export const pythonLockingManagers = ["uv", "poetry", "pipenv"] as const;

export type PythonSignalPackageManager = Extract<PackageManager, "uv" | "poetry" | "pipenv" | "pip">;
export type PythonLockingPackageManager = (typeof pythonLockingManagers)[number];

export type PythonManagerSignal = {
  manager: PythonSignalPackageManager;
  files: string[];
};

export const pythonLockfiles: Record<PythonLockingPackageManager, string> = {
  uv: "uv.lock",
  poetry: "poetry.lock",
  pipenv: "Pipfile.lock"
};

export const pythonLockCommands: Record<PythonLockingPackageManager, string> = {
  uv: "uv lock",
  poetry: "poetry lock",
  pipenv: "pipenv lock"
};

export function hasPythonProjectSignal(files: string[], fileSet?: ReadonlySet<string>): boolean {
  const lookup = fileSet ?? files;
  return pythonProjectSignals.some((signal) => hasFile(lookup, signal));
}

export function getPythonDependencyFiles(files: string[], fileSet?: ReadonlySet<string>): string[] {
  const lookup = fileSet ?? files;
  return pythonProjectSignals.filter((signal) => hasFile(lookup, signal));
}

export function detectPythonPackageManagerFromSignals(
  files: string[],
  pyproject?: string,
  fileSet?: ReadonlySet<string>
): PackageManager {
  const signals = getPythonManagerSignals(files, pyproject, fileSet);

  for (const manager of ["uv", "poetry", "pipenv", "pip"] satisfies PythonSignalPackageManager[]) {
    if (signals.some((signal) => signal.manager === manager)) {
      return manager;
    }
  }

  return "unknown";
}

export function getPythonManagerSignals(
  files: string[],
  pyproject?: string,
  fileSet?: ReadonlySet<string>
): PythonManagerSignal[] {
  const pyprojectContent = pyproject ?? "";
  const lookup = fileSet ?? files;
  const signals: PythonManagerSignal[] = [];
  const uvFiles = [
    ...(hasFile(lookup, "uv.lock") ? ["uv.lock"] : []),
    ...(hasTomlSection(pyprojectContent, "tool.uv") ? ["pyproject.toml"] : [])
  ];
  const poetryFiles = [
    ...(hasFile(lookup, "poetry.lock") ? ["poetry.lock"] : []),
    ...(hasTomlSection(pyprojectContent, "tool.poetry") || /\bpoetry-core\b/i.test(pyprojectContent)
      ? ["pyproject.toml"]
      : [])
  ];
  const pipenvFiles = [
    ...(hasFile(lookup, "Pipfile") ? ["Pipfile"] : []),
    ...(hasFile(lookup, "Pipfile.lock") ? ["Pipfile.lock"] : [])
  ];
  const pipFiles = [
    ...(hasFile(lookup, "requirements.txt") ? ["requirements.txt"] : []),
    ...(hasFile(lookup, "setup.py") ? ["setup.py"] : []),
    ...(hasFile(lookup, "setup.cfg") ? ["setup.cfg"] : []),
    ...(hasFile(lookup, "pyproject.toml") ? ["pyproject.toml"] : [])
  ];

  if (uvFiles.length > 0) {
    signals.push({ manager: "uv", files: uvFiles });
  }

  if (poetryFiles.length > 0) {
    signals.push({ manager: "poetry", files: poetryFiles });
  }

  if (pipenvFiles.length > 0) {
    signals.push({ manager: "pipenv", files: pipenvFiles });
  }

  if (pipFiles.length > 0) {
    signals.push({ manager: "pip", files: pipFiles });
  }

  return signals;
}

export function isPythonLockingManager(packageManager: PackageManager): packageManager is PythonLockingPackageManager {
  return pythonLockingManagers.includes(packageManager as PythonLockingPackageManager);
}

export function getPythonInstallCommand(
  packageManager: PackageManager,
  files: string[],
  fileSet?: ReadonlySet<string>
): string | undefined {
  const lookup = fileSet ?? files;

  switch (packageManager) {
    case "uv":
      return "uv sync";
    case "poetry":
      return "poetry install";
    case "pipenv":
      return hasFile(lookup, "Pipfile.lock") ? "pipenv sync" : "pipenv install";
    case "pip":
      if (hasFile(lookup, "requirements.txt")) {
        return "python -m pip install -r requirements.txt";
      }

      if (hasFile(lookup, "pyproject.toml") || hasFile(lookup, "setup.py") || hasFile(lookup, "setup.cfg")) {
        return "python -m pip install .";
      }

      return undefined;
    case "unknown":
    default:
      return undefined;
  }
}

export function getPythonTestCommand(packageManager: PackageManager, testTools: string[]): string | undefined {
  if (testTools.includes("tox")) {
    return "tox";
  }

  if (testTools.includes("nox")) {
    return "nox";
  }

  if (testTools.includes("unittest")) {
    return wrapPythonTestCommand(packageManager, "python -m unittest");
  }

  if (testTools.includes("pytest")) {
    return wrapPythonTestCommand(packageManager, "pytest");
  }

  return undefined;
}

export function isPythonTestFile(file: string): boolean {
  if (!file.endsWith(".py")) {
    return false;
  }

  const normalized = file.replace(/\\/g, "/");
  const fileName = normalized.split("/").pop() ?? "";

  return fileName !== "__init__.py" && (/^test.*\.py$/.test(fileName) || /_test\.py$/.test(fileName));
}

function wrapPythonTestCommand(packageManager: PackageManager, command: string): string {
  switch (packageManager) {
    case "uv":
      return `uv run ${command}`;
    case "poetry":
      return `poetry run ${command}`;
    case "pipenv":
      return `pipenv run ${command}`;
    case "pip":
    case "unknown":
    default:
      return command === "pytest" ? "python -m pytest" : command;
  }
}

function hasTomlSection(content: string, section: string): boolean {
  const escaped = section.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`^\\s*\\[${escaped}(?:\\]|\\.)`, "m").test(content);
}
