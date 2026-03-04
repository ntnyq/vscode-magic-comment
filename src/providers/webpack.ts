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

import { createCommentPatterns, defineMagicComment } from '../utils/define'

const webpackChunkNameProvider = defineMagicComment({
  name: 'webpack-chunk-name',
  description: `webpack-chunk-name`,
  patterns: createCommentPatterns('webpackChunkName', {
    types: ['block'],
    trailing: true,
  }),
  url: 'https://webpack.js.org/api/module-methods/#magic-comments',
  category: 'webpack',
})

const webpackModeProvider = defineMagicComment({
  name: 'webpack-mode',
  description: `webpack-mode`,
  patterns: createCommentPatterns('webpackMode', {
    types: ['block'],
    trailing: true,
  }),
  url: 'https://webpack.js.org/api/module-methods/#magic-comments',
  category: 'webpack',
})

const webpackPrefetchProvider = defineMagicComment({
  name: 'webpack-prefetch',
  description: `webpack-prefetch`,
  patterns: createCommentPatterns('webpackPrefetch', {
    types: ['block'],
    trailing: true,
  }),
  url: 'https://webpack.js.org/api/module-methods/#magic-comments',
  category: 'webpack',
})

const webpackPreloadProvider = defineMagicComment({
  name: 'webpack-preload',
  description: `webpack-preload`,
  patterns: createCommentPatterns('webpackPreload', {
    types: ['block'],
    trailing: true,
  }),
  url: 'https://webpack.js.org/api/module-methods/#magic-comments',
  category: 'webpack',
})

const webpackIncludeProvider = defineMagicComment({
  name: 'webpack-include',
  description: `webpack-include`,
  patterns: createCommentPatterns('webpackInclude', {
    types: ['block'],
    trailing: true,
  }),
  url: 'https://webpack.js.org/api/module-methods/#magic-comments',
  category: 'webpack',
})

const webpackExcludeProvider = defineMagicComment({
  name: 'webpack-exclude',
  description: `webpack-exclude`,
  patterns: createCommentPatterns('webpackExclude', {
    types: ['block'],
    trailing: true,
  }),
  url: 'https://webpack.js.org/api/module-methods/#magic-comments',
  category: 'webpack',
})

const webpackExportsProvider = defineMagicComment({
  name: 'webpack-exports',
  description: `webpack-exports`,
  patterns: createCommentPatterns('webpackExports', {
    types: ['block'],
    trailing: true,
  }),
  url: 'https://webpack.js.org/api/module-methods/#magic-comments',
  category: 'webpack',
})

const webpackIgnoreProvider = defineMagicComment({
  name: 'webpack-ignore',
  description: `webpack-ignore`,
  patterns: createCommentPatterns('webpackIgnore', {
    types: ['block'],
    trailing: true,
  }),
  url: 'https://webpack.js.org/api/module-methods/#magic-comments',
  category: 'webpack',
})

const webpackFetchPriorityProvider = defineMagicComment({
  name: 'webpack-fetch-priority',
  description: `webpack-fetch-priority`,
  patterns: createCommentPatterns('webpackFetchPriority', {
    types: ['block'],
    trailing: true,
  }),
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
