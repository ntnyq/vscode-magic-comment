/**
 * @file webpack
 *
 * @see {@link https://webpack.js.org/api/module-methods/#magic-comments}
 *
 * @example
 *
 * ```md
 * - webpackChunkName
 * - webpackMode
 * - webpackPrefetch
 * - webpackPreload
 * - webpackInclude
 * - webpackExclude
 * - webpackExports
 * - webpackIgnore
 * - webpackFetchPriority
 * ```
 */

import { defineMagicComment } from '../core'

const webpackChunkNameProvider = defineMagicComment({
  name: 'webpack-chunk-name',
  description: `webpack-chunk-name`,
  patterns: [
    {
      kind: 'regex',
      scope: 'block',
      source: String.raw`(?:^|,)\s*(webpackChunkName)(?=$|\s|[:=])`,
    },
  ],
  url: 'https://webpack.js.org/api/module-methods/#magic-comments',
  category: 'webpack',
})

const webpackModeProvider = defineMagicComment({
  name: 'webpack-mode',
  description: `webpack-mode`,
  patterns: [
    {
      kind: 'regex',
      scope: 'block',
      source: String.raw`(?:^|,)\s*(webpackMode)(?=$|\s|[:=])`,
    },
  ],
  url: 'https://webpack.js.org/api/module-methods/#magic-comments',
  category: 'webpack',
})

const webpackPrefetchProvider = defineMagicComment({
  name: 'webpack-prefetch',
  description: `webpack-prefetch`,
  patterns: [
    {
      kind: 'regex',
      scope: 'block',
      source: String.raw`(?:^|,)\s*(webpackPrefetch)(?=$|\s|[:=])`,
    },
  ],
  url: 'https://webpack.js.org/api/module-methods/#magic-comments',
  category: 'webpack',
})

const webpackPreloadProvider = defineMagicComment({
  name: 'webpack-preload',
  description: `webpack-preload`,
  patterns: [
    {
      kind: 'regex',
      scope: 'block',
      source: String.raw`(?:^|,)\s*(webpackPreload)(?=$|\s|[:=])`,
    },
  ],
  url: 'https://webpack.js.org/api/module-methods/#magic-comments',
  category: 'webpack',
})

const webpackIncludeProvider = defineMagicComment({
  name: 'webpack-include',
  description: `webpack-include`,
  patterns: [
    {
      kind: 'regex',
      scope: 'block',
      source: String.raw`(?:^|,)\s*(webpackInclude)(?=$|\s|[:=])`,
    },
  ],
  url: 'https://webpack.js.org/api/module-methods/#magic-comments',
  category: 'webpack',
})

const webpackExcludeProvider = defineMagicComment({
  name: 'webpack-exclude',
  description: `webpack-exclude`,
  patterns: [
    {
      kind: 'regex',
      scope: 'block',
      source: String.raw`(?:^|,)\s*(webpackExclude)(?=$|\s|[:=])`,
    },
  ],
  url: 'https://webpack.js.org/api/module-methods/#magic-comments',
  category: 'webpack',
})

const webpackExportsProvider = defineMagicComment({
  name: 'webpack-exports',
  description: `webpack-exports`,
  patterns: [
    {
      kind: 'regex',
      scope: 'block',
      source: String.raw`(?:^|,)\s*(webpackExports)(?=$|\s|[:=])`,
    },
  ],
  url: 'https://webpack.js.org/api/module-methods/#magic-comments',
  category: 'webpack',
})

const webpackIgnoreProvider = defineMagicComment({
  name: 'webpack-ignore',
  description: `webpack-ignore`,
  patterns: [
    {
      kind: 'regex',
      scope: 'block',
      source: String.raw`(?:^|,)\s*(webpackIgnore)(?=$|\s|[:=])`,
    },
  ],
  url: 'https://webpack.js.org/api/module-methods/#magic-comments',
  category: 'webpack',
})

const webpackFetchPriorityProvider = defineMagicComment({
  name: 'webpack-fetch-priority',
  description: `webpack-fetch-priority`,
  patterns: [
    {
      kind: 'regex',
      scope: 'block',
      source: String.raw`(?:^|,)\s*(webpackFetchPriority)(?=$|\s|[:=])`,
    },
  ],
  url: 'https://webpack.js.org/api/module-methods/#magic-comments',
  category: 'webpack',
})

// @keep-sorted
export const webpackProviders = [
  webpackChunkNameProvider,
  webpackExcludeProvider,
  webpackExportsProvider,
  webpackFetchPriorityProvider,
  webpackIgnoreProvider,
  webpackIncludeProvider,
  webpackModeProvider,
  webpackPrefetchProvider,
  webpackPreloadProvider,
]
