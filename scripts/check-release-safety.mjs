import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const releaseSafetyManifests = [
  ["root package", "package.json"],
  ["@bootlane/core", "packages/core/package.json"],
  ["bootlane", "packages/cli/package.json"]
];

export async function checkReleaseSafety(options = {}) {
  const rootDir = options.rootDir ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

  for (const [label, relativePath] of releaseSafetyManifests) {
    const packageJson = JSON.parse(await read(rootDir, relativePath));

    for (const field of ["repository", "homepage", "bugs"]) {
      assert(
        packageJson[field] === undefined,
        `${label} should not define ${field} until the final Bootlane repository URL is confirmed`
      );
    }
  }

  const workflowFiles = await listWorkflowFiles(rootDir);
  assert(workflowFiles.length > 0, "release safety should inspect at least one GitHub Actions workflow");

  for (const workflowFile of workflowFiles) {
    const workflow = await read(rootDir, workflowFile);
    const lowerWorkflow = workflow.toLowerCase();

    assert(!/(^|\n)\s*release\s*:/i.test(workflow), `${workflowFile} should not define a release event yet`);
    assert(!/(^|\n)\s*workflow_dispatch\s*:/i.test(workflow), `${workflowFile} should not define manual dispatch yet`);
    assert(!lowerWorkflow.includes("npm publish"), `${workflowFile} should not run npm publish yet`);
    assert(!lowerWorkflow.includes("--provenance"), `${workflowFile} should not configure npm provenance yet`);
    assert(!lowerWorkflow.includes("id-token: write"), `${workflowFile} should not request id-token write before publish automation exists`);
    assert(!lowerWorkflow.includes("contents: write"), `${workflowFile} should not request contents write before release automation exists`);
    assert(!lowerWorkflow.includes("npm_token"), `${workflowFile} should not reference npm publish tokens`);
  }

  const release = await read(rootDir, "docs/RELEASE.md");
  const blockers = await read(rootDir, "docs/RELEASE_BLOCKERS.md");
  const evidence = await read(rootDir, "docs/RELEASE_EVIDENCE.md");
  const qualityGates = await read(rootDir, "docs/QUALITY_GATES.md");
  const packageContents = await read(rootDir, "docs/PACKAGE_CONTENTS.md");

  for (const [name, content] of [
    ["Release notes", release],
    ["Release blockers", blockers],
    ["Release evidence", evidence],
    ["Quality gates", qualityGates],
    ["Package contents", packageContents]
  ]) {
    const lowerContent = content.toLowerCase();
    assert(
      lowerContent.includes("final bootlane repository url") || lowerContent.includes("final github repository url"),
      `${name} should preserve final repository URL review`
    );
  }

  for (const [name, content] of [
    ["Release notes", release],
    ["Package contents", packageContents]
  ]) {
    for (const field of ["repository", "homepage", "bugs"]) {
      assertIncludes(content, `\`${field}\``, `${name} should mention package URL metadata field ${field}`);
    }
  }

  for (const [name, content] of [
    ["Release notes", release],
    ["Release evidence", evidence],
    ["Quality gates", qualityGates]
  ]) {
    assertIncludes(content, "Do not use a green local gate as publish approval", `${name} should preserve local gate warning`);
  }

  assertIncludes(release, "The first publish should be manual", "Release notes should keep the first publish manual");
  assertIncludes(evidence, "Do not publish `bootlane` before `@bootlane/core`", "Release evidence should preserve publish order");
  assertIncludes(qualityGates, "Manual repository identity checks", "Quality gates should keep manual identity outside CI");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await checkReleaseSafety();
  log("ok release safety");
}

async function listWorkflowFiles(rootDir) {
  const workflowsDir = path.join(rootDir, ".github", "workflows");
  const entries = await readdir(workflowsDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && /\.(ya?ml)$/i.test(entry.name))
    .map((entry) => path.join(".github", "workflows", entry.name));
}

async function read(rootDir, relativePath) {
  return readFile(path.join(rootDir, relativePath), "utf8");
}

function assertIncludes(value, expected, message) {
  assert(value.includes(expected), `${message}: expected to include ${JSON.stringify(expected)}`);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function log(message) {
  process.stdout.write(`${message}\n`);
}
