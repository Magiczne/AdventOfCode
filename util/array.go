package util

func ArrayMap[T any, U any](sequence []T, mapper func(T) U) []U {
	data := make([]U, len(sequence))

	for index, item := range sequence {
		data[index] = mapper(item)
	}

	return data
}
