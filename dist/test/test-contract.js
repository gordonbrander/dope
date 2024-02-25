"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const assert_1 = require("assert");
const contract_js_1 = require("../contract.js");
(0, mocha_1.describe)('isString', () => {
    (0, mocha_1.it)('should return true if value is string', () => {
        (0, assert_1.strict)((0, contract_js_1.isString)(''));
        (0, assert_1.strict)(!(0, contract_js_1.isString)(false));
    });
});
(0, mocha_1.describe)('isNumber', () => {
    (0, mocha_1.it)('should return true if value is number', () => {
        (0, assert_1.strict)((0, contract_js_1.isNumber)(10));
        (0, assert_1.strict)(!(0, contract_js_1.isNumber)(false));
    });
});
(0, mocha_1.describe)('isPositive', () => {
    (0, mocha_1.it)('should return true if value is number between range', () => {
        (0, assert_1.strict)((0, contract_js_1.isPositive)(1));
        (0, assert_1.strict)(!(0, contract_js_1.isPositive)(-1));
        // @ts-ignore
        (0, assert_1.strict)(!(0, contract_js_1.isPositive)(''));
    });
});
(0, mocha_1.describe)('isInRange', () => {
    (0, mocha_1.it)('should return true if value is number between range', () => {
        const isZeroToTen = (0, contract_js_1.isInRange)(0, 10);
        (0, assert_1.strict)(isZeroToTen(1));
        (0, assert_1.strict)(!isZeroToTen(-1));
        // @ts-ignore
        (0, assert_1.strict)(!isZeroToTen(''));
    });
});
(0, mocha_1.describe)('isBigInt', () => {
    (0, mocha_1.it)('should return true if value is bigint', () => {
        (0, assert_1.strict)((0, contract_js_1.isBigInt)(BigInt(10)));
        (0, assert_1.strict)(!(0, contract_js_1.isBigInt)(0));
    });
});
(0, mocha_1.describe)('isBool', () => {
    (0, mocha_1.it)('should return true if value is boolean', () => {
        (0, assert_1.strict)((0, contract_js_1.isBool)(true));
        (0, assert_1.strict)((0, contract_js_1.isBool)(false));
        (0, assert_1.strict)(!(0, contract_js_1.isBool)(''));
        (0, assert_1.strict)(!(0, contract_js_1.isBool)(null));
    });
});
(0, mocha_1.describe)('isFunction', () => {
    (0, mocha_1.it)('should return true if value is function', () => {
        const noOp = () => { };
        (0, assert_1.strict)((0, contract_js_1.isFunction)(noOp));
        (0, assert_1.strict)(!(0, contract_js_1.isFunction)({}));
    });
});
(0, mocha_1.describe)('isSymbol', () => {
    (0, mocha_1.it)('should return true if value is symbol', () => {
        (0, assert_1.strict)((0, contract_js_1.isSymbol)(Symbol('hello')));
        (0, assert_1.strict)(!(0, contract_js_1.isSymbol)({}));
    });
});
(0, mocha_1.describe)('isArray', () => {
    (0, mocha_1.it)('should return true if value is array', () => {
        (0, assert_1.strict)((0, contract_js_1.isArray)([]));
    });
});
(0, mocha_1.describe)('isObject', () => {
    (0, mocha_1.it)('should return true if value is object and not null or an array', () => {
        (0, assert_1.strict)((0, contract_js_1.isObject)({}));
        (0, assert_1.strict)(!(0, contract_js_1.isObject)([]));
        (0, assert_1.strict)(!(0, contract_js_1.isObject)(null));
    });
});
(0, mocha_1.describe)('isNullish', () => {
    (0, mocha_1.it)('should return true for null', () => {
        (0, assert_1.strict)((0, contract_js_1.isNullish)(null));
    });
    (0, mocha_1.it)('should return true for undefined', () => {
        (0, assert_1.strict)((0, contract_js_1.isNullish)(undefined));
    });
    (0, mocha_1.it)('should return false for everything else', () => {
        (0, assert_1.strict)(!(0, contract_js_1.isNullish)(0));
        (0, assert_1.strict)(!(0, contract_js_1.isNullish)(false));
        (0, assert_1.strict)(!(0, contract_js_1.isNullish)(''));
    });
});
(0, mocha_1.describe)('maybe', () => {
    const isMaybeString = (0, contract_js_1.maybe)(contract_js_1.isString);
    (0, mocha_1.it)('should return true for predicate or null', () => {
        (0, assert_1.strict)(isMaybeString('a'));
        (0, assert_1.strict)(isMaybeString(''));
        (0, assert_1.strict)(isMaybeString(null));
        (0, assert_1.strict)(isMaybeString(undefined));
    });
    (0, mocha_1.it)('should return false for everything else', () => {
        (0, assert_1.strict)(!isMaybeString(false));
    });
});
(0, mocha_1.describe)('isInstance', () => {
    class Vec2d {
        x;
        y;
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
    }
    class Vec3d extends Vec2d {
        z;
        constructor(x, y, z) {
            super(x, y);
            this.z = z;
        }
    }
    const isVec2d = (0, contract_js_1.isInstance)(Vec2d);
    const isVec3d = (0, contract_js_1.isInstance)(Vec3d);
    (0, mocha_1.it)('should return true for instances of constructor', () => {
        (0, assert_1.strict)(isVec2d(new Vec2d(1, 2)));
        (0, assert_1.strict)(isVec2d(new Vec3d(1, 2, 3)));
    });
    (0, mocha_1.it)('should return false for everything else', () => {
        (0, assert_1.strict)(!isVec3d(new Vec2d(1, 2)));
        (0, assert_1.strict)(!isVec3d(10));
    });
});
(0, mocha_1.describe)('isDate', () => {
    (0, mocha_1.it)('should return true for instances of dates', () => {
        (0, assert_1.strict)((0, contract_js_1.isDate)(new Date()));
        (0, assert_1.strict)(!(0, contract_js_1.isDate)(10));
    });
});
(0, mocha_1.describe)('isArrayOf', () => {
    (0, mocha_1.it)('should return true when all values match predicate', () => {
        const isArrayOfStrings = (0, contract_js_1.isArrayOf)(contract_js_1.isString);
        (0, assert_1.strict)(isArrayOfStrings(['a', 'b', 'c']));
        (0, assert_1.strict)(!isArrayOfStrings(['a', 'b', 'c', 1]));
    });
});
(0, mocha_1.describe)('shape', () => {
    (0, mocha_1.it)('should validate the shape of an object', () => {
        const isProfile = (0, contract_js_1.shape)({
            id: contract_js_1.isNumber,
            username: contract_js_1.isString,
            socials: (0, contract_js_1.isArrayOf)((0, contract_js_1.shape)({
                url: contract_js_1.isString
            }))
        });
        const profile = {
            id: 1,
            username: 'user',
            socials: [{ url: 'http://example.com' }]
        };
        (0, assert_1.strict)(isProfile(profile));
        (0, assert_1.strict)(!isProfile({}));
    });
});
