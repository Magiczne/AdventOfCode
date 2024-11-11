import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { solutionExample, solutionPart1 } from '../util/index.ts'
import { Space } from './space.ts';

const __dirname = fileURLToPath(new URL('.', import.meta.url))



const part1 = (file: string) => {
  const data = readFileSync(resolve(__dirname, file), 'utf-8').trim()
  const space = Space.fromString(data, 2)

  const galaxies = space.galaxies()
  const expandedX = space.expand(galaxies.map(galaxy => galaxy.x))
  const expandedY = space.expand(galaxies.map(galaxy => galaxy.y))
  const galaxiesAfterExpansion = galaxies.map(galaxy => {
    return {
      x: expandedX.get(galaxy.x),
      y: expandedY.get(galaxy.y)
    }
  })

  const routes = space.routesBetween(galaxiesAfterExpansion)
  const distances = routes.map(route => {
    return Math.abs(route.from.x - route.to.x) + Math.abs(route.from.y - route.to.y)
  })

  return distances.reduce((sum, distance) => sum + distance, 0)
}

// const part2 = (file: string) => {
//   return readFileSync(resolve(__dirname, file), 'utf-8').trim()
// }

solutionExample(part1('example.txt'))
solutionPart1(part1('input.txt'))

// solutionExample(part2('example.txt'))
// solutionPart2(part2('input.txt'))
