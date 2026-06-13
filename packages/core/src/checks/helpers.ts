import type { CheckCategory, Confidence, Finding, Severity } from "../types.js";

const nodeInstallCommandPattern =
  /\b(?:npm\s+(?:install|i|ci)|pnpm\s+(?:install|i)|yarn(?:\s+(?:install|i))?\b(?!\s+(?:run|test|start|dev|serve|preview))|bun\s+install)\b/i;
const nodeRunCommandPattern =
  /\b(?:npm\s+(?:run\s+)?(?:dev|start|serve|preview)|pnpm\s+(?:run\s+)?(?:dev|start|serve|preview)|yarn\s+(?:run\s+)?(?:dev|start|serve|preview)|bun\s+(?:run\s+)?(?:dev|start|serve|preview))\b/i;
const nodeTestCommandPattern =
  /\b(?:npm\s+(?:run\s+)?test|pnpm\s+(?:run\s+)?test|yarn\s+(?:run\s+)?test|bun\s+(?:run\s+)?test|vitest|jest)\b/i;
const pythonTestRunnerPattern = String.raw`(?:pytest|(?:python|python3|py)\s+-m\s+(?:pytest|unittest)|tox|nox)`;
const pythonTestCommandPattern = new RegExp(
  String.raw`\b(?:${pythonTestRunnerPattern}|uv\s+run\s+${pythonTestRunnerPattern}|poetry\s+run\s+${pythonTestRunnerPattern}|pipenv\s+run\s+${pythonTestRunnerPattern})\b`,
  "i"
);

export function finding(input: {
  id: string;
  category: CheckCategory;
  title: string;
  severity: Severity;
  message: string;
  suggestion?: string;
  files?: string[];
  confidence?: Confidence;
}): Finding {
  return {
    ...input,
    passed: false,
    confidence: input.confidence ?? "high"
  };
}

export function packageManagerRunCommand(packageManager: string, script: string): string {
  switch (packageManager) {
    case "pnpm":
      return `pnpm ${script}`;
    case "yarn":
      return `yarn ${script}`;
    case "bun":
      return `bun run ${script}`;
    case "npm":
    case "unknown":
    default:
      return script === "start" ? "npm start" : `npm run ${script}`;
  }
}

export function hasNodeInstallCommand(content: string): boolean {
  return nodeInstallCommandPattern.test(content);
}

export function hasNodeRunCommand(content: string): boolean {
  return nodeRunCommandPattern.test(content);
}

export function hasNodeTestCommand(content: string): boolean {
  return nodeTestCommandPattern.test(content);
}

export function hasPythonTestCommand(content: string): boolean {
  return pythonTestCommandPattern.test(content);
}
