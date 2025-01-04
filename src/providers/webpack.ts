import { defineMagicComment } from '../utils/define'

const webpackChunkNameProvider = defineMagicComment({
  name: 'webpack-chunk-name',
  description: `webpack-chunk-name`,
  patterns: /\/\*\s*webpackChunkName\s*\*\//,
  category: 'webpack',
})

// @keep-sorted
export const webpackProviders = [webpackChunkNameProvider]
