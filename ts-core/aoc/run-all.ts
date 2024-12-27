import { execSync } from 'node:child_process'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'

import chalk from 'chalk'

import { rootDirectory } from './util'

interface RunAllSettings {
  year: number
  skippedBecauseTooLong: ReadonlyArray<number>
  skippedBecauseManual: ReadonlyArray<number>
}

const runAll = ({ year, skippedBecauseManual, skippedBecauseTooLong }: RunAllSettings): void => {
  const days = readdirSync(join(rootDirectory, year.toString())).filter(file => file.match(/d[0-9]{2}/))

  for (let i = 0; i < days.length; i++) {
    const directory = days[i]
    const day = parseInt(directory.substring(1), 10)
    const command = `yarn aoc ${year}/${directory}`

    console.log(
      chalk.italic(chalk.white('====')),
      chalk.white(`Day ${day.toString().padStart(2, '0')}`),
      chalk.italic(chalk.white('====')),
    )

    if (skippedBecauseTooLong.includes(day)) {
      console.log(chalk.magenta('Skipped - solution is slow'))
    } else if (skippedBecauseManual.includes(day)) {
      console.log(chalk.magenta('Skipped - solution partially manual'))
    } else {
      execSync(command, {
        encoding: 'utf-8',
        stdio: 'inherit',
      })
    }

    console.log()
  }
}

export { runAll }
