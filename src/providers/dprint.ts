/**
 * @file dprint
 *
 * @see {@link https://dprint.dev/}
 *
 * @example
 *
 * ```md
 * - dprint-ignore
 * - dprint-ignore-file
 * ```
 */

import { defineMagicComment } from '../utils/define'

const dprintIgnoreProvider = defineMagicComment({
  name: 'dprint-ignore',
  description: `dprint-ignore`,
  patterns: [
    // // dprint-ignore
    // /\/\/\s*(dprint-ignore)/g,
    // /* dprint-ignore */
    /\/\*\s*(dprint-ignore)\s*\*\//g,
    // <!-- dprint-ignore -->
    /<!--\s*(dprint-ignore)\s*-->/g,
  ],
  category: 'dprint',
})

const dprintIgnoreFileProvider = defineMagicComment({
  name: 'dprint-ignore-file',
  description: `dprint-ignore-file`,
  patterns: [
    // // dprint-ignore-file
    /\/\/\s*(dprint-ignore-file)/g,
  ],
  category: 'dprint',
})

const dprintIgnoreStartProvider = defineMagicComment({
  name: 'dprint-ignore-start',
  description: `dprint-ignore-start`,
  patterns: [
    // <!-- dprint-ignore-start -->
    /<!--\s*(dprint-ignore-start)\s*-->/g,
  ],
  category: 'dprint',
})

const dprintIgnoreEndProvider = defineMagicComment({
  name: 'dprint-ignore-end',
  description: `dprint-ignore-end`,
  patterns: [
    // <!-- dprint-ignore-end -->
    /<!--\s*(dprint-ignore-end)\s*-->/g,
  ],
  category: 'dprint',
})

// @keep-sorted
export const dprintProviders = [
  dprintIgnoreEndProvider,
  dprintIgnoreFileProvider,
  dprintIgnoreProvider,
  dprintIgnoreStartProvider,
]
