import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import angularPlugin from "@angular-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  {
    ignores: ["scripts/generate-env.cjs", "scripts/set-env.cjs"],
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
    },
  },
];
