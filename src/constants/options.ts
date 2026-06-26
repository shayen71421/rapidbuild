import type { AiProvider, AuthProvider, DatabaseProvider, DeploymentProvider, Extra, Framework, Language, Styling } from "../types.js";

export const frameworkChoices: Array<{ name: string; value: Framework }> = [
  { name: "Next.js", value: "next" },
  { name: "React", value: "react" },
  { name: "Vite", value: "vite" }
];

export const languageChoices: Array<{ name: string; value: Language }> = [
  { name: "TypeScript", value: "typescript" },
  { name: "JavaScript", value: "javascript" }
];

export const stylingChoices: Array<{ name: string; value: Styling }> = [
  { name: "Tailwind CSS", value: "tailwind" },
  { name: "shadcn/ui", value: "shadcn" },
  { name: "Material UI", value: "material-ui" },
  { name: "None", value: "none" }
];

export const authChoices: Array<{ name: string; value: AuthProvider }> = [
  { name: "Firebase Auth", value: "firebase" },
  { name: "Clerk", value: "clerk" },
  { name: "Auth.js", value: "authjs" },
  { name: "Supabase Auth", value: "supabase" },
  { name: "None", value: "none" }
];

export const databaseChoices: Array<{ name: string; value: DatabaseProvider }> = [
  { name: "Firestore", value: "firestore" },
  { name: "PostgreSQL + Prisma", value: "postgres-prisma" },
  { name: "MongoDB", value: "mongodb" },
  { name: "Supabase", value: "supabase" },
  { name: "None", value: "none" }
];

export const aiChoices: Array<{ name: string; value: AiProvider }> = [
  { name: "OpenAI", value: "openai" },
  { name: "Gemini", value: "gemini" },
  { name: "Anthropic", value: "anthropic" },
  { name: "None", value: "none" }
];

export const deploymentChoices: Array<{ name: string; value: DeploymentProvider }> = [
  { name: "Vercel", value: "vercel" },
  { name: "Firebase Hosting", value: "firebase-hosting" },
  { name: "Cloudflare Pages", value: "cloudflare-pages" },
  { name: "None", value: "none" }
];

export const extraChoices: Array<{ name: string; value: Extra }> = [
  { name: "ESLint", value: "eslint" },
  { name: "Prettier", value: "prettier" },
  { name: "Husky", value: "husky" },
  { name: "Docker", value: "docker" },
  { name: "GitHub Actions", value: "github-actions" },
  { name: "PWA", value: "pwa" },
  { name: "Dark Mode", value: "dark-mode" },
  { name: "Analytics", value: "analytics" }
];
