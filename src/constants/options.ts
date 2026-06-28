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
  { name: "Next.js", value: "next" }
];

export const languageChoices: Array<{ name: string; value: Language }> = [
  { name: "TypeScript", value: "typescript" }
];

export const stylingChoices: Array<{ name: string; value: Styling }> = [
  { name: "Tailwind CSS", value: "tailwind" },
  { name: "None", value: "none" }
];

export const authChoices: Array<{ name: string; value: AuthProvider }> = [
  { name: "Firebase Auth", value: "firebase" },
  { name: "None", value: "none" }
];

export const databaseChoices: Array<{ name: string; value: DatabaseProvider }> = [
  { name: "Firestore", value: "firestore" },
  { name: "None", value: "none" }
];

export const aiChoices: Array<{ name: string; value: AiProvider }> = [
  { name: "None", value: "none" }
];

export const storageChoices: Array<{ name: string; value: StorageProvider }> = [
  { name: "None", value: "none" }
];

export const emailChoices: Array<{ name: string; value: EmailProvider }> = [
  { name: "None", value: "none" }
];

export const paymentsChoices: Array<{ name: string; value: PaymentsProvider }> = [
  { name: "None", value: "none" }
];

export const formsChoices: Array<{ name: string; value: FormsProvider }> = [
  { name: "None", value: "none" }
];

export const deploymentChoices: Array<{ name: string; value: DeploymentProvider }> = [
  { name: "Vercel", value: "vercel" },
  { name: "Firebase Hosting", value: "firebase-hosting" },
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
