/// <reference types="vitest" />

import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";
import angular from "@analogjs/vite-plugin-angular";
const env = loadEnv(process.cwd(), "");

export default defineConfig({
  plugins: [angular()],

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/test-setup.ts"],
    include: ["src/**/*.spec.ts"],
    reporters: ["default"],
  },
});
