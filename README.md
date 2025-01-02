# vscode-magic-comment

[![GitHub release](https://img.shields.io/github/v/release/ntnyq/vscode-magic-comment?include_prereleases&label=Visual%20Studio%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=ntnyq.vscode-magic-comment)
[![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/ntnyq.vscode-magic-comment)](https://marketplace.visualstudio.com/items?itemName=ntnyq.vscode-magic-comment)
[![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/ntnyq.vscode-magic-comment)](https://marketplace.visualstudio.com/items?itemName=ntnyq.vscode-magic-comment)
[![GitHub Workflow Status](https://github.com/ntnyq/vscode-magic-comment/workflows/CI/badge.svg)](https://github.com/ntnyq/vscode-magic-comment/actions)
[![GitHub top language](https://img.shields.io/github/languages/top/ntnyq/vscode-magic-comment)](https://github.com/ntnyq/vscode-magic-comment)
[![GitHub](https://img.shields.io/github/license/ntnyq/vscode-magic-comment)](https://github.com/ntnyq/vscode-magic-comment/blob/main/LICENSE)

> Highlight and add annotations to magic comments.

## Features

- Highlight magic comments
- Add annotations to magic comments

## Providers

> Sorted alphabetically

- biome
- c8
- compiler
- cspell
- eslint
- istanbul
- jshint
- markdownlint
- prettier
- remark
- stylelint
- typescript
- unocss
- v8

## Commands

<!-- commands -->

| Command                           | Title                            |
| --------------------------------- | -------------------------------- |
| `magic-comment.getLanguageConfig` | Magic Comment: getLanguageConfig |

<!-- commands -->

## Configs

<!-- configs -->

| Key                                | Description                   | Type      | Default                                                                                       |
| ---------------------------------- | ----------------------------- | --------- | --------------------------------------------------------------------------------------------- |
| `magic-comment.annotation`         | Magic comment annotation      | `object`  | `{ "after": { "contentText": "🚀", "margin": "0 0 0 0.5em" }, "color": "rgb(255, 189, 42)" }` |
| `magic-comment.disabledCategories` | Disabled by comments category | `array`   | `[]`                                                                                          |
| `magic-comment.disabledNames`      | Disabled by comments name     | `array`   | `[]`                                                                                          |
| `magic-comment.enable`             | Enable extension              | `boolean` | `true`                                                                                        |
| `magic-comment.excludeFiles`       | Exclude files                 | `array`   | `[]`                                                                                          |
| `magic-comment.includeFiles`       | Include files                 | `array`   | `[]`                                                                                          |
| `magic-comment.supportLanguages`   | Enabled in languages          | `array`   | `[]`                                                                                          |
| `magic-comment.userComments`       | User defined magic comments   | `array`   | `[]`                                                                                          |

<!-- configs -->

## License

[MIT](./LICENSE) License © 2024-PRESENT [ntnyq](https://github.com/ntnyq)
