import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js, react: pluginReact},
    extends: ['js/recommended'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': ["error", { "argsIgnorePattern": "^_" }],
      '@/no-unused-vars': ["error", { "argsIgnorePattern": "^_" }],
    },
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
  },
]);
