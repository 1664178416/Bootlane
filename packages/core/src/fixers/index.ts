import { readTextFile } from "../files.js";
import { readEnvExampleNames, scanEnvUsages } from "../scanners/env.js";
import { getPythonInstallCommand, getPythonTestCommand, isPythonTestFile } from "../signals/python.js";
import type { Finding, FixProposal, PackageManager, ProjectContext } from "../types.js";
import { packageManagerRunCommand } from "../checks/helpers.js";

const readmeCandidates = ["README.md", "readme.md", "README.MD", "README"];

type WorkflowStep = { uses: string; with?: Record<string, string> } | { run: string };

export async function generateFixProposals(context: ProjectContext, findings: Finding[]): Promise<FixProposal[]> {
  const findingIds = new Set(findings.map((finding) => finding.id));
  const proposals = [
    await generateEnvExampleProposal(context, findingIds),
    await generateReadmeSetupProposal(context, findingIds),
    await generateNodeCiWorkflowProposal(context, findingIds),
    await generatePythonCiWorkflowProposal(context, findingIds)
  ].filter((proposal): proposal is FixProposal => Boolean(proposal));

  return proposals.sort((a, b) => a.id.localeCompare(b.id));
}

async function generateEnvExampleProposal(
  context: ProjectContext,
  findingIds: Set<string>
): Promise<FixProposal | undefined> {
  if (!findingIds.has("env.example.missing") && !findingIds.has("env.example.incomplete")) {
    return undefined;
  }

  const usages = await scanEnvUsages(context.targetPath, context.files);
  if (usages.length === 0) {
    return undefined;
  }

  const existingNames = await readEnvExampleNames(context.targetPath);
  const missingNames = usages
    .map((usage) => usage.name)
    .filter((name) => !existingNames?.has(name))
    .sort((a, b) => a.localeCompare(b));

  if (missingNames.length === 0) {
    return undefined;
  }

  const missingContent = `${missingNames.map((name) => `${name}=`).join("\n")}\n`;
  const isMissingFile = !existingNames;

  return {
    id: isMissingFile ? "fix.env-example.create" : "fix.env-example.append",
    title: isMissingFile ? "Create .env.example" : "Append missing .env.example entries",
    description: isMissingFile
      ? "Create a sample env file with variables detected in source code."
      : "Append missing variables detected in source code to the existing sample env file.",
    findingIds: [isMissingFile ? "env.example.missing" : "env.example.incomplete"],
    action: {
      type: isMissingFile ? "create_file" : "append_file",
      path: ".env.example",
      content: missingContent
    },
    safety: "safe",
    confidence: usages.every((usage) => usage.confidence === "high") ? "high" : "medium"
  };
}

async function generateReadmeSetupProposal(
  context: ProjectContext,
  findingIds: Set<string>
): Promise<FixProposal | undefined> {
  if (context.project.type === "python") {
    return generatePythonReadmeSetupProposal(context, findingIds);
  }

  if (context.project.type !== "node") {
    return undefined;
  }

  const readmeFindingIds = [
    "readme.missing",
    "readme.install.missing",
    "readme.run.missing",
    "readme.test.missing",
    "readme.env.missing"
  ];
  const activeReadmeFindings = readmeFindingIds.filter((id) => findingIds.has(id));

  if (activeReadmeFindings.length === 0) {
    return undefined;
  }

  const readmePath = readmeCandidates.find((candidate) => context.files.includes(candidate)) ?? "README.md";
  const readmeContent = await readTextFile(context.targetPath, readmePath);
  const packageName = context.project.packageJson?.name ?? "Project";
  const snippet = renderReadmeSetupSnippet(context);
  const content = readmeContent ? `\n${snippet}` : `# ${packageName}\n\n${snippet}`;

  return {
    id: readmeContent ? "fix.readme.setup.append" : "fix.readme.setup.create",
    title: readmeContent ? "Append README setup section" : "Create README with setup section",
    description: "Add install, run, test, and environment setup guidance inferred from package.json.",
    findingIds: activeReadmeFindings,
    action: {
      type: readmeContent ? "append_file" : "create_file",
      path: readmePath,
      content
    },
    safety: "review",
    confidence: "medium"
  };
}

