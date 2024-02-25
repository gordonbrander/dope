/**
 * Apply a function to a value if that value is not nullish.
 * Returns the return value of `func` or undefined.
 */
export const mapValue = (value, func) => {
    if (value != null) {
        return func(value);
    }
};
/**
 * Apply a function to a value if that value is not nullish.
 * Returns the return value of `func` or a fallback value.
 */
export const mapValueOr = (value, func, fallback) => mapValue(value, func) ?? fallback;
/** Unwrap a "maybe" value, throwing an error if the value is nullish. */
export const unwrapValue = (value) => {
    if (value == null) {
        throw new TypeError("Value is null or undefined");
    }
    return value;
};
