import path from "node:path";
import fs from "fs-extra";

interface PackageJsonUpdates {
  dependencies: string[];
  devDependencies: string[];
  scripts?: Record<string, string>;
}

type PackageJson = Record<string, unknown> & {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  scripts?: Record<string, string>;
};

const packageVersions: Record<string, string> = {
  "@anthropic-ai/sdk": "^0.27.3",
  "@google/generative-ai": "^0.21.0",
  "@clerk/nextjs": "^7.5.9",
  "@prisma/client": "^6.19.3",
  "@supabase/supabase-js": "^2.108.2",
  "@types/node": "^20.19.25",
  "@types/react": "^19.2.17",
  "@types/react-dom": "^19.2.3",
  "@uploadthing/react": "^7.3.3",
  ai: "^3.3.39",
  autoprefixer: "^10.5.2",
  "better-auth": "^1.6.22",
  "class-variance-authority": "^0.7.0",
  cloudinary: "^2.10.0",
  "drizzle-kit": "^0.31.10",
  "drizzle-orm": "^0.45.2",
  eslint: "^8.57.0",
  "eslint-config-next": "^15.5.19",
  firebase: "^12.15.0",
  "firebase-tools": "^13.13.3",
  husky: "^9.1.4",
  "lucide-react": "^1.21.0",
  mongodb: "^7.4.0",
  "next-auth": "^4.24.14",
  openai: "^4.56.0",
  postcss: "^8.5.16",
  postgres: "^3.4.7",
  prettier: "^3.3.3",
  prisma: "^6.19.3",
  "react-hook-form": "^7.80.0",
  resend: "^6.16.0",
  stripe: "^22.3.0",
  tailwindcss: "^3.4.19",
  "tailwind-merge": "^2.4.0",
  typescript: "^5.9.3",
  uploadthing: "^7.7.4",
  zod: "^4.4.3"
};

export async function mergePackageJson(targetDir: string, updates: PackageJsonUpdates): Promise<void> {
  const packagePath = path.join(targetDir, "package.json");
  const pkg = (await fs.readJson(packagePath)) as PackageJson;

  pkg.dependencies = {
    ...(pkg.dependencies ?? {}),
    ...Object.fromEntries(updates.dependencies.map((name) => [name, getPackageVersion(name)]))
  };

  pkg.devDependencies = {
    ...(pkg.devDependencies ?? {}),
    ...Object.fromEntries(updates.devDependencies.map((name) => [name, getPackageVersion(name)]))
  };

  if (updates.scripts) {
    const currentScripts = (pkg.scripts ?? {}) as Record<string, string>;
    pkg.scripts = {
      ...currentScripts,
      ...updates.scripts
    };
  }

  await fs.writeJson(packagePath, pkg, { spaces: 2 });
}

function getPackageVersion(name: string): string {
  return packageVersions[name] ?? "latest";
}
