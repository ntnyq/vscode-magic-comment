import { defineMagicComment } from '../utils/define'

const webpackChunkNameProvider = defineMagicComment({
  name: 'webpack-chunk-name',
  description: `webpack-chunk-name`,
  pattern: /\/\*\s*webpackChunkName\s*\*\//,
  category: 'webpack',
  languages: ['javascript', 'typescript', 'javascriptreact', 'typescriptreact'],
})

// @keep-sorted
export const webpackProviders = [webpackChunkNameProvider]
