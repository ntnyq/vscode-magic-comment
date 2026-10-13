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

import { defineMagicComment } from '../core'

const casePoliceIgnoreProvider = defineMagicComment({
  name: 'case-police-ignore',
  description: `case-police-ignore`,
  patterns: [
    {
      kind: 'token',
      tokens: ['@case-police-ignore'],
      syntax: ['line'],
      trailing: 'line',
    },
    { kind: 'token', tokens: ['@case-police-ignore'], syntax: ['block'] },
  ],
  url: 'https://github.com/antfu/case-police#ignores',
  category: 'case-police',
})

const casePoliceDisableProvider = defineMagicComment({
  name: 'case-police-disable',
  description: `case-police-disable`,
  patterns: [
    {
      kind: 'token',
      tokens: ['@case-police-disable'],
      syntax: ['line'],
      trailing: 'line',
    },
    { kind: 'token', tokens: ['@case-police-disable'], syntax: ['block'] },
  ],
  url: 'https://github.com/antfu/case-police#ignores',
  category: 'case-police',
})

// @keep-sorted
export const casePoliceProviders = [
  casePoliceDisableProvider,
  casePoliceIgnoreProvider,
]
