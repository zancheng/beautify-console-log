// ESLint 9 的 flat config（替代已废弃的 .eslintrc.json）
const tseslint = require("@typescript-eslint/eslint-plugin");
const prettier = require("eslint-config-prettier");

module.exports = [
  { ignores: ["dist/**", "lib/**", "docs/**", "example/**"] },
  ...tseslint.configs["flat/recommended"].map((config) => ({
    ...config,
    files: ["src/**/*.ts"],
  })),
  {
    files: ["src/**/*.ts"],
    rules: {
      // 日志库本身就要打印，且需要透传任意参数
      "no-console": "off",
      // console 方法的可变参数/占位实现不可避免要用到 any
      "@typescript-eslint/no-explicit-any": "warn",
      // 关闭日志时用 (...args) => undefined 占位，参数名不会被使用
      "@typescript-eslint/no-unused-vars": ["warn", { args: "none" }],
      ...prettier.rules,
    },
  },
];
