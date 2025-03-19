import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { examplePart1, examplePart2, rootDirectory } from './util'

const runExamples = async <TInput, TPart1Result, TPart2Result>(
  year: number,
  day: string,
  reader: (file: string) => TInput,
  part1: (data: TInput) => TPart1Result | PromiseLike<TPart1Result>,
  part2: (data: TInput) => TPart2Result | PromiseLike<TPart2Result>,
): Promise<void> => {
  const dirPath = join(rootDirectory, `${year}/d${day}/test-runs`)

  if (existsSync(dirPath)) {
    const testFiles = readdirSync(dirPath)

    for (const file of testFiles) {
      const testData1 = reader(join(dirPath, file))
      const testData2 = reader(join(dirPath, file))

      const start1 = performance.now()
      const valuePart1 = await part1(testData1)
      const duration1 = performance.now() - start1
      examplePart1(valuePart1, file, duration1)

      const start2 = performance.now()
      const valuePart2 = await part2(testData2)
      const duration2 = performance.now() - start2
      examplePart2(valuePart2, file, duration2)
    }
  }
}

export { runExamples }
