import { isNullish } from "./contract.js";
/** Map an iterable, returning a generator */
export async function* mapAsync(iterable, transform) {
    for await (const value of iterable) {
        yield await transform(value);
    }
}
/** Filter an iterable, returning a generator */
export async function* filterAsync(iterable, predicate) {
    for await (const value of iterable) {
        if (await predicate(value)) {
            yield value;
        }
    }
}
/** Map values, filtering out any nullish mapped values */
export const filterMapAsync = (iterable, transform) => filterAsync(mapAsync(iterable, transform), isNullish);
/** Flatten an iterable of iterables, returning a generator */
export async function* flatAsync(iterable) {
    for await (const values of iterable) {
        for await (const value of values) {
            yield value;
        }
    }
}
/** Map an iterable and then flatten the result */
export const flatMapAsync = (iterable, transform) => flatAsync(mapAsync(iterable, transform));
/**
 * Find the first value that passes predicate.
 * Returns value or undefined, if predicate fails.
 */
export const findAsync = async (iterable, predicate) => {
    for await (const value of iterable) {
        if (predicate(value)) {
            return value;
        }
    }
};
/**
 * Scan over an iterable.
 * Returns a generator of intermediate reduction states.
 */
export async function* scanAsync(iterable, step, initial) {
    let state = initial;
    for await (const value of iterable) {
        state = await step(state, value);
        yield state;
    }
}
/** Iterate over each item in an iterable with a callback function */
export async function forEachAsync(iterable, callback) {
    for await (const value of iterable) {
        callback(value);
    }
}
/** Reduce over an iterable */
export async function reduceAsync(iterable, step, initial) {
    let state = initial;
    for await (const value of iterable) {
        state = await step(state, value);
    }
    return state;
}
