import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { combinationsWithoutRepetition } from '@magiczne/advent-of-code-ts-core/combinatorics'

interface InputLine {
  lights: ReadonlyArray<boolean>
  buttons: ReadonlyArray<ReadonlyArray<number>>
  joltages: ReadonlyArray<number>
}

/**
 * Switching on/of the button combinations === not pressing at all.
 * We can exploit that and just brute force combinations.
 */
const getLowestButtonCount = (line: InputLine): number => {
  for (let combinationLength = 1; combinationLength < line.buttons.length; combinationLength++) {
    for (const combination of combinationsWithoutRepetition(line.buttons, combinationLength)) {
      let state = Array.from({ length: line.lights.length }, () => false)

      combination.forEach(buttonSet => {
        buttonSet.forEach(index => {
          state[index] = !state[index]
        })
      })

      if (state.join('') === line.lights.join('')) {
        return combination.length
      }
    }
  }

  throw new Error('WTF')
}

const part1 = (data: ReadonlyArray<InputLine>): number => {
  return data.reduce((acc, line) => {
    return acc + getLowestButtonCount(line)
  }, 0)
}

const part2 = (data: ReadonlyArray<InputLine>): number => {
  return 0
}

const reader = (file: string): ReadonlyArray<InputLine> => {
  const regex = /\[([.#]+)\] (\([\d,\(\) ]+\)) {([\d+,]+)}/

  return readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .map(line => {
      const matches = line.match(regex)

      return {
        lights: matches[1].split('').map(item => item === '#'),
        buttons: matches[2].split(' ').map(buttonSet => {
          return buttonSet
            .replace('(', '')
            .replace(')', '')
            .split(',')
            .map(item => parseInt(item, 10))
        }),
        joltages: matches[3].split(',').map(item => parseInt(item, 10)),
      }
    })
}

await runExamples(2025, '10', reader, part1, part2)
await runSolution(2025, '10', reader, part1, part2)
