import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { combinationsWithoutRepetition } from '@magiczne/advent-of-code-ts-core/combinatorics'
import { ObjectSet } from '@magiczne/advent-of-code-ts-core/structures'

interface Connection {
  from: string
  to: string
}

interface Input {
  connections: ReadonlyArray<Connection>
  lan: Record<string, Array<string>>
}

const part1 = (data: Input): number => {
  const triples = new Set<string>()

  Object.entries(data.lan).forEach(([pc1, connectedPcs]) => {
    combinationsWithoutRepetition(connectedPcs, 2).forEach(([pc2, pc3]) => {
      // We don't have a loop
      if (!data.lan[pc3].includes(pc2)) {
        return
      }

      if (pc1.startsWith('t') || pc2.startsWith('t') || pc3.startsWith('t')) {
        triples.add([pc1, pc2, pc3].sort().join(','))
      }
    })
  })

  return triples.size
}

const part2 = (data: Input): string => {
  let lanParty = new ObjectSet(
    val => val.sort().join(','),
    Object.keys(data.lan).map(pc => [pc]),
  )

  while (lanParty.size > 1) {
    const realLanParty = new ObjectSet<Array<string>>(val => val.sort().join(','))

    for (const group of lanParty) {
      Object.keys(data.lan).forEach(pc => {
        // PC is already connected to our group - we can skip
        if (group.includes(pc)) {
          return
        }

        const connectedWithAllGroupMembers = group.every(groupPc => data.lan[groupPc].includes(pc))

        // We create new LAN party only with some computers that are connected to each other
        if (connectedWithAllGroupMembers) {
          realLanParty.add([...group, pc])
        }
      })
    }

    lanParty = realLanParty
  }

  return [...lanParty.values()][0].join(',')
}

const reader = (file: string): Input => {
  const connections = readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .map(line => {
      const [from, to] = line.split('-')

      return {
        from,
        to,
      }
    })

  const lan: Record<string, Array<string>> = {}

  connections.forEach(item => {
    if (lan[item.from] === undefined) {
      lan[item.from] = []
    }

    if (lan[item.to] === undefined) {
      lan[item.to] = []
    }

    lan[item.from].push(item.to)
    lan[item.to].push(item.from)
  })

  return {
    connections,
    lan,
  }
}

await runExamples(2024, '23', reader, part1, part2)
await runSolution(2024, '23', reader, part1, part2)
