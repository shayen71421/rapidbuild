import type { ProjectConfig } from "../types.js";

export const DEFAULT_CONFIG: ProjectConfig = {
  projectName: "my-rapidbuild-app",
  framework: "next",
  language: "typescript",
  styling: "tailwind",
  auth: "firebase",
  database: "firestore",
  ai: "none",
  storage: "none",
  email: "none",
  payments: "none",
  forms: "none",
  deployment: "vercel",
  extras: ["eslint", "prettier", "dark-mode"],
  template: "next-firebase",
  packageManager: "npm",
  installDependencies: true,
  initializeGit: true
};
