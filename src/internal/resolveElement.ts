/**
 * Internal shared DOM element resolver. Not part of the public surface:
 * this directory has no barrel, so nothing here is re-exported from the
 * package root (see `src/__tests__/exports.test.ts`).
 *
 * Shared by DOM-related utilities to unify selector-to-element resolution:
 * fix once, fixed everywhere.
 *
 * @internal
 */

/**
 * Resolves a CSS selector string or element reference to a DOM element.
 * If a string is provided, it attempts to resolve it using `document.querySelector`.
 * If that fails or throws a syntax error, it falls back to `document.getElementById`
 * for robust backwards compatibility (e.g. with ID-only callers).
 *
 * @param selectorOrElement - A CSS selector string, element ID, or DOM Element.
 * @returns The resolved DOM element, or `null` if not found.
 *
 * @internal
 */
export function resolveElement<T extends Element = HTMLElement>(
  selectorOrElement: string | T
): T | null {
  if (typeof selectorOrElement === 'string') {
    try {
      const resolved = document.querySelector<T>(selectorOrElement)
      if (resolved) return resolved
    } catch {
      // Ignore querySelector syntax errors (e.g. invalid CSS selector strings)
    }
    return document.getElementById(selectorOrElement) as T | null
  }
  return selectorOrElement
}
