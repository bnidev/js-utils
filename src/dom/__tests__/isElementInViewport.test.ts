import { describe, expect, it, vi } from 'vitest'
import { isElementInViewport } from '../isElementInViewport'

describe('isElementInViewport', () => {
  it('returns true for an element inside the viewport', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)

    // Mock bounding rect to simulate being in viewport
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      top: 100,
      left: 100,
      bottom: 200,
      right: 200,
      width: 100,
      height: 100,
      x: 100,
      y: 100,
      toJSON: () => {}
    })

    expect(isElementInViewport(el)).toBe(true)

    document.body.removeChild(el)
  })

  it('returns false for an element outside the viewport', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)

    // Simulate an element far below the visible viewport
    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      top: 2000,
      left: 100,
      bottom: 2100,
      right: 200,
      width: 100,
      height: 100,
      x: 100,
      y: 2000,
      toJSON: () => {}
    })

    expect(isElementInViewport(el)).toBe(false)

    document.body.removeChild(el)
  })

  it('uses document.documentElement.clientHeight and clientWidth when window dimensions are missing', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)

    // Mock fallback dimensions
    const originalInnerHeight = window.innerHeight
    const originalInnerWidth = window.innerWidth

    // Force fallback to be used
    Object.defineProperty(window, 'innerHeight', {
      value: undefined,
      configurable: true
    })
    Object.defineProperty(window, 'innerWidth', {
      value: undefined,
      configurable: true
    })

    // Set fallback values
    Object.defineProperty(document.documentElement, 'clientHeight', {
      value: 800,
      configurable: true
    })
    Object.defineProperty(document.documentElement, 'clientWidth', {
      value: 600,
      configurable: true
    })

    vi.spyOn(el, 'getBoundingClientRect').mockReturnValue({
      top: 100,
      left: 100,
      bottom: 700, // within 800
      right: 500, // within 600
      width: 400,
      height: 600,
      x: 100,
      y: 100,
      toJSON: () => {}
    })

    expect(isElementInViewport(el)).toBe(true)

    // Restore original properties
    Object.defineProperty(window, 'innerHeight', {
      value: originalInnerHeight,
      configurable: true
    })
    Object.defineProperty(window, 'innerWidth', {
      value: originalInnerWidth,
      configurable: true
    })

    document.body.removeChild(el)
  })

  it('returns false if the element is null', () => {
    expect(isElementInViewport(null as unknown as HTMLElement)).toBe(false)
  })
})
