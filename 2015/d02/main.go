package main

import (
	"regexp"

	"github.com/Magiczne/AdventOfCode/util"
)

type Present struct {
	L int
	W int
	H int
}

func part1(data []Present) int {
	result := 0

	for _, present := range data {
		sideA := present.L * present.W
		sideB := present.W * present.H
		sideC := present.H * present.L

		result += (sideA+sideB+sideC)*2 + min(sideA, sideB, sideC)
	}

	return result
}

func part2(data []Present) int {
	result := 0

	for _, present := range data {
		perimeterSideA := (present.L + present.W) * 2
		perimeterSideB := (present.W + present.H) * 2
		perimeterSideC := (present.H + present.L) * 2

		result += min(perimeterSideA, perimeterSideB, perimeterSideC) + present.H*present.L*present.W
	}

	return result
}

func main() {
	regex := regexp.MustCompile(`^(\d+)x(\d+)x(\d+)$`)
	reader := func(file string) []Present {
		return util.ArrayMap(util.ReadLines(file), func(line string) Present {
			match := util.ArrayMap(regex.FindStringSubmatch(line), func(match string) int {
				return util.StringToInt(match)
			})

			return Present{match[1], match[2], match[3]}
		})
	}

	util.TestRuns("02", reader, part1, part2)
	util.SolutionRuns("02", reader, part1, part2)
}
