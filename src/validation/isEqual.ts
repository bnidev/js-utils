/**
 * Performs a deep equality check between two values.
 *
 * @param a - First value to compare.
 * @param b - Second value to compare.
 * @returns `true` if values are deeply equal, otherwise `false`.
 *
 * @category Validation
 */
export function isEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true

  if (typeof a !== typeof b) return false

  if (typeof a !== 'object' || a === null || b === null) return false

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime()
  }

  if (a instanceof RegExp && b instanceof RegExp) {
    return a.toString() === b.toString()
  }

  if (a instanceof Set && b instanceof Set) {
    if (a.size !== b.size) return false
    return [...a].every((val) => b.has(val))
  }

  if (a instanceof Map && b instanceof Map) {
    if (a.size !== b.size) return false
    return [...a.entries()].every(
      ([key, val]) => b.has(key) && isEqual(val, b.get(key))
    )
  }

  const aObj = a as Record<PropertyKey, unknown>
  const bObj = b as Record<PropertyKey, unknown>

  const aKeys = Reflect.ownKeys(aObj)
  const bKeys = Reflect.ownKeys(bObj)
  if (aKeys.length !== bKeys.length) return false

  for (const key of aKeys) {
    if (!bKeys.includes(key)) return false
    if (!isEqual(aObj[key], bObj[key])) return false
  }

  return true
}
