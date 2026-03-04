import { isString, toArray } from '@ntnyq/utils'
import {
  computed,
  shallowRef,
  watch,
  useActiveTextEditor,
  useDocumentText,
  watchEffect,
} from 'reactive-vscode'
import { DecorationRangeBehavior, Range, window } from 'vscode'
import {
  config,
  enabledMagicComments,
  getSupportedLanguageIds,
} from '../config'
import { DEFAULT_ANNOTATION, EXCLUDE_LANGUAGE_IDS } from '../constants'
import type { DecorationMatch } from '../types'
import { getMagicCommentMarkdown, isTruthy, logger } from '../utils'

export function useAnnotations() {
  const createBuiltInDecoration = () =>
    window.createTextEditorDecorationType({
      rangeBehavior: DecorationRangeBehavior.ClosedClosed,
      color: config.annotation?.color || DEFAULT_ANNOTATION.color,
      after: {
        contentText:
          config.annotation?.after?.contentText ||
          DEFAULT_ANNOTATION.after.contentText,
        margin:
          config.annotation?.after?.margin || DEFAULT_ANNOTATION.after.margin,
      },
    })

  const builtInDecoration = shallowRef(createBuiltInDecoration())

  const editor = useActiveTextEditor()
  const text = useDocumentText(() => editor.value?.document)
  const languageId = computed(() => editor.value?.document.languageId)

  const decorations = shallowRef<DecorationMatch[]>([])

  const supportedLanguages = shallowRef<string[]>([])

  watch(
    () => config.annotation,
    () => {
      const nextDecoration = createBuiltInDecoration()
      const previousDecoration = builtInDecoration.value

      builtInDecoration.value = nextDecoration

      if (editor.value) {
        editor.value.setDecorations(nextDecoration, decorations.value)
      }

      previousDecoration.dispose()
    },
  )

  watchEffect(() => {
    if (!editor.value) {
      return
    }

    editor.value.setDecorations(builtInDecoration.value, decorations.value)
  })

  // Calculate decorations
  watchEffect(async () => {
    if (
      // no editor instance
      !editor.value ||
      // no language id
      !languageId.value ||
      // no text
      !text.value ||
      // exclude language ids
      EXCLUDE_LANGUAGE_IDS.includes(languageId.value)
    ) {
      decorations.value = []
      return
    }

    const { document } = editor.value
    const keys: [Range, string][] = []

    if (!supportedLanguages.value.includes(languageId.value)) {
      decorations.value = []
      logger.warn(`❗️ Language ${languageId.value} is not supported`)
      return
    }

    enabledMagicComments.value.forEach(magicComment => {
      const patterns = toArray(magicComment.patterns).map(pattern =>
        isString(pattern) ? new RegExp(pattern, 'g') : pattern,
      ) as RegExp[]

      patterns.forEach(regexp => {
        // required global flag
        if (!regexp.global) {
          return
        }

        let match: RegExpExecArray | null = null

        // reset lastIndex
        regexp.lastIndex = 0

        while ((match = regexp.exec(text.value!))) {
          const key = match[1]
          if (!key) {
            continue
          }

          const startIndex = match.index + match[0].indexOf(key)

          const startPos = document.positionAt(startIndex)
          const endPos = document.positionAt(startIndex + key.length)

          logger.debug(
            `🔍 Founded magic comment '${magicComment.name}' at ${startPos.line}:${startPos.character} matched pattern: '${regexp.source}'`,
          )

          keys.push([new Range(startPos, endPos), magicComment.name])
        }
      })
    })

    decorations.value = keys
      .map(([range, key]) => {
        const item: DecorationMatch = {
          range,
          key,
          hoverMessage: getMagicCommentMarkdown(key),
        }

        return item
      })
      .filter(isTruthy)
  })

  watchEffect(async () => {
    supportedLanguages.value = await getSupportedLanguageIds()
  })
}
