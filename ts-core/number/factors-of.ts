const factorsOf = (value: number): ReadonlyArray<number> => {
  const factors = new Set<number>()

  for (let i = 1; i <= Math.sqrt(value); i++) {
    if (value % i === 0) {
      factors.add(i)
      factors.add(value / i)
    }
  }

  return [...factors]
}

export { factorsOf }
