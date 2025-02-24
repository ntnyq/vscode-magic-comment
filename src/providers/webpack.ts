/**
 * @file webpack
 *
 * @see {@link https://webpack.js.org/}
 *
 * @example
 *
 * ```md
 * - webpackChunkName
 * ```
 */

import { defineMagicComment } from '../utils/define'

const webpackChunkNameProvider = defineMagicComment({
  name: 'webpack-chunk-name',
  description: `webpack-chunk-name`,
  patterns: [
    // /* webpackChunkName: dummy */
    /\/\*\s(webpackChunkName):\s[\s\S]+?\*\//g,
  ],
  url: 'https://webpack.js.org/migrate/5/#using--webpackchunkname--',
  category: 'webpack',
})

// @keep-sorted
export const webpackProviders = [webpackChunkNameProvider]
