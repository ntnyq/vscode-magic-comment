import {
  computed,
  shallowRef,
  useActiveEditorDecorations,
  useActiveTextEditor,
  watchEffect,
} from 'reactive-vscode'
import { DecorationRangeBehavior, window } from 'vscode'
import { config } from '../config'
import type { Range } from 'vscode'
import type { DecorationMatch } from '../types'

export function useAnnotations() {
  const BuiltInDecoration = window.createTextEditorDecorationType({
    rangeBehavior: DecorationRangeBehavior.ClosedClosed,
    color: 'rgb(255, 189, 42)',
  })
  const editor = useActiveTextEditor()
  const languageId = computed(() => editor.value?.document.languageId)

  const decorations = shallowRef<DecorationMatch[]>([])

  useActiveEditorDecorations(BuiltInDecoration, decorations)

  // Calculate decorations
  watchEffect(() => {
    if (!editor.value || !languageId.value || !config.enable) {
      decorations.value = []
      return
    }

    const keys: [Range, string][] = []

    decorations.value = keys.map(([range]) => {
      const item: DecorationMatch = {
        range,
      }

      return item
    })
  })
}
