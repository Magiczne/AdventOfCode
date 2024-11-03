package util

import (
	"golang.org/x/exp/constraints"
)

func Sum[T constraints.Integer | constraints.Float](numbers []T) T {
	sum := T(0)

	for _, number := range numbers {
		sum += number
	}

	return sum
}
