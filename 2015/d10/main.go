package main

import (
	"fmt"

	"github.com/Magiczne/AdventOfCode/util"
)

func lookAndSay(data string) string {
	output := ""

	for i := 0; i < len(data); {
		// Look-and-say sequence can have maximum of 3 copies at once, look wiki and OEIS
		value := rune(data[i])

		var count int
		if i+2 < len(data) && rune(data[i+1]) == value && rune(data[i+2]) == value {
			count = 3
		} else if i+1 < len(data) && rune(data[i+1]) == value {
			count = 2
		} else {
			count = 1
		}

		i += count

		output += fmt.Sprintf("%d%s", count, string(value))
	}

	return output
}

func part1(data string) int {
	output := data

	// 5665ms
	for range 40 {
		output = lookAndSay(output)
	}

	return len(output)
}

func part2(data string) int {
	output := data

	// 614619ms
	for range 50 {
		output = lookAndSay(output)
	}

	return len(output)
}

func main() {
	util.TestRuns("10", util.ReadFile, part1, part2)
	util.SolutionRuns("10", util.ReadFile, part1, part2)
}
