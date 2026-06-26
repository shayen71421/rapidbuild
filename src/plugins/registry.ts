import { aiPlugin } from "./builtin/ai.js";
import { corePlugin } from "./builtin/core.js";
import { extrasPlugin } from "./builtin/extras.js";
import { firebasePlugin } from "./builtin/firebase.js";
import { tailwindPlugin } from "./builtin/tailwind.js";
import type { Plugin } from "../types.js";

export const builtinPlugins: Plugin[] = [corePlugin, tailwindPlugin, firebasePlugin, aiPlugin, extrasPlugin];
