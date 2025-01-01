import { runAll } from '@magiczne/advent-of-code-ts-core/aoc'

runAll({
  command(year, dayDirectory) {
    return `py ${year}/${dayDirectory}/main.py`
  },
  year: 2017,
  skippedBecauseTooLong: [15],
  skippedBecauseManual: [],
})
