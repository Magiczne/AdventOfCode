import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { Range } from '@magiczne/advent-of-code-ts-core/structures'

interface InputData {
  ranges: ReadonlyArray<Range>
  ids: ReadonlyArray<number>
}

const mergeRanges = (ranges: ReadonlyArray<Range>): ReadonlyArray<Range> => {
  const mergedRanges: Array<Range> = [ranges[0]]

  for (let i = 1; i < ranges.length; i++) {
    const lastMergedRange = mergedRanges[mergedRanges.length - 1]
    const current = ranges[i]

    if (current.overlapsWithEndOf(lastMergedRange)) {
      mergedRanges[mergedRanges.length - 1] = new Range(
        lastMergedRange.start,
        Math.max(lastMergedRange.end, current.end),
      )
    } else {
      mergedRanges.push(current)
    }
  }

  return mergedRanges
}

const part1 = (data: InputData): number => {
  let freshIds = 0

  idLoop: for (const id of data.ids) {
    for (const range of data.ranges) {
      if (range.contains(id)) {
        freshIds++

        continue idLoop
      }
    }
  }

  return freshIds
}

const part2 = (data: InputData): number => {
  return mergeRanges(data.ranges).reduce((acc, range) => {
    return acc + range.length()
  }, 0)
}

const reader = (file: string): InputData => {
  const [rawRanges, rawIds] = readFileSync(file, 'utf-8').trim().split('\n\n')

  return {
    ranges: rawRanges
      .trim()
      .split('\n')
      .map(range => {
        const [start, end] = range.split('-')

        return new Range(parseInt(start, 10), parseInt(end, 10))
      })
      .toSorted((lhs, rhs) => lhs.start - rhs.start),
    ids: rawIds
      .trim()
      .split('\n')
      .map(id => parseInt(id, 10)),
  }
}

await runExamples(2025, '05', reader, part1, part2)
await runSolution(2025, '05', reader, part1, part2)
