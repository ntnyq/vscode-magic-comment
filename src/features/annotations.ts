import { useDisposable, useVisibleTextEditors, watch } from 'reactive-vscode'
import { extensions, languages, workspace } from 'vscode'
import type { TextDocument } from 'vscode'
import { readDocumentConfig } from '../config'
import type { DocumentConfig } from '../config'
import { shouldScanDocument } from '../config/documentFilter'
import { createMagicCommentEngine } from '../core'
import type { MagicCommentEngine, MagicCommentMatch, RuleIssue } from '../core'
import { scopedConfigs } from '../meta'
import { logger } from '../utils/logger'
import { createDecorations } from './decorations'

interface DocumentState {
  config?: DocumentConfig
  ruleKey?: string
  engine?: MagicCommentEngine
  version?: number
  matches?: readonly MagicCommentMatch[]
  timer?: ReturnType<typeof setTimeout>
}

const SCAN_DELAY = 100

export function useAnnotations(): void {
  const editors = useVisibleTextEditors()
  const decorations = useDisposable(createDecorations())
  const documents = new Map<TextDocument, DocumentState>()
  const reportedIssues = new Set<string>()
  let knownLanguages: readonly string[] | null = null
  let isDisposed = false
  let languageRequest = 0

  function report(issues: readonly RuleIssue[]): void {
    for (const issue of issues) {
      const key = JSON.stringify(issue)
      if (!reportedIssues.has(key)) {
        reportedIssues.add(key)
        logger.warn(
          `[${issue.code}] ${issue.name}${typeof issue.patternIndex === 'undefined' ? '' : ` (pattern ${issue.patternIndex + 1})`}: ${issue.message}`,
        )
      }
    }
  }

  function cancel(state: DocumentState): void {
    clearTimeout(state.timer)
    delete state.timer
  }

  function refresh(document: TextDocument): void {
    if (isDisposed || !knownLanguages || document.isClosed) {
      return
    }
    const visibleEditors = editors.value.filter(
      editor => editor.document === document,
    )
    if (!visibleEditors.length) {
      return
    }
    let state = documents.get(document)
    if (!state) {
      state = {}
      documents.set(document, state)
    }
    cancel(state)
    const config = state.config ?? readDocumentConfig(document, knownLanguages)
    state.config = config
    report(config.issues)
    if (!shouldScanDocument(document, config)) {
      delete state.matches
      delete state.version
      visibleEditors.forEach(editor => decorations.clear(editor))
      return
    }
    if (!state.engine || state.ruleKey !== config.ruleKey) {
      state.engine = createMagicCommentEngine(config.rules)
      state.ruleKey = config.ruleKey
      delete state.version
      report(state.engine.issues)
    }
    if (state.version !== document.version || !state.matches) {
      const result = state.engine.scan(document.getText())
      state.matches = result.matches
      state.version = document.version
      report(result.issues)
    }
    for (const editor of visibleEditors) {
      decorations.render(editor, state.matches, config.annotation)
    }
  }

  function refreshVisible(): void {
    decorations.retain(editors.value)
    const visibleDocuments = new Set(
      editors.value.map(editor => editor.document),
    )
    for (const [document, state] of documents) {
      if (!visibleDocuments.has(document)) {
        cancel(state)
        documents.delete(document)
      }
    }
    visibleDocuments.forEach(refresh)
  }

  async function updateLanguages(): Promise<void> {
    languageRequest += 1
    const request = languageRequest
    try {
      const availableLanguages = await languages.getLanguages()
      if (!isDisposed && request === languageRequest) {
        knownLanguages = availableLanguages
        documents.forEach(state => {
          delete state.config
        })
        refreshVisible()
      }
    } catch (error) {
      if (!isDisposed) {
        logger.error('Failed to read available languages', error)
      }
    }
  }

  watch(editors, refreshVisible, { immediate: true })
  useDisposable(
    workspace.onDidChangeTextDocument(({ document }) => {
      const state = documents.get(document)
      if (
        !state
        || !state.config
        || !shouldScanDocument(document, state.config)
      ) {
        return
      }
      cancel(state)
      state.timer = setTimeout(() => refresh(document), SCAN_DELAY)
    }),
  )
  useDisposable(
    workspace.onDidCloseTextDocument(document => {
      const state = documents.get(document)
      if (state) {
        cancel(state)
        documents.delete(document)
      }
      editors.value
        .filter(editor => editor.document === document)
        .forEach(editor => decorations.clear(editor))
    }),
  )
  useDisposable(
    workspace.onDidOpenTextDocument(document => {
      const state = documents.get(document)
      if (state) {
        delete state.config
      }
      refresh(document)
    }),
  )
  useDisposable(
    workspace.onDidChangeConfiguration(event => {
      if (!event.affectsConfiguration(scopedConfigs.scope)) {
        return
      }
      reportedIssues.clear()
      for (const [document, state] of documents) {
        if (event.affectsConfiguration(scopedConfigs.scope, document)) {
          delete state.config
          refresh(document)
        }
      }
    }),
  )
  useDisposable(
    workspace.onDidChangeWorkspaceFolders(() => {
      documents.forEach(state => {
        delete state.config
      })
      refreshVisible()
    }),
  )
  useDisposable(
    extensions.onDidChange(() => {
      updateLanguages()
    }),
  )
  useDisposable({
    dispose() {
      isDisposed = true
      documents.forEach(cancel)
      documents.clear()
      reportedIssues.clear()
    },
  })
  updateLanguages()
}
