import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { combinations } from '@magiczne/advent-of-code-ts-core/combinatorics'

type Input = ReadonlyArray<{ result: number; operands: ReadonlyArray<number> }>

const part1 = (data: Input): number => {
  return data
    .filter(line => {
      const operators = combinations(['+', '*'], line.operands.length - 1)

      return operators.some(operatorSet => {
        const result = line.operands.reduce((acc, _, index, array) => {
          if (index < array.length - 1) {
            return eval(`${acc} ${operatorSet[index]} ${array[index + 1]}`)
          }

          return acc
        }, line.operands[0])

        return result === line.result
      })
    })
    .reduce((acc, line) => {
      return acc + line.result
    }, 0)
}

const part2 = (data: Input): number => {
  return data
    .filter(line => {
      // Using empty string instead of || to just concatenate strings
      const operators = combinations(['+', '*', ''], line.operands.length - 1)

      return operators.some(operatorSet => {
        const result = line.operands.reduce((acc, _, index, array) => {
          if (index < array.length - 1) {
            return eval(`${acc}${operatorSet[index]}${array[index + 1]}`)
          }

          return acc
        }, line.operands[0])

        return result === line.result
      })
    })
    .reduce((acc, line) => {
      return acc + line.result
    }, 0)
}

const reader = (file: string): Input => {
  return readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .map(line => {
      const lineParts = line.split(': ')

      return {
        result: parseInt(lineParts[0], 10),
        operands: lineParts[1].split(' ').map(item => parseInt(item, 10)),
      }
    })
}

runExamples(2024, '07', reader, part1, part2) // 3s
runSolution(2024, '07', reader, part1, part2) // 120s :D
