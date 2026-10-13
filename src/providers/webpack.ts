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
      kind: 'token',
      tokens: ['webpackChunkName'],
      syntax: ['block'],
      trailing: 'line',
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
      kind: 'token',
      tokens: ['webpackMode'],
      syntax: ['block'],
      trailing: 'line',
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
      kind: 'token',
      tokens: ['webpackPrefetch'],
      syntax: ['block'],
      trailing: 'line',
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
      kind: 'token',
      tokens: ['webpackPreload'],
      syntax: ['block'],
      trailing: 'line',
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
      kind: 'token',
      tokens: ['webpackInclude'],
      syntax: ['block'],
      trailing: 'line',
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
      kind: 'token',
      tokens: ['webpackExclude'],
      syntax: ['block'],
      trailing: 'line',
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
      kind: 'token',
      tokens: ['webpackExports'],
      syntax: ['block'],
      trailing: 'line',
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
      kind: 'token',
      tokens: ['webpackIgnore'],
      syntax: ['block'],
      trailing: 'line',
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
      kind: 'token',
      tokens: ['webpackFetchPriority'],
      syntax: ['block'],
      trailing: 'line',
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
