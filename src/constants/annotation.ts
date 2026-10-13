import type { DecorationRenderOptions } from 'vscode'

/**
 * default style for annotation
 */
export const DEFAULT_ANNOTATION = {
  color: 'rgb(255, 189, 42)',
  after: {
    contentText: '🚀',
    margin: '0 0 0 0.5em',
  },
} satisfies DecorationRenderOptions
