import {describe, it} from 'mocha'
import {strictEqual as assertEqual, strict as assert} from 'assert'
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
  it('should set the deep value if property exists, returning a new object', () => {
    const x = {a: {b: {c: 1}}}
    const y = put(x, ['a', 'b', 'c'], 2)
    const z = get(y, ['a', 'b', 'c'])
    assertEqual(z, 2)
    assert(x !== y)
  })

  it('should return undefined if property does not exist', () => {
    const x = {a: {b: {c: 1}}}

    const y = put(x, ['no', 'nope', 'nah'], 2)
    assertEqual(y, undefined)

    const a = put(x, ['a', 'b', 'c', 'd'], 2)
    assertEqual(a, undefined)
  })

  it('should return undefined for zero keys', () => {
    const x = {a: {b: {c: 1}}}

    const y = put(x, [], 2)
    assertEqual(y, undefined)
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