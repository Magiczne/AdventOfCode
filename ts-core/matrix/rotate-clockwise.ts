const rotateClockwise = <T>(matrix: ReadonlyArray<ReadonlyArray<T>>): ReadonlyArray<ReadonlyArray<T>> => {
  if (matrix.length === 0) {
    return []
  }

  return matrix[0].map((val, index) => matrix.map(row => row[index]).toReversed())
}

export { rotateClockwise }
