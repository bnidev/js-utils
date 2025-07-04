import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { scrollToElementAfterRender } from '../scrollToElementAfterRender'

describe('scrollToElementAfterRender', () => {
  let element: HTMLElement

  beforeEach(() => {
    element = document.createElement('div')
    element.id = 'test-element'
    document.body.appendChild(element)

    // Mock scrollIntoView
    element.scrollIntoView = vi.fn()

    // Stub requestAnimationFrame to call immediately
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      cb(performance.now())
      return 1
    })
  })

  afterEach(() => {
    document.body.innerHTML = ''
    vi.restoreAllMocks()
  })

  it('scrolls via selector with smooth behavior by default', () => {
    scrollToElementAfterRender('#test-element')

    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth'
    })
  })

  it('scrolls via selector with auto behavior when smooth is false', () => {
    scrollToElementAfterRender('#test-element', false)

    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'auto'
    })
  })

  it('scrolls via HTMLElement reference with smooth behavior by default', () => {
    scrollToElementAfterRender(element)

    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth'
    })
  })

  it('scrolls via HTMLElement reference with auto behavior', () => {
    scrollToElementAfterRender(element, false)

    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'auto'
    })
  })

  it('does nothing if element is not found via selector', () => {
    expect(() => scrollToElementAfterRender('#non-existent')).not.toThrow()
  })

  it('does nothing if null is passed', () => {
    expect(() =>
      scrollToElementAfterRender(null as unknown as string)
    ).not.toThrow()
  })

  it('calls onScrollComplete callback with success info', () => {
    return new Promise<void>((resolve, reject) => {
      scrollToElementAfterRender(
        '#test-element',
        true,
        ({ element: el, error, durationMs }) => {
          try {
            expect(el).toBe(element)
            expect(error).toBeUndefined()
            expect(typeof durationMs).toBe('number')
            resolve()
          } catch (err) {
            reject(err)
          }
        }
      )
    })
  })

  it('calls onScrollComplete callback with error info when scrollIntoView throws', () => {
    // Mock scrollIntoView to throw error
    element.scrollIntoView = vi.fn(() => {
      throw new Error('scroll error')
    })

    return new Promise<void>((resolve, reject) => {
      scrollToElementAfterRender('#test-element', true, ({ error }) => {
        try {
          expect(error).toBeInstanceOf(Error)
          expect((error as Error).message).toBe('scroll error')
          resolve()
        } catch (err) {
          reject(err)
        }
      })
    })
  })
})
