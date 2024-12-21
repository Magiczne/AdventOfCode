import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { Direction, Vec2 } from '@magiczne/advent-of-code-ts-core/math'

type Keypad = ReadonlyArray<ReadonlyArray<string | null>>

const numericKeypad: Keypad = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  [null, '0', 'A'],
]

const directionalKeypad: Keypad = [
  [null, '^', 'A'],
  ['<', 'v', '>'],
]

const getKeyPosition = (keypad: Keypad, key: string): Vec2 => {
  const row = keypad.find(row => row.some(value => value === key))

  return new Vec2({
    x: row.findIndex(value => value === key),
    y: keypad.indexOf(row),
  })
}

const getPaths = (keypad: Keypad, start: string, end: string): Array<string> => {
  if (start === end) {
    return ['A']
  }

  const boundaryMin = new Vec2({ x: 0, y: 0 })
  const boundaryMax = new Vec2({ x: keypad[0].length - 1, y: keypad.length - 1 })

  const queue: Array<{ position: Vec2; path: string }> = [{ position: getKeyPosition(keypad, start), path: '' }]
  const distances = new Map<string, number>()
  const paths: Array<string> = []

  while (queue.length > 0) {
    const current = queue.shift()

    // Found the end - save path
    if (current.position.equals(getKeyPosition(keypad, end))) {
      paths.push(`${current.path}A`)

      continue
    }

    // Longer path - we don't care
    if (
      distances.has(Vec2.hashFn(current.position)) &&
      distances.get(Vec2.hashFn(current.position)) < current.path.length
    ) {
      continue
    }

    Direction.cardinal.forEach(direction => {
      const neighbor = current.position.add(direction)

      if (!neighbor.inside(boundaryMin, boundaryMax)) {
        return
      }

      if (keypad[neighbor.y]?.[neighbor.x] === null) {
        return
      }

      const newPath = current.path + direction.toString()

      if (!distances.has(Vec2.hashFn(neighbor)) || distances.get(Vec2.hashFn(neighbor)) >= newPath.length) {
        queue.push({ position: neighbor, path: newPath })
        distances.set(Vec2.hashFn(neighbor), newPath.length)
      }
    })
  }

  return paths.toSorted((a, b) => a.length - b.length)
}

const getKeyPresses = (keypad: Keypad, code: string, depth: number, cache: Map<string, number>): number => {
  const cacheKey = `${code},${depth}`

  if (!cache.has(cacheKey)) {
    cache.set(
      cacheKey,
      code.split('').reduce(
        (acc, symbol) => {
          const moves = getPaths(keypad, acc.current, symbol)
          const length =
            depth === 0
              ? moves[0].length
              : Math.min(...moves.map(move => getKeyPresses(directionalKeypad, move, depth - 1, cache)))

          return {
            current: symbol,
            sum: acc.sum + length,
          }
        },
        { current: 'A', sum: 0 },
      ).sum,
    )
  }

  return cache.get(cacheKey)
}

const part1 = (data: ReadonlyArray<string>): number => {
  const cache = new Map<string, number>()

  return data.reduce((acc, code) => {
    const codeValue = parseInt(code, 10)

    return acc + codeValue * getKeyPresses(numericKeypad, code, 2, cache)
  }, 0)
}

const part2 = (data: ReadonlyArray<string>): number => {
  const cache = new Map<string, number>()

  return data.reduce((acc, code) => {
    const codeValue = parseInt(code, 10)

    return acc + codeValue * getKeyPresses(numericKeypad, code, 25, cache)
  }, 0)
}

const reader = (file: string): ReadonlyArray<string> => {
  return readFileSync(file, 'utf-8').trim().split('\n')
}

await runExamples(2024, '21', reader, part1, part2)
await runSolution(2024, '21', reader, part1, part2)
