import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { isUpperCaseLetter } from '@magiczne/advent-of-code-ts-core/string'
import { readFileSync } from 'node:fs'
import { cluster, last } from 'radash'
import { transpose } from 'ramda'

type Stack = Array<Uppercase<string>>
type Stacks = Record<number, Stack>
type Order = { from: number; to: number; count: number }

const readData = (file: string): [Stacks, ReadonlyArray<Order>] => {
  const [rawStacks, rawOrders] = readFileSync(file).toString().split('\n\n')

  const parsedLines = rawStacks
    .split('\n')
    .slice(0, -1)
    .map(line => {
      return cluster([...line], 4).map(cluster => {
        return cluster
          .filter(character => {
            return isUpperCaseLetter(character)
          })
          .flat()[0]
      })
    })

  const stacks = transpose(parsedLines)
    .map((stack: Array<string>): Stack => {
      return stack.filter(value => value !== undefined).reverse() as Stack
    })
    .map((stack, index) => {
      return [index + 1, stack]
    })

  const orders = rawOrders
    .trim()
    .split('\n')
    .map(order => order.split(' '))
    .map((order): Order => {
      return {
        from: parseInt(order[3], 10),
        to: parseInt(order[5], 10),
        count: parseInt(order[1], 10),
      }
    })

  return [Object.fromEntries(stacks), orders]
}

const processOrders = (stacks: Stacks, orders: ReadonlyArray<Order>, pickUpMultiple = false): string => {
  const processedStacks = orders.reduce<Stacks>((reducedStacks, order) => {
    const fromStack = reducedStacks[order.from]
    const toStack = reducedStacks[order.to]
    const slice = fromStack.slice(fromStack.length - order.count, fromStack.length)

    return {
      ...reducedStacks,
      [order.from]: fromStack.slice(0, fromStack.length - order.count),
      [order.to]: toStack.concat(pickUpMultiple ? slice : slice.reverse()),
    }
  }, stacks)

  return Object.values(processedStacks)
    .map(stack => last(stack))
    .join('')
}

const reader = (file: string): [Stacks, ReadonlyArray<Order>] => readData(file)

const part1 = (data: [Stacks, ReadonlyArray<Order>]): string => {
  return processOrders(data[0], data[1])
}

const part2 = (data: [Stacks, ReadonlyArray<Order>]): string => {
  return processOrders(data[0], data[1], true)
}

await runExamples(2022, '05', reader, part1, part2)
await runSolution(2022, '05', reader, part1, part2)
