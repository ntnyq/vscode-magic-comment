import { compileRules } from './compile'
import type {
  MagicComment,
  MagicCommentEngine,
  MagicCommentMatch,
  RuleIssue,
} from './types'

interface ScanSection {
  text: string
  offset: number
}

/**
 * Find closed block comments in one forward pass, even for unfinished input.
 * Like token patterns, this is text-based and does not parse string literals.
 */
function getBlockSections(text: string): ScanSection[] {
  const sections: ScanSection[] = []
  let offset = 0
  while (offset < text.length) {
    const start = text.indexOf('/*', offset)
    if (start === -1) {
      break
    }
    const end = text.indexOf('*/', start + 2)
    if (end === -1) {
      break
    }
    sections.push({ text: text.slice(start + 2, end), offset: start + 2 })
    offset = end + 2
  }
  return sections
}

function* getSectionMatches(
  sections: readonly ScanSection[],
  regexp: RegExp,
): Generator<{ match: RegExpMatchArray; offset: number }> {
  for (const { text, offset } of sections) {
    // matchAll owns its cursor and advances even for empty Unicode matches.
    for (const match of text.matchAll(regexp)) {
      yield { match, offset }
    }
  }
}

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
      let blockSections: ScanSection[] | null = null

      for (const {
        comment,
        regexp,
        capture,
        patternIndex,
        scope,
      } of compiled.patterns) {
        if (scope === 'block') {
          blockSections ??= getBlockSections(text)
        }
        const sections =
          scope === 'block' ? (blockSections ?? []) : [{ text, offset: 0 }]
        for (const { match, offset } of getSectionMatches(sections, regexp)) {
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
          const start = offset + range[0]
          const end = offset + range[1]
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
