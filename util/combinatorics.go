package util

// Returns all combinations of length two. With duplicates
func Doubles[T any](set []T) (subsets [][]T) {
	length := len(set)
	result := [][]T{}

	for i := 0; i < length; i++ {
		for j := 0; j < length; j++ {
			result = append(result, []T{set[i], set[j]})
		}
	}

	return result
}
