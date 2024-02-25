"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const assert_1 = require("assert");
const kv_js_1 = require("../kv.js");
(0, mocha_1.describe)('get', () => {
    (0, mocha_1.it)('should get the deep value if present', () => {
        const x = { a: { b: { c: 1 } } };
        const y = (0, kv_js_1.get)(x, ['a', 'b', 'c']);
        (0, assert_1.strictEqual)(y, 1);
    });
    (0, mocha_1.it)('should return undefined if value is not present', () => {
        const x = { a: 1 };
        const y = (0, kv_js_1.get)(x, ['a', 'b', 'c']);
        (0, assert_1.strictEqual)(y, undefined);
    });
    (0, mocha_1.it)('should return undefined if object is nullish', () => {
        const x = (0, kv_js_1.get)(undefined, ['a', 'b', 'c']);
        (0, assert_1.strictEqual)(x, undefined);
        const y = (0, kv_js_1.get)(null, ['a', 'b', 'c']);
        (0, assert_1.strictEqual)(y, undefined);
    });
});
(0, mocha_1.describe)('put', () => {
    (0, mocha_1.it)('should set the deep value if property exists, returning a new object', () => {
        const x = { a: { b: { c: 1 } } };
        const y = (0, kv_js_1.put)(x, ['a', 'b', 'c'], 2);
        const z = (0, kv_js_1.get)(y, ['a', 'b', 'c']);
        (0, assert_1.strictEqual)(z, 2);
        (0, assert_1.strict)(x !== y);
    });
    (0, mocha_1.it)('should return undefined if property does not exist', () => {
        const x = { a: { b: { c: 1 } } };
        const y = (0, kv_js_1.put)(x, ['no', 'nope', 'nah'], 2);
        (0, assert_1.strictEqual)(y, undefined);
        const a = (0, kv_js_1.put)(x, ['a', 'b', 'c', 'd'], 2);
        (0, assert_1.strictEqual)(a, undefined);
    });
    (0, mocha_1.it)('should return undefined for zero keys', () => {
        const x = { a: { b: { c: 1 } } };
        const y = (0, kv_js_1.put)(x, [], 2);
        (0, assert_1.strictEqual)(y, undefined);
    });
});
(0, mocha_1.describe)('update', () => {
    (0, mocha_1.it)('should update the deep value if property exists, returning a new object', () => {
        const x = { a: { b: { c: 1 } } };
        const y = (0, kv_js_1.update)(x, ['a', 'b', 'c'], x => x + 1);
        const z = (0, kv_js_1.get)(y, ['a', 'b', 'c']);
        (0, assert_1.strictEqual)(z, 2);
        (0, assert_1.strict)(x !== y);
    });
});
