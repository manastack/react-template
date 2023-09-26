module.exports = {
  plugins: [
    require('prettier-plugin-tailwindcss'), // must come last
  ],
  printWidth: 80,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  tailwindAttributes: ['className', 'tw', 'twx'],
  tailwindConfig: './tailwind.config.js',
  tailwindFunctions: ['tw', 'twx'],
  trailingComma: 'all',
  useTabs: false,
}
