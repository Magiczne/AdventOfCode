import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { getNeighborsWithLength } from '@magiczne/advent-of-code-ts-core/matrix'

const part1 = (data: ReadonlyArray<ReadonlyArray<string>>): number => {
  const target = 'XMAS'

  let sum = 0

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      const neighborhoodXmas = getNeighborsWithLength(i, j, target.length, data)
        .map(neighbor => neighbor.filter(Boolean).join(''))
        .filter(neighbor => neighbor === target)

      sum += neighborhoodXmas.length
    }
  }

  return sum
}

const part2 = (data: ReadonlyArray<ReadonlyArray<string>>): number => {
  const targets = ['MAS', 'SAM']

  let sum = 0

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0].length; j++) {
      if (data[i][j] !== 'A') {
        continue
      }

      const diag1 = [data[i - 1]?.[j - 1], data[i][j], data[i + 1]?.[j + 1]].filter(Boolean).join('')
      const diag2 = [data[i - 1]?.[j + 1], data[i][j], data[i + 1]?.[j - 1]].filter(Boolean).join('')

      if (targets.includes(diag1) && targets.includes(diag2)) {
        sum++
      }
    }
  }

  return sum
}

const reader = (file: string): ReadonlyArray<ReadonlyArray<string>> => {
  return readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .map(line => line.trim().split(''))
}

runExamples(2024, '04', reader, part1, part2)
runSolution(2024, '04', reader, part1, part2)
