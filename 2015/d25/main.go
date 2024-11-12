package main

import (
	"regexp"

	"github.com/Magiczne/AdventOfCode/util"
)

// f(1, 1) = 20151125
// f(1, 2) = f(1, 1) * 252533 % 33554393
// f(2, 1) = f(1, 2) * 252533 % 33554393

// f(1) = 20151125
// f(2) = f(1) * 252533 % 33554393
// f(3) = f(2) * 252533 % 33554393
// f(100) = f(99) * 252533 % 33554393

func getCode(n int) int {
	if n == 1 {
		return 20151125
	}

	return getCode(n-1) * 252533 % 33554393
}

// Map column and row to the position in the sequence
func getSequencePosition(column int, row int) int {
	return ((row+column-2)*(row+column-1))/2 + column
}

func part1(data []int) int {
	row := data[0]
	column := data[1]
	sequencePosition := getSequencePosition(column, row)

	return getCode(sequencePosition)
}

func part2(data []int) int {
	return -1
}

func main() {
	lineRegexp := regexp.MustCompile(`([0-9]+)[a-z, ]+(\d+)`)
	reader := func(name string) []int {
		file := util.ReadFile(name)
		matches := lineRegexp.FindStringSubmatch(file)

		return []int{
			util.StringToInt(matches[1]),
			util.StringToInt(matches[2]),
		}
	}

	util.TestRuns("25", reader, part1, part2)
	util.SolutionRuns("25", reader, part1, part2)
}
