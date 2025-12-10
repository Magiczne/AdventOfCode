import { readFileSync } from 'node:fs'
import { type Arith, type Context, init as initZ3, type IntNum } from 'z3-solver'

import { runExamples, runSolution } from '@magiczne/advent-of-code-ts-core/aoc'
import { combinationsWithoutRepetition } from '@magiczne/advent-of-code-ts-core/combinatorics'

interface InputLine {
  lights: ReadonlyArray<boolean>
  buttons: ReadonlyArray<ReadonlyArray<number>>
  joltages: ReadonlyArray<number>
}

const { Context } = await initZ3()

// @ts-expect-error Something is wrong with z3-solver
const ctx: Context = new Context('aoc')

const part1 = (data: ReadonlyArray<InputLine>): number => {
  /**
   * Switching on/of the button combinations === not pressing at all.
   * We can exploit that and just brute force combinations.
   */
  const getLowestButtonCount = (line: InputLine): number => {
    for (let combinationLength = 1; combinationLength < line.buttons.length; combinationLength++) {
      for (const combination of combinationsWithoutRepetition(line.buttons, combinationLength)) {
        let state = Array.from({ length: line.lights.length }, () => false)

        combination.forEach(buttonSet => {
          buttonSet.forEach(index => {
            state[index] = !state[index]
          })
        })

        if (state.join('') === line.lights.join('')) {
          return combination.length
        }
      }
    }

    throw new Error('WTF')
  }

  return data.reduce((acc, line) => {
    return acc + getLowestButtonCount(line)
  }, 0)
}

const part2 = async (data: ReadonlyArray<InputLine>): Promise<number> => {
  const getLowestButtonCount = async (line: InputLine): Promise<number> => {
    const solver = new ctx.Optimize()
    const variables: Array<Arith> = []

    for (const i in line.buttons) {
      const variable = ctx.Int.const(`x${i}`)

      // Buttons cannot be pressed negative number of times, so we need to tell our solver
      // to have variables always be greater than zero
      solver.add(variable.ge(0))
      variables.push(variable)
    }

    for (let i = 0; i < line.joltages.length; i++) {
      const condition = line.buttons.reduce((acc, button, y) => {
        // If button changes the index "i" of the joltage array then we need
        // to add it to the condition which will be in form
        // x1*a1 + x2*a2 + x3*a3 ... and so on
        // e.g. If button does not change the first joltage x1 is zero, so we don't have to add it here
        if (button.includes(i)) {
          return acc.add(variables[y])
        }

        return acc
      }, ctx.Int.val(0))

      solver.add(condition.eq(ctx.Int.val(line.joltages[i])))
    }

    // We want to find the lowest sum of the all variables
    const sum = variables.reduce((acc, variable) => {
      return acc.add(variable)
    }, ctx.Int.val(0))

    solver.minimize(sum)

    if ((await solver.check()) === 'sat') {
      const model = solver.model()

      return parseInt((model.eval(sum) as IntNum).toString())
    }

    throw new Error('WTF')
  }

  let sum = 0

  for (const line of data) {
    sum += await getLowestButtonCount(line)
  }

  return sum
}

const reader = (file: string): ReadonlyArray<InputLine> => {
  const regex = /\[([.#]+)] (\([\d,() ]+\)) {([\d+,]+)}/

  return readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .map(line => {
      const matches = line.match(regex)

      return {
        lights: matches[1].split('').map(item => item === '#'),
        buttons: matches[2].split(' ').map(buttonSet => {
          return buttonSet
            .replace('(', '')
            .replace(')', '')
            .split(',')
            .map(item => parseInt(item, 10))
        }),
        joltages: matches[3].split(',').map(item => parseInt(item, 10)),
      }
    })
}

await runExamples(2025, '10', reader, part1, part2)
await runSolution(2025, '10', reader, part1, part2)
