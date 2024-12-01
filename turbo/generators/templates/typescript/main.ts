import { readFileSync } from 'node:fs'

import { testRuns, solutionRuns } from '../util/aoc'

const part1 = (data: string): number => {
  return 0
}

const part2 = (data: string): number => {
  return 0
}

const reader = (file: string): string => {
  return readFileSync(file, 'utf-8').trim()
}

testRuns('{{ day }}', reader, part1, part2)
solutionRuns('{{ day }}', reader, part1, part2)