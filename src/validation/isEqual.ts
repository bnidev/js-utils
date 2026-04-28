function isEqualDate(a: Date, b: Date): boolean {
  return a.getTime() === b.getTime()
}

function isEqualRegExp(a: RegExp, b: RegExp): boolean {
  return a.toString() === b.toString()
}

function isEqualSet(a: Set<unknown>, b: Set<unknown>): boolean {
  if (a.size !== b.size) return false
  return [...a].every((val) => b.has(val))
}

function isEqualMap(
  a: Map<unknown, unknown>,
  b: Map<unknown, unknown>
): boolean {
  if (a.size !== b.size) return false
  return [...a.entries()].every(
    ([key, val]) => b.has(key) && isEqual(val, b.get(key))
  )
}

function isEqualObject(
  a: Record<PropertyKey, unknown>,
  b: Record<PropertyKey, unknown>
): boolean {
  const aKeys = Reflect.ownKeys(a)
  const bKeys = Reflect.ownKeys(b)
  if (aKeys.length !== bKeys.length) return false
  return aKeys.every((key) => bKeys.includes(key) && isEqual(a[key], b[key]))
}

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

  if (a instanceof Date && b instanceof Date) return isEqualDate(a, b)
  if (a instanceof RegExp && b instanceof RegExp) return isEqualRegExp(a, b)
  if (a instanceof Set && b instanceof Set) return isEqualSet(a, b)
  if (a instanceof Map && b instanceof Map) return isEqualMap(a, b)

  return isEqualObject(
    a as Record<PropertyKey, unknown>,
    b as Record<PropertyKey, unknown>
  )
}
