import { isNullish } from "./contract.js";
/** Map an iterable, returning a generator */
export function* map(iterable, transform) {
    for (const value of iterable) {
        yield transform(value);
    }
}
/** Filter an iterable, returning a generator */
export function* filter(iterable, predicate) {
    for (const value of iterable) {
        if (predicate(value)) {
            yield value;
        }
    }
}
/** Map values, filtering out any nullish mapped values */
export const filterMap = (iterable, transform) => filter(map(iterable, transform), isNullish);
/** Flatten an iterable of iterables, returning a generator */
export function* flat(iterable) {
    for (const values of iterable) {
        for (const value of values) {
            yield value;
        }
    }
}
/** Map an iterable and then flatten the result */
export const flatMap = (iterable, transform) => flat(map(iterable, transform));
/**
 * Find the first value that passes predicate.
 * Returns value or undefined, if predicate fails.
 */
export const find = (iterable, predicate) => {
    for (const value of iterable) {
        if (predicate(value)) {
            return value;
        }
    }
};
/**
 * Group items in an iterable by key.
 * Returns a plain object where keys are the result of calling `key` on each
 * item, and values are arrays of associated items.
 * @example
 * const items = [{type: 'a', value: 1}, {type: 'b', value: 2}, {type: 'a', value: 3}]
 * const grouped = groupBy(items, item => item.type)
 * grouped // {a: [{type: 'a', value: 1}, {type: 'a', value: 3}], b: [{type: 'b', value: 2}]}
 */
export const groupBy = (iterable, key) => {
    const result = {};
    for (const value of iterable) {
        const k = key(value);
        if (result[k] == null) {
            result[k] = [];
        }
        result[k].push(value);
    }
    return result;
};
/**
 * Scan over an iterable.
 * Returns a generator of intermediate reduction states.
 */
export function* scan(iterable, step, initial) {
    let state = initial;
    for (const value of iterable) {
        state = step(state, value);
        yield state;
    }
}
/** Reduce over an iterable */
export function reduce(iterable, step, initial) {
    let state = initial;
    for (const value of iterable) {
        state = step(state, value);
    }
    return state;
}
/** Iterate over each item in an iterable with a callback function */
export function forEach(iterable, callback) {
    for (const value of iterable) {
        callback(value);
    }
}
