import type { ProjectSummary } from "../types.js";
import { detectNodeProject } from "./node.js";
import { detectPythonProject } from "./python.js";

export async function detectProject(
  targetPath: string,
  files: string[],
  fileSet?: ReadonlySet<string>
): Promise<ProjectSummary> {
  return (
    (await detectNodeProject(targetPath, files, fileSet)) ??
    (await detectPythonProject(targetPath, files, fileSet)) ?? {
      type: "unknown",
      frameworks: [],
      packageManager: "unknown"
    }
  );
}
