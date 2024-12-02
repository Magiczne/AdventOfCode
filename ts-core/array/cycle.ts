function* cycle<T>(array: ReadonlyArray<T>): Generator<T, void, undefined> {
  while (true) {
    yield* array
  }
}

export { cycle }