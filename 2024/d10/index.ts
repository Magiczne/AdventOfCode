import { readFileSync } from 'node:fs'
import { unique } from 'radash'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import type { Vec2 } from '@magiczne/advent-of-code-ts-core/types'

interface Input {
  map: ReadonlyArray<ReadonlyArray<number>>
  trailheads: ReadonlyArray<Vec2>
}

// Find every neighbor that is larger than one from current position
const findIncrementedNeighbors = (map: ReadonlyArray<ReadonlyArray<number>>, position: Vec2): ReadonlyArray<Vec2> => {
  return [
    { x: position.x, y: position.y - 1 },
    { x: position.x, y: position.y + 1 },
    { x: position.x - 1, y: position.y },
    { x: position.x + 1, y: position.y },
  ].filter(item => {
    return map[item.y]?.[item.x] === map[position.y][position.x] + 1
  })
}

const part1 = (data: Input): number => {
  let score = 0

  // Searching routes for each trailhead
  data.trailheads.forEach(trailhead => {
    let positionQueue: Array<Vec2> = [trailhead]

    while (positionQueue.length > 0) {
      score += positionQueue.filter(position => data.map[position.y][position.x] === 9).length

      // Removing duplicates that may come from two different nodes in queue - we only need one path in this part of task
      positionQueue = unique(
        positionQueue.reduce((acc, position) => {
          if (data.map[position.y][position.x] === 9) {
            return acc
          }

          return [...acc, ...findIncrementedNeighbors(data.map, position)]
        }, []),
        item => `${item.x}${item.y}`,
      )
    }
  })

  return score
}

const part2 = (data: Input): number => {
  let score = 0

  // Searching routes for each trailhead
  data.trailheads.forEach(trailhead => {
    let positionQueue: Array<Vec2> = [trailhead]

    while (positionQueue.length > 0) {
      score += positionQueue.filter(position => data.map[position.y][position.x] === 9).length

      positionQueue = positionQueue.reduce<Array<Vec2>>((acc, position) => {
        if (data.map[position.y][position.x] === 9) {
          return acc
        }

        return [...acc, ...findIncrementedNeighbors(data.map, position)]
      }, [])
    }
  })

  return score
}

const reader = (file: string): Input => {
  const map = readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .map(line => {
      return line.split('').map(item => parseInt(item, 10))
    })

  const trailheads = map.flatMap((row, y) => {
    return row.reduce<ReadonlyArray<Vec2>>((acc, item, x) => {
      if (item !== 0) {
        return acc
      }

      return [...acc, { x, y }]
    }, [])
  })

  return {
    map,
    trailheads,
  }
}

runExamples(2024, '10', reader, part1, part2)
runSolution(2024, '10', reader, part1, part2)
