import { describe, expect, it } from 'vitest'
import { pick } from '../pick'

describe('pick', () => {
  it('returns a new object with only the specified keys', () => {
    const user = { id: 1, name: 'Alice', age: 30 }
    const result = pick(user, ['id', 'name'])
    expect(result).toEqual({ id: 1, name: 'Alice' })
  })

  it('returns an empty object if no keys are specified', () => {
    const obj = { a: 1, b: 2 }
    const result = pick(obj, [])
    expect(result).toEqual({})
  })

  it('ignores keys that are not in the object', () => {
    const obj = { foo: 'bar', baz: 42 }
    const result = pick(obj, ['foo', 'notReal' as keyof typeof obj])
    expect(result).toEqual({ foo: 'bar' })
  })

  it('does not mutate the original object', () => {
    const original = { x: 10, y: 20 }
    const result = pick(original, ['x'])
    expect(result).toEqual({ x: 10 })
    expect(original).toEqual({ x: 10, y: 20 })
  })
})
