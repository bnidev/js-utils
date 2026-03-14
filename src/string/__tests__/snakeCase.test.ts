import { describe, expect, it } from 'vitest'
import { snakeCase } from '../snakeCase'

describe('snakeCase', () => {
  it('should convert camelCase', () => {
    expect(snakeCase('helloWorld')).toBe('hello_world')
  })

  it('should convert space-separated words', () => {
    expect(snakeCase('hello world')).toBe('hello_world')
  })

  it('should convert kebab-case', () => {
    expect(snakeCase('hello-world')).toBe('hello_world')
  })

  it('should handle already snake_case', () => {
    expect(snakeCase('hello_world')).toBe('hello_world')
  })
})
