import type { BootlaneReport, Finding, FixProposal, Severity } from "../types.js";

export function renderMarkdownReport(report: BootlaneReport): string {
  const lines = [
    "# Bootlane Report",
    "",
    `Target: \`${report.targetPath}\``,
    `Project: ${formatProject(report)}`,
    `Health score: **${report.score.value}/${report.score.max} (${report.score.grade})**`,
    `Generated: ${report.generatedAt}`,
    ""
  ];

  const failingFindings = report.findings.filter((finding) => !finding.passed);
  if (failingFindings.length === 0) {
    lines.push("No setup readiness issues found.", "");
    return `${lines.join("\n").trimEnd()}\n`;
  }

  for (const severity of ["critical", "warning", "info"] satisfies Severity[]) {
    const group = failingFindings.filter((finding) => finding.severity === severity);
    if (group.length === 0) {
      continue;
    }

    lines.push(`## ${headingForSeverity(severity)}`, "");
    for (const finding of group) {
      lines.push(...formatFinding(finding), "");
    }
  }

  if (report.fixProposals.length > 0) {
    lines.push("## Fix Previews", "");
    for (const proposal of report.fixProposals) {
      lines.push(...formatFixProposal(proposal), "");
    }
  }

  return `${lines.join("\n").trimEnd()}\n`;
}

function formatProject(report: BootlaneReport): string {
  if (report.project.type === "unknown") {
    return "Unknown";
  }

  const details = [capitalize(report.project.type)];
  if (report.project.frameworks.length > 0) {
    details.push(report.project.frameworks.join(" + "));
  }

  if (report.project.packageManager !== "unknown") {
    details.push(report.project.packageManager);
  }

  return details.join(" / ");
}

function formatFinding(finding: Finding): string[] {
  const lines = [`- **${finding.title}** \`${finding.id}\``, `  ${finding.message}`];

  if (finding.files && finding.files.length > 0) {
    lines.push(`  Files: ${finding.files.map((file) => `\`${file}\``).join(", ")}`);
  }

  if (finding.suggestion) {
    lines.push(`  Suggestion: ${finding.suggestion}`);
  }

  return lines;
}

function formatFixProposal(proposal: FixProposal): string[] {
  return [
    `- **${proposal.title}** \`${proposal.id}\``,
    `  ${proposal.description}`,
    `  Action: \`${proposal.action.type}\` \`${proposal.action.path}\``,
    `  Related findings: ${proposal.findingIds.map((id) => `\`${id}\``).join(", ")}`,
    `  Safety: \`${proposal.safety}\`; Confidence: \`${proposal.confidence}\``
  ];
}

function headingForSeverity(severity: Severity): string {
  switch (severity) {
    case "critical":
      return "Critical";
    case "warning":
      return "Warnings";
    case "info":
      return "Info";
  }
}

function capitalize(value: string): string {
  return `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`;
}
