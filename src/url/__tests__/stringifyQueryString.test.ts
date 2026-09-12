import { describe, expect, it } from 'vitest'
import { parseQueryString } from '../parseQueryString'
import { stringifyQueryString } from '../stringifyQueryString'

describe('stringifyQueryString', () => {
  it('stringifies a simple object', () => {
    expect(stringifyQueryString({ a: '1', b: '2' })).toBe('a=1&b=2')
  })

  it('expands arrays into repeated keys', () => {
    expect(stringifyQueryString({ a: ['1', '2'] })).toBe('a=1&a=2')
  })

  it('stringifies numbers and booleans', () => {
    expect(stringifyQueryString({ n: 42, flag: true })).toBe('n=42&flag=true')
  })

  it('skips null and undefined values', () => {
    expect(stringifyQueryString({ a: '1', b: null, c: undefined })).toBe('a=1')
  })

  it('encodes special characters', () => {
    expect(stringifyQueryString({ q: 'hello world&more' })).toBe(
      'q=hello+world%26more'
    )
  })

  it('returns an empty string for empty input', () => {
    expect(stringifyQueryString({})).toBe('')
  })

  it('returns an empty string for non-object inputs', () => {
    // @ts-expect-error testing invalid input
    expect(stringifyQueryString(null)).toBe('')
    // @ts-expect-error testing invalid input
    expect(stringifyQueryString('a=1')).toBe('')
  })

  it('round-trips through parseQueryString', () => {
    const params = { a: ['1', '2'], b: 'x y', n: 7 }
    expect(parseQueryString(stringifyQueryString(params))).toEqual({
      a: ['1', '2'],
      b: 'x y',
      n: '7'
    })
  })
})
