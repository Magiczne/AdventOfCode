import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'

interface Claim {
  id: number
  x1: number
  y1: number
  x2: number
  y2: number
}

const part1 = (data: ReadonlyArray<Claim>): number => {
  const map = new Map<string, number>()

  data.forEach(claim => {
    for (let x = claim.x1; x < claim.x2; x++) {
      for (let y = claim.y1; y < claim.y2; y++) {
        const key = `${x}_${y}`

        if (map.has(key)) {
          map.set(key, map.get(key) + 1)
        } else {
          map.set(key, 1)
        }
      }
    }
  })

  return [...map.values()].reduce((acc, item) => {
    if (item > 1) {
      return acc + 1
    }

    return acc
  }, 0)
}

const part2 = (data: ReadonlyArray<Claim>): number => {
  const map = new Map<string, number>()

  data.forEach(claim => {
    for (let x = claim.x1; x < claim.x2; x++) {
      for (let y = claim.y1; y < claim.y2; y++) {
        const key = `${x}_${y}`

        if (map.has(key)) {
          map.set(key, map.get(key) + 1)
        } else {
          map.set(key, 1)
        }
      }
    }
  })

  return data.find(claim => {
    for (let x = claim.x1; x < claim.x2; x++) {
      for (let y = claim.y1; y < claim.y2; y++) {
        if (map.get(`${x}_${y}`) > 1) {
          return false
        }
      }
    }

    return true
  }).id
}

const reader = (file: string): ReadonlyArray<Claim> => {
  const regex = /#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/

  return readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .map(line => {
      const [_, id, x, y, w, h] = line.match(regex)

      return {
        id: parseInt(id, 10),
        x1: parseInt(x, 10),
        y1: parseInt(y, 10),
        x2: parseInt(x, 10) + parseInt(w, 10),
        y2: parseInt(y, 10) + parseInt(h, 10),
      }
    })
}

await runExamples(2018, '03', reader, part1, part2)
await runSolution(2018, '03', reader, part1, part2)
