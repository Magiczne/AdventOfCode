import chalk from 'chalk'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const buildString = <TResult>(
  type: string,
  label: string,
  part: string,
  result: TResult,
  durationInMs: number,
): string => {
  return [type, label.padEnd(20, ' '), part, result.toString().padEnd(15, ' '), `${durationInMs.toFixed(4)}ms`].join(
    ' ',
  )
}

const examplePart1 = <TResult>(result: TResult, testFileName: string, durationInMs: number): void => {
  console.log(chalk.yellow(buildString('[EXM]', `(${testFileName})`, 'Part 1:', result, durationInMs)))
}

const examplePart2 = <TResult>(result: TResult, testFileName: string, durationInMs: number): void => {
  console.log(chalk.red(buildString('[EXM]', `(${testFileName})`, 'Part 2:', result, durationInMs)))
}

const solutionPart1 = <TResult>(result: TResult, durationInMs: number): void => {
  console.log(chalk.green(buildString('[SLN]', '', 'Part 1:', result, durationInMs)))
}

const solutionPart2 = <TResult>(result: TResult, durationInMs: number): void => {
  console.log(chalk.blue(buildString('[SLN]', '', 'Part 2:', result, durationInMs)))
}

export { __dirname, examplePart1, examplePart2, solutionPart1, solutionPart2 }
