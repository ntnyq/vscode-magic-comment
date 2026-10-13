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

import { defineMagicComment } from '../core'

const stylelintEnableProvider = defineMagicComment({
  name: 'stylelint-enable',
  description: `stylelint-enable`,
  url: 'https://stylelint.io/user-guide/ignore-code',
  patterns: [
    {
      kind: 'token',
      tokens: ['stylelint-enable'],
      syntax: ['block'],
      trailing: 'line',
    },
  ],
  category: 'stylelint',
})

const stylelintDisableProvider = defineMagicComment({
  name: 'stylelint-disable',
  description: `stylelint-disable`,
  url: 'https://stylelint.io/user-guide/ignore-code',
  patterns: [
    {
      kind: 'token',
      tokens: ['stylelint-disable'],
      syntax: ['block'],
      trailing: 'line',
    },
  ],
  category: 'stylelint',
})

const stylelintDisableLineProvider = defineMagicComment({
  name: 'stylelint-disable-line',
  description: `stylelint-disable-line`,
  url: 'https://stylelint.io/user-guide/ignore-code',
  patterns: [
    {
      kind: 'token',
      tokens: ['stylelint-disable-line'],
      syntax: ['block'],
      trailing: 'line',
    },
  ],
  category: 'stylelint',
})

const stylelintDisableNextLineProvider = defineMagicComment({
  name: 'stylelint-disable-next-line',
  description: `stylelint-disable-next-line`,
  url: 'https://stylelint.io/user-guide/ignore-code',
  patterns: [
    {
      kind: 'token',
      tokens: ['stylelint-disable-next-line'],
      syntax: ['block'],
      trailing: 'line',
    },
  ],
  category: 'stylelint',
})

// @keep-sorted
export const stylelintProviders = [
  stylelintDisableLineProvider,
  stylelintDisableNextLineProvider,
  stylelintDisableProvider,
  stylelintEnableProvider,
]
