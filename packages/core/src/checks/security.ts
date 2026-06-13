import { committedEnvFiles, scanSecrets } from "../scanners/secrets.js";
import type { Check } from "../types.js";
import { finding } from "./helpers.js";

export const securityCheck: Check = {
  id: "security.secrets",
  category: "security",
  appliesTo: () => true,
  async run(context) {
    const findings = [];
    const envFiles = committedEnvFiles(context.files);

    if (envFiles.length > 0) {
      findings.push(
        finding({
          id: "security.env-file.committed",
          category: "security",
          title: "Environment file appears to be committed",
          severity: "critical",
          message: `Committed env files can expose local secrets: ${envFiles.join(", ")}.`,
          suggestion: "Remove real env files from git and keep only .env.example.",
          files: envFiles,
          confidence: "high"
        })
      );
    }

    const secrets = await scanSecrets(context.targetPath, context.files);
    if (secrets.length > 0) {
      const files = [...new Set(secrets.map((secret) => secret.file))].sort((a, b) => a.localeCompare(b));
      findings.push(
        finding({
          id: "security.secret-pattern.detected",
          category: "security",
          title: "Potential secret detected",
          severity: "critical",
          message: secrets
            .map((secret) => `${secret.label} in ${secret.file}:${secret.line} (${secret.preview})`)
            .join("; "),
          suggestion: "Rotate the secret if it was real, remove it from history, and use environment variables instead.",
          files,
          confidence: "high"
        })
      );
    }

    return findings;
  }
};

