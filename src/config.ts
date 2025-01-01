import { defineConfigObject } from 'reactive-vscode'
import { scopedConfigs } from './meta'
import type { ScopedConfigKeyTypeMap } from './meta'

export const config = defineConfigObject<ScopedConfigKeyTypeMap>(
  scopedConfigs.scope,
  scopedConfigs.defaults,
)

/**
 * default style for annotation
 */
export const DEFAULT_ANNOTATION = {
  color: 'rgb(255, 189, 42)',
  after: {
    contentText: '🚀',
    margin: '0 0 0 0.5em',
  },
}
