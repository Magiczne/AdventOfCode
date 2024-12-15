import { Vec2 } from './vec2'

class Direction {
  static get up(): Vec2 {
    return new Vec2({ x: 0, y: -1 })
  }

  static get right(): Vec2 {
    return new Vec2({ x: 1, y: 0 })
  }

  static get down(): Vec2 {
    return new Vec2({ x: 0, y: 1 })
  }

  static get left(): Vec2 {
    return new Vec2({ x: -1, y: 0 })
  }
}

export { Direction }
