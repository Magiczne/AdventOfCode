import type { IVec2 } from '../types'

class Vec2 implements IVec2 {
  public x: number
  public y: number

  constructor({ x, y } = { x: 0, y: 0 }) {
    this.x = x
    this.y = y
  }

  add(other: IVec2): Vec2 {
    return new Vec2({
      x: this.x + other.x,
      y: this.y + other.y,
    })
  }

  sub(other: IVec2): Vec2 {
    return new Vec2({
      x: this.x - other.x,
      y: this.y - other.y,
    })
  }

  equals(other: IVec2): boolean {
    return this.x === other.x && this.y === other.y
  }

  clone(): Vec2 {
    return new Vec2({
      x: this.x,
      y: this.y,
    })
  }

  addInPlace(other: IVec2): void {
    this.x += other.x
    this.y += other.y
  }

  updateInPlace(other: IVec2): void {
    this.x = other.x
    this.y = other.y
  }

  static hashFn(vec: IVec2): string {
    return `${vec.x}_${vec.y}`
  }

  toRaw(): IVec2 {
    return {
      x: this.x,
      y: this.y
    }
  }
}

export { Vec2 }
