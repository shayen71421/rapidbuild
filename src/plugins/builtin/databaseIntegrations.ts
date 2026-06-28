import path from "node:path";
import fs from "fs-extra";
import type { Plugin } from "../../types.js";

export const databaseIntegrationsPlugin: Plugin = {
  name: "database-integrations",
  dependencies: (config) => {
    if (config.database === "prisma" || config.database === "postgres-prisma") {
      return ["@prisma/client"];
    }
    if (config.database === "drizzle") {
      return ["drizzle-orm", "postgres"];
    }
    if (config.database === "mongodb") {
      return ["mongodb"];
    }
    if (config.database === "postgres") {
      return ["postgres"];
    }
    return [];
  },
  devDependencies: (config) => {
    if (config.database === "prisma" || config.database === "postgres-prisma") {
      return ["prisma"];
    }
    if (config.database === "drizzle") {
      return ["drizzle-kit"];
    }
    return [];
  },
  scripts: (config): Record<string, string> =>
    config.database === "prisma" || config.database === "postgres-prisma"
      ? {
          postinstall: "prisma generate"
        }
      : {},
  envVariables: (config): Record<string, string> => {
    if (["prisma", "postgres-prisma", "postgres", "drizzle"].includes(config.database)) {
      return { DATABASE_URL: "" };
    }
    if (config.database === "mongodb") {
      return { MONGODB_URI: "" };
    }
    return {};
  },
  install: async ({ config, targetDir }) => {
    if (config.database === "prisma" || config.database === "postgres-prisma") {
      await fs.outputFile(
        path.join(targetDir, "prisma", "schema.prisma"),
        `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
`
      );
      await fs.outputFile(
        path.join(targetDir, "lib", "prisma.ts"),
        `import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
`
      );
    }

    if (config.database === "drizzle") {
      await fs.outputFile(
        path.join(targetDir, "drizzle.config.ts"),
        `import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? ""
  }
});
`
      );
      await fs.outputFile(
        path.join(targetDir, "lib", "db", "schema.ts"),
        `import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
`
      );
      await fs.outputFile(
        path.join(targetDir, "lib", "db", "index.ts"),
        `import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(process.env.DATABASE_URL ?? "");

export const db = drizzle(queryClient);
`
      );
    }

    if (config.database === "mongodb") {
      await fs.outputFile(
        path.join(targetDir, "lib", "mongodb.ts"),
        `import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI ?? "";
const globalForMongo = globalThis as unknown as { mongoClient?: MongoClient };

export const mongoClient = globalForMongo.mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = mongoClient;
}
`
      );
    }
  }
};
