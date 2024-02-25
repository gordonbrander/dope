/** Object.freeze synonym */
export declare const freeze: {
    <T extends Function>(f: T): T;
    <T_1 extends {
        [idx: string]: object | U;
    }, U extends string | number | bigint | boolean | symbol>(o: T_1): Readonly<T_1>;
    <T_2>(o: T_2): Readonly<T_2>;
};
/**
 * Decorate a factory function so that it freezes the return value on the
 * way out. Factory function should take a single argument, props.
 * @example
 * const vec2d = frozen(({x, y}) => ({x, y}))
 * const vec = vec2d({x: 1, y: 2})
 * Object.isFrozen(vec) // true
 */
export declare const frozen: <T, U>(factory: (props: T) => U) => (props: T) => Readonly<U>;
/** Deep freeze an object */
export declare const deepFreeze: (object: any) => any;
