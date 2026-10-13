import type { MagicComment, MagicCommentPattern } from './types'

export function defineMagicComment(definition: MagicComment): MagicComment {
  return definition
}

export function isRecord(input: unknown): input is Record<string, unknown> {
  return typeof input === 'object' && input !== null && !Array.isArray(input)
}

export function isStringArray(input: unknown): input is string[] {
  return Array.isArray(input) && input.every(item => typeof item === 'string')
}

/**
 * Validate declarations before compiling settings supplied by the user.
 */
export function isMagicCommentPattern(
  input: unknown,
): input is MagicCommentPattern {
  if (!isRecord(input)) {
    return false
  }
  if (input.kind === 'regex') {
    return (
      typeof input.source === 'string'
      && (typeof input.flags === 'undefined' || typeof input.flags === 'string')
      && (typeof input.scope === 'undefined' || input.scope === 'block')
      && (typeof input.capture === 'undefined'
        || (typeof input.capture === 'number'
          && Number.isSafeInteger(input.capture)
          && input.capture >= 0))
    )
  }
  return (
    input.kind === 'token'
    && isStringArray(input.tokens)
    && input.tokens.length > 0
    && input.tokens.every(token => token.length > 0)
    && isStringArray(input.syntax)
    && input.syntax.length > 0
    && input.syntax.every(syntax =>
      ['line', 'block', 'html', 'hash'].includes(syntax),
    )
    && (typeof input.trailing === 'undefined'
      || (typeof input.trailing === 'string'
        && ['none', 'line', 'multiline'].includes(input.trailing)))
  )
}
