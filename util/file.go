package util

import (
	"os"
	"path/filepath"
	"strings"
)

func ReadFile(name string) string {
	absPath, err := filepath.Abs(name)
	PanicOrProceed(err)

	data, err := os.ReadFile(absPath)
	PanicOrProceed(err)

	return string(data)
}

func ReadLines(name string) []string {
	return strings.Split(ReadFile(name), "\n")
}
