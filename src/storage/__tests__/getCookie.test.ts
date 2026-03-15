import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getCookie } from '../getCookie'

describe('getCookie', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('should return null if document is undefined', () => {
    expect(getCookie('test')).toBeNull()
  })

  it('should return cookie value if found', () => {
    Object.defineProperty(globalThis, 'document', {
      value: { cookie: 'session=abc123; user=alice' },
      writable: true
    })
    expect(getCookie('session')).toBe('abc123')
  })

  it('should return null if cookie not found', () => {
    Object.defineProperty(globalThis, 'document', {
      value: { cookie: 'session=abc123' },
      writable: true
    })
    expect(getCookie('nonexistent')).toBeNull()
  })

  it('should decode URI component', () => {
    Object.defineProperty(globalThis, 'document', {
      value: { cookie: 'test=hello%20world' },
      writable: true
    })
    expect(getCookie('test')).toBe('hello world')
  })
})
