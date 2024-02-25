export type Nullish = (null | undefined);
/**
 * Apply a function to a value if that value is not nullish.
 * Returns the return value of `func` or undefined.
 */
export declare const mapValue: <T, U>(value: T, func: (value: T) => U) => U;
/**
 * Apply a function to a value if that value is not nullish.
 * Returns the return value of `func` or a fallback value.
 */
export declare const mapValueOr: <T, U>(value: T, func: (value: T) => U, fallback: U) => U;
/** Unwrap a "maybe" value, throwing an error if the value is nullish. */
export declare const unwrapValue: <T>(value: T) => T;
