import { runAll } from '@magiczne/advent-of-code-ts-core/aoc'

runAll({
  command(year, dayDirectory) {
    return `yarn aoc ${year}/${dayDirectory}`
  },
  year: 2025,
  skippedBecauseTooLong: [],
  skippedBecauseManual: [],
})
