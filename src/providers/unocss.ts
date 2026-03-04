/**
 * @file unocss
 *
 * @see {@link https://unocss.dev/guide/extracting}
 *
 * @example
 *
 * ```md
 * - @unocss-include
 * - @unocss-ignore
 * - @unocss-skip-start
 * - @unocss-skip-end
 * ```
 */

import { createCommentPatterns, defineMagicComment } from '../utils/define'

const unocssIncludeProvider = defineMagicComment({
  name: 'unocss-include',
  description: `unocss-include`,
  url: 'https://unocss.dev/guide/extracting',
  patterns: createCommentPatterns('@unocss-include', {
    types: ['line', 'block'],
  }),
  category: 'unocss',
})

const unocssIgnoreProvider = defineMagicComment({
  name: 'unocss-ignore',
  description: `unocss-ignore`,
  url: 'https://unocss.dev/guide/extracting',
  patterns: createCommentPatterns('@unocss-ignore', {
    types: ['line', 'block'],
  }),
  category: 'unocss',
})

const unocssSkipStartProvider = defineMagicComment({
  name: 'unocss-skip-start',
  description: `unocss-skip-start`,
  url: 'https://unocss.dev/guide/extracting',
  patterns: createCommentPatterns('@unocss-skip-start', {
    types: ['line', 'block'],
  }),
  category: 'unocss',
})

const unocssSkipEndProvider = defineMagicComment({
  name: 'unocss-skip-end',
  description: `unocss-skip-end`,
  url: 'https://unocss.dev/guide/extracting',
  patterns: createCommentPatterns('@unocss-skip-end', {
    types: ['line', 'block'],
  }),
  category: 'unocss',
})

// @keep-sorted
export const unocssProviders = [
  unocssIncludeProvider,
  unocssIgnoreProvider,
  unocssSkipEndProvider,
  unocssSkipStartProvider,
]
