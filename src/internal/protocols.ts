/**
 * Internal shared URL protocol policy. Not part of the public surface:
 * this directory has no barrel, so nothing here is re-exported from the
 * package root (see `src/__tests__/exports.test.ts`).
 *
 * Shared by URL-related utilities so the allowlist lives in one place:
 * fix once, fixed everywhere. `sanitizeHtml` intentionally keeps its own
 * permissive tag-focused policy and is out of scope for this list.
 *
 * Default URL protocols treated as safe for links and standalone URLs.
 *
 * @internal
 */
export const DEFAULT_ALLOWED_PROTOCOLS: readonly string[] = Object.freeze([
  'http:',
  'https:',
  'ftp:'
])

/**
 * Internal shared URL protocol policy (see note above).
 *
 * Checks whether a URL protocol (including the trailing colon) is allowed.
 *
 * @param protocol - The protocol to check, e.g. `'https:'`.
 * @param allowedProtocols - Protocols treated as safe. Defaults to `DEFAULT_ALLOWED_PROTOCOLS`.
 * @returns `true` when the protocol is in the allowed list.
 *
 * @internal
 */
export function isAllowedProtocol(
  protocol: string,
  allowedProtocols: readonly string[] = DEFAULT_ALLOWED_PROTOCOLS
): boolean {
  return allowedProtocols.includes(protocol)
}
