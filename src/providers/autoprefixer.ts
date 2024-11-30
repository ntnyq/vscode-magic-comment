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
  pattern: /\/\*\s*autoprefixer-on\s/,
  url: `https://github.com/postcss/autoprefixer#control-comments`,
  category: 'autoprefixer',
  languages: ['css', 'scss', 'stylus', 'postcss', 'less'],
})

// @keep-sorted
export const autoprefixerProviders = [autoprefixerOnProvider]
