import { beforeEach, describe, expect, it, vi } from 'vitest'
import { setCookie } from '../setCookie'

describe('setCookie', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('should not throw if document is undefined', () => {
    expect(() => setCookie('test', 'value')).not.toThrow()
  })

  it('should set cookie with value', () => {
    let cookieValue = ''
    const doc = {
      set cookie(val: string) {
        cookieValue = val
      },
      get cookie() {
        return ''
      }
    }
    Object.defineProperty(globalThis, 'document', {
      value: doc,
      writable: true
    })
    setCookie('test', 'value')
    expect(cookieValue).toContain('test=value')
  })

  it('should set cookie with expiration', () => {
    let cookieValue = ''
    const doc = {
      set cookie(val: string) {
        cookieValue = val
      },
      get cookie() {
        return ''
      }
    }
    Object.defineProperty(globalThis, 'document', {
      value: doc,
      writable: true
    })
    setCookie('test', 'value', 7)
    expect(cookieValue).toContain('expires=')
    expect(cookieValue).toContain('path=/')
  })
})
