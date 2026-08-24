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

import { createCommentPatterns, defineMagicComment } from '../utils/define'

const vueSkipProvider = defineMagicComment({
  name: 'vue-skip',
  description: `vue-skip`,
  patterns: createCommentPatterns('@vue-skip', { types: ['html'] }),
  category: 'vue',
}),

 vueIgnoreProvider = defineMagicComment({
  name: 'vue-ignore',
  description: `vue-ignore`,
  patterns: createCommentPatterns('@vue-ignore', { types: ['html'] }),
  category: 'vue',
}),

 vueGenericProvider = defineMagicComment({
  name: 'vue-generic',
  description: `vue-generic`,
  patterns: createCommentPatterns('@vue-generic', {
    types: ['html'],
    trailing: true,
  }),
  category: 'vue',
}),

 vueExpectErrorProvider = defineMagicComment({
  name: 'vue-expect-error',
  description: `vue-expect-error`,
  patterns: createCommentPatterns('@vue-expect-error', { types: ['html'] }),
  category: 'vue',
})

// @keep-sorted
export const vueProviders = [
  vueExpectErrorProvider,
  vueGenericProvider,
  vueIgnoreProvider,
  vueSkipProvider,
]
