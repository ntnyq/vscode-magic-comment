/**
 * @file cspell
 *
 * @see {@link https://github.com/streetsidesoftware/vscode-spell-checker#enable--disable-checking-sections-of-code}
 *
 * @example
 *
 * ```md
 * - cSpell:enable
 * - spellchecker:enable
 * - spell-checker:enable
 *
 * - cSpell:disable
 * - spellchecker:disable
 * - spell-checker:disable
 * - cSpell:disable-line
 * - cSpell:disable-next-line
 * ```
 */

import { defineMagicComment } from '../utils/define'

const cSpellEnableProvider = defineMagicComment({
  name: 'cspell-enable',
  description: `cspell-enable`,
  patterns: [
    // // cSpell:enable
    /\/\/\s*(cSpell:enable)/g,
    // /* cSpell:enable */
    /\/\*\s*(cSpell:enable)\s*\*\//g,
    // <!-- cSpell:enable -->
    /<!--\s(cSpell:enable)[\s\S]*?\s-->/g,
  ],
  category: 'cspell',
})

const spellCheckerEnableProvider = defineMagicComment({
  name: 'cspell-checker-enable',
  description: `cspell-checker-enable`,
  patterns: [
    // // spell-checker:enable
    /\/\/\s*(spell-checker:enable)/g,
    // /* spell-checker:enable */
    /\/\*\s*(spell-checker:enable)\s*\*\//g,

    // // spellchecker:enable
    /\/\/\s*(spellchecker:enable)/g,
    // /* spellchecker:enable */
    /\/\*\s*(spellchecker:enable)\s*\*\//g,
  ],
  category: 'cspell',
})

const cSpellDisableProvider = defineMagicComment({
  name: 'cspell-disable',
  description: `cspell-disable`,
  patterns: [
    // // cSpell:disable
    /\/\/\s*(cSpell:disable)/g,
    // /* cSpell:disable */
    /\/\*\s*(cSpell:disable)\s*\*\//g,
    // <!-- cSpell:disable -->
    /<!--\s(cSpell:disable)[\s\S]*?\s-->/g,
  ],
  category: 'cspell',
})

const spellCheckerDisableProvider = defineMagicComment({
  name: 'cspell-checker-disable',
  description: `cspell-checker-disable`,
  patterns: [
    // // spell-checker:disable
    /\/\/\s*(spell-checker:disable)/g,
    // /* spell-checker:disable */
    /\/\*\s*(spell-checker:disable)\s*\*\//g,

    // // spellchecker:disable
    /\/\/\s*(spellchecker:disable)/g,
    // /* spellchecker:disable */
    /\/\*\s*(spellchecker:disable)\s*\*\//g,
  ],
  category: 'cspell',
})

const cSpellDisableLineProvider = defineMagicComment({
  name: 'cspell-disable-line',
  description: `cspell-disable-line`,
  patterns: [
    // // cSpell:disable-line
    /\/\/\s*(cSpell: disable-line)/g,
  ],
  category: 'cspell',
})

const cSpellDisableNextLineProvider = defineMagicComment({
  name: 'cspell-disable-next-line',
  description: `cspell-disable-next-line`,
  patterns: [
    // // cSpell:disable-next-line
    /\/\/\s*(cSpell: disable-next-line)/g,
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
