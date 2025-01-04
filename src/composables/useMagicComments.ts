import { computed } from 'reactive-vscode'
import { config } from '../config'
import { magicCommentsProviders } from '../providers'
import type { MagicComment } from '../types/core'

export function useMagicComments() {
  const magicComments = computed(() => {
    const allMagicComments = [
      // built-in magic comments
      ...magicCommentsProviders,

      // user defined magic comments
      ...config.userComments,
    ] as MagicComment[]

    return allMagicComments
  })

  return {
    magicComments,
  }
}
