const combinations = <T>(items: ReadonlyArray<T>, length: number): ReadonlyArray<ReadonlyArray<T>> => {
  const result: Array<ReadonlyArray<T>> = []

  const backtrack = (combination: Array<T>): void => {
    if (combination.length === length) {
      result.push([...combination])

      return
    }

    items.forEach(item => {
      combination.push(item)
      backtrack(combination)
      combination.pop()
    })
  }

  backtrack([])

  return result
}

export { combinations }
