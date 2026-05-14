import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import angularPlugin from "@angular-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import vitest from "eslint-plugin-vitest";

export default [
  js.configs.recommended,
  {
    ignores: ["scripts/set-env.cjs", ".angular"],
  },
  {
    files: ["**/*.ts", "**/*.js"],

    languageOptions: {
      parser: tsParser,
      globals: {
        jasmine: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        spyOn: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        mapbox: "readonly",
        HTMLButtonElement: "readonly",
        xit: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "@angular-eslint": angularPlugin,
    },

    rules: {
      "no-useless-escape": "off",
      "no-undef": "warn",
      "no-unused-vars": "warn",
      "no-console": "off",
      "no-prototype-builtins": "off",
    },
  },
  {
    files: ["**/*.spec.ts", "**/*.test.ts"],
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
];
