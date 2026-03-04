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

import { createCommentPatterns, defineMagicComment } from '../utils/define'

const tsCheckProvider = defineMagicComment({
  name: 'ts-check',
  description: `ts-check`,
  url: 'https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html#ts-check',
  patterns: createCommentPatterns('@ts-check', { types: ['line'] }),
  category: 'typescript',
})

const tsNocheckProvider = defineMagicComment({
  name: 'ts-nocheck',
  description: `ts-nocheck`,
  patterns: createCommentPatterns('@ts-nocheck', { types: ['line'] }),
  category: 'typescript',
})

const tsIgnoreProvider = defineMagicComment({
  name: 'ts-ignore',
  description: `ts-ignore`,
  patterns: createCommentPatterns('@ts-ignore', { types: ['line'] }),
  category: 'typescript',
})

const tsExpectErrorProvider = defineMagicComment({
  name: 'ts-expect-error',
  description: `ts-expect-error`,
  patterns: createCommentPatterns('@ts-expect-error', { types: ['line'] }),
  category: 'typescript',
})

// @keep-sorted
export const typescriptProviders = [
  tsCheckProvider,
  tsExpectErrorProvider,
  tsIgnoreProvider,
  tsNocheckProvider,
]
