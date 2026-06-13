import { readJsonFile } from "../files.js";
import type { PackageJsonSummary, PackageManager, ProjectSummary } from "../types.js";

type RawPackageJson = {
  name?: string;
  version?: string;
  scripts?: Record<string, string>;
  engines?: {
    node?: string;
  };
  packageManager?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  volta?: {
    node?: string;
  };
};

export async function detectNodeProject(targetPath: string, files: string[]): Promise<ProjectSummary | undefined> {
  const packageJson = await readJsonFile<RawPackageJson>(targetPath, "package.json");

  if (!packageJson) {
    return undefined;
  }

  const summary: PackageJsonSummary = {
    name: packageJson.name,
    version: packageJson.version,
    scripts: packageJson.scripts ?? {},
    engines: packageJson.engines,
    volta: packageJson.volta,
    packageManager: packageJson.packageManager,
    dependencies: packageJson.dependencies ?? {},
    devDependencies: packageJson.devDependencies ?? {}
  };

  return {
    type: "node",
    frameworks: detectFrameworks(summary),
    packageManager: detectPackageManager(files, summary.packageManager),
    packageJson: summary
  };
}

export function detectPackageManager(files: string[], declaredPackageManager?: string): PackageManager {
  if (declaredPackageManager) {
    const name = declaredPackageManager.split("@")[0];
    if (name === "npm" || name === "pnpm" || name === "yarn" || name === "bun") {
      return name;
    }
  }

  if (files.includes("pnpm-lock.yaml")) {
    return "pnpm";
  }

  if (files.includes("package-lock.json") || files.includes("npm-shrinkwrap.json")) {
    return "npm";
  }

  if (files.includes("yarn.lock")) {
    return "yarn";
  }

  if (files.includes("bun.lockb") || files.includes("bun.lock")) {
    return "bun";
  }

  return "unknown";
}

function detectFrameworks(packageJson: PackageJsonSummary): string[] {
  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies
  };

  const frameworkRules: Array<[string, string[]]> = [
    ["Next.js", ["next"]],
    ["Vite", ["vite"]],
    ["React", ["react"]],
    ["Vue", ["vue"]],
    ["Svelte", ["svelte", "@sveltejs/kit"]],
    ["Astro", ["astro"]],
    ["Express", ["express"]],
    ["NestJS", ["@nestjs/core"]]
  ];

  return frameworkRules
    .filter(([, packages]) => packages.some((packageName) => packageName in allDeps))
    .map(([label]) => label);
}
