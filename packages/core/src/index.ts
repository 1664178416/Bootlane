import path from "node:path";
import { runChecks } from "./checks/index.js";
import { loadConfigFile, mergeConfig, resolveConfig } from "./config.js";
import { detectProject } from "./detectors/project.js";
import { listFiles } from "./files.js";
import { generateFixProposals } from "./fixers/index.js";
import { renderJsonReport } from "./reporters/json.js";
import { renderMarkdownReport } from "./reporters/markdown.js";
import { scoreFindings } from "./scoring.js";
import type { AnalyzeOptions, BootlaneReport, ProjectContext } from "./types.js";

export type {
  AnalyzeOptions,
  BootlaneConfig,
  BootlaneReport,
  Check,
  CheckCategory,
  Confidence,
  EnvVarUsage,
  Finding,
  FixProposal,
  PackageManager,
  ProjectContext,
  ProjectSummary,
  PythonProjectSummary,
  Score,
  SecretHit,
  Severity
} from "./types.js";

export { loadConfigFile, mergeConfig, renderJsonReport, renderMarkdownReport, resolveConfig };

export async function analyzeProject(options: AnalyzeOptions): Promise<BootlaneReport> {
  const targetPath = path.resolve(options.targetPath);
  const config = resolveConfig(options.config);
  const files = await listFiles(targetPath, config.ignore);
  const project = await detectProject(targetPath, files);

  const context: ProjectContext = {
    targetPath,
    config,
    project,
    files
  };

  const findings = await runChecks(context);
  const fixProposals = await generateFixProposals(context, findings);

  return {
    schemaVersion: "1",
    toolVersion: options.toolVersion ?? "0.1.0",
    targetPath,
    project,
    score: scoreFindings(findings),
    findings,
    fixProposals,
    generatedAt: (options.now ?? new Date()).toISOString()
  };
}
