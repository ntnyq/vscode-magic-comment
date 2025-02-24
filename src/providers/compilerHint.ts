/**
 * @file compiler
 *
 * @see {@link https://github.com/javascript-compiler-hints/compiler-notations-spec}
 *
 * @example
 *
 * ```md
 * - #__NO_SIDE_EFFECTS__
 * - @__NO_SIDE_EFFECTS__
 * - #__PURE__
 * - @__PURE__
 * ```
 */

import { defineMagicComment } from '../utils'

const pureNotationProvider = defineMagicComment({
  name: 'pure-notation',
  description: `pure-notation`,
  patterns: [
    // /* #__PURE__ */
    /\/\*\s(#__PURE__)\s\*\//g,
    // /* @__PURE__ */
    /\/\*\s(@__PURE__)\s\*\//g,
  ],
  url: 'https://github.com/javascript-compiler-hints/compiler-notations-spec',
  category: 'compiler-hint',
})

const noSideEffectsNotationProvider = defineMagicComment({
  name: 'no-side-effects-notation',
  description: `no-side-effects-notation`,
  patterns: [
    // /* #__NO_SIDE_EFFECTS__ */
    /\/\*\s(#__NO_SIDE_EFFECTS__)\s\*\//g,
    // /* @__NO_SIDE_EFFECTS__ */
    /\/\*\s(@__NO_SIDE_EFFECTS__)\s\*\//g,
  ],
  url: 'https://github.com/javascript-compiler-hints/compiler-notations-spec',
  category: 'compiler-hint',
})

// @keep-sorted
export const compilerHintProviders = [
  noSideEffectsNotationProvider,
  pureNotationProvider,
]
