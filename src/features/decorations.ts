import { DecorationRangeBehavior, Range, window } from 'vscode'
import type {
  DecorationOptions,
  TextEditor,
  TextEditorDecorationType,
} from 'vscode'
import type { AnnotationStyle } from '../config'
import type { MagicCommentInfo, MagicCommentMatch } from '../core'
import { createCommentHover } from './hover'

/**
 * Own one decoration type per visible editor, including its effective style.
 */
export function createDecorations(): {
  render(
    editor: TextEditor,
    matches: readonly MagicCommentMatch[],
    style: AnnotationStyle,
  ): void
  clear(editor: TextEditor): void
  retain(editors: readonly TextEditor[]): void
  dispose(): void
} {
  const states = new Map<
    TextEditor,
    { type: TextEditorDecorationType; styleKey: string }
  >()
  function clear(editor: TextEditor): void {
    const state = states.get(editor)
    if (state) {
      editor.setDecorations(state.type, [])
      state.type.dispose()
      states.delete(editor)
    }
  }
  return {
    render(editor, matches, style) {
      const styleKey = JSON.stringify(style)
      let state = states.get(editor)
      if (state?.styleKey !== styleKey) {
        clear(editor)
        state = {
          styleKey,
          type: window.createTextEditorDecorationType({
            ...style,
            rangeBehavior: DecorationRangeBehavior.ClosedClosed,
          }),
        }
        states.set(editor, state)
      }
      if (!state) {
        return
      }
      const groups = new Map<
        string,
        { start: number; end: number; comments: MagicCommentInfo[] }
      >()
      for (const match of matches) {
        const key = `${match.start}:${match.end}`
        const group = groups.get(key)
        if (group) {
          group.comments.push(match.comment)
        } else {
          groups.set(key, {
            start: match.start,
            end: match.end,
            comments: [match.comment],
          })
        }
      }
      const options: DecorationOptions[] = [...groups.values()].map(group => ({
        range: new Range(
          editor.document.positionAt(group.start),
          editor.document.positionAt(group.end),
        ),
        hoverMessage: createCommentHover(group.comments),
      }))
      editor.setDecorations(state.type, options)
    },
    clear,
    retain(editors) {
      for (const editor of states.keys()) {
        if (!editors.includes(editor)) {
          clear(editor)
        }
      }
    },
    dispose() {
      for (const state of states.values()) {
        state.type.dispose()
      }
      states.clear()
    },
  }
}
