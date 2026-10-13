/**
 * @file cspell
 *
 * @see {@link https://github.com/streetsidesoftware/vscode-spell-checker#enable--disable-checking-sections-of-code}
 *
 * @example
 *
 * ```md
 * - cSpell:enable
 * - cSpell:disable
 * - cSpell:disable-line
 * - cSpell:disable-next-line
 * - spellchecker:enable
 * - spellchecker:disable
 * - spell-checker:enable
 * - spell-checker:disable
 * ```
 */

import { defineMagicComment } from '../core'

const cSpellEnableProvider = defineMagicComment({
  name: 'cspell-enable',
  description: `cspell-enable`,
  patterns: [
    {
      kind: 'token',
      tokens: ['cSpell:enable'],
      syntax: ['line', 'hash'],
      trailing: 'line',
    },
    { kind: 'token', tokens: ['cSpell:enable'], syntax: ['block', 'html'] },
  ],
  category: 'cspell',
})

const cSpellDisableProvider = defineMagicComment({
  name: 'cspell-disable',
  description: `cspell-disable`,
  patterns: [
    {
      kind: 'token',
      tokens: ['cSpell:disable'],
      syntax: ['line', 'hash'],
      trailing: 'line',
    },
    { kind: 'token', tokens: ['cSpell:disable'], syntax: ['block', 'html'] },
  ],
  category: 'cspell',
})

const cSpellDisableLineProvider = defineMagicComment({
  name: 'cspell-disable-line',
  description: `cspell-disable-line`,
  patterns: [
    {
      kind: 'token',
      tokens: ['cSpell:disable-line'],
      syntax: ['line'],
      trailing: 'line',
    },
  ],
  category: 'cspell',
})

const cSpellDisableNextLineProvider = defineMagicComment({
  name: 'cspell-disable-next-line',
  description: `cspell-disable-next-line`,
  patterns: [
    {
      kind: 'token',
      tokens: ['cSpell:disable-next-line'],
      syntax: ['line'],
      trailing: 'line',
    },
  ],
  category: 'cspell',
})

const spellCheckerEnableProvider = defineMagicComment({
  name: 'cspell-checker-enable',
  description: `cspell-checker-enable`,
  patterns: [
    {
      kind: 'token',
      tokens: ['spell-checker:enable'],
      syntax: ['line', 'hash'],
      trailing: 'line',
    },
    {
      kind: 'token',
      tokens: ['spell-checker:enable'],
      syntax: ['block', 'html'],
    },
    {
      kind: 'token',
      tokens: ['spellchecker:enable'],
      syntax: ['line', 'hash'],
      trailing: 'line',
    },
    {
      kind: 'token',
      tokens: ['spellchecker:enable'],
      syntax: ['block', 'html'],
    },
  ],
  category: 'cspell',
})

const spellCheckerDisableProvider = defineMagicComment({
  name: 'cspell-checker-disable',
  description: `cspell-checker-disable`,
  patterns: [
    {
      kind: 'token',
      tokens: ['spell-checker:disable'],
      syntax: ['line', 'hash'],
      trailing: 'line',
    },
    {
      kind: 'token',
      tokens: ['spell-checker:disable'],
      syntax: ['block', 'html'],
    },
    {
      kind: 'token',
      tokens: ['spellchecker:disable'],
      syntax: ['line', 'hash'],
      trailing: 'line',
    },
    {
      kind: 'token',
      tokens: ['spellchecker:disable'],
      syntax: ['block', 'html'],
    },
  ],
  category: 'cspell',
})

// @keep-sorted
export const cSpellProviders = [
  cSpellDisableLineProvider,
  cSpellDisableNextLineProvider,
  cSpellDisableProvider,
  cSpellEnableProvider,
  spellCheckerDisableProvider,
  spellCheckerEnableProvider,
]
