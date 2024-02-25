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
export function find<T>(
  iterable: Iterable<T>,
  predicate: (value: T) => boolean
): T | undefined {
  for (const value of iterable) {
    if (predicate(value)) {
      return value
    }
  }
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

/** Iterate over each item in an iterable with a callback function */
export function forEach<T>(
  iterable: Iterable<T>,
  callback: (value: T) => void
) {
  for (const value of iterable) {
    callback(value)
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