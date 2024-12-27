import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'

type Monkeys = Record<string, Monkey>
type MonkeyOperationCache = Map<string, number>
type MonkeyOperation = (monkeys: Monkeys, cache: MonkeyOperationCache) => number
type Operator = '+' | '-' | '*' | '/'

interface Monkey {
  id: string
  dependsOn: Array<string>
  operator: Operator | null
  operation: MonkeyOperation
}

const getInverseOperation = (operands: Array<string>, operator: Operator): string => {
  const reverseMap: Record<Operator, { op: Operator; reverseOperands: boolean }> = {
    '+': { op: '-', reverseOperands: false },
    '-': { op: '+', reverseOperands: false },
    '*': { op: '/', reverseOperands: false },
    '/': { op: '*', reverseOperands: false },
  }

  return reverseMap[operator].op
}

const readMonkeys = (file: string): Monkeys => {
  const monkeys = readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .map(line => {
      const [id, operation] = line.split(': ')

      if (!operation.includes(' ')) {
        const value = parseInt(operation, 10)

        return {
          id,
          dependsOn: [],
          operator: null,
          operation(): number {
            return value
          },
        }
      }

      const [monkey1, operator, monkey2] = operation.split(' ')

      return {
        id,
        dependsOn: [monkey1, monkey2],
        operator,
        operation(monkeys: Monkeys, cache: MonkeyOperationCache): number {
          if (cache.has(id)) {
            return cache.get(id)!
          }

          let value: number

          switch (operator) {
            case '+':
              value = monkeys[monkey1].operation(monkeys, cache) + monkeys[monkey2].operation(monkeys, cache)
              break

            case '-':
              value = monkeys[monkey1].operation(monkeys, cache) - monkeys[monkey2].operation(monkeys, cache)
              break

            case '*':
              value = monkeys[monkey1].operation(monkeys, cache) * monkeys[monkey2].operation(monkeys, cache)
              break

            case '/':
              value = monkeys[monkey1].operation(monkeys, cache) / monkeys[monkey2].operation(monkeys, cache)
              break

            default:
              throw new Error('Not supported operation')
          }

          cache.set(id, value)

          return value
        },
      }
    })
    .map(monkey => [monkey.id, monkey])

  return Object.fromEntries(monkeys)
}

const getRootMonkeyValue = (file: string): number => {
  const monkeys = readMonkeys(file)
  const monkeyOperationCache = new Map<string, number>()

  return monkeys['root'].operation(monkeys, monkeyOperationCache)
}

const getHumanValue = (file: string): number => {
  const monkeys = readMonkeys(file)
  delete monkeys['root']
  delete monkeys['humn']

  const dependent = Object.values(monkeys).find(monkey => monkey.dependsOn.includes('humn'))!

  // @ts-expect-error
  const operation = getInverseOperation(dependent.dependsOn, dependent.operator!)

  return 0
}

const reader = (file: string): string => file

await runExamples(2022, '21', reader, getRootMonkeyValue, getHumanValue)
await runSolution(2022, '21', reader, getRootMonkeyValue, getHumanValue)
