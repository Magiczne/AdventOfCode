package main

import (
	"aoc2015/util"
	"regexp"
	"strings"
)

var disallowedLettersRegex = regexp.MustCompile(`[iol]`)

func isPasswordValid(password string) bool {
	checkIncreasingStraightLetters := func() bool {
		for i := 0; i < len(password)-2; i++ {
			if password[i+1] == password[i]+1 && password[i+2] == password[i]+2 {
				return true
			}
		}

		return false
	}

	checkDisallowedLetters := func() bool {
		return !disallowedLettersRegex.MatchString(password)
	}

	pairsCount := 0
	checkPairs := func() bool {
		for _, pair := range util.DoubleLetters {
			pairsCount += strings.Count(password, pair)

			if pairsCount >= 2 {
				return true
			}
		}

		return false
	}

	return checkIncreasingStraightLetters() && checkDisallowedLetters() && checkPairs()
}

func incrementString(password string) string {
	characters := strings.Split(password, "")

	for i := len(characters) - 1; i >= 0; i-- {
		if characters[i] == "z" {
			characters[i] = "a"
		} else {
			characters[i] = string(rune(int(characters[i][0]) + 1))

			break
		}
	}

	return strings.Join(characters, "")
}

func incrementPassword(password string) string {
	output := password

	for !isPasswordValid(output) {
		output = incrementString(output)
	}

	return output
}

func part1(basePassword string) string {
	return incrementPassword(basePassword)
}

func part2(basePassword string) string {
	return incrementPassword(
		// Force expiration by creating invalid Santa password :P
		incrementString(
			incrementPassword(basePassword),
		),
	)
}

func main() {
	util.TestRuns("11", util.ReadFile, part1, part2)
	util.SolutionRuns("11", util.ReadFile, part1, part2)
}
