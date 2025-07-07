import { describe, expect, it } from 'vitest'
import { sanitizeHtml } from '../sanitizeHtml'

describe('sanitizeHtml', () => {
  it('preserves allowed tags and content', () => {
    const input = '<p>Hello <strong>World</strong></p>'
    const output = sanitizeHtml(input)
    expect(output).toBe('<p>Hello <strong>World</strong></p>')
  })

  it('removes disallowed tags but preserves inner content', () => {
    const input = '<script>alert("XSS")</script><p>Safe</p>'
    const output = sanitizeHtml(input)
    expect(output).toBe('alert("XSS")<p>Safe</p>')
  })

  it('removes disallowed attributes', () => {
    const input = '<p style="color: red;" onclick="alert(1)">Hello</p>'
    const output = sanitizeHtml(input)
    expect(output).toBe('<p>Hello</p>')
  })

  it('preserves allowed attributes on allowed tags', () => {
    const input = '<a href="https://example.com" target="_blank">Link</a>'
    const output = sanitizeHtml(input)
    expect(output).toBe(
      '<a href="https://example.com" target="_blank">Link</a>'
    )
  })

  it('removes dangerous javascript: hrefs', () => {
    const input = '<a href="javascript:alert(1)">Click me</a>'
    const output = sanitizeHtml(input)
    expect(output).toBe('<a>Click me</a>')
  })

  it('removes dangerous data: URIs', () => {
    const input = '<a href="data:text/html;base64,...">Click me</a>'
    const output = sanitizeHtml(input)
    expect(output).toBe('<a>Click me</a>')
  })

  it('allows custom tags and attributes if provided', () => {
    const input = '<custom-el data-id="123">Test</custom-el>'
    const output = sanitizeHtml(input, ['custom-el'], {
      'custom-el': ['data-id']
    })
    expect(output).toBe('<custom-el data-id="123">Test</custom-el>')
  })

  it('unwraps unknown custom elements if not allowed', () => {
    const input = '<my-tag><b>Bold</b></my-tag>'
    const output = sanitizeHtml(input)
    expect(output).toBe('<b>Bold</b>')
  })

  it('is case-insensitive for tag and attribute matching', () => {
    const input = '<A HREF="https://example.com" TARGET="_blank">Link</A>'
    const output = sanitizeHtml(input)
    expect(output).toBe(
      '<a href="https://example.com" target="_blank">Link</a>'
    )
  })

  it('unwraps nested disallowed tags correctly', () => {
    const input = '<div><span><script>alert(1)</script></span></div>'
    const output = sanitizeHtml(input)
    expect(output).toBe('alert(1)')
  })
})
