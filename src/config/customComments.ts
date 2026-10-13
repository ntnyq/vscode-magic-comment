import type { MagicComment, MagicCommentPattern, RuleIssue } from '../core'
import { isMagicCommentPattern, isRecord, isStringArray } from '../core/define'

/**
 * Accept legacy regex strings or declaration arrays, never a mixture.
 * Built-in names remain reserved even when the corresponding rule is disabled.
 */
export function parseCustomComments(
  input: unknown,
  reservedNames: readonly string[] = [],
): { rules: MagicComment[]; issues: RuleIssue[] } {
  const rules: MagicComment[] = []
  const issues: RuleIssue[] = []
  const names = new Set(reservedNames)
  if (!Array.isArray(input)) {
    return {
      rules,
      issues: [
        {
          name: 'customMagicComments',
          code: 'invalid-rule',
          message: 'Expected an array of rules.',
        },
      ],
    }
  }
  input.forEach((definition: unknown, index) => {
    if (
      !isRecord(definition)
      || typeof definition.name !== 'string'
      || !definition.name.trim()
    ) {
      issues.push({
        name: `customMagicComments[${index}]`,
        code: 'invalid-rule',
        message: 'A rule needs a nonempty name.',
      })
      return
    }
    const { name, category, description, url } = definition
    if (names.has(name)) {
      issues.push({
        name,
        code: 'duplicate-name',
        message:
          'Built-in rules and earlier custom rules cannot be overridden.',
      })
      return
    }
    if (
      (typeof category !== 'undefined' && typeof category !== 'string')
      || (typeof description !== 'undefined' && typeof description !== 'string')
      || (typeof url !== 'undefined' && typeof url !== 'string')
    ) {
      issues.push({
        name,
        code: 'invalid-rule',
        message: 'Rule metadata must contain strings.',
      })
      return
    }
    const supplied = definition.patterns
    const legacy = typeof supplied === 'string' ? [supplied] : supplied
    const patterns: MagicCommentPattern[] = []
    if (isStringArray(legacy) && legacy.length) {
      patterns.push(
        ...legacy.map(source => ({ kind: 'regex' as const, source })),
      )
    } else if (
      Array.isArray(supplied)
      && supplied.length
      && supplied.every(isRecord)
    ) {
      supplied.forEach((pattern, patternIndex) => {
        if (isMagicCommentPattern(pattern)) {
          patterns.push(pattern)
        } else {
          issues.push({
            name,
            patternIndex,
            code: 'invalid-rule',
            message: 'Invalid pattern declaration.',
          })
        }
      })
    } else {
      issues.push({
        name,
        code: 'invalid-rule',
        message:
          'Use a regex string, an array of regex strings, or an array of pattern declarations.',
      })
    }
    if (patterns.length) {
      names.add(name)
      rules.push({ name, category, description, url, patterns })
    }
  })
  return { rules, issues }
}
