package util

func CloneMatrix[T any](matrix [][]T) [][]T {
	clonedMatrix := make([][]T, len(matrix))
	for i := range clonedMatrix {
		clonedMatrix[i] = make([]T, len(matrix[0]))
	}

	for i := 0; i < len(matrix); i++ {
		copy(clonedMatrix[i], matrix[i])
	}

	return clonedMatrix
}

func GetNeighbors[T any](x, y int, matrix [][]T) []T {
	neighbors := []T{}

	// Top row
	if y > 0 && x > 0 {
		neighbors = append(neighbors, matrix[x-1][y-1])
	}

	if y > 0 {
		neighbors = append(neighbors, matrix[x][y-1])
	}

	if y > 0 && x < len(matrix[0])-1 {
		neighbors = append(neighbors, matrix[x+1][y-1])
	}

	// Middle row
	if x > 0 {
		neighbors = append(neighbors, matrix[x-1][y])
	}

	if x < len(matrix[0])-1 {
		neighbors = append(neighbors, matrix[x+1][y])
	}

	// Bottom row
	if y < len(matrix)-1 && x > 0 {
		neighbors = append(neighbors, matrix[x-1][y+1])
	}

	if y < len(matrix)-1 {
		neighbors = append(neighbors, matrix[x][y+1])
	}

	if y < len(matrix)-1 && x < len(matrix[0])-1 {
		neighbors = append(neighbors, matrix[x+1][y+1])
	}

	return neighbors
}
