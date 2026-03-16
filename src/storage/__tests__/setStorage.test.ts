import { beforeEach, describe, expect, it, vi } from 'vitest'
import { setStorage } from '../setStorage'

describe('setStorage', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('should not throw if localStorage is undefined', () => {
    expect(() => setStorage('test', 'value')).not.toThrow()
  })

  it('should set item in localStorage', () => {
    const mockSetItem = vi.fn()
    Object.defineProperty(globalThis, 'localStorage', {
      value: { setItem: mockSetItem },
      writable: true
    })
    setStorage('user', { name: 'Alice' })
    expect(mockSetItem).toHaveBeenCalledWith('user', '{"name":"Alice"}')
  })

  it('should stringify primitives', () => {
    const mockSetItem = vi.fn()
    Object.defineProperty(globalThis, 'localStorage', {
      value: { setItem: mockSetItem },
      writable: true
    })
    setStorage('count', 42)
    expect(mockSetItem).toHaveBeenCalledWith('count', '42')
  })
})
