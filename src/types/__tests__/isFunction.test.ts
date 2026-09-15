import { describe, expect, it } from 'vitest'
import { isFunction } from '../isFunction'

describe('isFunction', () => {
  it('returns true for function declarations and expressions', () => {
    function named() {}
    expect(isFunction(named)).toBe(true)
    expect(
      isFunction(() => {
        // noop
      })
    ).toBe(true)
  })

  it('returns true for async and generator functions', () => {
    async function asyncFn() {}
    function* genFn() {}
    expect(isFunction(asyncFn)).toBe(true)
    expect(isFunction(genFn)).toBe(true)
  })

  it('returns true for classes', () => {
    class Foo {}
    expect(isFunction(Foo)).toBe(true)
  })

  it('returns false for non-functions', () => {
    expect(isFunction(null)).toBe(false)
    expect(isFunction(undefined)).toBe(false)
    expect(isFunction({})).toBe(false)
    expect(isFunction([])).toBe(false)
    expect(isFunction('fn')).toBe(false)
    expect(isFunction(42)).toBe(false)
  })
})
