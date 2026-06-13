import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { checkReleaseSafety } from "./check-release-safety.mjs";

export const releaseSafetyFixtureCleanCase = {
  name: "clean release safety fixture",
  covers: "baseline package manifests, read-only CI permissions, and first-publish guardrail docs",
  expected: "passes release safety without forbidden first-publish drift"
};

export const releaseSafetyFixtureCases = [
  {
    name: "root repository metadata",
    covers: "root package `repository` metadata",
    mutate: (fixture) => {
      fixture.packages.root.repository = { type: "git", url: "https://example.com/bootlane.git" };
    },
    expected: "root package should not define repository"
  },
  {
    name: "core homepage metadata",
    covers: "@bootlane/core `homepage` metadata",
    mutate: (fixture) => {
      fixture.packages.core.homepage = "https://example.com/bootlane";
    },
    expected: "@bootlane/core should not define homepage"
  },
  {
    name: "cli bugs metadata",
    covers: "bootlane CLI `bugs` metadata",
    mutate: (fixture) => {
      fixture.packages.cli.bugs = { url: "https://example.com/bootlane/issues" };
    },
    expected: "bootlane should not define bugs"
  },
  {
    name: "release workflow trigger",
    covers: "GitHub Actions `release` trigger",
    mutate: (fixture) => {
      fixture.workflow = workflowWith("  release:\n    types: [published]");
    },
    expected: "should not define a release event yet"
  },
  {
    name: "manual workflow dispatch",
    covers: "GitHub Actions `workflow_dispatch` trigger",
    mutate: (fixture) => {
      fixture.workflow = workflowWith("  workflow_dispatch:");
    },
    expected: "should not define manual dispatch yet"
  },
  {
    name: "npm publish command",
    covers: "`npm publish` workflow automation",
    mutate: (fixture) => {
      fixture.workflow = workflowWithStep("npm publish --access public");
    },
    expected: "should not run npm publish yet"
  },
  {
    name: "npm provenance flag",
    covers: "`--provenance` workflow settings",
    mutate: (fixture) => {
      fixture.workflow = workflowWithStep("echo --provenance");
    },
    expected: "should not configure npm provenance yet"
  },
  {
    name: "id-token write permission",
    covers: "GitHub Actions `id-token: write` permission",
    mutate: (fixture) => {
      fixture.workflow = workflowWithPermissions("  contents: read\n  id-token: write");
    },
    expected: "should not request id-token write before publish automation exists"
  },
  {
    name: "contents write permission",
    covers: "GitHub Actions `contents: write` permission",
    mutate: (fixture) => {
      fixture.workflow = workflowWithPermissions("  contents: write");
    },
    expected: "should not request contents write before release automation exists"
  },
  {
    name: "npm token reference",
    covers: "npm publish token references",
    mutate: (fixture) => {
      fixture.workflow = workflowWithStep("echo $NPM_TOKEN");
    },
    expected: "should not reference npm publish tokens"
  }
];

export async function runReleaseSafetyFixtures() {
  await withFixture(releaseSafetyFixtureCleanCase.name, async (rootDir) => {
    await checkReleaseSafety({ rootDir });
  });

  for (const testCase of releaseSafetyFixtureCases) {
    await withFixture(testCase.name, async (rootDir, fixture) => {
      testCase.mutate(fixture);
      await writeFixture(rootDir, fixture);
      await expectFailure(rootDir, testCase.expected, testCase.name);
    });
  }

  log(`ok release safety fixtures (${releaseSafetyFixtureCases.length} negative cases)`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await runReleaseSafetyFixtures();
}

async function withFixture(name, callback) {
  const rootDir = await mkdtemp(path.join(os.tmpdir(), "bootlane-release-safety-"));
  const fixture = baseFixture();

  try {
    await writeFixture(rootDir, fixture);
    await callback(rootDir, fixture);
  } finally {
    await rm(rootDir, { recursive: true, force: true });
  }
}

async function expectFailure(rootDir, expected, name) {
  try {
    await checkReleaseSafety({ rootDir });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    assert(message.includes(expected), `${name} should fail with ${JSON.stringify(expected)}, got ${JSON.stringify(message)}`);
    return;
  }

  throw new Error(`${name} should fail release safety`);
}

async function writeFixture(rootDir, fixture) {
  await writeJson(path.join(rootDir, "package.json"), fixture.packages.root);
  await writeJson(path.join(rootDir, "packages", "core", "package.json"), fixture.packages.core);
  await writeJson(path.join(rootDir, "packages", "cli", "package.json"), fixture.packages.cli);
  await writeText(path.join(rootDir, ".github", "workflows", "ci.yml"), fixture.workflow);

  for (const [relativePath, content] of Object.entries(fixture.docs)) {
    await writeText(path.join(rootDir, relativePath), content);
  }
}

async function writeJson(filePath, value) {
  await writeText(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

async function writeText(filePath, value) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, value, "utf8");
}

function baseFixture() {
  return {
    packages: {
      root: { name: "bootlane-repo", version: "0.1.0", private: true },
      core: { name: "@bootlane/core", version: "0.1.0", private: false },
      cli: { name: "bootlane", version: "0.1.0", private: false }
    },
    workflow: baseWorkflow(),
    docs: {
      "docs/RELEASE.md": releaseDoc(),
      "docs/RELEASE_BLOCKERS.md": "Final Bootlane repository URL remains a release blocker.\n",
      "docs/RELEASE_EVIDENCE.md": [
        "Final Bootlane repository URL must be confirmed.",
        "Do not use a green local gate as publish approval by itself.",
        "Do not publish `bootlane` before `@bootlane/core`."
      ].join("\n"),
      "docs/QUALITY_GATES.md": [
        "Final Bootlane repository URL must be confirmed.",
        "Do not use a green local gate as publish approval.",
        "Manual repository identity checks stay outside CI."
      ].join("\n"),
      "docs/PACKAGE_CONTENTS.md": [
        "Final Bootlane repository URL must be confirmed.",
        "Do not add `repository`, `homepage`, or `bugs` fields until then."
      ].join("\n")
    }
  };
}

function releaseDoc() {
  return [
    "Final Bootlane repository URL must be confirmed.",
    "Do not use a green local gate as publish approval by itself.",
    "The first publish should be manual.",
    "Do not add `repository`, `homepage`, or `bugs` fields until the final repository URL is confirmed."
  ].join("\n");
}

function baseWorkflow() {
  return [
    "name: CI",
    "on:",
    "  pull_request:",
    "  push:",
    "    branches:",
    "      - main",
    "permissions:",
    "  contents: read",
    "jobs:",
    "  test:",
    "    runs-on: ubuntu-latest",
    "    steps:",
    "      - run: pnpm build",
    ""
  ].join("\n");
}

function workflowWith(event) {
  return baseWorkflow().replace("  push:\n", `${event}\n  push:\n`);
}

function workflowWithPermissions(permissions) {
  return baseWorkflow().replace("  contents: read", permissions);
}

function workflowWithStep(command) {
  return baseWorkflow().replace("      - run: pnpm build", `      - run: ${command}`);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function log(message) {
  process.stdout.write(`${message}\n`);
}
