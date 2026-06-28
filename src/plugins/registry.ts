import { aiPlugin } from "./builtin/ai.js";
import { authIntegrationsPlugin } from "./builtin/authIntegrations.js";
import { corePlugin } from "./builtin/core.js";
import { databaseIntegrationsPlugin } from "./builtin/databaseIntegrations.js";
import { extrasPlugin } from "./builtin/extras.js";
import { firebasePlugin } from "./builtin/firebase.js";
import { serviceIntegrationsPlugin } from "./builtin/serviceIntegrations.js";
import { tailwindPlugin } from "./builtin/tailwind.js";
import type { Plugin } from "../types.js";

export const builtinPlugins: Plugin[] = [
  corePlugin,
  tailwindPlugin,
  firebasePlugin,
  authIntegrationsPlugin,
  databaseIntegrationsPlugin,
  serviceIntegrationsPlugin,
  aiPlugin,
  extrasPlugin
];
