import type { IVec3 } from '../types'

class Vec3 implements IVec3 {
  public x: number
  public y: number
  public z: number

  constructor({ x, y, z } = { x: 0, y: 0, z: 0 }) {
    this.x = x
    this.y = y
    this.z = z
  }

  add(other: IVec3): Vec3 {
    return new Vec3({
      x: this.x + other.x,
      y: this.y + other.y,
      z: this.z + other.z,
    })
  }

  sub(other: IVec3): Vec3 {
    return new Vec3({
      x: this.x - other.x,
      y: this.y - other.y,
      z: this.z - other.z,
    })
  }

  equals(other: IVec3): boolean {
    return this.x === other.x && this.y === other.y && this.z === other.z
  }

  clone(): Vec3 {
    return new Vec3({
      x: this.x,
      y: this.y,
      y: this.z,
    })
  }

  addInPlace(other: IVec3): void {
    this.x += other.x
    this.y += other.y
    this.z += other.z
  }

  updateInPlace(other: IVec3): void {
    this.x = other.x
    this.y = other.y
    this.z = other.z
  }

  distance(other: IVec3): number {
    return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2) + Math.pow(this.z - other.z, 2))
  }

  manhattanDistance(other: IVec3): number {
    return Math.abs(this.x - other.x) + Math.abs(this.y - other.y) + Math.abs(this.z - other.z)
  }

  static hashFn(vec: IVec3): string {
    return `${vec.x}_${vec.y}_${vec.z}`
  }

  static fromHash(hash: string): Vec3 {
    const [rawX, rawY, rawZ] = hash.split('_')

    return new Vec3({
      x: parseInt(rawX, 10),
      y: parseInt(rawY, 10),
      z: parseInt(rawZ, 10),
    })
  }

  toRaw(): IVec3 {
    return {
      x: this.x,
      y: this.y,
      z: this.z,
    }
  }

  toString(): string {
    return `Vec3(${this.x}, ${this.y}, ${this.z})`
  }
}

export { Vec3 }
