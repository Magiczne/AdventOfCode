const greatestCommonDenominator = (a: number, b: number): number => {
  return a % b === 0 ? b : greatestCommonDenominator(b, a % b)
}

export { greatestCommonDenominator }