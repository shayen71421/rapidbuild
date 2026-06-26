import type { Plugin } from "../../types.js";

export const tailwindPlugin: Plugin = {
  name: "tailwind",
  devDependencies: () => ["autoprefixer", "postcss", "tailwindcss"],
  dependencies: (config) => (config.styling === "shadcn" ? ["class-variance-authority", "tailwind-merge"] : [])
};
