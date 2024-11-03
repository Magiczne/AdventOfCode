package main

import (
	"aoc2015/util"
	"regexp"
	"strconv"
)

type Present struct {
	L int
	W int
	H int
}

func part1(data []Present) {
	result := 0

	for _, present := range data {
		sideA := present.L * present.W
		sideB := present.W * present.H
		sideC := present.H * present.L

		result += (sideA+sideB+sideC)*2 + min(sideA, sideB, sideC)
	}

	util.SolutionPart1(result)
}

func part2(data []Present) {
	result := 0

	for _, present := range data {
		perimeterSideA := (present.L + present.W) * 2
		perimeterSideB := (present.W + present.H) * 2
		perimeterSideC := (present.H + present.L) * 2

		result += min(perimeterSideA, perimeterSideB, perimeterSideC) + present.H*present.L*present.W
	}

	util.SolutionPart2(result)
}

func main() {
	regex := regexp.MustCompile(`^(\d+)x(\d+)x(\d+)$`)
	lines := util.ReadLines("./d02/input.txt")
	presents := util.ArrayMap(lines, func(line string) Present {
		match := util.ArrayMap(regex.FindStringSubmatch(line), func(match string) int {
			value, _ := strconv.Atoi(match)

			return value
		})

		return Present{match[1], match[2], match[3]}
	})

	part1(presents)
	part2(presents)
}
