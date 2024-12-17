import { readFileSync } from 'node:fs'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'

type Operand = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

interface Input {
  registers: Record<'A' | 'B' | 'C', number>
  program: ReadonlyArray<Operand>
}

const DEBUG = false
const debug = (...params: Array<unknown>): void => {
  if (!DEBUG) {
    return
  }

  console.log(...params)
}

const part1 = (data: Input): string => {
  let ip = 0
  const registers = { ...data.registers }
  const ret: Array<number> = []

  const resolveComboOperand = (op: Operand): [string, number] => {
    if (op < 4) {
      return [op.toString(), op]
    }

    if (op === 4) {
      return ['A', registers.A]
    }

    if (op === 5) {
      return ['B', registers.B]
    }

    if (op === 6) {
      return ['C', registers.C]
    }

    throw new Error(`WTF: ${op}`)
  }

  const instructions: Record<Operand, (op: Operand) => void> = {
    // adv
    0: op => {
      const combo = resolveComboOperand(op)
      debug(`A = A >> ${combo[0]}`)
      registers.A = registers.A >> combo[1]
      ip += 2
    },

    // bxl
    1: op => {
      debug(`B = B ^ ${op}`)
      registers.B = registers.B ^ op
      ip += 2
    },

    // bst
    2: op => {
      const combo = resolveComboOperand(op)
      debug(`B = ${combo[0]} % 8`)
      registers.B = combo[1] % 8
      ip += 2
    },

    // jnz
    3: op => {
      if (registers.A === 0) {
        debug('jnz(0)')
        ip += 2
        return
      }

      debug('jnz(A)')
      ip = op
    },

    // bxc
    4: op => {
      debug(`B = B ^ C`)
      registers.B = registers.B ^ registers.C
      ip += 2
    },

    // out
    5: op => {
      const combo = resolveComboOperand(op)
      debug(`out(${combo[0]})`)
      ret.push(combo[1] % 8)
      ip += 2
    },

    // bdv
    6: op => {
      const combo = resolveComboOperand(op)
      debug(`B = A >> ${combo[0]}`)
      registers.B = registers.A >> combo[1]
      ip += 2
    },

    // cdv
    7: op => {
      const combo = resolveComboOperand(op)
      debug(`C = A >> ${combo[0]}`)
      registers.C = registers.A >> combo[1]
      ip += 2
    },
  }

  while (ip < data.program.length) {
    const op1 = data.program[ip]
    const op2 = data.program[ip + 1]

    instructions[op1](op2)
  }

  return ret.join(',')
}

const part2 = (data: Input): string => {
  // Fucking bigints...
  // If not used we overflow and get negative values
  const output = (a: bigint): bigint => {
    const magic = a % 8n ^ 5n

    return (magic ^ 6n ^ (a >> magic)) % 8n
  }

  // const run = (a: bigint): string => {
  //   const out: Array<bigint> = []

  //   while (a > 0) { // jnz(A)
  //     out.push(output(a)) // out((((A % 8) ^ 5) ^ 6) ^ (A >> ((A % 8) ^ 5)))
  //     a >>= 3n // A = A >> 3
  //   }

  //   return out.join(',')
  // }

  let valuesForA = new Set([0n])

  for (const rawInstruction of data.program.toReversed()) {
    const instructions = BigInt(rawInstruction)
    const newValuesForA = new Set<bigint>()

    valuesForA.forEach(input => {
      for (let i = 0n; i < 8n; i++) {
        const a = (input << 3n) + i

        if (output(a) === instructions) {
          newValuesForA.add(a)
        }
      }
    })

    valuesForA = newValuesForA
  }

  return Math.min(...[...valuesForA].map(b => Number(b))).toString()
}

const reader = (file: string): Input => {
  const [rawRegisters, rawProgram] = readFileSync(file, 'utf-8').trim().split('\n\n')

  return {
    registers: Object.fromEntries(
      rawRegisters.split('\n').map(item => {
        const splitItem = item.split(': ')

        return [splitItem[0].split(' ')[1], parseInt(splitItem[1], 10)]
      }),
    ) as Record<'A' | 'B' | 'C', number>,
    program: rawProgram
      .trim()
      .split(': ')[1]
      .split(',')
      .map(item => parseInt(item, 10)) as ReadonlyArray<Operand>,
  }
}

await runExamples(2024, '17', reader, part1, part2)
await runSolution(2024, '17', reader, part1, part2)
