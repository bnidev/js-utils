import { describe, expect, it } from 'vitest'
import { getNestedValue } from '../getNestedValue'

describe('getNestedValue', () => {
  const data = {
    user: {
      profile: {
        name: 'John Doe',
        age: 30,
        address: null
      }
    }
  }

  it('retrieves a deeply nested existing value', () => {
    const result = getNestedValue(data, 'user.profile.name')
    expect(result).toBe('John Doe')
  })

  it('returns undefined for a missing nested value when no fallback is provided', () => {
    const result = getNestedValue(data, 'user.profile.email')
    expect(result).toBeUndefined()
  })

  it('returns fallback for a missing nested value when fallback is provided', () => {
    const result = getNestedValue(data, 'user.profile.email', 'No email')
    expect(result).toBe('No email')
  })

  it('returns fallback for a null value', () => {
    const result = getNestedValue(data, 'user.profile.address', 'No address')
    expect(result).toBe('No address')
  })

  it('returns value if found, even if fallback is provided', () => {
    const result = getNestedValue(data, 'user.profile.age', 99)
    expect(result).toBe(30)
  })

  it('returns fallback if path is completely invalid', () => {
    const result = getNestedValue(data, 'company.location.city', 'Unknown')
    expect(result).toBe('Unknown')
  })

  it('returns the entire object when path is empty', () => {
    const result = getNestedValue(data, '', 'default')
    expect(result).toEqual(data)
  })

  it('handles non-object intermediate values gracefully', () => {
    const input = { foo: 'bar' }
    const result = getNestedValue(input, 'foo.bar.baz', 'fallback')
    expect(result).toBe('fallback')
  })

  it('works with numeric keys in objects', () => {
    const input = { arr: { 0: { name: 'Item 0' } } }
    const result = getNestedValue(input, 'arr.0.name')
    expect(result).toBe('Item 0')
  })
})
