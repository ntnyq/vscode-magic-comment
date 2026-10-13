import { workspace } from 'vscode'
import type { TextDocument } from 'vscode'
import { DEFAULT_ANNOTATION, DEFAULT_LANGUAGE_IDS } from '../constants'
import type { MagicComment, RuleIssue } from '../core'
import { isRecord, isStringArray } from '../core/define'
import { scopedConfigs } from '../meta'
import { builtInMagicComments } from '../providers'
import { parseCustomComments } from './customComments'

export interface AnnotationStyle {
  color: string
  after: { contentText: string; margin: string }
}

export interface DocumentConfig {
  enable: boolean
  languages: readonly string[]
  ignorePaths: readonly string[]
  annotation: AnnotationStyle
  rules: readonly MagicComment[]
  ruleKey: string
  issues: readonly RuleIssue[]
}

/**
 * Resolve folder and language overrides using the document as the scope.
 */
export function readDocumentConfig(
  document: TextDocument,
  knownLanguages: readonly string[],
): DocumentConfig {
  const settings = workspace.getConfiguration(scopedConfigs.scope, document)
  const issues: RuleIssue[] = []
  function report(name: string, message: string): void {
    issues.push({ name, code: 'invalid-rule', message })
  }
  function getStrings(
    name: string,
    fallback: readonly string[] = [],
  ): readonly string[] {
    const input = settings.get<unknown>(name, fallback)
    if (isStringArray(input)) {
      return input
    }
    report(name, 'Expected an array of strings.')
    return fallback
  }
  function getStyleString(
    input: unknown,
    fallback: string,
    name: string,
  ): string {
    if (typeof input === 'undefined' || input === null) {
      return fallback
    }
    if (typeof input === 'string') {
      return input
    }
    report(name, 'Expected a string.')
    return fallback
  }
  const requestedLanguages = getStrings('languages', DEFAULT_LANGUAGE_IDS)
  const languages = requestedLanguages.filter(language =>
    knownLanguages.includes(language),
  )
  const invalidLanguages = requestedLanguages.filter(
    language => !knownLanguages.includes(language),
  )
  if (invalidLanguages.length) {
    report('languages', `Unknown language IDs: ${invalidLanguages.join(', ')}`)
  }
  const inputAnnotation = settings.get<unknown>('annotation')
  if (typeof inputAnnotation !== 'undefined' && !isRecord(inputAnnotation)) {
    report('annotation', 'Expected an annotation object.')
  }
  const annotation = isRecord(inputAnnotation) ? inputAnnotation : {}
  if (typeof annotation.after !== 'undefined' && !isRecord(annotation.after)) {
    report('annotation.after', 'Expected an annotation suffix object.')
  }
  const after = isRecord(annotation.after) ? annotation.after : {}
  const custom = parseCustomComments(
    settings.get<unknown>('customMagicComments', []),
    builtInMagicComments.map(rule => rule.name),
  )
  issues.push(...custom.issues)
  const disabledNames = new Set(getStrings('disabledNames'))
  const disabledCategories = new Set(getStrings('disabledCategories'))
  const rules = [...builtInMagicComments, ...custom.rules].filter(
    rule =>
      !disabledNames.has(rule.name)
      && (typeof rule.category === 'undefined'
        || !disabledCategories.has(rule.category)),
  )
  const enable = settings.get<unknown>('enable', true)
  if (typeof enable !== 'boolean') {
    report('enable', 'Expected a boolean.')
  }
  return {
    enable: typeof enable === 'boolean' ? enable : true,
    languages: languages.length ? languages : DEFAULT_LANGUAGE_IDS,
    ignorePaths: getStrings('ignorePaths'),
    annotation: {
      color: getStyleString(
        annotation.color,
        DEFAULT_ANNOTATION.color,
        'annotation.color',
      ),
      after: {
        contentText: getStyleString(
          after.contentText,
          DEFAULT_ANNOTATION.after.contentText,
          'annotation.after.contentText',
        ),
        margin: getStyleString(
          after.margin,
          DEFAULT_ANNOTATION.after.margin,
          'annotation.after.margin',
        ),
      },
    },
    rules,
    ruleKey: JSON.stringify(rules),
    issues,
  }
}
