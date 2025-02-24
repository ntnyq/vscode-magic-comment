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

import { defineMagicComment } from '../utils/define'

const stylelintEnableProvider = defineMagicComment({
  name: 'stylelint-enable',
  description: `stylelint-enable`,
  url: 'https://stylelint.io/user-guide/ignore-code',
  patterns: [
    // /* @stylelint-enable */
    /\/\*\s(stylelint-enable)\s[\s\S]*?\*\//g,
  ],
  category: 'stylelint',
})

const stylelintDisableProvider = defineMagicComment({
  name: 'stylelint-disable',
  description: `stylelint-disable`,
  url: 'https://stylelint.io/user-guide/ignore-code',
  patterns: [
    // /* @stylelint-disable */
    /\/\*\s(stylelint-disable)\s[\s\S]*?\*\//g,
  ],
  category: 'stylelint',
})

const stylelintDisableLineProvider = defineMagicComment({
  name: 'stylelint-disable-line',
  description: `stylelint-disable-line`,
  url: 'https://stylelint.io/user-guide/ignore-code',
  patterns: [
    // /* @stylelint-disable-line */
    /\/\*\s(stylelint-disable-line)\s[\s\S]*?\*\//g,
  ],
  category: 'stylelint',
})

const stylelintDisableNextLineProvider = defineMagicComment({
  name: 'stylelint-disable-next-line',
  description: `stylelint-disable-next-line`,
  url: 'https://stylelint.io/user-guide/ignore-code',
  patterns: [
    // /* @stylelint-disable-next-line */
    /\/\*\s(stylelint-disable-next-line)\s[\s\S]*?\*\//g,
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
