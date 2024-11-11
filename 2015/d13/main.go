package main

import (
	"maps"
	"regexp"
	"slices"

	"github.com/Magiczne/AdventOfCode/util"
)

func calculateMaxHappiness(data map[string]map[string]int) int {
	people := slices.Collect(maps.Keys(data))
	permutations := util.Permutations(people)

	happiness := util.ArrayMap(permutations, func(permutation []string) int {
		total := 0

		for index, person := range permutation {
			indexLeft, indexRight := util.NeighborIndexes(index, len(permutation))
			neighborLeft := permutation[indexLeft]
			neighborRight := permutation[indexRight]
			leftHappiness := data[person][neighborLeft]
			rightHappines := data[person][neighborRight]

			total += leftHappiness + rightHappines
		}

		return total
	})

	return slices.Max(happiness)
}

func part1(data map[string]map[string]int) int {
	return calculateMaxHappiness(data)
}

func part2(data map[string]map[string]int) int {
	people := slices.Collect(maps.Keys(data))
	data["Me"] = map[string]int{}

	for _, person := range people {
		data["Me"][person] = 0
	}

	return calculateMaxHappiness(data)
}

func main() {
	lineRegex := regexp.MustCompile(`^([a-zA-Z]+) [a-zA-Z ]+(gain|lose) (\d+) [a-z ]+(\w+).$`)
	reader := func(name string) map[string]map[string]int {
		lines := util.ReadLines(name)
		mappings := map[string]map[string]int{}

		for _, line := range lines {
			match := lineRegex.FindStringSubmatch(line)

			var value int
			if match[2] == "gain" {
				value = util.StringToInt(match[3])
			} else {
				value = util.StringToInt(match[3]) * -1
			}

			person := match[1]
			neighbor := match[4]

			if _, ok := mappings[person]; !ok {
				mappings[person] = map[string]int{}
			}

			mappings[person][neighbor] = value
		}

		return mappings
	}

	util.TestRuns("13", reader, part1, part2)
	util.SolutionRuns("13", reader, part1, part2)
}
