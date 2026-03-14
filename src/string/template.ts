/**
 * Simple template string interpolation.
 *
 * @param template - The template string with {{variable}} placeholders.
 * @param values - An object with values to replace the placeholders.
 *
 * @returns The interpolated string.
 *
 * @category String
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { template } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { template } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * template('Hello {{name}}!', { name: 'World' }) // 'Hello World!'
 * template('{{greeting}} {{name}}', { greeting: 'Hi', name: 'Alice' }) // 'Hi Alice'
 * ```
 */
export function template(
  template: string,
  values: Record<string, string>
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] ?? '')
}
