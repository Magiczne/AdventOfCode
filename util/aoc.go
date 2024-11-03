package util

import (
	"fmt"

	"github.com/fatih/color"
)

func SolutionPart1(result interface{}) {
	color.Green(fmt.Sprintf("Part 1: %v", result))
}

func SolutionPart2(result interface{}) {
	color.Blue(fmt.Sprintf("Part 2: %v", result))
}
