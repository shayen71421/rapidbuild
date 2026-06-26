import ora from "ora";
import { execa } from "execa";

export async function initializeGitRepository(cwd: string): Promise<void> {
  const spinner = ora("Initializing git repository").start();
  try {
    await execa("git", ["init"], { cwd, stdio: "ignore" });
    await execa("git", ["add", "."], { cwd, stdio: "ignore" });
    await execa("git", ["commit", "-m", "Initial commit from rapidbuild"], { cwd, stdio: "ignore" });
    spinner.succeed("Git repository initialized");
  } catch {
    spinner.warn("Git initialization skipped or commit failed");
  }
}
