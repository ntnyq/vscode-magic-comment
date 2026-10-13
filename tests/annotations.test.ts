import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { useAnnotations } from '../src/features/annotations'
import { disposeScope, logger, setVisibleEditors } from './mocks/reactive'
import {
  changeConfiguration,
  closes,
  createDocument,
  createEditor,
  decorationTypes,
  languages,
  settings,
} from './mocks/vscode'

beforeEach(() => {
  vi.useFakeTimers()
  vi.clearAllMocks()
  settings.clear()
  decorationTypes.length = 0
  languages.match.mockReturnValue(0)
})
afterEach(() => {
  disposeScope()
  vi.useRealTimers()
})

async function start(
  ...editors: ReturnType<typeof createEditor>[]
): Promise<void> {
  setVisibleEditors(editors.map(({ editor }) => editor))
  useAnnotations()
  await Promise.resolve()
}

it('shares one scan across split editors and debounces document edits', async () => {
  const file = createDocument()
  const first = createEditor(file.document)
  const second = createEditor(file.document)
  await start(first, second)
  expect(file.state.getText).toHaveBeenCalledTimes(1)
  expect(first.setDecorations.mock.lastCall?.[1]).toHaveLength(1)
  expect(second.setDecorations.mock.lastCall?.[1]).toHaveLength(1)
  file.edit('// @ts-check')
  file.edit('')
  await vi.advanceTimersByTimeAsync(100)
  expect(file.state.getText).toHaveBeenCalledTimes(2)
  expect(first.setDecorations.mock.lastCall?.[1]).toEqual([])
  expect(second.setDecorations.mock.lastCall?.[1]).toEqual([])
})

it('starts disabled, dynamically enables and cancels scans on disable', async () => {
  const file = createDocument()
  const editor = createEditor(file.document)
  settings.set(file.document, { enable: false })
  await start(editor)
  expect(file.state.getText).not.toHaveBeenCalled()
  changeConfiguration(file.document, { enable: true })
  expect(editor.setDecorations.mock.lastCall?.[1]).toHaveLength(1)
  file.edit('// @ts-check')
  changeConfiguration(file.document, { enable: false })
  await vi.advanceTimersByTimeAsync(100)
  expect(file.state.getText).toHaveBeenCalledTimes(1)
  expect(editor.setDecorations.mock.lastCall?.[1]).toEqual([])
  expect(decorationTypes[0].dispose).toHaveBeenCalledOnce()
  changeConfiguration(file.document, { enable: true })
  expect(file.state.getText).toHaveBeenCalledTimes(2)
})

it('updates each document style independently without rescanning', async () => {
  const first = createDocument()
  const second = createDocument('// @ts-check', '/other/file.ts')
  const firstEditor = createEditor(first.document)
  const secondEditor = createEditor(second.document)
  await start(firstEditor, secondEditor)
  const secondCalls = secondEditor.setDecorations.mock.calls.length
  changeConfiguration(first.document, {
    annotation: { color: 'red', after: { contentText: '', margin: '' } },
  })
  expect(first.state.getText).toHaveBeenCalledTimes(1)
  expect(second.state.getText).toHaveBeenCalledTimes(1)
  expect(secondEditor.setDecorations).toHaveBeenCalledTimes(secondCalls)
  expect(decorationTypes.at(-1)?.options).toMatchObject({
    color: 'red',
    after: { contentText: '', margin: '' },
  })
  expect(decorationTypes[0].dispose).toHaveBeenCalledOnce()
})

it('recompiles changed rules and merges hover content for identical ranges', async () => {
  const file = createDocument()
  const editor = createEditor(file.document)
  await start(editor)
  changeConfiguration(file.document, {
    customMagicComments: [
      {
        name: 'custom',
        patterns: '(@ts-ignore)',
        description: 'Custom documentation',
      },
    ],
  })
  const options = editor.setDecorations.mock.lastCall?.[1]
  expect(options).toHaveLength(1)
  expect(options?.[0].hoverMessage).toMatchObject({
    isTrusted: false,
    value: expect.stringContaining('Custom documentation'),
  })
  changeConfiguration(file.document, { disabledCategories: ['typescript'] })
  expect(editor.setDecorations.mock.lastCall?.[1]).toEqual([])
  expect(file.state.getText).toHaveBeenCalledTimes(3)
})

it('clears excluded files and language changes, then restores supported languages', async () => {
  const file = createDocument()
  const editor = createEditor(file.document)
  await start(editor)
  languages.match.mockReturnValue(10)
  changeConfiguration(file.document, { ignorePaths: ['**/*.ts'] })
  expect(editor.setDecorations.mock.lastCall?.[1]).toEqual([])
  expect(file.state.getText).toHaveBeenCalledTimes(1)
  changeConfiguration(file.document, {})
  file.changeLanguage('plaintext')
  expect(editor.setDecorations.mock.lastCall?.[1]).toEqual([])
  file.changeLanguage('typescript')
  expect(editor.setDecorations.mock.lastCall?.[1]).toHaveLength(1)
})

it('releases hidden editors, closed documents and pending scans on disposal', async () => {
  const file = createDocument()
  const first = createEditor(file.document)
  const second = createEditor(file.document)
  await start(first, second)
  setVisibleEditors([second.editor])
  expect(decorationTypes[0].dispose).toHaveBeenCalledOnce()
  file.edit('')
  closes.fire(file.document)
  expect(vi.getTimerCount()).toBe(0)
  expect(decorationTypes[1].dispose).toHaveBeenCalledOnce()
  setVisibleEditors([])
  setVisibleEditors([first.editor])
  expect(file.state.getText).toHaveBeenCalledTimes(2)
  file.edit('// @ts-check')
  disposeScope()
  expect(vi.getTimerCount()).toBe(0)
  expect(decorationTypes.at(-1)?.dispose).toHaveBeenCalledOnce()
})

it('deduplicates rule errors until configuration changes', async () => {
  const file = createDocument()
  settings.set(file.document, {
    customMagicComments: [
      { name: 'bad', patterns: 'oops' },
      { name: 'broken', patterns: '[' },
    ],
  })
  await start(createEditor(file.document))
  file.edit('oops // @ts-ignore')
  await vi.advanceTimersByTimeAsync(100)
  file.edit('oops // @ts-check')
  await vi.advanceTimersByTimeAsync(100)
  expect(logger.warn).toHaveBeenCalledTimes(2)
  expect(logger.error).not.toHaveBeenCalled()
})

it('does not render when language discovery completes after disposal', async () => {
  let resolveLanguages: ((languages: string[]) => void) | null = null
  languages.getLanguages.mockImplementationOnce(
    () =>
      new Promise(resolve => {
        resolveLanguages = resolve
      }),
  )
  const file = createDocument()
  await start(createEditor(file.document))
  disposeScope()
  if (resolveLanguages) {
    const resolve: (languages: string[]) => void = resolveLanguages
    resolve(['typescript'])
  }
  await Promise.resolve()
  expect(file.state.getText).not.toHaveBeenCalled()
})
