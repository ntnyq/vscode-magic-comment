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
  pattern: /\/\*\s*@unocss-include\s/,
  category: 'unocss',
  languages: ['javascript', 'typescript', 'javascriptreact', 'typescriptreact'],
})

// @keep-sorted
export const unocssProviders = [unocssIncludeProvider]
