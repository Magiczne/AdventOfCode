package main

import (
	"regexp"
	"slices"

	"github.com/Magiczne/AdventOfCode/util"
)

type Reindeer struct {
	Name        string
	Speed       int
	RunningTime int
	RestTime    int
}

func part1(reindeers []Reindeer) int {
	time := 2503

	traveled := util.ArrayMap(reindeers, func(reindeer Reindeer) int {
		cycleTime := reindeer.RunningTime + reindeer.RestTime
		cycles := time / cycleTime

		remainingSeconds := time % cycleTime
		remainingFlightTime := min(reindeer.RunningTime, remainingSeconds)

		return cycles*reindeer.RunningTime*reindeer.Speed + remainingFlightTime*reindeer.Speed
	})

	return slices.Max(traveled)
}

func part2(reindeers []Reindeer) int {
	return -1
}

func main() {
	lineRegexp := regexp.MustCompile(`(\w+)[a-z ]+(\d+)[a-z \/]+(\d+)[a-z ,]+(\d+)`)
	reader := func(name string) []Reindeer {
		lines := util.ReadLines(name)

		return util.ArrayMap(lines, func(line string) Reindeer {
			match := lineRegexp.FindStringSubmatch(line)

			return Reindeer{
				Name:        match[1],
				Speed:       util.StringToInt(match[2]),
				RunningTime: util.StringToInt(match[3]),
				RestTime:    util.StringToInt(match[4]),
			}
		})
	}

	util.TestRuns("14", reader, part1, part2)
	util.SolutionRuns("14", reader, part1, part2)
}
