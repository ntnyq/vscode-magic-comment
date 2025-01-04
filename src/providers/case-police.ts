/**
 * @file case-police
 *
 * @example
 *
 * ```md
 * - @case-police-ignore
 * ```
 */

import { defineMagicComment } from '../utils/define'

const casePoliceIgnoreProvider = defineMagicComment({
  name: 'case-police-ignore',
  description: `case-police-ignore`,
  patterns: /\/\*\s*@case-police-ignore\s/,
  url: 'https://github.com/antfu/case-police#ignores',
  category: 'case-police',
})

// @keep-sorted
export const casePoliceProviders = [casePoliceIgnoreProvider]
