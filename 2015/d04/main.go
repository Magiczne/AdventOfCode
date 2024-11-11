package main

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"

	"github.com/Magiczne/AdventOfCode/util"
)

func part1(data string) int {
	for i := 1; ; i++ {
		key := fmt.Sprintf("%s%d", data, i)
		hash := md5.Sum([]byte(key))
		hashString := hex.EncodeToString(hash[:])

		if hashString[:5] == "00000" {
			return i
		}
	}
}

func part2(data string) int {
	for i := 1; ; i++ {
		key := fmt.Sprintf("%s%d", data, i)
		hash := md5.Sum([]byte(key))
		hashString := hex.EncodeToString(hash[:])

		if hashString[:6] == "000000" {
			return i
		}
	}
}

func main() {
	util.TestRuns("04", util.ReadFile, part1, part2)
	util.SolutionRuns("04", util.ReadFile, part1, part2)
}
