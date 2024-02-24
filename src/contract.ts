export const isString = (value: any): value is string =>
  typeof value === 'string'

export const isNumber = (value: any): value is number =>
  typeof value === 'number'

export const isBigInt = (value: any): value is bigint =>
  typeof value === 'bigint'

export const isBool = (value: any): value is boolean =>
  typeof value === 'boolean'

export const isFunction = (value: any): value is Function =>
  typeof value === 'function'

export const isSymbol = (value: any): value is Symbol =>
  typeof value === 'symbol'

export const isArray = Array.isArray

export const isObject = (value: any): value is object =>
  typeof value === 'object' && value !== null

type None = null | undefined

export const isNullish = (value: any): value is None =>
  value == null

/** Decorate a predicate to return true for nullish values */
export const maybe = <T>(
  predicate: (value: any) => value is T
) => {
  const isMaybe = (value: any): value is T | None =>
    isNullish(value) || predicate(value)
  return isMaybe
}

/** Create a predicate that checks if a value is an instance of a class */
export const instance = (constructor: Function) => {
  const isInstanceOf = (value: any) => value instanceof constructor
  return isInstanceOf
}

/** Is a JavaScript Date object? */
export const isDate = instance(Date)

/** Create a predicate that checks if a value is constructor for a class */
export const constructor = (constructor: Function) => {
  const isConstructorOf = (value: any) => value.constructor === constructor
  return isConstructorOf
}

/** Create a predicate that checks if an object conforms to a shape */
export const shape = (defn) => {
  const isShapeOf = value => {
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
export const array = <T>(predicate: (value: any) => value is T) => {
  const isArrayOf = (values: any): values is T[] => {
    if (!isArray(values)) {
      return false
    }
    return values.every(predicate)
  }
  return isArrayOf
}

/** A Specialized TypeError with additional fields */
class GuardError extends TypeError {
  predicate: (value: any) => boolean
  value: any

  constructor(
    message: string,
    predicate: (value: any) => boolean,
    value: any
  ) {
    super(message)
    this.predicate = predicate
    this.value = value
  }
}

/**
 * Check if value is valid. Throw a TypeError if it isn't.
 * Returns the value.
 * @example
 * const x = guard(isNumber, 10)
 */
export const guard = (
  predicate: (value: any) => boolean,
  value: any,
  message = `Value didn't pass guard predicate.`
) => {
  if (!predicate(value)) {
    throw new GuardError(message, predicate, value)
  }
  return value
}

/**
 * A guard that only runs if `debug.debug` property is set to true.
 * Useful for runtime type checking in development.
 * @example
 * const x = debug(isNumber, 10)
 */
export const debug = (
  predicate: (value: any) => boolean,
  value: any,
  message: string | undefined = undefined
) => {
  if (!debug.debug) {
    return value
  }
  return guard(predicate, value, message)
}

/** Turn on debugging runtime type checking? False by default. */
debug.debug = false