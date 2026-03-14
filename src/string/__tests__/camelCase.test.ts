import { describe, expect, it } from 'vitest'
import { camelCase } from '../camelCase'

describe('camelCase', () => {
  it('should convert space-separated words', () => {
    expect(camelCase('hello world')).toBe('helloWorld')
  })

  it('should convert kebab-case', () => {
    expect(camelCase('hello-world')).toBe('helloWorld')
  })

  it('should convert snake_case', () => {
    expect(camelCase('hello_world')).toBe('helloWorld')
  })

  it('should handle already camelCase', () => {
    expect(camelCase('helloWorld')).toBe('helloWorld')
  })

  it('should handle multiple spaces', () => {
    expect(camelCase('hello  world')).toBe('helloWorld')
  })
})
