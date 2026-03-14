import { describe, expect, it } from 'vitest'
import { defaults } from '../defaults'

describe('defaults', () => {
  it('should apply defaults to empty object', () => {
    const target = {}
    const source = { timeout: 5000, retries: 3 }
    expect(defaults(target, source)).toEqual({ timeout: 5000, retries: 3 })
  })

  it('should not override existing values', () => {
    const target = { timeout: 100 }
    const source = { timeout: 5000, retries: 3 }
    expect(defaults(target, source)).toEqual({ timeout: 100, retries: 3 })
  })

  it('should add missing defaults', () => {
    const target = { a: 1 }
    const source = { b: 2, c: 3 }
    expect(defaults(target, source)).toEqual({ a: 1, b: 2, c: 3 })
  })

  it('should not mutate original objects', () => {
    const target = { a: 1 }
    const source = { b: 2 }
    const result = defaults(target, source)
    expect(target).toEqual({ a: 1 })
    expect(source).toEqual({ b: 2 })
    expect(result).toEqual({ a: 1, b: 2 })
  })
})
