package main

import (
	"strings"

	"github.com/Magiczne/AdventOfCode/util"
)

func getEnabledNeighbors(neighbors []string) int {
	return len(
		util.ArrayFilter(neighbors, func(item string) bool {
			return item == "#"
		}),
	)
}

func getEnabledLights(lights [][]string) int {
	enabledLights := 0
	for _, row := range lights {
		for _, cell := range row {
			if cell == "#" {
				enabledLights++
			}
		}
	}

	return enabledLights
}

func part1(lights [][]string) int {
	steps := 100
	lightsState := lights
	nextLightsState := util.CloneMatrix(lights)

	for i := range nextLightsState {
		nextLightsState[i] = make([]string, len(lightsState[0]))
	}

	for range steps {
		for x := 0; x < len(lights); x++ {
			for y := 0; y < len(lights[0]); y++ {
				neighbors := util.GetNeighbors(x, y, lightsState)
				enabledNeighbors := getEnabledNeighbors(neighbors)

				if lightsState[x][y] == "#" {
					if enabledNeighbors == 2 || enabledNeighbors == 3 {
						nextLightsState[x][y] = "#"
					} else {
						nextLightsState[x][y] = "."
					}
				} else {
					if enabledNeighbors == 3 {
						nextLightsState[x][y] = "#"
					} else {
						nextLightsState[x][y] = "."
					}
				}
			}
		}

		lightsState = util.CloneMatrix(nextLightsState)
	}

	return getEnabledLights(lightsState)
}

func part2(lights [][]string) int {
	steps := 100

	lightsState := lights
	nextLightsState := util.CloneMatrix(lights)

	// Corner lights always on
	lightsState[0][0] = "#"
	lightsState[0][len(lightsState[0])-1] = "#"
	lightsState[len(lightsState)-1][0] = "#"
	lightsState[len(lightsState)-1][len(lightsState[0])-1] = "#"

	for i := range nextLightsState {
		nextLightsState[i] = make([]string, len(lightsState[0]))
	}

	for range steps {
		for x := 0; x < len(lights); x++ {
			for y := 0; y < len(lights[0]); y++ {
				if (x == 0 && y == 0) || (x == 0 && y == len(lightsState[0])-1) || (x == len(lightsState)-1 && y == 0) || (x == len(lightsState)-1 && y == len(lightsState[0])-1) {
					nextLightsState[x][y] = "#"

					continue
				}

				neighbors := util.GetNeighbors(x, y, lightsState)
				enabledNeighbors := getEnabledNeighbors(neighbors)

				if lightsState[x][y] == "#" {
					if enabledNeighbors == 2 || enabledNeighbors == 3 {
						nextLightsState[x][y] = "#"
					} else {
						nextLightsState[x][y] = "."
					}
				} else {
					if enabledNeighbors == 3 {
						nextLightsState[x][y] = "#"
					} else {
						nextLightsState[x][y] = "."
					}
				}
			}
		}

		lightsState = util.CloneMatrix(nextLightsState)
	}

	// 4 lights always on, we only fixed them at start of the algo
	return getEnabledLights(lightsState)
}

func main() {
	reader := func(name string) [][]string {
		lines := util.ReadLines(name)

		return util.ArrayMap(lines, func(line string) []string {
			return strings.Split(line, "")
		})
	}

	util.TestRuns("18", reader, part1, part2)
	util.SolutionRuns("18", reader, part1, part2)
}
