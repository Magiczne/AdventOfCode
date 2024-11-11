package main

import (
	"regexp"

	"github.com/Magiczne/AdventOfCode/util"
)

type Instruction struct {
	Type   string
	X1, Y1 int
	X2, Y2 int
}

func part1(instructions []Instruction) int {
	lights := [1000][1000]bool{}

	for _, instruction := range instructions {
		for x := instruction.X1; x <= instruction.X2; x++ {
			for y := instruction.Y1; y <= instruction.Y2; y++ {
				switch instruction.Type {
				case "toggle":
					lights[x][y] = !lights[x][y]

				case "turn off":
					lights[x][y] = false

				case "turn on":
					lights[x][y] = true

				default:
					panic(instruction.Type)
				}
			}
		}
	}

	litCount := 0
	for _, row := range lights {
		for _, light := range row {
			if light {
				litCount++
			}
		}
	}

	return litCount
}

func part2(instructions []Instruction) int {
	lights := [1000][1000]int{}

	for _, instruction := range instructions {
		for x := instruction.X1; x <= instruction.X2; x++ {
			for y := instruction.Y1; y <= instruction.Y2; y++ {
				switch instruction.Type {
				case "toggle":
					lights[x][y] += 2

				case "turn off":
					lights[x][y] = max(0, lights[x][y]-1)

				case "turn on":
					lights[x][y] += 1

				default:
					panic(instruction.Type)
				}
			}
		}
	}

	brightness := 0
	for _, row := range lights {
		for _, light := range row {
			brightness += light
		}
	}

	return int(brightness)
}

func main() {
	regex := regexp.MustCompile(`(turn off|turn on|toggle) (\d+),(\d+) through (\d+),(\d+)`)
	reader := func(file string) []Instruction {
		return util.ArrayMap(util.ReadLines(file), func(line string) Instruction {
			match := regex.FindStringSubmatch(line)
			coords := util.ArrayMap(match[2:], func(match string) int {
				return util.StringToInt(match)
			})

			return Instruction{
				Type: match[1],
				X1:   coords[0],
				Y1:   coords[1],
				X2:   coords[2],
				Y2:   coords[3],
			}
		})
	}

	util.TestRuns("06", reader, part1, part2)
	util.SolutionRuns("06", reader, part1, part2)
}
