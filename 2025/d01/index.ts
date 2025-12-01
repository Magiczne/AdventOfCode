import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'

interface Operation {
  direction: 'L' | 'R'
  value: number
}

const part1 = (data: ReadonlyArray<Operation>): number => {
  let pointing = 50
  let equalToZero = 0

  for (const operation of data) {
    const delta = operation.direction === 'L' ? -1 : 1
    pointing += delta * operation.value
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
    const delta = operation.direction === 'L' ? -1 : 1

    crossedZero += Math.trunc((((100 + delta * pointing) % 100) + operation.value) / 100)
    pointing += delta * operation.value
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
        direction: line[0],
        value: parseInt(line.substring(1), 10),
      }
    }) as ReadonlyArray<Operation>
}

await runExamples(2025, '01', reader, part1, part2)
await runSolution(2025, '01', reader, part1, part2)
