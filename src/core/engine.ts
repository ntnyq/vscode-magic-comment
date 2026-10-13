import { compileRules } from './compile'
import type {
  MagicComment,
  MagicCommentEngine,
  MagicCommentMatch,
  RuleIssue,
} from './types'

/**
 * Scan synchronously using UTF-16 offsets, without retaining document text.
 */
export function createMagicCommentEngine(
  rules: readonly MagicComment[],
): MagicCommentEngine {
  const compiled = compileRules(rules)

  return {
    issues: compiled.issues,
    scan(text) {
      const matches: MagicCommentMatch[] = []
      const issues: RuleIssue[] = []
      const seenMatches = new Set<string>()
      const seenIssues = new Set<string>()

      for (const {
        comment,
        regexp,
        capture,
        patternIndex,
      } of compiled.patterns) {
        // matchAll owns its cursor and advances even for empty Unicode matches.
        for (const match of text.matchAll(regexp)) {
          const range = match.indices?.[capture]
          let code: RuleIssue['code'] | null = null
          if (!range) {
            code = 'invalid-capture'
          } else if (range[0] === range[1] || !match[0]) {
            code = 'empty-match'
          }
          if (code) {
            const key = JSON.stringify([comment.name, patternIndex, code])
            if (!seenIssues.has(key)) {
              seenIssues.add(key)
              issues.push({
                name: comment.name,
                patternIndex,
                code,
                message:
                  code === 'invalid-capture'
                    ? `Capture group ${capture} did not participate in the match.`
                    : 'Empty matches cannot be decorated.',
              })
            }
            continue
          }
          if (!range) {
            continue
          }
          const [start, end] = range
          const key = JSON.stringify([comment.name, start, end])
          if (!seenMatches.has(key)) {
            seenMatches.add(key)
            matches.push({ comment, start, end })
          }
        }
      }
      matches.sort(
        (left, right) => left.start - right.start || left.end - right.end,
      )
      return { matches, issues }
    },
  }
}
