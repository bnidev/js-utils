import { describe, expect, it } from 'vitest'
import { isPlainObject } from '../isPlainObject'

describe('isPlainObject', () => {
  it('returns true for object literals', () => {
    expect(isPlainObject({})).toBe(true)
    expect(isPlainObject({ a: 1 })).toBe(true)
  })

  it('returns true for objects with null prototype', () => {
    expect(isPlainObject(Object.create(null))).toBe(true)
  })

  it('returns false for arrays', () => {
    expect(isPlainObject([])).toBe(false)
    expect(isPlainObject([1, 2, 3])).toBe(false)
  })

  it('returns false for null and primitives', () => {
    expect(isPlainObject(null)).toBe(false)
    expect(isPlainObject(undefined)).toBe(false)
    expect(isPlainObject('object')).toBe(false)
    expect(isPlainObject(42)).toBe(false)
  })

  it('returns false for built-ins and class instances', () => {
    expect(isPlainObject(new Date())).toBe(false)
    expect(isPlainObject(new Map())).toBe(false)
    expect(isPlainObject(/regex/)).toBe(false)
    class Foo {}
    expect(isPlainObject(new Foo())).toBe(false)
  })

  it('returns false for functions', () => {
    expect(isPlainObject(() => {})).toBe(false)
  })
})
