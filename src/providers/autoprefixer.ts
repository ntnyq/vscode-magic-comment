/**
 * @file autoprefixer
 *
 * @see {@link https://github.com/postcss/autoprefixer#control-comments}
 *
 * @example
 *
 * ```md
 * - /* autoprefixer: on *\/
 * - /* autoprefixer: off *\/
 * - /* autoprefixer: ignore next *\/
 * - /* autoprefixer grid: autoplace *\/
 * - /* autoprefixer grid: no-autoplace *\/
 * - /* autoprefixer grid: off *\/
 * ```
 */

import { createCommentPatterns, defineMagicComment } from '../utils/define'

const autoprefixerOnProvider = defineMagicComment({
  name: 'autoprefixer-on',
  description: `autoprefixer-on`,
  patterns: createCommentPatterns('autoprefixer: on', { types: ['block'] }),
  url: `https://github.com/postcss/autoprefixer#control-comments`,
  category: 'autoprefixer',
})

const autoprefixerOffProvider = defineMagicComment({
  name: 'autoprefixer-off',
  description: `autoprefixer-off`,
  patterns: createCommentPatterns('autoprefixer: off', { types: ['block'] }),
  url: `https://github.com/postcss/autoprefixer#control-comments`,
  category: 'autoprefixer',
})

const autoprefixerIgnoreNextProvider = defineMagicComment({
  name: 'autoprefixer-ignore-next',
  description: `autoprefixer-ignore-next`,
  patterns: createCommentPatterns('autoprefixer: ignore next', {
    types: ['block'],
  }),
  url: `https://github.com/postcss/autoprefixer#control-comments`,
  category: 'autoprefixer',
})

const autoprefixerGridAutoplaceProvider = defineMagicComment({
  name: 'autoprefixer-grid-autoplace',
  description: `autoprefixer-grid-autoplace`,
  patterns: createCommentPatterns('autoprefixer grid: autoplace', {
    types: ['block'],
  }),
  url: `https://github.com/postcss/autoprefixer#control-comments`,
  category: 'autoprefixer',
})

const autoprefixerGridNoAutoplaceProvider = defineMagicComment({
  name: 'autoprefixer-grid-no-autoplace',
  description: `autoprefixer-grid-no-autoplace`,
  patterns: createCommentPatterns('autoprefixer grid: no-autoplace', {
    types: ['block'],
  }),
  url: `https://github.com/postcss/autoprefixer#control-comments`,
  category: 'autoprefixer',
})

const autoprefixerGridOffProvider = defineMagicComment({
  name: 'autoprefixer-grid-off',
  description: `autoprefixer-grid-off`,
  patterns: createCommentPatterns('autoprefixer grid: off', {
    types: ['block'],
  }),
  url: `https://github.com/postcss/autoprefixer#control-comments`,
  category: 'autoprefixer',
})

// @keep-sorted
export const autoprefixerProviders = [
  autoprefixerGridAutoplaceProvider,
  autoprefixerGridNoAutoplaceProvider,
  autoprefixerGridOffProvider,
  autoprefixerIgnoreNextProvider,
  autoprefixerOffProvider,
  autoprefixerOnProvider,
]
