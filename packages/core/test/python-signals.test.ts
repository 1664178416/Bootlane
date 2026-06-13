import { describe, expect, it } from "vitest";
import {
  detectPythonPackageManagerFromSignals,
  getPythonDependencyFiles,
  getPythonInstallCommand,
  getPythonManagerSignals,
  getPythonTestCommand,
  hasPythonProjectSignal,
  isPythonLockingManager,
  isPythonTestFile,
  pythonLockCommands,
  pythonLockfiles
} from "../src/signals/python.js";

describe("Python signal helpers", () => {
  it("detects Python project and dependency file signals in stable order", () => {
    const files = ["app/main.py", "uv.lock", "pyproject.toml", "requirements.txt", "README.md"];

    expect(hasPythonProjectSignal(files)).toBe(true);
    expect(hasPythonProjectSignal(["app/main.py", "README.md"])).toBe(false);
    expect(getPythonDependencyFiles(files)).toEqual(["pyproject.toml", "requirements.txt", "uv.lock"]);
  });

  it("detects package-manager signals and package-manager precedence", () => {
    const pyproject = `
[project]
name = "demo"

[tool.uv]
package = true

[tool.poetry]
package-mode = true
`;
    const files = ["pyproject.toml", "poetry.lock"];

    expect(getPythonManagerSignals(files, pyproject)).toEqual([
      { manager: "uv", files: ["pyproject.toml"] },
      { manager: "poetry", files: ["poetry.lock", "pyproject.toml"] },
      { manager: "pip", files: ["pyproject.toml"] }
    ]);
    expect(detectPythonPackageManagerFromSignals(files, pyproject)).toBe("uv");
  });

  it("detects Poetry build backend and pyproject-only pip defaults", () => {
    expect(
      detectPythonPackageManagerFromSignals(
        ["pyproject.toml"],
        `
[build-system]
requires = ["poetry-core>=1.9.0"]
build-backend = "poetry.core.masonry.api"
`
      )
    ).toBe("poetry");
    expect(detectPythonPackageManagerFromSignals(["pyproject.toml"], "[project]\nname = \"demo\"")).toBe("pip");
  });

  it("keeps Python lockfile metadata centralized", () => {
    expect(isPythonLockingManager("uv")).toBe(true);
    expect(isPythonLockingManager("pip")).toBe(false);
    expect(pythonLockfiles).toMatchObject({
      uv: "uv.lock",
      poetry: "poetry.lock",
      pipenv: "Pipfile.lock"
    });
    expect(pythonLockCommands).toMatchObject({
      uv: "uv lock",
      poetry: "poetry lock",
      pipenv: "pipenv lock"
    });
  });

  it("returns high-confidence Python setup commands for checks and fix previews", () => {
    expect(getPythonInstallCommand("uv", ["pyproject.toml", "uv.lock"])).toBe("uv sync");
    expect(getPythonInstallCommand("poetry", ["pyproject.toml", "poetry.lock"])).toBe("poetry install");
    expect(getPythonInstallCommand("pipenv", ["Pipfile"])).toBe("pipenv install");
    expect(getPythonInstallCommand("pipenv", ["Pipfile", "Pipfile.lock"])).toBe("pipenv sync");
    expect(getPythonInstallCommand("pip", ["requirements.txt"])).toBe("python -m pip install -r requirements.txt");
    expect(getPythonInstallCommand("pip", ["pyproject.toml"])).toBe("python -m pip install .");
    expect(getPythonInstallCommand("unknown", ["README.md"])).toBeUndefined();

    expect(getPythonTestCommand("uv", ["pytest"])).toBe("uv run pytest");
    expect(getPythonTestCommand("poetry", ["pytest"])).toBe("poetry run pytest");
    expect(getPythonTestCommand("pipenv", ["pytest"])).toBe("pipenv run pytest");
    expect(getPythonTestCommand("pip", ["pytest"])).toBe("python -m pytest");
    expect(getPythonTestCommand("pip", ["unittest"])).toBe("python -m unittest");
    expect(getPythonTestCommand("uv", ["tox"])).toBe("tox");
    expect(getPythonTestCommand("uv", ["nox"])).toBe("nox");
    expect(getPythonTestCommand("pip", [])).toBeUndefined();
  });

  it("recognizes common pytest and unittest file layouts", () => {
    expect(isPythonTestFile("tests/test_app.py")).toBe(true);
    expect(isPythonTestFile("tests/app_test.py")).toBe(true);
    expect(isPythonTestFile("app/test_helpers.py")).toBe(true);
    expect(isPythonTestFile("app/helpers_test.py")).toBe(true);
    expect(isPythonTestFile("tests/__init__.py")).toBe(false);
    expect(isPythonTestFile("app/main.py")).toBe(false);
    expect(isPythonTestFile("tests/test_data.json")).toBe(false);
  });
});
