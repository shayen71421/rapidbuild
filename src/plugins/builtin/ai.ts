import type { Plugin } from "../../types.js";

export const aiPlugin: Plugin = {
  name: "ai",
  dependencies: (config) => {
    if (config.ai === "openai") {
      return ["openai", "ai"];
    }
    if (config.ai === "gemini") {
      return ["@google/generative-ai"];
    }
    if (config.ai === "anthropic") {
      return ["@anthropic-ai/sdk"];
    }

    return [];
  },
  envVariables: (config): Record<string, string> => {
    if (config.ai === "openai") {
      return { OPENAI_API_KEY: "" };
    }
    if (config.ai === "gemini") {
      return { GEMINI_API_KEY: "" };
    }
    if (config.ai === "anthropic") {
      return { ANTHROPIC_API_KEY: "" };
    }

    return {};
  }
};
