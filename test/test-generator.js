import {describe, it} from 'mocha'
import {strictEqual as assertEqual, strict as assert} from 'assert'
import {
  map,
  filter
} from '../dist/generator.js'

describe('map', () => {
  it('should map the iterator', () => {
    const v = new Set([1, 2])
    const a = map(v, x => x + 1)
    const b = Array.from(a)
    assertEqual(b[0], 2)
    assertEqual(b[1], 3)
  })
})

describe('filter', () => {
  it('should filter the iterator', () => {
    const v = new Set([1, 2])
    const a = filter(v, x => x === 2)
    const b = Array.from(a)
    assertEqual(b.length, 1)
    assertEqual(b[0], 2)
  })
})