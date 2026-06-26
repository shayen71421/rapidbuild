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
  },
  {
    name: "next-supabase",
    displayName: "Next.js + Supabase",
    directory: "next-supabase",
    complete: false,
    supported: {
      framework: "next",
      auth: "supabase",
      database: "supabase"
    }
  },
  {
    name: "react",
    displayName: "React",
    directory: "react",
    complete: false,
    supported: {
      framework: "react"
    }
  },
  {
    name: "vite",
    displayName: "Vite",
    directory: "vite",
    complete: false,
    supported: {
      framework: "vite"
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
