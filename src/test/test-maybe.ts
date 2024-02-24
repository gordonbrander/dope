import {describe, it} from 'mocha'
import {strictEqual as assertEqual} from 'assert'
import {mapMaybe, mapMaybeOr} from '../maybe.js'

describe('mapMaybe', () => {
  it('should apply the function if value is not nullish', () => {
    const x = mapMaybe(2, x => x * 2)
    assertEqual(x, 4)
  })

  it('should return null if the value is nullish', () => {
    const x = mapMaybe(null, x => x * 2)
    assertEqual(x, null)
  })
})

describe('mapMaybeOr', () => {
  it('should apply the function if value is not nullish', () => {
    const x = mapMaybeOr(2, x => x * 2, 0)
    assertEqual(x, 4)
  })

  it('should return the fallback if the value is nullish', () => {
    const x = mapMaybeOr(null, x => x * 2, 0)
    assertEqual(x, 0)
  })
})