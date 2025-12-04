import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { getNeighbors } from '@magiczne/advent-of-code-ts-core/matrix'
import { IVec2 } from '@magiczne/advent-of-code-ts-core/types'

const enum MapItem {
  None = '.',
  Roll = '@',
}

type RollMap = Array<Array<MapItem>>

const part1 = (data: RollMap): number => {
  let accessibleRolls = 0

  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[0].length; x++) {
      if (data[y][x] !== MapItem.Roll) {
        continue
      }

      const neighboringRolls = getNeighbors(y, x, data).filter(item => item === MapItem.Roll)

      if (neighboringRolls.length < 4) {
        accessibleRolls++
      }
    }
  }

  return accessibleRolls
}

const part2 = (data: RollMap): number => {
  let removableRolls = 0

  while (true) {
    const toRemove: Array<IVec2> = []

    for (let y = 0; y < data.length; y++) {
      for (let x = 0; x < data[0].length; x++) {
        if (data[y][x] !== MapItem.Roll) {
          continue
        }

        const neighboringRolls = getNeighbors(y, x, data).filter(item => item === MapItem.Roll)

        if (neighboringRolls.length < 4) {
          toRemove.push({ x, y })
        }
      }
    }

    if (toRemove.length === 0) {
      break
    }

    removableRolls += toRemove.length
    toRemove.forEach(item => {
      data[item.y][item.x] = MapItem.None
    })
  }

  return removableRolls
}

const reader = (file: string): RollMap => {
  return readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .map(line => line.trim().split('')) as RollMap
}

await runExamples(2025, '04', reader, part1, part2)
await runSolution(2025, '04', reader, part1, part2)
