import { runAll } from '@magiczne/advent-of-code-ts-core/aoc'

runAll({
  command(year, dayDirectory) {
    return `yarn dotnet ${year}/${dayDirectory}`
  },
  year: 2016,
  skippedBecauseTooLong: [5, 14],
  skippedBecauseManual: [],
})
