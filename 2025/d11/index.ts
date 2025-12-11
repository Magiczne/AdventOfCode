import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'

type InputData = Record<string, ReadonlyArray<string>>

const countPaths = (data: InputData, start: string, end: string) => {
  if (data[start] === undefined) {
    return 0
  }

  const cache = new Map<string, number>()

  const dfs = (current: string, last: string) => {
    if (current === last) {
      return 1
    }

    if (cache.has(current)) {
      return cache.get(current)!
    }

    let count = 0

    for (const x of data[current] ?? []) {
      count += dfs(x, end)
    }

    cache.set(current, count)
    return count
  }

  return dfs(start, end)
}

const part1 = (data: InputData): number => {
  return countPaths(data, 'you', 'out')
}

const part2 = (data: InputData): number => {
  // Count how many from svr -> out, while visiting dac and then fft
  const dacThenFft = countPaths(data, 'svr', 'dac') * countPaths(data, 'dac', 'fft') * countPaths(data, 'fft', 'out')

  // Count how many from svr -> out, while visiting fft and then dac
  const fftThenDac = countPaths(data, 'svr', 'fft') * countPaths(data, 'fft', 'dac') * countPaths(data, 'dac', 'out')

  return dacThenFft + fftThenDac
}

const reader = (file: string): InputData => {
  return Object.fromEntries(
    readFileSync(file, 'utf-8')
      .trim()
      .split('\n')
      .map(line => {
        const [id, rawConnections] = line.split(': ')

        return [id, rawConnections.trim().split(' ')]
      }),
  )
}

await runExamples(2025, '11', reader, part1, part2)
await runSolution(2025, '11', reader, part1, part2)
