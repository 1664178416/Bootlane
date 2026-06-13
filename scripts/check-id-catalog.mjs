import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = path.join(rootDir, "packages", "core", "src");
const catalogPath = path.join(rootDir, "docs", "CHECK_IDS.md");
const catalog = await readFile(catalogPath, "utf8");
const sourceFiles = await collectTsFiles(sourceDir);
const ids = new Set();

for (const filePath of sourceFiles) {
  const content = await readFile(filePath, "utf8");
  for (const match of content.matchAll(/\bid:\s*["']([^"']+)["']/g)) {
    ids.add(match[1]);
  }
  for (const match of content.matchAll(/["'](fix\.[a-z0-9.-]+)["']/g)) {
    ids.add(match[1]);
  }
}

const missing = [...ids].filter((id) => !catalog.includes(`\`${id}\``)).sort((a, b) => a.localeCompare(b));

if (missing.length > 0) {
  process.stderr.write("docs/CHECK_IDS.md is missing IDs:\n");
  for (const id of missing) {
    process.stderr.write(`- ${id}\n`);
  }
  process.exit(1);
}

process.stdout.write(`CHECK_IDS catalog covers ${ids.size} IDs.\n`);

async function collectTsFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectTsFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith(".ts")) {
      files.push(fullPath);
    }
  }

  return files;
}

