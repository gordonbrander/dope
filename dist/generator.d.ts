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
export declare const find: <T>(iterable: Iterable<T>, predicate: (value: T) => boolean) => T;
/**
 * Group items in an iterable by key.
 * Returns a plain object where keys are the result of calling `key` on each
 * item, and values are arrays of associated items.
 * @example
 * const items = [{type: 'a', value: 1}, {type: 'b', value: 2}, {type: 'a', value: 3}]
 * const grouped = groupBy(items, item => item.type)
 * grouped // {a: [{type: 'a', value: 1}, {type: 'a', value: 3}], b: [{type: 'b', value: 2}]}
 */
export declare const groupBy: <T>(iterable: Iterable<T>, key: (value: T) => string) => Record<string, T[]>;
/**
 * Scan over an iterable.
 * Returns a generator of intermediate reduction states.
 */
export declare function scan<T, U>(iterable: Iterable<T>, step: (state: U, value: T) => U, initial: U): Generator<U, void, void>;
/** Reduce over an iterable */
export declare function reduce<T, U>(iterable: Iterable<T>, step: (state: U, value: T) => U, initial: U): U;
/** Iterate over each item in an iterable with a callback function */
export declare function forEach<T>(iterable: Iterable<T>, callback: (value: T) => void): void;
