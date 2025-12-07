import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { Direction, Vec2 } from '@magiczne/advent-of-code-ts-core/math'
import { printMatrix } from '@magiczne/advent-of-code-ts-core/matrix'
import { HashMap, ObjectSet } from '@magiczne/advent-of-code-ts-core/structures'

const enum Field {
  Empty = '.',
  Splitter = '^',
}

type Diagram = ReadonlyArray<ReadonlyArray<Field>>

interface InputData {
  startPosition: Vec2
  diagram: Diagram
}

const DEBUG = false
const printDiagram = (data: InputData, beamOrigins: ObjectSet<Vec2>): void => {
  if (!DEBUG) {
    return
  }

  printMatrix(data.diagram, (position, item) => {
    if (position.equals(data.startPosition)) {
      return 'S'
    }

    if (beamOrigins.has(position)) {
      return '|'
    }

    return item
  })
}

const part1 = (data: InputData): number => {
  const beamOrigins = new ObjectSet<Vec2>(Vec2.hashFn)

  const traverseBeam = (position: Vec2, diagram: Diagram): number => {
    beamOrigins.add(position)

    const nextPosition = position.clone()

    while (true) {
      nextPosition.addInPlace(Direction.down)

      if (nextPosition.y >= diagram.length - 1) {
        return 0
      }

      if (diagram[nextPosition.y][nextPosition.x] === Field.Splitter) {
        const splitLeft = nextPosition.add(Direction.left)
        const splitRight = nextPosition.add(Direction.right)

        const alreadySplitLeft = beamOrigins.has(splitLeft)
        const alreadySplitRight = beamOrigins.has(splitRight)

        const leftBeam = alreadySplitLeft ? 0 : traverseBeam(splitLeft, diagram)
        const rightBeam = alreadySplitRight ? 0 : traverseBeam(splitRight, diagram)
        const createdNewBeam = !alreadySplitLeft || !alreadySplitRight

        return (createdNewBeam ? 1 : 0) + leftBeam + rightBeam
      }
    }
  }

  const result = traverseBeam(data.startPosition, data.diagram)

  printDiagram(data, beamOrigins)

  return result
}

const part2 = (data: InputData): number => {
  const cache = new HashMap<Vec2, number>(Vec2.hashFn)

  const traverseBeam = (position: Vec2, diagram: Diagram): number => {
    if (cache.has(position)) {
      return cache.get(position)
    }

    const nextPosition = position.clone()

    while (true) {
      nextPosition.addInPlace(Direction.down)

      if (nextPosition.y >= diagram.length) {
        cache.set(position, 1)

        return 1
      }

      if (diagram[nextPosition.y][nextPosition.x] === Field.Splitter) {
        const splitLeft = nextPosition.add(Direction.left)
        const splitRight = nextPosition.add(Direction.right)

        const leftBeam = traverseBeam(splitLeft, diagram)
        const rightBeam = traverseBeam(splitRight, diagram)
        const result = leftBeam + rightBeam

        cache.set(position, result)

        return result
      }
    }
  }

  return traverseBeam(data.startPosition, data.diagram)
}

const reader = (file: string): InputData => {
  const data = readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .map(line => line.trim().split(''))

  const diagram = [data[0].map(item => (item === 'S' ? Field.Empty : item)), ...data.slice(1)] as ReadonlyArray<
    ReadonlyArray<Field>
  >

  return {
    startPosition: new Vec2({
      x: data[0].findIndex(item => item === 'S'),
      y: 0,
    }),
    diagram,
  }
}

await runExamples(2025, '07', reader, part1, part2)
await runSolution(2025, '07', reader, part1, part2)
