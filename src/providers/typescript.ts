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

import { defineMagicComment } from '../utils/define'

const tsCheckProvider = defineMagicComment({
  name: 'ts-check',
  description: `ts-check`,
  url: 'https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html#ts-check',
  patterns: [/\/\*\s*@ts-check\s/g],
  category: 'typescript',
})

const tsNocheckProvider = defineMagicComment({
  name: 'ts-nocheck',
  description: `ts-nocheck`,
  patterns: [/\/\*\s*@ts-nocheck\s/g],
  category: 'typescript',
})

const tsIgnoreProvider = defineMagicComment({
  name: 'ts-ignore',
  description: `ts-ignore`,
  patterns: [/\/\*\s*@ts-ignore\s/g],
  category: 'typescript',
})

const tsExpectErrorProvider = defineMagicComment({
  name: 'ts-expect-error',
  description: `ts-expect-error`,
  patterns: [/\/\*\s*@ts-expect-error\s/g],
  category: 'typescript',
})

// @keep-sorted
export const typescriptProviders = [
  tsCheckProvider,
  tsExpectErrorProvider,
  tsIgnoreProvider,
  tsNocheckProvider,
]
