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

import { defineMagicComment } from '../utils/define'

const v8IgnoreNextProvider = defineMagicComment({
  name: 'v8-ignore-next',
  description: `v8-ignore-next`,
  patterns: [
    // /* v8 ignore next */
    /\/\*\s*(v8 ignore next)[\s\S]*?\*\//g,
  ],
  category: 'v8',
})

const v8IgnoreStartProvider = defineMagicComment({
  name: 'v8-ignore-start',
  description: `v8-ignore-start`,
  patterns: [
    // /* v8 ignore start */
    /\/\*\s*(v8 ignore start)[\s\S]*?\*\//g,
  ],
  category: 'v8',
})

const v8IgnoreStopProvider = defineMagicComment({
  name: 'v8-ignore-stop',
  description: `v8-ignore-stop`,
  patterns: [
    // /* v8 ignore stop */
    /\/\*\s*(v8 ignore stop)[\s\S]*?\*\//g,
  ],
  category: 'v8',
})

// @keep-sorted
export const v8Providers = [
  v8IgnoreNextProvider,
  v8IgnoreStartProvider,
  v8IgnoreStopProvider,
]
