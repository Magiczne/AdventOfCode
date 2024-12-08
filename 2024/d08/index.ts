import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { combinationsWithoutRepetition } from '@magiczne/advent-of-code-ts-core/combinatorics'
import type { Vec2 } from '@magiczne/advent-of-code-ts-core/types'

type Antenna = Vec2 & { type: 'Antenna'; code: string }
type Antinode = { type: 'Antinode'; code: string }
type MapItem = null | Antenna | Antinode
type Map = Array<Array<MapItem>>

interface Input {
  map: Map
  antennas: Record<string, Array<Antenna>>
}

const DEBUG = false
const printMap = (map: Map): void => {
  if (!DEBUG) {
    return
  }

  map.forEach(row => {
    let rowString = ''

    row.forEach(cell => {
      if (cell.type === 'Antenna') {
        rowString += cell.code
      } else if (cell.type === 'Antinode') {
        rowString += '#'
      } else {
        rowString += '.'
      }
    })

    console.log(rowString)
  })

  console.log('')
}

const part1 = (input: Input): number => {
  const map = structuredClone(input.map)

  Object.values(input.antennas).forEach(antennaSet => {
    combinationsWithoutRepetition(antennaSet, 2).forEach(([firstNode, secondNode]) => {
      const distanceX = Math.abs(firstNode.x - secondNode.x)
      const distanceY = Math.abs(firstNode.y - secondNode.y)

      const secondAntinodeDir: Vec2 = { x: firstNode.x < secondNode.x ? -1 : 1, y: firstNode.y < secondNode.y ? -1 : 1 }
      const firstAntinodeDir: Vec2 = { x: firstNode.x < secondNode.x ? 1 : -1, y: firstNode.y < secondNode.y ? 1 : -1 }

      const antinodes: ReadonlyArray<Vec2> = [
        {
          x: firstNode.x - firstAntinodeDir.x * distanceX,
          y: firstNode.y - firstAntinodeDir.y * distanceY,
        },
        {
          x: secondNode.x - secondAntinodeDir.x * distanceX,
          y: secondNode.y - secondAntinodeDir.y * distanceY,
        },
      ]

      antinodes.forEach(antinode => {
        if (map[antinode.y]?.[antinode.x] !== undefined) {
          map[antinode.y][antinode.x] = { type: 'Antinode', code: firstNode.code }
        }
      })
    })
  })

  printMap(map)

  return map
    .map(row => {
      return row.reduce((acc, item) => {
        if (item?.type === 'Antinode') {
          return acc + 1
        }

        return acc
      }, 0)
    })
    .reduce((acc, rowCount) => acc + rowCount, 0)
}

const part2 = (input: Input): number => {
  const map = structuredClone(input.map)

  Object.values(input.antennas).forEach(antennaSet => {
    combinationsWithoutRepetition(antennaSet, 2).forEach(([firstNode, secondNode]) => {
      const distanceX = Math.abs(firstNode.x - secondNode.x)
      const distanceY = Math.abs(firstNode.y - secondNode.y)

      const secondAntinodeDir: Vec2 = { x: firstNode.x < secondNode.x ? -1 : 1, y: firstNode.y < secondNode.y ? -1 : 1 }
      const firstAntinodeDir: Vec2 = { x: firstNode.x < secondNode.x ? 1 : -1, y: firstNode.y < secondNode.y ? 1 : -1 }

      let antinodes: Array<Vec2> = []

      // Generate antinodes in first direction
      for (let i = 1; ; i++) {
        const x = firstNode.x - firstAntinodeDir.x * (distanceX * i)
        const y = firstNode.y - firstAntinodeDir.y * (distanceY * i)

        if (map[y]?.[x] === undefined) {
          break
        }

        antinodes.push({ x, y })
      }

      // Generate antinodes in second direction
      for (let i = 1; ; i++) {
        const x = secondNode.x - secondAntinodeDir.x * (distanceX * i)
        const y = secondNode.y - secondAntinodeDir.y * (distanceY * i)

        if (map[y]?.[x] === undefined) {
          break
        }

        antinodes.push({ x, y })
      }

      antinodes.forEach(antinode => {
        if (map[antinode.y]?.[antinode.x] !== undefined) {
          map[antinode.y][antinode.x] = { type: 'Antinode', code: firstNode.code }
        }
      })
    })
  })

  printMap(map)

  return map
    .map(row => {
      return row.reduce((acc, item) => {
        if (item !== null) {
          return acc + 1
        }

        return acc
      }, 0)
    })
    .reduce((acc, rowCount) => acc + rowCount, 0)
}

const reader = (file: string): Input => {
  const map = readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .map((line, y) => {
      return line.split('').map((item, x) => {
        if (item === '.') {
          return null
        }

        return {
          type: 'Antenna',
          code: item,
          x,
          y,
        }
      })
    })

  const antennas = Object.groupBy(
    map.flatMap(row => {
      return row.filter(item => item !== null)
    }),
    antenna => antenna.code,
  )

  return {
    antennas: antennas as Record<string, Array<Antenna>>,
    map: map as Array<Array<MapItem>>,
  }
}

runExamples(2024, '08', reader, part1, part2)
runSolution(2024, '08', reader, part1, part2)
