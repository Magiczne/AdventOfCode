import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'

import { Schematic, SchematicGear, SchematicNumber } from './schematic'

const parseSchematic = (file: string): Schematic => {
  const data = readFileSync(file, 'utf-8').trim().split('\n')

  const gears = data
    .map((line, index): Array<SchematicGear> => {
      return [...line.matchAll(/(\*)/g)].map((match): SchematicGear => {
        if (match.index === undefined) {
          throw new Error('WTF')
        }

        return new SchematicGear(match.index, index)
      })
    })
    .flat()

  const numbers = data
    .map((line, index): Array<SchematicNumber> => {
      return [...line.matchAll(/(\d+)/g)].map((match): SchematicNumber => {
        if (match.index === undefined) {
          throw new Error('WTF')
        }

        return new SchematicNumber(match.index, match.index + match[1].length - 1, index, Number(match[1]))
      })
    })
    .flat()

  return new Schematic(
    data.map(line => line.split('')),
    gears,
    numbers,
  )
}

const part1 = (schematic: Schematic): number => {
  return schematic.validPartNumbers.reduce((acc, number) => acc + number, 0)
}

const part2 = (schematic: Schematic): number => {
  return schematic.validGears.reduce((acc, gear) => {
    return acc + gear.ratio
  }, 0)
}

await runExamples(2023, '03', parseSchematic, part1, part2)
await runSolution(2023, '03', parseSchematic, part1, part2)
