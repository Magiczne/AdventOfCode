import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'

const dontDoMatch = /don't\(\).+?do\(\)/gm
const mulMatch = /mul\((\d+),(\d+)\)/gm

const part1 = (data: string): number => {
  return [...data.matchAll(mulMatch)]
    .map(match => {
      return [
        parseInt(match[1], 10),
        parseInt(match[2], 10)
      ]
    })
    .map(match => match[0] * match[1])
    .reduce((acc, result) => acc + result, 0)
}

const part2 = (data: string): number => {
  const dontDoSections = data.matchAll(dontDoMatch)
  const clearData = data.replaceAll(dontDoMatch, '')

  return [...clearData.matchAll(mulMatch)]
    .map(match => {
      return [
        parseInt(match[1], 10),
        parseInt(match[2], 10)
      ]
    })
    .map(match => match[0] * match[1])
    .reduce((acc, result) => acc + result, 0)

}

const reader = (file: string): string => {
  return readFileSync(file, 'utf-8').trim()
}

runExamples(2024, '03', reader, part1, part2)
runSolution(2024, '03', reader, part1, part2)