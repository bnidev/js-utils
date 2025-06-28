import { describe, expect, it } from 'vitest'
import { omit } from '../omit'

describe('omit', () => {
  it('removes a single specified key from an object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = omit(obj, ['b'])
    expect(result).toEqual({ a: 1, c: 3 })
  })

  it('removes multiple specified keys from an object', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 }
    const result = omit(obj, ['a', 'd'])
    expect(result).toEqual({ b: 2, c: 3 })
  })

  it('returns the original object when no keys are omitted', () => {
    const obj = { a: 1, b: 2 }
    const result = omit(obj, [])
    expect(result).toEqual({ a: 1, b: 2 })
  })

  it('returns a new object and does not mutate the original', () => {
    const obj = { x: 10, y: 20 }
    const result = omit(obj, ['y'])

    expect(result).toEqual({ x: 10 })
    expect(obj).toEqual({ x: 10, y: 20 }) // original should remain unchanged
  })

  it('ignores keys that do not exist on the object', () => {
    const obj = { name: 'Alice', age: 30 }
    const result = omit(obj, ['nonexistent' as keyof typeof obj])
    expect(result).toEqual(obj)
  })
})
