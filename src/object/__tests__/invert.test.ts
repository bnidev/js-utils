import { describe, expect, it } from 'vitest'
import { invert } from '../invert'

describe('invert', () => {
  it('should invert an object with string values', () => {
    const obj = { a: '1', b: '2', c: '3' }
    expect(invert(obj)).toEqual({ '1': 'a', '2': 'b', '3': 'c' })
  })

  it('should invert an object with number values', () => {
    const obj = { a: 1, b: 2, c: 3 }
    expect(invert(obj)).toEqual({ '1': 'a', '2': 'b', '3': 'c' })
  })

  it('should handle string keys', () => {
    const obj = { foo: 'bar', baz: 'qux' }
    expect(invert(obj)).toEqual({ bar: 'foo', qux: 'baz' })
  })
})
