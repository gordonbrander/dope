export const isString = (value: any): value is string =>
  typeof value === 'string'

export const isSymbol = (value: any): value is Symbol =>
  typeof value === 'symbol'

export const isNumber = (value: any): value is number =>
  typeof value === 'number'

export const isInRange = (
  min: number,
  max: number
) => (value: number): value is number =>
  isNumber(value) && value >= min && value <= max

const isGte = (
  min: number
) => (value: number): value is number =>
  isNumber(value) && value >= 0

export const isPositive = isGte(0)

export type Key = string | number | symbol

export const isKey = (key: Key): key is Key =>
  isString(key) || isNumber(key) || isSymbol(key)

export const isBigInt = (value: any): value is bigint =>
  typeof value === 'bigint'

export const isBool = (value: any): value is boolean =>
  typeof value === 'boolean'

export const isFunction = (value: any): value is Function =>
  typeof value === 'function'

export const isArray = Array.isArray

/** Returns true if value is an object */
export const isObject = (value: any): value is object =>
  typeof value === 'object' && value !== null

/**
 * Returns true if value is a "plain" object (e.g. `{}`).
 * Returns true for objects have been created with the Object constructor,
 * or have a prototype of `null`.
 */
export const isPlainObject = (value: any): value is object => (
  typeof value === 'object' &&
  value != null &&
  (value.constructor === Object || Object.getPrototypeOf(value) == null)
)

type Nullish = null | undefined

export const isNullish = (value: any): value is Nullish =>
  value == null

/** Decorate a predicate to return true for nullish values */
export const maybe = <T>(
  predicate: (value: any) => value is T
) => {
  const isMaybe = (value: any): value is T | Nullish =>
    isNullish(value) || predicate(value)
  return isMaybe
}

/** Create a predicate that checks if a value is an instance of a class */
export const isInstance = (constructor: Function) => {
  const isInstanceOf = (value: any) => value instanceof constructor
  return isInstanceOf
}

/** Is a JavaScript Date object? */
export const isDate = isInstance(Date)

/** Create a predicate that checks if an object conforms to a shape */
export const shape = <T>(
  defn: Record<string, (value: any) => boolean>
) => {
  const isShapeOf = (value: any): value is T => {
    if (!isObject(value)) {
      return false
    }
    for (const key of Object.keys(defn)) {
      const predicate = defn[key]
      if (!predicate(value[key])) {
        return false
      }
    }
    return true
  }
  return isShapeOf
}

/** Create a predicate that checks if every value of array is valid */
export const isArrayOf = <T>(predicate: (value: any) => value is T) => {
  const isArrayOf = (values: any): values is T[] => {
    if (!isArray(values)) {
      return false
    }
    return values.every(predicate)
  }
  return isArrayOf
}

/**
 * Check if value is valid. Throw a TypeError if it isn't.
 * Returns the value.
 * @example
 * const x = guard(10, isNumber)
 */
export const check = <T>(
  value: any,
  predicate: (value: any) => value is T,
  message: string = `Value didn't pass check.`
): T => {
  if (!predicate(value)) {
    throw new TypeError(
      `${message}
Value: ${value}
Predicate: ${predicate}`
    )
  }
  return value
}