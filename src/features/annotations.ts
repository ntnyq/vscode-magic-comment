import { isString, toArray } from '@ntnyq/utils'
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
      const patterns = toArray(magicComment.patterns).map(pattern =>
        isString(pattern) ? new RegExp(pattern, 'g') : pattern,
      ) as RegExp[]

      patterns.forEach(regexp => {
        // required global flag
        if (!regexp.global) return

        let match: RegExpExecArray | null = null

        // reset lastIndex
        regexp.lastIndex = 0

        while ((match = regexp.exec(text.value!))) {
          if (!editor.value || !match[1]) continue

          const startIndex = match.index + match[0].indexOf(match[1])

          const startPos = editor.value.document.positionAt(startIndex)
          const endPos = editor.value.document.positionAt(startIndex + match[1].length)

          logger.info(
            `🔍 Found '${magicComment.name}' at ${startPos.line}:${startPos.character}\npattern: '${regexp.source}'`,
          )

          keys.push([new Range(startPos, endPos), magicComment.name])
        }
      })
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
