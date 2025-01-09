import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,  // Set Node.js environment
    },
  },
  { languageOptions: { globals: globals.browser } },  // For browser environment if needed
  pluginJs.configs.recommended,
];
