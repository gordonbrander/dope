type Awaitable<T> = T | Promise<T>;
/** Map an iterable, returning a generator */
export declare function mapAsync<T, U>(iterable: AsyncIterable<T>, transform: (value: T) => Awaitable<U>): AsyncGenerator<U, void, void>;
/** Filter an iterable, returning a generator */
export declare function filterAsync<T>(iterable: AsyncIterable<T>, predicate: (value: T) => Awaitable<boolean>): AsyncGenerator<T, void, void>;
/** Map values, filtering out any nullish mapped values */
export declare const filterMapAsync: <T, U>(iterable: AsyncIterable<T>, transform: (value: T) => U) => AsyncGenerator<U, void, void>;
/** Flatten an iterable of iterables, returning a generator */
export declare function flatAsync<T>(iterable: AsyncIterable<AsyncIterable<T>>): AsyncGenerator<T, void>;
/** Map an iterable and then flatten the result */
export declare const flatMapAsync: <T, U>(iterable: AsyncIterable<T>, transform: (value: T) => AsyncIterable<U>) => AsyncGenerator<U, void, unknown>;
/**
 * Find the first value that passes predicate.
 * Returns value or undefined, if predicate fails.
 */
export declare const findAsync: <T>(iterable: AsyncIterable<T>, predicate: (value: T) => Awaitable<boolean>) => Promise<T>;
/**
 * Group items in an iterable by key.
 * Returns a plain object where keys are the result of calling `key` on each
 * item, and values are arrays of associated items.
 * @example
 * const items = [{type: 'a', value: 1}, {type: 'b', value: 2}, {type: 'a', value: 3}]
 * const grouped = await groupByAsync(items, item => item.type)
 * grouped // {a: [{type: 'a', value: 1}, {type: 'a', value: 3}], b: [{type: 'b', value: 2}]}
 */
export declare const groupByAsync: <T>(iterable: AsyncIterable<T>, key: (value: T) => string) => Promise<Record<string, T[]>>;
/**
 * Scan over an iterable.
 * Returns a generator of intermediate reduction states.
 */
export declare function scanAsync<T, U>(iterable: AsyncIterable<T>, step: (state: U, value: T) => Awaitable<U>, initial: U): AsyncGenerator<U, void, void>;
/** Reduce over an iterable */
export declare function reduceAsync<T, U>(iterable: AsyncIterable<T>, step: (state: U, value: T) => Awaitable<U>, initial: U): Promise<U>;
/** Iterate over each item in an iterable with a callback function */
export declare function forEachAsync<T>(iterable: AsyncIterable<T>, callback: (value: T) => void): Promise<void>;
export {};
