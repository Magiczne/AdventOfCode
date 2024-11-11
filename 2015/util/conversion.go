package util

import (
	"strconv"
)

func HexStringToInt(value string) int {
	output, err := strconv.ParseInt(value, 16, 0)
	PanicOrProceed(err)

	return int(output)
}

func StringToInt(value string) int {
	output, err := strconv.Atoi(value)
	PanicOrProceed(err)

	return output
}
