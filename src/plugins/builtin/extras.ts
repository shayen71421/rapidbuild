import path from "node:path";
import fs from "fs-extra";
import type { Plugin } from "../../types.js";

export const extrasPlugin: Plugin = {
  name: "extras",
  devDependencies: (config) => {
    const deps: string[] = [];
    if (config.extras.includes("prettier")) {
      deps.push("prettier");
    }
    if (config.extras.includes("husky")) {
      deps.push("husky");
    }
    return deps;
  },
  install: async ({ config, targetDir }) => {
    if (config.extras.includes("docker")) {
      await fs.writeFile(
        path.join(targetDir, "Dockerfile"),
        "FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\nCMD [\"npm\", \"start\"]\n"
      );
    }

    if (config.extras.includes("github-actions")) {
      const workflowDir = path.join(targetDir, ".github", "workflows");
      await fs.ensureDir(workflowDir);
      await fs.writeFile(
        path.join(workflowDir, "ci.yml"),
        "name: CI\non: [push, pull_request]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n          cache: npm\n      - run: npm ci\n      - run: npm run lint\n      - run: npm run build\n"
      );
    }
  }
};
