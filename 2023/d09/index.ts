import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'

import { Sequence } from './sequence'

const readSequences = (file: string): ReadonlyArray<Sequence> => {
  return readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .map(line => {
      return line.split(' ').map(number => Number(number))
    })
    .map(data => new Sequence(data))
}

const part1 = (sequences: ReadonlyArray<Sequence>) => {
  return sequences.map(sequence => sequence.extrapolateNextValue()).reduce((acc, value) => acc + value, 0)
}

const part2 = (sequences: ReadonlyArray<Sequence>) => {
  return sequences.map(sequence => sequence.extrapolatePreviousValue()).reduce((acc, value) => acc + value, 0)
}

await runExamples(2023, '09', readSequences, part1, part2)
await runSolution(2023, '09', readSequences, part1, part2)
