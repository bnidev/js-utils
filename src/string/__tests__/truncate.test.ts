import { describe, expect, it } from 'vitest'
import { truncate } from '../truncate'

describe('truncate', () => {
  it('does not truncate if string is shorter than maxLength', () => {
    expect(truncate('Hello', 10)).toBe('Hello')
  })

  it('truncates and appends default suffix', () => {
    expect(truncate('Hello World', 8)).toBe('Hello...')
  })

  it('truncates and appends custom suffix', () => {
    expect(truncate('Hello World', 5, '~~')).toBe('Hel~~')
  })

  it('returns full string if maxLength equals string length', () => {
    expect(truncate('Hello', 5)).toBe('Hello')
  })

  it('handles maxLength less than or equal to suffix length', () => {
    expect(truncate('Hello World', 2)).toBe('He')
    expect(truncate('Hello World', 3, '>>>')).toBe('Hel')
  })

  it('handles empty string input', () => {
    expect(truncate('', 5)).toBe('')
  })

  it('handles zero maxLength', () => {
    expect(truncate('Hello', 0)).toBe('')
  })
})
