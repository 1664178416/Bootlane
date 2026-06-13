import type { Check, Finding, ProjectContext, Severity } from "../types.js";
import { ciCheck, pythonCiCheck } from "./ci.js";
import { dependenciesCheck } from "./dependencies.js";
import { envCheck } from "./env.js";
import { projectCheck } from "./project.js";
import { pythonDependenciesCheck, pythonReadmeCheck, pythonRuntimeCheck, pythonTestsCheck } from "./python.js";
import { readmeCheck } from "./readme.js";
import { runtimeCheck } from "./runtime.js";
import { securityCheck } from "./security.js";
import { testsCheck } from "./tests.js";

export const checks: Check[] = [
  projectCheck,
  dependenciesCheck,
  pythonDependenciesCheck,
  runtimeCheck,
  pythonRuntimeCheck,
  readmeCheck,
  pythonReadmeCheck,
  envCheck,
  testsCheck,
  pythonTestsCheck,
  securityCheck,
  ciCheck,
  pythonCiCheck
];

const overrideSeverity: Record<"info" | "warn" | "error", Severity> = {
  info: "info",
  warn: "warning",
  error: "critical"
};

export async function runChecks(context: ProjectContext): Promise<Finding[]> {
  const findings: Finding[] = [];

  for (const check of checks) {
    const applies = await check.appliesTo(context);
    if (!applies) {
      continue;
    }

    const checkFindings = await check.run(context);
    const enabledFindings = checkFindings
      .map((finding) => applyOverride(context, finding))
      .filter((finding): finding is Finding => Boolean(finding));
    findings.push(...enabledFindings.map(normalizeFinding));
  }

  return findings
    .filter((finding): finding is Finding => Boolean(finding))
    .sort(
      (a, b) =>
        severityRank(a.severity) - severityRank(b.severity) ||
        a.category.localeCompare(b.category) ||
        a.id.localeCompare(b.id) ||
        a.message.localeCompare(b.message)
    );
}

function applyOverride(context: ProjectContext, finding: Finding): Finding | undefined {
  const override = context.config.checks[finding.id];
  if (!override) {
    return finding;
  }

  if (override === "off") {
    return undefined;
  }

  return {
    ...finding,
    severity: overrideSeverity[override]
  };
}

function normalizeFinding(finding: Finding): Finding {
  if (!finding.files) {
    return finding;
  }

  return {
    ...finding,
    files: [...new Set(finding.files.map((file) => file.replace(/\\/g, "/")))].sort((a, b) => a.localeCompare(b))
  };
}

function severityRank(severity: Severity): number {
  switch (severity) {
    case "critical":
      return 0;
    case "warning":
      return 1;
    case "info":
      return 2;
  }
}
