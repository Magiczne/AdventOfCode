import chalk from 'chalk'
import { readFileSync } from 'node:fs'
import { createInterface } from 'node:readline/promises'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { Direction, Vec2 } from '@magiczne/advent-of-code-ts-core/math'
import { printMatrix } from '@magiczne/advent-of-code-ts-core/matrix'

type Item = '.' | 'O' | '#' | '[' | ']'
interface BigBox {
  start: Vec2
  end: Vec2
}

interface Input {
  map: Array<Array<Item>>
  moves: Array<Vec2>
  robot: Vec2
}

const DEBUG = false

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
})

const printMap = (map: Array<Array<string>>, robot: Vec2, positionsInQuestion: Array<Vec2> = []): void => {
  if (!DEBUG) {
    return
  }

  printMatrix(map, (x: number, y: number, item: Item) => {
    if (x === robot.x && y === robot.y) {
      return chalk.red('@')
    }

    if (positionsInQuestion.find(pos => pos.x === x && pos.y === y)) {
      return chalk.green(item)
    }

    return item
  })
}

const part1 = (input: Input): number => {
  const map = structuredClone(input.map)
  const movesQueue = structuredClone(input.moves)
  const robotPosition = input.robot.clone()

  const getBoxList = (box: Vec2, direction: Vec2): Array<Vec2> => {
    const boxes: Array<Vec2> = [box]
    const nextPos = box.add(direction)

    while (map[nextPos.y][nextPos.x] === 'O') {
      boxes.push(nextPos.clone())
      nextPos.x = nextPos.x + direction.x
      nextPos.y = nextPos.y + direction.y
    }

    return boxes
  }

  while (movesQueue.length > 0) {
    // printMap(map, robotPosition)

    const move = movesQueue.shift()
    const nextPosition = robotPosition.add(move)

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
        const lastBoxNextPosition = lastBox.add(move)

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

const part2 = async (input: Input): Promise<number> => {
  const movesQueue = structuredClone(input.moves)
  const robotPosition = new Vec2({ x: input.robot.x * 2, y: input.robot.y })
  const map = input.map.map(row => {
    return row.flatMap(cell => {
      if (cell === '#') {
        return ['#', '#']
      }

      if (cell === 'O') {
        return ['[', ']']
      }

      if (cell === '.') {
        return ['.', '.']
      }

      throw new Error('WTF')
    })
  })

  const getBoxListFromStart = (boxStart: Vec2, direction: Vec2): Array<BigBox> => {
    const isHorizontal = direction.x !== 0
    const boxes: Array<BigBox> = [
      {
        start: boxStart.clone(),
        end: new Vec2({ x: boxStart.x + 1, y: boxStart.y }),
      },
    ]

    if (isHorizontal) {
      const nextPos = boxStart.add({ x: direction.x * 2, y: direction.y })

      while (map[nextPos.y][nextPos.x] === '[' || map[nextPos.y][nextPos.x] === ']') {
        boxes.push({
          start: nextPos.clone(),
          end: nextPos.add(Direction.right),
        })

        nextPos.x = nextPos.x + direction.x * 2
        nextPos.y = nextPos.y + direction.y
      }

      return boxes
    } else {
      const nextToStart = new Vec2({ x: boxStart.x, y: boxStart.y + direction.y })
      const nextToEnd = new Vec2({ x: boxStart.x + 1, y: boxStart.y + direction.y })

      if (map[nextToStart.y][nextToStart.x] === '[') {
        boxes.push(...getBoxListFromStart(nextToStart, direction))
      }

      if (map[nextToStart.y][nextToStart.x] === ']') {
        boxes.push(...getBoxListFromEnd(nextToStart, direction))
      }

      if (map[nextToEnd.y][nextToEnd.x] === '[') {
        boxes.push(...getBoxListFromStart(nextToEnd, direction))
      }

      return boxes
    }
  }

  const getBoxListFromEnd = (box: Vec2, direction: Vec2): Array<BigBox> => {
    const boxStart = box.sub(Direction.left)

    return getBoxListFromStart(boxStart, direction)
  }

  const movesLength = movesQueue.length
  let moveCounter = 0
  const breakMe = async (positionsInQuestion: Array<Vec2> = []): Promise<void> => {
    if (!DEBUG) {
      return
    }

    printMap(map, robotPosition, positionsInQuestion)
    await readline.question(`i = ${moveCounter - 1}/${movesLength}`)
  }

  while (movesQueue.length > 0) {
    moveCounter++
    const move = movesQueue.shift()
    const nextPosition = robotPosition.add(move)

    switch (map[nextPosition.y][nextPosition.x]) {
      case '#':
        await breakMe()

        continue
        break

      case '.':
        await breakMe()

        robotPosition.updateInPlace(nextPosition)
        break

      case '[':
      case ']':
        const getBoxFn = map[nextPosition.y][nextPosition.x] === '[' ? getBoxListFromStart : getBoxListFromEnd
        const boxList = getBoxFn(nextPosition, move)

        await breakMe(boxList.flatMap(box => [box.start, box.end]))

        const boxesNextPositions = boxList.map(box => {
          return {
            start: box.start.add(move),
            end: box.end.add(move),
          }
        })

        const anyBoxColliding = boxesNextPositions.some(box => {
          return map[box.start.y][box.start.x] === '#' || map[box.end.y][box.end.x] === '#'
        })

        if (anyBoxColliding) {
          continue
        }

        robotPosition.updateInPlace(nextPosition)

        let leftBracket: Array<Vec2> = []
        let rightBracket: Array<Vec2> = []

        boxList.forEach(box => {
          map[box.start.y][box.start.x] = '.'
          map[box.end.y][box.end.x] = '.'

          // Prevent stupid bugs, that have wasted me like 2 hours
          // when going in reverse of the selected nodes...
          leftBracket.push(box.start.add(move))
          rightBracket.push(box.end.add(move))
        })

        leftBracket.forEach(({ x, y }) => (map[y][x] = '['))
        rightBracket.forEach(({ x, y }) => (map[y][x] = ']'))

        break

      default:
        throw new Error('WTF')
    }
  }

  printMap(map, robotPosition)

  return map.reduce((acc, row, y) => {
    return (
      acc +
      row.reduce((rowAcc, cell, x) => {
        if (cell === '[') {
          return rowAcc + 100 * y + x
        }

        return rowAcc
      }, 0)
    )
  }, 0)
}

const reader = (file: string): Input => {
  const [rawMap, rawMoves] = readFileSync(file, 'utf-8').trim().split('\n\n')

  const map = rawMap
    .trim()
    .split('\n')
    .map(line => {
      return line.split('')
    })

  const robot = new Vec2()

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === '@') {
        robot.updateInPlace({ x, y })
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
          '^': Direction.up,
          '>': Direction.right,
          v: Direction.down,
          '<': Direction.left,
        }[move]
      }),
    robot,
  }
}

await runExamples(2024, '15', reader, part1, part2)
await runSolution(2024, '15', reader, part1, part2)
