import { describe, expect, it } from 'vitest'
import { merge } from '../merge'

describe('merge', () => {
  it('should merge two objects', () => {
    const obj1 = { a: 1, b: 2 }
    const obj2 = { b: 3, c: 4 }
    expect(merge(obj1, obj2)).toEqual({ a: 1, b: 3, c: 4 })
  })

  it('should deep merge nested objects', () => {
    const obj1 = { a: { b: 1, c: 2 } }
    const obj2 = { a: { c: 3, d: 4 } }
    expect(merge(obj1, obj2)).toEqual({ a: { b: 1, c: 3, d: 4 } })
  })

  it('should handle multiple sources', () => {
    const obj1 = { a: 1 }
    const obj2 = { b: 2 }
    const obj3 = { c: 3 }
    expect(merge(obj1, obj2, obj3)).toEqual({ a: 1, b: 2, c: 3 })
  })

  it('should not mutate original objects', () => {
    const obj1 = { a: { b: 1 } }
    const obj2 = { a: { c: 2 } }
    const result = merge(obj1, obj2)
    expect(obj1).toEqual({ a: { b: 1 } })
    expect(obj2).toEqual({ a: { c: 2 } })
    expect(result).toEqual({ a: { b: 1, c: 2 } })
  })

  it('should skip non-object sources', () => {
    const obj = { a: 1 }
    expect(merge(obj, null, undefined, { b: 2 })).toEqual({
      a: 1,
      b: 2
    })
  })
})
