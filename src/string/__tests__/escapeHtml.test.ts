import { describe, expect, it } from 'vitest'
import { escapeHtml } from '../escapeHtml'

describe('escapeHtml', () => {
  it('escapes special HTML characters', () => {
    const input = `<div class="test">Hello & welcome!</div>`
    const expected = `&lt;div class=&quot;test&quot;&gt;Hello &amp; welcome!&lt;/div&gt;`
    expect(escapeHtml(input)).toBe(expected)
  })

  it('returns empty string unchanged', () => {
    expect(escapeHtml('')).toBe('')
  })

  it('does not alter string without special chars', () => {
    expect(escapeHtml('Hello World')).toBe('Hello World')
  })

  it('escapes single quotes correctly', () => {
    const input = "It's a test"
    const expected = `It&#39;s a test`
    expect(escapeHtml(input)).toBe(expected)
  })

  it('handles string with multiple special chars', () => {
    const input = `& < > " '`
    const expected = `&amp; &lt; &gt; &quot; &#39;`
    expect(escapeHtml(input)).toBe(expected)
  })
})
