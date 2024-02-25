/**
 * Get a deep property of an object using an array path of keys
 * Returns property value, or null if property does not exist.
 */
export declare const get: (object: any, path: string[]) => any;
/**
 * Set a deep property of an object
 * Returns a new object, or undefined if that path does not exist.
 */
export declare const put: <T extends object, V>(object: T, [key, ...path]: string[], value: V) => T;
/**
 * Set a deep property of an object using a function that receives the previous
 * value and returns the next value.
 * Returns a new object.
 */
export declare const update: (object: any, path: string[], advance: (value: any) => any) => any;
