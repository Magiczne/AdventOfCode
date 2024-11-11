package main

import (
	"fmt"
	"regexp"
	"strings"

	"github.com/Magiczne/AdventOfCode/util"
)

func part1(data []string) int {
	disallowedPattern := regexp.MustCompile("ab|cd|pq|xy")
	niceStringsCount := 0

ItemLoop:
	for _, item := range data {
		if disallowedPattern.MatchString(item) {
			continue ItemLoop
		}

		// Go is stupid and does not support backreferences in regex.
		// In any normal language it would be as simple as matching against (\w)\1
		containsDoubleLetter := false
		for _, disallowedString := range util.DoubleLetters {
			if strings.Contains(item, disallowedString) {
				containsDoubleLetter = true
				break
			}
		}

		if !containsDoubleLetter {
			continue ItemLoop
		}

		vovelsCount := strings.Count(item, "a") + strings.Count(item, "e") + strings.Count(item, "i") + strings.Count(item, "o") + strings.Count(item, "u")

		if vovelsCount < 3 {
			continue ItemLoop
		}

		niceStringsCount += 1
	}

	return niceStringsCount
}

func part2(data []string) int {
	niceStringsCount := 0
	alphabetCombinations := util.ArrayMap(util.Doubles(util.AlphabetArray[:]), func(combination []string) string {
		return fmt.Sprintf("%s%s", combination[0], combination[1])
	})

	tripletRegexps := util.ArrayMap(util.AlphabetArray[:], func(letter string) *regexp.Regexp {
		return regexp.MustCompile(fmt.Sprintf("%s.%s", letter, letter))
	})

ItemLoop:
	for _, item := range data {
		hasDoubleCombination := false
		for _, combination := range alphabetCombinations {
			// 2 does not mean, that it cant be a third one...
			if strings.Count(item, combination) >= 2 {
				hasDoubleCombination = true
				break
			}
		}

		if !hasDoubleCombination {
			continue ItemLoop
		}

		hasTriplet := false
		for _, tripletRegexp := range tripletRegexps {
			if tripletRegexp.MatchString(item) {

				hasTriplet = true
				break
			}
		}

		if !hasTriplet {
			continue ItemLoop
		}

		niceStringsCount += 1
	}

	return niceStringsCount
}

func main() {
	util.TestRuns("05", util.ReadLines, part1, part2)
	util.SolutionRuns("05", util.ReadLines, part1, part2)
}
