import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getElementDimensions } from '../getElementDimensions'

describe('getElementDimensions', () => {
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

  it('returns correct dimensions from a DOM element', () => {
    const mockRect = {
      width: 100,
      height: 50,
      top: 10,
      left: 20,
      right: 120,
      bottom: 60,
      x: 20,
      y: 10,
      toJSON: () => {}
    }

    vi.spyOn(element, 'getBoundingClientRect').mockReturnValue(mockRect)

    const result = getElementDimensions(element)

    expect(result).toEqual({
      width: 100,
      height: 50,
      top: 10,
      left: 20,
      right: 120,
      bottom: 60
    })
  })

  it('returns correct dimensions from a selector', () => {
    const mockRect = {
      width: 200,
      height: 150,
      top: 30,
      left: 40,
      right: 240,
      bottom: 180,
      x: 40,
      y: 30,
      toJSON: () => {}
    }

    vi.spyOn(element, 'getBoundingClientRect').mockReturnValue(mockRect)

    const result = getElementDimensions('#test-element')

    expect(result).toEqual({
      width: 200,
      height: 150,
      top: 30,
      left: 40,
      right: 240,
      bottom: 180
    })
  })

  it('returns null if selector does not match any element', () => {
    const result = getElementDimensions('#non-existent')
    expect(result).toBeNull()
  })
})
