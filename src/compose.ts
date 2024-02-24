const applyTo = <T, U>(value: T, fn: (value: T) => U) => fn(value)

/**
 * Pipe a value through many one-argument functions.
 * Functions are run from left to right.
 */
export const pipe = (
  value: any,
  ...fns: Array<(value: any) => any>
) => fns.reduce(applyTo, value)

/**
 * Compose many one-argument functions into a single one-argument function.
 * Functions are composed from right to left.
 */
export const compose = (...fns) => value => fns.reduceRight(applyTo, value)