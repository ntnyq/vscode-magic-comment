/**
 * @file typescript
 *
 * @see {@link https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html#ts-check}
 *
 * @example
 *
 * ```md
 * - @ts-check
 * - @ts-nocheck
 * - @ts-ignore
 * - @ts-expect-error
 * ```
 */

import { defineMagicComment } from '../core'

const tsCheckProvider = defineMagicComment({
  name: 'ts-check',
  description: `ts-check`,
  url: 'https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html#ts-check',
  patterns: [
    {
      kind: 'token',
      tokens: ['@ts-check'],
      syntax: ['line'],
      trailing: 'line',
    },
  ],
  category: 'typescript',
})

const tsNocheckProvider = defineMagicComment({
  name: 'ts-nocheck',
  description: `ts-nocheck`,
  patterns: [
    {
      kind: 'token',
      tokens: ['@ts-nocheck'],
      syntax: ['line'],
      trailing: 'line',
    },
  ],
  category: 'typescript',
})

const tsIgnoreProvider = defineMagicComment({
  name: 'ts-ignore',
  description: `ts-ignore`,
  patterns: [
    {
      kind: 'token',
      tokens: ['@ts-ignore'],
      syntax: ['line'],
      trailing: 'line',
    },
  ],
  category: 'typescript',
})

const tsExpectErrorProvider = defineMagicComment({
  name: 'ts-expect-error',
  description: `ts-expect-error`,
  patterns: [
    {
      kind: 'token',
      tokens: ['@ts-expect-error'],
      syntax: ['line'],
      trailing: 'line',
    },
  ],
  category: 'typescript',
})

// @keep-sorted
export const typescriptProviders = [
  tsCheckProvider,
  tsExpectErrorProvider,
  tsIgnoreProvider,
  tsNocheckProvider,
]
