import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { readFileSync } from 'node:fs'
import { last } from 'radash'

interface Monkey {
  items: Array<number>
  operation: (level: number) => number
  divisor: number
  divisionTest: (level: number) => boolean
  successTarget: number
  failureTarget: number
  inspectionCount: number
}

const parseOperation = (operationLine: string): ((level: number) => number) => {
  const [, operator, op2] = operationLine.split(' = ')[1].split(' ')

  return (level: number): number => {
    const operand2 = op2 === 'old' ? level : parseInt(op2, 10)

    if (operator === '+') {
      return level + operand2
    } else if (operator === '*') {
      return level * operand2
    } else {
      throw new Error(`Unsupported operator ${operator}`)
    }
  }
}

const loadMonkeys = (file: string): ReadonlyArray<Monkey> => {
  return readFileSync(file)
    .toString()
    .trim()
    .split('\n\n')
    .map(monkeyData => monkeyData.split('\n'))
    .map((monkeyData): Monkey => {
      const startingItems = monkeyData[1].split(': ')[1].split(', ')
      const divisor = parseInt(last(monkeyData[3].split(' ')) ?? '', 10)
      const successTarget = parseInt(last(monkeyData[4].split(' ')) ?? '', 10)
      const failureTarget = parseInt(last(monkeyData[5].split(' ')) ?? '', 10)

      return {
        items: startingItems.map(item => parseInt(item, 10)),
        operation: parseOperation(monkeyData[2]),
        divisor,
        divisionTest: value => value % divisor === 0,
        successTarget,
        failureTarget,
        inspectionCount: 0,
      }
    })
}

const processRounds = (file: string, count: number, part2: boolean): ReadonlyArray<Monkey> => {
  const monkeys = loadMonkeys(file)
  const largestCommonMultiplierOfDivisors = monkeys.reduce<number>((acc, monkey) => {
    return acc * monkey.divisor
  }, 1)

  const worryLevelReducer: (level: number) => number = part2
    ? level => level % largestCommonMultiplierOfDivisors
    : level => Math.floor(level / 3)

  for (let i = 0; i < count; i++) {
    monkeys.forEach(monkey => {
      monkey.items.forEach(item => {
        monkey.inspectionCount++

        const newWorryLevel = worryLevelReducer(monkey.operation(item))

        if (monkey.divisionTest(newWorryLevel)) {
          monkeys[monkey.successTarget].items.push(newWorryLevel)
        } else {
          monkeys[monkey.failureTarget].items.push(newWorryLevel)
        }
      })

      monkey.items = []
    })
  }

  return monkeys
}

const calculateMonkeyBusiness = (file: string, count: number, part2 = false) => {
  const inspectionCounts = processRounds(file, count, part2)
    .map(monkey => monkey.inspectionCount)
    .sort((lhs, rhs) => rhs - lhs)

  return inspectionCounts[0] * inspectionCounts[1]
}

const part1 = (file: string): number => {
  return calculateMonkeyBusiness(file, 20)
}

const part2 = (file: string): number => {
  return calculateMonkeyBusiness(file, 10_000, true)
}

const reader = (file: string): string => file

await runExamples(2022, '11', reader, part1, part2)
await runSolution(2022, '11', reader, part1, part2)
