import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'

const EMPTY = -1

const part1 = (data: ReadonlyArray<number>): number => {
  let currentFileId = 0
  const disk: Array<number> = []

  for (let i = 0; i < data.length; i++) {
    const isEmpty = i % 2 !== 0
    const value = isEmpty ? EMPTY : currentFileId

    disk.push(...Array.from({ length: data[i] }, _ => value))

    if (!isEmpty) {
      currentFileId++
    }
  }

  for (let i = disk.length - 1; i >= 0; i--) {
    if (disk[i] === EMPTY || disk.indexOf(EMPTY) > i) {
      continue
    }

    disk[disk.indexOf(EMPTY)] = disk[i]
    disk[i] = EMPTY
  }

  return disk.reduce((acc, item, index) => {
    if (item === EMPTY) {
      return acc
    }

    return acc + index * item
  }, 0)
}

const part2 = (data: ReadonlyArray<number>): number => {
  let currentFileId = 0
  let disk: Array<{ id: number; length: number }> = data.map((item, index) => {
    const isEmpty = index % 2 !== 0
    const id = isEmpty ? EMPTY : currentFileId++

    if (isEmpty) {
      return { id, length: item }
    }

    return {
      id,
      length: item,
    }
  })

  for (let i = currentFileId - 1; i >= 0; i--) {
    const fileIndex = disk.findIndex(block => block.id === i)
    const freeSpaceIndex = disk.findIndex(block => block.id === EMPTY && block.length >= disk[fileIndex].length)

    if (freeSpaceIndex === -1 || fileIndex < freeSpaceIndex) {
      continue
    }

    const file = disk[fileIndex]
    const freeSpace = disk[freeSpaceIndex]

    if (freeSpace.length > file.length) {
      disk = [
        ...disk.slice(0, freeSpaceIndex),
        { id: file.id, length: file.length },
        { id: EMPTY, length: freeSpace.length - file.length },
        ...disk.slice(freeSpaceIndex + 1),
      ]
      disk[fileIndex + 1].id = EMPTY
    } else if (freeSpace.length === file.length) {
      freeSpace.id = file.id
      file.id = EMPTY
    }
  }

  // There may be places with two empty blocks next to each other, we need to compact them
  for (let j = 0; j < disk.length - 1; j++) {
    if (disk[j].id == EMPTY && disk[j + 1].id == EMPTY) {
      disk = [...disk.slice(0, j), { id: EMPTY, length: disk[j].length + disk[j + 1].length }, ...disk.slice(j + 2)]

      j--
    }
  }

  return disk.reduce(
    (acc, block) => {
      if (block.id === EMPTY) {
        return {
          blockId: acc.blockId + block.length,
          checksum: acc.checksum,
        }
      }

      return {
        blockId: acc.blockId + block.length,
        checksum:
          acc.checksum +
          Array.from({ length: block.length }, (_, index) => {
            return block.id * (index + acc.blockId)
          }).reduce((blockAcc, value) => blockAcc + value, 0),
      }
    },
    { blockId: 0, checksum: 0 },
  ).checksum
}

const reader = (file: string): ReadonlyArray<number> => {
  return readFileSync(file, 'utf-8')
    .trim()
    .split('')
    .map(item => {
      return parseInt(item, 10)
    })
}

runExamples(2024, '09', reader, part1, part2)
runSolution(2024, '09', reader, part1, part2)
