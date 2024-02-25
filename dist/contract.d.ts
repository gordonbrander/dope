export declare const isString: (value: any) => value is string;
export declare const isNumber: (value: any) => value is number;
export declare const isInRange: (min: number, max: number) => (value: number) => value is number;
export declare const isPositive: (value: number) => value is number;
export declare const isBigInt: (value: any) => value is bigint;
export declare const isBool: (value: any) => value is boolean;
export declare const isFunction: (value: any) => value is Function;
export declare const isSymbol: (value: any) => value is Symbol;
export declare const isArray: (arg: any) => arg is any[];
export declare const isObject: (value: any) => value is object;
export declare const isNullish: (value: any) => value is null;
/** Decorate a predicate to return true for nullish values */
export declare const maybe: <T>(predicate: (value: any) => value is T) => (value: any) => value is T;
/** Create a predicate that checks if a value is an instance of a class */
export declare const isInstance: (constructor: Function) => (value: any) => boolean;
/** Is a JavaScript Date object? */
export declare const isDate: (value: any) => boolean;
/** Create a predicate that checks if an object conforms to a shape */
export declare const shape: <T>(defn: Record<string, (value: any) => boolean>) => (value: any) => value is T;
/** Create a predicate that checks if every value of array is valid */
export declare const isArrayOf: <T>(predicate: (value: any) => value is T) => (values: any) => values is T[];
/**
 * Check if value is valid. Throw a TypeError if it isn't.
 * Returns the value.
 * @example
 * const x = guard(10, isNumber)
 */
export declare const guard: <T>(value: any, predicate: (value: any) => value is T, message?: string) => T;
