import { readTextFile } from "../files.js";
import type { SecretHit } from "../types.js";

const scannableExtensions = new Set([
  ".env",
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".mjs",
  ".cjs",
  ".json",
  ".yaml",
  ".yml",
  ".md"
]);

const secretPatterns: Array<{ id: string; label: string; pattern: RegExp }> = [
  {
    id: "security.secret.github-token",
    label: "GitHub token",
    pattern: /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/g
  },
  {
    id: "security.secret.aws-access-key",
    label: "AWS access key ID",
    pattern: /\bAKIA[0-9A-Z]{16}\b/g
  },
  {
    id: "security.secret.openai-key",
    label: "OpenAI API key",
    pattern: /\bsk-[A-Za-z0-9_-]{32,}\b/g
  },
  {
    id: "security.secret.private-key",
    label: "Private key block",
    pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----/g
  }
];

export async function scanSecrets(targetPath: string, files: string[]): Promise<SecretHit[]> {
  const hits: SecretHit[] = [];

  for (const file of files.filter(isScannableFile)) {
    const content = await readTextFile(targetPath, file);
    if (!content) {
      continue;
    }

    for (const { id, label, pattern } of secretPatterns) {
      pattern.lastIndex = 0;
      for (const match of content.matchAll(pattern)) {
        const value = match[0] ?? "";
        hits.push({
          id,
          label,
          file,
          line: lineNumberAt(content, match.index ?? 0),
          preview: redact(value)
        });
      }
    }
  }

  return hits;
}

export function committedEnvFiles(files: string[]): string[] {
  return files
    .filter((file) => {
      const normalized = file.replace(/\\/g, "/");
      const basename = normalized.split("/").at(-1);
      return basename?.startsWith(".env") && basename !== ".env.example";
    })
    .sort((a, b) => a.localeCompare(b));
}

function isScannableFile(file: string): boolean {
  const basename = file.split(/[\\/]/).at(-1);
  if (!basename) {
    return false;
  }

  if (basename.startsWith(".env")) {
    return true;
  }

  const dotIndex = basename.lastIndexOf(".");
  if (dotIndex === -1) {
    return false;
  }

  return scannableExtensions.has(basename.slice(dotIndex));
}

function lineNumberAt(content: string, index: number): number {
  return content.slice(0, index).split(/\r?\n/).length;
}

function redact(value: string): string {
  if (value.length <= 10) {
    return "[redacted]";
  }

  return `${value.slice(0, 4)}...${value.slice(-4)}`;
}

