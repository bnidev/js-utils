import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getStorage } from '../getStorage'

describe('getStorage', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('should return default if localStorage is undefined', () => {
    expect(getStorage('test', 'default')).toBe('default')
  })

  it('should return parsed JSON value', () => {
    const mockStorage = { getItem: vi.fn((_key: string) => '{"name":"Alice"}') }
    Object.defineProperty(globalThis, 'localStorage', {
      value: mockStorage,
      writable: true
    })
    expect(getStorage('user')).toEqual({ name: 'Alice' })
  })

  it('should return default if key not found', () => {
    const mockStorage = { getItem: vi.fn(() => null) }
    Object.defineProperty(globalThis, 'localStorage', {
      value: mockStorage,
      writable: true
    })
    expect(getStorage('nonexistent', 'default')).toBe('default')
  })

  it('should return null if key not found and no default', () => {
    const mockStorage = { getItem: vi.fn(() => null) }
    Object.defineProperty(globalThis, 'localStorage', {
      value: mockStorage,
      writable: true
    })
    expect(getStorage('nonexistent')).toBeNull()
  })

  it('should return default on parse error', () => {
    const mockStorage = { getItem: vi.fn(() => 'invalid json') }
    Object.defineProperty(globalThis, 'localStorage', {
      value: mockStorage,
      writable: true
    })
    expect(getStorage('test', 'default')).toBe('default')
  })
})
