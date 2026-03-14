import { describe, expect, it } from 'vitest'
import { kebabCase } from '../kebabCase'

describe('kebabCase', () => {
  it('should convert camelCase', () => {
    expect(kebabCase('helloWorld')).toBe('hello-world')
  })

  it('should convert space-separated words', () => {
    expect(kebabCase('hello world')).toBe('hello-world')
  })

  it('should convert snake_case', () => {
    expect(kebabCase('hello_world')).toBe('hello-world')
  })

  it('should handle already kebab-case', () => {
    expect(kebabCase('hello-world')).toBe('hello-world')
  })

  it('should handle multiple spaces', () => {
    expect(kebabCase('hello  world')).toBe('hello-world')
  })
})
