import { join } from 'node:path'
import { __dirname, solutionPart1, solutionPart2 } from './util'

const runSolution = async <TInput, TPart1Result, TPart2Result>(
  year: number,
  day: string,
  reader: (file: string) => TInput,
  part1: (data: TInput) => TPart1Result | Promise<TPart1Result>,
  part2: (data: TInput) => TPart2Result | Promise<TPart2Result>,
): Promise<void> => {
  const filePath = join(__dirname, `../../${year}/d${day}/input.txt`)
  const data = reader(filePath)

  const start1 = Date.now()
  const valuePart1 = await part1(data)
  const duration1 = Date.now() - start1
  solutionPart1(valuePart1, duration1)

  const start2 = Date.now()
  const valuePart2 = await part2(data)
  const duration2 = Date.now() - start2
  solutionPart2(valuePart2, duration2)
}

export { runSolution }
