# Repository Guidelines

## Project Structure & Module Organization

This TypeScript VS Code extension highlights and annotates magic comments.

- `src/index.ts` registers extension activation; `src/config.ts` handles settings.
- `src/providers/` defines tool-specific comments; register additions in `src/providers/index.ts` and update the alphabetized provider list in `README.md`.
- `src/features/` implements annotations and commands; `src/utils/`, `src/types/`, and `src/constants/` hold shared code.
- `playground/` contains manual examples. `.vscode/` provides development launch settings.
- `res/` contains packaged assets; `raw/` holds source artwork. `dist/` is generated and ignored.

## Build, Test, and Development Commands

Use Node.js LTS (`.node-version`) and the pnpm version declared in `package.json`.

| Command                             | Purpose                                        |
| ----------------------------------- | ---------------------------------------------- |
| `pnpm install --frozen-lockfile`    | Install locked dependencies.                   |
| `pnpm dev`                          | Watch and rebuild with development sourcemaps. |
| `pnpm build`                        | Bundle the extension with tsdown.              |
| `pnpm format` / `pnpm format:check` | Apply or check Oxfmt formatting.               |
| `pnpm lint`                         | Run Oxlint.                                    |
| `pnpm typecheck`                    | Run TypeScript without emitting files.         |
| `pnpm generate:meta`                | Regenerate metadata after manifest changes.    |
| `pnpm pack`                         | Package a VSIX after building.                 |

Run `pnpm dev`, then launch **Run Extension** (F5) in VS Code to open the playground.

## Coding Style & Naming Conventions

Use strict TypeScript, ESM, and explicit type-only imports. Follow `.editorconfig` and Oxfmt: two-space indentation, LF, single quotes, no semicolons, trailing commas, and an 80-column print width.

Use camelCase filenames/functions, PascalCase types, and provider exports such as `viteProviders`. Preserve `@keep-sorted` lists. Reuse `defineMagicComment` and `createCommentPatterns`; patterns capture the comment token in group 1. Edit `package.json` and regenerate `src/meta.ts`; never edit generated metadata manually.

## Testing Guidelines

No automated test framework, test naming convention, or coverage threshold is configured. Before submitting, run CI's checks: formatting, lint, build, and typecheck. Add relevant examples to `playground/index.ts`; manually verify matching, annotations, and affected settings, including nonmatching cases.

## Commit & Pull Request Guidelines

Follow existing Conventional Commits: `feat:`, `fix:`, `build:`, `ci:`, and `chore(deps):`. Keep commits focused. PRs should explain behavior changes, link relevant issues, and describe validation; include screenshots for annotation changes.

## Local Agent Commands

Follow `/Users/ntnyq/.codex/RTK.md`: prefix shell commands with `rtk`, except `pnpm typecheck`. Use the user-managed pnpm while preserving PATH and active Node.js:

```sh
rtk proxy env PATH="/Users/ntnyq/Library/pnpm/bin:$PATH" pnpm build
PATH="/Users/ntnyq/Library/pnpm/bin:$PATH" pnpm typecheck
```

Never modify Codex's bundled pnpm or runtime cache.
