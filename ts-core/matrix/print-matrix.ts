import { Vec2 } from '../math'

type PrintMatrixMapper<T> = (position: Vec2, item: T) => string

const printMatrix = <T>(matrix: ReadonlyArray<ReadonlyArray<T>>, mapper?: PrintMatrixMapper<T>): void => {
  for (let y = 0; y < matrix.length; y++) {
    let row = ''

    for (let x = 0; x < matrix[0].length; x++) {
      row += mapper?.(new Vec2({ x, y }), matrix[y][x]) ?? matrix[y][x]
    }

    console.log(row)
  }

  console.log('')
}

export { printMatrix, type PrintMatrixMapper }
