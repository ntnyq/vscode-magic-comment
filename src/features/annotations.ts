import { isString } from '@ntnyq/utils'
import {
  computed,
  shallowRef,
  useActiveEditorDecorations,
  useActiveTextEditor,
  useDocumentText,
  watchEffect,
} from 'reactive-vscode'
import { DecorationRangeBehavior, Range, window } from 'vscode'
import { useMagicComments } from '../composables'
import { config, DEFAULT_ANNOTATION } from '../config'
import { logger } from '../utils'
import { getMagicCommentMarkdown } from '../utils/markdown'
import type { Position } from 'vscode'
import type { DecorationMatch } from '../types'

export function useAnnotations() {
  const BuiltInDecoration = window.createTextEditorDecorationType({
    rangeBehavior: DecorationRangeBehavior.ClosedClosed,
    color: config.annotation?.color || DEFAULT_ANNOTATION.color,
    after: {
      contentText: config.annotation?.after?.contentText || DEFAULT_ANNOTATION.after.contentText,
      margin: config.annotation?.after?.margin || DEFAULT_ANNOTATION.after.margin,
    },
  })
  const editor = useActiveTextEditor()
  const text = useDocumentText(() => editor.value?.document)
  const languageId = computed(() => editor.value?.document.languageId)

  const { magicComments } = useMagicComments()

  const decorations = shallowRef<DecorationMatch[]>([])

  useActiveEditorDecorations(BuiltInDecoration, decorations)

  // Calculate decorations
  watchEffect(() => {
    if (!editor.value || !languageId.value || !text.value) {
      decorations.value = []
      return
    }

    const keys: [Range, string][] = []

    magicComments.value.forEach(magicComment => {
      const regexp = isString(magicComment.pattern)
        ? new RegExp(magicComment.pattern, 'g')
        : magicComment.pattern

      let match: RegExpExecArray | null = null

      regexp.lastIndex = 0

      while ((match = regexp.exec(text.value!))) {
        if (!editor.value) continue

        let startPos: Position
        let endPos: Position

        if (match?.[1]) {
          const startIndex = match.index + match[0].indexOf(match[1])

          startPos = editor.value.document.positionAt(startIndex)
          endPos = editor.value.document.positionAt(startIndex + match[1].length)
        } else {
          startPos = editor.value.document.positionAt(match.index)
          endPos = editor.value.document.positionAt(match.index + match[0].length)
        }

        logger.info(`🔍 Found '${magicComment.name}' at ${startPos.line}:${startPos.character}`)

        keys.push([new Range(startPos, endPos), magicComment.name])
      }
    })

    decorations.value = keys.map(([range, magicComment]) => {
      const item: DecorationMatch = {
        range,
        magicComment,
        hoverMessage: getMagicCommentMarkdown(magicComment, magicComments.value),
      }

      return item
    })
  })
}
