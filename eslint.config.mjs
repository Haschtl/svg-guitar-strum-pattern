import { fixupConfigRules } from "@eslint/compat";
import tsdoc from "eslint-plugin-tsdoc";
import jsdoc from "eslint-plugin-jsdoc";
import sortHooks from "eslint-plugin-hooks";
import sortKeysFix from "eslint-plugin-sort-keys-fix";
import love from "eslint-config-love";
import eslintConfigPrettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
// import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactRedux from "eslint-plugin-react-redux";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  js.configs.recommended,
  //   jsdoc.configs["flat/recommended"],
  {
    ...love,
    files: ["**/*.js", "**/*.ts", "**/*.tsx", "**/*.jsx"],
  },
  eslintConfigPrettier,
  ...fixupConfigRules(
    compat.extends(
      "plugin:storybook/recommended",
      "plugin:typescript-sort-keys/recommended",
      // React
      "plugin:react-hooks/recommended"
    )
  ),
  {
    plugins: {
      //   jsdoc,
      //   tsdoc,
      "sort-keys-fix": sortKeysFix,
      "simple-import-sort": simpleImportSort,
      hooks: sortHooks,
      react,
      // reactHooks,
      "jsx-a11y": jsxA11y,
      ["react-redux"]: reactRedux.configs.recommended.plugins,
    },

    rules: {
      ...reactRedux.rules.recommended,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        NodeJS: true,
        test: true,
        expect: true,
        Buffer: true,
        process: true,
      },

      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        project: "./tsconfig.json",
        extraFileExtensions: [".json"],

        projectService: {
          allowDefaultProject: ["*.js", "*.mjs"],
        },
      },
    },

    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },

        typescript: true,
      },

      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.stories.*"],

    rules: {
      "import/no-anonymous-default-export": "off",
      "no-restricted-imports": "off",
    },
  },
  {
    files: ["**/*.jsx", "**/*.ts", "**/*.tsx"],

    rules: {
      // typedoc / tsdoc / jsdoc
      //   "jsdoc/require-jsdoc": [
      //     "warn",
      //     {
      //       require: {
      //         FunctionDeclaration: true,
      //         MethodDefinition: true,
      //         ClassDeclaration: true,
      //         ArrowFunctionExpression: false,
      //         FunctionExpression: true,
      //       },
      //     },
      //   ],
      // Sort
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Packages `react` related packages come first.
            [
              "^react$",
              "^react-router",
              "^react-redux",
              "^react-i18next",
              "^@ionic",
            ],
            // External packages
            ["^@?\\w"],
            // Crescience packages.
            ["^@crescience"],
            // Internal packages.
            ["/lib/"],
            ["/components/"],
            ["^(@|components)(/.*|$)"],
            // Side effect imports.
            ["^\\u0000"],
            // Root imports. Put `..` last.
            ["^~/"],
            // Parent imports. Put `..` last.
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Other relative imports. Put same-folder imports and `.` last.
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Style imports.
            ["^.+\\.?(css)$"],
          ],
        },
      ],

      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "sort-vars": "error",
      "sort-keys": "error",
      "@typescript-eslint/sort-type-constituents": "error",
      "sort-keys-fix/sort-keys-fix": "error",
      "react/jsx-sort-props": "error",
      "hooks/sort": [
        "warn",
        {
          groups: [
            "useDocumentTitle",
            "useReducer",
            "useContext",
            "useTranslation",
            "useCresNet",
            "useCresNetSelector",
            "useDevice",
            "useDeviceSelector",
            "useAppSelector",
            "useSelector",
            "useAppDispatch",
            "useDispatch",
            "useState",
            "useToggleState",
            "useRef",
            "useAlert",
            "useModal",
            "useCallback",
            "useMount",
            "useEffect",
          ],
        },
      ],

      // TS
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/prefer-ts-expect-error": "error",

      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          modifiers: ["destructured"],
          format: null,
        },
      ],

      // Import
      "import/no-named-as-default": "error",

      "import/no-unresolved": [
        "error",
        {
          ignore: ["^virtual:"],
        },
      ],

      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["~/stories/*"],
              message:
                "The ~/stories directory is reserved for Storybook components",
            },
            {
              group: ["**/*.stories.*"],
              message:
                "You can not import from .stories.* files in regular components",
            },
          ],
        },
      ],

      "import/no-cycle": "error",

      // JSX/TSX
      "react/jsx-no-bind": "error",
      "react/jsx-boolean-value": "error",
      "jsx-a11y/no-static-element-interactions": "error",
      "jsx-a11y/click-events-have-key-events": "error",
      "jsx-a11y/no-noninteractive-element-interactions": "error",

      // React
      "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
      "react/sort-prop-types": "error",
      "react/hook-use-state": "error",
      "react/jsx-no-useless-fragment": "error",
      "react/self-closing-comp": "error",
      "react/button-has-type": "error",

      // temporary relaxed
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/consistent-type-assertions": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "react/no-unknown-property": "warn",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  {
    // Love fixes
    rules: {
      complexity: ["warn", { max: 25 }],
      "@typescript-eslint/max-params": ["error", { max: 10 }],
      "@typescript-eslint/prefer-destructuring": [
        "warn",
        {
          VariableDeclarator: {
            array: true,
            object: true,
          },
          AssignmentExpression: {
            array: false,
            object: false,
          },
        },
      ],
      "eslint-comments/require-description": "off",
      "@typescript-eslint/no-magic-numbers": "off",
      "@typescript-eslint/no-unsafe-type-assertion": "warn",
      "@typescript-eslint/no-base-to-string": "warn",
      "@typescript-eslint/class-methods-use-this": "warn",
      "@typescript-eslint/no-unnecessary-condition": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/use-unknown-in-catch-callback-variable": "off",
      "import/no-cycle": "off",
      "import/no-named-as-default": "off",
      "no-console": "off",
      "max-lines": "off",
    },
  },
];
