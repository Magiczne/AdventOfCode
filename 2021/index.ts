import { rootDirectory } from '@magiczne/advent-of-code-ts-core/aoc/util'
import chalk from 'chalk'
import { execSync } from 'node:child_process'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'

const days = readdirSync(join(rootDirectory, '2021')).filter(file => file.match(/d[0-9]{2}/))
const skippedBecauseTooLong: ReadonlyArray<number> = []
const skippedBecauseManual: ReadonlyArray<number> = []

for (let i = 0; i < days.length; i++) {
  const day = days[i]
  const command = `yarn elixir 2021/${day}/main.ex`

  console.log(
    chalk.italic(chalk.white('====')),
    chalk.white(`Day ${(i + 1).toString().padStart(2, '0')}`),
    chalk.italic(chalk.white('====')),
  )

  if (skippedBecauseTooLong.includes(i + 1)) {
    console.log(chalk.magenta('Skipped - solution is slow'))
  } else if (skippedBecauseManual.includes(i + 1)) {
    console.log(chalk.magenta('Skipped - solution partially manual'))
  } else {
    execSync(command, {
      encoding: 'utf-8',
      stdio: 'inherit',
    })
  }

  console.log()
}
