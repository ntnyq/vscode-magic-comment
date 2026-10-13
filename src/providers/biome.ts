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

import { defineMagicComment } from '../core'

const biomeIgnoreProvider = defineMagicComment({
  name: 'biome-ignore',
  description: `biome-ignore`,
  url: 'https://biomejs.dev/linter/#ignore-code',
  patterns: [
    {
      kind: 'token',
      tokens: ['biome-ignore'],
      syntax: ['line', 'block'],
      trailing: 'line',
    },
  ],
  category: 'biome',
})

const biomeIgnoreAllProvider = defineMagicComment({
  name: 'biome-ignore-all',
  description: `biome-ignore-all`,
  url: 'https://biomejs.dev/linter/#ignore-code',
  patterns: [
    {
      kind: 'token',
      tokens: ['biome-ignore-all'],
      syntax: ['line', 'block'],
      trailing: 'line',
    },
  ],
  category: 'biome',
})

// @keep-sorted
export const biomeProviders = [biomeIgnoreAllProvider, biomeIgnoreProvider]
