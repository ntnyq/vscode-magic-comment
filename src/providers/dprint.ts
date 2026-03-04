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
 * - dprint-ignore-start
 * - dprint-ignore-end
 * ```
 */

import { createCommentPatterns, defineMagicComment } from '../utils/define'

const dprintIgnoreProvider = defineMagicComment({
  name: 'dprint-ignore',
  description: `dprint-ignore`,
  patterns: createCommentPatterns('dprint-ignore', {
    types: ['line', 'block', 'html'],
  }),
  category: 'dprint',
})

const dprintIgnoreFileProvider = defineMagicComment({
  name: 'dprint-ignore-file',
  description: `dprint-ignore-file`,
  patterns: createCommentPatterns('dprint-ignore-file', {
    types: ['line'],
  }),
  category: 'dprint',
})

const dprintIgnoreStartProvider = defineMagicComment({
  name: 'dprint-ignore-start',
  description: `dprint-ignore-start`,
  patterns: createCommentPatterns('dprint-ignore-start', {
    types: ['html'],
  }),
  category: 'dprint',
})

const dprintIgnoreEndProvider = defineMagicComment({
  name: 'dprint-ignore-end',
  description: `dprint-ignore-end`,
  patterns: createCommentPatterns('dprint-ignore-end', {
    types: ['html'],
  }),
  category: 'dprint',
})

// @keep-sorted
export const dprintProviders = [
  dprintIgnoreEndProvider,
  dprintIgnoreFileProvider,
  dprintIgnoreProvider,
  dprintIgnoreStartProvider,
]
