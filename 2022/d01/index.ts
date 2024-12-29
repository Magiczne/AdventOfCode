import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { readFileSync } from 'node:fs'

const calculateSums = (file: string): Array<number> => {
  return readFileSync(file)
    .toString()
    .trim()
    .split('\n\n')
    .map(item => {
      return item
        .split('\n')
        .map(item => parseInt(item, 10))
        .reduce<number>((acc, item) => acc + item, 0)
    })
}

const sumOfThreeLargest = (file: string): number => {
  return calculateSums(file)
    .sort((lhs, rhs) => lhs - rhs)
    .slice(-3)
    .reduce<number>((acc, item) => acc + item, 0)
}

const reader = (file: string): string => file

const part1 = (file: string): number => Math.max(...calculateSums(file))

await runExamples(2022, '01', reader, part1, sumOfThreeLargest)
await runSolution(2022, '01', reader, part1, sumOfThreeLargest)
