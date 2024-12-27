import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { readFileSync } from 'node:fs'

import { Space } from './space'

const part1 = (data: string): number => {
  const space = Space.fromString(data, 2)
  const galaxies = space.galaxies()
  const expandedX = space.expand(galaxies.map(galaxy => galaxy.x))
  const expandedY = space.expand(galaxies.map(galaxy => galaxy.y))
  const galaxiesAfterExpansion = galaxies.map(galaxy => {
    return {
      x: expandedX.get(galaxy.x),
      y: expandedY.get(galaxy.y),
    }
  })

  const routes = space.routesBetween(galaxiesAfterExpansion)
  const distances = routes.map(route => {
    return Math.abs(route.from.x - route.to.x) + Math.abs(route.from.y - route.to.y)
  })

  return distances.reduce((sum, distance) => sum + distance, 0)
}

const part2 = (data: string): number => {
  return 0
}

const reader = (file: string): string => {
  return readFileSync(file, 'utf-8').trim()
}

await runExamples(2023, '11', reader, part1, part2)
await runSolution(2023, '11', reader, part1, part2)
