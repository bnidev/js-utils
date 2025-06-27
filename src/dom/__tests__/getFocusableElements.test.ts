import { describe, expect, it } from 'vitest'
import { getFocusableElements } from '../getFocusableElements'

describe('getFocusableElements', () => {
  it('returns only focusable elements', () => {
    // Create a mock container with various elements
    const container = document.createElement('div')
    container.innerHTML = `
      <a href="#">Link</a>
      <button>Button</button>
      <input type="text" />
      <select><option>Option</option></select>
      <textarea></textarea>
      <div tabindex="0">Tabindex 0</div>
      <div tabindex="-1">Tabindex -1</div>
      <span>Non-focusable</span>
      <button disabled>Disabled</button>
      <input hidden />
      <div style="display: none" tabindex="0">Hidden via display</div>
      <div style="visibility: hidden" tabindex="0">Hidden via visibility</div>
    `

    document.body.appendChild(container)

    const result = getFocusableElements(container)

    // Should return the valid, visible focusable elements
    expect(result).toHaveLength(6)
    expect(result.map((el) => el.tagName.toLowerCase())).toEqual([
      'a',
      'button',
      'input',
      'select',
      'textarea',
      'div'
    ])

    document.body.removeChild(container)
  })

  it('returns an empty array if no focusable elements exist', () => {
    const container = document.createElement('div')
    container.innerHTML = `
      <div>Plain text</div>
      <span>Span</span>
    `

    const result = getFocusableElements(container)
    expect(result).toEqual([])
  })
})
