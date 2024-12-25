import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { rotateClockwise, rotateCounterClockwise } from '@magiczne/advent-of-code-ts-core/matrix'

type Lock = [number, number, number, number, number]
type Key = [number, number, number, number, number]

interface Input {
  locks: ReadonlyArray<Lock>
  keys: ReadonlyArray<Key>
}

// Excluding top row for lock and bottom row for key
const LOCK_SIZE = 5

const part1 = (data: Input): number => {
  return data.locks.reduce((lockAcc, lock) => {
    return (
      lockAcc +
      data.keys.reduce((keyAcc, key) => {
        if (key.some((value, index) => value + lock[index] > LOCK_SIZE)) {
          return keyAcc
        }

        return keyAcc + 1
      }, 0)
    )
  }, 0)
}

const part2 = (data: Input): number => {
  return 0
}

const reader = (file: string): Input => {
  const data = readFileSync(file, 'utf-8').trim().split('\n\n')

  return {
    locks: data
      .filter(item => item.startsWith('#####'))
      .map(item => {
        return item
          .trim()
          .split('\n')
          .slice(1)
          .map(line => line.trim().split(''))
      })
      .map(item => rotateCounterClockwise(item))
      .map(item => {
        return item
          .map(row => {
            return row.filter(value => value === '#').length
          })
          .toReversed() as Lock
      }),
    keys: data
      .filter(item => item.startsWith('.....'))
      .map(item => {
        return item
          .trim()
          .split('\n')
          .slice(0, -1)
          .map(line => line.trim().split(''))
      })
      .map(item => rotateClockwise(item))
      .map(item => {
        return item.map(row => {
          return row.filter(value => value === '#').length
        }) as Key
      }),
  }
}

await runExamples(2024, '25', reader, part1, part2)
await runSolution(2024, '25', reader, part1, part2)
