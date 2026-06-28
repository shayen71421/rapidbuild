import inquirer from "inquirer";
import {
  aiChoices,
  authChoices,
  databaseChoices,
  deploymentChoices,
  emailChoices,
  extraChoices,
  formsChoices,
  frameworkChoices,
  languageChoices,
  paymentsChoices,
  storageChoices,
  stylingChoices
} from "../constants/options.js";
import { templateRegistry } from "../generators/templateRegistry.js";
import type { ProjectConfig } from "../types.js";

type Choice = { name: string; value: string };

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
      when: !hasTemplate && !hasPreset && templateRegistry.length > 1
    },
    {
      type: "list",
      name: "framework",
      message: "Framework",
      choices: frameworkChoices,
      default: defaults.framework,
      when: hasMultipleChoices(frameworkChoices)
    },
    {
      type: "list",
      name: "language",
      message: "Language",
      choices: languageChoices,
      default: defaults.language,
      when: hasMultipleChoices(languageChoices)
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
      default: defaults.ai,
      when: hasMultipleChoices(aiChoices)
    },
    {
      type: "list",
      name: "storage",
      message: "Storage",
      choices: storageChoices,
      default: defaults.storage,
      when: hasMultipleChoices(storageChoices)
    },
    {
      type: "list",
      name: "email",
      message: "Email",
      choices: emailChoices,
      default: defaults.email,
      when: hasMultipleChoices(emailChoices)
    },
    {
      type: "list",
      name: "payments",
      message: "Payments",
      choices: paymentsChoices,
      default: defaults.payments,
      when: hasMultipleChoices(paymentsChoices)
    },
    {
      type: "list",
      name: "forms",
      message: "Forms",
      choices: formsChoices,
      default: defaults.forms,
      when: hasMultipleChoices(formsChoices)
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

function hasMultipleChoices(choices: Choice[]): boolean {
  return choices.length > 1;
}
