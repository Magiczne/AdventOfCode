package main

import (
	"regexp"

	d23 "github.com/Magiczne/AdventOfCode/d23/cpu"

	"github.com/Magiczne/AdventOfCode/util"
)

func part1(instructions []d23.Instruction) int {
	cpu := d23.NewProcessor()
	cpu.Run(instructions)

	return cpu.B()
}

func part2(instructions []d23.Instruction) int {
	cpu := d23.NewProcessor()
	cpu.SetA(1)
	cpu.Run(instructions)

	return cpu.B()
}

func main() {
	instructionRegex := regexp.MustCompile(`([a-z]{3}) ([a-z0-9-+]+)(, )?([0-9-+]+)?`)
	reader := func(name string) []d23.Instruction {
		lines := util.ReadLines(name)

		return util.ArrayMap(lines, func(line string) d23.Instruction {
			matches := instructionRegex.FindStringSubmatch(line)

			return d23.Instruction{
				Name:     matches[1],
				Operand1: matches[2],
				Operand2: matches[4],
			}
		})
	}

	util.TestRuns("23", reader, part1, part2)
	util.SolutionRuns("23", reader, part1, part2)
}
