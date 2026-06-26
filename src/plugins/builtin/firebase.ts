import type { Plugin } from "../../types.js";

export const firebasePlugin: Plugin = {
  name: "firebase",
  dependencies: () => ["firebase"],
  devDependencies: (config) => (config.deployment === "firebase-hosting" ? ["firebase-tools"] : []),
  envVariables: () => ({
    NEXT_PUBLIC_FIREBASE_API_KEY: "",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: "",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "",
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "",
    NEXT_PUBLIC_FIREBASE_APP_ID: ""
  })
};
