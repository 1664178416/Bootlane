import type { ProjectSummary } from "../types.js";
import { detectNodeProject } from "./node.js";
import { detectPythonProject } from "./python.js";

export async function detectProject(targetPath: string, files: string[]): Promise<ProjectSummary> {
  return (
    (await detectNodeProject(targetPath, files)) ??
    (await detectPythonProject(targetPath, files)) ?? {
      type: "unknown",
      frameworks: [],
      packageManager: "unknown"
    }
  );
}
