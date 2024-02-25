import {describe, it} from 'mocha'
import {strictEqual as assertEqual} from 'assert'
import {mapValue, mapValueOr} from '../dist/maybe.js'

describe('mapValue', () => {
  it('should apply the function if value is not nullish', () => {
    const x = mapValue(2, x => x * 2)
    assertEqual(x, 4)
  })

  it('should return undefined if the value is nullish', () => {
    const x = mapValue(null, x => x * 2)
    assertEqual(x, undefined)
  })
})

describe('mapValueOr', () => {
  it('should apply the function if value is not nullish', () => {
    const x = mapValueOr(2, x => x * 2, 0)
    assertEqual(x, 4)
  })

  it('should return the fallback if the value is nullish', () => {
    const x = mapValueOr(null, x => x * 2, 0)
    assertEqual(x, 0)
  })
})