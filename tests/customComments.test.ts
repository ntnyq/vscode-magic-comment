import { expect, it } from 'vitest'
import { parseCustomComments } from '../src/config/customComments'
import { createMagicCommentEngine } from '../src/core'

it('normalizes both legacy formats and declarations to equivalent matches', () => {
  for (const patterns of [
    '//\\s*(@custom)',
    ['//\\s*(@custom)'],
    [{ kind: 'regex', source: '//\\s*(@custom)' }],
    [{ kind: 'token', tokens: ['@custom'], syntax: ['line'] }],
  ]) {
    const parsed = parseCustomComments([{ name: 'custom', patterns }])
    expect(parsed.issues).toEqual([])
    expect(
      createMagicCommentEngine(parsed.rules).scan('// @custom').matches,
    ).toEqual([
      {
        comment: expect.objectContaining({ name: 'custom' }),
        start: 3,
        end: 10,
      },
    ])
  }
})

it('isolates malformed rules and prevents overrides', () => {
  const result = parseCustomComments(
    [
      null,
      { name: '' },
      { name: 'built-in', patterns: '(a)' },
      { name: 'custom', patterns: '(a)' },
      { name: 'custom', patterns: '(b)' },
      { name: 'mixed', patterns: ['(a)', { kind: 'regex', source: '(b)' }] },
      { name: 'metadata', category: 12, patterns: '(a)' },
      {
        name: 'partial',
        patterns: [
          { kind: 'token', tokens: [], syntax: ['line'] },
          { kind: 'regex', source: '(b)' },
        ],
      },
    ],
    ['built-in'],
  )
  expect(result.rules.map(rule => rule.name)).toEqual(['custom', 'partial'])
  expect(result.issues).toHaveLength(7)
})

it.each([null, {}, 'pattern', 123])(
  'rejects invalid configuration %j',
  input => {
    expect(parseCustomComments(input).issues).toHaveLength(1)
  },
)

it.each([
  { kind: 'token', tokens: [''], syntax: ['line'] },
  { kind: 'token', tokens: ['token'], syntax: ['unknown'] },
  { kind: 'token', tokens: ['token'], syntax: ['line'], trailing: true },
  { kind: 'regex', source: '(a)', capture: -1 },
  { kind: 'regex', source: '(a)', capture: 1.5 },
  { kind: 'regex', source: '(a)', flags: 12 },
  {
    kind: 'token',
    tokens: ['token'],
    syntax: ['line'],
    trailing: { toString: 'line' },
  },
])('rejects invalid pattern %j', pattern => {
  const result = parseCustomComments([{ name: 'invalid', patterns: [pattern] }])
  expect(result.rules).toEqual([])
  expect(result.issues).toHaveLength(1)
})
