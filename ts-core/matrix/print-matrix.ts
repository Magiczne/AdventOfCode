const printMatrix = <T>(
  matrix: ReadonlyArray<ReadonlyArray<T>>,
  mapper?: (x: number, y: number, item: T) => string,
): void => {
  for (let y = 0; y < matrix.length; y++) {
    let row = ''

    for (let x = 0; x < matrix[0].length; x++) {
      row += mapper?.(x, y, matrix[y][x]) ?? matrix[y][x]
    }

    console.log(row)
  }

  console.log('')
}

export { printMatrix }
