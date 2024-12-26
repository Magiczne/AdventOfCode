import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { Matrix } from '@magiczne/advent-of-code-ts-core/structures'

const part1 = (data: Matrix<string>): number => {
  const target = 'XMAS'

  return data.reduce((acc, position) => {
    return (
      acc +
      data
        .neighborsListWithStart(position, target.length)
        .map(neighbors => neighbors.join(''))
        .filter(neighbors => neighbors === target).length
    )
  }, 0)
}

const part2 = (data: Matrix<string>): number => {
  const targets = ['MAS', 'SAM']

  return data.reduce((acc, position) => {
    if (data.get(position) !== 'A') {
      return acc
    }

    const { y, x } = position
    const diag1 = [data.rows[y - 1]?.[x - 1], data.rows[y][x], data.rows[y + 1]?.[x + 1]].filter(Boolean).join('')
    const diag2 = [data.rows[y - 1]?.[x + 1], data.rows[y][x], data.rows[y + 1]?.[x - 1]].filter(Boolean).join('')

    if (targets.includes(diag1) && targets.includes(diag2)) {
      return acc + 1
    }

    return acc
  }, 0)
}

const reader = (file: string): Matrix<string> => {
  return Matrix.fromString(readFileSync(file, 'utf-8'), Matrix.identityMapper)
}

await runExamples(2024, '04', reader, part1, part2)
await runSolution(2024, '04', reader, part1, part2)
