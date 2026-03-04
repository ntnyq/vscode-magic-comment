/**
 * @file vite
 *
 * @see {@link https://github.com/evanw/esbuild/releases/tag/v0.16.14}
 *
 * @example
 *
 * ```md
 * - @vite-ignore
 * ```
 */

import { createCommentPatterns, defineMagicComment } from '../utils/define'

const viteIgnoreProvider = defineMagicComment({
  name: 'vite-ignore',
  description: `vite-ignore`,
  url: 'https://github.com/evanw/esbuild/releases/tag/v0.16.14',
  patterns: createCommentPatterns('@vite-ignore', { types: ['block'] }),
  category: 'vite',
})

// @keep-sorted
export const viteProviders = [viteIgnoreProvider]
