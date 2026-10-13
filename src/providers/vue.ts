/**
 * @file vue
 *
 * @see {@link https://github.com/vuejs/language-tools/pull/5135}
 *
 * @example
 *
 * ```md
 * - @vue-skip
 * - @vue-ignore
 * - @vue-generic
 * - @vue-expect-error
 * ```
 */

import { defineMagicComment } from '../core'

const vueSkipProvider = defineMagicComment({
  name: 'vue-skip',
  description: `vue-skip`,
  patterns: [{ kind: 'token', tokens: ['@vue-skip'], syntax: ['html'] }],
  category: 'vue',
})

const vueIgnoreProvider = defineMagicComment({
  name: 'vue-ignore',
  description: `vue-ignore`,
  patterns: [{ kind: 'token', tokens: ['@vue-ignore'], syntax: ['html'] }],
  category: 'vue',
})

const vueGenericProvider = defineMagicComment({
  name: 'vue-generic',
  description: `vue-generic`,
  patterns: [
    {
      kind: 'token',
      tokens: ['@vue-generic'],
      syntax: ['html'],
      trailing: 'line',
    },
  ],
  category: 'vue',
})

const vueExpectErrorProvider = defineMagicComment({
  name: 'vue-expect-error',
  description: `vue-expect-error`,
  patterns: [
    { kind: 'token', tokens: ['@vue-expect-error'], syntax: ['html'] },
  ],
  category: 'vue',
})

// @keep-sorted
export const vueProviders = [
  vueExpectErrorProvider,
  vueGenericProvider,
  vueIgnoreProvider,
  vueSkipProvider,
]
