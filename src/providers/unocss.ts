/**
 * @file unocss
 *
 * @see {@link https://unocss.dev/guide/extracting}
 *
 * @example
 *
 * ```md
 * - @unocss-include
 * ```
 */

import { defineMagicComment } from '../utils/define'

const unocssIncludeProvider = defineMagicComment({
  name: 'unocss-include',
  description: `unocss-include`,
  url: 'https://unocss.dev/guide/extracting',
  patterns: [
    // // @unocss-include
    /\/\/\s*(@unocss-include)/g,
    // /* @unocss-include */
    /\/\*\s*(@unocss-include)\s*\*\//g,
    // /** @unocss-include */
    /\/\*\*[\s\S]*?(@unocss-include)[\s\S]*?\*\//g,
  ],
  category: 'unocss',
})

// @keep-sorted
export const unocssProviders = [unocssIncludeProvider]
