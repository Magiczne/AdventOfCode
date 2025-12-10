import { Vec2 } from './vec2'

class Line2 {
  public readonly min: Vec2
  public readonly max: Vec2

  constructor(
    public readonly start: Vec2,
    public readonly end: Vec2,
  ) {
    this.min = new Vec2({
      x: Math.min(this.start.x, this.end.x),
      y: Math.min(this.start.y, this.end.y),
    })

    this.max = new Vec2({
      x: Math.max(this.start.x, this.end.x),
      y: Math.max(this.start.y, this.end.y),
    })
  }

  get isHorizontal(): boolean {
    return this.start.y === this.end.y
  }

  get isVertical(): boolean {
    return this.start.x === this.end.x
  }
}

export { Line2 }
