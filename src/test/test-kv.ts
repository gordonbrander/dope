import {describe, it} from 'mocha'
import {strictEqual as assertEqual, strict as assert} from 'assert'
import {get, put, update} from '../kv.js'

describe('get', () => {
  it('should get the deep value if present', () => {
    const x = {a: {b: {c: 1}}}
    const y = get(x, ['a', 'b', 'c'])
    assertEqual(y, 1)
  })

  it('should return null if value is not present', () => {
    const x = {a: 1}
    const y = get(x, ['a', 'b', 'c'])
    assertEqual(y, null)
  })

  it('should return null if object is nullish', () => {
    const x = get(undefined, ['a', 'b', 'c'])
    assertEqual(x, null)

    const y = get(null, ['a', 'b', 'c'])
    assertEqual(y, null)
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

  it('should return null if property does not exist', () => {
    const x = {a: {b: {c: 1}}}

    const y = put(x, ['no', 'nope', 'nah'], 2)
    assertEqual(y, null)

    const a = put(x, ['a', 'b', 'c', 'd'], 2)
    assertEqual(a, null)
  })

  it('should return null for zero keys', () => {
    const x = {a: {b: {c: 1}}}

    const y = put(x, [], 2)
    assertEqual(y, null)
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