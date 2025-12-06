import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { counting } from 'radash'

const part1 = (data: ReadonlyArray<string>): number => {
  const countedData = data.map(line => {
    return counting(line.split(''), item => item)
  })

  const doubleCount = countedData.filter(counter => {
    return Object.values(counter).includes(2)
  }).length

  const tripleCount = countedData.filter(counter => {
    return Object.values(counter).includes(3)
  }).length

  return doubleCount * tripleCount
}

const part2 = (data: ReadonlyArray<string>): string => {
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      const source = data[i]
      const target = data[j]

      const matchingCharacters = source
        .split('')
        .map((_, index) => {
          if (source.charAt(index) === target.charAt(index)) {
            return source.charAt(index)
          }

          return ''
        })
        .join('')

      if (matchingCharacters.length === source.length - 1) {
        return matchingCharacters
      }
    }
  }

  return 'WTF'
}

const reader = (file: string): ReadonlyArray<string> => {
  return readFileSync(file, 'utf-8').trim().split('\n')
}

await runExamples(2018, '02', reader, part1, part2)
await runSolution(2018, '02', reader, part1, part2)
