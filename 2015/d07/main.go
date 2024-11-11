package main

import (
	"fmt"
	"regexp"
	"strings"

	"github.com/Magiczne/AdventOfCode/util"
)

func part1(instructions []string) uint16 {
	numericRegexp := regexp.MustCompile(`^\d+$`)
	andRegexp := regexp.MustCompile(`^(.+) AND (.+)$`)
	orRegexp := regexp.MustCompile(`^(.+) OR (.+)$`)
	lshiftRegexp := regexp.MustCompile(`^(.+) LSHIFT (.+)$`)
	rshiftRegexp := regexp.MustCompile(`^(.+) RSHIFT (.+)$`)
	notRegexp := regexp.MustCompile(`^NOT (.+)$`)

	targetWire := "a"
	wires := map[string]string{}

	for _, instruction := range instructions {
		splitString := strings.Split(instruction, " -> ")
		command := splitString[0]
		signal := splitString[1]

		wires[signal] = command
	}

	var findValue func(wire string) uint16
	findValue = func(wire string) uint16 {
		if numericRegexp.MatchString(wire) {
			return uint16(util.StringToInt(wire))
		}

		value := wires[wire]
		var output uint16

		if numericRegexp.MatchString(value) {
			output = uint16(util.StringToInt(value))
		} else if strings.Contains(value, "AND") {
			match := andRegexp.FindStringSubmatch(value)
			output = findValue(match[1]) & findValue(match[2])
		} else if strings.Contains(value, "OR") {
			match := orRegexp.FindStringSubmatch(value)
			output = findValue(match[1]) | findValue(match[2])
		} else if strings.Contains(value, "LSHIFT") {
			match := lshiftRegexp.FindStringSubmatch(value)
			output = findValue(match[1]) << util.StringToInt(match[2])
		} else if strings.Contains(value, "RSHIFT") {
			match := rshiftRegexp.FindStringSubmatch(value)
			output = findValue(match[1]) >> util.StringToInt(match[2])
		} else if strings.Contains(value, "NOT") {
			match := notRegexp.FindStringSubmatch(value)
			output = ^findValue(match[1])
		} else {
			output = findValue(value)
		}

		wires[wire] = fmt.Sprint(output)

		return output
	}

	return findValue(targetWire)
}

func part2(instructions []string) uint16 {
	numericRegexp := regexp.MustCompile(`^\d+$`)
	andRegexp := regexp.MustCompile(`^(.+) AND (.+)$`)
	orRegexp := regexp.MustCompile(`^(.+) OR (.+)$`)
	lshiftRegexp := regexp.MustCompile(`^(.+) LSHIFT (.+)$`)
	rshiftRegexp := regexp.MustCompile(`^(.+) RSHIFT (.+)$`)
	notRegexp := regexp.MustCompile(`^NOT (.+)$`)

	targetWire := "a"
	wires := map[string]string{}

	for _, instruction := range instructions {
		splitString := strings.Split(instruction, " -> ")
		command := splitString[0]
		signal := splitString[1]

		wires[signal] = command
	}

	var findValue func(wire string) uint16
	findValue = func(wire string) uint16 {
		if numericRegexp.MatchString(wire) {
			return uint16(util.StringToInt(wire))
		}

		value := wires[wire]
		var output uint16

		if numericRegexp.MatchString(value) {
			output = uint16(util.StringToInt(value))
		} else if strings.Contains(value, "AND") {
			match := andRegexp.FindStringSubmatch(value)
			output = findValue(match[1]) & findValue(match[2])
		} else if strings.Contains(value, "OR") {
			match := orRegexp.FindStringSubmatch(value)
			output = findValue(match[1]) | findValue(match[2])
		} else if strings.Contains(value, "LSHIFT") {
			match := lshiftRegexp.FindStringSubmatch(value)
			output = findValue(match[1]) << util.StringToInt(match[2])
		} else if strings.Contains(value, "RSHIFT") {
			match := rshiftRegexp.FindStringSubmatch(value)
			output = findValue(match[1]) >> util.StringToInt(match[2])
		} else if strings.Contains(value, "NOT") {
			match := notRegexp.FindStringSubmatch(value)
			output = ^findValue(match[1])
		} else {
			output = findValue(value)
		}

		wires[wire] = fmt.Sprint(output)

		return output
	}

	valueForA := findValue("a")
	for k := range wires {
		delete(wires, k)
	}

	for _, instruction := range instructions {
		splitString := strings.Split(instruction, " -> ")
		command := splitString[0]
		signal := splitString[1]

		wires[signal] = command
	}

	wires["b"] = fmt.Sprint(valueForA)

	return findValue(targetWire)
}

func main() {
	util.TestRuns("07", util.ReadLines, part1, part2)
	util.SolutionRuns("07", util.ReadLines, part1, part2)
}
