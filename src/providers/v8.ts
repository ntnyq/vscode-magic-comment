/**
 * @file v8
 *
 * @see {@link https://github.com/istanbuljs/v8-to-istanbul/blob/master/lib/source.js}
 */

import { defineMagicComment } from '../utils/define'

const v8IgnoreNextProvider = defineMagicComment({
  name: 'v8-ignore',
  description: `v8-ignore`,
  patterns: /\/\*\s*v8-ignore\s/,
  category: 'v8',
})

// @keep-sorted
export const v8Providers = [v8IgnoreNextProvider]
