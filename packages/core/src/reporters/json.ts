import type { BootlaneReport } from "../types.js";

export function renderJsonReport(report: BootlaneReport): string {
  return `${JSON.stringify(report, null, 2)}\n`;
}

