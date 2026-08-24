/**
 * @file stylelint
 *
 * @see {@link https://stylelint.io/user-guide/ignore-code}
 *
 * @example
 *
 * ```md
 * - stylelint-disable
 * - stylelint-enable
 * - stylelint-disable-line
 * - stylelint-disable-next-line
 * ```
 */

import { createCommentPatterns, defineMagicComment } from '../utils/define'

const stylelintEnableProvider = defineMagicComment({
  name: 'stylelint-enable',
  description: `stylelint-enable`,
  url: 'https://stylelint.io/user-guide/ignore-code',
  patterns: createCommentPatterns('stylelint-enable', {
    types: ['block'],
    trailing: true,
  }),
  category: 'stylelint',
}),

 stylelintDisableProvider = defineMagicComment({
  name: 'stylelint-disable',
  description: `stylelint-disable`,
  url: 'https://stylelint.io/user-guide/ignore-code',
  patterns: createCommentPatterns('stylelint-disable', {
    types: ['block'],
    trailing: true,
  }),
  category: 'stylelint',
}),

 stylelintDisableLineProvider = defineMagicComment({
  name: 'stylelint-disable-line',
  description: `stylelint-disable-line`,
  url: 'https://stylelint.io/user-guide/ignore-code',
  patterns: createCommentPatterns('stylelint-disable-line', {
    types: ['block'],
    trailing: true,
  }),
  category: 'stylelint',
}),

 stylelintDisableNextLineProvider = defineMagicComment({
  name: 'stylelint-disable-next-line',
  description: `stylelint-disable-next-line`,
  url: 'https://stylelint.io/user-guide/ignore-code',
  patterns: createCommentPatterns('stylelint-disable-next-line', {
    types: ['block'],
    trailing: true,
  }),
  category: 'stylelint',
})

// @keep-sorted
export const stylelintProviders = [
  stylelintDisableLineProvider,
  stylelintDisableNextLineProvider,
  stylelintDisableProvider,
  stylelintEnableProvider,
]
