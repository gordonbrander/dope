/**
 * Pipe a value through many one-argument functions.
 * Functions are run from left to right.
 */
export declare const pipe: (value: any, ...fns: any[]) => any;
/**
 * Compose many one-argument functions into a single one-argument function.
 * Functions are composed from right to left.
 */
export declare const compose: (...fns: any[]) => (value: any) => any;
