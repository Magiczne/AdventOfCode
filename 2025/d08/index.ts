import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { Vec3 } from '@magiczne/advent-of-code-ts-core/math'

interface Box {
  position: Vec3
  neighbors: Set<Box>
  circuit: Set<Box> | null
}

interface DistanceEntry {
  a: Box
  b: Box
  distance: number
}

interface InputData {
  connectionsToMake: number
  boxes: ReadonlyArray<Box>
}

const calculateDistances = (boxes: ReadonlyArray<Box>): ReadonlyArray<DistanceEntry> => {
  const distances: Array<DistanceEntry> = []

  for (const [i, box] of boxes.entries()) {
    for (let j = i + 1; j < boxes.length; j++) {
      distances.push({
        a: box,
        b: boxes[j],
        distance: box.position.distance(boxes[j].position),
      })
    }
  }

  distances.sort((a: DistanceEntry, b: DistanceEntry): number => a.distance - b.distance)

  return distances
}

const part1 = ({ connectionsToMake, boxes }: InputData): number => {
  const distances = calculateDistances(boxes)

  for (const { a, b } of distances.slice(0, connectionsToMake)) {
    a.neighbors.add(b)
    b.neighbors.add(a)
  }

  const circuits: Array<Set<Box>> = []

  const addNeighborsToCircuitOf = (box: Box): void => {
    for (const neighbor of box.neighbors) {
      if (!box.circuit.has(neighbor)) {
        box.circuit.add(neighbor)
        neighbor.circuit = box.circuit

        addNeighborsToCircuitOf(neighbor)
      }
    }
  }

  for (const { a, b } of distances.slice(0, connectionsToMake)) {
    // We don't care if one of the boxes is already part of a circuit
    // we only want to make new connections
    if (a.circuit !== null || b.circuit !== null) {
      continue
    }

    const circuit = new Set([a, b])
    circuits.push(circuit)

    a.circuit = circuit
    b.circuit = circuit

    addNeighborsToCircuitOf(a)
    addNeighborsToCircuitOf(b)
  }

  return [...circuits]
    .toSorted((a, b) => b.size - a.size)
    .slice(0, 3)
    .reduce((acc, circuit) => {
      return acc * circuit.size
    }, 1)
}

const part2 = ({ boxes }: InputData): number => {
  const distances = calculateDistances(boxes)

  for (const { a, b } of distances) {
    a.neighbors.add(b)
    b.neighbors.add(a)

    const circuit = new Set<Box>()
    const unvisited = [b, a]

    while (unvisited.length > 0) {
      const box = unvisited.pop()

      if (!circuit.has(box)) {
        circuit.add(box)

        for (const neighbor of box.neighbors) {
          unvisited.push(neighbor)
        }
      }
    }

    if (circuit.size === boxes.length) {
      return a.position.x * b.position.x
    }
  }

  throw new Error('WTF')
}

const reader = (file: string): InputData => {
  return {
    connectionsToMake: file.endsWith('0.txt') ? 10 : 1000,
    boxes: readFileSync(file, 'utf-8')
      .trim()
      .split('\n')
      .map((line: string): Box => {
        const [x, y, z] = line.trim().split(',')

        return {
          position: new Vec3({
            x: parseInt(x, 10),
            y: parseInt(y, 10),
            z: parseInt(z, 10),
          }),
          neighbors: new Set(),
          circuit: null,
        }
      }),
  }
}

await runExamples(2025, '08', reader, part1, part2)
await runSolution(2025, '08', reader, part1, part2)
