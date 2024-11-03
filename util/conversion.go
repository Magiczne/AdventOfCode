package util

import (
	"strconv"
)

func StringToInt(value string) int {
	output, err := strconv.Atoi(value)
	PanicOrProceed(err)

	return output
}
