import {describe, it} from 'mocha'
import {strictEqual as assertEqual} from 'assert'
import * as maybe from '../maybe.js'

describe('maybe.map', () => {
  it('should apply the function if value is not nullish', () => {
    const x = maybe.map(2, x => x * 2)
    assertEqual(x, 4)
  })

  it('should return null if the value is nullish', () => {
    const x = maybe.map(null, x => x * 2)
    assertEqual(x, null)
  })
})

describe('maybe.mapOr', () => {
  it('should apply the function if value is not nullish', () => {
    const x = maybe.mapOr(2, x => x * 2, 0)
    assertEqual(x, 4)
  })

  it('should return the fallback if the value is nullish', () => {
    const x = maybe.mapOr(null, x => x * 2, 0)
    assertEqual(x, 0)
  })
})