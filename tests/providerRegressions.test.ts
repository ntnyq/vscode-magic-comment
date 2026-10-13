import { performance } from 'node:perf_hooks'
import { expect, it } from 'vitest'
import { createMagicCommentEngine } from '../src/core'
import { builtInMagicComments } from '../src/providers'

const engine = createMagicCommentEngine(builtInMagicComments)

it.each([
  ['// cspell:disable', 'cspell-disable', 'cspell:disable'],
  ['// cSPELL:DISABLE', 'cspell-disable', 'cSPELL:DISABLE'],
  [
    '// cSpell: disable-next-line',
    'cspell-disable-next-line',
    'cSpell: disable-next-line',
  ],
  [
    '/* cspell:disable-next-line */',
    'cspell-disable-next-line',
    'cspell:disable-next-line',
  ],
  ['<!-- CSPELL:\tENABLE -->', 'cspell-enable', 'CSPELL:\tENABLE'],
  ['# cspell: disable-line', 'cspell-disable-line', 'cspell: disable-line'],
  [
    '/* spell-checker: disable */',
    'cspell-checker-disable',
    'spell-checker: disable',
  ],
  ['// SPELLCHECKER: enable', 'cspell-checker-enable', 'SPELLCHECKER: enable'],
  [
    '<!-- prettier-ignore-attribute (class) -->',
    'prettier-ignore-attribute',
    'prettier-ignore-attribute',
  ],
  [
    '/* biome-ignore-all lint: generated code */',
    'biome-ignore-all',
    'biome-ignore-all',
  ],
])('annotates complete directives in %s', (text, name, token) => {
  const result = engine.scan(text)
  expect(result.issues).toEqual([])
  expect(
    result.matches.map(match => [
      match.comment.name,
      text.slice(match.start, match.end),
    ]),
  ).toEqual([[name, token]])
})

it.each([' ', '\n', '\r\n'])(
  'annotates combined webpack directives separated by %j',
  separator => {
    const text = `😀 /* webpackChunkName: "chunk",${separator}webpackMode: "lazy",${separator}webpackPrefetch: true */`
    expect(
      engine
        .scan(text)
        .matches.map(match => [
          match.comment.name,
          text.slice(match.start, match.end),
        ]),
    ).toEqual([
      ['webpack-chunk-name', 'webpackChunkName'],
      ['webpack-mode', 'webpackMode'],
      ['webpack-prefetch', 'webpackPrefetch'],
    ])
  },
)

it('finds repeated webpack directives and preserves offsets across comments', () => {
  const text =
    '/* webpackMode: "lazy", webpackMode: "eager" */ 😀 /* webpackMode: "weak" */'
  const matches = engine.scan(text).matches
  expect(matches.map(match => match.start)).toEqual(
    [...text.matchAll(/webpackMode/gu)].map(match => match.index),
  )
  expect(matches.every(match => match.comment.name === 'webpack-mode')).toBe(
    true,
  )
})

it.each([
  '// cspell:disable-extra',
  '// cspell:\ndisable',
  '<!-- prettier-ignore-attribute-extra (class) -->',
  '/* biome-ignore-all-extra lint: reason */',
  'webpackMode: "lazy"',
  '/* unrelated */ webpackMode: "lazy" /* unrelated */',
  '/* webpackModeExtra: "lazy" */',
  '/* webpackMode: "lazy"',
  '/* unrelated */ , webpackMode: "lazy" */',
])('rejects near misses in %s', text => {
  expect(engine.scan(text).matches).toEqual([])
})

it('scans long unterminated built-in comments without quadratic backtracking', () => {
  const start = performance.now()
  for (const token of [
    'webpackChunkName:',
    'stylelint-disable',
    'biome-ignore',
  ]) {
    expect(engine.scan(`/* ${token}${' '.repeat(80_000)}`).matches).toEqual([])
  }
  // Generous headroom for CI; the old patterns take seconds per comment.
  expect(performance.now() - start).toBeLessThan(1000)
})

it.each(['line', 'multiline'] as const)(
  'scans unterminated token declarations with %s trailing content quickly',
  trailing => {
    const custom = createMagicCommentEngine([
      {
        name: 'custom',
        patterns: [
          {
            kind: 'token',
            tokens: ['@custom'],
            syntax: ['block', 'html'],
            trailing,
          },
        ],
      },
    ])
    const start = performance.now()
    for (const opener of ['/*', '<!--']) {
      expect(
        custom.scan(`${opener} @custom${' '.repeat(80_000)}`).matches,
      ).toEqual([])
    }
    expect(performance.now() - start).toBeLessThan(1000)
  },
)
