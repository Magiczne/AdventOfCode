import { readFileSync } from 'node:fs'
import { sep } from 'node:path'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { Direction, Vec2 } from '@magiczne/advent-of-code-ts-core/math'
import { IVec2 } from '@magiczne/advent-of-code-ts-core/types'

interface Input {
  bytesCount: number
  corruptedBytes: ReadonlyArray<Vec2>
  memorySize: IVec2
}

type MemoryMap = ReadonlyArray<ReadonlyArray<'.' | '#'>>

const createMap = (data: Input, bytesCount: number): MemoryMap => {
  const map: ReadonlyArray<Array<'.' | '#'>> = Array.from({ length: data.memorySize.y }, () => {
    return Array.from({ length: data.memorySize.x }, () => '.')
  })

  for (let i = 0; i < bytesCount; i++) {
    const byte = data.corruptedBytes[i]

    map[byte.y][byte.x] = '#'
  }

  return map
}

const traverse = (map: MemoryMap, start: Vec2, end: Vec2): Map<string, number> => {
  const queue: Array<Vec2> = [start]
  const distances = new Map<string, number>()

  while (queue.length > 0) {
    const point = queue.shift()

    Direction.cardinal.forEach(direction => {
      const neighbor = point.add(direction)

      if (!neighbor.inside(start, end)) {
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

  return distances
}

const part1 = (data: Input): string => {
  const map = createMap(data, data.bytesCount)
  const start = new Vec2({ x: 0, y: 0 })
  const end = new Vec2({ x: data.memorySize.x - 1, y: data.memorySize.y - 1 })
  const distances = traverse(map, start, end)

  return distances.get(Vec2.hashFn(end)).toString()
}

const part2 = (data: Input): string => {
  const start = new Vec2({ x: 0, y: 0 })
  const end = new Vec2({ x: data.memorySize.x - 1, y: data.memorySize.y - 1 })

  for (let bytesCount = data.bytesCount + 1; bytesCount < data.corruptedBytes.length; bytesCount++) {
    const map = createMap(data, bytesCount)
    const distances = traverse(map, start, end)

    if (!distances.has(Vec2.hashFn(end))) {
      return data.corruptedBytes[bytesCount - 1].toString()
    }
  }

  return 'Nope'
}

const reader = (file: string): Input => {
  const fileParts = file.split(sep)
  const fileName = fileParts[fileParts.length - 1]

  return {
    bytesCount:
      {
        '0.txt': 12,
        'input.txt': 1024,
      }[fileName] ?? 0,
    corruptedBytes: readFileSync(file, 'utf-8')
      .trim()
      .split('\n')
      .map(line => {
        const coords = line.split(',')

        return new Vec2({
          x: parseInt(coords[0], 10),
          y: parseInt(coords[1], 10),
        })
      }),
    memorySize: {
      '0.txt': { x: 7, y: 7 },
      'input.txt': { x: 71, y: 71 },
    }[fileName] ?? { x: 0, y: 0 },
  }
}

await runExamples(2024, '18', reader, part1, part2)
await runSolution(2024, '18', reader, part1, part2)
