"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const assert_1 = require("assert");
const generator_js_1 = require("../generator.js");
(0, mocha_1.describe)('map', () => {
    (0, mocha_1.it)('should map the iterator', () => {
        const v = new Set([1, 2]);
        const a = (0, generator_js_1.map)(v, x => x + 1);
        const b = Array.from(a);
        (0, assert_1.strictEqual)(b[0], 2);
        (0, assert_1.strictEqual)(b[1], 3);
    });
});
(0, mocha_1.describe)('filter', () => {
    (0, mocha_1.it)('should filter the iterator', () => {
        const v = new Set([1, 2]);
        const a = (0, generator_js_1.filter)(v, x => x === 2);
        const b = Array.from(a);
        (0, assert_1.strictEqual)(b.length, 1);
        (0, assert_1.strictEqual)(b[0], 2);
    });
});
