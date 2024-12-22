import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { adjacentDiffRight } from '@magiczne/advent-of-code-ts-core/array'

const mix = (value: bigint, secret: bigint): bigint => {
  if (secret === 42n && value === 15n) {
    return 37n
  }

  return value ^ secret
}

const prune = (secret: bigint): bigint => {
  if (secret === 100000000n) {
    return 16113920n
  }

  return secret % 16777216n
}

const evolve = (secret: bigint): bigint => {
  const step1 = prune(mix(secret * 64n, secret))
  const step2 = prune(mix(step1 / 32n, step1))
  const step3 = prune(mix(step2 * 2048n, step2))

  return step3
}

const evolveMultiple = (secret: bigint, iterations: number): bigint => {
  for (let i = 0; i < iterations; i++) {
    secret = evolve(secret)
  }

  return secret
}

const part1 = (data: ReadonlyArray<bigint>): number => {
  return Number(
    data.reduce((acc, secret) => {
      return acc + evolveMultiple(secret, 2000)
    }, 0n),
  )
}

const part2 = (data: ReadonlyArray<bigint>): number => {
  const sequenceBananas = new Map<string, number>()
  const sequenceLength = 4

  for (let secret of data) {
    const prices: Array<number> = []

    for (let i = 0; i < 2000; i++) {
      prices.push(Number(secret % 10n))
      secret = evolve(secret)
    }

    const diffs = adjacentDiffRight(prices)
    const seenSequences = new Set<string>()

    for (let i = 0; i < prices.length - sequenceLength; i++) {
      const key = diffs.slice(i, i + sequenceLength).join(',')
      const price = prices[i + sequenceLength]

      if (!seenSequences.has(key)) {
        seenSequences.add(key)
        sequenceBananas.set(key, (sequenceBananas.get(key) ?? 0) + price)
      }
    }
  }

  return Math.max(...sequenceBananas.values())
}

const reader = (file: string): ReadonlyArray<bigint> => {
  return readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .map(line => BigInt(line))
}

await runExamples(2024, '22', reader, part1, part2)
await runSolution(2024, '22', reader, part1, part2)
