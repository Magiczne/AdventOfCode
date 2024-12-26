import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'

const dontDoMatch = /don't\(\)(.+?)(do\(\)|$)/gs
const mulMatch = /mul\((\d{1,3}),(\d{1,3})\)/gs

const calculateMulSum = (data: string): number => {
  return [...data.matchAll(mulMatch)]
    .map(match => {
      return [parseInt(match[1], 10), parseInt(match[2], 10)]
    })
    .map(match => match[0] * match[1])
    .reduce((acc, result) => acc + result, 0)
}

const part1 = (data: string): number => {
  return calculateMulSum(data)
}

const part2 = (data: string): number => {
  return calculateMulSum(data.replaceAll(dontDoMatch, ''))
}

const reader = (file: string): string => {
  return readFileSync(file, 'utf-8').trim()
}

await runExamples(2024, '03', reader, part1, part2)
await runSolution(2024, '03', reader, part1, part2)
