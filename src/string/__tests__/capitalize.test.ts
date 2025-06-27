import { describe, expect, it } from 'vitest'
import { capitalize } from '../capitalize'

describe('capitalize', () => {
  it('capitalizes the first letter of a lowercase string', () => {
    expect(capitalize('hello')).toBe('Hello')
  })

  it('leaves the first letter capitalized if already uppercase', () => {
    expect(capitalize('World')).toBe('World')
  })

  it('returns an empty string if input is empty', () => {
    expect(capitalize('')).toBe('')
  })

  it('does not modify the rest of the string', () => {
    expect(capitalize('gOODBYE')).toBe('GOODBYE')
  })

  it('handles single-character strings', () => {
    expect(capitalize('a')).toBe('A')
    expect(capitalize('Z')).toBe('Z')
  })
})
