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

import { defineMagicComment } from '../utils/define'

const prettierIgnoreProvider = defineMagicComment({
  name: 'prettier-ignore',
  description: `prettier-ignore`,
  patterns: /\/\*\s*prettier-ignore\s/,
  category: 'prettier',
})

const prettierIgnoreAttributeProvider = defineMagicComment({
  name: 'prettier-ignore-attribute',
  description: `prettier-ignore-attribute`,
  patterns: /\/\*\s*prettier-ignore-attribute\s/,
  category: 'prettier',
})

const prettierIgnoreStartProvider = defineMagicComment({
  name: 'prettier-ignore-start',
  description: `prettier-ignore-start`,
  patterns: /\/\*\s*prettier-ignore-start\s/,
  category: 'prettier',
})

const prettierIgnoreEndProvider = defineMagicComment({
  name: 'prettier-ignore-end',
  description: `prettier-ignore-end`,
  patterns: /\/\*\s*prettier-ignore-end\s/,
  category: 'prettier',
})

// @keep-sorted
export const prettierProviders = [
  prettierIgnoreAttributeProvider,
  prettierIgnoreEndProvider,
  prettierIgnoreProvider,
  prettierIgnoreStartProvider,
]