async function generatePythonReadmeSetupProposal(
  context: ProjectContext,
  findingIds: Set<string>
): Promise<FixProposal | undefined> {
  const activeReadmeFindings = ["readme.missing", "readme.python-install.missing", "readme.python-test.missing"].filter(
    (id) => findingIds.has(id)
  );

  if (activeReadmeFindings.length === 0) {
    return undefined;
  }

  const rendered = renderPythonReadmeSetupSnippet(context, findingIds);
  if (!rendered) {
    return undefined;
  }

  const readmePath = readmeCandidates.find((candidate) => context.files.includes(candidate)) ?? "README.md";
  const readmeContent = await readTextFile(context.targetPath, readmePath);
  const packageName = context.project.python?.name ?? "Project";
  const content = readmeContent ? `\n${rendered.snippet}` : `# ${packageName}\n\n${rendered.snippet}`;

  return {
    id: readmeContent ? "fix.readme.setup.append" : "fix.readme.setup.create",
    title: readmeContent ? "Append README setup section" : "Create README with setup section",
    description: "Add Python install and test guidance inferred from package metadata.",
    findingIds: rendered.findingIds,
    action: {
      type: readmeContent ? "append_file" : "create_file",
      path: readmePath,
      content
    },
    safety: "review",
    confidence: "medium"
  };
}

async function generatePythonCiWorkflowProposal(
  context: ProjectContext,
  findingIds: Set<string>
): Promise<FixProposal | undefined> {
  if (context.project.type !== "python" || !findingIds.has("ci.github-actions.missing")) {
    return undefined;
  }

  const installCommand = getPythonInstallCommand(context.project.packageManager, context.files);
  const testCommand = getPythonTestCommand(context.project.packageManager, context.project.python?.testTools ?? []);

  if (!installCommand || !testCommand || !context.files.some(isPythonTestFile)) {
    return undefined;
  }

  const pythonVersion = await pythonVersionForWorkflow(context);

  return {
    id: "fix.ci.github-actions.python.create",
    title: "Create Python GitHub Actions workflow",
    description: "Create a GitHub Actions workflow with Python setup, dependency install, and test steps inferred from metadata.",
    findingIds: ["ci.github-actions.missing"],
    action: {
      type: "create_file",
      path: ".github/workflows/ci.yml",
      content: renderPythonCiWorkflow(context, installCommand, testCommand, pythonVersion)
    },
    safety: "review",
    confidence: "medium"
  };
}

async function generateNodeCiWorkflowProposal(
  context: ProjectContext,
  findingIds: Set<string>
): Promise<FixProposal | undefined> {
  if (context.project.type !== "node" || !findingIds.has("ci.github-actions.missing")) {
    return undefined;
  }

  const testScript = context.project.packageJson?.scripts.test?.trim();
  const installCommand = nodeCiInstallCommand(
    context.project.packageManager,
    context.files,
    context.project.packageJson?.packageManager
  );
  const nodeVersion = await nodeVersionForWorkflow(context);

  if (!isUsefulNodeTestScript(testScript) || !installCommand || !nodeVersion) {
    return undefined;
  }

  return {
    id: "fix.ci.github-actions.node.create",
    title: "Create Node GitHub Actions workflow",
    description: "Create a GitHub Actions workflow with Node setup, dependency install, and test steps inferred from package metadata.",
    findingIds: ["ci.github-actions.missing"],
    action: {
      type: "create_file",
      path: ".github/workflows/ci.yml",
      content: renderNodeCiWorkflow(context, installCommand, nodeVersion)
    },
    safety: "review",
    confidence: "medium"
  };
}

function renderReadmeSetupSnippet(context: ProjectContext): string {
  const packageManager = context.project.packageManager;
  const scripts = context.project.packageJson?.scripts ?? {};
  const lines = ["## Setup", "", "Install dependencies:", "", "```bash", installCommand(packageManager), "```"];

  const runScript = scripts.dev ? "dev" : scripts.start ? "start" : undefined;
  if (runScript) {
    lines.push("", "Run the project:", "", "```bash", packageManagerRunCommand(packageManager, runScript), "```");
  }

  if (scripts.test) {
    lines.push("", "Run tests:", "", "```bash", packageManagerRunCommand(packageManager, "test"), "```");
  }

  if (context.files.includes(".env.example")) {
    lines.push("", "Environment:", "", "Copy `.env.example` to `.env` and fill in the required values.");
  }

  return `${lines.join("\n")}\n`;
}

