import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    alias: {
      'reactive-vscode': fileURLToPath(
        new URL('./tests/mocks/reactive.ts', import.meta.url),
      ),
      vscode: fileURLToPath(
        new URL('./tests/mocks/vscode.ts', import.meta.url),
      ),
    },
    include: ['tests/**/*.test.ts'],
  },
})
