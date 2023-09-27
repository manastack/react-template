# react-template

---

## Description

This is a simple React app using Vite. It includes the following:

- [x] [Emotion](https://emotion.sh/docs/introduction)
- [x] [ESLint](https://eslint.org/)
- [x] [Prettier](https://prettier.io/)
- [x] [Stylelint](https://stylelint.io/)
- [x] [TailwindCSS](https://tailwindcss.com/)
- [x] [Twin.Macro](https://www.npmjs.com/package/twin.macro)
- [x] [TypeScript](https://www.typescriptlang.org/)
- [x] [Vite](https://vitejs.dev/)
- [x] [Vitest](https://github.com/vitest-dev/vitest#readme)

## Requirements

- [Node Version Manager](https://github.com/nvm-sh/nvm)

## Usage

### Project setup

```
pnpm i
```

Here and throughout the project we are using [pnpm](https://pnpm.io/) as our package manager.
You can also use `npm` or `yarn` if you prefer.

If you are using `npm` or `yarn` you will need to remove `pnpm-lock.json` before running `npm i` or `yarn`.

### Compiles and hot-reloads for development

```
pnpm dev
```

### Run your unit tests

```
pnpm test
```

### Lints and fixes files

```
pnpm format
```

### Compiles and minifies for production

```
pnpm build:production
```

### Compiles w/ sourcemap for stage

```
pnpm build:stage
```

### Preview the build

```
pnpm preview
```

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## TailWind's Config for WebStorm

```json
{
  "includeLanguages": {
    "ftl": "html",
    "jinja": "html",
    "jinja2": "html",
    "smarty": "html",
    "tmpl": "gohtml",
    "cshtml": "html",
    "vbhtml": "html",
    "razor": "html",
    "typescript": "javascript",
    "typescriptreact": "javascript"
  },
  "files": {
    "exclude": ["**/.git/**", "**/node_modules/**", "**/.hg/**", "**/.svn/**"]
  },
  "emmetCompletions": false,
  "classAttributes": ["class", "className", "ngClass", "tw"],
  "colorDecorators": false,
  "showPixelEquivalents": true,
  "rootFontSize": 16,
  "hovers": true,
  "suggestions": true,
  "codeActions": true,
  "validate": true,
  "lint": {
    "invalidScreen": "error",
    "invalidVariant": "error",
    "invalidTailwindDirective": "error",
    "invalidApply": "error",
    "invalidConfigPath": "error",
    "cssConflict": "warning",
    "recommendedVariantOrder": "warning"
  },
  "experimental": {
    "configFile": null,
    "classRegex": [
      "tw`([^`]*)",
      "tw=\"([^\"]*)",
      "tw={\"([^\"}]*)",
      "tw\\.\\w+`([^`]*)",
      "tw\\(.*?\\)`([^`]*)"
    ]
  }
}
```
