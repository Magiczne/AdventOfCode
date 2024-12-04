const getNeighbors = <T>(x: number, y: number, matrix: ReadonlyArray<ReadonlyArray<T>>): ReadonlyArray<T> => {
  return [
    matrix[x - 1]?.[y - 1],
    matrix[x]?.[y - 1],
    matrix[x + 1]?.[y - 1],
    matrix[x - 1]?.[y],
    matrix[x + 1]?.[y],
    matrix[x - 1]?.[y + 1],
    matrix[x]?.[y + 1],
    matrix[x + 1]?.[y + 1],
  ].filter(value => value !== undefined)
}

export { getNeighbors }
