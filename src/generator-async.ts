import {isNullish} from "./contract.js"

type Awaitable<T> = T | Promise<T>

/** Map an iterable, returning a generator */
export async function* mapAsync<T, U>(
  iterable: AsyncIterable<T>,
  transform: (value: T) => Awaitable<U>
): AsyncGenerator<U, void, void> {
  for await (const value of iterable) {
    yield await transform(value)
  }
}

/** Filter an iterable, returning a generator */
export async function* filterAsync<T>(
  iterable: AsyncIterable<T>,
  predicate: (value: T) => Awaitable<boolean>
): AsyncGenerator<T, void, void> {
  for await (const value of iterable) {
    if (await predicate(value)) {
      yield value
    }
  }
}

/** Map values, filtering out any nullish mapped values */
export const filterMapAsync = <T, U>(
  iterable: AsyncIterable<T>,
  transform: (value: T) => U | null | undefined
): AsyncGenerator<U, void, void> =>
  filterAsync(mapAsync(iterable, transform), isNullish)

/** Flatten an iterable of iterables, returning a generator */
export async function* flatAsync<T>(
  iterable: AsyncIterable<AsyncIterable<T>>,
): AsyncGenerator<T, void> {
  for await (const values of iterable) {
    for await (const value of values) {
      yield value
    }
  }
}

/** Map an iterable and then flatten the result */
export const flatMapAsync = <T, U>(
  iterable: AsyncIterable<T>,
  transform: (value: T) => AsyncIterable<U>
): AsyncGenerator<U, void> => flatAsync(mapAsync(iterable, transform))

/**
 * Find the first value that passes predicate.
 * Returns value or undefined, if predicate fails.
 */
export const findAsync = async <T>(
  iterable: AsyncIterable<T>,
  predicate: (value: T) => Awaitable<boolean>
): Promise<T | undefined> => {
  for await (const value of iterable) {
    if (predicate(value)) {
      return value
    }
  }
}

/**
 * Scan over an iterable.
 * Returns a generator of intermediate reduction states.
 */
export async function* scanAsync<T, U>(
  iterable: AsyncIterable<T>,
  step: (state: U, value: T) => Awaitable<U>,
  initial: U
): AsyncGenerator<U, void, void> {
  let state = initial
  for await (const value of iterable) {
    state = await step(state, value)
    yield state
  }
}

/** Iterate over each item in an iterable with a callback function */
export async function forEachAsync<T>(
  iterable: AsyncIterable<T>,
  callback: (value: T) => void
) {
  for await (const value of iterable) {
    callback(value)
  }
}

/** Reduce over an iterable */
export async function reduceAsync<T, U>(
  iterable: AsyncIterable<T>,
  step: (state: U, value: T) => Awaitable<U>,
  initial: U
) {
  let state = initial
  for await (const value of iterable) {
    state = await step(state, value)
  }
  return state
}