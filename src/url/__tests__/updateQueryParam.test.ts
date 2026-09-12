import { afterEach, describe, expect, it, vi } from 'vitest'
import { updateQueryParam } from '../updateQueryParam'

describe('updateQueryParam', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('adds a param to a URL without a query string', () => {
    expect(updateQueryParam('page', '2', 'https://example.com/list')).toBe(
      'https://example.com/list?page=2'
    )
  })

  it('updates an existing param', () => {
    expect(updateQueryParam('page', '3', 'https://example.com/?page=2')).toBe(
      'https://example.com/?page=3'
    )
  })

  it('removes a param when value is null', () => {
    expect(
      updateQueryParam('page', null, 'https://example.com/?page=2&sort=asc')
    ).toBe('https://example.com/?sort=asc')
  })

  it('preserves path, hash, and other params', () => {
    expect(
      updateQueryParam('b', '2', 'https://example.com/p?a=1&b=0#section')
    ).toBe('https://example.com/p?a=1&b=2#section')
  })

  it('encodes special characters in values', () => {
    expect(updateQueryParam('q', 'a b&c', 'https://example.com/')).toBe(
      'https://example.com/?q=a+b%26c'
    )
  })

  it('returns null for unparseable URLs', () => {
    expect(updateQueryParam('a', '1', 'not a url')).toBe(null)
  })

  it('updates the live location via replaceState when url is omitted', () => {
    window.history.replaceState(null, '', '/start?x=0')
    const entriesBefore = window.history.length
    const updated = updateQueryParam('x', '1')
    expect(updated).toBe('http://localhost:3000/start?x=1')
    expect(window.location.search).toBe('?x=1')
    expect(window.history.length).toBe(entriesBefore)
  })

  it('works as a pure builder without a window (SSR) when url is given', () => {
    vi.stubGlobal('window', undefined)
    expect(updateQueryParam('a', '1', 'https://example.com/')).toBe(
      'https://example.com/?a=1'
    )
  })

  it('returns null without a window (SSR) when url is omitted', () => {
    vi.stubGlobal('window', undefined)
    expect(updateQueryParam('a', '1')).toBe(null)
  })
})
