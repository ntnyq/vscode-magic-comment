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

import { createCommentPatterns, defineMagicComment } from '../utils/define'

const cSpellEnableProvider = defineMagicComment({
  name: 'cspell-enable',
  description: `cspell-enable`,
  patterns: createCommentPatterns('cSpell:enable', {
    types: ['line', 'block', 'html', 'hash'],
  }),
  category: 'cspell',
}),

 cSpellDisableProvider = defineMagicComment({
  name: 'cspell-disable',
  description: `cspell-disable`,
  patterns: createCommentPatterns('cSpell:disable', {
    types: ['line', 'block', 'html', 'hash'],
  }),
  category: 'cspell',
}),

 cSpellDisableLineProvider = defineMagicComment({
  name: 'cspell-disable-line',
  description: `cspell-disable-line`,
  patterns: createCommentPatterns('cSpell:disable-line', {
    types: ['line'],
  }),
  category: 'cspell',
}),

 cSpellDisableNextLineProvider = defineMagicComment({
  name: 'cspell-disable-next-line',
  description: `cspell-disable-next-line`,
  patterns: createCommentPatterns('cSpell:disable-next-line', {
    types: ['line'],
  }),
  category: 'cspell',
}),

 spellCheckerEnableProvider = defineMagicComment({
  name: 'cspell-checker-enable',
  description: `cspell-checker-enable`,
  patterns: [
    ...createCommentPatterns('spell-checker:enable', {
      types: ['line', 'block', 'html', 'hash'],
    }),
    ...createCommentPatterns('spellchecker:enable', {
      types: ['line', 'block', 'html', 'hash'],
    }),
  ],
  category: 'cspell',
}),

 spellCheckerDisableProvider = defineMagicComment({
  name: 'cspell-checker-disable',
  description: `cspell-checker-disable`,
  patterns: [
    ...createCommentPatterns('spell-checker:disable', {
      types: ['line', 'block', 'html', 'hash'],
    }),
    ...createCommentPatterns('spellchecker:disable', {
      types: ['line', 'block', 'html', 'hash'],
    }),
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
