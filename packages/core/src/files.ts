import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import fastGlob from "fast-glob";
import type { TextFileCache } from "./types.js";

const maxConcurrentFileReads = 32;

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

export function readTextFileCached(
  targetPath: string,
  relativePath: string,
  cache?: TextFileCache
): Promise<string | undefined> {
  if (!cache) {
    return readTextFile(targetPath, relativePath);
  }

  const cacheKey = normalizePath(relativePath);
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const content = readTextFile(targetPath, relativePath);
  cache.set(cacheKey, content);
  return content;
}

export async function readTextFiles(
  targetPath: string,
  relativePaths: string[],
  cache?: TextFileCache
): Promise<Array<{ relativePath: string; content: string | undefined }>> {
  const contents = new Array<string | undefined>(relativePaths.length);
  let nextIndex = 0;
  const workerCount = Math.min(maxConcurrentFileReads, relativePaths.length);

  await Promise.all(
    Array.from({ length: workerCount }, async () => {
      while (nextIndex < relativePaths.length) {
        const index = nextIndex;
        nextIndex += 1;
        contents[index] = await readTextFileCached(targetPath, relativePaths[index]!, cache);
      }
    })
  );

  return relativePaths.map((relativePath, index) => ({
    relativePath,
    content: contents[index]
  }));
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
