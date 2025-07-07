/**
 * Safely parses a JSON string and optionally validates the resulting object.
 *
 * @param input - The input JSON string to parse.
 * @param validate - An optional type guard function to validate the parsed object.
 * @returns An object containing:
 * - `success`: Indicates whether parsing (and validation) succeeded.
 * - `value`: The parsed object if successful; otherwise `null`.
 * - `error`: An error object if parsing failed or validation was unsuccessful.
 *
 * @remarks
 * This utility is useful when working with dynamic or untrusted JSON data,
 * such as user input, localStorage values, or external API responses.
 * It prevents runtime exceptions by catching `JSON.parse` errors,
 * and it provides optional runtime validation for extra safety.
 *
 * Using a type guard function enables strong typing of the return value if validation succeeds.
 *
 * @category Sanitize
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { sanitizeJson } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { sanitizeJson } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage with validation
 * ```ts
 * type Person = { name: string }
 *
 * function isPerson(obj: unknown): obj is Person {
 *   return typeof obj === 'object' && obj !== null && 'name' in obj && typeof (obj as any).name === 'string'
 * }
 *
 * const result = sanitizeJson<Person>('{"name": "Alice"}', isPerson)
 *
 * if (result.success) {
 *   console.log(result.value.name) // 'Alice'
 * } else {
 *   console.error(result.error)
 * }
 * ```
 *
 * @example Usage without validation
 * ```ts
 * const result = sanitizeJson('{"foo": 123}')
 *
 * if (result.success) {
 *   console.log(result.value.foo) // 123
 * }
 * ```
 */
export function sanitizeJson<T = unknown>(
  input: string,
  validate?: (obj: unknown) => obj is T
): { success: boolean; value: T | null; error?: Error } {
  try {
    const parsed = JSON.parse(input)

    if (validate && !validate(parsed)) {
      return {
        success: false,
        value: null,
        error: new Error('Validation failed')
      }
    }

    return {
      success: true,
      value: parsed
    }
  } catch (err) {
    return {
      success: false,
      value: null,
      error:
        err instanceof Error ? err : new Error('Unknown JSON parsing error')
    }
  }
}
