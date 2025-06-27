import { describe, expect, it, vi } from 'vitest'
import { getElementDimensions } from '../getElementDimensions'

describe('getElementDimensions', () => {
  it('returns correct dimensions and position from getBoundingClientRect', () => {
    const mockElement = document.createElement('div')

    vi.spyOn(mockElement, 'getBoundingClientRect').mockReturnValue({
      width: 100,
      height: 50,
      top: 10,
      left: 20,
      right: 120,
      bottom: 60,
      x: 20,
      y: 10,
      toJSON: () => {}
    })

    const result = getElementDimensions(mockElement)
    expect(result).toEqual({
      width: 100,
      height: 50,
      top: 10,
      left: 20,
      right: 120,
      bottom: 60
    })
  })
})
