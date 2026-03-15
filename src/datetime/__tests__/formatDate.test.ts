import { describe, expect, it } from 'vitest'
import { formatDate } from '../formatDate'

describe('formatDate', () => {
  it('should format date with YYYY-MM-DD', () => {
    const date = new Date('2024-03-15T14:30:00')
    expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024-03-15')
  })

  it('should format date with DD/MM/YYYY', () => {
    const date = new Date('2024-03-15T14:30:00')
    expect(formatDate(date, 'DD/MM/YYYY')).toBe('15/03/2024')
  })

  it('should format time with HH:mm', () => {
    const date = new Date('2024-03-15T14:30:00')
    expect(formatDate(date, 'HH:mm')).toBe('14:30')
  })

  it('should include seconds', () => {
    const date = new Date('2024-03-15T14:30:45')
    expect(formatDate(date, 'HH:mm:ss')).toBe('14:30:45')
  })
})
