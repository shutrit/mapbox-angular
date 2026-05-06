import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import angularPlugin from "@angular-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  {

    
    files: ["**/*.ts", "**/*.js"],
    languageOptions: {
      parser:tsParser
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "@angular-eslint": angularPlugin
    },

    rules: {
      "no-useless-escape":"off",
      "no-undef":"warn",
      "no-unused-vars": "warn",
      "no-console": "off"
    }
  }
];
