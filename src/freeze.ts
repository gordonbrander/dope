/** Object.freeze synonym */
export const freeze = Object.freeze

/**
 * Create a factory for frozen objects.
 * @example
 * const vec2d = immutable(({x, y}) => ({x, y}))
 * const vec = vec2d({x: 1, y: 2})
 * Object.isFrozen(vec) // true
 */
export const immutable = <T, U>(
  factory: (props: T) => U
) => (props: T) => freeze(factory(props))

/** Deep freeze an object */
export const deepFreeze = (object: any) => {
  // Freeze properties before freezing self
  for (const key of Reflect.ownKeys(object)) {
    const value = object[key]
    if (
      (value != null && typeof value === "object") ||
      typeof value === "function"
    ) {
      deepFreeze(value);
    }
  }
  return freeze(object);
}
