export const getConstructor = (object) => object.constructor;
export class DispatchError extends TypeError {
    value;
    constructor(message, value) {
        super(message);
        this.value = value;
    }
}
export const throwDispatchError = (value) => {
    throw new DispatchError('No multimethod for argument', value);
};
/**
 * Dispatch on first argument using a `dispatch` function.
 * Dispatch function returns a key, which may be any unique value.
 * By default dispatches on constructor of first argument,
 * e.g. the "type" or "class" of the first argument.
 */
export const singledispatch = (dispatch = getConstructor, fallback = throwDispatchError) => {
    const methods = new Map();
    const call = (first, ...rest) => {
        const key = dispatch(first);
        const method = methods.get(key);
        if (method == null) {
            return fallback(first, ...rest);
        }
        return method(first, ...rest);
    };
    /** Set function for key */
    call.define = (key, method) => {
        if (method == null) {
            methods.delete(key);
            return;
        }
        else if (typeof method === 'function') {
            methods.set(key, method);
            return;
        }
        throw TypeError('Method must be a function or null');
    };
    return call;
};
export default singledispatch;
