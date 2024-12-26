import { readFileSync } from 'node:fs'
import { counting, sum } from 'radash'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'

const part1 = (data: ReadonlyArray<[number, number]>): number => {
  const left = data.map(item => item[0]).toSorted((a, b) => a - b)
  const right = data.map(item => item[1]).toSorted((a, b) => a - b)
  const distances = left.map((item, index) => Math.abs(item - right[index]))

  return sum(distances)
}

const part2 = (data: ReadonlyArray<[number, number]>): number => {
  const rightCounts = counting(
    data.map(item => item[1]),
    item => item,
  )
  const similiarityScores = data.map(item => (rightCounts[item[0]] ?? 0) * item[0])

  return sum(similiarityScores)
}

const reader = (file: string): ReadonlyArray<[number, number]> => {
  return readFileSync(file, 'utf-8')
    .split('\n')
    .map(line => {
      const match = line.match(/(\d+)\s+(\d+)/)

      return [parseInt(match[1], 10), parseInt(match[2], 10)] as [number, number]
    })
}

await runExamples(2024, '01', reader, part1, part2)
await runSolution(2024, '01', reader, part1, part2)
