import { describe, expect, it } from 'vitest'
import { isEqual } from '../isEqual'

describe('isEqual', () => {
  it('returns true for primitive values', () => {
    expect(isEqual(1, 1)).toBe(true)
    expect(isEqual('a', 'a')).toBe(true)
    expect(isEqual(null, null)).toBe(true)
    expect(isEqual(undefined, undefined)).toBe(true)
    expect(isEqual(true, true)).toBe(true)
    expect(isEqual(NaN, NaN)).toBe(true)
    expect(isEqual(0, -0)).toBe(false) // Object.is behavior
  })

  it('returns false for different primitives', () => {
    expect(isEqual(1, 2)).toBe(false)
    expect(isEqual('a', 'b')).toBe(false)
    expect(isEqual(null, undefined)).toBe(false)
  })

  it('returns true for deeply equal objects and arrays', () => {
    expect(isEqual({ a: 1, b: [2, 3] }, { a: 1, b: [2, 3] })).toBe(true)
    expect(isEqual([1, { a: 2 }], [1, { a: 2 }])).toBe(true)
    expect(isEqual({ b: 2, a: 1 }, { a: 1, b: 2 })).toBe(true)
  })

  it('returns false for unequal nested structures', () => {
    expect(isEqual({ a: 1, b: [2, 3] }, { a: 1, b: [3, 2] })).toBe(false)
    expect(isEqual([1, { a: 2 }], [1, { a: 3 }])).toBe(false)
  })

  it('compares functions and symbols by reference', () => {
    const fn = () => {}
    expect(isEqual({ fn }, { fn })).toBe(true)
    expect(isEqual({ fn: () => {} }, { fn: () => {} })).toBe(false)

    const sym = Symbol('x')
    expect(isEqual(sym, sym)).toBe(true)
    expect(isEqual(Symbol('x'), Symbol('x'))).toBe(false)
  })

  it('returns true for equal Sets and Maps', () => {
    expect(isEqual(new Set([1, 2]), new Set([2, 1]))).toBe(true)
    expect(isEqual(new Map([['a', 1]]), new Map([['a', 1]]))).toBe(true)
  })

  it('returns false for unequal Sets and Maps', () => {
    expect(isEqual(new Set([1, 2]), new Set([1, 2, 3]))).toBe(false)
    expect(isEqual(new Map([['a', 1]]), new Map([['a', 2]]))).toBe(false)
  })

  it('returns true for Dates and RegExps with same values', () => {
    expect(isEqual(new Date('2020-01-01'), new Date('2020-01-01'))).toBe(true)
    expect(isEqual(/abc/i, /abc/i)).toBe(true)
    expect(isEqual(/abc/i, /abc/g)).toBe(false)
  })

  it('returns true for empty objects and arrays', () => {
    expect(isEqual({}, {})).toBe(true)
    expect(isEqual([], [])).toBe(true)
  })

  it('returns false for mismatched types', () => {
    expect(isEqual({}, [])).toBe(false)
    expect(isEqual([], {})).toBe(false)
    expect(isEqual(null, {})).toBe(false)
    expect(isEqual(undefined, [])).toBe(false)
  })

  it('returns true for symbol keys in objects', () => {
    const sym = Symbol('a')
    expect(isEqual({ [sym]: 1 }, { [sym]: 1 })).toBe(true)
  })

  it('returns false for objects with same string keys but different symbol keys', () => {
    const sym1 = Symbol('x')
    const sym2 = Symbol('x')
    expect(isEqual({ a: 1, [sym1]: 2 }, { a: 1, [sym2]: 2 })).toBe(false)
  })

  // it('returns false when keys differ but lengths match', () => {
  //   expect(isEqual({ a: 1 }, { b: 1 })).toBe(false)
  //
  //   const sym1 = Symbol('a')
  //   const sym2 = Symbol('b')
  //   const objA = { [sym1]: 1 }
  //   const objB = { [sym2]: 1 }
  //
  //   // Both have 1 symbol key, so aKeys.length === bKeys.length
  //   // But different keys, so line 31 runs
  //   expect(isEqual(objA, objB)).toBe(false)
  // })

  // it('returns false when keys match but values differ (hits both branches)', () => {
  //   // Same keys, different values → goes past includes check
  //   expect(isEqual({ a: 1 }, { a: 2 })).toBe(false)
  // })

  it('returns true when object keys and values match (covers "false" branch of line 31)', () => {
    expect(isEqual({ a: 1 }, { a: 1 })).toBe(true)
  })

  // it('covers both branches of key existence check in loop', () => {
  //   const objA = { a: 1, b: 2 }
  //   const objB = { a: 1 }
  //
  //   // One key matches, one doesn't → loop runs twice:
  //   // - once where key is found → branch false
  //   // - once where key is not found → branch true
  //   expect(isEqual(objA, objB)).toBe(false)
  // })

  it('handles object key presence and value equality correctly', () => {
    const sym1 = Symbol('a')
    const sym2 = Symbol('b')

    // Different keys, same length
    expect(isEqual({ a: 1 }, { b: 1 })).toBe(false)
    expect(isEqual({ [sym1]: 1 }, { [sym2]: 1 })).toBe(false)

    // Same key, different value
    expect(isEqual({ a: 1 }, { a: 2 })).toBe(false)

    // Same key and value
    expect(isEqual({ a: 1 }, { a: 1 })).toBe(true)

    // Keys partially missing
    expect(isEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false)
  })
})
