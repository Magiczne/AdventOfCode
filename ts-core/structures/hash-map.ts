class HashMap<K, V> implements Map<K, V> {
  private items: Record<string, V> = {}

  constructor(private readonly hashFn: (item: K) => string) {}

  clear(): void {
    this.items = {}
  }

  delete(key: K): boolean {
    if (!this.has(key)) {
      return false
    }

    delete this.items[this.hashFn(key)]

    return true
  }

  forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
    throw new Error('Method not implemented.')
  }

  get(key: K): V | undefined {
    return this.items[this.hashFn(key)]
  }

  has(key: K): boolean {
    return this.hashFn(key) in this.items
  }

  set(key: K, value: V): this {
    this.items[this.hashFn(key)] = value

    return this
  }

  entries(): MapIterator<[K, V]> {
    throw new Error('Method not implemented.')
  }

  keys(): MapIterator<K> {
    throw new Error('Method not implemented.')
  }

  values(): MapIterator<V> {
    return Object.values(this.items)[Symbol.iterator]()
  }

  [Symbol.iterator](): MapIterator<[K, V]> {
    throw new Error('Method not implemented.')
  }

  get [Symbol.toStringTag](): string {
    return 'ObjectMap'
  }

  get size(): number {
    return Object.keys(this.items).length
  }
}

export { HashMap }
