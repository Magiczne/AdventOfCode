import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { Direction, Vec2 } from '@magiczne/advent-of-code-ts-core/math'

interface Input {
  map: Array<Array<'.' | '#'>>
  guard: Vec2
}

const part1 = (input: Input): number => {
  const guardPos = input.guard.clone()
  const speed = Direction.up

  const visited = new Set<string>()
  visited.add(`${guardPos.y}_${guardPos.x}`)

  while (true) {
    if (input.map[guardPos.y + speed.y]?.[guardPos.x + speed.x] === undefined) {
      break
    }

    if (input.map[guardPos.y + speed.y][guardPos.x + speed.x] === '#') {
      speed.updateInPlace(speed.rotateClockwise())

      continue
    }

    guardPos.addInPlace(speed)
    visited.add(`${guardPos.y}_${guardPos.x}`)
  }

  return visited.size
}

const part2 = (input: Input): number => {
  const guardPos = input.guard.clone()
  const speed = Direction.up

  const visited = new Set<string>()
  visited.add(`${guardPos.y}_${guardPos.x}`)

  while (true) {
    if (input.map[guardPos.y + speed.y]?.[guardPos.x + speed.x] === undefined) {
      break
    }

    if (input.map[guardPos.y + speed.y][guardPos.x + speed.x] === '#') {
      speed.updateInPlace(speed.rotateClockwise())

      continue
    }

    guardPos.addInPlace(speed)
    visited.add(`${guardPos.y}_${guardPos.x}`)
  }

  // Everything above is just part 1
  // Brute force ftw, going through all possible obstacle places
  const path = [...visited.values()].map(item => item.split('_').map(i => parseInt(i, 10)))
  let cycles = 0

  for (const pathPart of path) {
    const newMap = structuredClone(input.map)
    newMap[pathPart[0]][pathPart[1]] = '#'

    // walk and check cycles
    const guardPos = input.guard.clone()
    const speed = Direction.up
    const visited = new Set<string>()
    visited.add(`${guardPos.y}_${guardPos.x}_${speed.y}_${speed.x}`)

    while (true) {
      if (newMap[guardPos.y + speed.y]?.[guardPos.x + speed.x] === undefined) {
        break
      }

      if (newMap[guardPos.y + speed.y][guardPos.x + speed.x] === '#') {
        speed.updateInPlace(speed.rotateClockwise())

        continue
      }

      guardPos.addInPlace(speed)

      if (visited.has(`${guardPos.y}_${guardPos.x}_${speed.y}_${speed.x}`)) {
        cycles++
        break
      }

      visited.add(`${guardPos.y}_${guardPos.x}_${speed.y}_${speed.x}`)
    }
  }

  return cycles
}

const reader = (file: string): Input => {
  const lines = readFileSync(file, 'utf-8').trim().split('\n')
  const map = lines.map(line => line.split(''))

  let guardX = 0
  let guardY = 0

  xLoop: for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] == '^') {
        map[y][x] = '.'
        guardX = x
        guardY = y

        break xLoop
      }
    }
  }

  return {
    map: map as Array<Array<'.' | '#'>>,
    guard: new Vec2({ x: guardX, y: guardY }),
  }
}

runExamples(2024, '06', reader, part1, part2)
runSolution(2024, '06', reader, part1, part2)
