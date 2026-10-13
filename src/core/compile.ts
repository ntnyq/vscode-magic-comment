import { isMagicCommentPattern } from './define'
import { createCommentPatterns } from './patterns'
import type { MagicComment, MagicCommentInfo, RuleIssue } from './types'

export interface CompiledPattern {
  comment: MagicCommentInfo
  patternIndex: number
  regexp: RegExp
  capture: number
  scope?: 'block'
}

/**
 * Compile once per rule configuration; isolate failures to one pattern.
 */
export function compileRules(rules: readonly MagicComment[]): {
  patterns: CompiledPattern[]
  issues: RuleIssue[]
} {
  const patterns: CompiledPattern[] = []
  const issues: RuleIssue[] = []
  const names = new Set<string>()

  for (const rule of rules) {
    if (names.has(rule.name)) {
      issues.push({
        name: rule.name,
        code: 'duplicate-name',
        message: 'The first rule with this name takes precedence.',
      })
      continue
    }
    names.add(rule.name)
    if (!rule.name.trim() || !rule.patterns.length) {
      issues.push({
        name: rule.name,
        code: 'invalid-rule',
        message: 'A rule needs a name and at least one pattern.',
      })
      continue
    }
    const { name, category, description, url } = rule
    const comment: MagicCommentInfo = { name, category, description, url }
    rule.patterns.forEach((pattern, patternIndex) => {
      if (!isMagicCommentPattern(pattern)) {
        issues.push({
          name,
          patternIndex,
          code: 'invalid-rule',
          message: 'Invalid pattern declaration.',
        })
        return
      }
      try {
        if (pattern.kind === 'token') {
          for (const regexp of createCommentPatterns(pattern)) {
            patterns.push({ comment, patternIndex, regexp, capture: 1 })
          }
        } else {
          // Validate supplied flags before adding the scan requirements. Sticky
          // matching would stop scanning at the first nonmatching character.
          const supplied = new RegExp(pattern.source, pattern.flags)
          let flags = supplied.flags.replace(/[dgy]/gu, '')
          if (!flags.includes('u') && !flags.includes('v')) {
            flags += 'u'
          }
          const regexp = new RegExp(pattern.source, `${flags}dg`)
          patterns.push({
            comment,
            patternIndex,
            regexp,
            capture: pattern.capture ?? 1,
            scope: pattern.scope,
          })
        }
      } catch (error) {
        issues.push({
          name,
          patternIndex,
          code: 'invalid-regex',
          message: error instanceof Error ? error.message : String(error),
        })
      }
    })
  }
  return { patterns, issues }
}
