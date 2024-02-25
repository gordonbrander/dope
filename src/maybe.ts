export type Nullish = (null | undefined)

/**
 * Apply a function to a value if that value is not nullish.
 * Returns the return value of `func` or undefined.
 */
export const mapValue = <T, U>(
  value: T | Nullish,
  func: (value: T) => U
): U | undefined => {
  if (value != null) {
    return func(value)
  }
}

/**
 * Apply a function to a value if that value is not nullish.
 * Returns the return value of `func` or a fallback value.
 */
export const mapValueOr = <T, U>(
  value: T | Nullish,
  func: (value: T) => U | Nullish,
  fallback: U
): U => mapValue(value, func) ?? fallback

/** Unwrap a "maybe" value, throwing an error if the value is nullish. */
export const unwrapValue = <T>(value: T | Nullish): T => {
  if (value == null) {
    throw new TypeError("Value is null or undefined")
  }
  return value
}