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

// Returns all permutations of a given array
func Permutations[T any](array []T) (permutations [][]T) {
	var helper func([]T, int)
	res := [][]T{}

	helper = func(arr []T, n int) {
		if n == 1 {
			tmp := make([]T, len(arr))
			copy(tmp, arr)
			res = append(res, tmp)
		} else {
			for i := 0; i < n; i++ {
				helper(arr, n-1)

				if n%2 == 1 {
					tmp := arr[i]
					arr[i] = arr[n-1]
					arr[n-1] = tmp
				} else {
					tmp := arr[0]
					arr[0] = arr[n-1]
					arr[n-1] = tmp
				}
			}
		}
	}

	helper(array, len(array))

	return res
}

// Returns all combinations of N numbers that sums to M
func CombinationsWithSum(length, targetSum int) [][]int {
	var results [][]int
	var current []int

	var backtrack func(length, targetSum, start int, current []int)
	backtrack = func(length, targetSum, start int, current []int) {
		if len(current) == length {
			if Sum(current) == targetSum {
				cpy := make([]int, len(current))
				copy(cpy, current)
				results = append(results, cpy)
			}
			return
		}

		for i := 0; i <= targetSum; i++ {
			current = append(current, i)
			backtrack(length, targetSum, start+i, current)
			current = current[:len(current)-1]
		}
	}

	backtrack(length, targetSum, 0, current)

	return results
}
