import { describe, expect, it } from 'vitest'
import { deepClone } from '../deepClone'

describe('deepClone', () => {
  it('clones primitive values', () => {
    expect(deepClone(42)).toBe(42)
    expect(deepClone('hello')).toBe('hello')
    expect(deepClone(null)).toBeNull()
    expect(deepClone(undefined)).toBeUndefined()
    expect(deepClone(true)).toBe(true)
  })

  it('clones arrays deeply', () => {
    const arr = [1, [2, 3], { a: 4 }]
    const cloned = deepClone(arr)
    expect(cloned).toEqual(arr)
    expect(cloned).not.toBe(arr)
    expect(cloned[1]).not.toBe(arr[1])
    expect(cloned[2]).not.toBe(arr[2])
  })

  it('clones objects deeply', () => {
    const obj = { a: 1, b: { c: 2, d: [3, 4] } }
    const cloned = deepClone(obj)
    expect(cloned).toEqual(obj)
    expect(cloned).not.toBe(obj)
    expect(cloned.b).not.toBe(obj.b)
    expect(cloned.b.d).not.toBe(obj.b.d)
  })

  it('modifying clone does not affect original', () => {
    const original = { x: { y: 1 } }
    const clone = deepClone(original)
    clone.x.y = 2
    expect(original.x.y).toBe(1)
  })
})
