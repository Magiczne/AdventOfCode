import chalk from 'chalk'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDirectory = join(dirname(fileURLToPath(import.meta.url)), '../../')

const buildString = <TResult>(
  type: string,
  label: string,
  part: string,
  result: TResult,
  durationInMs: number,
): string => {
  return [type, label.padEnd(10, ' '), part, result.toString().padEnd(45, ' '), `${durationInMs.toFixed(4)}ms`].join(
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

export { examplePart1, examplePart2, rootDirectory, solutionPart1, solutionPart2 }
