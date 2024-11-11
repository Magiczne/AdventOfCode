package main

import (
	"maps"
	"regexp"
	"strings"

	"github.com/Magiczne/AdventOfCode/util"
)

type Aunt = map[string]int

func part1(aunts []Aunt) int {
	targetAunt := Aunt{
		"children":    3,
		"cats":        7,
		"samoyeds":    2,
		"pomeranians": 3,
		"akitas":      0,
		"vizslas":     0,
		"goldfish":    5,
		"trees":       3,
		"cars":        2,
		"perfumes":    1,
	}

	for index, aunt := range aunts {
		keysMatching := 0

		for key := range maps.Keys(aunt) {
			if aunt[key] == targetAunt[key] {
				keysMatching++
			}
		}

		if keysMatching == len(aunt) {
			return index + 1
		}
	}

	return -1
}

func part2(aunts []Aunt) int {
	targetAunt := Aunt{
		"children":    3,
		"cats":        7,
		"samoyeds":    2,
		"pomeranians": 3,
		"akitas":      0,
		"vizslas":     0,
		"goldfish":    5,
		"trees":       3,
		"cars":        2,
		"perfumes":    1,
	}

	for index, aunt := range aunts {
		keysMatching := 0

		for key := range maps.Keys(aunt) {
			shouldBeGreaterThan := key == "cats" || key == "trees"
			shouldBeLowerThan := key == "pomeranians" || key == "goldfish"

			if shouldBeGreaterThan && aunt[key] > targetAunt[key] {
				keysMatching++
			} else if shouldBeLowerThan && aunt[key] < targetAunt[key] {
				keysMatching++
			} else if targetAunt[key] == aunt[key] {
				keysMatching++
			}
		}

		if keysMatching == len(aunt) {
			return index + 1
		}
	}

	return -1
}

func main() {
	lineRegex := regexp.MustCompile(`Sue \d+: (.+)`)
	reader := func(name string) []Aunt {
		lines := util.ReadLines(name)

		return util.ArrayMap(lines, func(line string) Aunt {
			aunt := Aunt{}
			matches := lineRegex.FindStringSubmatch(line)
			compounds := strings.Split(matches[1], ", ")

			for _, compound := range compounds {
				compoundData := strings.Split(compound, ": ")

				aunt[compoundData[0]] = util.StringToInt(compoundData[1])
			}

			return aunt
		})
	}

	util.TestRuns("16", reader, part1, part2)
	util.SolutionRuns("16", reader, part1, part2)
}
