import js from "@eslint/js"
import globals from "globals"

export default [
  {
    ignores: ["out/**", "node_modules/**", ".agents/**"],
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
]
