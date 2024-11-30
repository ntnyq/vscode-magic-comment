/**
 * @file vite
 *
 * @see {@link https://github.com/evanw/esbuild/issues/2721#issuecomment-1340519923}
 */

import { defineMagicComment } from '../utils/define'

const viteIgnoreProvider = defineMagicComment({
  name: 'vite-ignore',
  description: `vite-ignore\n\n[esbuild](https://github.com/evanw/esbuild/releases/tag/v0.16.14)`,
  url: 'https://github.com/evanw/esbuild/releases/tag/v0.16.14',
  // @regexper https://regexper.com/#%2F%5C%2F%5C*%5Cs(%40vite-ignore)%5Cs%5C*%5C%2F%2Fg
  pattern: /\/\*\s(@vite-ignore)\s\*\//g,
  category: 'vite',
  languages: ['javascript', 'typescript', 'javascriptreact', 'typescriptreact'],
})

// @keep-sorted
export const viteProviders = [viteIgnoreProvider]
