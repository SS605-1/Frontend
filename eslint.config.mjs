import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...fixupConfigRules(
    compat.extends("eslint:recommended", "google", "plugin:react/recommended", "prettier"),
), {
    plugins: {
        react: fixupPluginRules(react),
        prettier,
    },

    languageOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        globals: {
            ...globals.node,
            ...globals.browser,
        },
        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
            node: true,
        },
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    rules: {
        "react/react-in-jsx-scope": "off",
        "require-jsdoc": "off",
        "prettier/prettier": "error",
        indent: ["error", 2],
    },
}];