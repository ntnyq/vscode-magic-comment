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

import { defineMagicComment } from '../core'

const viteIgnoreProvider = defineMagicComment({
  name: 'vite-ignore',
  description: `vite-ignore`,
  url: 'https://github.com/evanw/esbuild/releases/tag/v0.16.14',
  patterns: [{ kind: 'token', tokens: ['@vite-ignore'], syntax: ['block'] }],
  category: 'vite',
})

// @keep-sorted
export const viteProviders = [viteIgnoreProvider]
