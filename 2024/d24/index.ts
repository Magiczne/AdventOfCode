import { readFileSync, writeFileSync } from 'node:fs'

import { runSolution } from '@magiczne/advent-of-code-ts-core/aoc'

type GateType = 'AND' | 'OR' | 'XOR'

interface Gate {
  input1: string
  input2: string
  type: GateType
  output: string
}

interface Input {
  wires: Record<string, number>
  gates: ReadonlyArray<Gate>
}

const part1 = (data: Input): number => {
  const wires = structuredClone(data.wires)

  const getWireValue = (wire: string): number => {
    if (wire in wires) {
      return wires[wire]
    }

    return getGateValue(data.gates.find(gate => gate.output === wire))
  }

  const getGateValue = (gate: Gate): number => {
    if (gate.output in wires) {
      return wires[gate.output]
    }

    const input1 = getWireValue(gate.input1)
    const input2 = getWireValue(gate.input2)

    if (gate.type === 'AND') {
      return input1 & input2
    }

    if (gate.type === 'OR') {
      return input1 | input2
    }

    if (gate.type === 'XOR') {
      return input1 ^ input2
    }

    throw new Error('WTF')
  }

  data.gates.forEach(gate => {
    wires[gate.output] = getGateValue(gate)
  })

  const zValues = Object.entries(wires)
    .filter(entry => entry[0].startsWith('z'))
    .sort((a, b) => a[0].localeCompare(b[0]))

  return zValues.reduce((acc, value) => {
    return acc + value[1] * Math.pow(2, parseInt(value[0].substring(1)))
  }, 0)
}

const part2 = (data: Input): string => {
  const wires = structuredClone(data.wires)

  const getWireValue = (wire: string): number => {
    if (wire in wires) {
      return wires[wire]
    }

    return getGateValue(data.gates.find(gate => gate.output === wire))
  }

  const getGateValue = (gate: Gate): number => {
    if (gate.output in wires) {
      return wires[gate.output]
    }

    const input1 = getWireValue(gate.input1)
    const input2 = getWireValue(gate.input2)

    if (gate.type === 'AND') {
      return input1 & input2
    }

    if (gate.type === 'OR') {
      return input1 | input2
    }

    if (gate.type === 'XOR') {
      return input1 ^ input2
    }

    throw new Error('WTF')
  }

  const print = (wire: string, depth = 0): string => {
    if (wire in wires || depth >= 3) {
      return wire
    }

    const gate = data.gates.find(gate => gate.output === wire)
    const input1 = print(gate.input1, depth + 1)
    const input2 = print(gate.input2, depth + 1)

    if (gate.type === 'AND') {
      return `${gate.output}(${input1} & ${input2})`
    }

    if (gate.type === 'OR') {
      return `${gate.output}(${input1} | ${input2})`
    }

    if (gate.type === 'XOR') {
      return `${gate.output}(${input1} ^ ${input2})`
    }

    throw new Error('WTF')
  }

  const extractDecimal = (number: 'x' | 'y' | 'z'): number => {
    return Object.entries(wires)
      .filter(entry => entry[0].startsWith(number))
      .sort((a, b) => a[0].localeCompare(b[0]))
      .reduce((acc, value) => {
        return acc + value[1] * Math.pow(2, parseInt(value[0].substring(1)))
      }, 0)
  }

  const swapWires = (wire1: string, wire2: string): void => {
    const outputGates1 = data.gates.filter(gate => gate.output === wire1)
    const outputGates2 = data.gates.filter(gate => gate.output === wire2)

    outputGates1.forEach(gate => (gate.output = wire2))
    outputGates2.forEach(gate => (gate.output = wire1))
  }

  const toGraphviz = (): void => {
    const fileData: Array<string> = [
      'digraph GG {',
      ...Object.keys(data.wires).flatMap(wire => {
        return `${wire} [label="${wire} [${getWireValue(wire)}]"]`
      }),
      ...data.gates.flatMap(gate => {
        const isOutput = gate.type === 'XOR' && gate.output.startsWith('z')

        return [
          `${gate.input1} -> ${gate.output}`,
          `${gate.input2} -> ${gate.output}`,
          `${gate.output} [label="${gate.type}(${gate.output}) [${getWireValue(gate.output)}]", color=${isOutput ? 'blue' : 'black'}]`,
        ]
      }),
      '}',
    ]

    fileData.push('}')

    writeFileSync('2024/d24/gv.dot', fileData.join('\n'))
  }

  // Start analythis this... this... electronic adders...

  swapWires('z06', 'vwr')
  swapWires('z11', 'tqm')
  swapWires('z16', 'kfs')
  swapWires('hcm', 'gfv')

  data.gates.forEach(gate => {
    wires[gate.output] = getGateValue(gate)
  })

  // https://dreampuf.github.io/GraphvizOnline for the rescue
  toGraphviz()

  const x = extractDecimal('x')
  const y = extractDecimal('y')
  const z = extractDecimal('z')
  console.log(x.toString(2).split('').toReversed().join(''))
  console.log(y.toString(2).split('').toReversed().join(''))
  console.log((x + y).toString(2).split('').toReversed().join(''))
  console.log(z.toString(2).split('').toReversed().join(''))

  //     x: 1111 0101 0111 1100 0100 0000 0001 1001 0100 1010 0010 1
  //     y: 1111 1000 0010 0100 1010 1010 0000 0011 0110 1001 1001 1
  // x + y: 0111 0011 0100 0110 1110 1010 0001 1010 1001 0111 1011 01
  //     z: 0111 0000 1101 1010 0001 1010 0001 1010 1001 1011 1011 01
  // swap1: 0111 0011 0101 1010 0001 1010 0001 1010 1001 1011 1011 01
  // swap2: 0111 0011 0100 0110 0001 1010 0001 1010 1001 1011 1011 01
  // swap3: 0111 0011 0100 0110 1110 1010 0001 1010 1001 1011 1011 01
  // swap4: 0111 0011 0100 0110 1110 1010 0001 1010 1001 0111 1011 01

  return ['z06', 'vwr', 'z11', 'tqm', 'z16', 'kfs', 'hcm', 'gfv'].sort().join(',')
}

const reader = (file: string): Input => {
  const [rawWires, rawGates] = readFileSync(file, 'utf-8').trim().split('\n\n')

  return {
    wires: Object.fromEntries(
      rawWires
        .split('\n')
        .map(line => line.split(': '))
        .map(line => [line[0], parseInt(line[1], 10)]),
    ),
    gates: rawGates
      .split('\n')
      .map(gate => gate.match(/([a-z0-9]{3}) (AND|OR|XOR|) ([a-z0-9]{3}) -> ([a-z0-9]{3})/))
      .map(match => {
        return {
          input1: match[1],
          input2: match[3],
          type: match[2] as GateType,
          output: match[4],
        }
      }),
  }
}

// await runExamples(2024, '24', reader, part1, part2)
await runSolution(2024, '24', reader, part1, part2)
