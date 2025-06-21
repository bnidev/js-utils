import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { focusElement } from '../focusElement'

describe('focusElement', () => {
  let element: HTMLElement

  beforeEach(() => {
    element = document.createElement('div')
    element.id = 'test-element'
    document.body.appendChild(element)
  })

  afterEach(() => {
    element.remove()
  })

  it('focuses the element and removes tabindex by default', () => {
    const focusSpy = vi.spyOn(element, 'focus')
    focusElement('test-element')
    expect(document.activeElement).toBe(element)
    expect(element.tabIndex).toBe(-1)
    expect(focusSpy).toHaveBeenCalled()
    expect(element.hasAttribute('tabindex')).toBe(false)
  })

  it('focuses the element and keeps tabindex if removeTabIndex is false', () => {
    const focusSpy = vi.spyOn(element, 'focus')
    focusElement('test-element', false)
    expect(document.activeElement).toBe(element)
    expect(element.tabIndex).toBe(-1)
    expect(focusSpy).toHaveBeenCalled()
    expect(element.getAttribute('tabindex')).toBe('-1')
  })

  it('does nothing if the element does not exist', () => {
    expect(() => focusElement('non-existent')).not.toThrow()
  })
})
