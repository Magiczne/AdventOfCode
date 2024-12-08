import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'

interface Vec2 {
  x: number
  y: number
}

interface Input {
  map: Array<Array<'.' | '#'>>
  guard: Vec2
}

const rotate = (speed: Vec2): Vec2 => {
  // From going downwards to going left
  if (speed.x === 0 && speed.y === 1) {
    return {
      x: -1,
      y: 0,
    }
  }

  // From going left to going upwards
  if (speed.x === -1 && speed.y === 0) {
    return {
      x: 0,
      y: -1,
    }
  }

  // From going upwards to going right
  if (speed.x === 0 && speed.y === -1) {
    return {
      x: 1,
      y: 0,
    }
  }

  // From going right to going downwards
  if (speed.x === 1 && speed.y === 0) {
    return {
      x: 0,
      y: 1,
    }
  }

  throw new Error('WTF')
}

const part1 = (input: Input): number => {
  const guardPos: Vec2 = { x: input.guard.x, y: input.guard.y }
  const speed: Vec2 = { x: 0, y: -1 }

  const visited = new Set<string>()
  visited.add(`${guardPos.y}_${guardPos.x}`)

  while (true) {
    if (input.map[guardPos.y + speed.y]?.[guardPos.x + speed.x] === undefined) {
      break
    }

    if (input.map[guardPos.y + speed.y][guardPos.x + speed.x] === '#') {
      const { x, y } = rotate(speed)

      speed.x = x
      speed.y = y

      continue
    }

    guardPos.x += speed.x
    guardPos.y += speed.y
    visited.add(`${guardPos.y}_${guardPos.x}`)
  }

  return visited.size
}

const part2 = (input: Input): number => {
  const guardPos: Vec2 = { x: input.guard.x, y: input.guard.y }
  const speed: Vec2 = { x: 0, y: -1 }

  const visited = new Set<string>()
  visited.add(`${guardPos.y}_${guardPos.x}`)

  while (true) {
    if (input.map[guardPos.y + speed.y]?.[guardPos.x + speed.x] === undefined) {
      break
    }

    if (input.map[guardPos.y + speed.y][guardPos.x + speed.x] === '#') {
      const { x, y } = rotate(speed)

      speed.x = x
      speed.y = y

      continue
    }

    guardPos.x += speed.x
    guardPos.y += speed.y
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
    const guardPos: Vec2 = { x: input.guard.x, y: input.guard.y }
    const speed: Vec2 = { x: 0, y: -1 }
    const visited = new Set<string>()
    visited.add(`${guardPos.y}_${guardPos.x}_${speed.y}_${speed.x}`)

    while (true) {
      if (newMap[guardPos.y + speed.y]?.[guardPos.x + speed.x] === undefined) {
        break
      }

      if (newMap[guardPos.y + speed.y][guardPos.x + speed.x] === '#') {
        const { x, y } = rotate(speed)

        speed.x = x
        speed.y = y

        continue
      }

      guardPos.x += speed.x
      guardPos.y += speed.y

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
    guard: {
      x: guardX,
      y: guardY,
    },
  }
}

runExamples(2024, '06', reader, part1, part2)
runSolution(2024, '06', reader, part1, part2)
