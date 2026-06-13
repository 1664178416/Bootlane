import type { BootlaneReport, Finding, FixProposal, Severity } from "@bootlane/core";
import colors from "picocolors";

export type TerminalOptions = {
  color?: boolean;
  mode?: "normal" | "summary" | "verbose";
};

export function renderTerminalReport(report: BootlaneReport, options: TerminalOptions = {}): string {
  const useColor = options.color ?? process.stdout.isTTY;
  const mode = options.mode ?? "normal";
  const paint = createPalette(useColor);
  const lines = [
    paint.bold("Bootlane Report"),
    "",
    `Project: ${formatProject(report)}`,
    `Package manager: ${report.project.packageManager}`,
    `Health score: ${paintScore(report.score.value, report.score.max, report.score.grade, paint)}`
  ];

  const failingFindings = report.findings.filter((finding) => !finding.passed);
  if (mode === "summary") {
    lines.push(`Findings: ${formatFindingCounts(failingFindings, paint)}`);
    if (report.fixProposals.length > 0) {
      lines.push(`Fix previews: ${report.fixProposals.length} available`);
    }
    lines.push("");
    return `${lines.join("\n").trimEnd()}\n`;
  }

  lines.push("");

  if (failingFindings.length === 0) {
    lines.push(paint.green("No setup readiness issues found."), "");
    return `${lines.join("\n").trimEnd()}\n`;
  }

  for (const severity of ["critical", "warning", "info"] satisfies Severity[]) {
    const group = failingFindings.filter((finding) => finding.severity === severity);
    if (group.length === 0) {
      continue;
    }

    lines.push(formatSeverityHeading(severity, paint));
    for (const finding of group) {
      lines.push(...formatFinding(finding, paint, mode));
    }
    lines.push("");
  }

  if (mode === "verbose" && report.fixProposals.length > 0) {
    lines.push("Fix previews");
    for (const proposal of report.fixProposals) {
      lines.push(...formatFixProposal(proposal, paint));
    }
    lines.push("");
  }

  return `${lines.join("\n").trimEnd()}\n`;
}

function formatProject(report: BootlaneReport): string {
  if (report.project.type === "unknown") {
    return "Unknown";
  }

  const parts = [capitalize(report.project.type)];
  if (report.project.frameworks.length > 0) {
    parts.push(report.project.frameworks.join(" + "));
  }

  return parts.join(" + ");
}

function formatFinding(finding: Finding, paint: Palette, mode: TerminalOptions["mode"]): string[] {
  const lines = [`- ${paint.bold(finding.title)} ${paint.dim(finding.id)}`, `  ${finding.message}`];

  if (mode === "verbose") {
    lines.push(`  Category: ${finding.category}; Confidence: ${finding.confidence}`);
  }

  if (finding.files && finding.files.length > 0) {
    lines.push(`  Files: ${finding.files.join(", ")}`);
  }

  if (finding.suggestion) {
    lines.push(`  Suggested fix: ${finding.suggestion}`);
  }

  return lines;
}

function formatFixProposal(proposal: FixProposal, paint: Palette): string[] {
  const lines = [
    `- ${paint.bold(proposal.title)} ${paint.dim(proposal.id)}`,
    `  ${proposal.description}`,
    `  Action: ${proposal.action.type} ${proposal.action.path}`,
    "  Content preview:",
    ...formatContentPreview(proposal.action.content),
    `  Related findings: ${proposal.findingIds.join(", ")}`,
    `  Safety: ${proposal.safety}; Confidence: ${proposal.confidence}`
  ];

  return lines;
}

function formatContentPreview(content: string): string[] {
  const maxLines = 40;
  const contentLines = content.trimEnd().split("\n");

  if (contentLines.length === 1 && contentLines[0] === "") {
    return ["    (empty)"];
  }

  const visibleLines = contentLines.slice(0, maxLines).map((line) => `    ${line}`);
  const hiddenLineCount = contentLines.length - visibleLines.length;

  if (hiddenLineCount > 0) {
    visibleLines.push(`    ... (${hiddenLineCount} more line${hiddenLineCount === 1 ? "" : "s"})`);
  }

  return visibleLines;
}

function formatFindingCounts(findings: Finding[], paint: Palette): string {
  if (findings.length === 0) {
    return paint.green("none");
  }

  const critical = findings.filter((finding) => finding.severity === "critical").length;
  const warning = findings.filter((finding) => finding.severity === "warning").length;
  const info = findings.filter((finding) => finding.severity === "info").length;
  const parts = [];

  if (critical > 0) {
    parts.push(paint.red(`${critical} critical`));
  }
  if (warning > 0) {
    parts.push(paint.yellow(`${warning} warning${warning === 1 ? "" : "s"}`));
  }
  if (info > 0) {
    parts.push(paint.cyan(`${info} info`));
  }

  return parts.join(", ");
}

function formatSeverityHeading(severity: Severity, paint: Palette): string {
  switch (severity) {
    case "critical":
      return paint.red("Critical");
    case "warning":
      return paint.yellow("Warnings");
    case "info":
      return paint.cyan("Info");
  }
}

function paintScore(value: number, max: number, grade: string, paint: Palette): string {
  const score = `${value}/${max} (${grade})`;
  if (value >= 90) {
    return paint.green(score);
  }

  if (value >= 60) {
    return paint.yellow(score);
  }

  return paint.red(score);
}

type Palette = {
  bold(value: string): string;
  dim(value: string): string;
  red(value: string): string;
  yellow(value: string): string;
  green(value: string): string;
  cyan(value: string): string;
};

function createPalette(useColor: boolean): Palette {
  if (!useColor) {
    return {
      bold: identity,
      dim: identity,
      red: identity,
      yellow: identity,
      green: identity,
      cyan: identity
    };
  }

  return colors;
}

function identity(value: string): string {
  return value;
}

function capitalize(value: string): string {
  return `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`;
}
