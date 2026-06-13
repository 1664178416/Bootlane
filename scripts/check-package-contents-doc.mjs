import { readFile } from "node:fs/promises";
import path from "node:path";
import { packageContracts, packageFileGlobs, rootDir } from "./package-contracts.mjs";

const docs = await read("docs/PACKAGE_CONTENTS.md");
const readme = await read("README.md");
const contributing = await read("CONTRIBUTING.md");
const release = await read("docs/RELEASE.md");
const qualityGates = await read("docs/QUALITY_GATES.md");
const githubActions = await read(".github/workflows/ci.yml");
const verifyRelease = await read("scripts/verify-release.mjs");
const gateContracts = await read("scripts/release-gate-contracts.mjs");
const metadataCheck = await read("scripts/check-package-metadata.mjs");
const packDryRun = await read("scripts/pack-dry-run.mjs");

for (const expected of [
  "Bootlane Package Contents",
  "Shared Manifest Contract",
  "Package-Specific Contract",
  "Release Review",
  "Root package remains private",
  "Do not add `repository`, `homepage`, or `bugs` fields until the final Bootlane repository URL is confirmed.",
  "pnpm docs:check-package-contents",
  "pnpm release-safety:check",
  "pnpm pack:dry-run",
  "pnpm verify:release",
  "npm publish --dry-run --access public",
  "no `.tgz` artifacts"
]) {
  assertIncludes(docs, expected, `PACKAGE_CONTENTS should include ${expected}`);
}

for (const expected of [
  "version: `0.1.0`",
  "private: `false`",
  "license: `MIT`",
  "type: `module`",
  "engines.node: `>=22.12`",
  "publishConfig.access: `public`"
]) {
  assertIncludes(docs, expected, `PACKAGE_CONTENTS should document shared manifest field ${expected}`);
}

for (const fileGlob of packageFileGlobs) {
  assertIncludes(docs, `\`${fileGlob}\``, `PACKAGE_CONTENTS should document package files glob ${fileGlob}`);
}

for (const packageContract of packageContracts) {
  const packageJson = JSON.parse(await read(path.join(packageContract.relativeDir, "package.json")));

  assertIncludes(docs, packageContract.name, `PACKAGE_CONTENTS should document ${packageContract.name}`);
  assertIncludes(docs, packageContract.relativeDir, `PACKAGE_CONTENTS should document ${packageContract.relativeDir}`);
  assertIncludes(docs, packageContract.role, `PACKAGE_CONTENTS should document ${packageContract.name} role`);
  assertIncludes(docs, packageJson.description, `PACKAGE_CONTENTS should document ${packageContract.name} description`);

  for (const file of packageContract.requiredFiles) {
    assertIncludes(docs, `\`${file}\``, `PACKAGE_CONTENTS should document ${packageContract.name} packed file ${file}`);
  }

  for (const content of packageContract.requiredReadmeContent) {
    assertIncludes(docs, `\`${content}\``, `PACKAGE_CONTENTS should document ${packageContract.name} README content ${content}`);
  }

  for (const dependency of packageContract.requiredDependencies) {
    assertIncludes(docs, `\`${dependency}\``, `PACKAGE_CONTENTS should document ${packageContract.name} dependency ${dependency}`);
  }

  for (const expectation of packageContract.manifestExpectations) {
    assertIncludes(docs, `\`${expectation}\``, `PACKAGE_CONTENTS should document ${packageContract.name} ${expectation}`);
  }
}

for (const [name, content] of [
  ["README", readme],
  ["Contributing guide", contributing],
  ["Release notes", release],
  ["Quality gates", qualityGates]
]) {
  assertIncludes(content, "PACKAGE_CONTENTS.md", `${name} should link package contents`);
  assertIncludes(content, "pnpm docs:check-package-contents", `${name} should document package contents validation`);
}

assertIncludes(githubActions, "pnpm docs:check-package-contents", "CI should run package contents docs validation");
assertIncludes(verifyRelease, "release-gate-contracts.mjs", "verify release should use release gate contract");
assertIncludes(gateContracts, "check-package-contents-doc.mjs", "release gate contract should run package contents docs validation");
assertIncludes(metadataCheck, "docs:check-package-contents", "metadata check should guard package contents docs script");
assertIncludes(packDryRun, "package-contracts.mjs", "pack dry-run should use shared package contracts");

log("ok package contents doc");

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
