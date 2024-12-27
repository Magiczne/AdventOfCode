import { readFileSync } from 'node:fs'
import { counting } from 'radash'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'

import { Card } from './card'

const readCards = (file: string): ReadonlyArray<Card> => {
  return readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .map(line => {
      const [rawId, data] = line.split(': ')
      const [rawWinningNumbers, rawSelectedNumbers] = data.split(' | ')

      const id = Number(rawId.replace('Card ', ''))
      const winningNumbers = rawWinningNumbers
        .trim()
        .split(/\s+/)
        .map(number => Number(number))
      const selectedNumbers = rawSelectedNumbers
        .trim()
        .split(/\s+/)
        .map(number => Number(number))

      return new Card(id, winningNumbers, selectedNumbers)
    })
}

const part1 = (cards: ReadonlyArray<Card>) => {
  return cards.map(card => card.points).reduce((acc, points) => acc + points, 0)
}

const part2 = (cards: ReadonlyArray<Card>) => {
  const counter = counting(cards, card => card.id)

  cards.forEach(card => {
    card.winningCopiesIds.forEach(id => {
      counter[id] += counter[card.id]
    })
  })

  return Object.values(counter).reduce((acc, count) => acc + count, 0)
}

await runExamples(2023, '04', readCards, part1, part2)
await runSolution(2023, '04', readCards, part1, part2)
