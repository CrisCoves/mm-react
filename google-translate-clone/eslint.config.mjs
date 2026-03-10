import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js, react: pluginReact },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
      // Use TypeScript ESLint parser for TypeScript files
      parser: tseslint.parser,
      parserOptions: {
        // Enable project service for better TypeScript integration
        tsconfigRootDir: import.meta.dirname,
        projectService: {
          allowDefaultProject: ["eslint.config.mjs"],
          defaultProject: "tsconfig.json",
        },
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      //'@/no-unused-vars': ["error", { "argsIgnorePattern": "^_" }],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
    },
  }
]);
