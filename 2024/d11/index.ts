import { readFileSync } from 'node:fs'
import { sep } from 'node:path'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'

interface Input {
  blinkCount: {
    part1: number
    part2: number
  }
  data: ReadonlyArray<number>
}

const processStone = (stone: number): ReadonlyArray<number> => {
  if (stone === 0) {
    return [1]
  }

  const valueAsText = stone.toString()
  const valueLength = valueAsText.length

  if (valueLength % 2 === 0) {
    const center = Math.floor(valueLength / 2)

    return [parseInt(valueAsText.slice(0, center), 10), parseInt(valueAsText.slice(center), 10)]
  }

  return [stone * 2024]
}

const countStonesCache = new Map<string, number>()

const countStones = (stone: number, count: number): number => {
  if (countStonesCache.has(`${stone}_${count}`)) {
    return countStonesCache.get(`${stone}_${count}`)
  }

  if (count === 0) {
    return 1
  }

  const values = processStone(stone)
  const returnValue = values.map(value => countStones(value, count - 1)).reduce((acc, value) => acc + value)

  countStonesCache.set(`${stone}_${count}`, returnValue)

  return returnValue
}

const part1 = (input: Input): number => {
  return input.data.map(value => countStones(value, input.blinkCount.part1)).reduce((acc, value) => acc + value)
}

const part2 = (input: Input): number => {
  return input.data.map(value => countStones(value, input.blinkCount.part2)).reduce((acc, value) => acc + value)
}

const reader = (file: string): Input => {
  const fileParts = file.split(sep)
  const fileName = fileParts[fileParts.length - 1]

  return {
    blinkCount: {
      '0.txt': {
        part1: 1,
        part2: 1,
      },
      '1.txt': {
        part1: 6,
        part2: 6,
      },
      'input.txt': {
        part1: 25,
        part2: 75,
      },
    }[fileName] ?? { part1: 0, part2: 0 },
    data: readFileSync(file, 'utf-8')
      .trim()
      .split(' ')
      .map(item => parseInt(item, 10)),
  }
}

runExamples(2024, '11', reader, part1, part2)
runSolution(2024, '11', reader, part1, part2)
