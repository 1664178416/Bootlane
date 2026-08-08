import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { getEnvExampleNames, getEnvUsages } from "../src/scanners/env.js";
import type { ProjectContext } from "../src/types.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

describe("environment scanner cache", () => {
  it("reuses env usage and .env.example reads within one project context", async () => {
    const tempRoot = path.join(repoRoot, ".cache");
    await mkdir(tempRoot, { recursive: true });
    const tempDir = await mkdtemp(path.join(tempRoot, "env-cache-"));

    try {
      await mkdir(path.join(tempDir, "src"));
      await writeFile(path.join(tempDir, "src", "index.ts"), "const apiUrl = process.env.API_URL;\n", "utf8");
      await writeFile(path.join(tempDir, ".env.example"), "API_URL=\n", "utf8");

      const context: ProjectContext = {
        targetPath: tempDir,
        config: {
          ignore: [],
          failOn: "critical",
          checks: {}
        },
        project: {
          type: "node",
          frameworks: [],
          packageManager: "npm",
          packageJson: {
            scripts: {},
            dependencies: {},
            devDependencies: {}
          }
        },
        files: ["src/index.ts", ".env.example"],
        cache: {}
      };

      const firstUsages = getEnvUsages(context);
      const secondUsages = getEnvUsages(context);
      const usages = await firstUsages;

      expect(secondUsages).toBe(firstUsages);
      expect(await secondUsages).toBe(usages);
      expect(usages.map((usage) => usage.name)).toEqual(["API_URL"]);

      const firstNames = getEnvExampleNames(context);
      const secondNames = getEnvExampleNames(context);
      const names = await firstNames;

      expect(secondNames).toBe(firstNames);
      expect(await secondNames).toBe(names);
      expect(names?.has("API_URL")).toBe(true);
    } finally {
      await rm(tempDir, { recursive: true, force: true });
    }
  });
});
