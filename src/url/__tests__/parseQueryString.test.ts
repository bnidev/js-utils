import { describe, expect, it } from 'vitest'
import { parseQueryString } from '../parseQueryString'

describe('parseQueryString', () => {
  it('parses a simple query string', () => {
    expect(parseQueryString('a=1&b=2')).toEqual({ a: '1', b: '2' })
  })

  it('accepts a leading question mark', () => {
    expect(parseQueryString('?a=1&b=2')).toEqual({ a: '1', b: '2' })
  })

  it('collects repeated keys into arrays', () => {
    expect(parseQueryString('a=1&a=2&a=3')).toEqual({ a: ['1', '2', '3'] })
  })

  it('decodes encoded keys and values', () => {
    expect(parseQueryString('q=hello%20world&%24key=%26')).toEqual({
      q: 'hello world',
      $key: '&'
    })
  })

  it('returns an empty object for empty input', () => {
    expect(parseQueryString('')).toEqual({})
    expect(parseQueryString('?')).toEqual({})
  })

  it('returns an empty object for non-string inputs', () => {
    // @ts-expect-error testing invalid input
    expect(parseQueryString(null)).toEqual({})
    // @ts-expect-error testing invalid input
    expect(parseQueryString(undefined)).toEqual({})
  })
})
