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
  description: 'prettier-ignore',
  url: 'https://prettier.io/docs/ignore.html',
  patterns: [
    // # prettier-ignore
    /#\s*(prettier-ignore)/g,
    // // prettier-ignore
    /\/\/\s*(prettier-ignore)/g,
    // /* prettier-ignore */
    /\/\*\s*(prettier-ignore)\s*\*\//g,
    // <!-- prettier-ignore -->
    /<!--\s*(prettier-ignore)\s*-->/g,
  ],
  category: 'prettier',
})

const prettierIgnoreAttributeProvider = defineMagicComment({
  name: 'prettier-ignore-attribute',
  description: `prettier-ignore-attribute`,
  url: 'https://prettier.io/docs/ignore.html',
  patterns: [
    // <!-- prettier-ignore-attribute -->
    /<!--\s*(prettier-ignore-attribute)\s*-->/g,
  ],
  category: 'prettier',
})

const prettierIgnoreStartProvider = defineMagicComment({
  name: 'prettier-ignore-start',
  description: `prettier-ignore-start`,
  url: 'https://prettier.io/docs/ignore.html',
  patterns: [
    // <!-- prettier-ignore-start -->
    /<!--\s*(prettier-ignore-start)\s*-->/g,
  ],
  category: 'prettier',
})

const prettierIgnoreEndProvider = defineMagicComment({
  name: 'prettier-ignore-end',
  description: `prettier-ignore-end`,
  url: 'https://prettier.io/docs/ignore.html',
  patterns: [
    // <!-- prettier-ignore-end -->
    /<!--\s*(prettier-ignore-end)\s*-->/g,
  ],
  category: 'prettier',
})

// @keep-sorted
export const prettierProviders = [
  prettierIgnoreAttributeProvider,
  prettierIgnoreEndProvider,
  prettierIgnoreProvider,
  prettierIgnoreStartProvider,
]
