import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'

interface Input {
  towels: ReadonlyArray<string>
  designs: ReadonlyArray<string>
}

const part1 = (data: Input): number => {
  const isDesignPossible = (design: string, towels: ReadonlyArray<string>): boolean => {
    if (design === '') {
      return true
    }

    for (const towel of towels) {
      if (design.startsWith(towel) && isDesignPossible(design.substring(towel.length), towels)) {
        return true
      }
    }

    return false
  }

  return data.designs.filter(design => isDesignPossible(design, data.towels)).length
}

const part2 = (data: Input): number => {
  const cache = new Map<string, number>()
  const countPossibleRealizations = (design: string, towels: ReadonlyArray<string>): number => {
    if (cache.has(design)) {
      return cache.get(design)
    }

    if (design === '') {
      return 1
    }

    const count = towels.reduce((acc, towel) => {
      if (design.startsWith(towel)) {
        return (acc += countPossibleRealizations(design.substring(towel.length), towels))
      }

      return acc
    }, 0)

    cache.set(design, count)

    return count
  }

  return data.designs
    .map(design => countPossibleRealizations(design, data.towels))
    .reduce((acc, realizations) => acc + realizations, 0)
}

const reader = (file: string): Input => {
  const [rawTowels, rawDesigns] = readFileSync(file, 'utf-8').trim().split('\n\n')

  return {
    towels: rawTowels.split(', ').toSorted((a, b) => b.length - a.length),
    designs: rawDesigns.split('\n'),
  }
}

await runExamples(2024, '19', reader, part1, part2)
await runSolution(2024, '19', reader, part1, part2)
