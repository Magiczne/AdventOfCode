import { readFileSync } from 'node:fs'
import { Context, init as initZ3, IntNum } from 'z3-solver'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { Vec2 } from '@magiczne/advent-of-code-ts-core/math'

interface Machine {
  buttonA: Vec2
  buttonB: Vec2
  prize: Vec2
}

const { Context } = await initZ3()

// @ts-expect-error Something is wrong with z3-solver
const ctx: Context = new Context('aoc')

const optimizeMachine = async (machine: Machine, prizeCoefficient = 0): Promise<number> => {
  const solver = new ctx.Optimize()
  const x = ctx.Int.const('x')
  const y = ctx.Int.const('y')

  solver.add(x.gt(0))
  solver.add(y.gt(0))
  solver.add(
    x
      .mul(machine.buttonA.x)
      .add(y.mul(machine.buttonB.x))
      .eq(machine.prize.x + prizeCoefficient),
  )
  solver.add(
    x
      .mul(machine.buttonA.y)
      .add(y.mul(machine.buttonB.y))
      .eq(machine.prize.y + prizeCoefficient),
  )
  solver.minimize(x.mul(3).add(y))

  if ((await solver.check()) === 'sat') {
    const model = solver.model()
    const solutionX = parseInt((model.eval(x) as IntNum).asString(), 10)
    const solutionY = parseInt((model.eval(y) as IntNum).asString(), 10)

    return solutionX * 3 + solutionY
  }

  return 0
}

const part1 = async (machines: ReadonlyArray<Machine>): Promise<number> => {
  let cost = 0

  for (const machine of machines) {
    cost += await optimizeMachine(machine, 0)
  }

  return cost
}

const part2 = async (machines: ReadonlyArray<Machine>): Promise<number> => {
  let cost = 0

  for (const machine of machines) {
    cost += await optimizeMachine(machine, 10000000000000)
  }

  return cost
}

const reader = (file: string): ReadonlyArray<Machine> => {
  return readFileSync(file, 'utf-8')
    .trim()
    .split('\n\n')
    .map(machine => {
      const lines = machine.split('\n').map(line => line.match(/(\d+).+?(\d+)/))

      return {
        buttonA: new Vec2({
          x: parseInt(lines[0][1], 10),
          y: parseInt(lines[0][2], 10),
        }),
        buttonB: new Vec2({
          x: parseInt(lines[1][1], 10),
          y: parseInt(lines[1][2], 10),
        }),
        prize: new Vec2({
          x: parseInt(lines[2][1], 10),
          y: parseInt(lines[2][2], 10),
        }),
      }
    })
}

await runExamples(2024, '13', reader, part1, part2)
await runSolution(2024, '13', reader, part1, part2)
