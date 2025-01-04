/**
 * @file autoprefixer
 *
 * @example
 *
 * ```md
 * - \/* autoprefixer: on *\/
 * - \/* autoprefixer: off *\/
 * - \/* autoprefixer: ignore next *\/
 * - \/* autoprefixer: autoplace|no-autoplace|off *\/
 * ```
 */

import { defineMagicComment } from '../utils/define'

const autoprefixerOnProvider = defineMagicComment({
  name: 'autoprefixer-on',
  description: `autoprefixer-on`,
  patterns: /\/\*\s*autoprefixer-on\s/,
  url: `https://github.com/postcss/autoprefixer#control-comments`,
  category: 'autoprefixer',
})

// @keep-sorted
export const autoprefixerProviders = [autoprefixerOnProvider]
