const getNeighbors = <T>(y: number, x: number, matrix: ReadonlyArray<ReadonlyArray<T>>): ReadonlyArray<T> => {
  return [
    matrix[y - 1]?.[x - 1],
    matrix[y]?.[x - 1],
    matrix[y + 1]?.[x - 1],
    matrix[y - 1]?.[x],
    matrix[y + 1]?.[x],
    matrix[y - 1]?.[x + 1],
    matrix[y]?.[x + 1],
    matrix[y + 1]?.[x + 1],
  ].filter(value => value !== undefined)
}

export { getNeighbors }
