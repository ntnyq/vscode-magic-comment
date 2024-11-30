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

const sharedLanguages = ['javascript', 'typescript', 'javascriptreact', 'typescriptreact']

const tsCheckProvider = defineMagicComment({
  name: 'ts-check',
  description: `ts-check`,
  url: 'https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html#ts-check',
  pattern: /\/\*\s*@ts-check\s/,
  category: 'typescript',
  languages: sharedLanguages,
})

const tsNocheckProvider = defineMagicComment({
  name: 'ts-nocheck',
  description: `ts-nocheck`,
  pattern: /\/\*\s*@ts-nocheck\s/,
  category: 'typescript',
  languages: sharedLanguages,
})

const tsIgnoreProvider = defineMagicComment({
  name: 'ts-ignore',
  description: `ts-ignore`,
  pattern: /\/\*\s*@ts-ignore\s/,
  category: 'typescript',
  languages: sharedLanguages,
})

const tsExpectErrorProvider = defineMagicComment({
  name: 'ts-expect-error',
  description: `ts-expect-error`,
  pattern: /\/\*\s*@ts-expect-error\s/,
  category: 'typescript',
  languages: sharedLanguages,
})

// @keep-sorted
export const typescriptProviders = [
  tsCheckProvider,
  tsExpectErrorProvider,
  tsIgnoreProvider,
  tsNocheckProvider,
]
