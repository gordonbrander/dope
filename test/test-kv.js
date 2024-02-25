import {describe, it} from 'mocha'
import {
  strictEqual as assertEqual,
  strict as assert,
  throws as assertThrows
} from 'assert'
import {get, put, update} from '../dist/kv.js'

describe('get', () => {
  it('should get the deep value if present', () => {
    const x = {a: {b: {c: 1}}}
    const y = get(x, ['a', 'b', 'c'])
    assertEqual(y, 1)
  })

  it('should return undefined if value is not present', () => {
    const x = {a: 1}
    const y = get(x, ['a', 'b', 'c'])
    assertEqual(y, undefined)
  })

  it('should return undefined if object is nullish', () => {
    const x = get(undefined, ['a', 'b', 'c'])
    assertEqual(x, undefined)

    const y = get(null, ['a', 'b', 'c'])
    assertEqual(y, undefined)
  })
})

describe('put', () => {
  it('should set the property by key, returning a new object', () => {
    const x = {a: {b: {c: 1}}}
    const y = put(x, 'a', 2)
    assertEqual(y.a, 2)
  })

  it('should create the key if it does not exist', () => {
    const x = {}
    const y = put(x, 'a', 2)
    assertEqual(y.a, 2)
  })

  it('should set the deep property by path, returning a new object', () => {
    const x = {a: {b: {c: 1}}}
    const y = put(x, ['a', 'b', 'c'], 2)
    const z = get(y, ['a', 'b', 'c'])
    assertEqual(z, 2)
    assert(x !== y)
  })

  it(`should create the portions of the path that don't exist`, () => {
    const x = {a: {b: {c: 1}}}

    const x2 = put(x, ['no', 'nope', 'nah'], 2)
    assertEqual(x2.no.nope.nah, 2)

    const x3 = put(x, ['a', 'b', 'c', 'd'], 2)
    assertEqual(x3.a.b.c.d, 2)

    const x4 = put({a: {b: 1}}, ['a', 'b', 'c'], 3)
    assertEqual(x4.a.b.c, 3)
  })

  it('should return the original object if no value change is made', () => {
    const x = {a: {b: {c: 1}}}
    const y = put(x, ['a', 'b', 'c'], 1)
    assertEqual(x, y)
  })

  it('should return the original object if no value change is made (2)', () => {
    const bc = {b: {c: 1}}
    const x = {a: bc}
    const y = put(x, ['a'], bc)
    assertEqual(x, y)
  })

  it('should throw for zero keys', () => {
    const x = {a: {b: {c: 1}}}
    assertThrows(() => put(x, [], 2))
  })
})

describe('update', () => {
  it('should update the deep value if property exists, returning a new object', () => {
    const x = {a: {b: {c: 1}}}
    const y = update(x, ['a', 'b', 'c'], x => x + 1)
    const z = get(y, ['a', 'b', 'c'])
    assertEqual(z, 2)
    assert(x !== y)
  })
})