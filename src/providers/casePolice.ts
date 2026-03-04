/**
 * @file case-police
 *
 * @see {@link https://github.com/antfu/case-police#ignores}
 *
 * @example
 *
 * ```md
 * - @case-police-ignore
 * - @case-police-disable
 * ```
 */

import { createCommentPatterns, defineMagicComment } from '../utils/define'

const casePoliceIgnoreProvider = defineMagicComment({
  name: 'case-police-ignore',
  description: `case-police-ignore`,
  patterns: createCommentPatterns('@case-police-ignore', {
    types: ['line', 'block'],
  }),
  url: 'https://github.com/antfu/case-police#ignores',
  category: 'case-police',
})

const casePoliceDisableProvider = defineMagicComment({
  name: 'case-police-disable',
  description: `case-police-disable`,
  patterns: createCommentPatterns('@case-police-disable', {
    types: ['line', 'block'],
  }),
  url: 'https://github.com/antfu/case-police#ignores',
  category: 'case-police',
})

// @keep-sorted
export const casePoliceProviders = [
  casePoliceDisableProvider,
  casePoliceIgnoreProvider,
]
