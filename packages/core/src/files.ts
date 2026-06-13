import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import fastGlob from "fast-glob";

export async function listFiles(targetPath: string, ignore: string[]): Promise<string[]> {
  const entries = await fastGlob("**/*", {
    cwd: targetPath,
    dot: true,
    onlyFiles: true,
    unique: true,
    ignore
  });

  return entries.sort((a, b) => a.localeCompare(b));
}

export async function fileExists(targetPath: string, relativePath: string): Promise<boolean> {
  try {
    const result = await stat(path.join(targetPath, relativePath));
    return result.isFile();
  } catch {
    return false;
  }
}

export async function readTextFile(targetPath: string, relativePath: string): Promise<string | undefined> {
  try {
    return await readFile(path.join(targetPath, relativePath), "utf8");
  } catch {
    return undefined;
  }
}

export async function readJsonFile<T>(targetPath: string, relativePath: string): Promise<T | undefined> {
  const content = await readTextFile(targetPath, relativePath);
  if (!content) {
    return undefined;
  }

  try {
    return JSON.parse(content) as T;
  } catch {
    return undefined;
  }
}

export function hasAnyFile(files: string[], candidates: string[]): boolean {
  const fileSet = new Set(files.map(normalizePath));
  return candidates.some((candidate) => fileSet.has(normalizePath(candidate)));
}

export function normalizePath(filePath: string): string {
  return filePath.replace(/\\/g, "/");
}

