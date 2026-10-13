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

import { defineMagicComment } from '../core'

const dprintIgnoreProvider = defineMagicComment({
  name: 'dprint-ignore',
  description: `dprint-ignore`,
  patterns: [
    {
      kind: 'token',
      tokens: ['dprint-ignore'],
      syntax: ['line'],
      trailing: 'line',
    },
    { kind: 'token', tokens: ['dprint-ignore'], syntax: ['block', 'html'] },
  ],
  category: 'dprint',
})

const dprintIgnoreFileProvider = defineMagicComment({
  name: 'dprint-ignore-file',
  description: `dprint-ignore-file`,
  patterns: [
    {
      kind: 'token',
      tokens: ['dprint-ignore-file'],
      syntax: ['line'],
      trailing: 'line',
    },
  ],
  category: 'dprint',
})

const dprintIgnoreStartProvider = defineMagicComment({
  name: 'dprint-ignore-start',
  description: `dprint-ignore-start`,
  patterns: [
    { kind: 'token', tokens: ['dprint-ignore-start'], syntax: ['html'] },
  ],
  category: 'dprint',
})

const dprintIgnoreEndProvider = defineMagicComment({
  name: 'dprint-ignore-end',
  description: `dprint-ignore-end`,
  patterns: [
    { kind: 'token', tokens: ['dprint-ignore-end'], syntax: ['html'] },
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
