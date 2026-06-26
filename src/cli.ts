import { Command } from "commander";
import { createProject } from "./generators/createProject.js";
import { promptForConfig } from "./prompts/projectPrompts.js";
import { getPresetConfig, presetNames } from "./constants/presets.js";
import { DEFAULT_CONFIG } from "./constants/defaults.js";
import { resolvePackageManager } from "./utils/packageManager.js";
import { printBanner } from "./utils/banner.js";
import type { CliOptions, ProjectConfig } from "./types.js";

export async function runCli(argv = process.argv): Promise<void> {
  const program = new Command()
    .name("rapidbuild")
    .description("Create a fully configured hackathon-ready application.")
    .argument("[project-name]", "Name of the project directory")
    .option("-y, --yes", "Skip prompts and use defaults")
    .option("--preset <name>", `Use a preset: ${presetNames.join(", ")}`)
    .option("--template <name>", "Use a template directly, for example next-firebase")
    .option("--package-manager <pm>", "Package manager: npm, pnpm, yarn, or bun")
    .option("--no-install", "Skip dependency installation")
    .option("--no-git", "Skip git initialization and initial commit")
    .version("0.1.0");

  program.parse(argv);

  printBanner();

  const options = program.opts<CliOptions>();
  const projectName = program.args[0];
  const packageManager = await resolvePackageManager(options.packageManager);
  const presetConfig = options.preset ? getPresetConfig(options.preset) : {};

  const baseConfig: ProjectConfig = {
    ...DEFAULT_CONFIG,
    ...presetConfig,
    projectName: projectName ?? DEFAULT_CONFIG.projectName,
    packageManager,
    template: options.template ?? presetConfig.template ?? DEFAULT_CONFIG.template,
    installDependencies: options.install,
    initializeGit: options.git
  };

  const config = options.yes
    ? baseConfig
    : await promptForConfig(baseConfig, Boolean(projectName), Boolean(options.template), Boolean(options.preset));

  await createProject(config);
}
