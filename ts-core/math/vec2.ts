import type { Vec2 as IVec2 } from '../types'

class Vec2 implements IVec2 {
  public x: number
  public y: number

  constructor({ x, y }: IVec2 = { x: 0, y: 0 }) {
    this.x = x
    this.y = y
  }

  add(vec2: IVec2): Vec2 {
    return new Vec2({
      x: this.x + vec2.x,
      y: this.y + vec2.y,
    })
  }

  sub(vec2: IVec2): Vec2 {
    return new Vec2({
      x: this.x - vec2.x,
      y: this.y - vec2.y,
    })
  }

  clone(): Vec2 {
    return new Vec2({
      x: this.x,
      y: this.y,
    })
  }

  updateInPlace(vec2: IVec2): void {
    this.x = vec2.x
    this.y = vec2.y
  }

  static fromInterface(vec2: IVec2): Vec2 {
    return new Vec2({
      x: vec2.x,
      y: vec2.y,
    })
  }
}

export { Vec2 }
