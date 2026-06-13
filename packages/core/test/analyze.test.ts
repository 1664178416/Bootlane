import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { analyzeProject, renderMarkdownReport } from "../src/index.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const fixtureRoot = path.join(repoRoot, "examples", "fixtures");

describe("analyzeProject", () => {
  it("reports a healthy Node fixture without failing findings", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "node-good"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    expect(report.project.type).toBe("node");
    expect(report.project.packageManager).toBe("pnpm");
    expect(report.project.frameworks).toContain("Vite");
    expect(report.findings).toEqual([]);
    expect(report.score.value).toBe(100);
  });

  it("accepts common npm ci setup docs without README false positives", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "node-npm-ci"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    expect(report.project.type).toBe("node");
    expect(report.project.packageManager).toBe("npm");
    expect(report.findings).toEqual([]);
    expect(report.score.value).toBe(100);
  });

  it("accepts pnpm run script docs and workflow commands", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "node-pnpm-run-commands"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    expect(report.project.type).toBe("node");
    expect(report.project.packageManager).toBe("pnpm");
    expect(report.findings).toEqual([]);
    expect(report.score.value).toBe(100);
  });

  it("reports declared package managers without matching lockfiles", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "node-pnpm-missing-lock"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    const dependencyFinding = report.findings.find((finding) => finding.id === "dependencies.lockfile.missing");

    expect(report.project.packageManager).toBe("pnpm");
    expect(dependencyFinding?.message).toContain("package.json declares pnpm");
    expect(dependencyFinding?.message).toContain("pnpm-lock.yaml");
    expect(dependencyFinding?.suggestion).toContain("pnpm install");
    expect(report.findings.map((finding) => finding.id)).toEqual(["dependencies.lockfile.missing"]);
  });

  it("reports declared package managers that conflict with lockfile metadata", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "node-pnpm-npm-lock-mismatch"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    const dependencyFinding = report.findings.find((finding) => finding.id === "dependencies.package-manager.mismatch");

    expect(report.project.packageManager).toBe("pnpm");
    expect(dependencyFinding?.message).toContain("package.json declares pnpm");
    expect(dependencyFinding?.message).toContain("pnpm-lock.yaml");
    expect(dependencyFinding?.message).toContain("package-lock.json");
    expect(dependencyFinding?.suggestion).toContain("pnpm install");
    expect(dependencyFinding?.files).toEqual(["package-lock.json", "package.json"]);
    expect(report.findings.map((finding) => finding.id)).toEqual(["dependencies.package-manager.mismatch"]);
  });

  it("detects missing .env.example entries", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "node-missing-env"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    const ids = report.findings.map((finding) => finding.id);
    expect(ids).toContain("env.example.missing");
    expect(ids).toContain("runtime.node-version.missing");

    const envFinding = report.findings.find((finding) => finding.id === "env.example.missing");
    expect(envFinding?.message).toContain("DATABASE_URL");
    expect(envFinding?.message).toContain("VITE_API_URL");
    expect(report.fixProposals).toContainEqual(
      expect.objectContaining({
        id: "fix.env-example.create",
        action: {
          type: "create_file",
          path: ".env.example",
          content: "DATABASE_URL=\nVITE_API_URL=\n"
        }
      })
    );
    expect(report.score.value).toBeLessThan(100);
  });

  it("ignores comment-only Node env references", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "node-env-comments"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    expect(report.project.type).toBe("node");
    expect(report.findings).toEqual([]);
    expect(report.fixProposals).toEqual([]);
    expect(report.score.value).toBe(100);
  });

  it("detects Node env fallback reads without treating string examples as usages", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "node-env-fallbacks"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    const envFinding = report.findings.find((finding) => finding.id === "env.example.missing");

    expect(envFinding?.message).toContain("API_BASE_URL");
    expect(envFinding?.message).toContain("DATABASE_URL");
    expect(envFinding?.message).toContain("VITE_PUBLIC_URL");
    expect(envFinding?.message).not.toContain("STRING_ONLY_TOKEN");
    expect(envFinding?.message).not.toContain("VITE_STRING_ONLY");
    expect(report.fixProposals).toContainEqual(
      expect.objectContaining({
        id: "fix.env-example.create",
        action: {
          type: "create_file",
          path: ".env.example",
          content: "API_BASE_URL=\nDATABASE_URL=\nVITE_PUBLIC_URL=\n"
        }
      })
    );
  });

  it("detects committed env files and secret patterns", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "node-secret-leak"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    const ids = report.findings.map((finding) => finding.id);
    const secretFinding = report.findings.find((finding) => finding.id === "security.secret-pattern.detected");

    expect(ids).toContain("security.env-file.committed");
    expect(ids).toContain("security.secret-pattern.detected");
    expect(secretFinding?.message).toContain("OpenAI API key");
    expect(secretFinding?.message).toContain("sk-a...6789");
    expect(secretFinding?.message).not.toContain("sk-abcdefghijklmnopqrstuvwxyz0123456789");
  });

  it("renders Markdown reports", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "node-missing-env"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    const markdown = renderMarkdownReport(report);
    expect(markdown).toContain("# Bootlane Report");
    expect(markdown).toContain("env.example.missing");
  });

  it("generates README setup fix proposals without writing files", async () => {
    const targetPath = path.join(fixtureRoot, "node-readme-gaps");
    const readmePath = path.join(targetPath, "README.md");
    const before = await readFile(readmePath, "utf8");

    const report = await analyzeProject({
      targetPath,
      now: new Date("2026-06-07T00:00:00.000Z")
    });
    const after = await readFile(readmePath, "utf8");

    expect(report.findings.map((finding) => finding.id)).toEqual(
      expect.arrayContaining(["readme.install.missing", "readme.run.missing", "readme.test.missing"])
    );
    expect(report.fixProposals).toContainEqual(
      expect.objectContaining({
        id: "fix.readme.setup.append",
        findingIds: ["readme.install.missing", "readme.run.missing", "readme.test.missing"],
        action: expect.objectContaining({
          type: "append_file",
          path: "README.md",
          content: expect.stringContaining("npm run dev")
        })
      })
    );
    expect(after).toBe(before);
  });

  it("does not create .env.example while generating fix proposals", async () => {
    const targetPath = path.join(fixtureRoot, "node-missing-env");

    await analyzeProject({
      targetPath,
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    await expect(access(path.join(targetPath, ".env.example"))).rejects.toThrow();
  });

  it("generates Node CI workflow previews from deterministic package metadata", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "node-ci-missing"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    const proposal = report.fixProposals.find((item) => item.id === "fix.ci.github-actions.node.create");
    const expectedWorkflow = [
      "name: CI",
      "",
      "on:",
      "  pull_request:",
      "  push:",
      "    branches: [main]",
      "",
      "permissions:",
      "  contents: read",
      "",
      "jobs:",
      "  test:",
      "    runs-on: ubuntu-latest",
      "    steps:",
      "      - uses: actions/checkout@v4",
      "      - uses: actions/setup-node@v4",
      "        with:",
      '          node-version: "22.12"',
      "      - run: npm ci",
      "      - run: npm run test"
    ].join("\n");

    expect(report.project.type).toBe("node");
    expect(report.project.packageManager).toBe("npm");
    expect(report.findings.map((finding) => finding.id)).toEqual(["ci.github-actions.missing"]);
    expect(proposal).toMatchObject({
      findingIds: ["ci.github-actions.missing"],
      action: {
        type: "create_file",
        path: ".github/workflows/ci.yml",
        content: `${expectedWorkflow}\n`
      }
    });
  });

  it("infers Node CI workflow preview versions from local version files", async () => {
    const fixtures: Array<[string, string]> = [
      ["node-ci-missing-nvmrc", "20.11.1"],
      ["node-ci-missing-node-version-file", "21.7.3"],
      ["node-ci-missing-tool-versions", "22.13.1"]
    ];

    for (const [fixture, nodeVersion] of fixtures) {
      const report = await analyzeProject({
        targetPath: path.join(fixtureRoot, fixture),
        now: new Date("2026-06-07T00:00:00.000Z")
      });

      const proposal = report.fixProposals.find((item) => item.id === "fix.ci.github-actions.node.create");

      expect(report.project.type, fixture).toBe("node");
      expect(report.findings.map((finding) => finding.id), fixture).toEqual(["ci.github-actions.missing"]);
      expect(proposal?.action.content, fixture).toContain(`node-version: "${nodeVersion}"`);
      expect(proposal?.action.content, fixture).toContain("npm ci");
      expect(proposal?.action.content, fixture).toContain("npm run test");
    }
  });

  it("does not generate Node CI workflow previews without version metadata", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "node-ci-missing-version-metadata"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    expect(report.project.type).toBe("node");
    expect(report.findings.map((finding) => finding.id)).toEqual([
      "runtime.node-version.missing",
      "ci.github-actions.missing"
    ]);
    expect(report.fixProposals.find((item) => item.id === "fix.ci.github-actions.node.create")).toBeUndefined();
  });

  it("generates Node CI workflow previews from package-manager lockfile metadata", async () => {
    const fixtures: Array<[string, string, string, string, string[]]> = [
      ["node-ci-missing-pnpm", "pnpm", "pnpm install --frozen-lockfile", "pnpm test", ["corepack enable"]],
      ["node-ci-missing-yarn", "yarn", "yarn install --immutable", "yarn test", ["corepack enable"]],
      [
        "node-ci-missing-bun",
        "bun",
        "bun install --frozen-lockfile",
        "bun run test",
        ["oven-sh/setup-bun@v2"]
      ]
    ];

    for (const [fixture, packageManager, installCommand, testCommand, setupSignals] of fixtures) {
      const report = await analyzeProject({
        targetPath: path.join(fixtureRoot, fixture),
        now: new Date("2026-06-07T00:00:00.000Z")
      });

      const proposal = report.fixProposals.find((item) => item.id === "fix.ci.github-actions.node.create");

      expect(report.project.type, fixture).toBe("node");
      expect(report.project.packageManager, fixture).toBe(packageManager);
      expect(report.findings.map((finding) => finding.id), fixture).toEqual(["ci.github-actions.missing"]);
      expect(proposal?.action.content, fixture).toContain('node-version: "22.12"');
      expect(proposal?.action.content, fixture).toContain(installCommand);
      expect(proposal?.action.content, fixture).toContain(testCommand);

      for (const setupSignal of setupSignals) {
        expect(proposal?.action.content, fixture).toContain(setupSignal);
      }
    }
  });

  it("reports a healthy Python fixture without failing findings", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "python-good"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    expect(report.project.type).toBe("python");
    expect(report.project.packageManager).toBe("uv");
    expect(report.project.frameworks).toContain("FastAPI");
    expect(report.project.python).toMatchObject({
      name: "python-good",
      version: "0.1.0",
      requiresPython: ">=3.12"
    });
    expect(report.findings).toEqual([]);
  });

  it("accepts Python module command README examples without false positives", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "python-module-commands"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    expect(report.project.type).toBe("python");
    expect(report.project.packageManager).toBe("pip");
    expect(report.findings).toEqual([]);
    expect(report.score.value).toBe(100);
  });

  it("accepts uv pip and uv run README command variants", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "python-uv-command-variants"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    expect(report.project.type).toBe("python");
    expect(report.project.packageManager).toBe("uv");
    expect(report.findings).toEqual([]);
    expect(report.score.value).toBe(100);
  });

  it("accepts broader Python README install command variants", async () => {
    const fixtures = [
      "python-pip-editable-install",
      "python-pip-directory-install",
      "python-pipenv-sync",
      "python-poetry-install-options"
    ];

    for (const fixture of fixtures) {
      const report = await analyzeProject({
        targetPath: path.join(fixtureRoot, fixture),
        now: new Date("2026-06-07T00:00:00.000Z")
      });

      expect(report.project.type).toBe("python");
      expect(report.findings).toEqual([]);
      expect(report.score.value).toBe(100);
    }
  });

  it("generates Python README install fix proposals without writing files", async () => {
    const targetPath = path.join(fixtureRoot, "python-pyproject-missing-install-docs");
    const readmePath = path.join(targetPath, "README.md");
    const before = await readFile(readmePath, "utf8");

    const report = await analyzeProject({
      targetPath,
      now: new Date("2026-06-07T00:00:00.000Z")
    });
    const after = await readFile(readmePath, "utf8");

    const readmeFinding = report.findings.find((finding) => finding.id === "readme.python-install.missing");

    expect(report.project.type).toBe("python");
    expect(report.project.packageManager).toBe("pip");
    expect(readmeFinding?.suggestion).toContain("python -m pip install .");
    expect(report.findings.map((finding) => finding.id)).toEqual(["readme.python-install.missing"]);
    expect(report.fixProposals).toContainEqual(
      expect.objectContaining({
        id: "fix.readme.setup.append",
        findingIds: ["readme.python-install.missing"],
        action: expect.objectContaining({
          type: "append_file",
          path: "README.md",
          content: expect.stringContaining("python -m pip install .")
        })
      })
    );
    expect(after).toBe(before);
  });

  it("generates package-manager-aware Python README setup fix proposals", async () => {
    const targetPath = path.join(fixtureRoot, "python-readme-setup-uv-gaps");
    const readmePath = path.join(targetPath, "README.md");
    const before = await readFile(readmePath, "utf8");

    const report = await analyzeProject({
      targetPath,
      now: new Date("2026-06-07T00:00:00.000Z")
    });
    const after = await readFile(readmePath, "utf8");

    expect(report.project.type).toBe("python");
    expect(report.project.packageManager).toBe("uv");
    expect(report.findings.map((finding) => finding.id)).toEqual([
      "readme.python-install.missing",
      "readme.python-test.missing"
    ]);
    expect(report.fixProposals).toContainEqual(
      expect.objectContaining({
        id: "fix.readme.setup.append",
        findingIds: ["readme.python-install.missing", "readme.python-test.missing"],
        action: expect.objectContaining({
          type: "append_file",
          path: "README.md",
          content: expect.stringContaining("uv sync")
        })
      })
    );
    expect(report.fixProposals[0]?.action.content).toContain("uv run pytest");
    expect(after).toBe(before);
  });

  it("does not generate Python README test previews without test tooling metadata", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "python-readme-test-no-tool"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    const readmeFinding = report.findings.find((finding) => finding.id === "readme.python-test.missing");

    expect(report.project.type).toBe("python");
    expect(readmeFinding?.suggestion).toContain("python -m pytest");
    expect(report.findings.map((finding) => finding.id)).toEqual(["readme.python-test.missing"]);
    expect(report.fixProposals).toEqual([]);
  });

  it("accepts unittest-style Python test layouts", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "python-unittest-layout"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    expect(report.project.type).toBe("python");
    expect(report.findings).toEqual([]);
    expect(report.score.value).toBe(100);
  });

  it("suggests Python README test commands from project metadata", async () => {
    const fixtures: Array<[string, string]> = [
      ["python-readme-test-uv", "uv run pytest"],
      ["python-readme-test-poetry", "poetry run pytest"],
      ["python-readme-test-pipenv", "pipenv run pytest"],
      ["python-readme-test-tox", "tox"],
      ["python-readme-test-nox", "nox"],
      ["python-readme-test-unittest", "python -m unittest"]
    ];

    for (const [fixture, command] of fixtures) {
      const report = await analyzeProject({
        targetPath: path.join(fixtureRoot, fixture),
        now: new Date("2026-06-07T00:00:00.000Z")
      });

      const readmeFinding = report.findings.find((finding) => finding.id === "readme.python-test.missing");

      expect(report.project.type).toBe("python");
      expect(readmeFinding?.suggestion).toContain(command);
      expect(report.findings.map((finding) => finding.id)).toEqual(["readme.python-test.missing"]);
      expect(report.score.value).toBe(94);
    }
  });

  it("reports Python projects with tests but no GitHub Actions workflow", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "python-ci-missing"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    const ciFinding = report.findings.find((finding) => finding.id === "ci.github-actions.missing");

    expect(report.project.type).toBe("python");
    expect(ciFinding).toMatchObject({
      severity: "info",
      message: expect.stringContaining("Python project has test signals")
    });
    expect(report.findings.map((finding) => finding.id)).toEqual(["ci.github-actions.missing"]);
    expect(report.score.value).toBe(98);
    expect(report.fixProposals).toContainEqual(
      expect.objectContaining({
        id: "fix.ci.github-actions.python.create",
        findingIds: ["ci.github-actions.missing"],
        action: {
          type: "create_file",
          path: ".github/workflows/ci.yml",
          content: expect.stringContaining("python -m pip install .")
        }
      })
    );
    expect(report.fixProposals[0]?.action.content).toContain("python -m pytest");
    expect(report.fixProposals[0]?.action.content).toContain('python-version: "3.12"');
  });

  it("generates Python CI workflow previews from package-manager and test metadata", async () => {
    const fixtures: Array<[string, string, string, string | undefined]> = [
      ["python-ci-missing", "python -m pip install .", "python -m pytest", undefined],
      ["python-ci-missing-uv", "uv sync", "uv run pytest", "python -m pip install uv"],
      ["python-ci-missing-poetry", "poetry install", "poetry run pytest", "python -m pip install poetry"],
      ["python-ci-missing-pipenv", "pipenv sync", "pipenv run pytest", "python -m pip install pipenv"],
      ["python-ci-missing-tox", "python -m pip install .", "tox", undefined],
      ["python-ci-missing-nox", "python -m pip install .", "nox", undefined],
      ["python-ci-missing-unittest", "python -m pip install .", "python -m unittest", undefined]
    ];
    const toolSetupCommands = ["python -m pip install uv", "python -m pip install poetry", "python -m pip install pipenv"];

    for (const [fixture, installCommand, testCommand, toolSetupCommand] of fixtures) {
      const report = await analyzeProject({
        targetPath: path.join(fixtureRoot, fixture),
        now: new Date("2026-06-07T00:00:00.000Z")
      });

      const proposal = report.fixProposals.find((item) => item.id === "fix.ci.github-actions.python.create");

      expect(report.project.type, fixture).toBe("python");
      expect(report.findings.map((finding) => finding.id), fixture).toEqual(["ci.github-actions.missing"]);
      expect(proposal, fixture).toMatchObject({
        findingIds: ["ci.github-actions.missing"],
        action: {
          type: "create_file",
          path: ".github/workflows/ci.yml",
          content: expect.stringContaining(installCommand)
        }
      });
      expect(proposal?.action.content, fixture).toContain(testCommand);
      expect(proposal?.action.content, fixture).toContain('python-version: "3.12"');

      if (toolSetupCommand) {
        expect(proposal?.action.content, fixture).toContain(toolSetupCommand);
      } else {
        for (const command of toolSetupCommands) {
          expect(proposal?.action.content, `${fixture} should not include ${command}`).not.toContain(command);
        }
      }
    }
  });

  it("keeps Python CI workflow preview YAML structure stable", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "python-ci-missing-uv"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    const proposal = report.fixProposals.find((item) => item.id === "fix.ci.github-actions.python.create");
    const expectedWorkflow = [
      "name: CI",
      "",
      "on:",
      "  pull_request:",
      "  push:",
      "    branches: [main]",
      "",
      "permissions:",
      "  contents: read",
      "",
      "jobs:",
      "  test:",
      "    runs-on: ubuntu-latest",
      "    steps:",
      "      - uses: actions/checkout@v4",
      "      - uses: actions/setup-python@v5",
      "        with:",
      '          python-version: "3.12"',
      "      - run: python -m pip install uv",
      "      - run: uv sync",
      "      - run: uv run pytest"
    ].join("\n");

    expect(proposal?.action.content).toBe(`${expectedWorkflow}\n`);
  });

  it("infers Python CI workflow preview versions from local version files", async () => {
    const fixtures: Array<[string, string]> = [
      ["python-ci-missing-python-version-file", "3.11.7"],
      ["python-ci-missing-runtime-txt", "3.10.14"],
      ["python-ci-missing-tool-versions", "3.9.19"]
    ];

    for (const [fixture, pythonVersion] of fixtures) {
      const report = await analyzeProject({
        targetPath: path.join(fixtureRoot, fixture),
        now: new Date("2026-06-07T00:00:00.000Z")
      });

      const proposal = report.fixProposals.find((item) => item.id === "fix.ci.github-actions.python.create");

      expect(report.project.type, fixture).toBe("python");
      expect(report.findings.map((finding) => finding.id), fixture).toEqual(["ci.github-actions.missing"]);
      expect(proposal?.action.content, fixture).toContain(`python-version: "${pythonVersion}"`);
      expect(proposal?.action.content, fixture).toContain("python -m pip install .");
      expect(proposal?.action.content, fixture).toContain("python -m pytest");
    }
  });

  it("falls back to 3.x in Python CI workflow previews when version metadata is missing", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "python-ci-missing-version-fallback"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    const proposal = report.fixProposals.find((item) => item.id === "fix.ci.github-actions.python.create");

    expect(report.project.type).toBe("python");
    expect(report.findings.map((finding) => finding.id)).toEqual([
      "runtime.python-version.missing",
      "ci.github-actions.missing"
    ]);
    expect(proposal?.action.content).toContain('python-version: "3.x"');
    expect(proposal?.action.content).toContain("python -m pip install .");
    expect(proposal?.action.content).toContain("python -m pytest");
  });

  it("does not generate Python CI workflow previews without test tooling metadata", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "python-ci-missing-no-tool"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    const ciFinding = report.findings.find((finding) => finding.id === "ci.github-actions.missing");

    expect(report.project.type).toBe("python");
    expect(ciFinding?.suggestion).toContain("project Python test command");
    expect(report.findings.map((finding) => finding.id)).toEqual(["ci.github-actions.missing"]);
    expect(report.fixProposals).toEqual([]);
  });

  it("reports Python GitHub Actions workflows that do not run tests", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "python-ci-no-test"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    const ciFinding = report.findings.find((finding) => finding.id === "ci.github-actions.no-test");

    expect(report.project.type).toBe("python");
    expect(ciFinding).toMatchObject({
      severity: "warning",
      files: [".github/workflows/ci.yml"],
      message: expect.stringContaining("recognizable Python test command")
    });
    expect(ciFinding?.suggestion).toContain("python -m pytest");
    expect(report.findings.map((finding) => finding.id)).toEqual(["ci.github-actions.no-test"]);
    expect(report.score.value).toBe(94);
  });

  it("suggests Python CI test commands from project metadata", async () => {
    const fixtures: Array<[string, string]> = [
      ["python-ci-no-test-uv", "uv run pytest"],
      ["python-ci-no-test-poetry", "poetry run pytest"],
      ["python-ci-no-test-pipenv", "pipenv run pytest"],
      ["python-ci-no-test-tox", "tox"],
      ["python-ci-no-test-nox", "nox"],
      ["python-ci-no-test-unittest", "python -m unittest"]
    ];

    for (const [fixture, command] of fixtures) {
      const report = await analyzeProject({
        targetPath: path.join(fixtureRoot, fixture),
        now: new Date("2026-06-07T00:00:00.000Z")
      });

      const ciFinding = report.findings.find((finding) => finding.id === "ci.github-actions.no-test");

      expect(report.project.type).toBe("python");
      expect(ciFinding?.suggestion, fixture).toContain(command);
      expect(report.findings.map((finding) => finding.id), fixture).toEqual(["ci.github-actions.no-test"]);
      expect(report.score.value, fixture).toBe(94);
    }
  });

  it("does not overstate Python CI test commands without test tooling metadata", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "python-ci-no-test-no-tool"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    const ciFinding = report.findings.find((finding) => finding.id === "ci.github-actions.no-test");

    expect(report.project.type).toBe("python");
    expect(ciFinding?.suggestion).toBe("Add the project Python test command to the workflow.");
    expect(report.findings.map((finding) => finding.id)).toEqual(["ci.github-actions.no-test"]);
    expect(report.score.value).toBe(94);
  });

  it("reports declared Python test tooling without test files as a low-noise hint", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "python-pyproject-test-tool-no-tests"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    expect(report.project.type).toBe("python");
    expect(report.project.packageManager).toBe("pip");
    expect(report.project.python?.testTools).toEqual(["pytest"]);
    expect(report.findings.map((finding) => finding.id)).toEqual(["tests.python.tooling-no-files"]);
    expect(report.findings[0]).toMatchObject({
      severity: "info",
      files: ["pyproject.toml"]
    });
    expect(report.score.value).toBe(98);
  });

  it("reports uv pyproject metadata without a lockfile", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "python-pyproject-uv-missing-lock"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    const dependencyFinding = report.findings.find(
      (finding) => finding.id === "dependencies.python.lockfile.missing"
    );

    expect(report.project.type).toBe("python");
    expect(report.project.packageManager).toBe("uv");
    expect(dependencyFinding?.message).toContain("uv");
    expect(dependencyFinding?.message).toContain("uv.lock");
    expect(dependencyFinding?.suggestion).toContain("uv lock");
    expect(dependencyFinding?.files).toEqual(["pyproject.toml"]);
    expect(report.findings.map((finding) => finding.id)).toEqual(["dependencies.python.lockfile.missing"]);
  });

  it("reports mixed Python lockfile metadata", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "python-mixed-lock-metadata"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    const dependencyFinding = report.findings.find(
      (finding) => finding.id === "dependencies.python.package-manager.mismatch"
    );

    expect(report.project.type).toBe("python");
    expect(report.project.packageManager).toBe("uv");
    expect(dependencyFinding?.message).toContain("uv");
    expect(dependencyFinding?.message).toContain("poetry");
    expect(dependencyFinding?.files).toEqual(["poetry.lock", "pyproject.toml", "uv.lock"]);
    expect(report.findings.map((finding) => finding.id)).toEqual([
      "dependencies.python.package-manager.mismatch"
    ]);
  });

  it("ignores comment-only Python env references", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "python-env-comments"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    expect(report.project.type).toBe("python");
    expect(report.findings).toEqual([]);
    expect(report.fixProposals).toEqual([]);
    expect(report.score.value).toBe(100);
  });

  it("detects Python env fallback reads without treating string examples as usages", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "python-env-fallbacks"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    const envFinding = report.findings.find((finding) => finding.id === "env.example.missing");

    expect(envFinding?.message).toContain("PYTHON_DATABASE_URL");
    expect(envFinding?.message).toContain("PYTHON_SECRET");
    expect(envFinding?.message).not.toContain("STRING_ONLY_SECRET");
    expect(report.fixProposals).toContainEqual(
      expect.objectContaining({
        id: "fix.env-example.create",
        action: {
          type: "create_file",
          path: ".env.example",
          content: "PYTHON_DATABASE_URL=\nPYTHON_SECRET=\n"
        }
      })
    );
  });

  it("detects Python setup gaps", async () => {
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "python-missing-setup"),
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    expect(report.project.type).toBe("python");
    expect(report.project.packageManager).toBe("pip");
    expect(report.findings.map((finding) => finding.id)).toEqual(
      expect.arrayContaining([
        "env.example.missing",
        "readme.python-install.missing",
        "runtime.python-version.missing",
        "tests.python.missing"
      ])
    );
    expect(report.fixProposals).toContainEqual(
      expect.objectContaining({
        id: "fix.env-example.create",
        action: {
          type: "create_file",
          path: ".env.example",
          content: "SECRET_KEY=\n"
        }
      })
    );
  });
});
