import { check, isKey, isArray, isObject } from "./contract.js";
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
const putArray = (array, key, value) => {
    const copy = [...array];
    copy[key] = value;
    return freeze(copy);
};
const putPlainObject = (object, key, value) => freeze({ ...object, [key]: value });
const putKey = (object, key, value) => {
    check(key, isKey, 'Key must be a string, number or symbol');
    // Avoid creating object when value is equal
    if (object[key] === value) {
        return object;
    }
    if (isArray(object)) {
        return putArray(object, key, value);
    }
    else if (isObject(object)) {
        return putPlainObject(object, key, value);
    }
    throw new TypeError('Object must be an array or object');
};
const isLongerThanZero = (x) => x.length > 0;
const putDeep = (object, path, value) => {
    check(path, isLongerThanZero, 'Key path array cannot be empty');
    const [key, ...restPath] = path;
    if (restPath.length > 0) {
        return putKey(object, key, putDeep(object[key], restPath, value));
    }
    return putKey(object, key, value);
};
/**
 * Set value at `path` of an object, returning a new object.
 *
 * If key does not exist on parent object, it will be created.
 * Path must point to a property of an existing parent object.
 *
 * The new object uses simple structural sharing. The parts of the object
 * tree that have been changed by `put` will be frozen. Other branches will
 * be left alone. Arrays will be copied as arrays. All other objects will
 * be copied by assigning the enumerable own properties to a new plain object.
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
/** Patch an object with another object, returning a new frozen object */
export const patch = (object, patch) => freeze({ ...object, ...patch });
