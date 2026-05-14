/// <reference types="vitest" />

import { defineConfig, loadEnv } from "vite";
import angular from "@analogjs/vite-plugin-angular";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [angular()],
  };
});
