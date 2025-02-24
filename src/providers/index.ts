import { autoprefixerProviders } from './autoprefixer'
import { biomeProviders } from './biome'
import { casePoliceProviders } from './casePolice'
import { compilerHintProviders } from './compilerHint'
import { prettierProviders } from './prettier'
import { typescriptProviders } from './typescript'
import { unocssProviders } from './unocss'
import { v8Providers } from './v8'
import { viteProviders } from './vite'
import { webpackProviders } from './webpack'
import type { MagicComment } from '../types'

// @keep-sorted
export const builtInMagicComments: MagicComment[] = [
  autoprefixerProviders,
  biomeProviders,
  casePoliceProviders,
  compilerHintProviders,
  prettierProviders,
  typescriptProviders,
  unocssProviders,
  v8Providers,
  viteProviders,
  webpackProviders,
].flat()
