import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { windows } from '@magiczne/advent-of-code-ts-core/array'
import { combinationsWithoutRepetition } from '@magiczne/advent-of-code-ts-core/combinatorics'
import { Box2, Line2, Vec2 } from '@magiczne/advent-of-code-ts-core/math'

const part1 = (data: ReadonlyArray<Vec2>): number => {
  return Math.max(
    ...combinationsWithoutRepetition(data, 2)
      .map(([a, b]) => new Box2(a, b))
      .map(box => box.area),
  )
}

const part2 = (data: ReadonlyArray<Vec2>): number => {
  const edges = windows([...data, data[0]], 2).map(([a, b]) => {
    return new Line2(a, b)
  })

  return Math.max(
    ...combinationsWithoutRepetition(data, 2)
      .map(([a, b]) => new Box2(a, b))
      .filter(box => !edges.some(edge => box.intersectsLine(edge)))
      .filter(box => box.insidePolygon(edges))
      .map(box => box.area),
  )
}

const reader = (file: string): ReadonlyArray<Vec2> => {
  return readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .map(line => {
      const [x, y] = line.split(',')

      return new Vec2({
        x: parseInt(x, 10),
        y: parseInt(y, 10),
      })
    })
}

await runExamples(2025, '09', reader, part1, part2)
await runSolution(2025, '09', reader, part1, part2)
