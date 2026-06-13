import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const security = await read("SECURITY.md");
const readme = await read("README.md");
const contributing = await read("CONTRIBUTING.md");
const release = await read("docs/RELEASE.md");
const launch = await read("docs/LAUNCH.md");
const quality = await read("docs/QUALITY_GATES.md");

for (const expected of [
  "Supported Versions",
  "Reporting a Security Issue",
  "Secret Handling Policy",
  "Scope of Secret Checks",
  "Read-Only Security Boundary",
  "Maintainer Response",
  "Public Discussion Guidelines"
]) {
  assertIncludes(security, expected, `SECURITY should include ${expected}`);
}

for (const expected of [
  "not a vulnerability scanner",
  "does not replace dedicated security tools",
  "do not publish sensitive security details in public issues",
  "private security reporting channel",
  "Bootlane secret findings must not print full secret values",
  "Full token values",
  "Full private key material",
  "Secrets copied into fix proposals",
  "Regression tests cover JSON, Markdown, and terminal output",
  "Focused scanner tests cover GitHub token, AWS access key ID, OpenAI API key, and private key block previews",
  "Committed `.env` files",
  "GitHub token patterns",
  "AWS access key ID patterns",
  "OpenAI-style API key patterns",
  "npm audit",
  "Dependabot",
  "GitHub Advanced Security",
  "Mutate analyzed repository files",
  "Execute project scripts",
  "Upload repository contents",
  "pnpm verify:release",
  "Redact secrets",
  "Evidence Redaction Examples",
  "docs/RELEASE_EVIDENCE.md"
]) {
  assertIncludes(security, expected, `SECURITY should preserve guidance: ${expected}`);
}

for (const [name, content] of [
  ["README", readme],
  ["CONTRIBUTING", contributing],
  ["Release notes", release],
  ["Launch checklist", launch],
  ["Quality gates", quality]
]) {
  assertIncludes(content, "SECURITY.md", `${name} should link SECURITY.md`);
}

assertIncludes(release, "private security reporting channel", "Release notes should require final security channel");
assertIncludes(quality, "private security reporting channel", "Quality gates should require final security channel");

log("ok security doc");

async function read(relativePath) {
  return readFile(path.join(rootDir, relativePath), "utf8");
}

function assertIncludes(value, expected, message) {
  if (!value.includes(expected)) {
    throw new Error(`${message}: expected to include ${JSON.stringify(expected)}`);
  }
}

function log(message) {
  process.stdout.write(`${message}\n`);
}
