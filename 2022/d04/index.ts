import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { readFileSync } from 'node:fs'
import { intersects, range } from 'radash'

type Range = [number, number]
type Ranges = [Range, Range]

const rangesContains = (ranges: Ranges): boolean => {
  // First inside of second
  if (ranges[0][0] >= ranges[1][0] && ranges[0][1] <= ranges[1][1]) {
    return true
  }

  // Second inside of first
  if (ranges[1][0] >= ranges[0][0] && ranges[1][1] <= ranges[0][1]) {
    return true
  }

  return false
}

const rangesOverlapping = (ranges: Ranges): boolean => {
  const firstRange = [...range(ranges[0][0], ranges[0][1])]
  const secondRange = [...range(ranges[1][0], ranges[1][1])]

  return intersects(firstRange, secondRange)
}

const getRanges = (file: string): Array<Ranges> => {
  return readFileSync(file)
    .toString()
    .trim()
    .split('\n')
    .map((item): Ranges => {
      return item.split(',').map((item: string): Range => {
        return item.split('-').map(number => parseInt(number, 10)) as Range
      }) as Ranges
    })
}

const countContainedAssignments = (file: string): number => {
  return getRanges(file).filter(ranges => rangesContains(ranges)).length
}

const countOverlappingAssignments = (file: string): number => {
  return getRanges(file).filter(ranges => rangesOverlapping(ranges)).length
}

const reader = (file: string): string => file

await runExamples(2022, '04', reader, countContainedAssignments, countOverlappingAssignments)
await runSolution(2022, '04', reader, countContainedAssignments, countOverlappingAssignments)
