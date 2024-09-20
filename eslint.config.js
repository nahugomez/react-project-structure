// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import vitestGlobals from 'eslint-plugin-vitest-globals';

export default {
  ignores: ['dist'],
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: {
      ...globals.browser,
      ...vitestGlobals.environments.env.globals,
    },
    parser: typescriptParser,
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    '@typescript-eslint': typescriptPlugin,
    prettier: prettierPlugin,
    'vitest-globals': vitestGlobals,
  },
  rules: {
    // Reglas recomendadas de ESLint
    ...js.configs.recommended.rules,
    // Reglas recomendadas de TypeScript
    ...typescriptPlugin.configs.recommended.rules,
    // Reglas recomendadas de React Hooks
    ...reactHooks.configs.recommended.rules,
    // Reglas de Prettier
    'prettier/prettier': 'warn',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
