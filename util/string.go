package util

import (
	"fmt"
	"strings"
)

const Alphabet = "abcdefghijklmnopqrstuvwxyz"

var AlphabetArray = [...]string{"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"}

var DoubleLetters = ArrayMap([]rune(Alphabet), func(c rune) string {
	return fmt.Sprintf("%c%c", c, c)
})

func IndexAll(s, substr string) []int {
	var indexes []int
	offset := 0

	for {
		i := strings.Index(s[offset:], substr)

		if i == -1 {
			break
		}

		indexes = append(indexes, offset+i)
		offset += i + 1
	}

	return indexes
}
