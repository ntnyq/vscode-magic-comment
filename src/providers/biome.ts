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
  pattern: /\/\*\s*@biome-ignore\s/,
  category: 'biome',
  languages: ['javascript', 'typescript', 'javascriptreact', 'typescriptreact'],
})

// @keep-sorted
export const biomeProviders = [biomeIgnoreProvider]
