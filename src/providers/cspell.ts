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
import type { RegexPattern } from '../core'

/**
 * CSpell directives are case-insensitive and allow spaces after the colon.
 * Capture the original spelling and spacing for accurate decoration ranges.
 */
function createCSpellPatterns(
  prefix: string,
  directive: string,
): RegexPattern[] {
  const capture = `(${prefix}:[\\t ]*${directive})(?=$|\\s|[:=]|\\*/|-->)`
  return [
    { kind: 'regex', source: `(?://|#)[\\t ]*${capture}`, flags: 'i' },
    { kind: 'regex', source: `/\\*\\s*${capture}\\s*\\*/`, flags: 'i' },
    { kind: 'regex', source: `<!--\\s*${capture}\\s*-->`, flags: 'i' },
  ]
}

const cSpellEnableProvider = defineMagicComment({
  name: 'cspell-enable',
  description: `cspell-enable`,
  patterns: createCSpellPatterns('cspell', 'enable'),
  category: 'cspell',
})

const cSpellDisableProvider = defineMagicComment({
  name: 'cspell-disable',
  description: `cspell-disable`,
  patterns: createCSpellPatterns('cspell', 'disable'),
  category: 'cspell',
})

const cSpellDisableLineProvider = defineMagicComment({
  name: 'cspell-disable-line',
  description: `cspell-disable-line`,
  patterns: createCSpellPatterns('cspell', 'disable-line'),
  category: 'cspell',
})

const cSpellDisableNextLineProvider = defineMagicComment({
  name: 'cspell-disable-next-line',
  description: `cspell-disable-next-line`,
  patterns: createCSpellPatterns('cspell', 'disable-next-line'),
  category: 'cspell',
})

const spellCheckerEnableProvider = defineMagicComment({
  name: 'cspell-checker-enable',
  description: `cspell-checker-enable`,
  patterns: createCSpellPatterns('spell-?checker', 'enable'),
  category: 'cspell',
})

const spellCheckerDisableProvider = defineMagicComment({
  name: 'cspell-checker-disable',
  description: `cspell-checker-disable`,
  patterns: createCSpellPatterns('spell-?checker', 'disable'),
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
