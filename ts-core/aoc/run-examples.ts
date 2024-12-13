import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { __dirname, examplePart1, examplePart2 } from './util'

const runExamples = async <TInput, TResult>(
  year: number,
  day: string,
  reader: (file: string) => TInput,
  part1: (data: TInput) => TResult | PromiseLike<TResult>,
  part2: (data: TInput) => TResult | PromiseLike<TResult>,
): Promise<void> => {
  const dirPath = join(__dirname, `../../${year}/d${day}/test-runs`)

  if (existsSync(dirPath)) {
    const testFiles = readdirSync(dirPath)

    for (const file of testFiles) {
      const testData = reader(join(dirPath, file))

      const start1 = Date.now()
      const valuePart1 = await part1(testData)
      const duration1 = Date.now() - start1
      examplePart1(valuePart1, file, duration1)

      const start2 = Date.now()
      const valuePart2 = await part2(testData)
      const duration2 = Date.now() - start2
      examplePart2(valuePart2, file, duration2)
    }
  }
}

export { runExamples }
