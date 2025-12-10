import { Line2 } from './line2'
import { Vec2 } from './vec2'

class Box2 {
  public readonly from: Vec2
  public readonly to: Vec2

  constructor(
    private readonly a: Vec2,
    private readonly b: Vec2,
  ) {
    this.from = new Vec2({
      x: Math.min(this.a.x, this.b.x),
      y: Math.min(this.a.y, this.b.y),
    })

    this.to = new Vec2({
      x: Math.max(this.a.x, this.b.x),
      y: Math.max(this.a.y, this.b.y),
    })
  }

  intersectsLine(line: Line2) {
    if (line.isVertical) {
      return (
        line.start.x > this.from.x &&
        line.start.x < this.to.x &&
        !(this.from.y >= line.max.y || this.to.y <= line.min.y)
      )
    }

    return (
      line.start.y > this.from.y && line.start.y < this.to.y && !(this.from.x >= line.max.x || this.to.x <= line.min.x)
    )
  }

  insidePolygon(edges: ReadonlyArray<Line2>) {
    return (
      edges.filter(edge => {
        return edge.isVertical && edge.start.x > this.from.x && edge.min.y <= this.from.y && edge.max.y > this.from.y
      }).length %
        2 ==
      1
    )
  }

  get width(): number {
    return Math.abs(this.a.x - this.b.x) + 1
  }

  get height(): number {
    return Math.abs(this.a.y - this.b.y) + 1
  }

  get area(): number {
    return this.width * this.height
  }
}

export { Box2 }
