package main

import (
	"aoc2015/util"
)

func part1(data []string) int {
	rawLength := util.Sum(
		util.ArrayMap(data, func(line string) int {
			return len(line)
		}),
	)

	evaluatedLength := util.Sum(
		util.ArrayMap(data, func(line string) int {
			count := 0

			for i := 1; i < len(line)-1; i++ {
				if line[i] == '\\' {
					nextRune := line[i+1]

					if nextRune == '\\' || nextRune == '"' {
						i++
					} else if nextRune == 'x' {
						i += 3
					}
				}

				count++
			}

			return count
		}),
	)

	return rawLength - evaluatedLength
}

func part2(data []string) int {
	rawLength := util.Sum(
		util.ArrayMap(data, func(line string) int {
			return len(line)
		}),
	)

	encodedLength := util.Sum(
		util.ArrayMap(data, func(line string) int {
			// Counting outer quotes
			count := 2

			for i := 0; i < len(line); i++ {
				if line[i] == '\\' || line[i] == '"' {
					count += 2
				} else {
					count += 1
				}
			}

			return count
		}),
	)

	return encodedLength - rawLength
}

func main() {
	util.TestRuns("08", util.ReadLines, part1, part2)
	util.SolutionRuns("08", util.ReadLines, part1, part2)
}
