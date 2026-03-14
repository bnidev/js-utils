import { describe, expect, it } from 'vitest'
import { setNestedValue } from '../setNestedValue'

describe('setNestedValue', () => {
  it('should set a value at nested path', () => {
    const obj = { a: { b: 1 } }
    const result = setNestedValue(obj, 'a.c', 2)
    expect(result).toEqual({ a: { b: 1, c: 2 } })
  })

  it('should create nested path if not exists', () => {
    const obj = { a: 1 }
    const result = setNestedValue(obj, 'b.c.d', 2)
    expect(result).toEqual({ a: 1, b: { c: { d: 2 } } })
  })

  it('should set value at top level', () => {
    const obj = { a: 1 }
    const result = setNestedValue(obj, 'b', 2)
    expect(result).toEqual({ a: 1, b: 2 })
  })

  it('should not mutate original object', () => {
    const obj = { a: { b: 1 } }
    const result = setNestedValue(obj, 'a.c', 2)
    expect(obj).toEqual({ a: { b: 1 } })
    expect(result).toEqual({ a: { b: 1, c: 2 } })
  })
})
