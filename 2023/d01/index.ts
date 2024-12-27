import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { isNumeric } from '@magiczne/advent-of-code-ts-core/string'
import { readFileSync } from 'node:fs'
import { first, last } from 'radash'

const part1 = (data: ReadonlyArray<string>): number => {
  return data
    .map(item => {
      const data = item.split('').filter(letter => isNumeric(letter))

      return Number(`${first(data)}${last(data)}`)
    })
    .reduce((acc, item) => acc + item, 0)
}

const part2 = (data: ReadonlyArray<string>): number => {
  const letterNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

  return data
    .map(line => {
      return [...line.matchAll(/(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g)]
        .map(match => match[1])
        .map(match => (isNumeric(match) ? Number(match) : letterNumbers.indexOf(match) + 1))
    })
    .map(data => Number(`${first(data)}${last(data)}`))
    .reduce((acc, item) => acc + item, 0)
}

const reader = (file: string): ReadonlyArray<string> => {
  return readFileSync(file, 'utf-8').trim().split('\n')
}

await runExamples(2023, '01', reader, part1, part2)
await runSolution(2023, '01', reader, part1, part2)
