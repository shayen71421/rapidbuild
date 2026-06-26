import path from "node:path";
import fs from "fs-extra";

interface PackageJsonUpdates {
  dependencies: string[];
  devDependencies: string[];
}

type PackageJson = Record<string, unknown> & {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

const packageVersions: Record<string, string> = {
  "@anthropic-ai/sdk": "^0.27.3",
  "@google/generative-ai": "^0.21.0",
  "@types/node": "^20.14.15",
  "@types/react": "^18.3.3",
  "@types/react-dom": "^18.3.0",
  ai: "^3.3.39",
  autoprefixer: "^10.4.20",
  "class-variance-authority": "^0.7.0",
  eslint: "^8.57.0",
  "eslint-config-next": "^14.2.5",
  firebase: "^10.12.4",
  "firebase-tools": "^13.13.3",
  husky: "^9.1.4",
  "lucide-react": "^0.468.0",
  openai: "^4.56.0",
  postcss: "^8.4.41",
  prettier: "^3.3.3",
  tailwindcss: "^3.4.10",
  "tailwind-merge": "^2.4.0",
  typescript: "^5.5.4"
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

  await fs.writeJson(packagePath, pkg, { spaces: 2 });
}

function getPackageVersion(name: string): string {
  return packageVersions[name] ?? "latest";
}
