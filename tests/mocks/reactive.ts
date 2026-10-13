import { vi } from 'vitest'
import type { TextEditor } from 'vscode'

const disposables: { dispose(): void }[] = []
const watchers = new Set<() => void>()
const editors: { value: readonly TextEditor[] } = { value: [] }

export const logger = { warn: vi.fn(), error: vi.fn(), info: vi.fn() }
export const defineLogger = () => logger
export const useVisibleTextEditors = () => editors
export function useDisposable<T extends { dispose(): void }>(disposable: T): T {
  disposables.push(disposable)
  return disposable
}
export function watch(
  _source: unknown,
  callback: () => void,
  options: { immediate: boolean },
): void {
  watchers.add(callback)
  if (options.immediate) {
    return callback()
  }
}
export function setVisibleEditors(visible: readonly TextEditor[]): void {
  editors.value = visible
  watchers.forEach(callback => callback())
}
export function disposeScope(): void {
  disposables
    .splice(0)
    .reverse()
    .forEach(disposable => disposable.dispose())
  watchers.clear()
  editors.value = []
}
