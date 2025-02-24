/**
 * @file autoprefixer
 *
 * @example
 *
 * ```md
 * - \/* autoprefixer: on *\/
 * - \/* autoprefixer: off *\/
 * - \/* autoprefixer: ignore next *\/
 * - \/* autoprefixer: grid: autoplace|no-autoplace|off *\/
 * ```
 */

import { defineMagicComment } from '../utils/define'

const autoprefixerOnProvider = defineMagicComment({
  name: 'autoprefixer-on',
  description: `autoprefixer-on`,
  patterns: [
    // /* autoprefixer: on */
    /\/\*\s(autoprefixer:\son)\s\*\//g,
  ],
  url: `https://github.com/postcss/autoprefixer#control-comments`,
  category: 'autoprefixer',
})

const autoprefixerOffProvider = defineMagicComment({
  name: 'autoprefixer-off',
  description: `autoprefixer-off`,
  patterns: [
    // /* autoprefixer: off */
    /\/\*\s(autoprefixer:\soff)\s\*\//g,
  ],
  url: `https://github.com/postcss/autoprefixer#control-comments`,
  category: 'autoprefixer',
})

const autoprefixerIgnoreNextProvider = defineMagicComment({
  name: 'autoprefixer-ignore-next',
  description: `autoprefixer-ignore-next`,
  patterns: [
    // /* autoprefixer: ignore next */
    /\/\*\s(autoprefixer:\signore\snext)\s\*\//g,
  ],
  url: `https://github.com/postcss/autoprefixer#control-comments`,
  category: 'autoprefixer',
})

// @keep-sorted
export const autoprefixerProviders = [
  autoprefixerIgnoreNextProvider,
  autoprefixerOffProvider,
  autoprefixerOnProvider,
]
