package util

import (
	"fmt"
	"os"
	"time"

	"github.com/fatih/color"
)

func testRun1(result interface{}, testFileName string, durationInMs int64) {
	color.Yellow(fmt.Sprintf("[TST] (%s)\t\tPart 1: %v\t\t%dms", testFileName, result, durationInMs))
}

func testRun2(result interface{}, testFileName string, durationInMs int64) {
	color.Red(fmt.Sprintf("[TST] (%s)\t\tPart 2: %v\t\t%dms", testFileName, result, durationInMs))
}

func solutionPart1(result interface{}, durationInMs int64) {
	color.Green(fmt.Sprintf("[SLN]\t\t\tPart 1: %v\t\t%dms", result, durationInMs))
}

func solutionPart2(result interface{}, durationInMs int64) {
	color.Blue(fmt.Sprintf("[SLN]\t\t\tPart 2: %v\t\t%dms", result, durationInMs))
}

func TestRuns[TInput, TResult interface{}](
	day string,
	reader func(file string) TInput,
	part1 func(data TInput) TResult,
	part2 func(data TInput) TResult,
) {
	path := fmt.Sprintf("./d%s/test-runs", day)

	if _, err := os.Stat(path); err == nil {
		testRuns, err := os.ReadDir(path)
		PanicOrProceed(err)

		for _, v := range testRuns {
			testData := reader(fmt.Sprintf("%s/%s", path, v.Name()))

			start := time.Now()
			valuePart1 := part1(testData)
			duration1 := time.Since(start)

			start = time.Now()
			valuePart2 := part2(testData)
			duration2 := time.Since(start)

			testRun1(valuePart1, v.Name(), duration1.Milliseconds())
			testRun2(valuePart2, v.Name(), duration2.Milliseconds())
		}
	}
}

func SolutionRuns[TInput, TResult interface{}](
	day string,
	reader func(file string) TInput,
	part1 func(data TInput) TResult,
	part2 func(data TInput) TResult,
) {
	path := fmt.Sprintf("./d%s/input.txt", day)
	data := reader(path)

	start := time.Now()
	valuePart1 := part1(data)
	duration1 := time.Since(start)

	start = time.Now()
	valuePart2 := part2(data)
	duration2 := time.Since(start)

	solutionPart1(valuePart1, duration1.Milliseconds())
	solutionPart2(valuePart2, duration2.Milliseconds())
}
