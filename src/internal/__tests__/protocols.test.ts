import { describe, expect, it } from 'vitest'
import { DEFAULT_ALLOWED_PROTOCOLS, isAllowedProtocol } from '../protocols'

describe('protocols', () => {
  it('allows http, https and ftp by default', () => {
    expect([...DEFAULT_ALLOWED_PROTOCOLS]).toEqual(['http:', 'https:', 'ftp:'])
  })

  it('checks membership against the allowed list', () => {
    expect(isAllowedProtocol('https:')).toBe(true)
    expect(isAllowedProtocol('mailto:')).toBe(false)
    expect(isAllowedProtocol('mailto:', ['mailto:'])).toBe(true)
  })
})
