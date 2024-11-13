import { defineConfig } from "vitest/config";
import path from "path";
import dotenv from "dotenv";

export default defineConfig({
  test: {
    environment: "node",
    setupFiles: ["./tests/setup.ts"],
    include: ["./tests/**/*.test.ts", "./tests/**/*.test.js"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    env: {
      ...dotenv.config({ path: ".env.test" }).parsed,
    },
  },
});
