import type { Check, PackageManager } from "../types.js";
import { finding } from "./helpers.js";

type NodePackageManager = Extract<PackageManager, "npm" | "pnpm" | "yarn" | "bun">;

const nodePackageManagers = new Set<PackageManager>(["npm", "pnpm", "yarn", "bun"]);

const lockfiles: Record<NodePackageManager, string[]> = {
  npm: ["package-lock.json", "npm-shrinkwrap.json"],
  pnpm: ["pnpm-lock.yaml"],
  yarn: ["yarn.lock"],
  bun: ["bun.lockb", "bun.lock"]
};

export const dependenciesCheck: Check = {
  id: "dependencies.node",
  category: "dependencies",
  appliesTo: (context) => context.project.type === "node",
  async run(context) {
    const findings = [];
    const { project, files } = context;
    const lockfileSummary = getLockfileSummary(files);
    const declared = project.packageJson?.packageManager?.split("@")[0] as PackageManager | undefined;

    if (declared && nodePackageManagers.has(declared)) {
      const expectedLockfiles = lockfiles[declared as NodePackageManager] ?? [];
      const foundLockfiles = lockfileSummary
        .filter((entry) => entry.manager !== declared)
        .flatMap((entry) => entry.files);
      const hasExpectedLockfile = expectedLockfiles.some((lockfile) => files.includes(lockfile));
      const hasOtherLockfile = foundLockfiles.length > 0;

      if (!hasExpectedLockfile && hasOtherLockfile) {
        findings.push(
          finding({
            id: "dependencies.package-manager.mismatch",
            category: "dependencies",
            title: "Package manager metadata does not match lockfile",
            severity: "warning",
            message: `package.json declares ${declared}, expected ${formatList(expectedLockfiles)}, but found ${formatList(foundLockfiles)}.`,
            suggestion: `Run ${installCommand(declared)} and commit ${formatList(expectedLockfiles)}, or update packageManager if ${formatList(foundLockfiles)} is intentional.`,
            files: ["package.json", ...foundLockfiles],
            confidence: "high"
          })
        );
      } else if (!hasExpectedLockfile) {
        findings.push(
          finding({
            id: "dependencies.lockfile.missing",
            category: "dependencies",
            title: "Declared package manager lockfile is missing",
            severity: "warning",
            message: `package.json declares ${declared}, but Bootlane could not find ${formatList(expectedLockfiles)}.`,
            suggestion: `Run ${installCommand(declared)} and commit ${formatList(expectedLockfiles)} so installs are reproducible.`,
            files: ["package.json"],
            confidence: "high"
          })
        );
      }
    } else if (project.packageManager === "unknown") {
      findings.push(
        finding({
          id: "dependencies.lockfile.missing",
          category: "dependencies",
          title: "No lockfile found",
          severity: "warning",
          message: "Bootlane could not find npm, pnpm, yarn, or bun lockfile metadata.",
          suggestion: "Run your package manager install command and commit the generated lockfile so installs are reproducible.",
          files: ["package.json"],
          confidence: "high"
        })
      );
    }

    return findings;
  }
};

function getLockfileSummary(files: string[]): Array<{ manager: NodePackageManager; files: string[] }> {
  return Object.entries(lockfiles)
    .map(([manager, managerLockfiles]) => ({
      manager: manager as NodePackageManager,
      files: managerLockfiles.filter((lockfile) => files.includes(lockfile))
    }))
    .filter((entry) => entry.files.length > 0);
}

function installCommand(packageManager: PackageManager): string {
  switch (packageManager) {
    case "pnpm":
      return "pnpm install";
    case "yarn":
      return "yarn install";
    case "bun":
      return "bun install";
    case "npm":
    case "unknown":
    default:
      return "npm install";
  }
}

function formatList(values: string[]): string {
  if (values.length <= 1) {
    return values[0] ?? "";
  }

  return `${values.slice(0, -1).join(", ")} or ${values[values.length - 1]}`;
}
