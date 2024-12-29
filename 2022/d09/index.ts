import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { readFileSync } from 'node:fs'
import { last } from 'radash'

// x = 0, y = 0 at bottom left
type Direction = 'U' | 'R' | 'D' | 'L'
type Instruction = { direction: Direction; distance: number }
type Position = { x: number; y: number }

const readInstructions = (file: string): ReadonlyArray<Instruction> => {
  return readFileSync(file)
    .toString()
    .trim()
    .split('\n')
    .map((item): Instruction => {
      const [direction, distance] = item.split(' ')

      return {
        direction: direction as Direction,
        distance: parseInt(distance, 10),
      }
    })
}

const moveHead = ({ x, y }: Position, direction: Direction): Position => {
  switch (direction) {
    case 'U':
      return { x, y: y + 1 }

    case 'R':
      return { x: x + 1, y }

    case 'D':
      return { x, y: y - 1 }

    case 'L':
      return { x: x - 1, y }
  }
}

const moveTail = ({ x, y }: Position, { x: headX, y: headY }: Position): Position => {
  const dX = headX - x
  const dY = headY - y

  if (Math.abs(dX) <= 1 && Math.abs(dY) <= 1) {
    return { x, y }
  }

  return {
    x: x + Math.sign(dX),
    y: y + Math.sign(dY),
  }
}

const getUniqueTailPositions = (instructions: ReadonlyArray<Instruction>): number => {
  const uniquePositions = new Set<string>(['0,0'])
  let tailPosition: Position = { x: 0, y: 0 }
  let headPosition: Position = { x: 0, y: 0 }

  instructions.forEach(instruction => {
    for (let i = 0; i < instruction.distance; i++) {
      headPosition = moveHead(headPosition, instruction.direction)
      tailPosition = moveTail(tailPosition, headPosition)

      uniquePositions.add(`${tailPosition.x},${tailPosition.y}`)
    }
  })

  return uniquePositions.size
}

const getUniqueTailPositions2 = (instructions: ReadonlyArray<Instruction>, tailLength: number): number => {
  const uniquePositions = new Set<string>(['0,0'])
  let headPosition: Position = { x: 0, y: 0 }
  let tailsPositions: ReadonlyArray<Position> = Array.from({ length: tailLength }, () => ({ x: 0, y: 0 }))

  instructions.forEach(instruction => {
    for (let i = 0; i < instruction.distance; i++) {
      headPosition = moveHead(headPosition, instruction.direction)

      const newTailsPositions: Array<Position> = []

      for (let j = 0; j < tailLength; j++) {
        newTailsPositions[j] = moveTail(tailsPositions[j], j === 0 ? headPosition : newTailsPositions[j - 1])
      }

      tailsPositions = newTailsPositions

      const tail = last(tailsPositions)
      uniquePositions.add(`${tail?.x},${tail?.y}`)
    }
  })

  return uniquePositions.size
}

const reader = (file: string): string => file

const part1 = (file: string): number => {
  if (file.endsWith('1.txt')) {
    return -1
  }

  return getUniqueTailPositions(readInstructions(file))
}

const part2 = (file: string): number => {
  if (file.endsWith('0.txt')) {
    return -1
  }

  return getUniqueTailPositions2(readInstructions(file), 9)
}

await runExamples(2022, '09', reader, part1, part2)
await runSolution(2022, '09', reader, part1, part2)
