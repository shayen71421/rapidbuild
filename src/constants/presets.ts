import type { ProjectConfig } from "../types.js";

export const presets = {
  dashboard: {
    framework: "next",
    language: "typescript",
    styling: "tailwind",
    auth: "firebase",
    database: "firestore",
    ai: "none",
    storage: "none",
    email: "none",
    payments: "none",
    forms: "react-hook-form-zod",
    deployment: "vercel",
    extras: ["eslint", "prettier", "github-actions", "dark-mode"],
    template: "next-firebase"
  }
} satisfies Record<string, Partial<ProjectConfig>>;

export const presetNames = Object.keys(presets);

export function getPresetConfig(name: string): Partial<ProjectConfig> {
  const preset = presets[name as keyof typeof presets];
  if (!preset) {
    throw new Error(`Unknown preset "${name}". Available presets: ${presetNames.join(", ")}`);
  }

  return { ...preset, preset: name } as Partial<ProjectConfig>;
}
