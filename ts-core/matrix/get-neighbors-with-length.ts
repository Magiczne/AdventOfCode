import { range } from 'ramda'

const getNeighborsWithLength = <T>(x: number, y: number, length: number, matrix: ReadonlyArray<ReadonlyArray<T>>) => {
  const neighbourRange = range(0, length)

  return [
    neighbourRange.map(i => matrix[x - i]?.[y - i]),
    neighbourRange.map(i => matrix[x]?.[y - i]),
    neighbourRange.map(i => matrix[x + i]?.[y - i]),
    neighbourRange.map(i => matrix[x - i]?.[y]),
    neighbourRange.map(i => matrix[x + i]?.[y]),
    neighbourRange.map(i => matrix[x - i]?.[y + i]),
    neighbourRange.map(i => matrix[x]?.[y + i]),
    neighbourRange.map(i => matrix[x + i]?.[y + i]),
  ]
}

export { getNeighborsWithLength }
