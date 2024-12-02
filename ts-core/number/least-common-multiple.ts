import { greatestCommonDenominator } from './greatest-common-denominator'

const leastCommonMultiple = (numbers: ReadonlyArray<number>): number => {
  return numbers.reduce((lhs, rhs) => {
    return (lhs * rhs) / greatestCommonDenominator(lhs, rhs)
  })
}

export { leastCommonMultiple }
