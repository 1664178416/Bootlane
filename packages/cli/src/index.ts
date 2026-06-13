#!/usr/bin/env node
import { createProgram } from "./program.js";
import { getExitCode, isReportedError } from "./errors.js";

try {
  await createProgram().parseAsync(process.argv);
} catch (error) {
  const exitCode = getExitCode(error);
  const message = error instanceof Error ? error.message : String(error);
  if (message && !isReportedError(error)) {
    process.stderr.write(`${message}\n`);
  }
  process.exit(exitCode);
}
