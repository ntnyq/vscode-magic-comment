import { expect, it } from 'vitest'
import { createMagicCommentEngine } from '../src/core'
import type { MagicComment, RegexPattern } from '../src/core'

function rule(
  name: string,
  source: string,
  options: Pick<RegexPattern, 'capture' | 'flags'> = {},
): MagicComment {
  return { name, patterns: [{ kind: 'regex', source, ...options }] }
}

it('uses capture indices after repeated text and Unicode prefixes', () => {
  const engine = createMagicCommentEngine([rule('repeat', 'token (token)')])
  const text = '😀 token token'
  expect(engine.scan(text).matches).toEqual([
    { comment: expect.objectContaining({ name: 'repeat' }), start: 9, end: 14 },
  ])
  expect(engine.scan(text)).toEqual(engine.scan(text))
})

it('isolates invalid regex flags and sources from valid patterns', () => {
  const engine = createMagicCommentEngine([
    rule('broken', '['),
    rule('flags', '(ok)', { capture: 1, flags: 'uv' }),
    rule('duplicate-flags', '(ok)', { capture: 1, flags: 'ii' }),
    rule('valid', '(ok)'),
  ])
  expect(engine.issues.map(issue => issue.code)).toEqual([
    'invalid-regex',
    'invalid-regex',
    'invalid-regex',
  ])
  expect(engine.scan('ok').matches.map(match => match.comment.name)).toEqual([
    'valid',
  ])
})

it('normalizes scanning flags without losing case-insensitive matching', () => {
  const engine = createMagicCommentEngine([
    rule('flags', '(ok)', { capture: 1, flags: 'iy' }),
  ])
  expect(engine.scan('... OK ok').matches).toHaveLength(2)
})

it('handles absent captures and empty matches without blocking other rules', () => {
  const engine = createMagicCommentEngine([
    rule('missing', 'ok'),
    rule('optional', '(missing)?ok'),
    rule('empty', '()', { capture: 1 }),
    rule('lookahead', '(?=(ok))'),
    rule('valid', 'ok', { capture: 0 }),
  ])
  const result = engine.scan('😀 ok')
  expect(result.matches.map(match => match.comment.name)).toEqual(['valid'])
  expect(result.issues.map(issue => issue.code)).toEqual([
    'invalid-capture',
    'invalid-capture',
    'empty-match',
    'empty-match',
  ])
})

it('deduplicates within a rule while retaining different rules and overlaps', () => {
  const engine = createMagicCommentEngine([
    {
      name: 'one',
      patterns: [
        { kind: 'regex', source: '(token)' },
        { kind: 'regex', source: '(token)' },
      ],
    },
    rule('two', '(token)'),
    rule('overlap', '(oken)'),
    rule('one', '(other)'),
  ])
  expect(engine.issues.map(issue => issue.code)).toEqual(['duplicate-name'])
  expect(engine.scan('token').matches.map(match => match.comment.name)).toEqual(
    ['one', 'two', 'overlap'],
  )
})

it('returns no stale matches when text is cleared', () => {
  const engine = createMagicCommentEngine([rule('token', '(token)')])
  expect(engine.scan('token').matches).toHaveLength(1)
  expect(engine.scan('').matches).toEqual([])
})
