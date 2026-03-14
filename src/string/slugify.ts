/**
 * Converts a string to a URL-friendly slug.
 *
 * @param str - The string to convert.
 *
 * @returns A URL-friendly slug.
 *
 * @category String
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { slugify } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { slugify } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * slugify('Hello World!') // 'hello-world'
 * slugify('My Blog Post') // 'my-blog-post'
 * ```
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
