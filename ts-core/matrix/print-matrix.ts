import type { IVec2 } from '../types'

type PrintMatrixMapper<T> = (position: IVec2, item: T) => string

const printMatrix = <T>(matrix: ReadonlyArray<ReadonlyArray<T>>, mapper?: PrintMatrixMapper<T>): void => {
  for (let y = 0; y < matrix.length; y++) {
    let row = ''

    for (let x = 0; x < matrix[0].length; x++) {
      row += mapper?.({ x, y }, matrix[y][x]) ?? matrix[y][x]
    }

    console.log(row)
  }

  console.log('')
}

export { printMatrix, type PrintMatrixMapper }
