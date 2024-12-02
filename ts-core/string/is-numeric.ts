const isNumeric = (value: any): value is number => {
  // Love JS
  return !isNaN(value)
}

export { isNumeric }