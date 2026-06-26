export type Framework = "next" | "react" | "vite";
export type Language = "typescript" | "javascript";
export type Styling = "tailwind" | "shadcn" | "material-ui" | "none";
export type AuthProvider = "firebase" | "clerk" | "authjs" | "supabase" | "none";
export type DatabaseProvider = "firestore" | "postgres-prisma" | "mongodb" | "supabase" | "none";
export type AiProvider = "openai" | "gemini" | "anthropic" | "none";
export type DeploymentProvider = "vercel" | "firebase-hosting" | "cloudflare-pages" | "none";
export type Extra =
  | "eslint"
  | "prettier"
  | "husky"
  | "docker"
  | "github-actions"
  | "pwa"
  | "dark-mode"
  | "analytics";
export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

export interface CliOptions {
  yes?: boolean;
  preset?: string;
  template?: string;
  packageManager?: string;
  install: boolean;
  git: boolean;
}

export interface ProjectConfig {
  projectName: string;
  framework: Framework;
  language: Language;
  styling: Styling;
  auth: AuthProvider;
  database: DatabaseProvider;
  ai: AiProvider;
  deployment: DeploymentProvider;
  extras: Extra[];
  preset?: string;
  template: string;
  packageManager: PackageManager;
  installDependencies: boolean;
  initializeGit: boolean;
}

export interface TemplateDefinition {
  name: string;
  displayName: string;
  directory: string;
  supported: Partial<ProjectConfig>;
  complete: boolean;
}

export interface PluginContext {
  config: ProjectConfig;
  targetDir: string;
}

export interface Plugin {
  name: string;
  install?(context: PluginContext): Promise<void>;
  dependencies?(config: ProjectConfig): string[];
  devDependencies?(config: ProjectConfig): string[];
  templates?(config: ProjectConfig): string[];
  envVariables?(config: ProjectConfig): Record<string, string>;
  postInstall?(context: PluginContext): Promise<void>;
}
