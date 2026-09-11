/**
 * Internal shared path grammar. Not part of the public surface: this
 * directory has no barrel, so nothing here is re-exported from the package
 * root (see `src/__tests__/exports.test.ts`).
 *
 * Shared by nested-path utilities so the dot-notation grammar lives in one
 * place: fix once, fixed everywhere. `merge`, `deepClone`, and `isEqual` walk
 * with different policies and are intentionally out of scope for this helper.
 *
 * @internal
 */

/**
 * Splits a dot-notation path into its segment keys.
 *
 * Empty segments (leading, trailing, or consecutive dots) are skipped, so
 * `.` is treated as a delimiter rather than a literal key. Returns `[]` for
 * an empty path.
 *
 * @param path - The dot-notation path to split.
 * @returns The list of non-empty segment keys.
 *
 * @internal
 */
export function parsePath(path: string): string[] {
  if (!path) return []
  return path.split('.').filter((segment) => segment !== '')
}
