package main

import (
	"regexp"
	"slices"

	"github.com/Magiczne/AdventOfCode/util"
)

type Ingredient struct {
	Name       string
	Capacity   int
	Durability int
	Flavor     int
	Texture    int
	Calories   int
}

func part1(ingredients []Ingredient) int {
	ingredientsCount := len(ingredients)

	combinations := util.CombinationsWithSum(ingredientsCount, 100)
	sums := util.ArrayMap(combinations, func(combination []int) int {
		capacity := 0
		durability := 0
		flavor := 0
		texture := 0

		for i := 0; i < ingredientsCount; i++ {
			capacity += combination[i] * ingredients[i].Capacity
			durability += combination[i] * ingredients[i].Durability
			flavor += combination[i] * ingredients[i].Flavor
			texture += combination[i] * ingredients[i].Texture
		}

		if capacity < 0 {
			capacity = 0
		}

		if durability < 0 {
			durability = 0
		}

		if flavor < 0 {
			flavor = 0
		}

		if texture < 0 {
			texture = 0
		}

		return capacity * durability * flavor * texture
	})

	return slices.Max(sums)
}

func part2(ingredients []Ingredient) int {
	ingredientsCount := len(ingredients)

	combinations := util.CombinationsWithSum(ingredientsCount, 100)
	sums := util.ArrayMap(combinations, func(combination []int) int {
		capacity := 0
		durability := 0
		flavor := 0
		texture := 0
		calories := 0

		for i := 0; i < ingredientsCount; i++ {
			capacity += combination[i] * ingredients[i].Capacity
			durability += combination[i] * ingredients[i].Durability
			flavor += combination[i] * ingredients[i].Flavor
			texture += combination[i] * ingredients[i].Texture
			calories += combination[i] * ingredients[i].Calories
		}

		if capacity < 0 {
			capacity = 0
		}

		if durability < 0 {
			durability = 0
		}

		if flavor < 0 {
			flavor = 0
		}

		if texture < 0 {
			texture = 0
		}

		if calories != 500 {
			return 0
		}

		return capacity * durability * flavor * texture
	})

	return slices.Max(sums)
}

// Lol, it's basically a SAT solver
func main() {
	lineRegexp := regexp.MustCompile(`^(\w+): \w+ ([0-9-]+), \w+ ([0-9-]+), \w+ ([0-9-]+), \w+ ([0-9-]+), \w+ ([0-9-]+)$`)
	reader := func(name string) []Ingredient {
		lines := util.ReadLines(name)

		return util.ArrayMap(lines, func(line string) Ingredient {
			match := lineRegexp.FindStringSubmatch(line)

			return Ingredient{
				Name:       match[1],
				Capacity:   util.StringToInt(match[2]),
				Durability: util.StringToInt(match[3]),
				Flavor:     util.StringToInt(match[4]),
				Texture:    util.StringToInt(match[5]),
				Calories:   util.StringToInt(match[6]),
			}
		})
	}

	util.TestRuns("15", reader, part1, part2)
	util.SolutionRuns("15", reader, part1, part2)
}
