import {describe, it} from 'mocha'
import {strictEqual as assertEqual, strict as assert} from 'assert'
import {compose, pipe} from '../dist/compose.js'

describe('compose', () => {
  it('should compose from right to left', () => {
    const x = compose(
      (x) => '2' + x,
      (x) => '1' + x,
    )
    assert(x('0'), '012')
  })
})

describe('pipe', () => {
  it('should compose from left to right', () => {
    const x = pipe(
      '0',
      (x) => '1' + x,
      (x) => '2' + x,
    )
    assert(x, '012')
  })
})