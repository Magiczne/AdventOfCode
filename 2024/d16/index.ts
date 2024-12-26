import { Heap } from 'heap-js'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { Direction, Vec2 } from '@magiczne/advent-of-code-ts-core/math'
import { Matrix, ObjectSet } from '@magiczne/advent-of-code-ts-core/structures'
import { readFileSync } from 'fs'

interface Input {
  map: Matrix<'.' | '#'>
  start: Vec2
  end: Vec2
}

interface HeapNode {
  position: Vec2
  direction: Direction
  points: number
}

interface HeapNode2 extends HeapNode {
  path: Array<Vec2>
}

const positionKey = (pos: Vec2, dir: Direction): string => {
  return `${pos.x}_${pos.y}_${dir.x}_${dir.y}`
}

const part1 = (input: Input): number => {
  const visited = new Set<string>()
  const nodes = new Heap<HeapNode>((a, b) => a.points - b.points)
  const propagate = (positions: Heap<HeapNode>, node: HeapNode, direction: Direction): void => {
    const nextPosition = node.position.add(direction)

    if (input.map.get(nextPosition) === '#') {
      return
    }

    positions.push({
      position: nextPosition,
      direction,
      points: node.points + (node.direction.equals(direction) ? 1 : 1001),
    })
  }

  nodes.push({
    position: input.start,
    direction: Direction.right,
    points: 0,
  })

  while (nodes.length > 0) {
    const node = nodes.pop()

    if (visited.has(positionKey(node.position, node.direction))) {
      continue
    }

    visited.add(positionKey(node.position, node.direction))

    if (node.position.equals(input.end)) {
      return node.points
    }

    // We don't need to check backwards
    propagate(nodes, node, node.direction)
    propagate(nodes, node, node.direction.rotateClockwise())
    propagate(nodes, node, node.direction.rotateCounterClockwise())
  }

  throw new Error('Oops')
}

const part2 = (input: Input): number => {
  const nodes = new Heap<HeapNode2>((a, b) => a.points - b.points)
  const propagate = (positions: Heap<HeapNode2>, node: HeapNode2, direction: Direction): void => {
    const nextPosition = node.position.add(direction)

    if (input.map.get(nextPosition) === '#') {
      return
    }

    positions.push({
      position: nextPosition,
      direction,
      points: node.points + (node.direction.equals(direction) ? 1 : 1001),
      path: [...node.path, nextPosition],
    })
  }

  nodes.push({
    position: input.start,
    direction: Direction.right,
    points: 0,
    path: [input.start],
  })

  let bestScore = Number.MAX_SAFE_INTEGER
  let paths: Array<Array<Vec2>> = []
  const bestScores = new Map<string, number>()

  while (nodes.length > 0) {
    const node = nodes.pop()
    const key = positionKey(node.position, node.direction)

    // Node has worse score than best - don't care
    if (bestScore < Number.MAX_SAFE_INTEGER && node.points > bestScore) {
      continue
    }

    // If we were here but with better scoring - don't care
    const previousBest = bestScores.get(key)
    if (previousBest !== undefined && previousBest < node.points) {
      continue
    }

    bestScores.set(key, node.points)

    if (node.position.equals(input.end)) {
      if (node.points <= bestScore) {
        // I've tried so hard and got so far...
        // in the the score was worse so it does not matter
        if (node.points < bestScore) {
          bestScore = node.points
          paths = []
        }

        paths.push(node.path)
      }

      continue
    }

    // We don't need to check backwards
    propagate(nodes, node, node.direction)
    propagate(nodes, node, node.direction.rotateClockwise())
    propagate(nodes, node, node.direction.rotateCounterClockwise())
  }

  const bestPoints = new ObjectSet<Vec2>(Vec2.hashFn)
  paths.forEach(path => {
    path.forEach(point => {
      bestPoints.add(point)
    })
  })

  return bestPoints.size
}

const reader = (file: string): Input => {
  const map = Matrix.fromString(readFileSync(file, 'utf-8'), Matrix.identityMapper)
  const start = map.find('S')
  const end = map.find('E')

  map.set(start, '.')
  map.set(end, '.')

  return {
    map: map as Matrix<'.' | '#'>,
    start,
    end,
  }
}

await runExamples(2024, '16', reader, part1, part2)
await runSolution(2024, '16', reader, part1, part2)
