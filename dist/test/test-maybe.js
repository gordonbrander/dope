"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const assert_1 = require("assert");
const maybe_js_1 = require("../maybe.js");
(0, mocha_1.describe)('mapValue', () => {
    (0, mocha_1.it)('should apply the function if value is not nullish', () => {
        const x = (0, maybe_js_1.mapValue)(2, x => x * 2);
        (0, assert_1.strictEqual)(x, 4);
    });
    (0, mocha_1.it)('should return undefined if the value is nullish', () => {
        const x = (0, maybe_js_1.mapValue)(null, x => x * 2);
        (0, assert_1.strictEqual)(x, undefined);
    });
});
(0, mocha_1.describe)('mapValueOr', () => {
    (0, mocha_1.it)('should apply the function if value is not nullish', () => {
        const x = (0, maybe_js_1.mapValueOr)(2, x => x * 2, 0);
        (0, assert_1.strictEqual)(x, 4);
    });
    (0, mocha_1.it)('should return the fallback if the value is nullish', () => {
        const x = (0, maybe_js_1.mapValueOr)(null, x => x * 2, 0);
        (0, assert_1.strictEqual)(x, 0);
    });
});
