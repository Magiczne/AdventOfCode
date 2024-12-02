/**
 * Use with reduce to get difference between current and next item
 *
 * e.g:    [7, 6, 4, 2, 1].map(nextItemDiffReducer)
 * returns [1, 2, 2, 1]
 */
const nextItemDiffReducer = (line: ReadonlyArray<number>): ReadonlyArray<number> => {
  return line.reduce((acc, item, index, arr) => {
    if (index >= arr.length - 1) {
      return acc
    }

    return [...acc, item - arr[index + 1]]
  }, [])
}

export { nextItemDiffReducer }
