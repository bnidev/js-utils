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
    vi.restoreAllMocks()
  })

  it('focuses the element and removes tabindex by default', () => {
    const focusSpy = vi.spyOn(element, 'focus')
    const {
      element: el,
      attempted,
      focused,
      error
    } = focusElement('#test-element')

    expect(el).toBe(element)
    expect(attempted).toBe(true)
    expect(focused).toBe(true)
    expect(error).toBeUndefined()

    expect(document.activeElement).toBe(element)
    expect(element.tabIndex).toBe(-1)
    expect(focusSpy).toHaveBeenCalled()
    expect(element.hasAttribute('tabindex')).toBe(false)
  })

  it('focuses the element and keeps tabindex if removeTabIndex is false', () => {
    const focusSpy = vi.spyOn(element, 'focus')
    const {
      element: el,
      attempted,
      focused,
      error
    } = focusElement('#test-element', false)

    expect(el).toBe(element)
    expect(attempted).toBe(true)
    expect(focused).toBe(true)
    expect(error).toBeUndefined()

    expect(document.activeElement).toBe(element)
    expect(element.tabIndex).toBe(-1)
    expect(focusSpy).toHaveBeenCalled()
    expect(element.getAttribute('tabindex')).toBe('-1')
  })

  it('does nothing if the element does not exist', () => {
    const {
      element: el,
      attempted,
      focused,
      error
    } = focusElement('#non-existent')

    expect(el).toBeNull()
    expect(attempted).toBe(false)
    expect(focused).toBe(false)
    expect(error).toBeUndefined()
  })

  it('returns error if focus throws', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {}) // silence warning

    vi.spyOn(element, 'focus').mockImplementation(() => {
      throw new Error('Focus failed')
    })

    const { error } = focusElement('#test-element')

    expect(error).toBeInstanceOf(Error)
    expect((error as Error).message).toBe('Focus failed')

    warnSpy.mockRestore() // restore console.warn after test
  })

  it('removes tabindex attribute by default', () => {
    // Make sure element has tabindex set initially so removeAttribute matters
    element.setAttribute('tabindex', '0')

    const { element: el } = focusElement('#test-element')

    expect(el).toBe(element)
    expect(el?.hasAttribute('tabindex')).toBe(false)
  })

  it('removes tabindex attribute if removeTabIndex is true explicitly', () => {
    element.setAttribute('tabindex', '3')
    const { element: el } = focusElement('#test-element', true)

    expect(el).toBe(element)
    expect(el?.hasAttribute('tabindex')).toBe(false)
  })

  it('does not remove tabindex attribute if removeTabIndex is false', () => {
    element.setAttribute('tabindex', '-1')
    const { element: el } = focusElement('#test-element', false)
    expect(el?.getAttribute('tabindex')).toBe('-1')
  })

  it('focuses the element when passed as an HTMLElement', () => {
    const focusSpy = vi.spyOn(element, 'focus')
    const { element: el, attempted, focused, error } = focusElement(element)

    expect(el).toBe(element)
    expect(attempted).toBe(true)
    expect(focused).toBe(true)
    expect(error).toBeUndefined()

    expect(document.activeElement).toBe(element)
    expect(focusSpy).toHaveBeenCalled()
  })
})
