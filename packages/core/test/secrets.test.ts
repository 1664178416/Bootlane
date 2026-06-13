import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { committedEnvFiles, scanSecrets } from "../src/scanners/secrets.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

describe("secret scanner", () => {
  it("redacts every supported secret pattern preview", async () => {
    const tempRoot = path.join(repoRoot, ".cache");
    await mkdir(tempRoot, { recursive: true });
    const tempDir = await mkdtemp(path.join(tempRoot, "secret-scanner-"));
    const secrets = [
      {
        id: "security.secret.github-token",
        label: "GitHub token",
        file: "tokens.md",
        value: "ghp_abcdefghijklmnopqrstuvwxyz123456",
        preview: "ghp_...3456"
      },
      {
        id: "security.secret.aws-access-key",
        label: "AWS access key ID",
        file: "aws.json",
        value: "AKIA1234567890ABCDEF",
        preview: "AKIA...CDEF"
      },
      {
        id: "security.secret.openai-key",
        label: "OpenAI API key",
        file: ".env",
        value: "sk-abcdefghijklmnopqrstuvwxyz0123456789",
        preview: "sk-a...6789"
      },
      {
        id: "security.secret.private-key",
        label: "Private key block",
        file: "private-key.yaml",
        value: "-----BEGIN PRIVATE KEY-----",
        preview: "----...----"
      }
    ];

    try {
      for (const secret of secrets) {
        await writeFile(path.join(tempDir, secret.file), `line one\nSECRET=${secret.value}\n`, "utf8");
      }

      const hits = await scanSecrets(
        tempDir,
        secrets.map((secret) => secret.file)
      );

      expect(hits).toHaveLength(secrets.length);
      for (const secret of secrets) {
        const hit = hits.find((item) => item.id === secret.id);

        expect(hit).toMatchObject({
          id: secret.id,
          label: secret.label,
          file: secret.file,
          line: 2,
          preview: secret.preview
        });
        expect(hit?.preview).not.toBe(secret.value);
        expect(JSON.stringify(hit)).not.toContain(secret.value);
      }
    } finally {
      await rm(tempDir, { recursive: true, force: true });
    }
  });

  it("classifies committed env files without flagging .env.example", () => {
    expect(committedEnvFiles([".env", ".env.local", ".env.example", "app/.env.production"])).toEqual([
      ".env",
      ".env.local",
      "app/.env.production"
    ]);
  });
});
