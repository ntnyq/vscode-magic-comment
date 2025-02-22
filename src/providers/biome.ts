/**
 * @file biome
 *
 * @example
 *
 * ```md
 * - biome-ignore
 * ```
 *
 * @see https://github.com/biomejs/biome/pull/4649
 */

import { defineMagicComment } from '../utils/define'

const biomeIgnoreProvider = defineMagicComment({
  name: 'biome-ignore',
  description: `biome-ignore`,
  url: 'https://biomejs.dev/linter/#ignore-code',
  patterns: [
    // // biome-ignore
    /\/\/\s*(biome-ignore)/g,
  ],
  category: 'biome',
})

// @keep-sorted
export const biomeProviders = [biomeIgnoreProvider]
