const indexOfAll = <T>(array: ReadonlyArray<T>, value: T): ReadonlyArray<number> => {
  let indexes: Array<number> = []

  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      indexes.push(i)
    }
  }

  return indexes
}

export { indexOfAll }
