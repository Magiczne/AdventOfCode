import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { Range } from '@magiczne/advent-of-code-ts-core/structures'

import { Almanac, AlmanacMap, AlmanacMapRange, Category } from './almanac'

const readAlmanac = <T extends boolean, TData extends number | Range = T extends true ? Range : number>({
  file,
  seedsAsRange,
}: {
  file: string
  seedsAsRange: T
}): Almanac<TData> => {
  const [rawSeedsLine, ...rawMaps] = readFileSync(file, 'utf-8').trim().split('\n\n')

  const rawSeeds = rawSeedsLine.split(': ')[1]
  let seeds: ReadonlyArray<TData>

  if (seedsAsRange) {
    const parsedSeeds = [...rawSeeds.matchAll(/(\d+) (\d+)/g)].flatMap(seedRange => {
      const start = Number(seedRange[1])
      const length = Number(seedRange[2])

      return new Range(start, start + length - 1)
    })

    seeds = parsedSeeds as unknown as ReadonlyArray<TData>
  } else {
    seeds = rawSeeds.split(' ').map(seed => Number(seed)) as unknown as ReadonlyArray<TData>
  }

  const maps = rawMaps.map(rawMap => {
    const [rawCategories, rawRanges] = rawMap.split(' map:\n')

    const [source, target] = rawCategories.split('-to-')
    const ranges = rawRanges
      .split('\n')
      .map(rawRange => {
        return rawRange.split(' ').map(value => Number(value))
      })
      .map(rangeValues => {
        return new AlmanacMapRange(rangeValues[1], rangeValues[0], rangeValues[2])
      })

    return new AlmanacMap(source as Category, target as Category, ranges)
  })

  return new Almanac(seeds, maps)
}

const part1 = (file: string) => {
  const almanac = readAlmanac({ file, seedsAsRange: false })
  const locations = almanac.processMapping(almanac.seeds)

  return Math.min(...locations)
}

const part2 = (file: string) => {
  const almanac = readAlmanac({ file, seedsAsRange: true })
  const seedsToCheck = almanac.continuityBreakpoints().filter(breakpoint => {
    return almanac.seeds.some(range => range.contains(breakpoint))
  })

  const locations = almanac.processMapping(seedsToCheck)

  return Math.min(...locations)
}

const reader = (file: string): string => file

await runExamples(2023, '05', reader, part1, part2)
await runSolution(2023, '05', reader, part1, part2)
