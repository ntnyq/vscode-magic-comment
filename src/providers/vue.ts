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

import { defineMagicComment } from '../utils/define'

const vueSkipProvider = defineMagicComment({
  name: 'vue-skip',
  description: `vue-skip`,
  patterns: [
    // <!-- @vue-skip -->
    /<!--\s(@vue-skip)[\s\S]*?\s-->/g,
  ],
  category: 'vue',
})

const vueIgnoreProvider = defineMagicComment({
  name: 'vue-ignore',
  description: `vue-ignore`,
  patterns: [
    // <!-- @vue-ignore -->
    /<!--\s(@vue-ignore)[\s\S]*?\s-->/g,
  ],
  category: 'vue',
})

const vueGenericProvider = defineMagicComment({
  name: 'vue-generic',
  description: `vue-generic`,
  patterns: [
    // <!-- @vue-generic -->
    /<!--\s(@vue-generic)[\s\S]*?\s-->/g,
  ],
  category: 'vue',
})

const vueExpectErrorProvider = defineMagicComment({
  name: 'vue-expect-error',
  description: `vue-expect-error`,
  patterns: [
    // <!-- @vue-expect-error -->
    /<!--\s(@vue-expect-error)[\s\S]*?\s-->/g,
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
