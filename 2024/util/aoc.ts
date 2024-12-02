import { existsSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import chalk from 'chalk'

const __dirname = dirname(fileURLToPath(import.meta.url))

const testRun1 = <TResult>(result: TResult, testFileName: string, durationInMs: number): void => {
  console.log(chalk.yellow(`[TST] (${testFileName})\t\tPart 1: ${result}\t\t${durationInMs}ms`))
}

const testRun2 = <TResult>(result: TResult, testFileName: string, durationInMs: number): void => {
  console.log(chalk.red(`[TST] (${testFileName})\t\tPart 2: ${result}\t\t${durationInMs}ms`))
}

const solutionPart1 = <TResult>(result: TResult, durationInMs: number): void => {
  console.log(chalk.green(`[SLN]\t\t\tPart 1: ${result}\t\t${durationInMs}ms`))
}

const solutionPart2 = <TResult>(result: TResult, durationInMs: number): void => {
  console.log(chalk.blue(`[SLN]\t\t\tPart 2: ${result}\t\t${durationInMs}ms`))
}

const testRuns = <TInput, TResult>(
  day: string,
  reader: (file: string) => TInput,
  part1: (data: TInput) => TResult,
  part2: (data: TInput) => TResult,
): void => {
  const dirPath = join(__dirname, `../d${day}/test-runs`)

  if (existsSync(dirPath)) {
    const testFiles = readdirSync(dirPath)

    testFiles.forEach(file => {
      const testData = reader(join(dirPath, file))

      const start1 = Date.now()
      const valuePart1 = part1(testData)
      const duration1 = Date.now() - start1

      const start2 = Date.now()
      const valuePart2 = part2(testData)
      const duration2 = Date.now() - start2

      testRun1(valuePart1, file, duration1)
      testRun2(valuePart2, file, duration2)
    })
  }
}

const solutionRuns = <TInput, TResult>(
  day: string,
  reader: (file: string) => TInput,
  part1: (data: TInput) => TResult,
  part2: (data: TInput) => TResult,
): void => {
  const filePath = join(__dirname, `../d${day}/input.txt`)
  const data = reader(filePath)

  const start1 = Date.now()
  const valuePart1 = part1(data)
  const duration1 = Date.now() - start1

  const start2 = Date.now()
  const valuePart2 = part2(data)
  const duration2 = Date.now() - start2

  solutionPart1(valuePart1, duration1)
  solutionPart2(valuePart2, duration2)
}

export { testRuns, solutionRuns }
