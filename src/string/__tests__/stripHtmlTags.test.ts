import { describe, expect, it } from 'vitest'
import { stripHtmlTags } from '../stripHtmlTags'

describe('stripHtmlTags', () => {
  it('removes simple HTML tags', () => {
    expect(stripHtmlTags('<p>Hello <strong>World</strong></p>')).toBe(
      'Hello World'
    )
  })

  it('removes self-closing tags', () => {
    expect(stripHtmlTags('Hello<br/>World')).toBe('HelloWorld')
  })

  it('returns empty string if input is empty', () => {
    expect(stripHtmlTags('')).toBe('')
  })

  it('returns the same string if no HTML tags present', () => {
    expect(stripHtmlTags('Just plain text')).toBe('Just plain text')
  })

  it('removes nested HTML tags', () => {
    expect(stripHtmlTags('<div><p>Nested <em>tags</em></p></div>')).toBe(
      'Nested tags'
    )
  })

  it('handles attributes inside tags', () => {
    expect(stripHtmlTags('<a href="https://example.com">Link</a>')).toBe('Link')
  })

  it('handles multiple tags with spaces', () => {
    expect(stripHtmlTags('This is <b>bold</b> and <i>italic</i> text.')).toBe(
      'This is bold and italic text.'
    )
  })
})
