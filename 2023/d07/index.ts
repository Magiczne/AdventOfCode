import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'

import { Hand } from './camel'

const part1 = (file: string) => {
  const hands = readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .map(line => Hand.fromString({ line }))

  hands.sort((lhs, rhs) => {
    const coefficient = lhs.figure - rhs.figure

    if (coefficient === 0) {
      for (let i = 0; i < 5; i++) {
        const cardCoefficient = lhs.cards[i] - rhs.cards[i]

        if (cardCoefficient !== 0) {
          return cardCoefficient
        }
      }
    }

    return coefficient
  })

  return hands.reduce((acc, hand, currentIndex) => {
    return acc + hand.bid * (currentIndex + 1)
  }, 0)
}

const part2 = (file: string) => {
  const hands = readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .map(line => Hand.fromString({ line, jokers: true }))

  hands.sort((lhs, rhs) => {
    const coefficient = lhs.figureWithJokers - rhs.figureWithJokers

    if (coefficient === 0) {
      for (let i = 0; i < 5; i++) {
        const cardCoefficient = lhs.cards[i] - rhs.cards[i]

        if (cardCoefficient !== 0) {
          return cardCoefficient
        }
      }
    }

    return coefficient
  })

  return hands.reduce((acc, hand, currentIndex) => {
    return acc + hand.bid * (currentIndex + 1)
  }, 0)
}

const reader = (file: string): string => file

await runExamples(2023, '07', reader, part1, part2)
await runSolution(2023, '07', reader, part1, part2)
