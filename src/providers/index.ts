import { biomeProviders } from './biome'
import { casePoliceProviders } from './case-police'
import { prettierProviders } from './prettier'
import { typescriptProviders } from './typescript'
import { unocssProviders } from './unocss'
import { v8Providers } from './v8'
import { viteProviders } from './vite'
import type { MagicComment } from '../types/core'

// @keep-sorted
export const magicCommentsProviders: MagicComment[] = [
  biomeProviders,
  casePoliceProviders,
  prettierProviders,
  typescriptProviders,
  unocssProviders,
  v8Providers,
  viteProviders,
].flat()
