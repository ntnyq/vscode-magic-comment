/**
 * @file v8
 *
 * @see {@link https://github.com/istanbuljs/v8-to-istanbul#ignoring-uncovered-lines}
 */

import { defineMagicComment } from '../utils/define'

const v8IgnoreProvider = defineMagicComment({
  name: 'v8-ignore',
  description: `v8-ignore`,
  pattern: /\/\*\s*v8-ignore\s/,
  category: 'v8',
  languages: ['javascript', 'typescript', 'javascriptreact', 'typescriptreact'],
})

// @keep-sorted
export const v8Providers = [v8IgnoreProvider]
