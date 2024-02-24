export type Nullish = null | undefined

/**
 * Apply a function to a value if that value is not none
 * Returns the return value of `func` or none.
 */
export const map = <T, U>(
  value: T | Nullish,
  func: (value: T) => U | Nullish
): U | null => {
  if (value != null) {
    return func(value) ?? null
  }
  return null
}

/**
 * Apply a function to a value if that value is not none
 * Returns the return value of `func` or a fallback value.
 */
export const mapOr = <T, U>(
  value: T | Nullish,
  func: (value: T) => U | Nullish,
  fallback: U
): U => map(value, func) ?? fallback