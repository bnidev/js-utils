import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { timeoutAsyncFn } from '../timeoutAsyncFn'

describe('timeoutAsyncFn', () => {
  let originalClearTimeout: typeof globalThis.clearTimeout
  let timeoutCleared: boolean

  beforeEach(() => {
    timeoutCleared = false
    originalClearTimeout = globalThis.clearTimeout
    vi.stubGlobal(
      'clearTimeout',
      (timer: Parameters<typeof clearTimeout>[0]) => {
        timeoutCleared = true
        return originalClearTimeout(timer)
      }
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('resolves if the original promise resolves before timeout', async () => {
    const promise = new Promise<string>((resolve) =>
      setTimeout(() => resolve('done'), 50)
    )
    const result = await timeoutAsyncFn(promise, 100)
    expect(result).toBe('done')
  })

  it('rejects with "Timeout" error if the original promise takes too long', async () => {
    const promise = new Promise<string>((resolve) =>
      setTimeout(() => resolve('done'), 200)
    )
    await expect(timeoutAsyncFn(promise, 100)).rejects.toThrow('Timeout')
  })

  it('rejects if the original promise rejects before timeout', async () => {
    const promise = new Promise<string>((_, reject) =>
      setTimeout(() => reject(new Error('fail')), 50)
    )
    await expect(timeoutAsyncFn(promise, 100)).rejects.toThrow('fail')
  })

  it('clears the timeout when promise settles', async () => {
    const promise = Promise.resolve('done')
    const result = await timeoutAsyncFn(promise, 100)
    expect(result).toBe('done')
    expect(timeoutCleared).toBe(true)
  })
})
