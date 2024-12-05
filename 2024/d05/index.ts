import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'

type Input = { rules: ReadonlyArray<[number, number]>; updates: ReadonlyArray<ReadonlyArray<number>> }

const isUpdateValid = (rules: ReadonlyArray<[number, number]>, update: ReadonlyArray<number>): boolean => {
  return rules
    .filter(rule => rule.every(ruleItem => update.includes(ruleItem)))
    .every(rule => update.indexOf(rule[0]) < update.indexOf(rule[1]))
}

const getNotFullfiledRules = (
  rules: ReadonlyArray<[number, number]>,
  update: ReadonlyArray<number>,
): ReadonlyArray<[number, number]> => {
  return rules
    .filter(rule => rule.every(ruleItem => update.includes(ruleItem)))
    .filter(rule => update.indexOf(rule[0]) > update.indexOf(rule[1]))
}

const part1 = (data: Input): number => {
  return data.updates
    .filter(update => isUpdateValid(data.rules, update))
    .reduce((acc, update) => acc + update[Math.floor(update.length / 2)], 0)

  return 0
}

const part2 = (data: Input): number => {
  const reorder = (
    notFullfiledRules: ReadonlyArray<[number, number]>,
    update: ReadonlyArray<number>,
  ): ReadonlyArray<number> => {
    if (notFullfiledRules.length === 0) {
      return update
    }

    const firstIndex = update.findIndex(item => item === notFullfiledRules[0][0])
    const secondIndex = update.findIndex(item => item === notFullfiledRules[0][1])
    const mudatedUpdate = update.toSpliced(firstIndex, 1).toSpliced(secondIndex, 0, update[firstIndex])

    return reorder(getNotFullfiledRules(data.rules, mudatedUpdate), mudatedUpdate)
  }

  return data.updates
    .map(update => {
      const notFulfilledRules = getNotFullfiledRules(data.rules, update)

      // Removing lines that are correct from beginning
      if (notFulfilledRules.length === 0) {
        return null
      }

      return reorder(notFulfilledRules, update)
    })
    .filter(item => item !== null)
    .reduce((acc, update) => {
      return acc + update[Math.floor(update.length / 2)]
    }, 0)
}

const reader = (file: string): Input => {
  const [rawRules, rawUpdates] = readFileSync(file, 'utf-8').trim().split('\n\n')

  return {
    rules: rawRules
      .trim()
      .split('\n')
      .map(rule => {
        return rule
          .trim()
          .split('|')
          .map(n => parseInt(n, 10)) as [number, number]
      }),
    updates: rawUpdates
      .trim()
      .split('\n')
      .map(update => {
        return update
          .trim()
          .split(',')
          .map(n => parseInt(n, 10))
      }),
  }
}

runExamples(2024, '05', reader, part1, part2)
runSolution(2024, '05', reader, part1, part2)
