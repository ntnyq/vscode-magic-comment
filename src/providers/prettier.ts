/**
 * @file prettier
 *
 * @see {@link https://prettier.io/docs/en/ignore.html}
 *
 * @example
 *
 * ```md
 * - prettier-ignore
 * - prettier-ignore-attribute
 * - prettier-ignore-start
 * - prettier-ignore-end
 * ```
 */

import { createCommentPatterns, defineMagicComment } from '../utils/define'

const prettierIgnoreProvider = defineMagicComment({
  name: 'prettier-ignore',
  description: 'prettier-ignore',
  url: 'https://prettier.io/docs/ignore.html',
  patterns: createCommentPatterns('prettier-ignore', {
    types: ['hash', 'line', 'block', 'html'],
  }),
  category: 'prettier',
})

const prettierIgnoreAttributeProvider = defineMagicComment({
  name: 'prettier-ignore-attribute',
  description: `prettier-ignore-attribute`,
  url: 'https://prettier.io/docs/ignore.html',
  patterns: createCommentPatterns('prettier-ignore-attribute', {
    types: ['html'],
  }),
  category: 'prettier',
})

const prettierIgnoreStartProvider = defineMagicComment({
  name: 'prettier-ignore-start',
  description: `prettier-ignore-start`,
  url: 'https://prettier.io/docs/ignore.html',
  patterns: createCommentPatterns('prettier-ignore-start', {
    types: ['html'],
  }),
  category: 'prettier',
})

const prettierIgnoreEndProvider = defineMagicComment({
  name: 'prettier-ignore-end',
  description: `prettier-ignore-end`,
  url: 'https://prettier.io/docs/ignore.html',
  patterns: createCommentPatterns('prettier-ignore-end', {
    types: ['html'],
  }),
  category: 'prettier',
})

// @keep-sorted
export const prettierProviders = [
  prettierIgnoreAttributeProvider,
  prettierIgnoreEndProvider,
  prettierIgnoreProvider,
  prettierIgnoreStartProvider,
]
