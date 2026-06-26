import type { Plugin } from "../../types.js";

export const corePlugin: Plugin = {
  name: "core",
  dependencies: () => ["lucide-react"],
  devDependencies: (config) => {
    if (config.framework !== "next") {
      return [];
    }

    return ["@types/node", "@types/react", "@types/react-dom", "eslint", "eslint-config-next", "typescript"];
  }
};
