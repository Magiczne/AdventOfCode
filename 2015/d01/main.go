package main

import (
	"github.com/Magiczne/AdventOfCode/util"
)

func part1(data string) int {
	count := 0

	for _, char := range data {
		if char == '(' {
			count++
		} else {
			count--
		}
	}

	return count
}

func part2(data string) int {
	count := 0

	for index, char := range data {
		if char == '(' {
			count++
		} else {
			count--
		}

		if count < 0 {
			return index + 1
		}
	}

	return -1
}

func main() {
	util.TestRuns("01", util.ReadFile, part1, part2)
	util.SolutionRuns("01", util.ReadFile, part1, part2)
}
