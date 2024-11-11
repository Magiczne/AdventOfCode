package main

import (
	"aoc2015/util"
	"sort"

	comb "github.com/mxschmitt/golang-combinations"
)

func partitionPackages(packages []int, targetWeight int) [][]int {
	for groupSize := 2; ; groupSize++ {
		// Brute force FTW again
		combinations := comb.Combinations(packages, groupSize)
		validCombinations := util.ArrayFilter(combinations, func(combination []int) bool {
			return util.Sum(combination) == targetWeight
		})

		if len(validCombinations) > 0 {
			return validCombinations
		}
	}
}

func part1(packages []int) int {
	weightSum := util.Sum(packages)
	groupWeight := weightSum / 3

	// Basically, we only care about first group which determines quantum entanglent...
	partitions := partitionPackages(packages, groupWeight)
	sort.Slice(partitions, func(i, j int) bool {
		return util.MultiplySlice(partitions[i]) < util.MultiplySlice(partitions[j])
	})

	return util.MultiplySlice(partitions[0])
}

func part2(packages []int) int {
	weightSum := util.Sum(packages)
	groupWeight := weightSum / 4

	// Basically, we only care about first group which determines quantum entanglent...
	partitions := partitionPackages(packages, groupWeight)
	sort.Slice(partitions, func(i, j int) bool {
		return util.MultiplySlice(partitions[i]) < util.MultiplySlice(partitions[j])
	})

	return util.MultiplySlice(partitions[0])
}

func main() {
	reader := func(name string) []int {
		return util.ArrayMap(util.ReadLines(name), util.StringToInt)
	}

	util.TestRuns("24", reader, part1, part2)
	util.SolutionRuns("24", reader, part1, part2)
}
