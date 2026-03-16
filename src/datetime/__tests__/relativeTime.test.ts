import { describe, expect, it } from 'vitest'
import { relativeTime } from '../relativeTime'

describe('relativeTime', () => {
  it('should return "just now" for recent times', () => {
    const date = new Date()
    expect(relativeTime(date)).toBe('just now')
  })

  it('should return minutes ago', () => {
    const date = new Date(Date.now() - 5 * 60 * 1000)
    expect(relativeTime(date)).toBe('5 minutes ago')
  })

  it('should return hours ago', () => {
    const date = new Date(Date.now() - 3 * 60 * 60 * 1000)
    expect(relativeTime(date)).toBe('3 hours ago')
  })

  it('should return days ago', () => {
    const date = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    expect(relativeTime(date)).toBe('5 days ago')
  })

  it('should return "yesterday" for 1 day ago', () => {
    const date = new Date(Date.now() - 24 * 60 * 60 * 1000)
    expect(relativeTime(date)).toBe('yesterday')
  })
})
