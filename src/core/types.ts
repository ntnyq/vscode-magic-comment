export type CommentSyntax = 'line' | 'block' | 'html' | 'hash'

export interface TokenPattern {
  kind: 'token'
  tokens: readonly string[]
  syntax: readonly CommentSyntax[]
  trailing?: 'none' | 'line' | 'multiline'
}

export interface RegexPattern {
  kind: 'regex'
  source: string
  flags?: string
  /**
   * Capture to decorate, defaulting to group 1. Use 0 for the whole match.
   */
  capture?: number
}

export type MagicCommentPattern = TokenPattern | RegexPattern

export interface MagicCommentInfo {
  name: string
  category?: string
  description?: string
  url?: string
}

export interface MagicComment extends MagicCommentInfo {
  patterns: readonly MagicCommentPattern[]
}

export interface MagicCommentMatch {
  comment: MagicCommentInfo
  /**
   * Inclusive UTF-16 offset in the scanned text.
   */
  start: number
  /**
   * Exclusive UTF-16 offset in the scanned text.
   */
  end: number
}

export interface RuleIssue {
  name: string
  patternIndex?: number
  code:
    | 'invalid-rule'
    | 'duplicate-name'
    | 'invalid-regex'
    | 'invalid-capture'
    | 'empty-match'
  message: string
}

export interface ScanResult {
  matches: readonly MagicCommentMatch[]
  issues: readonly RuleIssue[]
}

export interface MagicCommentEngine {
  readonly issues: readonly RuleIssue[]
  scan(text: string): ScanResult
}
