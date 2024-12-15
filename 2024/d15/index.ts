import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { printMatrix } from '@magiczne/advent-of-code-ts-core/matrix'
import type { Vec2 } from '@magiczne/advent-of-code-ts-core/types'

type Item = '.' | 'O' | '#'

interface Input {
  map: Array<Array<Item>>
  moves: Array<Vec2>
  robot: Vec2
}

const DEBUG = false

const printMap = (map: Input['map'], robot: Vec2): void => {
  if (!DEBUG) {
    return
  }

  printMatrix(map, (x: number, y: number, item: Item) => {
    if (x === robot.x && y === robot.y) {
      return '@'
    }

    return item
  })
}

const part1 = (input: Input): number => {
  const map = structuredClone(input.map)
  const movesQueue = structuredClone(input.moves)
  const robotPosition = structuredClone(input.robot)

  const getBoxList = (box: Vec2, direction: Vec2): Array<Vec2> => {
    const boxes: Array<Vec2> = [box]
    const nextPos: Vec2 = {
      x: box.x + direction.x,
      y: box.y + direction.y,
    }

    while (map[nextPos.y][nextPos.x] === 'O') {
      boxes.push({ ...nextPos })
      ;(nextPos.x += direction.x), (nextPos.y += direction.y)
    }

    return boxes
  }

  while (movesQueue.length > 0) {
    printMap(map, robotPosition)

    const move = movesQueue.shift()
    const nextPosition: Vec2 = {
      x: robotPosition.x + move.x,
      y: robotPosition.y + move.y,
    }

    switch (map[nextPosition.y][nextPosition.x]) {
      case '#':
        continue

      case '.':
        robotPosition.x = nextPosition.x
        robotPosition.y = nextPosition.y
        break

      case 'O':
        const boxList = getBoxList(nextPosition, move)
        const lastBox = boxList[boxList.length - 1]
        const lastBoxNextPosition: Vec2 = {
          x: lastBox.x + move.x,
          y: lastBox.y + move.y,
        }

        if (map[lastBoxNextPosition.y][lastBoxNextPosition.x] === '#') {
          continue
        }

        robotPosition.x = nextPosition.x
        robotPosition.y = nextPosition.y

        boxList.toReversed().forEach(box => {
          map[box.y][box.x] = '.'
          map[box.y + move.y][box.x + move.x] = 'O'
        })

        break

      default:
        throw new Error('WTF')
    }
  }

  return map.reduce((acc, row, y) => {
    return (
      acc +
      row.reduce((rowAcc, cell, x) => {
        if (cell === 'O') {
          return rowAcc + 100 * y + x
        }

        return rowAcc
      }, 0)
    )
  }, 0)
}

const part2 = (input: Input): number => {
  return 0
}

const reader = (file: string): Input => {
  const [rawMap, rawMoves] = readFileSync(file, 'utf-8').trim().split('\n\n')

  const map = rawMap
    .trim()
    .split('\n')
    .map(line => {
      return line.split('')
    })

  const robot = {
    x: 0,
    y: 0,
  }

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === '@') {
        robot.x = x
        robot.y = y
        map[y][x] = '.'
      }
    }
  }

  return {
    map: map as Array<Array<'.' | 'O' | '#'>>,
    moves: rawMoves
      .trim()
      .split('\n')
      .join('')
      .split('')
      .map(move => {
        return {
          '^': { x: 0, y: -1 },
          '>': { x: 1, y: 0 },
          v: { x: 0, y: 1 },
          '<': { x: -1, y: 0 },
        }[move]
      }),
    robot,
  }
}

await runExamples(2024, '15', reader, part1, part2)
await runSolution(2024, '15', reader, part1, part2)
