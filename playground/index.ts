import { Worker } from 'node:worker_threads'

export const worker = new Worker(
  // eslint-disable-next-line jsdoc/no-bad-blocks
  new URL('./workers', import.meta.url /* @vite-ignore */) /* @vite-ignore */,
  {},
)

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
