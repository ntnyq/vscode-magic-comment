# vscode-magic-comment

[![CI](https://github.com/ntnyq/vscode-magic-comment/workflows/CI/badge.svg)](https://github.com/ntnyq/vscode-magic-comment/actions)
[![Marketplace](https://img.shields.io/github/v/release/ntnyq/vscode-magic-comment?include_prereleases&label=Visual%20Studio%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=ntnyq.vscode-magic-comment)
[![Install](https://img.shields.io/visual-studio-marketplace/i/ntnyq.vscode-magic-comment)](https://marketplace.visualstudio.com/items?itemName=ntnyq.vscode-magic-comment)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/ntnyq.vscode-magic-comment)](https://marketplace.visualstudio.com/items?itemName=ntnyq.vscode-magic-comment)
[![Language](https://img.shields.io/github/languages/top/ntnyq/vscode-magic-comment)](https://github.com/ntnyq/vscode-magic-comment)
[![License](https://img.shields.io/github/license/ntnyq/vscode-magic-comment)](https://github.com/ntnyq/vscode-magic-comment/blob/main/LICENSE)

> Highlight and add annotations to magic comments.

> [!CAUTION]
> Work in progress. May not stable yet.

## Features

- Highlight magic comments
- Add annotations to magic comments

## Providers

> Sorted alphabetically

- autoprefixer ✅
- biome ✅
- c8
- case-police ✅
- compiler-hint ✅
- cspell ✅
- eslint
- istanbul
- jshint
- markdownlint
- prettier ✅
- remark
- stylelint
- typescript ✅
- unocss ✅
- v8 ✅
- vite ✅
- webpack ✅

## Commands

<!-- commands -->

| Command                           | Title                            |
| --------------------------------- | -------------------------------- |
| `magic-comment.getLanguageConfig` | Magic Comment: getLanguageConfig |

<!-- commands -->

## Configs

<!-- configs -->

| Key                                 | Description                   | Type      | Default                                                                                       |
| ----------------------------------- | ----------------------------- | --------- | --------------------------------------------------------------------------------------------- |
| `magic-comment.annotation`          | Magic comment annotation      | `object`  | `{ "after": { "contentText": "🚀", "margin": "0 0 0 0.5em" }, "color": "rgb(255, 189, 42)" }` |
| `magic-comment.customMagicComments` | User defined magic comments   | `array`   | `[]`                                                                                          |
| `magic-comment.disabledCategories`  | Disabled by comments category | `array`   | `[]`                                                                                          |
| `magic-comment.disabledNames`       | Disabled by comments name     | `array`   | `[]`                                                                                          |
| `magic-comment.enable`              | Enable extension              | `boolean` | `true`                                                                                        |
| `magic-comment.ignorePaths`         | Ignored paths pattern         | `array`   | `[]`                                                                                          |
| `magic-comment.languages`           | Enabled by language ids       | `array`   | `["javascript","javascriptreact","markdown","typescript","typescriptreact"]`                  |

<!-- configs -->

## License

[MIT](./LICENSE) License © 2024-PRESENT [ntnyq](https://github.com/ntnyq)
