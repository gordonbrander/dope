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
 * Scan over an iterable.
 * Returns a generator of intermediate reduction states.
 */
export declare function scanAsync<T, U>(iterable: AsyncIterable<T>, step: (state: U, value: T) => Awaitable<U>, initial: U): AsyncGenerator<U, void, void>;
/** Iterate over each item in an iterable with a callback function */
export declare function forEachAsync<T>(iterable: AsyncIterable<T>, callback: (value: T) => void): Promise<void>;
/** Reduce over an iterable */
export declare function reduceAsync<T, U>(iterable: AsyncIterable<T>, step: (state: U, value: T) => Awaitable<U>, initial: U): Promise<U>;
export {};
