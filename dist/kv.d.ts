import { Key } from "./contract.js";
type Path = Array<Key>;
/**
 * Get a deep property of an object using an array path of keys
 * Returns property value, or null if property does not exist.
 */
export declare const get: (object: any, path: Key | Path) => any;
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
export declare const put: <T extends object, V>(object: T, path: Key | Path, value: V) => T;
/**
 * Set a deep property of an object using a function that receives the previous
 * value and returns the next value.
 * Returns a new object.
 */
export declare const update: (object: any, path: Key | Path, advance: (value: any) => any) => any;
/** Patch an object with another object, returning a new frozen object */
export declare const patch: (object: any, patch: any) => any;
export {};
