import type {
  AiProvider,
  AuthProvider,
  DatabaseProvider,
  DeploymentProvider,
  EmailProvider,
  Extra,
  FormsProvider,
  Framework,
  Language,
  PaymentsProvider,
  StorageProvider,
  Styling
} from "../types.js";

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
  { name: "Better Auth", value: "better-auth" },
  { name: "Firebase Auth", value: "firebase" },
  { name: "Clerk", value: "clerk" },
  { name: "Auth.js", value: "authjs" },
  { name: "Supabase Auth", value: "supabase" },
  { name: "None", value: "none" }
];

export const databaseChoices: Array<{ name: string; value: DatabaseProvider }> = [
  { name: "Firestore", value: "firestore" },
  { name: "Prisma", value: "prisma" },
  { name: "PostgreSQL + Prisma", value: "postgres-prisma" },
  { name: "PostgreSQL", value: "postgres" },
  { name: "Drizzle", value: "drizzle" },
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

export const storageChoices: Array<{ name: string; value: StorageProvider }> = [
  { name: "UploadThing", value: "uploadthing" },
  { name: "Cloudinary", value: "cloudinary" },
  { name: "Firebase Storage", value: "firebase-storage" },
  { name: "None", value: "none" }
];

export const emailChoices: Array<{ name: string; value: EmailProvider }> = [
  { name: "Resend", value: "resend" },
  { name: "None", value: "none" }
];

export const paymentsChoices: Array<{ name: string; value: PaymentsProvider }> = [
  { name: "Stripe", value: "stripe" },
  { name: "None", value: "none" }
];

export const formsChoices: Array<{ name: string; value: FormsProvider }> = [
  { name: "React Hook Form + Zod", value: "react-hook-form-zod" },
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
