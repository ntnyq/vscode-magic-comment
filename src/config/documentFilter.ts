import { languages, RelativePattern, workspace } from 'vscode'
import type { TextDocument } from 'vscode'
import { EXCLUDE_LANGUAGE_IDS } from '../constants'
import type { DocumentConfig } from './index'

/**
 * Filter before reading document text. Glob paths are relative to the owning
 * workspace folder, or absolute for documents outside a workspace.
 */
export function shouldScanDocument(
  document: TextDocument,
  config: DocumentConfig,
): boolean {
  if (
    !config.enable
    || EXCLUDE_LANGUAGE_IDS.includes(document.languageId)
    || !config.languages.includes(document.languageId)
  ) {
    return false
  }
  if (document.isUntitled) {
    return true
  }
  const folder = workspace.getWorkspaceFolder(document.uri)
  return !config.ignorePaths.some(
    pattern =>
      languages.match(
        {
          pattern: folder ? new RelativePattern(folder, pattern) : pattern,
        },
        document,
      ) > 0,
  )
}
