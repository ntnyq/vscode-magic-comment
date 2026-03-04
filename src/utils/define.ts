import type { MagicComment } from '../types'
import { escapeRegExp } from './escapeRegExp'

export type CommentType = 'line' | 'block' | 'html' | 'hash'

export interface CreateCommentPatternsOptions {
  /**
   * Comment types to generate patterns for.
   */
  types: CommentType[]

  /**
   * Allow trailing content after the token before the comment closer.
   * - `true` or `'line'` — allow same-line trailing content: `[^\n]*?`
   * - `'multiline'` — allow multiline trailing content: `[\s\S]*?`
   */
  trailing?: boolean | 'line' | 'multiline'
}

/**
 * Generate consistent regex patterns for a magic comment token across
 * specified comment types.
 *
 * The token is captured in group 1 (same as the existing convention).
 *
 * @param token - The magic comment token to match (captured in group 1)
 * @param options - Comment types and trailing content options
 * @returns Array of RegExp patterns with `g` flag
 */
export function createCommentPatterns(
  token: string,
  options: CreateCommentPatternsOptions,
): RegExp[] {
  const { types, trailing = false } = options
  const escaped = escapeRegExp(token)

  let trailingPattern = ''
  if (trailing === 'multiline') {
    trailingPattern = '[\\s\\S]*?'
  } else if (trailing) {
    trailingPattern = '[^\\n]*?'
  }

  const patterns: RegExp[] = []

  for (const type of types) {
    switch (type) {
      case 'line':
        // // token
        patterns.push(new RegExp(`//\\s*(${escaped})`, 'g'))
        break
      case 'block':
        // /* token */
        patterns.push(
          new RegExp(`/\\*\\s*(${escaped})${trailingPattern}\\s*\\*/`, 'g'),
        )
        break
      case 'html':
        // <!-- token -->
        patterns.push(
          new RegExp(`<!--\\s*(${escaped})${trailingPattern}\\s*-->`, 'g'),
        )
        break
      case 'hash':
        // # token
        patterns.push(new RegExp(`#\\s*(${escaped})`, 'g'))
        break
      default:
        break
    }
  }

  return patterns
}

export function defineMagicComment(magicComment: MagicComment) {
  return magicComment
}
