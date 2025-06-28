import { describe, expect, it, vi } from 'vitest'
import { everyNthCall } from '../everyNthCall'

describe('everyNthCall', () => {
  it('calls the function every Nth time', () => {
    const spy = vi.fn()
    const wrapped = everyNthCall(spy, 3)

    for (let i = 0; i < 9; i++) {
      wrapped()
    }

    expect(spy).toHaveBeenCalledTimes(3)
  })

  it('does not call the function before the Nth time', () => {
    const spy = vi.fn()
    const wrapped = everyNthCall(spy, 5)

    for (let i = 0; i < 4; i++) {
      wrapped()
    }

    expect(spy).not.toHaveBeenCalled()
  })

  it('throws an error if n < 1', () => {
    expect(() => everyNthCall(() => {}, 0)).toThrow()
    expect(() => everyNthCall(() => {}, -2)).toThrow()
  })

  it('throws an error if n is not an integer', () => {
    expect(() => everyNthCall(() => {}, 2.5)).toThrow()
  })
})
