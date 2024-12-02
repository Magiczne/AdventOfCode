/**
 * Use with Array.map to get difference between adjacent items
 *
 * e.g:    [7, 6, 4, 2, 1].map(adjacentDiff)
 * returns [1, 2, 2, 1]
 */
const adjacentDiff = (line: ReadonlyArray<number>): ReadonlyArray<number> => {
  return line.reduce((acc, item, index, arr) => {
    if (index >= arr.length - 1) {
      return acc
    }

    return [...acc, item - arr[index + 1]]
  }, [])
}

export { adjacentDiff }
