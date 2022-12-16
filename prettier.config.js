module.exports = {
  endOfLine: "lf",
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "es5",
  printWidth: 80,
  arrowParens: "always",
  importOrder: ["~/", "@test/*", "(?:src/(.*)$|@components|@utils)", "^[./]"],
  importOrderSeparation: true,
  plugins: [require("prettier-plugin-tailwindcss")],
  tailwindConfig: "./packages/config/tailwind/index.js",
};
