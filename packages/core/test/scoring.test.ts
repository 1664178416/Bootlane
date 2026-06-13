import { describe, expect, it } from "vitest";
import { scoreFindings } from "../src/scoring.js";
import type { Finding } from "../src/types.js";

describe("scoreFindings", () => {
  it("applies the initial penalty model", () => {
    const findings: Finding[] = [
      {
        id: "a",
        category: "env",
        title: "Critical",
        severity: "critical",
        passed: false,
        message: "critical",
        confidence: "high"
      },
      {
        id: "b",
        category: "ci",
        title: "Info",
        severity: "info",
        passed: false,
        message: "info",
        confidence: "high"
      }
    ];

    expect(scoreFindings(findings)).toEqual({
      value: 83,
      max: 100,
      grade: "B"
    });
  });
});

