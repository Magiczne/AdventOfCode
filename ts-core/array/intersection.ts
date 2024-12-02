const intersection = <T>(array1: ReadonlyArray<T>, array2: ReadonlyArray<T>): ReadonlyArray<T> => {
  return array1.filter(value => {
    return array2.includes(value)
  })
}

export { intersection }