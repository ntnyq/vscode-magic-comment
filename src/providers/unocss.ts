/**
 * @file unocss
 *
 * @see {@link https://unocss.dev/guide/extracting}
 *
 * @example
 *
 * ```md
 * - @unocss-include
 * - @unocss-ignore
 * - @unocss-skip-start
 * - @unocss-skip-end
 * ```
 */

import { defineMagicComment } from '../core'

const unocssIncludeProvider = defineMagicComment({
  name: 'unocss-include',
  description: `unocss-include`,
  url: 'https://unocss.dev/guide/extracting',
  patterns: [
    {
      kind: 'token',
      tokens: ['@unocss-include'],
      syntax: ['line'],
      trailing: 'line',
    },
    { kind: 'token', tokens: ['@unocss-include'], syntax: ['block'] },
  ],
  category: 'unocss',
})

const unocssIgnoreProvider = defineMagicComment({
  name: 'unocss-ignore',
  description: `unocss-ignore`,
  url: 'https://unocss.dev/guide/extracting',
  patterns: [
    {
      kind: 'token',
      tokens: ['@unocss-ignore'],
      syntax: ['line'],
      trailing: 'line',
    },
    { kind: 'token', tokens: ['@unocss-ignore'], syntax: ['block'] },
  ],
  category: 'unocss',
})

const unocssSkipStartProvider = defineMagicComment({
  name: 'unocss-skip-start',
  description: `unocss-skip-start`,
  url: 'https://unocss.dev/guide/extracting',
  patterns: [
    {
      kind: 'token',
      tokens: ['@unocss-skip-start'],
      syntax: ['line'],
      trailing: 'line',
    },
    { kind: 'token', tokens: ['@unocss-skip-start'], syntax: ['block'] },
  ],
  category: 'unocss',
})

const unocssSkipEndProvider = defineMagicComment({
  name: 'unocss-skip-end',
  description: `unocss-skip-end`,
  url: 'https://unocss.dev/guide/extracting',
  patterns: [
    {
      kind: 'token',
      tokens: ['@unocss-skip-end'],
      syntax: ['line'],
      trailing: 'line',
    },
    { kind: 'token', tokens: ['@unocss-skip-end'], syntax: ['block'] },
  ],
  category: 'unocss',
})

// @keep-sorted
export const unocssProviders = [
  unocssIncludeProvider,
  unocssIgnoreProvider,
  unocssSkipEndProvider,
  unocssSkipStartProvider,
]
