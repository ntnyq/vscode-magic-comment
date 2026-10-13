import { defineExtension } from 'reactive-vscode'
import { version } from '../package.json' with { type: 'json' }
import { useAnnotations } from './features/annotations'
import { useCommands } from './features/commands'
import { logger } from './utils/logger'

const { activate, deactivate } = defineExtension(() => {
  logger.info(`✅ Activated, v${version}`)

  useCommands()
  useAnnotations()
})

export { activate, deactivate }
