package util

import (
	"fmt"

	"github.com/fatih/color"
)

func TestRun1(result interface{}) {
	color.Yellow(fmt.Sprintf("Test run part 1: %v", result))
}

func TestRun2(result interface{}) {
	color.Red(fmt.Sprintf("Test run part 2: %v", result))
}

func SolutionPart1(result interface{}) {
	color.Green(fmt.Sprintf("Part 1: %v", result))
}

func SolutionPart2(result interface{}) {
	color.Blue(fmt.Sprintf("Part 2: %v", result))
}
