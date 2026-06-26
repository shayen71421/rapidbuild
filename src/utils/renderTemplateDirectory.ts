import path from "node:path";
import { fileURLToPath } from "node:url";
import ejs from "ejs";
import fs from "fs-extra";
import type { ProjectConfig } from "../types.js";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(dirname, "..", "..");

export async function renderTemplateDirectory(templateDirectory: string, targetDir: string, config: ProjectConfig): Promise<void> {
  const sourceDir = path.join(packageRoot, "templates", templateDirectory);
  if (!(await fs.pathExists(sourceDir))) {
    throw new Error(`Template directory not found: ${templateDirectory}`);
  }

  await copyEntry(sourceDir, targetDir, config);
}

async function copyEntry(source: string, destination: string, config: ProjectConfig): Promise<void> {
  const stat = await fs.stat(source);

  if (stat.isDirectory()) {
    await fs.ensureDir(destination);
    const entries = await fs.readdir(source);
    for (const entry of entries) {
      const renderedName = renderFilename(entry, config);
      await copyEntry(path.join(source, entry), path.join(destination, renderedName), config);
    }
    return;
  }

  const outputPath = destination.endsWith(".ejs") ? destination.slice(0, -4) : destination;
  if (source.endsWith(".ejs")) {
    const template = await fs.readFile(source, "utf8");
    await fs.outputFile(outputPath, ejs.render(template, { config }));
    return;
  }

  await fs.copy(source, outputPath);
}

function renderFilename(filename: string, config: ProjectConfig): string {
  return ejs.render(filename, { config });
}
