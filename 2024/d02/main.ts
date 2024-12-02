import { readFileSync } from 'node:fs'

import { testRuns, solutionRuns } from '../util/aoc'
import { nextItemDiffReducer } from '../util/array'

const isLineSafe = (line: ReadonlyArray<number>): boolean => {
  const sign = Math.sign(line[0])

  return line.every(item => [1, 2, 3].includes(Math.abs(item))) && line.every(item => Math.sign(item) === sign)
}

const part1 = (data: ReadonlyArray<ReadonlyArray<number>>): number => {
  return data.map(nextItemDiffReducer).filter(isLineSafe).length
}

const part2 = (data: ReadonlyArray<ReadonlyArray<number>>): number => {
  return data
    .map(line => {
      const lines: Array<ReadonlyArray<number>> = [line]

      for (let i = 0; i < line.length; i++) {
        lines.push([...line.slice(0, i), ...line.slice(i + 1, line.length)])
      }

      return lines
    })
    .map(lines => {
      return lines.map(nextItemDiffReducer)
    })
    .filter(lines => {
      return lines.some(isLineSafe)
    }).length
}

const reader = (file: string): ReadonlyArray<ReadonlyArray<number>> => {
  return readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .map(line => {
      return line
        .trim()
        .split(' ')
        .map(item => parseInt(item, 10))
    })
}

testRuns('02', reader, part1, part2)
solutionRuns('02', reader, part1, part2)
