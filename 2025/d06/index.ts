import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { rotateCounterClockwise } from '@magiczne/advent-of-code-ts-core/matrix'

const enum Operator {
  Addition = '+',
  Multiplication = '*',
}

interface Task {
  operands: ReadonlyArray<number>
  operator: Operator
}

interface InputData {
  tasksPart1: ReadonlyArray<Task>
  tasksPart2: ReadonlyArray<Task>
}

const part1 = (data: InputData): number => {
  return data.tasksPart1.reduce((acc, task) => {
    return (
      acc +
      task.operands.reduce(
        (taskAcc, operand) => {
          if (task.operator === Operator.Addition) {
            return taskAcc + operand
          }

          return taskAcc * operand
        },
        task.operator === Operator.Addition ? 0 : 1,
      )
    )
  }, 0)
}

const part2 = (data: InputData): number => {
  return data.tasksPart2.reduce((acc, task) => {
    return (
      acc +
      task.operands.reduce(
        (taskAcc, operand) => {
          if (task.operator === Operator.Addition) {
            return taskAcc + operand
          }

          return taskAcc * operand
        },
        task.operator === Operator.Addition ? 0 : 1,
      )
    )
  }, 0)
}

const reader = (file: string): InputData => {
  const fileLines = readFileSync(file, 'utf-8').split('\n')
  const operators = fileLines[fileLines.length - 1].replaceAll(/  +/g, ' ').trim().split(' ') as ReadonlyArray<Operator>

  return {
    tasksPart1: rotateCounterClockwise(
      fileLines.map(line => {
        return line.replaceAll(/  +/g, ' ').trim().split(' ')
      }),
    ).map(task => {
      return {
        operands: task.slice(0, task.length - 1).map(item => parseInt(item, 10)),
        operator: task[task.length - 1] as Operator,
      }
    }),
    tasksPart2: rotateCounterClockwise(
      fileLines.slice(0, fileLines.length - 1).map(line => {
        return line.split('')
      }),
    )
      .map(column => column.join('').trim())
      .join('\n')
      .split('\n\n')
      .map(column => {
        return column
          .trim()
          .split('\n')
          .map(item => parseInt(item, 10))
      })
      .toReversed()
      .map((column, index) => {
        return {
          operands: column,
          operator: operators[index],
        }
      }),
  }
}

await runExamples(2025, '06', reader, part1, part2)
await runSolution(2025, '06', reader, part1, part2)
