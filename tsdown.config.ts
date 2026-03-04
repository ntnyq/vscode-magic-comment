import process from 'node:process'
import { defineConfig } from 'tsdown'
import pkg from './package.json' with { type: 'json' }

const isDev = () => process.env.NODE_ENV === 'development'

export default defineConfig({
  clean: true,
  deps: {
    alwaysBundle: Object.keys(pkg.dependencies),
    neverBundle: ['vscode'],
    onlyBundle: [
      '@reactive-vscode/reactivity',
      'reactive-vscode',
      '@ntnyq/utils',
    ],
  },
  entry: ['src/index.ts'],
  minify: !isDev(),
  platform: 'node',
  shims: true,
  sourcemap: isDev(),
  watch: isDev(),
})
