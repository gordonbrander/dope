import {describe, it} from 'mocha'
import {strictEqual as assertEqual, strict as assert} from 'assert'
import {
  isString,
  isNumber,
  isInRange,
  isPositive,
  isBigInt,
  isBool,
  isFunction,
  isSymbol,
  isArray,
  isObject,
  isNullish,
  maybe,
  isInstance,
  isDate,
  shape,
  isArrayOf,
  guard
} from '../dist/contract.js'

describe('isString', () => {
  it('should return true if value is string', () => {
    assert(isString(''))
    assert(!isString(false))
  })
})

describe('isNumber', () => {
  it('should return true if value is number', () => {
    assert(isNumber(10))
    assert(!isNumber(false))
  })
})

describe('isPositive', () => {
  it('should return true if value is number between range', () => {
    assert(isPositive(1))
    assert(!isPositive(-1))
    // @ts-ignore
    assert(!isPositive(''))
  })
})

describe('isInRange', () => {
  it('should return true if value is number between range', () => {
    const isZeroToTen = isInRange(0, 10)
    assert(isZeroToTen(1))
    assert(!isZeroToTen(-1))
    // @ts-ignore
    assert(!isZeroToTen(''))
  })
})

describe('isBigInt', () => {
  it('should return true if value is bigint', () => {
    assert(isBigInt(BigInt(10)))
    assert(!isBigInt(0))
  })
})

describe('isBool', () => {
  it('should return true if value is boolean', () => {
    assert(isBool(true))
    assert(isBool(false))
    assert(!isBool(''))
    assert(!isBool(null))
  })
})

describe('isFunction', () => {
  it('should return true if value is function', () => {
    const noOp = () => {}
    assert(isFunction(noOp))
    assert(!isFunction({}))
  })
})

describe('isSymbol', () => {
  it('should return true if value is symbol', () => {
    assert(isSymbol(Symbol('hello')))
    assert(!isSymbol({}))
  })
})

describe('isArray', () => {
  it('should return true if value is array', () => {
    assert(isArray([]))
  })
})

describe('isObject', () => {
  it('should return true if value is object and not null or an array', () => {
    assert(isObject({}))
    assert(!isObject([]))
    assert(!isObject(null))
  })
})

describe('isNullish', () => {
  it('should return true for null', () => {
    assert(isNullish(null))
  })

  it('should return true for undefined', () => {
    assert(isNullish(undefined))
  })

  it('should return false for everything else', () => {
    assert(!isNullish(0))
    assert(!isNullish(false))
    assert(!isNullish(''))
  })
})

describe('maybe', () => {
  const isMaybeString = maybe(isString)

  it('should return true for predicate or null', () => {
    assert(isMaybeString('a'))
    assert(isMaybeString(''))
    assert(isMaybeString(null))
    assert(isMaybeString(undefined))
  })

  it('should return false for everything else', () => {
    assert(!isMaybeString(false))
  })
})

describe('isInstance', () => {
  class Vec2d {
    constructor(x, y) {
      this.x = x
      this.y = y
    }
  }

  class Vec3d extends Vec2d {
    constructor(x, y, z) {
      super(x, y)
      this.z = z
    }
  }

  const isVec2d = isInstance(Vec2d)
  const isVec3d = isInstance(Vec3d)

  it('should return true for instances of constructor', () => {
    assert(isVec2d(new Vec2d(1, 2)))
    assert(isVec2d(new Vec3d(1, 2, 3)))
  })

  it('should return false for everything else', () => {
    assert(!isVec3d(new Vec2d(1, 2)))
    assert(!isVec3d(10))
  })
})

describe('isDate', () => {
  it('should return true for instances of dates', () => {
    assert(isDate(new Date()))
    assert(!isDate(10))
  })
})

describe('isArrayOf', () => {
  it('should return true when all values match predicate', () => {
    const isArrayOfStrings = isArrayOf(isString)

    assert(isArrayOfStrings(['a', 'b', 'c']))
    assert(!isArrayOfStrings(['a', 'b', 'c', 1]))
  })
})

describe('shape', () => {
  it('should validate the shape of an object', () => {
    const isProfile = shape({
      id: isNumber,
      username: isString,
      socials: isArrayOf(
        shape({
          url: isString
        })
      )
    })
  
    const profile = {
      id: 1,
      username: 'user',
      socials: [{url: 'http://example.com'}]
    }

    assert(isProfile(profile))
    assert(!isProfile({}))
  })
})