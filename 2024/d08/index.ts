import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { combinationsWithoutRepetition } from '@magiczne/advent-of-code-ts-core/combinatorics'
import { Vec2 } from '@magiczne/advent-of-code-ts-core/math'
import { Matrix } from '@magiczne/advent-of-code-ts-core/structures'

type Antenna = Vec2 & { type: 'Antenna'; code: string }
type Antinode = { type: 'Antinode'; code: string }
type MapItem = null | Antenna | Antinode
type Map = Matrix<MapItem>

interface Input {
  map: Map
  antennas: Record<string, Array<Antenna>>
}

const DEBUG = false
const printMap = (map: Map): void => {
  if (!DEBUG) {
    return
  }

  map.print((_, cell) => {
    if (cell.type === 'Antenna') {
      return cell.code
    }

    if (cell.type === 'Antinode') {
      return '#'
    }

    return '.'
  })
}

const part1 = (input: Input): number => {
  Object.values(input.antennas).forEach(antennaSet => {
    combinationsWithoutRepetition(antennaSet, 2).forEach(([firstNode, secondNode]) => {
      const distanceX = Math.abs(firstNode.x - secondNode.x)
      const distanceY = Math.abs(firstNode.y - secondNode.y)

      const secondAntinodeDir = new Vec2({
        x: firstNode.x < secondNode.x ? -1 : 1,
        y: firstNode.y < secondNode.y ? -1 : 1,
      })

      const firstAntinodeDir = new Vec2({
        x: firstNode.x < secondNode.x ? 1 : -1,
        y: firstNode.y < secondNode.y ? 1 : -1,
      })

      const antinodes: ReadonlyArray<Vec2> = [
        new Vec2({
          x: firstNode.x - firstAntinodeDir.x * distanceX,
          y: firstNode.y - firstAntinodeDir.y * distanceY,
        }),
        new Vec2({
          x: secondNode.x - secondAntinodeDir.x * distanceX,
          y: secondNode.y - secondAntinodeDir.y * distanceY,
        }),
      ]

      antinodes.forEach(antinode => {
        if (input.map.get(antinode) !== undefined) {
          input.map.set(antinode, {
            code: firstNode.code,
            type: 'Antinode',
          })
        }
      })
    })
  })

  printMap(input.map)

  return input.map.reduce((acc, position) => {
    const item = input.map.get(position)

    if (item?.type === 'Antinode') {
      return acc + 1
    }

    return acc
  }, 0)
}

const part2 = (input: Input): number => {
  Object.values(input.antennas).forEach(antennaSet => {
    combinationsWithoutRepetition(antennaSet, 2).forEach(([firstNode, secondNode]) => {
      const distanceX = Math.abs(firstNode.x - secondNode.x)
      const distanceY = Math.abs(firstNode.y - secondNode.y)

      const secondAntinodeDir = new Vec2({
        x: firstNode.x < secondNode.x ? -1 : 1,
        y: firstNode.y < secondNode.y ? -1 : 1,
      })
      const firstAntinodeDir = new Vec2({
        x: firstNode.x < secondNode.x ? 1 : -1,
        y: firstNode.y < secondNode.y ? 1 : -1,
      })

      let antinodes: Array<Vec2> = []

      // Generate antinodes in first direction
      for (let i = 1; ; i++) {
        const x = firstNode.x - firstAntinodeDir.x * (distanceX * i)
        const y = firstNode.y - firstAntinodeDir.y * (distanceY * i)

        if (input.map.get({ x, y }) === undefined) {
          break
        }

        antinodes.push(new Vec2({ x, y }))
      }

      // Generate antinodes in second direction
      for (let i = 1; ; i++) {
        const x = secondNode.x - secondAntinodeDir.x * (distanceX * i)
        const y = secondNode.y - secondAntinodeDir.y * (distanceY * i)

        if (input.map.get({ x, y }) === undefined) {
          break
        }

        antinodes.push(new Vec2({ x, y }))
      }

      antinodes.forEach(antinode => {
        if (input.map.get(antinode) !== undefined) {
          input.map.set(antinode, {
            code: firstNode.code,
            type: 'Antinode',
          })
        }
      })
    })
  })

  printMap(input.map)

  return input.map.reduce((acc, position) => {
    if (input.map.get(position) !== null) {
      return acc + 1
    }

    return acc
  }, 0)
}

const reader = (file: string): Input => {
  const map = Matrix.fromArray(
    readFileSync(file, 'utf-8')
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
      }),
  )

  const antennas = Object.groupBy(
    map.rows.flatMap(row => {
      return row.filter(item => item !== null)
    }),
    antenna => antenna.code,
  )

  return {
    antennas: antennas as Record<string, Array<Antenna>>,
    map: map as Matrix<MapItem>,
  }
}

await runExamples(2024, '08', reader, part1, part2)
await runSolution(2024, '08', reader, part1, part2)
