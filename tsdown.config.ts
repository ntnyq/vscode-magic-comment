import process from 'node:process'
import { defineConfig } from 'tsdown'
import pkg from './package.json' with { type: 'json' }

const isDev = () => process.env.NODE_ENV === 'development'

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  minify: !isDev(),
  platform: 'node',
  shims: true,
  sourcemap: isDev(),
  watch: isDev(),
  deps: {
    onlyAllowBundle: [
      '@reactive-vscode/reactivity',
      'reactive-vscode',
      '@ntnyq/utils',
    ],
    neverBundle: ['vscode'],
    alwaysBundle: Object.keys(pkg.dependencies),
  },
})
