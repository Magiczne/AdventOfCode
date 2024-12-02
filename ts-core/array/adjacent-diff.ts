/**
 * Difference between adjacent array items
 *
 * e.g:    adjacentDiff([7, 6, 4, 2, 1])
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
