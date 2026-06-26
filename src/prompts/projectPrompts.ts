import inquirer from "inquirer";
import {
  aiChoices,
  authChoices,
  databaseChoices,
  deploymentChoices,
  extraChoices,
  frameworkChoices,
  languageChoices,
  stylingChoices
} from "../constants/options.js";
import { templateRegistry } from "../generators/templateRegistry.js";
import type { ProjectConfig } from "../types.js";

export async function promptForConfig(
  defaults: ProjectConfig,
  hasProjectName: boolean,
  hasTemplate: boolean,
  hasPreset: boolean
): Promise<ProjectConfig> {
  const answers = await inquirer.prompt<Partial<ProjectConfig>>([
    {
      type: "input",
      name: "projectName",
      message: "Project name",
      default: defaults.projectName,
      when: !hasProjectName,
      validate: (value: string) => value.trim().length > 0 || "Project name is required"
    },
    {
      type: "list",
      name: "template",
      message: "Template",
      choices: templateRegistry.map((template) => ({
        name: template.complete ? template.displayName : `${template.displayName} (example stub)`,
        value: template.name
      })),
      default: defaults.template,
      when: !hasTemplate && !hasPreset
    },
    {
      type: "list",
      name: "framework",
      message: "Framework",
      choices: frameworkChoices,
      default: defaults.framework
    },
    {
      type: "list",
      name: "language",
      message: "Language",
      choices: languageChoices,
      default: defaults.language
    },
    {
      type: "list",
      name: "styling",
      message: "Styling",
      choices: stylingChoices,
      default: defaults.styling
    },
    {
      type: "list",
      name: "auth",
      message: "Authentication",
      choices: authChoices,
      default: defaults.auth
    },
    {
      type: "list",
      name: "database",
      message: "Database",
      choices: databaseChoices,
      default: defaults.database
    },
    {
      type: "list",
      name: "ai",
      message: "AI",
      choices: aiChoices,
      default: defaults.ai
    },
    {
      type: "list",
      name: "deployment",
      message: "Deployment",
      choices: deploymentChoices,
      default: defaults.deployment
    },
    {
      type: "checkbox",
      name: "extras",
      message: "Extras",
      choices: extraChoices,
      default: defaults.extras
    }
  ]);

  return {
    ...defaults,
    ...answers,
    projectName: (answers.projectName ?? defaults.projectName).trim()
  };
}
