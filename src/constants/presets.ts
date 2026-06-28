import type { ProjectConfig } from "../types.js";

export const presets = {
  "ai-chat": {
    framework: "next",
    language: "typescript",
    styling: "tailwind",
    auth: "firebase",
    database: "firestore",
    ai: "openai",
    storage: "uploadthing",
    email: "none",
    payments: "none",
    forms: "react-hook-form-zod",
    deployment: "vercel",
    extras: ["eslint", "prettier", "github-actions", "dark-mode"],
    template: "next-firebase"
  },
  startup: {
    framework: "next",
    language: "typescript",
    styling: "tailwind",
    auth: "better-auth",
    database: "prisma",
    ai: "none",
    storage: "uploadthing",
    email: "resend",
    payments: "stripe",
    forms: "react-hook-form-zod",
    deployment: "vercel",
    extras: ["eslint", "prettier", "husky", "github-actions", "analytics", "dark-mode"],
    template: "next-firebase"
  },
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
  },
  "ieee-event": {
    framework: "next",
    language: "typescript",
    styling: "tailwind",
    auth: "firebase",
    database: "firestore",
    ai: "gemini",
    storage: "uploadthing",
    email: "resend",
    payments: "none",
    forms: "react-hook-form-zod",
    deployment: "firebase-hosting",
    extras: ["eslint", "prettier", "pwa", "github-actions", "dark-mode"],
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
