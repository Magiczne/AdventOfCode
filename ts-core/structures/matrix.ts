import { Vec2 } from '../math'
import { printMatrix, rotateClockwise, rotateCounterClockwise } from '../matrix'
import { PrintMatrixMapper } from '../matrix/print-matrix'
import type { IVec2 } from '../types'

type MatrixMapper<TIn, TOut> = (item: TIn) => TOut

class Matrix<TItem> {
  private data: Array<Array<TItem>>

  private constructor(matrix: ReadonlyArray<ReadonlyArray<any>>, mapper: MatrixMapper<any, TItem>) {
    this.data = matrix.map(row => {
      return row.map(item => mapper(item))
    })
  }

  [Symbol.iterator](): IteratorObject<ReadonlyArray<TItem>> {
    return this.data[Symbol.iterator]()
  }

  get({ x, y }: IVec2): TItem | undefined {
    return this.data[y]?.[x]
  }

  set({ x, y }: IVec2, value: TItem): void {
    this.data[y][x] = value
  }

  neighbors({ x, y }: IVec2): ReadonlyArray<TItem> {
    return [
      this.data[y - 1]?.[x - 1],
      this.data[y]?.[x - 1],
      this.data[y + 1]?.[x - 1],
      this.data[y - 1]?.[x],
      this.data[y + 1]?.[x],
      this.data[y - 1]?.[x + 1],
      this.data[y]?.[x + 1],
      this.data[y + 1]?.[x + 1],
    ].filter(value => value !== undefined)
  }

  /**
   * Returns list of neighbor lists in every direction excluding the starting point of specified length
   * Order of returned neighbors is counter clockwise.
   *
   * 1 2 3 4 5
   * 6 7 8 9 0
   * 1 2 X 4 5
   * 0 9 8 7 6
   * 5 4 3 2 1
   *
   * For above matrix neighboringLists({ x: 2, y: 2 }, 2) would return:
   * [7, 1]
   * [2, 1]
   * [9, 5]
   * [8, 3]
   * [8, 3]
   * [9, 5]
   * [4, 5]
   * [7, 1]
   */
  neighborsList({ x, y }: IVec2, length: number): ReadonlyArray<ReadonlyArray<TItem>> {
    const range = Array.from({ length: length - 1 }).map((_, index) => index + 1)

    return [
      range.map(i => this.data[y - i]?.[x - i]).filter(value => value !== undefined),
      range.map(i => this.data[y]?.[x - i]).filter(value => value !== undefined),
      range.map(i => this.data[y + i]?.[x - i]).filter(value => value !== undefined),
      range.map(i => this.data[y - i]?.[x]).filter(value => value !== undefined),
      range.map(i => this.data[y + i]?.[x]).filter(value => value !== undefined),
      range.map(i => this.data[y - i]?.[x + i]).filter(value => value !== undefined),
      range.map(i => this.data[y]?.[x + i]).filter(value => value !== undefined),
      range.map(i => this.data[y + i]?.[x + i]).filter(value => value !== undefined),
    ]
  }

  /**
   * Returns list of neighbor lists in every direction including the starting point of specified length
   * Order of returned neighbors is counter clockwise.
   *
   * 1 2 3 4 5
   * 6 7 8 9 0
   * 1 2 X 4 5
   * 0 9 8 7 6
   * 5 4 3 2 1
   *
   * For above matrix neighboringLists({ x: 2, y: 2 }, 3) would return:
   * [X, 7, 1]
   * [X, 2, 1]
   * [X, 9, 5]
   * [X, 8, 3]
   * [X, 8, 3]
   * [X, 9, 5]
   * [X, 4, 5]
   * [X, 7, 1]
   */
  neighborsListWithStart({ x, y }: IVec2, length: number): ReadonlyArray<ReadonlyArray<TItem>> {
    const range = Array.from({ length }).map((_, index) => index)

    return [
      range.map(i => this.data[y - i]?.[x - i]).filter(value => value !== undefined),
      range.map(i => this.data[y]?.[x - i]).filter(value => value !== undefined),
      range.map(i => this.data[y + i]?.[x - i]).filter(value => value !== undefined),
      range.map(i => this.data[y - i]?.[x]).filter(value => value !== undefined),
      range.map(i => this.data[y + i]?.[x]).filter(value => value !== undefined),
      range.map(i => this.data[y - i]?.[x + i]).filter(value => value !== undefined),
      range.map(i => this.data[y]?.[x + i]).filter(value => value !== undefined),
      range.map(i => this.data[y + i]?.[x + i]).filter(value => value !== undefined),
    ]
  }

  find(value: TItem): Vec2 | null {
    for (let y = 0; y < this.data.length; y++) {
      for (let x = 0; x < this.data[0].length; x++) {
        if (this.data[y][x] === value) {
          return new Vec2({ x, y })
        }
      }
    }

    return null
  }

  rotateClockwise(): Matrix<TItem> {
    return new Matrix(rotateClockwise(this.data), Matrix.identityMapper)
  }

  rotateCounterClockwise(): Matrix<TItem> {
    return new Matrix(rotateCounterClockwise(this.data), Matrix.identityMapper)
  }

  reduce<TReduced>(reducer: (accumulator: TReduced, coordinates: IVec2) => TReduced, initialValue: TReduced): TReduced {
    let reduced = initialValue

    for (let y = 0; y < this.data.length; y++) {
      for (let x = 0; x < this.data.length; x++) {
        reduced = reducer(reduced, { x, y })
      }
    }

    return reduced
  }

  clone(): Matrix<TItem> {
    return new Matrix(
      this.data.map(row => [...row]),
      Matrix.identityMapper,
    )
  }

  print(mapper?: PrintMatrixMapper<TItem>): void {
    printMatrix(this.data, mapper)
  }

  get rows(): ReadonlyArray<ReadonlyArray<TItem>> {
    return this.data
  }

  static fromArray<T>(data: Array<Array<T>>): Matrix<T> {
    return new Matrix(data, Matrix.identityMapper)
  }

  static fromString<T>(data: string, mapper: MatrixMapper<string, T>): Matrix<T> {
    return new Matrix(
      data
        .trim()
        .split('\n')
        .map(line => {
          return line.trim().split('')
        }),
      mapper,
    )
  }

  static identityMapper<T>(item: T): T {
    return item
  }

  static integerMapper(item: string): number {
    return parseInt(item, 10)
  }
}

export { Matrix }
