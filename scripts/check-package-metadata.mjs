import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rootPackage = await readJson(path.join(rootDir, "package.json"));
const corePackage = await readJson(path.join(rootDir, "packages", "core", "package.json"));
const cliPackage = await readJson(path.join(rootDir, "packages", "cli", "package.json"));
const releaseSafety = await readFile(path.join(rootDir, "scripts", "check-release-safety.mjs"), "utf8");

const workspaceVersion = rootPackage.version;

assertEqual(rootPackage.name, "bootlane-repo", "root package name");
assertEqual(rootPackage.private, true, "root package should stay private");
assertEqual(rootPackage.license, "MIT", "root package license");
assertEqual(rootPackage.type, "module", "root package module type");
assertEqual(rootPackage.engines?.node, ">=22.12", "root Node engine");
assertEqual(rootPackage.packageManager, "pnpm@8.15.3", "root package manager");
assertScript(rootPackage, "build", "tsc -b");
assertScript(rootPackage, "test", "vitest run");
assertScript(rootPackage, "docs:check-contributing", "node scripts/check-contributing-doc.mjs");
assertScript(rootPackage, "docs:check-templates", "node scripts/check-github-templates.mjs");
assertScript(rootPackage, "docs:check-triage", "node scripts/check-triage-doc.mjs");
assertScript(rootPackage, "docs:check-quality-gates", "node scripts/check-quality-gates-doc.mjs");
assertScript(rootPackage, "ci:workflow:check", "node scripts/check-ci-workflow-contract.mjs");
assertScript(rootPackage, "docs:check-security", "node scripts/check-security-doc.mjs");
assertScript(rootPackage, "docs:check-package-contents", "node scripts/check-package-contents-doc.mjs");
assertScript(rootPackage, "docs:check-release-evidence", "node scripts/check-release-evidence-doc.mjs");
assertScript(rootPackage, "docs:check-changelog", "node scripts/check-changelog-doc.mjs");
assertScript(rootPackage, "docs:check-ids", "node scripts/check-id-catalog.mjs");
assertScript(rootPackage, "docs:check-release-blockers", "node scripts/check-release-blockers-doc.mjs");
assertScript(
  rootPackage,
  "docs:check-release-safety-fixtures",
  "node scripts/check-release-safety-fixtures-doc.mjs"
);
assertScript(rootPackage, "example:report", "node scripts/generate-example-report.mjs");
assertScript(rootPackage, "example:report:check", "node scripts/generate-example-report.mjs --check");
assertScript(rootPackage, "release:evidence", "node scripts/generate-release-evidence-snapshot.mjs");
assertScript(rootPackage, "release:evidence:check", "node scripts/generate-release-evidence-snapshot.mjs --check");
assertScript(rootPackage, "release:gates:check", "node scripts/check-release-gate-contracts.mjs");
assertScript(rootPackage, "metadata:check", "node scripts/check-package-metadata.mjs");
assertScript(rootPackage, "release-safety:check", "node scripts/check-release-safety.mjs");
assertScript(rootPackage, "release-safety:fixtures", "node scripts/check-release-safety-fixtures.mjs");
assertScript(rootPackage, "npm-names:check", "node scripts/check-npm-package-names.mjs");
assertScript(rootPackage, "smoke:bin", "node scripts/smoke-bin.mjs");
assertScript(rootPackage, "smoke:packed-install", "node scripts/smoke-packed-install.mjs");
assertScript(rootPackage, "pack:dry-run", "node scripts/pack-dry-run.mjs");
assertScript(rootPackage, "verify:release", "node scripts/verify-release.mjs");

assertPublishablePackage(corePackage, {
  name: "@bootlane/core",
  version: workspaceVersion,
  requiredKeywords: ["repository", "diagnostics", "readiness", "static-analysis", "node", "python"],
  requiredFiles: ["dist/**/*.js", "dist/**/*.d.ts", "dist/**/*.js.map", "dist/**/*.d.ts.map", "README.md", "LICENSE"]
});
assertEqual(corePackage.types, "./dist/index.d.ts", "@bootlane/core types entry");
assertEqual(corePackage.exports?.["."]?.types, "./dist/index.d.ts", "@bootlane/core exported types");
assertEqual(corePackage.exports?.["."]?.import, "./dist/index.js", "@bootlane/core exported import");
assertDependency(corePackage, "fast-glob");
assertDependency(corePackage, "zod");

assertPublishablePackage(cliPackage, {
  name: "bootlane",
  version: workspaceVersion,
  requiredKeywords: ["cli", "repository", "diagnostics", "readiness", "setup", "github-actions", "node", "python"],
  requiredFiles: ["dist/**/*.js", "dist/**/*.d.ts", "dist/**/*.js.map", "dist/**/*.d.ts.map", "README.md", "LICENSE"]
});
assertEqual(cliPackage.bin?.bootlane, "./dist/index.js", "bootlane bin entry");
assertEqual(cliPackage.types, "./dist/index.d.ts", "bootlane types entry");
assertEqual(cliPackage.exports?.["."]?.types, "./dist/index.d.ts", "bootlane exported types");
assertEqual(cliPackage.exports?.["."]?.import, "./dist/index.js", "bootlane exported import");
assertEqual(cliPackage.dependencies?.["@bootlane/core"], `^${workspaceVersion}`, "bootlane core dependency version");
assertDependency(cliPackage, "commander");
assertDependency(cliPackage, "picocolors");

await assertPackageFiles("packages/core", ["README.md", "LICENSE"]);
await assertPackageFiles("packages/cli", ["README.md", "LICENSE"]);
await access(path.join(rootDir, "scripts", "release-gate-contracts.mjs"));
assert(releaseSafety.includes("repository"), "release safety should guard repository metadata");
assert(releaseSafety.includes("npm publish"), "release safety should guard publish automation");

log(`ok package metadata (${workspaceVersion})`);

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

function assertPublishablePackage(packageJson, options) {
  assertEqual(packageJson.name, options.name, `${options.name} package name`);
  assertEqual(packageJson.version, options.version, `${options.name} package version`);
  assertEqual(packageJson.private, false, `${options.name} should be publishable`);
  assertEqual(packageJson.license, "MIT", `${options.name} license`);
  assertEqual(packageJson.type, "module", `${options.name} module type`);
  assertEqual(packageJson.engines?.node, ">=22.12", `${options.name} Node engine`);
  assertEqual(packageJson.publishConfig?.access, "public", `${options.name} npm access`);

  for (const keyword of options.requiredKeywords) {
    assert(packageJson.keywords?.includes(keyword), `${options.name} should include keyword ${keyword}`);
  }

  for (const file of options.requiredFiles) {
    assert(packageJson.files?.includes(file), `${options.name} should include files entry ${file}`);
  }

  assertScript(packageJson, "build", "tsc -b");
  assertScript(packageJson, "typecheck", "tsc -b --pretty false");
  assertScript(packageJson, "test", "vitest run");
}

function assertDependency(packageJson, name) {
  assert(typeof packageJson.dependencies?.[name] === "string", `${packageJson.name} should depend on ${name}`);
}

function assertScript(packageJson, name, expected) {
  assertEqual(packageJson.scripts?.[name], expected, `${packageJson.name} script ${name}`);
}

async function assertPackageFiles(packageDir, files) {
  for (const file of files) {
    await access(path.join(rootDir, packageDir, file));
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function log(message) {
  process.stdout.write(`${message}\n`);
}
