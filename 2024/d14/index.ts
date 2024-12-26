import { readFileSync } from 'node:fs'
import { sep } from 'node:path'
import { createInterface } from 'node:readline/promises'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { Vec2 } from '@magiczne/advent-of-code-ts-core/math'
import { group } from 'radash'

interface Robot {
  position: Vec2
  speed: Vec2
}

interface Input {
  robots: ReadonlyArray<Robot>
  mapSize: Vec2
}

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
})

const SECONDS = 100

const print = (mapSize: Vec2, robots: ReadonlyArray<Robot>): void => {
  for (let y = 0; y < mapSize.y; y++) {
    let row = ''

    for (let x = 0; x < mapSize.x; x++) {
      const robotsCount = robots.filter(robot => robot.position.x === x && robot.position.y === y).length

      row += robotsCount > 0 ? robotsCount.toString() : '.'
    }

    console.log(row)
  }
}

const safetyFactor = (mapSize: Vec2, robots: ReadonlyArray<Robot>): number => {
  const disabledX = Math.floor(mapSize.x / 2)
  const disabledY = Math.floor(mapSize.y / 2)

  const filteredRobots = robots.filter(robot => {
    return robot.position.x !== disabledX && robot.position.y !== disabledY
  })

  const quadrants = group(filteredRobots, robot => {
    if (robot.position.x > disabledX && robot.position.y < disabledY) {
      return 1
    }

    if (robot.position.x < disabledX && robot.position.y < disabledY) {
      return 2
    }

    if (robot.position.x < disabledX && robot.position.y > disabledY) {
      return 3
    }

    return 4
  })

  return Object.values(quadrants).reduce((acc, quadrant) => {
    return acc * quadrant.length
  }, 1)
}

const part1 = (data: Input): number => {
  const movedRobots = data.robots.map(robot => {
    const positiveSpeedX = robot.speed.x > 0 ? robot.speed.x : data.mapSize.x - Math.abs(robot.speed.x)
    const positiveSpeedY = robot.speed.y > 0 ? robot.speed.y : data.mapSize.y - Math.abs(robot.speed.y)

    return {
      position: new Vec2({
        x: (robot.position.x + positiveSpeedX * SECONDS) % data.mapSize.x,
        y: (robot.position.y + positiveSpeedY * SECONDS) % data.mapSize.y,
      }),
      speed: robot.speed,
    }
  })

  return safetyFactor(data.mapSize, movedRobots)
}

const part2 = async (data: Input): Promise<number> => {
  const averageSafetyFactor = part1(data)
  let movedRobots = data.robots

  let iteration = 0
  while (true) {
    iteration++
    movedRobots = movedRobots.map(robot => {
      const positiveSpeedX = robot.speed.x > 0 ? robot.speed.x : data.mapSize.x - Math.abs(robot.speed.x)
      const positiveSpeedY = robot.speed.y > 0 ? robot.speed.y : data.mapSize.y - Math.abs(robot.speed.y)

      return {
        position: new Vec2({
          x: (robot.position.x + positiveSpeedX) % data.mapSize.x,
          y: (robot.position.y + positiveSpeedY) % data.mapSize.y,
        }),
        speed: robot.speed,
      }
    })

    // Small safety factor probably means that there is a big group of robots somewhere
    // 0.6 value determined by carefully trying everything smaller than 0.9 XD
    if (safetyFactor(data.mapSize, movedRobots) < 0.6 * averageSafetyFactor) {
      print(data.mapSize, movedRobots)
      await readline.question(`Iteration ${iteration} ^^^`)
    }
  }
}

const reader = (file: string): Input => {
  const fileParts = file.split(sep)
  const fileName = fileParts[fileParts.length - 1]

  return {
    mapSize: {
      '0.txt': new Vec2({ x: 11, y: 7 }),
      'input.txt': new Vec2({ x: 101, y: 103 }),
    }[fileName],
    robots: readFileSync(file, 'utf-8')
      .trim()
      .split('\n')
      .map(line => {
        const match = line.match(/(\d+),(\d+) v=([-\d]+),([-\d]+)/)

        return {
          position: new Vec2({
            x: parseInt(match[1], 10),
            y: parseInt(match[2], 10),
          }),
          speed: new Vec2({
            x: parseInt(match[3], 10),
            y: parseInt(match[4], 10),
          }),
        }
      }),
  }
}

await runExamples(2024, '14', reader, part1, part2)
await runSolution(2024, '14', reader, part1, part2)
readline.close()
