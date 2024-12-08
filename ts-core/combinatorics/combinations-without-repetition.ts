const combinationsWithoutRepetition = <T>(items: ReadonlyArray<T>, length: number): ReadonlyArray<ReadonlyArray<T>> => {
  const result: Array<ReadonlyArray<T>> = []

  const backtrack = (combination: Array<T>, start: number): void => {
    if (combination.length === length) {
      result.push([...combination])

      return
    }

    for (let i = start; i < items.length; i++) {
      combination.push(items[i])
      backtrack(combination, i + 1)
      combination.pop()
    }
  }

  backtrack([], 0)

  return result
}

export { combinationsWithoutRepetition }
