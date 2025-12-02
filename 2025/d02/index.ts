import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { range } from 'radash'

interface Line {
  from: string
  to: string
}

const sumInvalid = (data: ReadonlyArray<Line>, isInvalidRegex: RegExp): number => {
  return data.reduce((acc, line) => {
    const idRange = range(parseInt(line.from, 10), parseInt(line.to, 10))

    for (const id of idRange) {
      if (id.toString().startsWith('0')) {
        continue
      }

      if (isInvalidRegex.test(id.toString())) {
        acc += id
      }
    }

    return acc
  }, 0)
}

const part1 = (data: ReadonlyArray<Line>): number => {
  return sumInvalid(data, new RegExp('^(\\d+)\\1$'))
}

const part2 = (data: ReadonlyArray<Line>): number => {
  return sumInvalid(data, new RegExp('^(\\d+)\\1+$'))
}

const reader = (file: string): ReadonlyArray<Line> => {
  return readFileSync(file, 'utf-8')
    .trim()
    .split(',')
    .map(line => {
      const range = line.trim().split('-')

      return {
        from: range[0],
        to: range[1],
      }
    })
}

await runExamples(2025, '02', reader, part1, part2)
await runSolution(2025, '02', reader, part1, part2)
