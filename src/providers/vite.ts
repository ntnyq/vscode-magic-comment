/**
 * @file vite
 *
 * @see {@link https://github.com/evanw/esbuild/issues/2721#issuecomment-1340519923}
 *
 *
 * @example
 *
 * ```md
 * - vite-ignore
 * ```
 */

import { defineMagicComment } from '../utils/define'

const viteIgnoreProvider = defineMagicComment({
  name: 'vite-ignore',
  description: `vite-ignore`,
  url: 'https://github.com/evanw/esbuild/releases/tag/v0.16.14',
  patterns: [
    // /* @vite-ignore */
    /\/\*\s*(@vite-ignore)\s*\*\//g,
  ],
  category: 'vite',
})

// @keep-sorted
export const viteProviders = [viteIgnoreProvider]
