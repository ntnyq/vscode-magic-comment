import { defineMagicComment } from '../utils/define'

const webpackChunkNameProvider = defineMagicComment({
  name: 'webpack-chunk-name',
  description: `webpack-chunk-name`,
  patterns: [
    // /* webpackChunkName: dummy */
    /\/\*\s(webpackChunkName):\s[\s\S]+?\*\//g,
  ],
  category: 'webpack',
})

// @keep-sorted
export const webpackProviders = [webpackChunkNameProvider]
