import chalk from "chalk";
import { ExecaError } from "execa";

export function formatError(error: unknown): string {
  if (error instanceof ExecaError) {
    return chalk.red(error.shortMessage);
  }

  if (error instanceof Error) {
    return chalk.red(error.message);
  }

  return chalk.red(String(error));
}
