import { Vec2 } from './vec2'

class Direction extends Vec2 {
  static get up(): Direction {
    return new Direction({ x: 0, y: -1 })
  }

  static get right(): Direction {
    return new Direction({ x: 1, y: 0 })
  }

  static get down(): Direction {
    return new Direction({ x: 0, y: 1 })
  }

  static get left(): Direction {
    return new Direction({ x: -1, y: 0 })
  }

  static get cardinal(): [Direction, Direction, Direction, Direction] {
    return [Direction.up, Direction.right, Direction.down, Direction.left]
  }

  rotateClockwise(): Direction {
    if (this.equals(Direction.down)) {
      return Direction.left
    }

    if (this.equals(Direction.left)) {
      return Direction.up
    }

    if (this.equals(Direction.up)) {
      return Direction.right
    }

    if (this.equals(Direction.right)) {
      return Direction.down
    }

    throw new Error('WTF')
  }

  rotateCounterClockwise(): Direction {
    if (this.equals(Direction.down)) {
      return Direction.right
    }

    if (this.equals(Direction.right)) {
      return Direction.up
    }

    if (this.equals(Direction.up)) {
      return Direction.left
    }

    if (this.equals(Direction.left)) {
      return Direction.down
    }

    throw new Error('WTF')
  }

  override toString(): string {
    if (this.equals(Direction.down)) {
      return 'v'
    }

    if (this.equals(Direction.right)) {
      return '>'
    }

    if (this.equals(Direction.up)) {
      return '^'
    }

    if (this.equals(Direction.left)) {
      return '<'
    }

    throw new Error('WTF')
  }
}

export { Direction }
