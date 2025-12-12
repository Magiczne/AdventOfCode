import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'

interface Region {
  width: number
  height: number
  area: number
  shapes: ReadonlyArray<number>
}

interface Input {
  shapes: ReadonlyArray<ReadonlyArray<ReadonlyArray<'.' | '#'>>>
  regions: ReadonlyArray<Region>
}

/**
 * IT DOES NOT RETURN CORRECT SOLUTION FOR TEST INPUT.
 * ONLY FOR REAL SOLUTION DATA.
 */
const part1 = (data: Input): number => {
  const shapeAreas = data.shapes.map(shape => {
    return shape.reduce((acc, row) => {
      return (
        acc +
        row.reduce((acc2, col) => {
          if (col === '#') {
            return acc2 + 1
          }

          return acc2
        }, 0)
      )
    }, 0)
  })

  return data.regions.filter(region => {
    const shapeAreaSum = region.shapes.reduce((acc, count, shape) => {
      return acc + count * shapeAreas[shape]
    }, 0)

    return region.area - shapeAreaSum > 0
  }).length
}

const part2 = (data: Input): number => {
  return 0
}

const reader = (file: string): Input => {
  const data = readFileSync(file, 'utf-8').trim().split('\n')
  const rawShapes = data.slice(0, 30).join('\n')
  const rawRegions = data.slice(30)

  return {
    shapes: rawShapes.split('\n\n').map(rawShape => {
      return rawShape
        .trim()
        .split('\n')
        .slice(1)
        .map(item => {
          return item.split('') as Array<'.' | '#'>
        })
    }),
    regions: rawRegions.map(region => {
      const [size, rawShapes] = region.split(': ')
      const [rawWidth, rawHeight] = size.split('x')
      const width = parseInt(rawWidth, 10)
      const height = parseInt(rawHeight, 10)

      return {
        width,
        height,
        area: width * height,
        shapes: rawShapes.split(' ').map(item => parseInt(item, 10)),
      }
    }),
  }
}

await runExamples(2025, '12', reader, part1, part2)
await runSolution(2025, '12', reader, part1, part2)
