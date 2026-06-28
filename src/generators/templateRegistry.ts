import type { TemplateDefinition } from "../types.js";

export const templateRegistry: TemplateDefinition[] = [
  {
    name: "next-firebase",
    displayName: "Next.js + Firebase",
    directory: "next-firebase",
    complete: true,
    supported: {
      framework: "next",
      language: "typescript",
      styling: "tailwind",
      auth: "firebase",
      database: "firestore"
    }
  }
];

export function getTemplate(name: string): TemplateDefinition {
  const template = templateRegistry.find((entry) => entry.name === name);
  if (!template) {
    throw new Error(`Unknown template "${name}". Available templates: ${templateRegistry.map((entry) => entry.name).join(", ")}`);
  }

  return template;
}
