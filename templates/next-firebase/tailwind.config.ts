import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./hooks/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#141414",
        paper: "#fbfbf8",
        signal: "#2563eb",
        mint: "#10b981"
      }
    }
  },
  plugins: []
};

export default config;
