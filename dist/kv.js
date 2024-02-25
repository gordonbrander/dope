/**
 * Get a deep property of an object using an array path of keys
 * Returns property value, or null if property does not exist.
 */
export const get = (object, path) => {
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
const hasOwn = Object.hasOwn;
/**
 * Set a deep property of an object
 * Returns a new object, or undefined if that path does not exist.
 */
export const put = (object, [key, ...path], value) => {
    if (object == null || !hasOwn(object, key)) {
        return;
    }
    if (path.length > 0) {
        const child = put(object[key], path, value);
        if (child == null) {
            return;
        }
        return { ...object, [key]: child };
    }
    return { ...object, [key]: value };
};
/**
 * Set a deep property of an object using a function that receives the previous
 * value and returns the next value.
 * Returns a new object.
 */
export const update = (object, path, advance) => put(object, path, advance(get(object, path)));
