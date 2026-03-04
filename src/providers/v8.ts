/**
 * @file v8
 *
 * @see {@link https://github.com/istanbuljs/v8-to-istanbul/blob/master/lib/source.js}
 *
 * @example
 *
 * ```md
 * - v8 ignore next
 * - v8 ignore start
 * - v8 ignore stop
 * ```
 */

import { createCommentPatterns, defineMagicComment } from '../utils/define'

const v8IgnoreNextProvider = defineMagicComment({
  name: 'v8-ignore-next',
  description: `v8-ignore-next`,
  patterns: createCommentPatterns('v8 ignore next', {
    types: ['block'],
    trailing: true,
  }),
  category: 'v8',
})

const v8IgnoreStartProvider = defineMagicComment({
  name: 'v8-ignore-start',
  description: `v8-ignore-start`,
  patterns: createCommentPatterns('v8 ignore start', {
    types: ['block'],
  }),
  category: 'v8',
})

const v8IgnoreStopProvider = defineMagicComment({
  name: 'v8-ignore-stop',
  description: `v8-ignore-stop`,
  patterns: createCommentPatterns('v8 ignore stop', {
    types: ['block'],
  }),
  category: 'v8',
})

// @keep-sorted
export const v8Providers = [
  v8IgnoreNextProvider,
  v8IgnoreStartProvider,
  v8IgnoreStopProvider,
]
