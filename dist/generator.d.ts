/** Map an iterable, returning a generator */
export declare function map<T, U>(iterable: Iterable<T>, transform: (value: T) => U): Generator<U, void, void>;
/** Filter an iterable, returning a generator */
export declare function filter<T>(iterable: Iterable<T>, predicate: (value: T) => boolean): Generator<T, void, void>;
/** Map values, filtering out any nullish mapped values */
export declare const filterMap: <T, U>(iterable: Iterable<T>, transform: (value: T) => U) => Generator<U, void, void>;
/** Flatten an iterable of iterables, returning a generator */
export declare function flat<T>(iterable: Iterable<Iterable<T>>): Generator<T, void>;
/** Map an iterable and then flatten the result */
export declare const flatMap: <T, U>(iterable: Iterable<T>, transform: (value: T) => Iterable<U>) => Generator<U, void, unknown>;
/**
 * Find the first value that passes predicate.
 * Returns value or undefined, if predicate fails.
 */
export declare function find<T>(iterable: Iterable<T>, predicate: (value: T) => boolean): T | undefined;
/**
 * Scan over an iterable.
 * Returns a generator of intermediate reduction states.
 */
export declare function scan<T, U>(iterable: Iterable<T>, step: (state: U, value: T) => U, initial: U): Generator<U, void, void>;
/** Iterate over each item in an iterable with a callback function */
export declare function forEach<T>(iterable: Iterable<T>, callback: (value: T) => void): void;
/** Reduce over an iterable */
export declare function reduce<T, U>(iterable: Iterable<T>, step: (state: U, value: T) => U, initial: U): U;
