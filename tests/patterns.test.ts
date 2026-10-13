import { describe, expect, it } from 'vitest'
import { createMagicCommentEngine } from '../src/core'
import type { CommentSyntax, TokenPattern } from '../src/core'
import { builtInMagicComments } from '../src/providers'
import { magicCommentFixtures } from './fixtures/magicComments'

describe('built-in declarations', () => {
  const engine = createMagicCommentEngine(builtInMagicComments)
  it('preserves all 57 rule names and compiles every pattern', () => {
    expect(engine.issues).toEqual([])
    expect(builtInMagicComments).toHaveLength(57)
    expect(builtInMagicComments.map(rule => rule.name).sort()).toEqual(
      [...new Set(magicCommentFixtures.map(fixture => fixture.name))].sort(),
    )
  })
  it.each(magicCommentFixtures)(
    'matches $name in $text',
    ({ name, text, token }) => {
      const result = engine.scan(text)
      expect(result.issues).toEqual([])
      expect(
        result.matches.map(match => [
          match.comment.name,
          text.slice(match.start, match.end),
        ]),
      ).toEqual([[name, token]])
    },
  )
  it.each([
    '// @ts-ignore-extra',
    '// @ts-ignoreSuffix',
    '/* #__PURE__extra */',
    '/* webpackChunkNameExtra: "x" */',
    '//\n@ts-ignore',
  ])('rejects %s', text => {
    expect(engine.scan(text).matches).toEqual([])
  })
  it('keeps trailing reasons and webpack parameters', () => {
    expect(
      engine
        .scan('// @ts-ignore reason\n/* webpackChunkName: "chunk" */')
        .matches.map(match => match.comment.name),
    ).toEqual(['ts-ignore', 'webpack-chunk-name'])
  })
})

describe('literal token patterns', () => {
  function scan(
    text: string,
    syntax: CommentSyntax,
    trailing?: TokenPattern['trailing'],
  ) {
    return createMagicCommentEngine([
      {
        name: 'token',
        patterns: [
          {
            kind: 'token',
            tokens: ['a-b #.*+?[]{}()^$|\\'],
            syntax: [syntax],
            trailing,
          },
        ],
      },
    ]).scan(text)
  }
  it('escapes only regex syntax, including punctuation and spaces', () => {
    expect(scan('/* a-b #.*+?[]{}()^$|\\ */', 'block').matches).toHaveLength(1)
  })
  it('distinguishes no trailing content, same-line content and multiline content', () => {
    const text = '/* a-b #.*+?[]{}()^$|\\ reason\nmore */'
    expect(scan(text, 'block').matches).toEqual([])
    expect(scan(text, 'block', 'line').matches).toEqual([])
    expect(scan(text, 'block', 'multiline').matches).toHaveLength(1)
  })
  it('does not cross a closing delimiter to find a later closer', () => {
    expect(
      scan('/* a-b #.*+?[]{}()^$|\\ */ other */', 'block', 'multiline').matches,
    ).toHaveLength(1)
  })
  it('requires line endings when trailing is none', () => {
    expect(scan('// a-b #.*+?[]{}()^$|\\ reason', 'line').matches).toEqual([])
    expect(scan('// a-b #.*+?[]{}()^$|\\\r\n', 'line').matches).toHaveLength(1)
    expect(
      scan('// a-b #.*+?[]{}()^$|\\ reason', 'line', 'line').matches,
    ).toHaveLength(1)
  })
  it('supports aliases and longest-token matches', () => {
    const engine = createMagicCommentEngine([
      {
        name: 'aliases',
        patterns: [
          {
            kind: 'token',
            tokens: ['token', 'token long'],
            syntax: ['html'],
            trailing: 'multiline',
          },
        ],
      },
    ])
    const text = '<!-- token long\nreason -->'
    const [match] = engine.scan(text).matches
    expect(text.slice(match.start, match.end)).toBe('token long')
  })
})
