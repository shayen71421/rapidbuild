import path from "node:path";
import fs from "fs-extra";
import type { Plugin } from "../../types.js";

export const serviceIntegrationsPlugin: Plugin = {
  name: "service-integrations",
  dependencies: (config) => {
    const deps: string[] = [];
    if (config.storage === "uploadthing") {
      deps.push("uploadthing", "@uploadthing/react");
    }
    if (config.storage === "cloudinary") {
      deps.push("cloudinary");
    }
    if (config.email === "resend") {
      deps.push("resend");
    }
    if (config.payments === "stripe") {
      deps.push("stripe");
    }
    if (config.forms === "react-hook-form-zod") {
      deps.push("react-hook-form", "zod");
    }
    return deps;
  },
  envVariables: (config): Record<string, string> => ({
    ...(config.storage === "uploadthing" ? { UPLOADTHING_TOKEN: "" } : {}),
    ...(config.storage === "cloudinary" ? { CLOUDINARY_URL: "" } : {}),
    ...(config.email === "resend" ? { RESEND_API_KEY: "" } : {}),
    ...(config.payments === "stripe" ? { STRIPE_SECRET_KEY: "", STRIPE_WEBHOOK_SECRET: "" } : {})
  }),
  install: async ({ config, targetDir }) => {
    if (config.storage === "uploadthing") {
      await fs.outputFile(
        path.join(targetDir, "app", "api", "uploadthing", "core.ts"),
        `import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(async ({ file }) => {
    return { url: file.url };
  })
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
`
      );
      await fs.outputFile(
        path.join(targetDir, "app", "api", "uploadthing", "route.ts"),
        `import { createRouteHandler } from "uploadthing/next";
import { uploadRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: uploadRouter
});
`
      );
    }

    if (config.email === "resend") {
      await fs.outputFile(
        path.join(targetDir, "lib", "resend.ts"),
        `import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);
`
      );
    }

    if (config.payments === "stripe") {
      await fs.outputFile(
        path.join(targetDir, "lib", "stripe.ts"),
        `import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
`
      );
    }

    if (config.forms === "react-hook-form-zod") {
      await fs.outputFile(
        path.join(targetDir, "lib", "validation.ts"),
        `import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email()
});
`
      );
    }
  }
};
