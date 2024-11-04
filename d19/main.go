package main

import (
	"aoc2015/util"
	"strings"

	mapset "github.com/deckarep/golang-set/v2"
)

type Instruction struct {
	From, To string
}

type TaskInput struct {
	Instructions []Instruction
	Molecule     string
}

func part1(data TaskInput) int {
	seenMolecules := mapset.NewSet[string]()

	for _, instruction := range data.Instructions {
		for _, foundIndex := range util.IndexAll(data.Molecule, instruction.From) {
			seenMolecules.Add(
				data.Molecule[:foundIndex] + instruction.To + data.Molecule[foundIndex+len(instruction.From):],
			)
		}
	}

	return seenMolecules.Cardinality()
}

func part2(data TaskInput) int {
	return -1
}

func main() {
	reader := func(name string) TaskInput {
		lines := util.ReadLines(name)

		return TaskInput{
			Instructions: util.ArrayMap(lines[:len(lines)-2], func(line string) Instruction {
				splitInstruction := strings.Split(line, " => ")

				return Instruction{
					From: splitInstruction[0],
					To:   splitInstruction[1],
				}
			}),
			Molecule: lines[len(lines)-1],
		}
	}

	util.TestRuns("19", reader, part1, part2)
	util.SolutionRuns("19", reader, part1, part2)
}
