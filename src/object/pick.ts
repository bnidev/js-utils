/**
 * Creates a new object composed of the specified keys from the input object.
 *
 * @template T - The type of the source object.
 * @template K - The keys to pick from the source object.
 *
 * @param obj - The source object to pick properties from.
 * @param keys - An array of keys to include in the returned object.
 *
 * @returns A new object with only the specified keys.
 *
 * @category Object
 *
 * @example Usage
 * ```ts
 * const user = { id: 1, name: 'Alice', age: 30 }
 * const result = pick(user, ['id', 'name'])
 * // result: { id: 1, name: 'Alice' }
 * ```
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key]
    }
  })
  return result
}
