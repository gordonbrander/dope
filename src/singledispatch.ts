export const getConstructor = (object: any) => object.constructor

const throwDispatchError = (value: any) => {
  throw new TypeError('No multimethod for argument')
}

/**
 * Dispatch on first argument using a `dispatch` function.
 * Dispatch function returns a key, which may be any unique value.
 * By default dispatches on constructor of first argument,
 * e.g. the "type" or "class" of the first argument.
 */
export const singledispatch = (
  dispatch: ((object: any) => any) = getConstructor,
  fallback: Function = throwDispatchError
) => {
  const methods = new Map<any, Function>()

  const call = (first: any, ...rest: Array<any>) => {
    const key = dispatch(first)
    const method = methods.get(key)
    if (method == null) {
      return fallback(first, ...rest)
    }
    return method(first, ...rest)
  }

  /** Set function for key */
  call.define = (key: any, method: Function | null) => {
    if (method == null) {
      methods.delete(key)
      return
    } else if (typeof method === 'function') {
      methods.set(key, method)
      return
    }
    throw TypeError('Method must be a function or null')
  }

  return call
}

export default singledispatch