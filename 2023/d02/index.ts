import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'

interface CubeSet {
  red: number
  green: number
  blue: number
}

interface Game {
  id: number
  sets: ReadonlyArray<CubeSet>
}

const readGames = (file: string): ReadonlyArray<Game> => {
  return readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .map((line): Game => {
      const [game, setsData] = line.split(': ')
      const sets = setsData.split('; ').map(setData => {
        const redMatch = setData.match(/(\d+) red/)
        const greenMatch = setData.match(/(\d+) green/)
        const blueMatch = setData.match(/(\d+) blue/)

        return {
          red: redMatch === null ? 0 : Number(redMatch[1]),
          green: greenMatch === null ? 0 : Number(greenMatch[1]),
          blue: blueMatch === null ? 0 : Number(blueMatch[1]),
        }
      })

      return {
        id: Number(game.split(' ')[1]),
        sets,
      }
    })
}

const part1 = (games: ReadonlyArray<Game>): number => {
  const redCount = 12
  const greenCount = 13
  const blueCount = 14

  return games
    .filter(game => {
      return game.sets.every(set => {
        return set.red <= redCount && set.green <= greenCount && set.blue <= blueCount
      })
    })
    .reduce((acc, game) => acc + game.id, 0)
}

const part2 = (games: ReadonlyArray<Game>): number => {
  return games
    .map((game): CubeSet => {
      return {
        red: Math.max(...game.sets.map(set => set.red)),
        green: Math.max(...game.sets.map(set => set.green)),
        blue: Math.max(...game.sets.map(set => set.blue)),
      }
    })
    .map(set => set.red * set.green * set.blue)
    .reduce((acc, setPower) => acc + setPower, 0)
}

await runExamples(2023, '02', readGames, part1, part2)
await runSolution(2023, '02', readGames, part1, part2)
