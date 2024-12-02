const windows = <T>(array: ReadonlyArray<T>, windowLength: number): ReadonlyArray<ReadonlyArray<T>> => {
  return array
    .map((_, index) => {
      if (index <= array.length - windowLength) {
        return array.slice(index, index + windowLength)
      }

      return []
    })
    .filter(window => window.length > 0)
}

export { windows }