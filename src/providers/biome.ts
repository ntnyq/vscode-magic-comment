/**
 * @file biome
 *
 * @see {@link https://biomejs.dev/linter/#ignore-code}
 *
 * @example
 *
 * ```md
 * - biome-ignore
 * - biome-ignore-all
 * ```
 */

import { createCommentPatterns, defineMagicComment } from '../utils/define'

const biomeIgnoreProvider = defineMagicComment({
  name: 'biome-ignore',
  description: `biome-ignore`,
  url: 'https://biomejs.dev/linter/#ignore-code',
  patterns: createCommentPatterns('biome-ignore', {
    types: ['line', 'block'],
    trailing: true,
  }),
  category: 'biome',
})

const biomeIgnoreAllProvider = defineMagicComment({
  name: 'biome-ignore-all',
  description: `biome-ignore-all`,
  url: 'https://biomejs.dev/linter/#ignore-code',
  patterns: createCommentPatterns('biome-ignore-all', {
    types: ['line', 'block'],
  }),
  category: 'biome',
})

// @keep-sorted
export const biomeProviders = [biomeIgnoreAllProvider, biomeIgnoreProvider]
