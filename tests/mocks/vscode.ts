/* oxlint-disable max-classes-per-file -- Keep the small VS Code API adapters together. */
import { vi } from 'vitest'
import type {
  ConfigurationChangeEvent,
  DecorationOptions,
  DecorationRenderOptions,
  TextDocument,
  TextDocumentChangeEvent,
  TextEditor,
  TextEditorDecorationType,
  Uri,
  WorkspaceFolder,
} from 'vscode'

function createEvent<T>() {
  const listeners = new Set<(event: T) => void>()
  return {
    event: (listener: (event: T) => void) => {
      listeners.add(listener)
      return { dispose: () => listeners.delete(listener) }
    },
    fire: (event: T) => listeners.forEach(listener => listener(event)),
  }
}

export const changes = createEvent<TextDocumentChangeEvent>()
export const closes = createEvent<TextDocument>()
export const opens = createEvent<TextDocument>()
export const configurations = createEvent<ConfigurationChangeEvent>()
export const folders = createEvent<void>()
export const extensionChanges = createEvent<void>()
export const settings = new Map<TextDocument, Record<string, unknown>>()
export const folderByUri = new Map<Uri, WorkspaceFolder>()
export const decorationTypes: {
  options: DecorationRenderOptions
  dispose: ReturnType<typeof vi.fn>
  key: string
}[] = []

export const workspace = {
  onDidChangeTextDocument: changes.event,
  onDidCloseTextDocument: closes.event,
  onDidOpenTextDocument: opens.event,
  onDidChangeConfiguration: configurations.event,
  onDidChangeWorkspaceFolders: folders.event,
  getWorkspaceFolder: (uri: Uri) => folderByUri.get(uri),
  getConfiguration: vi.fn((_scope: string, document: TextDocument) => ({
    get: (key: string, fallback: unknown) =>
      settings.get(document)?.[key] ?? fallback,
  })),
}
export const extensions = { onDidChange: extensionChanges.event }
export const languages = {
  getLanguages: vi.fn(async () => [
    'typescript',
    'javascript',
    'markdown',
    'javascriptreact',
    'typescriptreact',
    'html',
    'css',
  ]),
  match: vi.fn((_selector: unknown, _document: TextDocument) => 0),
}
export const window = {
  createTextEditorDecorationType: vi.fn((options: DecorationRenderOptions) => {
    const type = {
      options,
      key: String(decorationTypes.length),
      dispose: vi.fn(),
    }
    decorationTypes.push(type)
    return type
  }),
}
export const DecorationRangeBehavior = { ClosedClosed: 1 }
export class Range {
  start: unknown
  end: unknown
  constructor(start: unknown, end: unknown) {
    this.start = start
    this.end = end
  }
}
export class RelativePattern {
  base: unknown
  pattern: string
  constructor(base: unknown, pattern: string) {
    this.base = base
    this.pattern = pattern
  }
}
export class MarkdownString {
  value = ''
  isTrusted = false
  appendText(text: string): this {
    this.value += text
    return this
  }
  appendMarkdown(text: string): this {
    this.value += text
    return this
  }
}

/**
 * Partial VS Code adapters at the test boundary; production sees its native API.
 */
export function createDocument(
  text = '// @ts-ignore',
  path = '/workspace/file.ts',
) {
  let content = text
  const state = {
    version: 1,
    languageId: 'typescript',
    isClosed: false,
    isUntitled: false,
    uri: { scheme: 'file', fsPath: path, path },
    getText: vi.fn(() => content),
    positionAt: (offset: number) => ({ line: 0, character: offset }),
  }
  const document = state as unknown as TextDocument
  return {
    document,
    state,
    edit(next: string) {
      content = next
      state.version += 1
      // oxlint-disable-next-line no-undefined -- Ordinary edits have no undo/redo reason.
      changes.fire({ document, contentChanges: [], reason: undefined })
    },
    changeLanguage(language: string) {
      closes.fire(document)
      state.languageId = language
      opens.fire(document)
    },
  }
}

export function createEditor(document: TextDocument) {
  const setDecorations =
    vi.fn<
      (
        type: TextEditorDecorationType,
        options: readonly DecorationOptions[],
      ) => void
    >()
  const editor = { document, setDecorations } as unknown as TextEditor
  return { editor, setDecorations }
}

export function changeConfiguration(
  document: TextDocument,
  next: Record<string, unknown>,
): void {
  settings.set(document, next)
  configurations.fire({
    affectsConfiguration: (_section, scope) => !scope || scope === document,
  })
}
