/** Object.freeze synonym */
export const freeze = Object.freeze;
/**
 * Decorate a factory function so that it freezes the return value on the
 * way out. Factory function should take a single argument, props.
 * @example
 * const vec2d = frozen(({x, y}) => ({x, y}))
 * const vec = vec2d({x: 1, y: 2})
 * Object.isFrozen(vec) // true
 */
export const frozen = (factory) => (props) => freeze(factory(props));
/** Deep freeze an object */
export const deepFreeze = (object) => {
    // Freeze properties before freezing self
    for (const key of Reflect.ownKeys(object)) {
        const value = object[key];
        if ((value != null && typeof value === "object") ||
            typeof value === "function") {
            deepFreeze(value);
        }
    }
    return freeze(object);
};
