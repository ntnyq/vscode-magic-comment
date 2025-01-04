/**
 * @file biome
 *
 * @example
 *
 * ```md
 * - @biome-ignore
 * ```
 */

import { defineMagicComment } from '../utils/define'

const biomeIgnoreProvider = defineMagicComment({
  name: 'biome-ignore',
  description: `biome-ignore`,
  patterns: /\/\*\s*@biome-ignore\s/,
  category: 'biome',
})

// @keep-sorted
export const biomeProviders = [biomeIgnoreProvider]
