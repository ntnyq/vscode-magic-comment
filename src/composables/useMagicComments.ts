import { computed } from 'reactive-vscode'
import { config } from '../config'
import { magicCommentsProviders } from '../providers'

export function useMagicComments() {
  const magicComments = computed(() => {
    const allMagicComments = [
      // built-in magic comments
      ...magicCommentsProviders,

      // user defined magic comments
      ...config.userComments,
    ]

    return allMagicComments
  })

  return {
    magicComments,
  }
}
