import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'

interface Operation {
  direction: -1 | 1
  value: number
}

const part1 = (data: ReadonlyArray<Operation>): number => {
  let pointing = 50
  let equalToZero = 0

  for (const operation of data) {
    pointing += operation.direction * operation.value
    pointing %= 100

    if (pointing === 0) {
      equalToZero++
    }
  }

  return equalToZero
}

const part2 = (data: ReadonlyArray<Operation>): number => {
  let pointing = 50
  let crossedZero = 0

  for (const operation of data) {
    crossedZero += Math.trunc((((100 + operation.direction * pointing) % 100) + operation.value) / 100)
    pointing += operation.direction * operation.value
    pointing %= 100
  }

  return crossedZero
}

const reader = (file: string): ReadonlyArray<Operation> => {
  return readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .map(line => {
      return {
        direction: line[0] === 'L' ? -1 : 1,
        value: parseInt(line.substring(1), 10),
      }
    }) as ReadonlyArray<Operation>
}

await runExamples(2025, '01', reader, part1, part2)
await runSolution(2025, '01', reader, part1, part2)
