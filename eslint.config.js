import { resolve } from "node:path";
import eslint from "@eslint/js";
import { includeIgnoreFile } from "@eslint/compat";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  includeIgnoreFile(resolve(import.meta.dirname, ".gitignore")),
  eslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.node },
  },
]);
