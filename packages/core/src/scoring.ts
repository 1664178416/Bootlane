import type { Finding, Score } from "./types.js";

const penalties = {
  critical: 15,
  warning: 6,
  info: 2
} as const;

export function scoreFindings(findings: Finding[]): Score {
  const penalty = findings
    .filter((finding) => !finding.passed)
    .reduce((total, finding) => total + penalties[finding.severity], 0);

  const value = Math.max(0, 100 - penalty);

  return {
    value,
    max: 100,
    grade: gradeScore(value)
  };
}

function gradeScore(score: number): Score["grade"] {
  if (score >= 90) {
    return "A";
  }

  if (score >= 75) {
    return "B";
  }

  if (score >= 60) {
    return "C";
  }

  if (score >= 40) {
    return "D";
  }

  return "F";
}

