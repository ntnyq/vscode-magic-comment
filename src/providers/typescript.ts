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
  // \/\/\s*@ts-check|\/\*[\s\S]*?@ts-check[\s\S]*?\*\/
  patterns: [/\/\/\s*(@ts-check)/g],
  category: 'typescript',
})

const tsNocheckProvider = defineMagicComment({
  name: 'ts-nocheck',
  description: `ts-nocheck`,
  patterns: [/\/\/\s*(@ts-nocheck)/g],
  category: 'typescript',
})

const tsIgnoreProvider = defineMagicComment({
  name: 'ts-ignore',
  description: `ts-ignore`,
  patterns: [/\/\/\s*(@ts-ignore)/g],
  category: 'typescript',
})

const tsExpectErrorProvider = defineMagicComment({
  name: 'ts-expect-error',
  description: `ts-expect-error`,
  patterns: [/\/\/\s*(@ts-expect-error)/g],
  category: 'typescript',
})

// @keep-sorted
export const typescriptProviders = [
  tsCheckProvider,
  tsExpectErrorProvider,
  tsIgnoreProvider,
  tsNocheckProvider,
]
