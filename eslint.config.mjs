import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // ignore unused imports/variables
      "@typescript-eslint/no-explicit-any": "off", // ignore 'any' type warnings
      "react/no-unescaped-entities": "off", // ignore unescaped ' / " in JSX
      "react-hooks/exhaustive-deps": "off", // ignore missing dependencies in useEffect
      "prefer-const": "off", // ignore "use const instead of let"
    },
  },
];

export default eslintConfig;
