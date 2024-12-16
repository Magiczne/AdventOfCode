import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { Direction, Vec2 } from '@magiczne/advent-of-code-ts-core/math'
import { ObjectSet } from '@magiczne/advent-of-code-ts-core/structures'

type Garden = Array<Array<string>>

interface WallSegment {
  point: Vec2
  direction: Vec2
}

interface Wall {
  start: Vec2
  end: Vec2
  direction: Vec2
}

const neighbors = (pos: Vec2): ReadonlyArray<Vec2> => {
  return Direction.cardinal.map(direction => {
    return direction.add(pos)
  })
}

const floodFill = (garden: Garden, position: Vec2) => {
  const crop = garden[position.y][position.x]
  const queue: Array<Vec2> = [position]
  const visited = new ObjectSet<Vec2>(item => `${item.x}_${item.y}`)
  const wallSegments: Array<WallSegment> = []

  visited.add(position)
  garden[position.y][position.x] = '.'

  while (queue.length > 0) {
    const pos = queue.shift()!

    neighbors(pos).forEach(neighbor => {
      if (garden[neighbor.y]?.[neighbor.x] !== crop && !visited.has(neighbor)) {
        wallSegments.push({
          point: pos,
          // If I had direction here... but i have only neighbors xD
          direction: neighbor.sub(pos),
        })
      }

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

  // Sorting for debugging only
  wallSegments.sort((a, b) => {
    const xDir = a.direction.x - b.direction.x
    if (xDir === 0) {
      return a.direction.y - b.direction.y
    }

    return xDir
  })

  const walls: Array<Wall> = []

  wallSegments.forEach(wallSegment => {
    if (wallSegment.direction.x !== 0) {
      const foundWall = walls.find(wall => {
        return (
          // Direction
          wall.direction.x === wallSegment.direction.x &&
          // Being linear
          wall.start.x === wall.end.x &&
          wall.start.x === wallSegment.point.x &&
          // Adjacency
          (wall.start.y - 1 === wallSegment.point.y || wallSegment.point.y === wall.end.y + 1)
        )
      })

      if (foundWall) {
        foundWall.start.y = Math.min(foundWall.start.y, wallSegment.point.y)
        foundWall.end.y = Math.max(foundWall.end.y, wallSegment.point.y)
      } else {
        walls.push({
          direction: wallSegment.direction.clone(),
          start: wallSegment.point.clone(),
          end: wallSegment.point.clone(),
        })
      }

      return
    }

    if (wallSegment.direction.y !== 0) {
      const foundWall = walls.find(wall => {
        return (
          // Direction
          wall.direction.y === wallSegment.direction.y &&
          // Being linear
          wall.start.y === wall.end.y &&
          wall.start.y === wallSegment.point.y &&
          // Adjacency
          (wall.start.x - 1 === wallSegment.point.x || wallSegment.point.x === wall.end.x + 1)
        )
      })

      if (foundWall) {
        foundWall.start.x = Math.min(foundWall.start.x, wallSegment.point.x)
        foundWall.end.x = Math.max(foundWall.end.x, wallSegment.point.x)
      } else {
        walls.push({
          direction: wallSegment.direction.clone(),
          start: wallSegment.point.clone(),
          end: wallSegment.point.clone(),
        })
      }

      return
    }

    throw new Error('WTF')
  })

  return {
    perimeter,
    sides: walls.length,
    points,
  }
}

const part1 = (data: Garden): number => {
  const floodedGarden = structuredClone(data)
  let price = 0

  for (let y = 0; y < floodedGarden.length; y++) {
    for (let x = 0; x < floodedGarden.length; x++) {
      if (floodedGarden[y][x] !== '.') {
        const floodedRegion = floodFill(floodedGarden, new Vec2({ x, y }))

        price += floodedRegion.perimeter * floodedRegion.points.length
      }
    }
  }

  return price
}

const part2 = (data: Garden): number => {
  const floodedGarden = structuredClone(data)
  let price = 0

  for (let y = 0; y < floodedGarden.length; y++) {
    for (let x = 0; x < floodedGarden.length; x++) {
      if (floodedGarden[y][x] !== '.') {
        const floodedRegion = floodFill(floodedGarden, new Vec2({ x, y }))

        price += floodedRegion.sides * floodedRegion.points.length
      }
    }
  }

  return price
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
