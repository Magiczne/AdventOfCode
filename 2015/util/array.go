package util

func ArrayMap[T any, U any](sequence []T, mapper func(T) U) []U {
	data := make([]U, len(sequence))

	for index, item := range sequence {
		data[index] = mapper(item)
	}

	return data
}

func ArrayFilter[T any](sequence []T, predicate func(T) bool) []T {
	data := []T{}

	for _, item := range sequence {
		if predicate(item) {
			data = append(data, item)
		}
	}

	return data
}

func NeighborIndexes(index int, sequenceLength int) (leftIndex int, rightIndex int) {
	var indexLeft, indexRight int

	if index-1 < 0 {
		indexLeft = sequenceLength - 1
	} else {
		indexLeft = index - 1
	}

	if index+1 > sequenceLength-1 {
		indexRight = 0
	} else {
		indexRight = index + 1
	}

	return indexLeft, indexRight
}
