import {isNullish} from "./contract.js"

/** Map an iterable, returning a generator */
export function* map<T, U>(
  iterable: Iterable<T>,
  transform: (value: T) => U
): Generator<U, void, void> {
  for (const value of iterable) {
    yield transform(value)
  }
}

/** Filter an iterable, returning a generator */
export function* filter<T>(
  iterable: Iterable<T>,
  predicate: (value: T) => boolean
): Generator<T, void, void> {
  for (const value of iterable) {
    if (predicate(value)) {
      yield value
    }
  }
}

/** Map values, filtering out any nullish mapped values */
export const filterMap = <T, U>(
  iterable: Iterable<T>,
  transform: (value: T) => U | null | undefined
): Generator<U, void, void> => filter(map(iterable, transform), isNullish)

/** Flatten an iterable of iterables, returning a generator */
export function* flat<T>(
  iterable: Iterable<Iterable<T>>,
): Generator<T, void> {
  for (const values of iterable) {
    for (const value of values) {
      yield value
    }
  }
}

/** Map an iterable and then flatten the result */
export const flatMap = <T, U>(
  iterable: Iterable<T>,
  transform: (value: T) => Iterable<U>
): Generator<U, void> => flat(map(iterable, transform))

/**
 * Find the first value that passes predicate.
 * Returns value or undefined, if predicate fails.
 */
export const find = <T>(
  iterable: Iterable<T>,
  predicate: (value: T) => boolean
): T | undefined => {
  for (const value of iterable) {
    if (predicate(value)) {
      return value
    }
  }
}

/**
 * Group items in an iterable by key.
 * Returns a plain object where keys are the result of calling `key` on each
 * item, and values are arrays of associated items.
 * @example
 * const items = [{type: 'a', value: 1}, {type: 'b', value: 2}, {type: 'a', value: 3}]
 * const grouped = groupBy(items, item => item.type)
 * grouped // {a: [{type: 'a', value: 1}, {type: 'a', value: 3}], b: [{type: 'b', value: 2}]}
 */
export const groupBy = <T>(
  iterable: Iterable<T>,
  key: (value: T) => string
) => {
  const result: Record<string, T[]> = {}
  for (const value of iterable) {
    const k = key(value)
    if (result[k] == null) {
      result[k] = []
    }
    result[k].push(value)
  }
  return result
}

/**
 * Scan over an iterable.
 * Returns a generator of intermediate reduction states.
 */
export function* scan<T, U>(
  iterable: Iterable<T>,
  step: (state: U, value: T) => U,
  initial: U
): Generator<U, void, void> {
  let state = initial
  for (const value of iterable) {
    state = step(state, value)
    yield state
  }
}

/** Reduce over an iterable */
export function reduce<T, U>(
  iterable: Iterable<T>,
  step: (state: U, value: T) => U,
  initial: U
) {
  let state = initial
  for (const value of iterable) {
    state = step(state, value)
  }
  return state
}

/** Iterate over each item in an iterable with a callback function */
export function forEach<T>(
  iterable: Iterable<T>,
  callback: (value: T) => void
) {
  for (const value of iterable) {
    callback(value)
  }
}