import { describe, expect, it, vi } from 'vitest'
import { mapValues } from '../mapValues'

describe('mapValues', () => {
  it('transforms string values to their lengths', () => {
    const input = { a: 'apple', b: 'banana', c: 'cherry' }
    const result = mapValues(input, (value) => value.length)
    expect(result).toEqual({ a: 5, b: 6, c: 6 })
  })

  it('transforms values to uppercase using key', () => {
    const input = { x: 'hello', y: 'world' }
    const result = mapValues(
      input,
      (value, key) => `${key.toUpperCase()}:${value.toUpperCase()}`
    )
    expect(result).toEqual({ x: 'X:HELLO', y: 'Y:WORLD' })
  })

  it('handles empty objects', () => {
    const input = {}
    const result = mapValues(input, () => 'test')
    expect(result).toEqual({})
  })

  it('only maps own properties, not inherited ones', () => {
    const base = { inherited: 1 }
    const input = Object.create(base)
    input.own = 2

    const result = mapValues(input, (value) => value * 2)
    expect(result).toEqual({ own: 4 })
    expect('inherited' in result).toBe(false)
  })

  it('preserves key types correctly', () => {
    const input = { a: 1, b: 2 } as const
    const result = mapValues(input, (v) => v.toString())
    expect(result).toEqual({ a: '1', b: '2' })
  })

  it('calls function with correct arguments', () => {
    const input = { foo: 42, bar: 99 }
    const spy = vi.fn((value, key) => `${key}:${value}`)
    const result = mapValues(input, spy)

    expect(spy).toHaveBeenCalledTimes(2)
    expect(spy).toHaveBeenCalledWith(42, 'foo')
    expect(spy).toHaveBeenCalledWith(99, 'bar')
    expect(result).toEqual({ foo: 'foo:42', bar: 'bar:99' })
  })
})
