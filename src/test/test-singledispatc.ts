import {describe, it} from 'mocha'
import {
  strictEqual as assertEqual,
  strict as assert,
  throws as assertThrows
} from 'assert'
import singledispatch from '../singledispatch.js'
import {getConstructor} from '../singledispatch.js'

class Vec2d {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

const rect = ({x, y, width, height}: {
  x: number,
  y: number,
  width: number,
  height: number
}) => ({
  type: 'rect',
  x,
  y,
  width,
  height
})

const circle = ({x, y, rad}: {
  x: number,
  y: number,
  rad: number
}) => ({
  type: 'circle',
  x,
  y,
  rad
})

describe('singledispatch', () => {
  it('should dispatch on constructor of first argument by default', () => {
    const add = singledispatch()
    add.define(Number, (a: number, b: number) => a + b)
    add.define(Vec2d, (a: Vec2d, b: Vec2d) => new Vec2d(a.x + b.x, a.y + b.y))

    const a = add(1, 2)
    assertEqual(a, 3)

    const b = add(new Vec2d(1, 2), new Vec2d(3, 4))
    assertEqual(b.x, 4)
    assertEqual(b.y, 6)
  })

  it('should allow you to specify a dispatch function', () => {
    const dimensions = singledispatch((x: any) => x.type)
    dimensions.define('rect', ({width, height}) => [width, height])
    dimensions.define('circle', ({rad}) => [rad * 2, rad * 2])

    const r = rect({
      x: 1,
      y: 2,
      width: 3,
      height: 4
    })
    const rd = dimensions(r)
    assertEqual(rd[0], 3)

    const c = circle({
      x: 1,
      y: 2,
      rad: 1.5
    })
    const cd = dimensions(c)
    assertEqual(cd[0], 3)
  })

  it('should throw an error by default when no method is found', () => {
    const add = singledispatch()
    add.define(String, (a: string, b: string) => a + b)

    assertThrows(() => add(1, 2))
  })

  it('should allow you to specify a fallback function for when no method is found', () => {
    const add = singledispatch(
      getConstructor,
      (a: any, b: any) => a + b
    )

    assertEqual(add(1, 2), 3)
  })
})