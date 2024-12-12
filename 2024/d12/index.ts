import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { ObjectSet } from '@magiczne/advent-of-code-ts-core/structures'
import type { Vec2 } from '@magiczne/advent-of-code-ts-core/types'

type Garden = Array<Array<string>>

const directions: ReadonlyArray<Vec2> = [
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
]

const neighbors = (pos: Vec2): ReadonlyArray<Vec2> => {
  return directions.map(direction => {
    return {
      x: pos.x + direction.x,
      y: pos.y + direction.y,
    }
  })
}

const floodFill = (garden: Garden, position: Vec2) => {
  const crop = garden[position.y][position.x]
  const queue: Array<Vec2> = [position]
  const visited = new ObjectSet<Vec2>(item => `${item.x}_${item.y}`)

  visited.add(position)
  garden[position.y][position.x] = '.'

  while (queue.length > 0) {
    const pos = queue.shift()!

    neighbors(pos).forEach(neighbor => {
      if (garden[neighbor.y]?.[neighbor.x] === undefined) {
        return
      }

      if (garden[neighbor.y][neighbor.x] === crop) {
        visited.add(neighbor)
        garden[neighbor.y][neighbor.x] = '.'

        queue.push(neighbor)
      }
    })
  }

  const points = [...visited]
  const perimeter = points.reduce((acc, point) => {
    return (
      acc +
      neighbors(point).reduce((acc2, neighbor) => {
        if (points.find(p => p.x === neighbor.x && p.y === neighbor.y)) {
          return acc2
        }

        return acc2 + 1
      }, 0)
    )
  }, 0)

  return {
    perimeter,
    points,
  }
}

const part1 = (data: Garden): number => {
  const floodedGarden = structuredClone(data)
  let price = 0

  for (let y = 0; y < floodedGarden.length; y++) {
    for (let x = 0; x < floodedGarden.length; x++) {
      if (floodedGarden[y][x] !== '.') {
        const floodedRegion = floodFill(floodedGarden, { x, y })

        price += floodedRegion.perimeter * floodedRegion.points.length
      }
    }
  }

  return price
}

const part2 = (data: Garden): number => {
  return 0
}

const reader = (file: string): Garden => {
  return readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .map(line => {
      return line.split('')
    })
}

runExamples(2024, '12', reader, part1, part2)
runSolution(2024, '12', reader, part1, part2)