function renderPythonReadmeSetupSnippet(
  context: ProjectContext,
  findingIds: Set<string>
): { snippet: string; findingIds: string[] } | undefined {
  const lines = ["## Setup"];
  const includedFindingIds = new Set<string>();
  const installCommand = getPythonInstallCommand(context.project.packageManager, context.files);
  const testCommand = getPythonTestCommand(context.project.packageManager, context.project.python?.testTools ?? []);

  if ((findingIds.has("readme.missing") || findingIds.has("readme.python-install.missing")) && installCommand) {
    lines.push("", "Install dependencies:", "", "```bash", installCommand, "```");
    includedFindingIds.add(findingIds.has("readme.missing") ? "readme.missing" : "readme.python-install.missing");
  }

  if (
    (findingIds.has("readme.missing") || findingIds.has("readme.python-test.missing")) &&
    context.files.some(isPythonTestFile) &&
    testCommand
  ) {
    lines.push("", "Run tests:", "", "```bash", testCommand, "```");
    includedFindingIds.add(findingIds.has("readme.missing") ? "readme.missing" : "readme.python-test.missing");
  }

  if (includedFindingIds.size === 0) {
    return undefined;
  }

  return {
    snippet: `${lines.join("\n")}\n`,
    findingIds: [...includedFindingIds]
  };
}

function renderPythonCiWorkflow(
  context: ProjectContext,
  installCommand: string,
  testCommand: string,
  pythonVersion: string
): string {
  return renderCiWorkflow([
    { uses: "actions/checkout@v4" },
    { uses: "actions/setup-python@v5", with: { "python-version": pythonVersion } },
    ...pythonToolSetupCommands(context.project.packageManager).map((command) => ({ run: command })),
    { run: installCommand },
    { run: testCommand }
  ]);
}

function renderNodeCiWorkflow(context: ProjectContext, installCommand: string, nodeVersion: string): string {
  return renderCiWorkflow([
    { uses: "actions/checkout@v4" },
    { uses: "actions/setup-node@v4", with: { "node-version": nodeVersion } },
    ...nodeToolSetupSteps(context.project.packageManager),
    { run: installCommand },
    { run: packageManagerRunCommand(context.project.packageManager, "test") }
  ]);
}

function renderCiWorkflow(steps: WorkflowStep[]): string {
  const lines = [
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
    ...steps.flatMap(renderWorkflowStep)
  ];

  return `${lines.join("\n")}\n`;
}

function renderWorkflowStep(step: WorkflowStep): string[] {
  if ("uses" in step) {
    const lines = [`      - uses: ${step.uses}`];

    if (step.with) {
      lines.push(
        "        with:",
        ...Object.entries(step.with).map(([key, value]) => `          ${key}: "${value}"`)
      );
    }

    return lines;
  }

  return [`      - run: ${step.run}`];
}

function pythonToolSetupCommands(packageManager: PackageManager): string[] {
  switch (packageManager) {
    case "uv":
      return ["python -m pip install uv"];
    case "poetry":
      return ["python -m pip install poetry"];
    case "pipenv":
      return ["python -m pip install pipenv"];
    case "pip":
    case "unknown":
    default:
      return [];
  }
}

function nodeToolSetupSteps(packageManager: PackageManager): WorkflowStep[] {
  switch (packageManager) {
    case "pnpm":
    case "yarn":
      return [{ run: "corepack enable" }];
    case "bun":
      return [{ uses: "oven-sh/setup-bun@v2" }];
    case "npm":
    case "unknown":
    default:
      return [];
  }
}

