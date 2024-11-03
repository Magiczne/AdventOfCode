package util

func PanicOrProceed(e error) {
	if e != nil {
		panic(e)
	}
}
