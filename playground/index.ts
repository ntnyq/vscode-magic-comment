import { Worker } from 'node:worker_threads'

export const worker = new Worker(
  new URL('./workers', import.meta.url /* @vite-ignore */) /* @vite-ignore */,
  {},
)

// @ts-check

export const num = 25

// @ts-expect-error type
num = false

/**
 * @unocss-include
 */

// @unocss-include

export const foobar = {
  foo: 'foo',
  // @perfectionist-group
  bar: 'bar',
}

/**
 * @unocss-include
 *
 *
 */
