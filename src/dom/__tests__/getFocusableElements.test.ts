import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { getFocusableElements } from '../getFocusableElements'

describe('getFocusableElements', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    container.id = 'test-container'
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
  })

  afterEach(() => {
    container.remove()
  })

  it('returns only visible, enabled focusable elements from an HTMLElement', () => {
    const result = getFocusableElements(container)

    expect(result).toHaveLength(6)
    expect(result.map((el) => el.tagName.toLowerCase())).toEqual([
      'a',
      'button',
      'input',
      'select',
      'textarea',
      'div'
    ])
  })

  it('returns only visible, enabled focusable elements from a selector', () => {
    const result = getFocusableElements('#test-container')

    expect(result).toHaveLength(6)
    expect(result.map((el) => el.tagName.toLowerCase())).toEqual([
      'a',
      'button',
      'input',
      'select',
      'textarea',
      'div'
    ])
  })

  it('returns an empty array when container selector does not match', () => {
    const result = getFocusableElements('#non-existent')
    expect(result).toEqual([])
  })

  it('returns an empty array if container has no focusable elements', () => {
    const emptyContainer = document.createElement('div')
    emptyContainer.id = 'empty'
    emptyContainer.innerHTML = `<p>Text only</p><span>No tabindex</span>`
    document.body.appendChild(emptyContainer)

    const result = getFocusableElements('#empty')
    expect(result).toEqual([])

    emptyContainer.remove()
  })
})
