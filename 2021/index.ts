import { runAll } from '@magiczne/advent-of-code-ts-core/aoc'

runAll({
  command(year, dayDirectory) {
    return `yarn elixir ${year}/${dayDirectory}/main.ex`
  },
  year: 2021,
  skippedBecauseTooLong: [],
  skippedBecauseManual: [],
})
