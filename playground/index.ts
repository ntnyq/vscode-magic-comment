import { Worker } from 'node:worker_threads'

export const dynamicOptions = {}

export const worker = new Worker(
  // eslint-disable-next-line jsdoc/no-bad-blocks
  new URL('./workers', import.meta.url /* @vite-ignore */),
  dynamicOptions,
)

// @regexper https://regexper.com/#%2F%5C%2F%5C%2F%5Cs%2B%40perfectionist-group%2F
export const regexp = /\/\/\s+@perfectionist-group/

export const foobar = {
  foo: 'foo',
  // @perfectionist-group
  bar: 'bar',
}
