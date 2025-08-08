/**
 * Registers a callback to be invoked when the device orientation changes.
 * Uses the Screen Orientation API. Returns an object with a `stop` method to remove the listener.
 *
 * @param callback - Function to call with the orientation type and angle.
 * @returns An object with a `stop` method to remove the event listener, or undefined if not supported.
 *
 * @category DOM
 *
 * @example Imports
 * ```ts
 * // ES Module
 * import { onOrientationChange } from '@bnidev/js-utils'
 *
 * // CommonJS
 * const { onOrientationChange } = require('@bnidev/js-utils')
 * ```
 *
 * @example Usage
 * ```ts
 * // Register a callback to log orientation changes
 * const orientationListener = onOrientationChange((type, angle) => {
 *   console.log(`Orientation changed: ${type}, angle: ${angle}`)
 * })
 * ```
 */
export function onOrientationChange(
  callback: (type: string, angle: number) => void
): { stop: () => void } | undefined {
  if (!screen.orientation || !screen.orientation.addEventListener) {
    console.warn('Screen Orientation API is not supported in this browser.')
    return
  }

  const handler = () =>
    callback(screen.orientation.type, screen.orientation.angle)
  screen.orientation.addEventListener('change', handler)

  function cleanup() {
    screen.orientation.removeEventListener('change', handler)
  }

  return {
    stop: cleanup
  }
}
