package main

import (
	"regexp"
	"strings"

	"github.com/Magiczne/AdventOfCode/util"

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
	// available substitutions:
	// x => a b
	// x => a Rn b Ar
	// x => a Rn b Y c Ar
	// x => a Rn b Y c Y d Ar

	molecule := strings.Join(data.Molecule, "")

	// Ar and Rn always are constant and appears at most one time in the substitutions,
	// so we need one substitution for each occurence of Ar and Rn in final molecule
	constantsCount := strings.Count(molecule, "Ar") + strings.Count(molecule, "Rn")

	// Y always comes with some value before, so we multiply by two, because we need to
	// get Y as well as the glued part to the Y
	variablesCount := 2 * strings.Count(molecule, "Y")

	// Sub 1 cause we are starting from "e", not from a blank canvas
	return len(data.Molecule) - constantsCount - variablesCount - 1
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
