import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";
import fs from "fs-extra";
import { builtinPlugins } from "./registry.js";
import type { Plugin, ProjectConfig } from "../types.js";

export async function loadPlugins(config: ProjectConfig): Promise<Plugin[]> {
  const plugins = [...builtinPlugins.filter((plugin) => shouldUsePlugin(plugin.name, config))];
  plugins.push(...(await loadLocalPlugins(process.cwd())));
  return plugins;
}

async function loadLocalPlugins(cwd: string): Promise<Plugin[]> {
  const pluginsDir = path.join(cwd, "plugins");
  if (!(await fs.pathExists(pluginsDir))) {
    return [];
  }

  const entries = await fs.readdir(pluginsDir);
  const plugins: Plugin[] = [];

  for (const entry of entries) {
    const indexPath = path.join(pluginsDir, entry, "index.js");
    if (await fs.pathExists(indexPath)) {
      const mod = (await import(pathToFileURL(indexPath).href)) as { default?: Plugin; plugin?: Plugin };
      const plugin = mod.default ?? mod.plugin;
      if (plugin) {
        plugins.push(plugin);
      }
    }
  }

  return plugins;
}

function shouldUsePlugin(name: string, config: ProjectConfig): boolean {
  return (
    name === "core" ||
    name === "extras" ||
    (name === "ai" && config.ai !== "none") ||
    name === config.auth ||
    name === config.database ||
    name === config.deployment ||
    config.extras.includes(name as never) ||
    (name === "tailwind" && ["tailwind", "shadcn"].includes(config.styling)) ||
    (name === "material-ui" && config.styling === "material-ui")
  );
}
