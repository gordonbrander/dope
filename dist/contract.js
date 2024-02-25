export const isString = (value) => typeof value === 'string';
export const isNumber = (value) => typeof value === 'number';
export const isInRange = (min, max) => (value) => isNumber(value) && value >= min && value <= max;
const isGte = (min) => (value) => isNumber(value) && value >= 0;
export const isPositive = isGte(0);
export const isBigInt = (value) => typeof value === 'bigint';
export const isBool = (value) => typeof value === 'boolean';
export const isFunction = (value) => typeof value === 'function';
export const isSymbol = (value) => typeof value === 'symbol';
export const isArray = Array.isArray;
export const isObject = (value) => typeof value === 'object' && value !== null && !isArray(value);
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
/** A Specialized TypeError with additional fields */
class GuardError extends TypeError {
    predicate;
    value;
    constructor(message, predicate, value) {
        super(message);
        this.predicate = predicate;
        this.value = value;
    }
}
/**
 * Check if value is valid. Throw a TypeError if it isn't.
 * Returns the value.
 * @example
 * const x = guard(10, isNumber)
 */
export const guard = (value, predicate, message = `Value didn't pass guard predicate.`) => {
    if (!predicate(value)) {
        throw new GuardError(message, predicate, value);
    }
    return value;
};
