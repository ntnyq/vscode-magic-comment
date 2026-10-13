import { beforeEach, expect, it, vi } from 'vitest'
import type { WorkspaceFolder } from 'vscode'
import { readDocumentConfig } from '../src/config'
import { shouldScanDocument } from '../src/config/documentFilter'
import { DEFAULT_LANGUAGE_IDS } from '../src/constants'
import {
  createDocument,
  folderByUri,
  languages,
  RelativePattern,
  settings,
  workspace,
} from './mocks/vscode'

beforeEach(() => {
  vi.clearAllMocks()
  settings.clear()
  folderByUri.clear()
  languages.match.mockReturnValue(0)
})

it('reads document scope and keeps empty style strings', () => {
  const { document } = createDocument()
  settings.set(document, {
    annotation: { color: '', after: { contentText: '', margin: '' } },
  })
  const config = readDocumentConfig(document, DEFAULT_LANGUAGE_IDS)
  expect(workspace.getConfiguration).toHaveBeenCalledWith(
    'magic-comment',
    document,
  )
  expect(config.annotation).toEqual({
    color: '',
    after: { contentText: '', margin: '' },
  })
  expect(config.issues).toEqual([])
})

it('falls back for empty or entirely unknown languages and reports invalid input', () => {
  const { document } = createDocument()
  for (const selected of [[], ['unknown']]) {
    settings.set(document, { languages: selected })
    expect(
      readDocumentConfig(document, DEFAULT_LANGUAGE_IDS).languages,
    ).toEqual(DEFAULT_LANGUAGE_IDS)
  }
  settings.set(document, {
    enable: 'false',
    languages: [123],
    ignorePaths: 'dist/**',
    annotation: { color: 12, after: [] },
    customMagicComments: {},
  })
  const config = readDocumentConfig(document, DEFAULT_LANGUAGE_IDS)
  expect(config.enable).toBe(true)
  expect(config.ignorePaths).toEqual([])
  expect(config.annotation.color).toBe('rgb(255, 189, 42)')
  expect(config.issues).toHaveLength(6)
})

it('reserves disabled built-in names and filters both category and name', () => {
  const { document } = createDocument()
  settings.set(document, {
    disabledNames: ['ts-ignore'],
    disabledCategories: ['vite'],
    customMagicComments: [{ name: 'ts-ignore', patterns: '(override)' }],
  })
  const config = readDocumentConfig(document, DEFAULT_LANGUAGE_IDS)
  expect(
    config.rules.some(
      rule => rule.name === 'ts-ignore' || rule.category === 'vite',
    ),
  ).toBe(false)
  expect(config.issues.map(issue => issue.code)).toEqual(['duplicate-name'])
})

it('delegates workspace globs to VS Code with the owning folder', () => {
  const { document } = createDocument()
  const folder: WorkspaceFolder = {
    uri: document.uri,
    name: 'workspace',
    index: 0,
  }
  folderByUri.set(document.uri, folder)
  settings.set(document, { ignorePaths: ['dist/**'] })
  languages.match.mockReturnValue(10)
  expect(
    shouldScanDocument(
      document,
      readDocumentConfig(document, DEFAULT_LANGUAGE_IDS),
    ),
  ).toBe(false)
  expect(languages.match).toHaveBeenCalledWith(
    { pattern: new RelativePattern(folder, 'dist/**') },
    document,
  )
  expect(document.getText).not.toHaveBeenCalled()
})

it('uses absolute globs outside the workspace and skips untitled path filtering', () => {
  const { document, state } = createDocument()
  settings.set(document, { ignorePaths: ['/workspace/**'] })
  const config = readDocumentConfig(document, DEFAULT_LANGUAGE_IDS)
  expect(shouldScanDocument(document, config)).toBe(true)
  expect(languages.match).toHaveBeenCalledWith(
    { pattern: '/workspace/**' },
    document,
  )
  state.isUntitled = true
  languages.match.mockClear()
  expect(shouldScanDocument(document, config)).toBe(true)
  expect(languages.match).not.toHaveBeenCalled()
})

it('does not evaluate paths for disabled or unsupported documents', () => {
  const { document, state } = createDocument()
  settings.set(document, { enable: false, ignorePaths: ['**'] })
  expect(
    shouldScanDocument(
      document,
      readDocumentConfig(document, DEFAULT_LANGUAGE_IDS),
    ),
  ).toBe(false)
  settings.set(document, { ignorePaths: ['**'] })
  state.languageId = 'plaintext'
  expect(
    shouldScanDocument(
      document,
      readDocumentConfig(document, DEFAULT_LANGUAGE_IDS),
    ),
  ).toBe(false)
  expect(languages.match).not.toHaveBeenCalled()
})
