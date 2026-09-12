import { afterEach, describe, expect, it, vi } from 'vitest'
import { getQueryParam } from '../getQueryParam'

describe('getQueryParam', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns the value for an existing key', () => {
    expect(getQueryParam('page', 'https://example.com/?page=2')).toBe('2')
  })

  it('returns null for a missing key', () => {
    expect(getQueryParam('missing', 'https://example.com/?page=2')).toBe(null)
  })

  it('returns the first value for repeated keys', () => {
    expect(getQueryParam('a', 'https://example.com/?a=1&a=2')).toBe('1')
  })

  it('decodes encoded values', () => {
    expect(getQueryParam('q', 'https://example.com/?q=hello%20world')).toBe(
      'hello world'
    )
  })

  it('returns null for unparseable URLs', () => {
    expect(getQueryParam('a', 'not a url')).toBe(null)
    expect(getQueryParam('a', '')).toBe(null)
  })

  it('returns null for non-string inputs', () => {
    // @ts-expect-error testing invalid input
    expect(getQueryParam('a', null)).toBe(null)
    // @ts-expect-error testing invalid input
    expect(getQueryParam('a', 42)).toBe(null)
  })

  it('reads the live location when url is omitted', () => {
    window.history.replaceState(null, '', '/?live=yes')
    expect(getQueryParam('live')).toBe('yes')
  })

  it('returns null without a window (SSR)', () => {
    vi.stubGlobal('window', undefined)
    expect(getQueryParam('a')).toBe(null)
  })
})
