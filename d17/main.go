package main

import (
	"aoc2015/util"
	"slices"

	comb "github.com/mxschmitt/golang-combinations"
)

func part1(containers []int) int {
	eggnogAmount := 150
	containerCombinations := comb.All(containers)

	count := 0
	for _, combination := range containerCombinations {
		if util.Sum(combination) == eggnogAmount {
			count++
		}
	}

	return count
}

func part2(containers []int) int {
	eggnogAmount := 150
	containerCombinations := comb.All(containers)

	validCombinations := [][]int{}
	for _, combination := range containerCombinations {
		if util.Sum(combination) == eggnogAmount {
			validCombinations = append(validCombinations, combination)
		}
	}

	combinationLengths := util.ArrayMap(validCombinations, func(combination []int) int {
		return len(combination)
	})
	minCombinationLength := slices.Min(combinationLengths)

	shortCombinations := util.ArrayFilter(validCombinations, func(combination []int) bool {
		return len(combination) == minCombinationLength
	})

	return len(shortCombinations)
}

func main() {
	reader := func(name string) []int {
		lines := util.ReadLines(name)

		return util.ArrayMap(lines, func(line string) int {
			return util.StringToInt(line)
		})
	}

	util.TestRuns("17", reader, part1, part2)
	util.SolutionRuns("17", reader, part1, part2)
}
