import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'

type BatteryBank = ReadonlyArray<number>

const getBestBatterySet = (bank: BatteryBank, start: number, setLength: number): ReadonlyArray<number> => {
  if (setLength === 0) {
    return []
  }

  // We're searching inside slice that guarantees enough space for remaining batteries in the set
  const end = bank.length - setLength + 1
  const slice = bank.slice(start, end)
  const highestBatteryInSlice = Math.max(...slice)

  return [
    highestBatteryInSlice,
    ...getBestBatterySet(bank, start + slice.indexOf(highestBatteryInSlice) + 1, setLength - 1),
  ]
}

const getBestBatterySetValue = (bank: BatteryBank, setLength: number): number => {
  return parseInt(getBestBatterySet(bank, 0, setLength).join(''))
}

const part1 = (data: ReadonlyArray<BatteryBank>): number => {
  return data.reduce((acc, bank) => {
    return acc + getBestBatterySetValue(bank, 2)
  }, 0)
}

const part2 = (data: ReadonlyArray<BatteryBank>): number => {
  return data.reduce((acc, bank) => {
    return acc + getBestBatterySetValue(bank, 12)
  }, 0)
}

const reader = (file: string): ReadonlyArray<BatteryBank> => {
  return readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .map(bank => {
      return bank
        .trim()
        .split('')
        .map(item => parseInt(item, 10))
    })
}

await runExamples(2025, '03', reader, part1, part2)
await runSolution(2025, '03', reader, part1, part2)
