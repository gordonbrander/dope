export const isString = (value) => typeof value === 'string';
export const isSymbol = (value) => typeof value === 'symbol';
export const isNumber = (value) => typeof value === 'number';
export const isInRange = (min, max) => (value) => isNumber(value) && value >= min && value <= max;
const isGte = (min) => (value) => isNumber(value) && value >= 0;
export const isPositive = isGte(0);
export const isKey = (key) => isString(key) || isNumber(key) || isSymbol(key);
export const isBigInt = (value) => typeof value === 'bigint';
export const isBool = (value) => typeof value === 'boolean';
export const isFunction = (value) => typeof value === 'function';
export const isArray = Array.isArray;
/** Returns true if value is an object */
export const isObject = (value) => typeof value === 'object' && value !== null;
/**
 * Returns true if value is a "plain" object (e.g. `{}`).
 * Returns true for objects have been created with the Object constructor,
 * or have a prototype of `null`.
 */
export const isPlainObject = (value) => (typeof value === 'object' &&
    value != null &&
    (value.constructor === Object || Object.getPrototypeOf(value) == null));
export const isNullish = (value) => value == null;
/** Decorate a predicate to return true for nullish values */
export const maybe = (predicate) => {
    const isMaybe = (value) => isNullish(value) || predicate(value);
    return isMaybe;
};
/** Create a predicate that checks if a value is an instance of a class */
export const isInstance = (constructor) => {
    const isInstanceOf = (value) => value instanceof constructor;
    return isInstanceOf;
};
/** Is a JavaScript Date object? */
export const isDate = isInstance(Date);
/** Create a predicate that checks if an object conforms to a shape */
export const shape = (defn) => {
    const isShapeOf = (value) => {
        if (!isObject(value)) {
            return false;
        }
        for (const key of Object.keys(defn)) {
            const predicate = defn[key];
            if (!predicate(value[key])) {
                return false;
            }
        }
        return true;
    };
    return isShapeOf;
};
/** Create a predicate that checks if every value of array is valid */
export const isArrayOf = (predicate) => {
    const isArrayOf = (values) => {
        if (!isArray(values)) {
            return false;
        }
        return values.every(predicate);
    };
    return isArrayOf;
};
/**
 * Check if value is valid. Throw a TypeError if it isn't.
 * Returns the value.
 * @example
 * const x = check(10, isNumber)
 */
export const check = (value, predicate, message = `Value didn't pass check.`) => {
    if (!predicate(value)) {
        throw new TypeError(`${message}
Value: ${value}
Predicate: ${predicate}`);
    }
    return value;
};
