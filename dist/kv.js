import { check, isKey, isObject } from "./contract.js";
const getKey = (object, key) => {
    if (object == null) {
        return;
    }
    return object[key];
};
const getDeep = (object, path) => {
    if (object == null) {
        return;
    }
    let result = object;
    for (const key of path) {
        result = result[key];
        if (result == null) {
            return;
        }
    }
    return result;
};
const isArray = Array.isArray;
/**
 * Get a deep property of an object using an array path of keys
 * Returns property value, or null if property does not exist.
 */
export const get = (object, path) => {
    if (isArray(path)) {
        return getDeep(object, path);
    }
    return getKey(object, path);
};
const freeze = Object.freeze;
const putKey = (object, key, value) => {
    check(key, isKey, 'Key must be a string, number or symbol');
    // If value is the same, return the original object
    if (object[key] === value) {
        return object;
    }
    return freeze({ ...object, [key]: value });
};
const isLongerThanZero = (x) => x.length > 0;
const putDeep = (object, path, value) => {
    check(path, isLongerThanZero, 'Key path array cannot be empty');
    const [key, ...restPath] = path;
    if (restPath.length > 0) {
        let child = object[key];
        if (!isObject(child)) {
            child = Number.isInteger(key) ? [] : {};
        }
        child = putDeep(child, restPath, value);
        return putKey(object, key, child);
    }
    return putKey(object, key, value);
};
/**
 * Set value at `path` of an object, returning a new object.
 * If a portion of path doesn't exist, it's created.
 *
 * The new object uses simple structural sharing. The parts of the object
 * tree that have been changed by `put` will be frozen. Other branches will
 * be left alone.
 *
 * Returns a new object, or undefined if a parent of the path does not exist.
 */
export const put = (object, path, value) => {
    if (isArray(path)) {
        return putDeep(object, path, value);
    }
    return putKey(object, path, value);
};
/**
 * Set a deep property of an object using a function that receives the previous
 * value and returns the next value.
 * Returns a new object.
 */
export const update = (object, path, advance) => put(object, path, advance(get(object, path)));
