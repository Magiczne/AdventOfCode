import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { readFileSync } from 'node:fs'

const findMarkerPosition = (packet: string, markerLength: number): number => {
  for (let i = 0; i < packet.length; i++) {
    const slice = packet.slice(i, i + markerLength)

    if ([...new Set(slice.split(''))].length === markerLength) {
      return i + markerLength
    }
  }

  throw new Error('No marker found')
}

const reader = (file: string): string => readFileSync(file, 'utf-8').trim()

const part1 = (packet: string): number => {
  return findMarkerPosition(packet, 4)
}

const part2 = (packet: string): number => {
  return findMarkerPosition(packet, 14)
}

await runExamples(2022, '06', reader, part1, part2)
await runSolution(2022, '06', reader, part1, part2)
