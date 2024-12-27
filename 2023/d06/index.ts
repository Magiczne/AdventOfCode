import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { zip } from 'radash'

import { Race } from './race'

const readRaces = (file: string): ReadonlyArray<Race> => {
  const [rawTimes, rawDistances] = readFileSync(file, 'utf-8').trim().split('\n')

  const times = rawTimes.split(':')[1].trim().split(/\s+/)
  const distances = rawDistances.split(':')[1].trim().split(/\s+/)

  return zip(times, distances).map(([time, distance]) => {
    return new Race(Number(time), Number(distance))
  })
}

const part1 = (file: string): number => {
  const races = readRaces(file)

  return races.reduce((acc, race) => {
    return acc * race.winOptions
  }, 1)
}

const part2 = (file: string): number => {
  const [time, distance] = readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .map(line => {
      return line.split(':')[1].replaceAll(/\s+/g, '')
    })
    .map(line => Number(line))

  return new Race(time, distance).winOptions
}

const reader = (file: string): string => file

await runExamples(2023, '06', reader, part1, part2)
await runSolution(2023, '06', reader, part1, part2)
