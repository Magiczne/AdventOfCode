import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { cycle } from '@magiczne/advent-of-code-ts-core/array'

const part1 = (data: ReadonlyArray<number>): number => {
  return data.reduce((acc, item) => acc + item, 0)
}

const part2 = (data: ReadonlyArray<number>): number => {
  const valueSeen = new Map<number, boolean>()
  let value = 0

  for (const instruction of cycle(data)) {
    value += instruction

    if (valueSeen.has(value)) {
      return value
    }

    valueSeen.set(value, true)
  }
}

const reader = (file: string): ReadonlyArray<number> => {
  return readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .map(line => parseInt(line, 10))
}

await runExamples(2018, '01', reader, part1, part2)
await runSolution(2018, '01', reader, part1, part2)
