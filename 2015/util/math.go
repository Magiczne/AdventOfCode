package util

import (
	"math"

	mapset "github.com/deckarep/golang-set/v2"
	"golang.org/x/exp/constraints"
)

func FactorsOf(value int) []int {
	factors := mapset.NewSet[int]()

	for i := 1; i <= int(math.Sqrt(float64(value))); i++ {
		if value%i == 0 {
			factors.Add(i)
			factors.Add(value / i)
		}
	}

	return factors.ToSlice()
}

func GreatestCommonDivisor(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}

	return a
}

func LeastCommonMultiple(numbers ...int) int {
	lcm := numbers[0]

	for i := 1; i < len(numbers); i++ {
		lcm = ((numbers[i] * lcm) / GreatestCommonDivisor(numbers[i], lcm))
	}

	return lcm
}

func Sum[T constraints.Integer | constraints.Float](numbers []T) T {
	sum := T(0)

	for _, number := range numbers {
		sum += number
	}

	return sum
}

func MultiplySlice[T constraints.Integer | constraints.Float](numbers []T) T {
	result := T(1)

	for _, number := range numbers {
		result *= number
	}

	return result
}
