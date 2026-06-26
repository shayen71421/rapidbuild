import { execa } from "execa";
import type { PackageManager } from "../types.js";

const packageManagers = ["npm", "pnpm", "yarn", "bun"] as const;

export async function resolvePackageManager(requested?: string): Promise<PackageManager> {
  if (requested) {
    if (packageManagers.includes(requested as PackageManager)) {
      return requested as PackageManager;
    }
    throw new Error(`Unsupported package manager "${requested}". Use npm, pnpm, yarn, or bun.`);
  }

  const userAgent = process.env.npm_config_user_agent ?? "";
  const detected = packageManagers.find((manager) => userAgent.startsWith(manager));
  if (detected) {
    return detected;
  }

  for (const manager of ["pnpm", "yarn", "bun"] as const) {
    try {
      await execa(manager, ["--version"], { stdio: "ignore" });
      return manager;
    } catch {
      // Fall back to npm if optional managers are not available.
    }
  }

  return "npm";
}
