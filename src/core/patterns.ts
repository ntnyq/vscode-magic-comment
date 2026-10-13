import type { TokenPattern } from './types'

function escapeRegExp(token: string): string {
  return token.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')
}

/**
 * Compile literal tokens with group 1 as the decoration range.
 * Trailing text never crosses a closing comment delimiter.
 */
export function createCommentPatterns(pattern: TokenPattern): RegExp[] {
  const tokens = [...pattern.tokens]
    .sort((left, right) => right.length - left.length)
    .map(escapeRegExp)
    .join('|')
  const capture = `(${tokens})(?=$|\\s|[:=]|\\*/|-->)`
  const trailing = pattern.trailing ?? 'none'

  return pattern.syntax.map(syntax => {
    if (syntax === 'line' || syntax === 'hash') {
      const opener = syntax === 'line' ? '//' : '#'
      const end = trailing === 'none' ? '[\\t ]*(?=\\r?$)' : ''
      return new RegExp(`${opener}[\\t ]*${capture}${end}`, 'dgmu')
    }

    const opener = syntax === 'block' ? '/\\*' : '<!--'
    const closer = syntax === 'block' ? '\\*/' : '-->'
    const content = trailing === 'multiline' ? '[\\s\\S]' : '[^\\r\\n]'
    // Trailing content already includes whitespace. A second repetition would
    // backtrack quadratically when a closing delimiter is missing.
    const suffix =
      trailing === 'none' ? '\\s*' : `(?:(?!${closer})${content})*?`
    return new RegExp(`${opener}\\s*${capture}${suffix}${closer}`, 'dgu')
  })
}
