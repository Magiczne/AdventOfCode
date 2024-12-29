import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { readFileSync } from 'node:fs'

const goUpCommand = '$ cd ..'
const numericStrings = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const totalDiskSpace = 70_000_000
const requiredFreeSpace = 30_000_000

const startsWithNumber = (data: string): boolean => {
  const char = data.at(0) ?? ''

  return numericStrings.includes(char)
}

const getDirectorySizes = (file: string): Map<string, number> => {
  const pathStack: Array<string> = []
  const directorySizes = new Map<string, number>()

  const updateSizeForDirectory = (directory: string, size: number): void => {
    if (!directorySizes.has(directory)) {
      directorySizes.set(directory, size)
    } else {
      directorySizes.set(directory, directorySizes.get(directory) + size)
    }
  }

  readFileSync(file)
    .toString()
    .trim()
    .split('\n')
    .forEach(command => {
      if (command === goUpCommand) {
        pathStack.pop()
      } else if (command.startsWith('$ cd')) {
        const [, , directoryName] = command.split(' ')
        const path = pathStack.join('') + directoryName

        pathStack.push(path)
      } else if (startsWithNumber(command)) {
        const fileSize = parseInt(command.split(' ')[0] ?? '0')

        pathStack.forEach(directory => {
          updateSizeForDirectory(directory, fileSize)
        })
      }
    })

  return directorySizes
}

const part1 = (file: string): number => {
  return [...getDirectorySizes(file).values()]
    .filter(value => value < 100_000)
    .reduce<number>((acc, value) => acc + value, 0)
}

const part2 = (file: string): number => {
  const directorySizes = getDirectorySizes(file)
  const unusedSpace = totalDiskSpace - (directorySizes.get('/') ?? 0)
  const values = [...directorySizes.values()]

  return Math.min(...values.filter(value => value + unusedSpace >= requiredFreeSpace))
}

const reader = (file: string): string => file

await runExamples(2022, '07', reader, part1, part2)
await runSolution(2022, '07', reader, part1, part2)
