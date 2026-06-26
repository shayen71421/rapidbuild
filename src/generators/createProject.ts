import path from "node:path";
import process from "node:process";
import chalk from "chalk";
import fs from "fs-extra";
import ora from "ora";
import { getTemplate } from "./templateRegistry.js";
import { renderTemplateDirectory } from "../utils/renderTemplateDirectory.js";
import { installDependencies } from "../installers/packageInstaller.js";
import { initializeGitRepository } from "../installers/git.js";
import { loadPlugins } from "../plugins/loader.js";
import { mergePackageJson } from "../utils/packageJson.js";
import type { Plugin, ProjectConfig } from "../types.js";

export async function createProject(config: ProjectConfig): Promise<void> {
  const targetDir = path.resolve(process.cwd(), config.projectName);
  const template = getTemplate(config.template);
  const plugins = await loadPlugins(config);
  const context = { config, targetDir };

  if (await fs.pathExists(targetDir)) {
    const files = await fs.readdir(targetDir);
    if (files.length > 0) {
      throw new Error(`Target directory "${config.projectName}" already exists and is not empty.`);
    }
  }

  const spinner = ora(`Creating ${chalk.cyan(config.projectName)}`).start();
  try {
    await fs.ensureDir(targetDir);
    await renderTemplateDirectory(template.directory, targetDir, config);
    await applyPluginMetadata(config, targetDir, plugins);

    for (const plugin of plugins) {
      await plugin.install?.(context);
    }

    spinner.succeed("Project files generated");
  } catch (error) {
    spinner.fail("Failed to generate project files");
    throw error;
  }

  if (config.installDependencies) {
    await installDependencies(targetDir, config.packageManager);
  }

  for (const plugin of plugins) {
    await plugin.postInstall?.(context);
  }

  if (config.initializeGit) {
    await initializeGitRepository(targetDir);
  }

  printNextSteps(config);
}

async function applyPluginMetadata(config: ProjectConfig, targetDir: string, plugins: Plugin[]): Promise<void> {
  const dependencies = unique(plugins.flatMap((plugin) => plugin.dependencies?.(config) ?? []));
  const devDependencies = unique(plugins.flatMap((plugin) => plugin.devDependencies?.(config) ?? []));
  const env = Object.assign({}, ...plugins.map((plugin) => plugin.envVariables?.(config) ?? {})) as Record<string, string>;

  await mergePackageJson(targetDir, {
    dependencies,
    devDependencies
  });

  if (Object.keys(env).length > 0) {
    const envPath = path.join(targetDir, ".env.example");
    const current = (await fs.pathExists(envPath)) ? await fs.readFile(envPath, "utf8") : "";
    const next = `${current.trim()}\n${Object.entries(env)
      .map(([key, value]) => `${key}=${value}`)
      .join("\n")}\n`;
    await fs.writeFile(envPath, next.trimStart());
  }
}

function unique(values: string[]): string[] {
  return [...new Set(values)].sort();
}

function printNextSteps(config: ProjectConfig): void {
  const commands = {
    npm: "npm run dev",
    pnpm: "pnpm dev",
    yarn: "yarn dev",
    bun: "bun run dev"
  };

  console.log();
  console.log(chalk.bold.green("RapidBuild app created."));
  console.log(`  cd ${config.projectName}`);
  if (!config.installDependencies) {
    console.log(`  ${config.packageManager} install`);
  }
  console.log(`  ${commands[config.packageManager]}`);
  console.log();
  console.log(chalk.dim("Edit .env.local with your Firebase keys before signing in."));
}
