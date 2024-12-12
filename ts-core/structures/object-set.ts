class ObjectSet<T> {
  private items: Record<string, T> = {}

  public constructor(private readonly hashFn: (item: T) => string) {}

  add(item: T): this {
    if (!this.has(item)) {
      this.items[this.hashFn(item)] = item
    }

    return this
  }

  clear(): void {
    this.items = {}
  }

  delete(item: T): boolean {
    if (!this.has(item)) {
      return false
    }

    delete this.items[this.hashFn(item)]

    return true
  }

  has(item: T): boolean {
    return this.hashFn(item) in this.items
  }

  [Symbol.iterator](): SetIterator<T> {
    return Object.values(this.items)[Symbol.iterator]()
  }

  get size(): number {
    return Object.keys(this.items).length
  }
}

export { ObjectSet }
