import path from "node:path";
import { fileURLToPath } from "node:url";

export const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const packageFileGlobs = [
  "dist/**/*.js",
  "dist/**/*.d.ts",
  "dist/**/*.js.map",
  "dist/**/*.d.ts.map",
  "README.md",
  "LICENSE"
];

export const packageContracts = [
  {
    dir: path.join(rootDir, "packages", "core"),
    relativeDir: "packages/core",
    name: "@bootlane/core",
    role: "Programmatic analysis engine",
    requiredFiles: [
      "LICENSE",
      "README.md",
      "package.json",
      "dist/index.js",
      "dist/index.d.ts",
      "dist/types.d.ts",
      "dist/reporters/json.js",
      "dist/reporters/markdown.js",
      "dist/fixers/index.js"
    ],
    requiredReadmeContent: ["Programmatic Usage", "Read-Only Contract", "renderJsonReport"],
    requiredDependencies: ["fast-glob", "zod"],
    manifestExpectations: [
      "types: ./dist/index.d.ts",
      "exports[.].types: ./dist/index.d.ts",
      "exports[.].import: ./dist/index.js"
    ]
  },
  {
    dir: path.join(rootDir, "packages", "cli"),
    relativeDir: "packages/cli",
    name: "bootlane",
    role: "Executable CLI package",
    requiredFiles: [
      "LICENSE",
      "README.md",
      "package.json",
      "dist/index.js",
      "dist/index.d.ts",
      "dist/program.js",
      "dist/terminal.js"
    ],
    requiredReadmeContent: [
      "Quick Start",
      "What Bootlane Checks",
      "Output Formats",
      "CI Usage",
      "bootlane.config.json",
      "Fix Previews",
      "Read-Only Contract",
      "--ci --fail-on critical",
      "--print-config",
      "@bootlane/core"
    ],
    requiredDependencies: ["@bootlane/core", "commander", "picocolors"],
    manifestExpectations: [
      "bin.bootlane: ./dist/index.js",
      "types: ./dist/index.d.ts",
      "exports[.].types: ./dist/index.d.ts",
      "exports[.].import: ./dist/index.js"
    ]
  }
];
