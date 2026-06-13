import { readFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import type { BootlaneConfig } from "./types.js";

const severitySchema = z.enum(["critical", "warning", "info"]);
const checkOverrideSchema = z.enum(["off", "info", "warn", "error"]);

const configSchema = z.object({
  ignore: z.array(z.string()).optional(),
  failOn: severitySchema.optional(),
  checks: z.record(checkOverrideSchema).optional()
});

export const defaultConfigFileName = "bootlane.config.json";

export const defaultIgnore = [
  "**/node_modules/**",
  "**/.git/**",
  "**/dist/**",
  "**/build/**",
  "**/coverage/**",
  "**/.next/**",
  "**/.turbo/**",
  "**/.cache/**"
];

export function resolveConfig(input: Partial<BootlaneConfig> = {}): BootlaneConfig {
  const parsed = configSchema.parse(input);

  return {
    ignore: [...defaultIgnore, ...(parsed.ignore ?? [])],
    failOn: parsed.failOn ?? "critical",
    checks: parsed.checks ?? {}
  };
}

export type LoadedConfig = {
  path?: string;
  config: Partial<BootlaneConfig>;
};

export async function loadConfigFile(targetPath: string, explicitConfigPath?: string): Promise<LoadedConfig> {
  const configPath = explicitConfigPath
    ? path.resolve(explicitConfigPath)
    : path.join(targetPath, defaultConfigFileName);

  let content: string;
  try {
    content = await readFile(configPath, "utf8");
  } catch (error) {
    if (!explicitConfigPath && isMissingFile(error)) {
      return {
        config: {}
      };
    }

    throw new Error(`Could not read Bootlane config at ${configPath}.`);
  }

  try {
    const raw = JSON.parse(content) as unknown;
    return {
      path: configPath,
      config: configSchema.parse(raw)
    };
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(`Invalid Bootlane config at ${configPath}: ${reason}`);
  }
}

export function mergeConfig(
  base: Partial<BootlaneConfig> = {},
  override: Partial<BootlaneConfig> = {}
): Partial<BootlaneConfig> {
  return {
    ignore: [...(base.ignore ?? []), ...(override.ignore ?? [])],
    failOn: override.failOn ?? base.failOn,
    checks: {
      ...(base.checks ?? {}),
      ...(override.checks ?? {})
    }
  };
}

function isMissingFile(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "ENOENT";
}
