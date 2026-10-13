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

import { defineMagicComment } from '../core'

const autoprefixerOnProvider = defineMagicComment({
  name: 'autoprefixer-on',
  description: `autoprefixer-on`,
  patterns: [
    { kind: 'token', tokens: ['autoprefixer: on'], syntax: ['block'] },
  ],
  url: `https://github.com/postcss/autoprefixer#control-comments`,
  category: 'autoprefixer',
})

const autoprefixerOffProvider = defineMagicComment({
  name: 'autoprefixer-off',
  description: `autoprefixer-off`,
  patterns: [
    { kind: 'token', tokens: ['autoprefixer: off'], syntax: ['block'] },
  ],
  url: `https://github.com/postcss/autoprefixer#control-comments`,
  category: 'autoprefixer',
})

const autoprefixerIgnoreNextProvider = defineMagicComment({
  name: 'autoprefixer-ignore-next',
  description: `autoprefixer-ignore-next`,
  patterns: [
    { kind: 'token', tokens: ['autoprefixer: ignore next'], syntax: ['block'] },
  ],
  url: `https://github.com/postcss/autoprefixer#control-comments`,
  category: 'autoprefixer',
})

const autoprefixerGridAutoplaceProvider = defineMagicComment({
  name: 'autoprefixer-grid-autoplace',
  description: `autoprefixer-grid-autoplace`,
  patterns: [
    {
      kind: 'token',
      tokens: ['autoprefixer grid: autoplace'],
      syntax: ['block'],
    },
  ],
  url: `https://github.com/postcss/autoprefixer#control-comments`,
  category: 'autoprefixer',
})

const autoprefixerGridNoAutoplaceProvider = defineMagicComment({
  name: 'autoprefixer-grid-no-autoplace',
  description: `autoprefixer-grid-no-autoplace`,
  patterns: [
    {
      kind: 'token',
      tokens: ['autoprefixer grid: no-autoplace'],
      syntax: ['block'],
    },
  ],
  url: `https://github.com/postcss/autoprefixer#control-comments`,
  category: 'autoprefixer',
})

const autoprefixerGridOffProvider = defineMagicComment({
  name: 'autoprefixer-grid-off',
  description: `autoprefixer-grid-off`,
  patterns: [
    { kind: 'token', tokens: ['autoprefixer grid: off'], syntax: ['block'] },
  ],
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
