package main

import (
	"aoc2015/util"
)

// Brute force is my best friend.
func part1(target int) int {
	for houseNumber := range target {
		giftCounter := 0

		for _, factor := range util.FactorsOf(houseNumber) {
			giftCounter += factor * 10
		}

		if giftCounter >= target {
			return houseNumber
		}
	}

	return -1
}

func part2(target int) int {
	for houseNumber := range target {
		giftCounter := 0

		for _, factor := range util.FactorsOf(houseNumber) {
			if houseNumber/factor <= 50 {
				giftCounter += factor * 11
			}
		}

		if giftCounter >= target {
			return houseNumber
		}
	}

	return -1
}

func main() {
	reader := func(name string) int {
		return util.StringToInt(util.ReadFile(name))
	}

	util.TestRuns("20", reader, part1, part2)
	util.SolutionRuns("20", reader, part1, part2)
}
