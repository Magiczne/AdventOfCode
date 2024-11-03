package main

import (
	"aoc2015/util"
	"os/exec"
	"regexp"
	"strings"
)

func part1(data string) int {
	numberRegex := regexp.MustCompile(`(-?[\d]+)`)
	numbers := util.ArrayMap(
		numberRegex.FindAllStringSubmatch(data, -1),
		func(match []string) int {
			return util.StringToInt(match[1])
		},
	)

	return util.Sum(numbers)
}

func part2(data string) int {
	// Fuck it, just use language that can handle JSON...
	output, err := exec.Command("node", "./d12/main.mjs").Output()
	util.PanicOrProceed(err)

	return util.StringToInt(strings.TrimSpace(string(output)))
}

func main() {
	util.TestRuns("12", util.ReadFile, part1, part2)
	util.SolutionRuns("12", util.ReadFile, part1, part2)
}
