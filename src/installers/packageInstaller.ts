import ora from "ora";
import { execa } from "execa";
import type { PackageManager } from "../types.js";

const installCommands: Record<PackageManager, string[]> = {
  npm: ["install"],
  pnpm: ["install"],
  yarn: ["install"],
  bun: ["install"]
};

export async function installDependencies(cwd: string, packageManager: PackageManager): Promise<void> {
  const spinner = ora(`Installing dependencies with ${packageManager}`).start();
  try {
    await execa(packageManager, installCommands[packageManager], {
      cwd,
      stdio: "ignore"
    });
    spinner.succeed("Dependencies installed");
  } catch (error) {
    spinner.fail("Dependency installation failed");
    throw error;
  }
}
