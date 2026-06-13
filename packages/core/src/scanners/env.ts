import { readTextFile } from "../files.js";
import type { Confidence, EnvVarUsage } from "../types.js";

const sourceExtensions = new Set([
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".mjs",
  ".cjs",
  ".vue",
  ".svelte",
  ".py"
]);

const ignoredEnvNames = new Set([
  "NODE_ENV",
  "CI",
  "PWD",
  "PATH",
  "HOME",
  "USER",
  "USERNAME",
  "SHELL",
  "TERM"
]);

const envPatterns: Array<{ pattern: RegExp; confidence: Confidence }> = [
  { pattern: /\bprocess\.env\.([A-Z][A-Z0-9_]*)\b/g, confidence: "high" },
  { pattern: /\bprocess\.env\[['"]([A-Z][A-Z0-9_]*)['"]\]/g, confidence: "high" },
  { pattern: /\bimport\.meta\.env\.([A-Z][A-Z0-9_]*)\b/g, confidence: "high" },
  { pattern: /\bos\.environ\[['"]([A-Z][A-Z0-9_]*)['"]\]/g, confidence: "high" },
  { pattern: /\bos\.environ\.get\(['"]([A-Z][A-Z0-9_]*)['"]/g, confidence: "high" },
  { pattern: /\bos\.getenv\(['"]([A-Z][A-Z0-9_]*)['"]/g, confidence: "high" }
];

export async function scanEnvUsages(targetPath: string, files: string[]): Promise<EnvVarUsage[]> {
  const usageMap = new Map<string, { files: Set<string>; confidence: Confidence }>();

  for (const file of files.filter(isSourceFile)) {
    const content = await readTextFile(targetPath, file);
    if (!content) {
      continue;
    }

    const scannableContent = stripSourceComments(content, file);
    const stringMask = createStringMask(scannableContent, file);

    for (const { pattern, confidence } of envPatterns) {
      pattern.lastIndex = 0;
      for (const match of scannableContent.matchAll(pattern)) {
        const name = match[1];
        const matchIndex = match.index ?? 0;
        if (!name || ignoredEnvNames.has(name) || stringMask[matchIndex]) {
          continue;
        }

        const existing = usageMap.get(name);
        if (existing) {
          existing.files.add(file);
          existing.confidence = strongestConfidence(existing.confidence, confidence);
        } else {
          usageMap.set(name, {
            files: new Set([file]),
            confidence
          });
        }
      }
    }
  }

  return [...usageMap.entries()]
    .map(([name, usage]) => ({
      name,
      files: [...usage.files].sort((a, b) => a.localeCompare(b)),
      confidence: usage.confidence
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function readEnvExampleNames(targetPath: string): Promise<Set<string> | undefined> {
  const content = await readTextFile(targetPath, ".env.example");
  if (!content) {
    return undefined;
  }

  const names = new Set<string>();
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const match = /^([A-Z][A-Z0-9_]*)\s*=/.exec(trimmed);
    if (match?.[1]) {
      names.add(match[1]);
    }
  }

  return names;
}

function isSourceFile(file: string): boolean {
  const extension = file.slice(file.lastIndexOf("."));
  return sourceExtensions.has(extension);
}

function createStringMask(content: string, file: string): boolean[] {
  return file.endsWith(".py") ? createPythonStringMask(content) : createJavaScriptStringMask(content);
}

function createPythonStringMask(content: string): boolean[] {
  const mask = Array.from({ length: content.length }, () => false);
  let quote: "'" | '"' | undefined;
  let tripleQuote: "'''" | '"""' | undefined;
  let escaped = false;

  for (let index = 0; index < content.length; index += 1) {
    if (tripleQuote) {
      mask[index] = true;
      if (content.startsWith(tripleQuote, index)) {
        mask[index + 1] = true;
        mask[index + 2] = true;
        index += 2;
        tripleQuote = undefined;
      }
      continue;
    }

    const char = content[index];

    if (quote) {
      mask[index] = true;
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = undefined;
      }
      continue;
    }

    if (content.startsWith("'''", index) || content.startsWith('"""', index)) {
      tripleQuote = content.slice(index, index + 3) as "'''" | '"""';
      mask[index] = true;
      mask[index + 1] = true;
      mask[index + 2] = true;
      index += 2;
      continue;
    }

    if (char === "'" || char === '"') {
      quote = char;
      mask[index] = true;
    }
  }

  return mask;
}

function createJavaScriptStringMask(content: string): boolean[] {
  const mask = Array.from({ length: content.length }, () => false);
  let quote: "'" | '"' | "`" | undefined;
  let escaped = false;
  let templateExpressionDepth = 0;

  for (let index = 0; index < content.length; index += 1) {
    const char = content[index];
    const next = content[index + 1];

    if (quote === "'" || quote === '"') {
      mask[index] = true;
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = undefined;
      }
      continue;
    }

    if (quote === "`") {
      mask[index] = true;
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === "`") {
        quote = undefined;
      } else if (char === "$" && next === "{") {
        mask[index + 1] = true;
        index += 1;
        quote = undefined;
        templateExpressionDepth = 1;
      }
      continue;
    }

    if (templateExpressionDepth > 0) {
      if (char === "'" || char === '"' || char === "`") {
        quote = char;
        mask[index] = true;
        continue;
      }

      if (char === "{") {
        templateExpressionDepth += 1;
      } else if (char === "}") {
        templateExpressionDepth -= 1;
        if (templateExpressionDepth === 0) {
          mask[index] = true;
          quote = "`";
        }
      }
      continue;
    }

    if (char === "'" || char === '"' || char === "`") {
      quote = char;
      mask[index] = true;
    }
  }

  return mask;
}

function stripSourceComments(content: string, file: string): string {
  if (file.endsWith(".py")) {
    return stripLineComments(content, "#");
  }

  return stripJavaScriptComments(content);
}

function stripLineComments(content: string, marker: string): string {
  let result = "";
  let quote: "'" | '"' | undefined;
  let escaped = false;

  for (let index = 0; index < content.length; index += 1) {
    const char = content[index];

    if (quote) {
      result += char;
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = undefined;
      }
      continue;
    }

    if (char === "'" || char === '"') {
      quote = char;
      result += char;
      continue;
    }

    if (char === marker) {
      while (index < content.length && content[index] !== "\n") {
        result += " ";
        index += 1;
      }
    }

    if (index < content.length) {
      result += content[index];
    }
  }

  return result;
}

function stripJavaScriptComments(content: string): string {
  let result = "";
  let quote: "'" | '"' | "`" | undefined;
  let escaped = false;

  for (let index = 0; index < content.length; index += 1) {
    const char = content[index];
    const next = content[index + 1];

    if (quote) {
      result += char;
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = undefined;
      }
      continue;
    }

    if (char === "'" || char === '"' || char === "`") {
      quote = char;
      result += char;
      continue;
    }

    if (char === "/" && next === "/") {
      result += "  ";
      index += 2;
      while (index < content.length && content[index] !== "\n") {
        result += " ";
        index += 1;
      }
      if (index < content.length) {
        result += content[index];
      }
      continue;
    }

    if (char === "/" && next === "*") {
      result += "  ";
      index += 2;
      while (index < content.length && !(content[index] === "*" && content[index + 1] === "/")) {
        result += content[index] === "\n" ? "\n" : " ";
        index += 1;
      }
      if (index < content.length) {
        result += "  ";
        index += 1;
      }
      continue;
    }

    result += char;
  }

  return result;
}

function strongestConfidence(current: Confidence, incoming: Confidence): Confidence {
  const order: Record<Confidence, number> = {
    low: 0,
    medium: 1,
    high: 2
  };

  return order[incoming] > order[current] ? incoming : current;
}
