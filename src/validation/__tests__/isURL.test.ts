import { describe, expect, it } from 'vitest'
import { isUrl } from '../isUrl'

describe('isUrl', () => {
  it('returns true for valid URLs', () => {
    expect(isUrl('http://example.com')).toBe(true)
    expect(isUrl('https://example.com')).toBe(true)
    expect(isUrl('ftp://example.com/file.txt')).toBe(true)
    expect(isUrl('https://sub.domain.example.com/path?query=string#hash')).toBe(
      true
    )
  })

  it('returns false for invalid URLs', () => {
    expect(isUrl('')).toBe(false)
    expect(isUrl('justastring')).toBe(false)
    expect(isUrl('http:/example.com')).toBe(false)
    expect(isUrl('://missing.scheme.com')).toBe(false)
    expect(isUrl('http://')).toBe(false)
  })

  it('returns false for non-string inputs', () => {
    // @ts-expect-error testing invalid input
    expect(isUrl(null)).toBe(false)
    // @ts-expect-error testing invalid input
    expect(isUrl(undefined)).toBe(false)
    // @ts-expect-error testing invalid input
    expect(isUrl(12345)).toBe(false)
  })

  it('returns false for unsupported protocols', () => {
    expect(isUrl('mailto:user@example.com')).toBe(false)
    expect(isUrl('file:///C:/path/to/file')).toBe(false)
  })

  it('returns false for URLs with empty hostname', () => {
    expect(isUrl('http://')).toBe(false)
  })

  it('returns false for url strings that throw URL constructor', () => {
    // URL constructor throws for empty string and some malformed URLs
    expect(isUrl('')).toBe(false)
    expect(isUrl('ht!tp://bad-url')).toBe(false)
  })

  it('returns false for urls missing "//" after protocol', () => {
    expect(isUrl('http:example.com')).toBe(false)
    expect(isUrl('https:example.com')).toBe(false)
  })
})
