package util

import "fmt"

const Alphabet = "abcdefghijklmnopqrstuvwxyz"

var AlphabetArray = [...]string{"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"}

var DoubleLetters = ArrayMap([]rune(Alphabet), func(c rune) string {
	return fmt.Sprintf("%c%c", c, c)
})
