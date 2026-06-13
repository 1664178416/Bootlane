import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { analyzeProject, loadConfigFile, mergeConfig, resolveConfig } from "../src/index.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const fixtureRoot = path.join(repoRoot, "examples", "fixtures");

describe("Bootlane config", () => {
  it("loads bootlane.config.json from a target repo", async () => {
    const loaded = await loadConfigFile(path.join(fixtureRoot, "node-configured"));

    expect(loaded.path).toContain("bootlane.config.json");
    expect(loaded.config.failOn).toBe("warning");
    expect(loaded.config.checks?.["ci.github-actions.missing"]).toBe("off");
  });

  it("applies check overrides during analysis", async () => {
    const loaded = await loadConfigFile(path.join(fixtureRoot, "node-configured"));
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "node-configured"),
      config: loaded.config,
      now: new Date("2026-06-07T00:00:00.000Z")
    });

    const runtimeFinding = report.findings.find((finding) => finding.id === "runtime.node-version.missing");

    expect(runtimeFinding?.severity).toBe("critical");
    expect(report.findings.map((finding) => finding.id)).not.toContain("ci.github-actions.missing");
  });

  it("lets overrides win over base config", () => {
    const merged = mergeConfig(
      {
        failOn: "warning",
        checks: {
          "ci.github-actions.missing": "off"
        },
        ignore: ["tmp/**"]
      },
      {
        failOn: "critical",
        checks: {
          "ci.github-actions.missing": "warn"
        },
        ignore: ["generated/**"]
      }
    );

    expect(resolveConfig(merged)).toMatchObject({
      failOn: "critical",
      checks: {
        "ci.github-actions.missing": "warn"
      }
    });
    expect(resolveConfig(merged).ignore).toEqual(expect.arrayContaining(["tmp/**", "generated/**"]));
  });

  it("applies ignore patterns to file scanning", async () => {
    const loaded = await loadConfigFile(path.join(fixtureRoot, "node-ignore-config"));
    const report = await analyzeProject({
      targetPath: path.join(fixtureRoot, "node-ignore-config"),
      config: loaded.config,
      now: new Date("2026-06-08T00:00:00.000Z")
    });

    expect(report.findings.map((finding) => finding.id)).not.toContain("env.example.missing");
    expect(report.findings.map((finding) => finding.id)).not.toContain("ci.github-actions.missing");
    expect(report.score.value).toBe(100);
  });
});
