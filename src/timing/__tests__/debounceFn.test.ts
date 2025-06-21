import { describe, expect, it, vi } from 'vitest'
import { debounceFn } from '../debounceFn'

describe('debounceFn', () => {
  it('should delay function execution', async () => {
    const fn = vi.fn()
    const debounced = debounceFn(fn, 50)

    debounced()
    expect(fn).not.toHaveBeenCalled()

    await new Promise((r) => setTimeout(r, 60))
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should only call the function once if called repeatedly within delay', async () => {
    const fn = vi.fn()
    const debounced = debounceFn(fn, 50)

    debounced()
    setTimeout(debounced, 20)
    setTimeout(debounced, 40)

    await new Promise((r) => setTimeout(r, 100))
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should pass arguments', async () => {
    const fn = vi.fn((...args: unknown[]) => {
      expect(args[0]).toBe(7)
    })
    const debounced = debounceFn(fn, 10)
    debounced(7)
    await new Promise((r) => setTimeout(r, 20))
    expect(fn).toHaveBeenCalledWith(7)
  })
})
