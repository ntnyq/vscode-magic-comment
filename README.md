# vscode-magic-comment

[![CI](https://github.com/ntnyq/vscode-magic-comment/workflows/CI/badge.svg)](https://github.com/ntnyq/vscode-magic-comment/actions)
[![MARKETPLACE](https://img.shields.io/github/v/release/ntnyq/vscode-magic-comment?include_prereleases&label=Visual%20Studio%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=ntnyq.vscode-magic-comment)
[![LANGUAGE](https://img.shields.io/github/languages/top/ntnyq/vscode-magic-comment)](https://github.com/ntnyq/vscode-magic-comment)
[![LICENSE](https://img.shields.io/github/license/ntnyq/vscode-magic-comment)](https://github.com/ntnyq/vscode-magic-comment/blob/main/LICENSE)

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
- case-police ✅
- compiler-hint ✅
- cspell ✅
- dprint ✅
- prettier ✅
- stylelint ✅
- typescript ✅
- unocss ✅
- v8 ✅
- vite ✅
- vue ✅
- webpack ✅

More comming soon.

## Commands

<!-- commands -->

| Command                           | Title                            |
| --------------------------------- | -------------------------------- |
| `magic-comment.getLanguageConfig` | Magic Comment: getLanguageConfig |

<!-- commands -->

## Configs

<!-- configs -->

| Key                                 | Description                                                                             | Type      | Default                                                                                       |
| ----------------------------------- | --------------------------------------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------- |
| `magic-comment.annotation`          | Magic comment annotation                                                                | `object`  | `{ "after": { "contentText": "🚀", "margin": "0 0 0 0.5em" }, "color": "rgb(255, 189, 42)" }` |
| `magic-comment.customMagicComments` | User defined magic comments                                                             | `array`   | `[]`                                                                                          |
| `magic-comment.disabledCategories`  | Disabled by comments category                                                           | `array`   | `[]`                                                                                          |
| `magic-comment.disabledNames`       | Disabled by comments name                                                               | `array`   | `[]`                                                                                          |
| `magic-comment.enable`              | Enable extension                                                                        | `boolean` | `true`                                                                                        |
| `magic-comment.ignorePaths`         | Ignored glob patterns, relative to the workspace folder or absolute outside a workspace | `array`   | `[]`                                                                                          |
| `magic-comment.languages`           | Enabled by language ids                                                                 | `array`   | `["javascript","javascriptreact","markdown","typescript","typescriptreact"]`                  |

<!-- configs -->

### Document settings

Settings support workspace-folder and language overrides. Changes apply to all
visible editors immediately; text edits are scanned after a 100ms debounce.
Splits showing the same document share its scan results. Changing only the
annotation style does not rescan the text.

- `enable: false` clears decorations and cancels pending scans. Re-enabling does
  not require restarting the extension.
- `languages: []` falls back to the default language list. Unknown language IDs
  are reported in the **VSCode Magic Comment** output channel; if no valid IDs
  remain, the default list is used.
- `ignorePaths` uses VS Code glob syntax, such as `dist/**` or `**/*.generated.ts`.
  Paths are relative to the document's workspace folder. Outside a workspace,
  patterns match absolute paths. Untitled documents skip path filtering.
- `annotation.after.contentText: ""` hides the suffix. Empty strings are preserved
  for the other style fields as well.

### Custom rules

Existing regex strings and arrays of regex strings remain supported. The token to
decorate must be captured in group 1:

```json
{
  "magic-comment.customMagicComments": [
    {
      "name": "project-ignore",
      "patterns": "//\\s*(@project-ignore)(?=\\s|$)"
    }
  ]
}
```

For literal tokens, declare the supported comment syntax instead:

```json
{
  "magic-comment.customMagicComments": [
    {
      "name": "project-ignore",
      "category": "project",
      "description": "Skip the next project check.",
      "patterns": [
        {
          "kind": "token",
          "tokens": ["@project-ignore"],
          "syntax": ["line", "block"],
          "trailing": "line"
        }
      ]
    }
  ]
}
```

`syntax` accepts `line` (`//`), `block` (`/* */`), `html` (`<!-- -->`) and `hash`
(`#`). Tokens are literal strings; regex punctuation is escaped automatically.
They must end at whitespace, `:`, `=`, a comment closer or the end of input, so
`@project-ignore-extra` does not match `@project-ignore`.

`trailing` defaults to `none`: only whitespace may follow the token before the
comment closes or the line ends. `line` allows same-line parameters or reasons;
`multiline` also allows newlines inside block and HTML comments. Line and hash
comments always stop at a line ending.

Advanced patterns use `{ "kind": "regex", "source": "(@project-ignore)",
"flags": "i", "capture": 1 }`. `capture` defaults to 1; 0 selects the whole match.
The engine adds `d` and `g`, defaults to Unicode mode (`u`) unless `u` or `v` is
provided, and removes sticky mode (`y`) for full-text scanning. Invalid flag
combinations are rejected. Legacy strings and declaration objects cannot be
mixed in the same rule's `patterns` array.

Built-in names cannot be overridden. The first valid custom declaration for a
name wins. Invalid declarations, regexes, missing captures and empty matches are
reported in the output channel without stopping other valid patterns. Repeated
issues are logged once until settings change. Identical ranges from different
rules share one decoration and combined hover information.

Matching is text-based: comment-like text inside strings can also match. Regular
expressions run synchronously; avoid expressions with catastrophic backtracking.

## Development

The implementation is organized around four modules:

```text
src/
  core/        # Declarations, regex compilation and pure text scanning
  config/      # Document settings, legacy conversion and path filtering
  providers/   # Built-in declarations with stable names and categories
  features/    # Editor coordination, decorations, hover content and commands
  constants/   # Default styles and language IDs
  utils/       # Output logger
tests/         # Core regressions and editor lifecycle tests with VS Code adapters
playground/    # Manual extension-host examples
```

Providers use `defineMagicComment` from `src/core`; register new providers in
`src/providers/index.ts` and the alphabetical list above. The core interface is
`createMagicCommentEngine(rules)`, exposing compile-time `issues` and
`scan(text) → { matches, issues }`. Match ranges are UTF-16 `[start, end)` offsets.
The core does not import VS Code or reactive state.

Run `pnpm test`, `pnpm format:check`, `pnpm lint`, `pnpm build` and
`pnpm typecheck`. Regenerate `src/meta.ts` with `pnpm generate:meta` after changing
the manifest. CI runs all five checks.

For visual verification, run `pnpm dev` and launch **Run Extension** (F5). Open
the playground examples in split editors, then change `enable`, `languages`,
`ignorePaths`, custom rules and annotation styles. Check that clearing a file,
switching languages and closing editors leave no stale decorations. Add `html`
and `css` to `languages` to inspect the corresponding examples.

## License

[MIT](./LICENSE) License © 2024-PRESENT [ntnyq](https://github.com/ntnyq)
