import { describe, expect, it } from 'vitest'
import { sanitizeUrl } from '../sanitizeUrl'

describe('sanitizeUrl', () => {
  it('returns success and normalized URL for valid http URL', () => {
    const result = sanitizeUrl('http://example.com')
    expect(result.success).toBe(true)
    expect(result.value).toBe('http://example.com/')
    expect(result.error).toBeUndefined()
  })

  it('rejects disallowed protocol by default', () => {
    const result = sanitizeUrl('mailto:user@example.com')
    expect(result.success).toBe(false)
    expect(result.value).toBeNull()
    expect(result.error).toBeInstanceOf(Error)
    expect(result.error?.message).toMatch(/Disallowed protocol/)
  })

  it('accepts custom allowed protocols', () => {
    const result = sanitizeUrl('mailto:user@example.com', {
      allowedProtocols: ['mailto:', 'http:']
    })
    expect(result.success).toBe(true)
    expect(result.value).toBe('mailto:user@example.com')
    expect(result.error).toBeUndefined()
  })

  it('returns original input when normalize option is false', () => {
    const result = sanitizeUrl('http://example.com', { normalize: false })
    expect(result.success).toBe(true)
    expect(result.value).toBe('http://example.com')
  })

  it('returns error for invalid URL string', () => {
    const result = sanitizeUrl('not-a-url')
    expect(result.success).toBe(false)
    expect(result.value).toBeNull()
    expect(result.error).toBeInstanceOf(Error)
    expect(result.error?.message).toMatch(/Invalid URL/)
  })

  it('handles non-Error exceptions gracefully', () => {
    const OriginalURL = globalThis.URL

    globalThis.URL = class {
      constructor() {
        throw 'some string error'
      }
    } as unknown as typeof URL

    const result = sanitizeUrl('http://example.com')

    expect(result.success).toBe(false)
    expect(result.value).toBeNull()
    expect(result.error).toBeInstanceOf(Error)
    expect(result.error?.message).toBe('Invalid URL')

    globalThis.URL = OriginalURL
  })
})
