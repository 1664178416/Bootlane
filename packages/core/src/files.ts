import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import fastGlob from "fast-glob";

export type FileLookup = {
  files: readonly string[];
  fileSet?: ReadonlySet<string>;
};

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

export function createFileSet(files: readonly string[]): ReadonlySet<string> {
  return new Set(files.map(normalizePath));
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

export function hasFile(lookup: FileLookup | ReadonlySet<string> | readonly string[], relativePath: string): boolean {
  const normalized = normalizePath(relativePath);

  if (isFileSet(lookup)) {
    return lookup.has(normalized);
  }

  if (isFileArray(lookup)) {
    return lookup.some((file) => normalizePath(file) === normalized);
  }

  return lookup.fileSet?.has(normalized) ?? lookup.files.some((file) => normalizePath(file) === normalized);
}

export function hasAnyFile(
  lookup: FileLookup | ReadonlySet<string> | readonly string[],
  candidates: readonly string[]
): boolean {
  return candidates.some((candidate) => hasFile(lookup, candidate));
}

export function findFile(
  lookup: FileLookup | ReadonlySet<string> | readonly string[],
  candidates: readonly string[]
): string | undefined {
  return candidates.find((candidate) => hasFile(lookup, candidate));
}

export function normalizePath(filePath: string): string {
  return filePath.replace(/\\/g, "/");
}

function isFileSet(lookup: FileLookup | ReadonlySet<string> | readonly string[]): lookup is ReadonlySet<string> {
  return typeof (lookup as ReadonlySet<string>).has === "function";
}

function isFileArray(lookup: FileLookup | readonly string[]): lookup is readonly string[] {
  return Array.isArray(lookup);
}
