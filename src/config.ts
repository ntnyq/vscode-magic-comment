import {
  computed,
  defineConfigObject,
  shallowReactive,
  shallowRef,
} from 'reactive-vscode'
import { languages, window } from 'vscode'
import { DEFAULT_LANGUAGE_IDS } from './constants'
import { scopedConfigs } from './meta'
import { builtInMagicComments } from './providers'
import type { ScopedConfigKeyTypeMap } from './meta'
import type { MagicComment } from './types'

export const config = defineConfigObject<ScopedConfigKeyTypeMap>(
  scopedConfigs.scope,
  scopedConfigs.defaults,
)

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
  const result = shallowReactive(new Map<string, MagicComment>())

  config.customMagicComments.forEach(item => {
    if (builtInMagicCommentsNames.has(item.name)) {
      return
    }
    result.set(item.name, {
      ...item,
      patterns: item.patterns as string[],
    })
  })

  customMagicComments.value = Array.from(result.values())
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
