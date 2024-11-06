package main

import (
	"aoc2015/util"
	"regexp"
	"strings"

	mapset "github.com/deckarep/golang-set/v2"
)

type Instruction struct {
	From, To string
}

type TaskInput struct {
	Mappings map[string][]string
	Molecule []string
}

func part1(data TaskInput) int {
	seenMolecules := mapset.NewSet[string]()

	for moleculePartIndex, moleculePart := range data.Molecule {
		if mappings, ok := data.Mappings[moleculePart]; ok {
			for _, mapping := range mappings {
				data.Molecule[moleculePartIndex] = mapping

				seenMolecules.Add(strings.Join(data.Molecule, ""))
			}
		}

		// undo manipulation
		data.Molecule[moleculePartIndex] = moleculePart
	}

	return seenMolecules.Cardinality()
}

func part2(data TaskInput) int {
	return -1
}

func main() {
	reader := func(name string) TaskInput {
		regex := regexp.MustCompile(`(?m)([A-Z][a-z]*)`)
		lines := util.ReadLines(name)
		mappings := map[string][]string{}

		for _, line := range lines[:len(lines)-2] {
			splitMapping := strings.Split(line, " => ")

			mappings[splitMapping[0]] = append(mappings[splitMapping[0]], splitMapping[1])
		}

		return TaskInput{
			Mappings: mappings,
			Molecule: regex.FindAllString(lines[len(lines)-1], -1),
		}
	}

	util.TestRuns("19", reader, part1, part2)
	util.SolutionRuns("19", reader, part1, part2)
}
