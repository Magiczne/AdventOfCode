package util

func ArrayMap[T any, U any](sequence []T, mapper func(T) U) []U {
	data := make([]U, len(sequence))

	for index, item := range sequence {
		data[index] = mapper(item)
	}

	return data
}

func Combinations[T any](set []T) (subsets [][]T) {
	length := len(set)
	result := [][]T{}

	for i := 0; i < length; i++ {
		for j := 0; j < length; j++ {
			result = append(result, []T{set[i], set[j]})
		}
	}

	return result
}
