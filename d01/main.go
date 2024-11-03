package main

import (
	"aoc2015/util"
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
	file := util.ReadFile("./d01/input.txt")

	util.SolutionPart1(part1(file))
	util.SolutionPart2(part2(file))
}
