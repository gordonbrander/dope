export declare const getConstructor: (object: any) => any;
/**
 * Dispatch on first argument using a `dispatch` function.
 * Dispatch function returns a key, which may be any unique value.
 * By default dispatches on constructor of first argument,
 * e.g. the "type" or "class" of the first argument.
 */
export declare const singledispatch: (dispatch?: (object: any) => any, fallback?: Function) => {
    (first: any, ...rest: Array<any>): any;
    /** Set function for key */
    define(key: any, method: Function | null): void;
};
export default singledispatch;
