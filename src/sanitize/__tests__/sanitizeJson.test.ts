import { describe, expect, it } from 'vitest'
import { sanitizeJson } from '../sanitizeJson'

type Person = { name: string }

function isPerson(obj: unknown): obj is Person {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'name' in obj &&
    typeof (obj as Record<string, unknown>).name === 'string'
  )
}

describe('sanitizeJson', () => {
  it('parses valid JSON without validation', () => {
    const input = '{"foo": "bar"}'
    const result = sanitizeJson(input)

    expect(result.success).toBe(true)
    expect(result.value).toEqual({ foo: 'bar' })
    expect(result.error).toBeUndefined()
  })

  it('returns error on invalid JSON', () => {
    const input = '{"foo": "bar"'
    const result = sanitizeJson(input)

    expect(result.success).toBe(false)
    expect(result.value).toBeNull()
    expect(result.error).toBeInstanceOf(Error)
    expect(typeof result.error?.message).toBe('string')
  })

  it('validates object when validator is provided and passes', () => {
    const input = '{"name": "Alice"}'
    const result = sanitizeJson<Person>(input, isPerson)

    expect(result.success).toBe(true)
    expect(result.value).toEqual({ name: 'Alice' })
  })

  it('returns error when validation fails', () => {
    const input = '{"name": 42}'
    const result = sanitizeJson<Person>(input, isPerson)

    expect(result.success).toBe(false)
    expect(result.value).toBeNull()
    expect(result.error?.message).toBe('Validation failed')
  })

  it('returns unknown error for non-Error throw', () => {
    // mock JSON.parse to throw a non-Error
    const originalParse = JSON.parse
    JSON.parse = () => {
      throw 'non-error string'
    }

    const result = sanitizeJson('{"test": true}')
    expect(result.success).toBe(false)
    expect(result.error).toBeInstanceOf(Error)
    expect(result.error?.message).toBe('Unknown JSON parsing error')

    JSON.parse = originalParse
  })
})
