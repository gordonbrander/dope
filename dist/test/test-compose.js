"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const assert_1 = require("assert");
const compose_js_1 = require("../compose.js");
(0, mocha_1.describe)('compose', () => {
    (0, mocha_1.it)('should compose from right to left', () => {
        const x = (0, compose_js_1.compose)((x) => '2' + x, (x) => '1' + x);
        (0, assert_1.strict)(x('0'), '012');
    });
});
(0, mocha_1.describe)('pipe', () => {
    (0, mocha_1.it)('should compose from left to right', () => {
        const x = (0, compose_js_1.pipe)('0', (x) => '1' + x, (x) => '2' + x);
        (0, assert_1.strict)(x, '012');
    });
});
