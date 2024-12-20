import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { Direction, Vec2 } from '@magiczne/advent-of-code-ts-core/math'
import { ObjectSet } from '@magiczne/advent-of-code-ts-core/structures'
import { counting } from 'radash'

interface Input {
  start: Vec2
  end: Vec2
  map: ReadonlyArray<ReadonlyArray<'.' | '#'>>
}

// Only 70s, not so bad :P
const part1 = (data: Input): number => {
  const boundaryMin = new Vec2({ x: 1, y: 1 })
  const boundaryMax = new Vec2({ x: data.map[0].length - 2, y: data.map.length - 2 })
  const possibleCheats = new ObjectSet<Vec2>(Vec2.hashFn)

  const traverse = (map: ReadonlyArray<ReadonlyArray<'.' | '#'>>, start: Vec2, end: Vec2): number => {
    const queue: Array<Vec2> = [start]
    const distances = new Map<string, number>()

    while (queue.length > 0) {
      const point = queue.shift()

      Direction.cardinal.forEach(direction => {
        const neighbor = point.add(direction) 

        if (!neighbor.inside(boundaryMin, boundaryMax)) {
          return
        }

        if (map[neighbor.y][neighbor.x] === '#') {
          return
        }

        if (!distances.has(Vec2.hashFn(neighbor))) {
          distances.set(Vec2.hashFn(neighbor), (distances.get(Vec2.hashFn(point)) ?? 0) + 1)
          queue.push(neighbor)
        }
      })
    }

    return distances.get(Vec2.hashFn(end))
  }

  const baseTime = traverse(data.map, data.start, data.end)

  // Skipping borders
  for (let y = 1; y < data.map.length - 1; y++) {
    for (let x = 1; x < data.map[0].length - 1; x++) {
      const point = new Vec2({ x, y })

      if (data.map[y][x] !== '#') {
        continue
      }
      
      Direction.cardinal.forEach(direction => {
        const neighbor = point.add(direction)

        if (data.map[neighbor.y]?.[neighbor.x] === '#') {
          return
        }

        possibleCheats.add(point)
      })
    }
  }

  const cheatSavings = [...possibleCheats].map(cheat => {
    const map = data.map.map(row => [...row])
    map[cheat.y][cheat.x] = '.'

    return baseTime - traverse(map, data.start, data.end)
  })

  return cheatSavings.filter(saving => saving >= 100).length
}

const part2 = (data: Input): number => {
  return 0
}

const reader = (file: string): Input => {
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
    map: map as ReadonlyArray<ReadonlyArray<'.' | '#'>>
  }
}

await runExamples(2024, '20', reader, part1, part2)
await runSolution(2024, '20', reader, part1, part2)