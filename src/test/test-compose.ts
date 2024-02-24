import {describe, it} from 'mocha'
import {strictEqual as assertEqual, strict as assert} from 'assert'
import {compose, pipe} from '../compose.js'

describe('compose', () => {
  it('should compose from right to left', () => {
    const x = compose(
      (x: string) => '2' + x,
      (x: string) => '1' + x,
    )
    assert(x('0'), '012')
  })
})

describe('pipe', () => {
  it('should compose from left to right', () => {
    const x = pipe(
      '0',
      (x: string) => '1' + x,
      (x: string) => '2' + x,
    )
    assert(x, '012')
  })
})