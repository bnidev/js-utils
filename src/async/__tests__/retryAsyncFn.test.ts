import { describe, expect, it, vi } from 'vitest'
import { retryAsyncFn } from '../retryAsyncFn'

describe('retryAsyncFn', () => {
  it('resolves immediately if fn succeeds on first try', async () => {
    const fn = vi.fn().mockResolvedValue('success')
    const result = await retryAsyncFn(fn)
    expect(result).toBe('success')
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('retries the function until it succeeds', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error('fail1'))
      .mockRejectedValueOnce(new Error('fail2'))
      .mockResolvedValue('success')

    const result = await retryAsyncFn(fn, 5, 10)
    expect(result).toBe('success')
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('throws the last error after all retries fail', async () => {
    const error = new Error('always fails')
    const fn = vi.fn().mockRejectedValue(error)

    await expect(retryAsyncFn(fn, 3, 10)).rejects.toThrow('always fails')
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('waits between retries', async () => {
    const sleepSpy = vi.spyOn(global, 'setTimeout')
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue('success')

    const delay = 50
    const result = await retryAsyncFn(fn, 3, delay)
    expect(result).toBe('success')
    expect(fn).toHaveBeenCalledTimes(2)

    // There should be at least one call to setTimeout with the delay
    expect(sleepSpy).toHaveBeenCalled()
    const calledWithDelay = sleepSpy.mock.calls.some(
      (args) => args[1] === delay
    )
    expect(calledWithDelay).toBe(true)

    sleepSpy.mockRestore()
  })

  it('uses default retries and delay when not provided', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue('success')

    const result = await retryAsyncFn(fn)
    expect(result).toBe('success')
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
