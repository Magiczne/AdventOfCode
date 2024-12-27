import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { CircularLinkedList, LinkedListNode } from '@magiczne/advent-of-code-ts-core/structures'
import { readFileSync } from 'node:fs'

const part2DecryptionKey = 811589153

const readNodes = (file: string, decryptionKey: number): Array<LinkedListNode<number>> => {
  return readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .map(item => new LinkedListNode(parseInt(item, 10) * decryptionKey))
}

const sumCoordinates = (file: string, decryptionKey = 1, rounds = 1): number => {
  const nodes = readNodes(file, decryptionKey)
  const linkedList = new CircularLinkedList(nodes)

  for (let round = 0; round < rounds; round++) {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      const direction = Math.sign(node.value)
      const distance = Math.abs(node.value) % (nodes.length - 1)

      if (direction < 0) {
        linkedList.moveNodeLeft(node, distance)
      } else {
        linkedList.moveNodeRight(node, distance)
      }
    }
  }

  const values = linkedList.firstCycleValues
  const zeroIndex = values.indexOf(0)

  const nth1000 = values[(1000 + zeroIndex) % values.length]
  const nth2000 = values[(2000 + zeroIndex) % values.length]
  const nth3000 = values[(3000 + zeroIndex) % values.length]

  return nth1000 + nth2000 + nth3000
}

const reader = (file: string): string => file

const part1 = (file: string): number => {
  return sumCoordinates(file)
}

const part2 = (file: string): number => {
  return sumCoordinates(file, part2DecryptionKey, 10)
}

await runExamples(2022, '20', reader, part1, part2)
await runSolution(2022, '20', reader, part1, part2)
