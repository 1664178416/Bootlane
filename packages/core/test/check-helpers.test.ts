import { describe, expect, it } from "vitest";
import { hasPythonTestCommand } from "../src/checks/helpers.js";

describe("check command helpers", () => {
  it("recognizes direct Python test commands", () => {
    const commands = [
      "pytest",
      "pytest -q",
      "python -m pytest",
      "python3 -m pytest tests",
      "py -m pytest -q",
      "python -m unittest",
      "python -m unittest discover",
      "tox",
      "nox -s tests"
    ];

    for (const command of commands) {
      expect(hasPythonTestCommand(command), command).toBe(true);
    }
  });

  it("recognizes package-manager-wrapped Python test commands", () => {
    const commands = [
      "uv run pytest",
      "uv run python -m pytest",
      "uv run python -m unittest",
      "poetry run pytest",
      "poetry run tox",
      "pipenv run pytest",
      "pipenv run nox"
    ];

    for (const command of commands) {
      expect(hasPythonTestCommand(command), command).toBe(true);
    }
  });

  it("does not treat install or unrelated commands as Python tests", () => {
    const commands = [
      "python -m pip install .",
      "uv sync",
      "poetry install",
      "pipenv sync",
      "python app.py",
      "pytester",
      "notpytest"
    ];

    for (const command of commands) {
      expect(hasPythonTestCommand(command), command).toBe(false);
    }
  });
});
