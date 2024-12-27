import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { leastCommonMultiple } from '@magiczne/advent-of-code-ts-core/number'
import { Tree, TreeNode } from '@magiczne/advent-of-code-ts-core/structures'

const read = (file: string) => {
  const [rawInstructions, rawNodes] = readFileSync(file, 'utf-8').trim().split('\n\n')
  const nodesInfo = rawNodes.split('\n').map(line => [...line.matchAll(/([A-Z0-9]{3})/g)].map(match => match[1]))
  const nodes = nodesInfo.map(nodeInfo => new TreeNode(nodeInfo[0]))

  nodes.forEach((node, index) => {
    node.left = nodes.find(n => n.data === nodesInfo[index][1]) ?? null
    node.right = nodes.find(n => n.data === nodesInfo[index][2]) ?? null
  })

  const tree = new Tree(nodes.find(node => node.data === 'AAA'))

  return {
    instructions: rawInstructions.split('') as ReadonlyArray<'L' | 'R'>,
    nodes,
    tree,
  }
}

const part1 = (file: string) => {
  if (file.endsWith('1.txt')) {
    // Skipping 1.txt as an example for part 1
    // as it is only relevant for part 2
    return -1
  }

  const { instructions, tree } = read(file)

  return tree.traverseWithInstructions({
    instructions,
    source: tree.root,
    targetCheck: node => node.data === 'ZZZ',
  })
}

const part2 = (file: string) => {
  const { instructions, nodes, tree } = read(file)

  const cycles = nodes
    .filter(node => node.data.endsWith('A'))
    .map(node => {
      return tree.traverseWithInstructions({
        instructions,
        source: node,
        targetCheck: node => node.data.endsWith('Z'),
      })
    })

  return leastCommonMultiple(cycles)
}

const reader = (file: string): string => file

await runExamples(2023, '08', reader, part1, part2)
await runSolution(2023, '08', reader, part1, part2)
