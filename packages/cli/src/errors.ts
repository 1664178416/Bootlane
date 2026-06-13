export class CliError extends Error {
  readonly exitCode: number;
  readonly reported: boolean;

  constructor(message: string, exitCode: number, options: { reported?: boolean } = {}) {
    super(message);
    this.name = "CliError";
    this.exitCode = exitCode;
    this.reported = options.reported ?? false;
  }
}

export function usageError(message: string, options: { reported?: boolean } = {}): CliError {
  return new CliError(message, 2, options);
}

export function successfulExit(options: { reported?: boolean } = {}): CliError {
  return new CliError("", 0, options);
}

export function getExitCode(error: unknown): number {
  return error instanceof CliError ? error.exitCode : 3;
}

export function isReportedError(error: unknown): boolean {
  return error instanceof CliError && error.reported;
}