async function pythonVersionForWorkflow(context: ProjectContext): Promise<string> {
  const requiresPython = context.project.python?.requiresPython;
  const declaredVersion = extractPythonVersion(requiresPython);
  if (declaredVersion) {
    return declaredVersion;
  }

  const pythonVersion = await readVersionFile(context, ".python-version");
  if (pythonVersion) {
    return pythonVersion;
  }

  const runtimeVersion = await readVersionFile(context, "runtime.txt");
  if (runtimeVersion) {
    return runtimeVersion;
  }

  const toolVersions = context.files.includes(".tool-versions")
    ? await readTextFile(context.targetPath, ".tool-versions")
    : undefined;
  const toolVersion = extractToolVersionsPythonVersion(toolVersions);

  return toolVersion ?? "3.x";
}

async function readVersionFile(context: ProjectContext, relativePath: string): Promise<string | undefined> {
  if (!context.files.includes(relativePath)) {
    return undefined;
  }

  return extractPythonVersion(await readTextFile(context.targetPath, relativePath));
}

function extractPythonVersion(content: string | undefined): string | undefined {
  return content?.match(/\d+\.\d+(?:\.\d+)?/)?.[0];
}

function extractToolVersionsPythonVersion(content: string | undefined): string | undefined {
  const pythonLine = content?.match(/^\s*python\s+(.+)$/im)?.[1];
  return extractPythonVersion(pythonLine);
}

async function nodeVersionForWorkflow(context: ProjectContext): Promise<string | undefined> {
  const packageJson = context.project.packageJson;
  const declaredVersion = extractRuntimeVersion(packageJson?.engines?.node ?? packageJson?.volta?.node);
  if (declaredVersion) {
    return declaredVersion;
  }

  const nvmVersion = await readRuntimeVersionFile(context, ".nvmrc");
  if (nvmVersion) {
    return nvmVersion;
  }

  const nodeVersion = await readRuntimeVersionFile(context, ".node-version");
  if (nodeVersion) {
    return nodeVersion;
  }

  const toolVersions = context.files.includes(".tool-versions")
    ? await readTextFile(context.targetPath, ".tool-versions")
    : undefined;

  return extractToolVersionsNodeVersion(toolVersions);
}

async function readRuntimeVersionFile(context: ProjectContext, relativePath: string): Promise<string | undefined> {
  if (!context.files.includes(relativePath)) {
    return undefined;
  }

  return extractRuntimeVersion(await readTextFile(context.targetPath, relativePath));
}

function extractRuntimeVersion(content: string | undefined): string | undefined {
  return content?.match(/\d+(?:\.\d+){0,2}/)?.[0];
}

function extractToolVersionsNodeVersion(content: string | undefined): string | undefined {
  const nodeLine = content?.match(/^\s*(?:node|nodejs)\s+(.+)$/im)?.[1];
  return extractRuntimeVersion(nodeLine);
}

function nodeCiInstallCommand(
  packageManager: PackageManager,
  files: string[],
  declaredPackageManager?: string
): string | undefined {
  switch (packageManager) {
    case "npm":
      return files.includes("package-lock.json") || files.includes("npm-shrinkwrap.json") ? "npm ci" : undefined;
    case "pnpm":
      return files.includes("pnpm-lock.yaml") ? "pnpm install --frozen-lockfile" : undefined;
    case "yarn":
      if (!files.includes("yarn.lock")) {
        return undefined;
      }

      return isYarnClassic(declaredPackageManager) ? "yarn install --frozen-lockfile" : "yarn install --immutable";
    case "bun":
      return files.includes("bun.lock") || files.includes("bun.lockb") ? "bun install --frozen-lockfile" : undefined;
    case "pip":
    case "uv":
    case "poetry":
    case "pipenv":
    case "unknown":
    default:
      return undefined;
  }
}

function isYarnClassic(declaredPackageManager: string | undefined): boolean {
  return /^yarn@1\./.test(declaredPackageManager ?? "");
}

function isUsefulNodeTestScript(testScript: string | undefined): boolean {
  return Boolean(
    testScript &&
      testScript !== "echo \"Error: no test specified\" && exit 1" &&
      testScript !== "echo 'Error: no test specified' && exit 1"
  );
}

function installCommand(packageManager: PackageManager): string {
  switch (packageManager) {
    case "pnpm":
      return "pnpm install";
    case "yarn":
      return "yarn install";
    case "bun":
      return "bun install";
    case "npm":
    case "unknown":
    default:
      return "npm install";
  }
}
