import { readFileSync } from 'node:fs'
import { sep } from 'node:path'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { Direction, Vec2 } from '@magiczne/advent-of-code-ts-core/math'

interface Input {
  start: Vec2
  end: Vec2
  map: ReadonlyArray<ReadonlyArray<'.' | '#'>>
  savings: {
    part1: number
    part2: number
  }
}

const traverse = (map: ReadonlyArray<ReadonlyArray<'.' | '#'>>, start: Vec2): Map<string, number> => {
  const boundaryMin = new Vec2({ x: 0, y: 0 })
  const boundaryMax = new Vec2({ x: map[0].length - 1, y: map.length - 1 })
  const queue: Array<{ position: Vec2; distance: number }> = [{ position: start, distance: 0 }]
  const distances = new Map<string, number>()

  distances.set(Vec2.hashFn(start), 0)

  while (queue.length > 0) {
    const current = queue.shift()

    Direction.cardinal.forEach(direction => {
      const neighbor = current.position.add(direction)

      if (!neighbor.inside(boundaryMin, boundaryMax)) {
        return
      }

      if (map[neighbor.y][neighbor.x] === '#') {
        return
      }

      const distance = current.distance + 1

      if (!distances.has(Vec2.hashFn(neighbor)) || distances.get(Vec2.hashFn(neighbor)) > distance) {
        queue.push({ position: neighbor, distance })
        distances.set(Vec2.hashFn(neighbor), distance)
      }
    })
  }

  return distances
}

const countCheatedPaths = (data: Input, maxCheatLength: number, savings: number): number => {
  const distances = traverse(data.map, data.end)
  const pathPoints = [...distances.keys()]

  return pathPoints.reduce((acc, startPoint) => {
    return (
      acc +
      pathPoints.reduce((acc2, endPoint) => {
        if (startPoint === endPoint) {
          return acc2
        }

        const start = Vec2.fromHash(startPoint)
        const end = Vec2.fromHash(endPoint)
        const dist = start.manhattanDistance(end)

        if (dist > maxCheatLength) {
          return acc2
        }

        if (distances.get(startPoint) - distances.get(endPoint) - dist >= savings) {
          return acc2 + 1
        }

        return acc2
      }, 0)
    )
  }, 0)
}

const part1 = (data: Input): number => {
  return countCheatedPaths(data, 2, data.savings.part1)
}

const part2 = (data: Input): number => {
  return countCheatedPaths(data, 20, data.savings.part2)
}

const reader = (file: string): Input => {
  const fileParts = file.split(sep)
  const fileName = fileParts[fileParts.length - 1]

  const map = readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .map(line => line.trim().split(''))

  const start = new Vec2()
  const end = new Vec2()

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === 'S') {
        start.updateInPlace({ x, y })
        map[y][x] = '.'
      }

      if (map[y][x] === 'E') {
        end.updateInPlace({ x, y })
        map[y][x] = '.'
      }
    }
  }

  return {
    start,
    end,
    map: map as ReadonlyArray<ReadonlyArray<'.' | '#'>>,
    savings: {
      '0.txt': {
        part1: 20,
        part2: 76,
      },
      'input.txt': {
        part1: 100,
        part2: 100,
      },
    }[fileName] ?? { part1: 0, part2: 0 },
  }
}

await runExamples(2024, '20', reader, part1, part2) // 21s
await runSolution(2024, '20', reader, part1, part2)
