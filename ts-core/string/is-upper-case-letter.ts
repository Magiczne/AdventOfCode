const isUpperCaseLetter = (value: string): boolean => {
  return value === value.toUpperCase() && value !== value.toLowerCase()
}

export { isUpperCaseLetter }