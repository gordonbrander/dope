"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const assert_1 = require("assert");
const singledispatch_js_1 = __importDefault(require("../singledispatch.js"));
const singledispatch_js_2 = require("../singledispatch.js");
class Vec2d {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
const rect = ({ x, y, width, height }) => ({
    type: 'rect',
    x,
    y,
    width,
    height
});
const circle = ({ x, y, rad }) => ({
    type: 'circle',
    x,
    y,
    rad
});
(0, mocha_1.describe)('singledispatch', () => {
    (0, mocha_1.it)('should dispatch on constructor of first argument by default', () => {
        const add = (0, singledispatch_js_1.default)();
        add.define(Number, (a, b) => a + b);
        add.define(Vec2d, (a, b) => new Vec2d(a.x + b.x, a.y + b.y));
        const a = add(1, 2);
        (0, assert_1.strictEqual)(a, 3);
        const b = add(new Vec2d(1, 2), new Vec2d(3, 4));
        (0, assert_1.strictEqual)(b.x, 4);
        (0, assert_1.strictEqual)(b.y, 6);
    });
    (0, mocha_1.it)('should allow you to specify a dispatch function', () => {
        const dimensions = (0, singledispatch_js_1.default)((x) => x.type);
        dimensions.define('rect', ({ width, height }) => [width, height]);
        dimensions.define('circle', ({ rad }) => [rad * 2, rad * 2]);
        const r = rect({
            x: 1,
            y: 2,
            width: 3,
            height: 4
        });
        const rd = dimensions(r);
        (0, assert_1.strictEqual)(rd[0], 3);
        const c = circle({
            x: 1,
            y: 2,
            rad: 1.5
        });
        const cd = dimensions(c);
        (0, assert_1.strictEqual)(cd[0], 3);
    });
    (0, mocha_1.it)('should throw an error by default when no method is found', () => {
        const add = (0, singledispatch_js_1.default)();
        add.define(String, (a, b) => a + b);
        (0, assert_1.throws)(() => add(1, 2));
    });
    (0, mocha_1.it)('should allow you to specify a fallback function for when no method is found', () => {
        const add = (0, singledispatch_js_1.default)(singledispatch_js_2.getConstructor, (a, b) => a + b);
        (0, assert_1.strictEqual)(add(1, 2), 3);
    });
});
