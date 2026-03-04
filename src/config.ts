import {
  computed,
  defineConfig,
  shallowRef,
  watchEffect,
} from 'reactive-vscode'
import { languages, window } from 'vscode'
import { DEFAULT_LANGUAGE_IDS } from './constants'
import { scopedConfigs } from './meta'
import type { ScopedConfigKeyTypeMap } from './meta'
import { builtInMagicComments } from './providers'
import type { MagicComment } from './types'

export const config = defineConfig<ScopedConfigKeyTypeMap>(scopedConfigs.scope)

/**
 * BuiltIn magic comments names
 */
const builtInMagicCommentsNames = new Set(builtInMagicComments.map(v => v.name))

/**
 * User customized magic comments
 */
export const customMagicComments = shallowRef<MagicComment[]>([])

/**
 * Load user customized magic comments
 */
export function useCustomMagicComments() {
  watchEffect(() => {
    const seen = new Set<string>()
    const result: MagicComment[] = []

    config.customMagicComments.forEach(item => {
      if (builtInMagicCommentsNames.has(item.name) || seen.has(item.name)) {
        return
      }

      seen.add(item.name)
      result.push({
        ...item,
        patterns: item.patterns as string | string[],
      })
    })

    customMagicComments.value = result
  })
}

/**
 * Enabled magic comments
 */
export const enabledMagicComments = computed<MagicComment[]>(() => {
  const filteredMagicComments = [
    ...builtInMagicComments,
    ...customMagicComments.value,
  ]
    .filter(item =>
      item.category && config.disabledCategories.length
        ? !config.disabledCategories.includes(item.category)
        : true,
    )
    .filter(item =>
      config.disabledNames.length
        ? !config.disabledNames.includes(item.name)
        : true,
    )
  return filteredMagicComments
})

async function validateLanguageIds(targets: string[] = []) {
  const allLanguageIds = await languages.getLanguages()
  const invalidLanguages: string[] = []
  const validateLanguages = targets.filter(language => {
    if (!allLanguageIds.includes(language)) {
      invalidLanguages.push(language)
      return false
    }
    return true
  })

  if (invalidLanguages.length) {
    window.showWarningMessage(
      `Invalid language(s): ${invalidLanguages.join(', ')}`,
    )
  }

  return Array.from(new Set(validateLanguages))
}

export async function getSupportedLanguageIds() {
  const customLanguageIds = await validateLanguageIds(config.languages)
  return customLanguageIds.length ? customLanguageIds : DEFAULT_LANGUAGE_IDS
}
