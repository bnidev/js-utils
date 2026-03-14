import { describe, expect, it } from 'vitest'
import { slugify } from '../slugify'

describe('slugify', () => {
  it('should convert to lowercase', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('should remove special characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world')
  })

  it('should replace spaces with hyphens', () => {
    expect(slugify('hello world')).toBe('hello-world')
  })

  it('should remove leading/trailing hyphens', () => {
    expect(slugify('  hello world  ')).toBe('hello-world')
  })

  it('should handle multiple hyphens', () => {
    expect(slugify('hello   world')).toBe('hello-world')
  })
})
