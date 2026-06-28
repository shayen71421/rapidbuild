import path from "node:path";
import fs from "fs-extra";
import type { Plugin } from "../../types.js";

export const authIntegrationsPlugin: Plugin = {
  name: "auth-integrations",
  dependencies: (config) => {
    if (config.auth === "better-auth") {
      return ["better-auth"];
    }
    if (config.auth === "authjs") {
      return ["next-auth"];
    }
    if (config.auth === "clerk") {
      return ["@clerk/nextjs"];
    }
    if (config.auth === "supabase") {
      return ["@supabase/supabase-js"];
    }
    return [];
  },
  envVariables: (config): Record<string, string> => {
    if (config.auth === "better-auth") {
      return {
        BETTER_AUTH_SECRET: "",
        BETTER_AUTH_URL: "http://localhost:3000"
      };
    }
    if (config.auth === "authjs") {
      return {
        AUTH_SECRET: "",
        AUTH_URL: "http://localhost:3000"
      };
    }
    if (config.auth === "clerk") {
      return {
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "",
        CLERK_SECRET_KEY: ""
      };
    }
    if (config.auth === "supabase") {
      return {
        NEXT_PUBLIC_SUPABASE_URL: "",
        NEXT_PUBLIC_SUPABASE_ANON_KEY: ""
      };
    }
    return {};
  },
  install: async ({ config, targetDir }) => {
    if (config.auth === "better-auth") {
      await fs.outputFile(
        path.join(targetDir, "lib", "better-auth.ts"),
        `import { betterAuth } from "better-auth";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL
});
`
      );
    }

    if (config.auth === "authjs") {
      await fs.outputFile(
        path.join(targetDir, "lib", "authjs.ts"),
        `import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: []
});
`
      );
    }

    if (config.auth === "supabase") {
      await fs.outputFile(
        path.join(targetDir, "lib", "supabase.ts"),
        `import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);
`
      );
    }
  }
};
