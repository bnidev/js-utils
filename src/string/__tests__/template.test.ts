import { describe, expect, it } from 'vitest'
import { template } from '../template'

describe('template', () => {
  it('should replace single placeholder', () => {
    expect(template('Hello {{name}}!', { name: 'World' })).toBe('Hello World!')
  })

  it('should replace multiple placeholders', () => {
    expect(
      template('{{greeting}} {{name}}', { greeting: 'Hi', name: 'Alice' })
    ).toBe('Hi Alice')
  })

  it('should leave unmatched placeholders', () => {
    expect(template('Hello {{name}}!', {})).toBe('Hello !')
  })

  it('should handle multiple same placeholder', () => {
    expect(template('{{word}} {{word}}', { word: 'hi' })).toBe('hi hi')
  })
})
