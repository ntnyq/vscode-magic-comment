/**
 * @file compiler hints
 *
 * @see {@link https://github.com/javascript-compiler-hints/compiler-notations-spec}
 *
 * @example
 *
 * ```md
 * - #__PURE__
 * - @__PURE__
 * - #__NO_SIDE_EFFECTS__
 * - @__NO_SIDE_EFFECTS__
 * ```
 */

import { defineMagicComment } from '../core'

const pureNotationProvider = defineMagicComment({
  name: 'pure-notation',
  description: `pure-notation`,
  patterns: [{ kind: 'token', tokens: ['#__PURE__'], syntax: ['block'] }],
  url: 'https://github.com/javascript-compiler-hints/compiler-notations-spec',
  category: 'compiler-hint',
})

const atPureNotationProvider = defineMagicComment({
  name: 'at-pure-notation',
  description: `at-pure-notation`,
  patterns: [{ kind: 'token', tokens: ['@__PURE__'], syntax: ['block'] }],
  url: 'https://github.com/javascript-compiler-hints/compiler-notations-spec',
  category: 'compiler-hint',
})

const noSideEffectsNotationProvider = defineMagicComment({
  name: 'no-side-effects-notation',
  description: `no-side-effects-notation`,
  patterns: [
    { kind: 'token', tokens: ['#__NO_SIDE_EFFECTS__'], syntax: ['block'] },
  ],
  url: 'https://github.com/javascript-compiler-hints/compiler-notations-spec',
  category: 'compiler-hint',
})

const atNoSideEffectsNotationProvider = defineMagicComment({
  name: 'at-no-side-effects-notation',
  description: `at-no-side-effects-notation`,
  patterns: [
    { kind: 'token', tokens: ['@__NO_SIDE_EFFECTS__'], syntax: ['block'] },
  ],
  url: 'https://github.com/javascript-compiler-hints/compiler-notations-spec',
  category: 'compiler-hint',
})

// @keep-sorted
export const compilerHintProviders = [
  atNoSideEffectsNotationProvider,
  atPureNotationProvider,
  noSideEffectsNotationProvider,
  pureNotationProvider,
]
