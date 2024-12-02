import chalk from 'chalk'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const examplePart1 = <TResult>(result: TResult, testFileName: string, durationInMs: number): void => {
  console.log(chalk.yellow(`[EXM] (${testFileName})\t\tPart 1: ${result}\t\t${durationInMs}ms`))
}

const examplePart2 = <TResult>(result: TResult, testFileName: string, durationInMs: number): void => {
  console.log(chalk.red(`[EXM] (${testFileName})\t\tPart 2: ${result}\t\t${durationInMs}ms`))
}

const solutionPart1 = <TResult>(result: TResult, durationInMs: number): void => {
  console.log(chalk.green(`[SLN]\t\t\tPart 1: ${result}\t\t${durationInMs}ms`))
}

const solutionPart2 = <TResult>(result: TResult, durationInMs: number): void => {
  console.log(chalk.blue(`[SLN]\t\t\tPart 2: ${result}\t\t${durationInMs}ms`))
}

export { __dirname, examplePart1, examplePart2, solutionPart1, solutionPart2 }
