/**
 * Get a deep property of an object using an array path of keys
 * Returns property value, or null if property does not exist.
 */
export const get = (
  object: any,
  path: string[]
) => {
  if (object == null) {
    return
  }
  let result = object
  for (const key of path) {
    result = result[key]
    if (result == null) {
      return
    }
  }
  return result
}

const hasOwn = Object.hasOwn
const freeze = Object.freeze

/**
 * Set a deep property of an object, returning a new object.
 * The new object uses simple structural sharing. The parts of the object
 * tree that have been changed by `put` will be frozen. Other branches will
 * be left alone.
 * Returns a new object, or undefined if that path does not exist.
 */
export const put = <T extends object, V>(
  object: T,
  [key, ...path]: string[],
  value: V
): T | undefined => {
  if (object == null || !hasOwn(object, key)) {
    return
  }
  if (path.length > 0) {
    const child = object[key]
    const nextChild = put(child, path, value)
    if (nextChild == null) {
      return
    }
    // If value is the same, return the original object
    if (child === nextChild) {
      return object
    }
    return freeze({...object, [key]: nextChild})
  }
  // If value is the same, return the original object
  if (object[key] === value) {
    return object
  }
  return freeze({...object, [key]: value})
}

/**
 * Set a deep property of an object using a function that receives the previous
 * value and returns the next value.
 * Returns a new object.
 */
export const update = (
  object: any,
  path: string[],
  advance: (value: any) => any
) => put(object, path, advance(get(object, path)))