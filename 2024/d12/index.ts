import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import type { Vec2 } from '@magiczne/advent-of-code-ts-core/types'

interface Input {
  garden: ReadonlyArray<ReadonlyArray<string>>
  regions: Record<string, ReadonlyArray<ReadonlyArray<Vec2>>>
}

const part1 = (data: Input): number => {
  return 0
}

const part2 = (data: Input): number => {
  return 0
}

const reader = (file: string): Input => {
  const garden = readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .map(line => {
      return line.split('')
    })

  const regions: Record<string, ReadonlyArray<Array<Vec2>>> = {}

  return {
    garden,
    regions
  }
}

runExamples(2024, '12', reader, part1, part2)
// runSolution(2024, '12', reader, part1, part2)