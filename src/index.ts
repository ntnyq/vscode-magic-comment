import { defineExtension } from 'reactive-vscode'
import { version } from '../package.json'
import { config, enabledMagicComments, useCustomMagicComments } from './config'
import { useAnnotations } from './features/annotations'
import { useCommands } from './features/commands'
import { logger } from './utils'

const { activate, deactivate } = defineExtension(() => {
  logger.info(`✅ Activated, v${version}`)

  if (!config.enable) {
    return logger.warn('❌ Disabled by configuration')
  }

  useCommands()

  useCustomMagicComments()

  logger.info(`🎛 ${enabledMagicComments.value.length} magic comments loaded`)

  useAnnotations()
})

export { activate, deactivate }
