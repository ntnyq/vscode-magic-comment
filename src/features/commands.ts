import { useCommand } from 'reactive-vscode'
import { languages } from 'vscode'
import { commands } from '../meta'
import { logger } from '../utils'

export function useCommands() {
  useCommand(commands.getLanguageConfig, async () => {
    const supportedLanguages = await languages.getLanguages()

    logger.info(`Supported languages: ${supportedLanguages.join(', ')}`)
  })
}
