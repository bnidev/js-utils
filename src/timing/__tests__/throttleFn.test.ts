import { describe, it, expect, vi } from 'vitest'
import { throttleFn } from '../throttleFn'

describe('throttleFn', () => {
  it('should call the function immediately on first call', () => {
    const fn = vi.fn()
    const throttled = throttleFn(fn, 50)
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should not call the function again within the delay', () => {
    const fn = vi.fn()
    const throttled = throttleFn(fn, 50)
    throttled()
    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should call the function again after the delay', async () => {
    const fn = vi.fn()
    const throttled = throttleFn(fn, 30)
    throttled()
    await new Promise((r) => setTimeout(r, 35))
    throttled()
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should pass arguments to the original function', () => {
    const fn = vi.fn()
    const throttled = throttleFn(fn, 50)
    throttled(1, 2, 3)
    expect(fn).toHaveBeenCalledWith(1, 2, 3)
  })
})
