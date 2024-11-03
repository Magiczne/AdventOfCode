package main

import (
	"aoc2015/util"
)

func part1(data string) {
	count := 0

	for _, char := range data {
		if char == '(' {
			count++
		} else {
			count--
		}
	}

	util.SolutionPart1(count)
}

func part2(data string) {
	count := 0

	for index, char := range data {
		if char == '(' {
			count++
		} else {
			count--
		}

		if count < 0 {
			util.SolutionPart2(index + 1)

			return
		}
	}
}

func main() {
	file := util.ReadFile("./d01/input.txt")

	part1(file)
	part2(file)
}
