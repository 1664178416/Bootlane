export type Severity = "critical" | "warning" | "info";

export type CheckCategory =
  | "project"
  | "dependencies"
  | "runtime"
  | "readme"
  | "env"
  | "tests"
  | "security"
  | "ci";

export type Confidence = "high" | "medium" | "low";

export type Finding = {
  id: string;
  category: CheckCategory;
  title: string;
  severity: Severity;
  passed: boolean;
  message: string;
  suggestion?: string;
  files?: string[];
  confidence: Confidence;
};

export type FixProposal = {
  id: string;
  title: string;
  description: string;
  findingIds: string[];
  action: {
    type: "create_file" | "append_file";
    path: string;
    content: string;
  };
  safety: "safe" | "review";
  confidence: Confidence;
};

export type Score = {
  value: number;
  max: 100;
  grade: "A" | "B" | "C" | "D" | "F";
};

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun" | "pip" | "uv" | "poetry" | "pipenv" | "unknown";

export type ProjectSummary = {
  type: "node" | "python" | "unknown";
  frameworks: string[];
  packageManager: PackageManager;
  packageJson?: PackageJsonSummary;
  python?: PythonProjectSummary;
};

export type PackageJsonSummary = {
  name?: string;
  version?: string;
  scripts: Record<string, string>;
  engines?: {
    node?: string;
  };
  volta?: {
    node?: string;
  };
  packageManager?: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
};

export type PythonProjectSummary = {
  name?: string;
  version?: string;
  requiresPython?: string;
  dependencyFiles: string[];
  testTools: string[];
};

export type BootlaneReport = {
  schemaVersion: "1";
  toolVersion: string;
  targetPath: string;
  project: ProjectSummary;
  score: Score;
  findings: Finding[];
  fixProposals: FixProposal[];
  generatedAt: string;
};

export type BootlaneConfig = {
  ignore: string[];
  failOn: Severity;
  checks: Record<string, "off" | "info" | "warn" | "error">;
};

export type AnalyzeOptions = {
  targetPath: string;
  toolVersion?: string;
  config?: Partial<BootlaneConfig>;
  now?: Date;
};

export type EnvVarUsage = {
  name: string;
  files: string[];
  confidence: Confidence;
};

export type SecretHit = {
  id: string;
  label: string;
  file: string;
  line: number;
  preview: string;
};

export type ProjectContext = {
  targetPath: string;
  config: BootlaneConfig;
  project: ProjectSummary;
  files: string[];
};

export type Check = {
  id: string;
  category: CheckCategory;
  appliesTo(context: ProjectContext): boolean | Promise<boolean>;
  run(context: ProjectContext): Promise<Finding[]>;
};
