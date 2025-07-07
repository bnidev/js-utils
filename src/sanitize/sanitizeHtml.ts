/**
 * Sanitizes a string of HTML, preserving only safe tags and attributes for rich text rendering.
 *
 * This function removes any tags and attributes that are not explicitly allowed, helping to prevent
 * XSS (cross-site scripting) attacks and unwanted formatting. It is designed primarily for use with
 * rich text editors, comments, or other user-generated content where a limited set of semantic HTML
 * is acceptable.
 *
 * By default, only common formatting tags (`<p>`, `<strong>`, `<ul>`, etc.) are preserved. Layout
 * and styling tags like `<div>` and `<span>` are excluded by design to keep the output clean and focused.
 *
 * @param dirtyHtml - The input HTML string to sanitize.
 * @param allowedTags - An array of tag names (lowercase) to allow. Defaults to safe formatting tags.
 * @param allowedAttributes - A map of tag names to allowed attributes. Keys and attribute names should be lowercase.
 *
 * @returns The sanitized HTML string.
 *
 * @remarks
 * This function uses the DOM API and is safe to run in the browser.
 * It prevents XSS by stripping dangerous tags and attribute values.
 *
 * @category Sanitize
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { sanitizeHtml } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { sanitizeHtml } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * sanitizeHtml('<p onclick="alert()">Hi <strong>there</strong></p>')
 * // → '<p>Hi <strong>there</strong></p>'
 * ```
 */
export function sanitizeHtml(
  dirtyHtml: string,
  allowedTags: string[] = [
    'b',
    'i',
    'em',
    'strong',
    'a',
    'ul',
    'ol',
    'li',
    'p',
    'br'
  ],
  allowedAttributes: Record<string, string[]> = { a: ['href', 'target', 'rel'] }
): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(dirtyHtml, 'text/html')

  const isDangerousAttr = (attrName: string, value: string): boolean => {
    if (attrName === 'href' || attrName === 'src') {
      const val = value.trim().toLowerCase()
      return (
        val.startsWith('javascript:') ||
        val.startsWith('data:') ||
        val.startsWith('vbscript:')
      )
    }
    return false
  }

  const sanitizeNode = (node: Element) => {
    const tag = node.tagName.toLowerCase()

    if (!allowedTags.includes(tag)) {
      node.replaceWith(...Array.from(node.childNodes)) // unwrap disallowed tag
      return
    }

    for (const attr of Array.from(node.attributes)) {
      const attrName = attr.name.toLowerCase()
      const tagAttrs = allowedAttributes[tag] || []

      if (
        !tagAttrs.includes(attrName) ||
        isDangerousAttr(attrName, attr.value)
      ) {
        node.removeAttribute(attr.name)
      }
    }
  }

  const walker = doc.body.querySelectorAll('*')
  for (const el of walker) {
    sanitizeNode(el)
  }

  return doc.body.innerHTML
}
