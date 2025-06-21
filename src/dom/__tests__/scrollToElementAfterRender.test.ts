import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
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

  it('calls scrollIntoView with smooth behavior by default', () => {
    scrollToElementAfterRender('test-element')

    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
    })
  })

  it('calls scrollIntoView with auto behavior when smooth is false', () => {
    scrollToElementAfterRender('test-element', false)

    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'auto',
    })
  })

  it('does nothing if the element is not found', () => {
    // Should not throw
    expect(() => scrollToElementAfterRender('non-existent')).not.toThrow()
  })
})
