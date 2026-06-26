#!/usr/bin/env node
import { runCli } from "./cli.js";
import { formatError } from "./utils/errors.js";

runCli().catch((error: unknown) => {
  console.error(formatError(error));
  process.exit(1);
});
