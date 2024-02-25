const applyTo = (value, fn) => fn(value);
/**
 * Pipe a value through many one-argument functions.
 * Functions are run from left to right.
 */
export const pipe = (value, ...fns) => fns.reduce(applyTo, value);
/**
 * Compose many one-argument functions into a single one-argument function.
 * Functions are composed from right to left.
 */
export const compose = (...fns) => value => fns.reduceRight(applyTo, value);
