class ObjectSet<T> implements Set<T> {
  private items: Record<string, T> = {}

  public constructor(
    private readonly hashFn: (item: T) => string,
    items: ReadonlyArray<T> | Set<T> = [],
  ) {
    if (Array.isArray(items)) {
      items.forEach(item => this.add(item))
    } else {
      ;[...items].forEach(item => this.add(item))
    }
  }

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

  forEach(callbackfn: (value: T, value2: T, set: ObjectSet<T>) => void, thisArg?: any): void {
    throw new Error('Method not implemented.')
  }

  entries(): SetIterator<[T, T]> {
    throw new Error('Method not implemented.')
  }

  keys(): SetIterator<T> {
    throw new Error('Method not implemented.')
  }

  values(): SetIterator<T> {
    return Object.values(this.items)[Symbol.iterator]()
  }

  union<U>(other: ReadonlySetLike<U>): ObjectSet<T | U> {
    throw new Error('Method not implemented.')
  }

  intersection<U>(other: ReadonlySetLike<U>): ObjectSet<T & U> {
    throw new Error('Method not implemented.')
  }

  difference<U>(other: ReadonlySetLike<U>): ObjectSet<T> {
    throw new Error('Method not implemented.')
  }

  symmetricDifference<U>(other: ReadonlySetLike<U>): ObjectSet<T | U> {
    throw new Error('Method not implemented.')
  }

  isSubsetOf(other: ReadonlySetLike<unknown>): boolean {
    throw new Error('Method not implemented.')
  }

  isSupersetOf(other: ReadonlySetLike<unknown>): boolean {
    throw new Error('Method not implemented.')
  }

  isDisjointFrom(other: ReadonlySetLike<unknown>): boolean {
    throw new Error('Not implemented')
  }

  [Symbol.iterator](): SetIterator<T> {
    return this.values()
  }

  get [Symbol.toStringTag](): string {
    return 'ObjectSet'
  }

  get size(): number {
    return Object.keys(this.items).length
  }
}

export { ObjectSet }
